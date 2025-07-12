package nomadlambda

import (
	"context"
	"database/sql"
	"encoding/json"
	"log"
	"time"
)

type Trip struct {
	ID                 int       `json:"id"`
	UserId             string    `json:"userId"`
	City               string    `json:"city"`
	Country            string    `json:"country"`
	FromDate           time.Time `json:"fromDate"`
	ToDate             time.Time `json:"toDate"`
	Budget             string    `json:"budget"`
	SelectedActivities []string  `json:"selectedActivities"`
	Status             string    `json:"status"`
}

type Itinerary struct {
	ID      int                `json:"id"`
	Date    string             `json:"date"`
	TripId  int                `json:"tripId"`
	Details []ItineraryDetails `json:"details"`
}

type ItineraryDetails struct {
	ID          int    `json:"id"`
	Type        string `json:"type"`
	Name        string `json:"name"`
	Place       string `json:"place"`
	Description string `json:"description"`
	Time        string `json:"time"`
	AproxTime   string `json:"aproxTime"`
}

func getTripByID(ctx context.Context, db *sql.DB, id int) (*Trip, error) {
	row := db.QueryRowContext(ctx, "SELECT "+
		`id, user_id, city, country, from_date, to_date, budget, "selectedActivities" `+
		"FROM trips WHERE id = $1", id)

	var trip Trip
	var activitiesJSON []byte
	err := row.Scan(&trip.ID, &trip.UserId, &trip.City, &trip.Country,
		&trip.FromDate, &trip.ToDate, &trip.Budget, &activitiesJSON)
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(activitiesJSON, &trip.SelectedActivities)
	if err != nil {
		return nil, err
	}

	log.Printf("This is the trip: %v\n", trip)

	return &trip, nil
}

func saveSuggestions(ctx context.Context, db *sql.DB, tripID int, itineraries []Itinerary) error {

	tx, err := db.Begin()
	if err != nil {
		return err
	}

	for _, i := range itineraries {
		err := tx.QueryRowContext(
			ctx,
			"INSERT INTO itineraries (date, trip_id) VALUES ($1, $2) RETURNING ID",
			i.Date,
			tripID,
		).Scan(&i.ID)
		if err != nil {
			tx.Rollback()
			return err
		}

		for _, d := range i.Details {
			_, err := tx.ExecContext(
				ctx,
				"INSERT INTO itinerary_details (type, name, place, description, time, aprox_time) values ($1, $2, $3, $4, $5, $6)",
				d.Type,
				d.Name,
				d.Place,
				d.Description,
				d.Time,
				d.AproxTime,
			)
			if err != nil {
				tx.Rollback()
				return err
			}
		}
	}

	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}

func changeTripStatus(ctx context.Context, db *sql.DB, tripId int) error {
	_, err := db.ExecContext(ctx, "UPDATE trips set status = 'GENERATED' where id = $1", tripId)

	return err
}

func parseItineraries(itinerariesStr string) ([]Itinerary, error) {
	var itineraries []Itinerary

	err := json.Unmarshal([]byte(itinerariesStr), &itineraries)
	if err != nil {
		return nil, err
	}

	return itineraries, nil
}

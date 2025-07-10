package main

import (
	"context"
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

func getTripByID(ctx context.Context, id int) (*Trip, error) {
	row := db.QueryRowContext(ctx, "SELECT"+
		"id, userId, city, country, from_date, to_date, budget, selectedActivities"+
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

func saveSuggestion(ctx context.Context, tripID int, content string) error {
	_, err := db.ExecContext(ctx, "INSERT INTO trip_suggestions (trip_id, content) VALUES ($1, $2)", tripID, content)
	return err
}

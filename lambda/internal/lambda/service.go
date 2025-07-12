package nomadlambda

import (
	"context"
	"database/sql"
	"fmt"
)

func processTrip(ctx context.Context, db *sql.DB, tripId int, apiKey string) error {

	trip, err := getTripByID(ctx, db, tripId)
	if err != nil {
		return fmt.Errorf("Error getting trip: %w", err)
	}

	itinerariesStr, err := callOpenAI(ctx, trip, apiKey)
	if err != nil {
		return fmt.Errorf("OpenAI error: %w", err)
	}

	itineraries, err := parseItineraries(itinerariesStr)
	if err != nil {
		return fmt.Errorf("JSON parsing error: %w, %v", err, itinerariesStr)
	}

	if err := saveSuggestions(ctx, db, tripId, itineraries); err != nil {
		return fmt.Errorf("Failed saving itinerary: %w", err)
	}

	err = changeTripStatus(ctx, db, trip.ID)
	if err != nil {
		return fmt.Errorf("Failed changing status: %w", err)
	}

	return nil
}

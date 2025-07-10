package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/aws/aws-lambda-go/events"
)

func handler(ctx context.Context, sqsEvent events.SQSEvent) error {
	for _, record := range sqsEvent.Records {
		var payload struct {
			TripID int `json:"tripId"`
		}

		if err := json.Unmarshal([]byte(record.Body), &payload); err != nil {
			log.Printf("Invalid JSON: %v", err)
			continue
		}

		trip, err := getTripByID(ctx, payload.TripID)
		if err != nil {
			log.Printf("Error getting trip: %v", err)
			continue
		}

		suggestion, err := callOpenAI(trip)
		if err != nil {
			log.Printf("OpenAI error: %v", err)
			continue
		}

		if err := saveSuggestion(ctx, payload.TripID, suggestion); err != nil {
			log.Printf("Failed saving suggestion: %v", err)
		}
	}

	return nil
}

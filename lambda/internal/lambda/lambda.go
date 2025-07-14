package nomadlambda

import (
	"context"
	"database/sql"
	"encoding/json"
	"log"

	"github.com/aws/aws-lambda-go/events"
)

type LambdaHandler struct {
	DB        *sql.DB
	LlmAPiKey string
}

func (h *LambdaHandler) Handler(ctx context.Context, sqsEvent events.SQSEvent) error {
	defer func() {
		if r := recover(); r != nil {
			log.Printf("PANIC RECOVERED: %v", r)
		}
	}()

	for _, record := range sqsEvent.Records {
		var payload struct {
			TripID int `json:"tripId"`
		}

		if err := json.Unmarshal([]byte(record.Body), &payload); err != nil {
			log.Printf("Invalid JSON: %v\n", err)
			continue
		}

		if err := processTrip(ctx, h.DB, payload.TripID, h.LlmAPiKey); err != nil {
			log.Println(err.Error())
			continue
		}
	}

	return nil
}

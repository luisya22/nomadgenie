package nomadlambda

import (
	"context"
	"database/sql"
	"log"
)

type LocalHandler struct {
	DB        *sql.DB
	LlmApiKey string
}

func (h *LocalHandler) Handler(ctx context.Context, tripId int) error {

	if err := processTrip(ctx, h.DB, tripId, h.LlmApiKey); err != nil {
		log.Printf("%s", err)
		return err
	}

	return nil
}

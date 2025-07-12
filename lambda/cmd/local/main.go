package main

import (
	"context"
	"database/sql"
	nomadlambda "lambda/internal/lambda"
	"log"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
	db, err := sql.Open("pgx", os.Getenv("DATABASE_URL"))
	defer db.Close()
	if err != nil {
		log.Fatalf("Failed to connect to DB: %v", err)
	}

	handler := nomadlambda.LocalHandler{
		DB:        db,
		LlmApiKey: os.Getenv("LLM_API_KEY"),
	}

	handler.Handler(context.Background(), 1)
}

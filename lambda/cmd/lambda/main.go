package main

import (
	"database/sql"
	nomadlambda "lambda/internal/lambda"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/jackc/pgx/v5/stdlib"
)

// TODO on fail set status to Failed
func main() {
	db, err := sql.Open("pgx", os.Getenv("DATABASE_URL"))
	defer db.Close()
	if err != nil {
		log.Fatalf("Failed to connect to DB: %v", err)
	}

	handler := nomadlambda.LambdaHandler{
		DB:        db,
		LlmAPiKey: os.Getenv("LLM_API_KEY"),
	}

	lambda.Start(handler.Handler)

}

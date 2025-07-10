package main

import (
	"database/sql"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/jackc/pgx/v5/stdlib"
)

var db *sql.DB

func init() {
	var err error
	db, err = sql.Open("pgx", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Failed to connect to DB: %v", err)
	}
}

func main() {
	lambda.Start(handler)
}

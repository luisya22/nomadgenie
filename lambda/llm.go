package main

import "fmt"

func callOpenAI(trip *Trip) (string, error) {
	prompt := fmt.Sprintf("Create a travel itinerary for a trip titled '%s'", trip.ID)

	// TODO: Prompting

	return prompt, nil
}

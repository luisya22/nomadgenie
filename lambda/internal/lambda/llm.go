package nomadlambda

import (
	"context"
	"encoding/json"

	"github.com/sashabaranov/go-openai"
)

func callOpenAI(ctx context.Context, trip *Trip, llmApiKey string) (string, error) {

	client := openai.NewClient(llmApiKey)

	jsonTrip, err := json.MarshalIndent(trip, "", " ")
	if err != nil {
		return "", err
	}

	resp, err := client.CreateChatCompletion(
		ctx,
		openai.ChatCompletionRequest{
			Model: openai.GPT4oMini,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleSystem,
					Content: getSuggestionsPrompt,
				},
				{
					Role:    openai.ChatMessageRoleSystem,
					Content: string(jsonTrip),
				},
			},
		},
	)

	if err != nil {
		return "", err
	}

	return resp.Choices[0].Message.Content, nil
}

var getSuggestionsPrompt = `
	You are a super intelligent travel agent system. You will receive trip information like this:

{
  id, userId, city, country, fromDate, toDate, budget, selectedActivities, status
}

And you will return a full itinerary wich will be an array of dates containing activities. This should include breakfast, lunch, dinner and activities. You will return information as a JSON and only JSON content. No extra text. 

Example

[
   {
       date: "",
        details: {
             [
                 "type": "dining",
                 "name": "breakfast",
                 "place": "Cafe",
                 "description":  "description",
                 "time": "8:00 AM",
                 "aproxTime": "30 m"
             ],
              [
                 "type": "recreational",
                 "name": "park visit",
                 "place": "Central Park",
                 "description":  "description",
                 "time": "9:45 AM",
                 "aproxTime": "2 h"
             ]
        }
    }
]
`

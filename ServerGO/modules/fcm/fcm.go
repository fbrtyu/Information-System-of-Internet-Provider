package fcm

import (
	"context"
	"fmt"
	"log"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
)

func PushNote() {
	app, err := firebase.NewApp(context.Background(), nil)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	// Obtain a messaging.Client from the App.
	ctx := context.Background()
	client2, err := app.Messaging(ctx)
	if err != nil {
		log.Fatalf("error getting Messaging client: %v\n", err)
	}

	// This registration token comes from the client FCM SDKs.
	registrationToken := "dkSHMcmqzjRByF5Ahhy0U5:APA91bFbJFCNq4JsPMtvMXunC0JSyF7cOvSeXF2M5a7qjarfSUYpAJ4hiYin8ZaIOCcvODLCsV_4pSw0BST1lT-R93CJKRoF-bAhEIwiI0vX9BmKZZ6s-dldKTSFZ0VlWZI7ZKziZk2j"

	// See documentation on defining a message payload.
	message2 := &messaging.Message{
		Data: map[string]string{
			"title": "1111",
			"body":  "11111111",
		},
		Token: registrationToken,
	}

	// Send a message to the device corresponding to the provided
	// registration token.
	response, err := client2.Send(ctx, message2)
	if err != nil {
		log.Fatalln(err)
	}
	// Response is a message ID string.
	fmt.Println("Successfully sent message:", response)
}

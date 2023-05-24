package fcm

import (
	"context"
	"log"

	"fmt"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
)

func PushNote() {
	conf := &firebase.Config{
		ServiceAccountID: "firebase-adminsdk-1vtsk@diplom-45232.iam.gserviceaccount.com",
		ProjectID:        "diplom-45232",
		StorageBucket:    "diplom-45232.appspot.com",
	}

	app, err := firebase.NewApp(context.Background(), conf)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	// Obtain a messaging.Client from the App.
	ctx := context.Background()
	client, err := app.Messaging(ctx)
	if err != nil {
		log.Fatalf("error getting Messaging client: %v\n", err)
	}

	// This registration token comes from the client FCM SDKs.
	registrationToken := "cGNLNtG_eh7TL2CWAzVwIX:APA91bFHd7_eVF7-vXWmYBSd6l611DKsyTa4zyFzpzAjTH-YQYnOWk_dX6e0h56JloydJywKwNJj2x9C3juWnRc8elogcUqyAELFdVeQtDe5vgbVjxRmORMBWkhiL03jcMRnlGHM4nyK"

	// See documentation on defining a message payload.
	message := &messaging.Message{
		Data: map[string]string{
			"score": "850",
			"time":  "2:45",
		},
		Token: registrationToken,
	}

	// Send a message to the device corresponding to the provided
	// registration token.
	response, err := client.Send(ctx, message)
	if err != nil {
		log.Fatalln(err)
	}
	// Response is a message ID string.
	fmt.Println("Successfully sent message:", response)
}

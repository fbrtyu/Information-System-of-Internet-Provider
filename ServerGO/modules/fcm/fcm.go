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
	registrationToken := "dkSHMcmqzjRByF5Ahhy0U5:APA91bFszlsFWuM61E2m-KBHX0FTUWZTxmED9jky59WLGMhKvWRnjnNJrM74sTCYjLlVEbOgSb5uRMioO0auPgKwsuw30wKMHcjPtInbhc1VxYRgYmBY2DPManP1MJqkEoqMUf27cW6s"

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

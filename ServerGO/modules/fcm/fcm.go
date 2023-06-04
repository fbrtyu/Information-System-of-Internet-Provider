package fcm

import (
	"context"
	"fmt"
	"log"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
)

func PushNote() {
	// Инициализация перменной для работы с уведомленями
	app, err := firebase.NewApp(context.Background(), nil)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	// Создание переменной для работы с сообщениями
	ctx := context.Background()
	client2, err := app.Messaging(ctx)
	if err != nil {
		log.Fatalf("error getting Messaging client: %v\n", err)
	}

	// Токен регистрации в системе рассылки уведомлений
	registrationToken := "dLWbFkF1fZJT1bYfGG6Jmf:APA91bFAl4O-ltklFXP3ecgiTB6BbY60CpUSprtvfD_ZRFJFHWWYPhCWrHfWSeO_HmsTxW6RlAihCmrUcPwJyuJYsBKxHaueJG7e00xk8fhMV1OmsLQ1zF7AiZFHwJPpgEWq0WsM77aB"

	// Тело уведомления
	message2 := &messaging.Message{
		Data: map[string]string{
			"title": "Тестовое уведомление",
			"body":  "Тело уведомления",
		},
		Token: registrationToken,
	}

	// Отправка сообщения и получения ответа об отправке
	response, err := client2.Send(ctx, message2)
	if err != nil {
		log.Fatalln(err)
	}
	// Вывод ответа от отправке сообщения
	fmt.Println("Successfully sent message:", response)
}

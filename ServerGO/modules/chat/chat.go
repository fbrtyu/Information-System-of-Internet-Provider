package chat

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// WebSocket Chat
var clients = make(map[*websocket.Conn]bool) //Массив подключенных клиентов
var broadcast = make(chan Message)           //Канал передачи сообщений

var clientMass = make(map[string]*websocket.Conn)

// Проверка возможности соединения по вебсокет
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Структура для хранения собщений
type Message struct {
	Username    string `json:"username"`
	Destination string `json:"destination"`
	Message     string `json:"message"`
}

// Массив последних 10 сообщений
var messMass [10]Message

func HandleConnections(w http.ResponseWriter, r *http.Request) {
	// Обновление соединения
	log.Println("User connected: " + r.Host)

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}

	// Регистрация нового клиента
	clients[ws] = true
	clientMass[r.Host] = ws

	// Отправка сообщения
	var msg Message
	msg.Destination = "Client"
	msg.Message = "Server message"
	msg.Username = "Server"
	ws.WriteJSON(&msg)

	//Отправка последних 10 сообщений новогму пользователю
	for i := 0; i < len(messMass); i++ {
		ws.WriteJSON(&messMass[i])
	}

	for {
		var msg Message
		//Чтение сообщений
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}

		//Обновление массива последних сообщений
		for i := 0; i < len(messMass); i++ {
			if i != len(messMass)-1 {
				messMass[i] = messMass[i+1]
			} else {
				messMass[len(messMass)-1] = msg
			}
		}

		//Рассылка сообщений в канал данных для всех пользователей
		broadcast <- msg
	}
}

func HandleMessages() {
	for {
		//Чтение сообщений из канала данных
		msg := <-broadcast
		//Отправка сообщения пользователю
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}

package chat

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// WebSocket Chat
var clients = make(map[*websocket.Conn]bool) // connected clients
var broadcast = make(chan Message)           // broadcast channel

var clientMass = make(map[string]*websocket.Conn)

// Configure the upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Define our message object
type Message struct {
	Username    string `json:"username"`
	Destination string `json:"destination"`
	Message     string `json:"message"`
}

// Mass of Message
var messMass [10]Message

func HandleConnections(w http.ResponseWriter, r *http.Request) {
	// Upgrade initial GET request to a websocket
	log.Println("User connected: " + r.Host)

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure we close the connection when the function returns
	//defer ws.Close()

	// Register our new client
	clients[ws] = true
	clientMass[r.Host] = ws

	// Sending Text message to client
	var msg Message
	msg.Destination = "Client"
	msg.Message = "Server message"
	msg.Username = "Server"
	ws.WriteJSON(&msg)

	//Send mass of Message new Client
	for i := 0; i < len(messMass); i++ {
		ws.WriteJSON(&messMass[i])
	}

	for {
		var msg Message
		// Read in a new message as JSON and map it to a Message object
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}

		//Update mass of Message
		for i := 0; i < len(messMass); i++ {
			if i != len(messMass)-1 {
				messMass[i] = messMass[i+1]
			} else {
				messMass[len(messMass)-1] = msg
			}
		}

		//fmt.Print(messMass)

		// Send the newly received message to the broadcast channel
		broadcast <- msg
	}
}

func HandleMessages() {
	for {
		// Grab the next message from the broadcast channel
		msg := <-broadcast
		// Send it out to every client that is currently connected
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

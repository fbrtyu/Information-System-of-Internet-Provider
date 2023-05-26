package main

import (
	"fmt"
	"log"
	"main/modules/auth"
	"main/modules/chInfo"
	"main/modules/changepassword"
	"main/modules/changerole"
	"main/modules/changeusertariff"
	"main/modules/chat"
	"main/modules/fcm"
	"main/modules/userpage"
	"main/modules/usersup"
	"main/modules/usertariff"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

/* var ww = 9

func Stat(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()
	ww++
	bs := []byte(strconv.Itoa(ww))
	s := "Посещения: " + strconv.FormatInt(int64(ww), ww)
	data := []byte(s)
	e := ioutil.WriteFile("stat.txt", data, 0600)
	if e != nil {
		fmt.Println("Ошибка создания файла!\n", e)
	}
	w.Write(bs)
} */

func main() {
	fmt.Println("Server start!")
	http.HandleFunc("/Reg", auth.Reg)
	http.HandleFunc("/Login", auth.Login)
	http.HandleFunc("/lk", userpage.GetUserPage)
	http.HandleFunc("/tariffs", usertariff.GetTariffs)
	http.HandleFunc("/settariff", changeusertariff.SetTariff)
	http.HandleFunc("/chpass", changepassword.ChPass)
	http.HandleFunc("/chrole", changerole.ChRole)
	http.HandleFunc("/setinfo", chInfo.SetInfo)
	http.HandleFunc("/supuser", usersup.GetSup)

	fcm.PushNote()
	//http.HandleFunc("/s", Stat)

	//Chat
	// Create a simple file server
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", fs)

	// Configure websocket route
	http.HandleFunc("/ws", chat.HandleConnections)

	// Start listening for incoming chat messages
	go chat.HandleMessages()

	// Start the server on localhost port 8000 and log any errors
	log.Println("http server started on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

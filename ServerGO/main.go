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
	"main/modules/videoconference"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	//Пути по которым клиент может обратиться к серверу
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
	http.HandleFunc("/sendsup", usersup.SendSup)
	http.HandleFunc("/getsup", usersup.GetAllSup)
	http.HandleFunc("/anssup", usersup.AnsSup)
	http.HandleFunc("/setrole", changerole.SetRole)
	http.HandleFunc("/updtariff", changeusertariff.UpdTariff)
	http.HandleFunc("/addtariff", changeusertariff.AddTariff)
	http.HandleFunc("/streams", videoconference.GetStreams)
	http.HandleFunc("/setstream", videoconference.SetStream)

	//Запуск тестового оповещения при включении сервера
	fcm.PushNote()

	//Веб-чат
	//Создание файлового сервера
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", fs)

	//Конфигурация вебсокет соединения
	http.HandleFunc("/ws", chat.HandleConnections)

	//Запуск горутины для работы с сообщениями
	go chat.HandleMessages()

	//Запуск самого сервера на порту 8080
	log.Println("http server started on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

package usersup

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type UserPage struct {
	ID     int
	IDS    int
	Body   string
	Answer string
	Date   string
	State  bool
	Login  string
}

func GetSup(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()
	var user UserPage

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	rowGetLogin := db.QueryRow("SELECT ID_client FROM userpassword WHERE Cookies = ?", r.FormValue("key"))
	err = rowGetLogin.Scan(&user.ID)
	if err != nil {
		panic(err)
	}

	rowClient, err := db.Query("SELECT * FROM support WHERE ID_client = ?", user.ID)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	var ja string
	for rowClient.Next() {
		err = rowClient.Scan(&user.IDS, &user.ID, &user.Body, &user.Answer, &user.Date, &user.State)
		if err != nil {
			panic(err)
		}

		res, err := json.Marshal(user)
		if err != nil {
			panic(err)
		} else {
			ja += ";" + string(res)
		}
	}
	w.Write([]byte(ja))
}

func SendSup(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()

	var user UserPage

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	rowGetLogin := db.QueryRow("SELECT ID_client FROM userpassword WHERE Cookies = ?", r.FormValue("key"))
	err = rowGetLogin.Scan(&user.ID)
	if err != nil {
		panic(err)
	}

	user.Body = r.FormValue("Body")
	dt := time.Now()
	fmt.Println(dt.Format("2006-01-02"))

	rowClient, err := db.Query("INSERT INTO support (ID_client, Body, Answer, Date, State) VALUES (?, ?, ?, ?, ?)",
		user.ID, user.Body, "no", dt.Format("2006-01-02"), true)
	if err != nil {
		panic(err)
	}

	defer db.Close()

	for rowClient.Next() {
		err = rowClient.Scan(&user.IDS, &user.ID, &user.Body, &user.Answer, &user.Date, &user.State)
		if err != nil {
			panic(err)
		}
	}
}

type Supports struct {
	ID        int
	ID_client int
	Body      string
	Answer    string
	Date      string
	State     bool
}

func GetAllSup(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()

	var user Supports

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	rowClient, err := db.Query("SELECT * FROM support")
	if err != nil {
		panic(err)
	}

	defer db.Close()

	var ja string
	for rowClient.Next() {
		err = rowClient.Scan(&user.ID, &user.ID_client, &user.Body, &user.Answer, &user.Date, &user.State)
		if err != nil {
			panic(err)
		}

		res, err := json.Marshal(user)
		if err != nil {
			panic(err)
		} else {
			ja += ";" + string(res)
		}
	}
	w.Write([]byte(ja))
}

func AnsSup(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()
	fmt.Println(r.FormValue("Answer"))

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("UPDATE support SET Answer = ? WHERE ID = ?", r.FormValue("Answer"), r.FormValue("ID"))
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("UPDATE support SET State = ? WHERE ID = ?", false, r.FormValue("ID"))
	if err != nil {
		panic(err)
	}
}

package videoconference

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

type Stream struct {
	ID    int
	Date  string
	Theme string
	Owner string
}

func GetStreams(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	rows, err := db.Query("SELECT * FROM videoconference")
	if err != nil {
		panic(err)
	}

	defer db.Close()

	var ja string
	for rows.Next() {
		var user Stream
		err = rows.Scan(&user.ID, &user.Date, &user.Theme, &user.Owner)
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

func SetStream(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	var login = ""

	rowGetLogin := db.QueryRow("SELECT Login FROM userpassword WHERE Cookies = ?", r.FormValue("key"))
	err = rowGetLogin.Scan(&login)
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("INSERT INTO videoconference (Date, Theme, Owner) VALUES (?, ?, ?)", r.FormValue("Date"), r.FormValue("Theme"), login)
	if err != nil {
		panic(err)
	}

	defer db.Close()
}

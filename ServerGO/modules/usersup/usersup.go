package usersup

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

type UserPage struct {
	ID    int
	IDS   int
	Body  string
	Date  string
	State int
	Login string
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
		err = rowClient.Scan(&user.IDS, &user.ID, &user.Body, &user.Date, &user.State)
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

package changeusertariff

import (
	"database/sql"
	"net/http"
)

type UserPage struct {
	Name          string
	Speed         int
	Cost          int
	IDtariff      int
	IDClient      int
	Role          int
	AccountNumber int
	Balans        float32
	FIO           string
	Address       string
	Mobile        int
	Email         string
	Login         string
}

func SetTariff(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	var user UserPage

	rowGetLogin := db.QueryRow("SELECT Login FROM userpassword WHERE Cookies = ?", r.FormValue("key"))
	err = rowGetLogin.Scan(&user.Login)
	if err != nil {
		panic(err)
	}

	rows, err := db.Query("SELECT ID_client FROM userpassword WHERE Login = ?", user.Login)
	if err != nil {
		panic(err)
	}

	if !rows.Next() {
		w.Write([]byte("You no login!"))
	} else {
		err = rows.Scan(&user.IDClient)
		if err != nil {
			panic(err)
		}
	}

	_, err = db.Exec("UPDATE treaty SET ID_tariff = ? WHERE ID_client = ?", r.FormValue("ID"), user.IDClient)
	if err != nil {
		panic(err)
	}

	defer db.Close()
}

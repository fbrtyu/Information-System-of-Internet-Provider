package changerole

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

type Client struct {
	Role  int
	Login string
}

func ChRole(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}
	var user Client
	var ja string
	rows, err := db.Query("SELECT Login, Role FROM useraccess")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	for rows.Next() {
		err = rows.Scan(&user.Login, &user.Role)
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

func SetRole(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("UPDATE useraccess SET Role = ? WHERE Login = ?", r.FormValue("Role"), r.FormValue("Login"))
	if err != nil {
		panic(err)
	}
	defer db.Close()
}

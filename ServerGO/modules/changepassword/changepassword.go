package changepassword

import (
	"database/sql"
	"fmt"
	"net/http"
)

func ChPass(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	fmt.Println(r.FormValue("key"))
	fmt.Println(r.FormValue("oldpass"))
	fmt.Println(r.FormValue("newpass1"))
	fmt.Println(r.FormValue("newpass2"))

	var login = ""

	rowGetLogin := db.QueryRow("SELECT Login FROM userpassword WHERE Cookies = ?", r.FormValue("key"))
	err = rowGetLogin.Scan(&login)
	if err != nil {
		panic(err)
	}

	var oldpass = ""

	rowOldPass := db.QueryRow("SELECT Password FROM userpassword WHERE Login = ?", login)
	err = rowOldPass.Scan(&oldpass)
	if err != nil {
		panic(err)
	}

	if r.FormValue("newpass1") == r.FormValue("newpass2") && r.FormValue("oldpass") == oldpass {
		_, err = db.Exec("UPDATE userpassword SET Password = ? WHERE Login = ?", r.FormValue("newpass2"), login)
		if err != nil {
			panic(err)
		}

		defer db.Close()

		w.WriteHeader(200)
	} else {
		w.WriteHeader(http.StatusConflict)
	}
}

package userpage

import (
	"database/sql"
	"encoding/json"
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

func GetUserPage(w http.ResponseWriter, r *http.Request) {
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

	rowCheckRole := db.QueryRow("SELECT Role FROM useraccess WHERE Login = ?", user.Login)
	err = rowCheckRole.Scan(&user.Role)
	if err != nil {
		user.Role = 0
		panic(err)
	}

	row := db.QueryRow("SELECT ID_client FROM userpassword WHERE Login = ?", user.Login)
	err = row.Scan(&user.IDClient)
	if err != nil {
		w.Write([]byte("You no login!"))
		panic(err)
	}

	if user.Role == 1 || user.Role == 2 || user.Role == 3 {
		encoder := json.NewEncoder(w)
		err := encoder.Encode(user)
		if err != nil {
			panic(err)
		}
	} else {
		row2 := db.QueryRow("SELECT ID_tariff FROM treaty WHERE ID_client = ?", user.IDClient)
		err = row2.Scan(&user.IDtariff)
		if err != nil {
			panic(err)
		}

		rowClient := db.QueryRow("SELECT * FROM client WHERE ID = ?", user.IDClient)
		err = rowClient.Scan(&user.IDClient, &user.Address, &user.FIO, &user.Mobile, &user.Email)
		if err != nil {
			panic(err)
		}

		rowCliente := db.QueryRow("SELECT Email FROM client WHERE ID = ?", user.IDClient)
		err = rowCliente.Scan(&user.Email)
		if err != nil {
			panic(err)
		}

		rowPay := db.QueryRow("SELECT AccountNumber, Balans FROM balans WHERE ID_client = ?", user.IDClient)
		err = rowPay.Scan(&user.AccountNumber, &user.Balans)
		if err != nil {
			panic(err)
		}

		row3 := db.QueryRow("SELECT Speed, Cost, Name FROM tariff WHERE ID = ?", user.IDtariff)
		err = row3.Scan(&user.Speed, &user.Cost, &user.Name)
		if err != nil {
			panic(err)
		} else {
			encoder := json.NewEncoder(w)
			err := encoder.Encode(user)
			if err != nil {
				panic(err)
			}
		}
	}

	defer db.Close()
}

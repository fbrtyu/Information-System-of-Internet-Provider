package changeusertariff

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"
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

	_, err = db.Exec("UPDATE client SET Address = ? WHERE ID = ?", r.FormValue("address"), user.IDClient)
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("UPDATE client SET FullName = ? WHERE ID = ?", r.FormValue("fio"), user.IDClient)
	if err != nil {
		panic(err)
	}

	dt := time.Now()
	dt2 := dt.AddDate(0, 3, 0)
	fmt.Println(dt.Format("2006-01-02"))

	_, err = db.Exec("INSERT INTO treaty (ID_client, ID_tariff, DateBegin, DateEnd, Cost) VALUES (?, ?, ?, ?, ?)", user.IDClient, r.FormValue("id"), dt.Format("2006-01-02"), dt2, r.FormValue("cost"))
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("INSERT INTO balans (ID_client, AccountNumber, Balans) VALUES (?, ?, ?)", user.IDClient, 123, 0)
	if err != nil {
		panic(err)
	}

	defer db.Close()
}

func UpdTariff(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("UPDATE tariff SET Speed = ? WHERE ID = ?", r.FormValue("Speed"), r.FormValue("ID"))
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("UPDATE tariff SET Cost = ? WHERE ID = ?", r.FormValue("Cost"), r.FormValue("ID"))
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("UPDATE tariff SET Name = ? WHERE ID = ?", r.FormValue("Name"), r.FormValue("ID"))
	if err != nil {
		panic(err)
	}

	defer db.Close()
}

func AddTariff(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("INSERT INTO tariff (Speed, Cost, Name) VALUES (?, ?, ?)", r.FormValue("Speed"), r.FormValue("Cost"), r.FormValue("Name"))
	if err != nil {
		panic(err)
	}

	defer db.Close()
}

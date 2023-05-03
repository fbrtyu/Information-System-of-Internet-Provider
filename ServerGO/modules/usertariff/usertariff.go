package usertariff

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

type Tariffs struct {
	ID    int
	Name  string
	Speed int
	Cost  int
}

func GetTariffs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	rows, err := db.Query("SELECT * FROM tariff")
	if err != nil {
		panic(err)
	}

	defer db.Close()
	var ja string
	for rows.Next() {
		var tarif Tariffs
		err = rows.Scan(&tarif.ID, &tarif.Speed, &tarif.Cost, &tarif.Name)
		if err != nil {
			panic(err)
		}

		res, err := json.Marshal(tarif)
		if err != nil {
			panic(err)
		} else {
			ja += ";" + string(res)
		}
	}
	w.Write([]byte(ja))
}

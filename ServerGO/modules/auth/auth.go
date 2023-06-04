package auth

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Login    string
	Password string
	Cookies  string
}

func Reg(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()

	data := User{
		Login:    r.FormValue("login"),
		Password: r.FormValue("password1"),
		Cookies:  "",
	}

	if r.FormValue("password1") == r.FormValue("password2") {

		db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
		if err != nil {
			panic(err)
		}

		rows, err := db.Query("SELECT Login FROM userpassword WHERE Login = ?", data.Login)
		if err != nil {
			fmt.Println("Reg bad")
		} else {
			//Генерация куки
			hash, err := bcrypt.GenerateFromPassword([]byte(r.FormValue(("password1")+"salt")), bcrypt.DefaultCost)
			if err != nil {
				panic(err)
			}
			fmt.Println(string(hash))

			if !rows.Next() {

				res, err := db.Exec("INSERT INTO userpassword (Login, Password, Cookies) VALUES (?, ?, ?)", data.Login, data.Password, hash)
				if err != nil {
					fmt.Println(res)
					panic(err)
				}

				res2, err := db.Exec("INSERT INTO client (Address, FullName, MobilePhone, Email) VALUES (?, ?, ?, ?)", "", "", 0, data.Login)
				if err != nil {
					fmt.Println(res2)
					panic(err)
				}

				var id = 0

				rows3 := db.QueryRow("SELECT ID FROM client WHERE Email = ?", data.Login)
				err = rows3.Scan(&id)
				if err != nil {
					fmt.Println("Reg bad")
				}

				_, err = db.Exec("UPDATE userpassword SET ID_client = ? WHERE Login = ?", id, data.Login)
				if err != nil {
					panic(err)
				}

				w.Write([]byte("You reg!"))
			} else {
				w.Write([]byte("You no reg!"))
			}

			defer db.Close()
			fmt.Println("Reg ok")
		}
	} else {
		w.Write([]byte("Пароли не совпадают!"))
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseForm()

	data := User{
		Login:    r.FormValue("login"),
		Password: r.FormValue("password"),
		Cookies:  "",
	}

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err)
	}

	rows, err := db.Query("SELECT Login, Password, Cookies FROM userpassword WHERE Login = ?", data.Login)
	if err != nil {
		w.Write([]byte("FalseLogin"))
		panic(err)
	} else {
		defer db.Close()
		if !rows.Next() {
			w.Write([]byte("FalseLogin"))
		} else {
			var ja string
			var user User
			err = rows.Scan(&user.Login, &user.Password, &user.Cookies)
			if err != nil {
				panic(err)
			}

			res, err := json.Marshal(user)
			if err != nil {
				panic(err)
			} else {
				ja += ";" + string(res)
			}

			if user.Password == data.Password {
				w.Write([]byte(ja))
			} else {
				w.Write([]byte("FalseLogin"))
			}
		}
	}
}

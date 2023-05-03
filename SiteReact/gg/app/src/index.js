import React from "react"
import ReactDOMClient from "react-dom/client"
import './index.css'
import { SetUserPage, gc } from './userpage.js'
import { k } from './tariffs'

function MainPage() {
/*   const request = new XMLHttpRequest();

  const url = "http://localhost:8080/s";

  request.open("POST", url, true);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {

    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText);
      document.cookie = "v=" + request.responseText;
    }
  });

  request.send(); */

  return (
    <div>
      <h1>Главная страница</h1>
      <p onClick={k}>Вывести все тарифы</p>
      <p onClick={SetLogin}>Вход</p>
      <p onClick={SetReg}>Регистрация</p>
      <p></p>
    </div>
  )
}

export function SetMainPage() {
  if (gc("key")) {
    app.render(<SetUserPage />);
  } else {
    app.render(<MainPage />);
  }
}

function Login() {
  return (
    <form className="box" action="/" method="post" id="mainform">
      <h1 id="l">Вход</h1>
      <p onClick={SetReg}>Регистрация</p>
      <p onClick={SetMainPage}>Главная</p>
      <input type="text" name="login" placeholder="Логин" id="login" />
      <input type="password" name="password" placeholder="Пароль" id="password" />
      <input type="button" name="do_login" value="Войти" onClick={loginFunc} />
    </form>
  );
}

function SetLogin() {
  app.render(<Login />)
}

function Reg() {
  return (
    <form className="box" action="/" method="post" id="mainform">
      <h1>Регистрация</h1>
      <p onClick={SetLogin}>Вход</p>
      <p onClick={SetMainPage}>Главная</p>
      <input type="text" name="login" placeholder="Логин" id="login" />
      <input type="password" name="password1" placeholder="Пароль" id="password1" />
      <input type="password" name="password2" placeholder="Пароль повтор" id="password2" />
      <input type="button" name="do_reg" value="Зарегистрироваться" onClick={regFunc} />
    </form>
  );
}

function SetReg() {
  app.render(<Reg />)
}

function regFunc() {
  let login = document.getElementById("login").value;
  let password1 = document.getElementById("password1").value;
  let password2 = document.getElementById("password2").value;

  const request = new XMLHttpRequest();

  const url = "http://localhost:8080/Reg";

  const params = "login=" + login + "&password1=" + password1 + "&password2=" + password2;

  request.open("POST", url, true);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {
    console.log(request.responseText);
    if (request.readyState === 4 && request.status === 200 && request.responseText !== "Пароли не совпадают!") {
      app.render(<Login />)
    }
  });

  request.send(params);
}

function loginFunc() {
  let login = document.getElementById("login").value;
  let password = document.getElementById("password").value;

  const request = new XMLHttpRequest();

  const url = "http://localhost:8080/Login";

  const params = "login=" + login + "&password=" + password;

  request.open("POST", url, true);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {
    console.log(request.responseText);

    if (request.readyState === 4 && request.status === 200 && request.responseText !== "FalseLogin") {
      //document.cookie = "login=" + login + ";max-age=3600";
      //document.cookie = "password=" + password + ";max-age=3600";
      document.cookie = "key=" + request.responseText + ";max-age=3600";
      app.render(<SetUserPage />)
    }
  });

  request.send(params);
}

const app = ReactDOMClient.createRoot(document.getElementById("app"))

app.render(<SetMainPage />)
import React, { useState } from "react"
import ReactDOMClient from "react-dom/client"
import './index.css'
import './menue.css'
import { SetUserPage, gc } from './userpage.js'
import { k } from './tariffs'
import Menue2 from "./Menue/Menue2"
import './Menue/menue2.css'
import { ShowTariffs } from './tariffs'
import { getTokenn, onMessageListener } from './firebase.js'

export function MainPage() {
  const [isTokenFound, setTokenFound] = useState(false);
  getTokenn(setTokenFound);

  return (
    <div id="userInformation">
      <h1 id="h1name">Главная страница</h1>
      {isTokenFound && <>Уведомления включены 👍🏻</>}
      {!isTokenFound && <>Need notification permission ❗️</>}
      <main id="mainpc">
        <div id="userSettings"> {/* Для пк */}
          <p onClick={(event)=>{k(event.target.textContent)}}>Тарифы</p>
          <p onClick={SetLogin}>Вход</p>
          <p onClick={SetReg}>Регистрация</p>
        </div>
        <div id="news">
          <div id="news1">
            <p  id="n1">Новости</p>
          </div>
          <div id="news2">
          <p id="n2">Акции</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export function SetMainPage() {
  if (gc("key")) {
    app.render(<SetUserPage />);
  } else {
    menue(<MainPage />);
  }
}

function Login() {
  return (
    <form className="box" action="/" method="post" id="mainform">
      <h1 id="l">Вход</h1>
      <p className="pf" onClick={SetReg}>Регистрация</p>
      <p className="pf" onClick={SetMainPage}>Главная</p>
      <input className="bf" type="text" name="login" placeholder="Логин" id="login" />
      <input className="bf" type="password" name="password" placeholder="Пароль" id="password" />
      <input type="button" className="btn" name="do_login" value="Войти" onClick={loginFunc} />
    </form>
  );
}

export function SetLogin() {
  app.render(<Login />)
}

function Reg() {
  return (
    <form className="box" action="/" method="post" id="mainform">
      <h1>Регистрация</h1>
      <p className="pf" onClick={SetLogin}>Вход</p>
      <p className="pf" onClick={SetMainPage}>Главная</p>
      <input type="text" name="login" placeholder="Логин" id="login" />
      <input type="password" name="password1" placeholder="Пароль" id="password1" />
      <input type="password" name="password2" placeholder="Пароль повтор" id="password2" />
      <input type="button" className="btn" name="do_reg" value="Зарегистрироваться" onClick={regFunc} />
    </form>
  );
}

export function SetReg() {
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
      document.cookie = "logint=" + login + ";max-age=3600";
      app.render(<Login />)
    }
  });

  request.send(params);
}

function loginFunc() {
  var obj;
  var ta = [];

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
      var answer = request.responseText;
      var array = answer.split(';');

      for (let i = 1; i < array.length; i++) {
        obj = JSON.parse(array[i]);
        ta.push(obj);
      }

      document.cookie = "key=" + obj.Cookies + ";max-age=3600";
      document.cookie = "login=" + obj.Login + ";max-age=3600";
      app.render(<SetUserPage />)
    }
  });

  request.send(params);
}

//menue
export function Menue(props) {
  const [menueActive, setMenueActive] = useState(false);
  const items = [{ value: "Main", href: "/main", icon: "anchor" }, { value: "Main2", href: "/main", icon: "anchor" }]

  return (
    <div className="app">
      <nav id="navmenu"> {/* Изменение меню */}
        <div className="burger-btn" onClick={() => setMenueActive(!menueActive)}>
          <span></span>
        </div>
      </nav>
      <main>
        {props.m}
      </main>
      <Menue2 active={menueActive} setActive={setMenueActive} header={props.name} items={props.items} g={props.g} />
    </div>
  );
};

export function menue(props) {
  app.render(<Menue g="2" m={props} name="Главная" items={[{ value: "Тест", href: "/main", icon: "anchor" }]} />);
}

const app = ReactDOMClient.createRoot(document.getElementById("app"))

app.render(<SetMainPage />)
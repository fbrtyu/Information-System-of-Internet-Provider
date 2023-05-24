import React, { useState } from "react"
import ReactDOMClient from "react-dom/client"
import './index.css'
import './menue.css'
import { SetUserPage, gc } from './userpage.js'
import { k } from './tariffs'
import Menue2 from "./Menue/Menue2"
import './Menue/menue2.css'
import { ShowTariffs } from './tariffs'
import { getTokenn, onMessageListener  } from './firebase.js'

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  getTokenn(setTokenFound);

  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  return (
    <div className="App">
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
      </header>
    </div>
  );
}

export function MainPage() {
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

  /*   if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./sw.js')
        .then(event => {
          console.log('Service worker registered', event);
        });
  
      function requestPermission() {
        return new Promise(function (resolve, reject) {
          const permissionResult = Notification.requestPermission(function (result) {
            // Поддержка устаревшей версии с функцией обратного вызова.
            resolve(result);
          });
  
          if (permissionResult) {
            permissionResult.then(resolve, reject);
          }
        })
          .then(function (permissionResult) {
            if (permissionResult !== 'granted') {
              throw new Error('Permission not granted.');
            }
          });
      }
  
      requestPermission();
    } */

  const [isTokenFound, setTokenFound] = useState(false);
  getTokenn(setTokenFound);

  return (
    <div>
      <h1>Главная страница</h1>
        {isTokenFound && <>Уведомления включены 👍🏻</>}
        {!isTokenFound && <>Need notification permission ❗️</>}
      <main>
        <div id="news">
            <div id="news1">
              Новости
            </div>

            <div id="news2">
              Акции
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
    //app.render(<MainPage />);
    //app.render(<Menue />);
    menue(<MainPage />);
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

export function SetLogin() {
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

//menue
export function Menue(props) {
  const [menueActive, setMenueActive] = useState(false);
  const items = [{ value: "Main", href: "/main", icon: "anchor" }, { value: "Main2", href: "/main", icon: "anchor" }]
  return (
    <div className="app">
      <nav>
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
import React from "react"
import ReactDOMClient from "react-dom/client"
//import { k } from './tariffs'
import { VideoChat } from './videochat'
import { chtariffset } from './changetariff'
import { ctrlAcc } from './controlaccess'
import { userSupport } from './usersupport'
import { userTreaty } from './usertreaty'
import { controlSchedule } from './schedule'
import { sysStat } from './sysstats'
import { Menue, SetMainPage } from './index.js'
import { chInfo } from './changeInfo.js'

/* var userPage = {
  Name: "Name",
  Speed: "Speed",
  Cost: "Cost",
  IDtariff: "IDtariff",
  IDClient: "IDClient",
  Role: "Role",
  AccountNumber: "AccountNumber",
  Balans: "Balans",
  FIO: "FIO",
  Address: "Address",
  Mobile: "Mobile",
  Email: "Email"
} */

export var userPage;

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function Chpass() {
  return (
    <div id="chpass">
      <p>Старый пароль</p><input type="password" name="oldpass" placeholder="Старый пароль" id="oldpass" />
      <p>Новый пароль</p><input type="password" name="newpass1" placeholder="Новый пароль" id="newpass1" />
      <p>Повтор нового пароля</p><input type="password" name="newpass2" placeholder="Повтор нового пароля" id="newpass2" />
      <button onClick={chpassser} id="chpassb">Изменить</button>
      <a id="messchpass" style={{ display: "none" }} href="/">Пароль успешно изменен, перейти в ЛК</a>
    </div>
  )
}

function chpass() {
  const userSettings = ReactDOMClient.createRoot(document.getElementById("userInformation"));
  userSettings.render(<Chpass />);
}

function chpassser() {
  const request = new XMLHttpRequest();

  const url = "http://localhost:8080/chpass";

  const params = "key=" + getCookie("key") + "&oldpass=" + document.getElementById("oldpass").value +
    "&newpass1=" + document.getElementById("newpass1").value + "&newpass2=" + document.getElementById("newpass2").value;

  request.open("POST", url, true);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {

    if (request.readyState === 4 && request.status === 200) {
      //document.cookie = "key=" + request.responseText + ";max-age=3600";
      document.getElementById("chpassb").style.display = "none";
      document.getElementById("messchpass").style = "block";
    } else {
      console.log(request.status);
    }
  });

  request.send(params);
}

export function ShowUserInfo(props) {
  return (
    <div id="userFullInfo">
      <div id="inf">
        <p id="ul">Ваш логин: {props.u.Login}</p>
        <p id="utn">Ваш тариф: {props.u.Name}</p>
        <p id="uts">Скорость тарифа: {props.u.Speed} Mbit/s</p>
        <p id="utc">Стоимость тарифа: {props.u.Cost} руб.</p>
        <button onClick={chpass}>Сменить пароль</button>
      </div>
      <div id="inf">
        <p>ФИО: {props.u.FIO}</p>
        <p>Адрес: {props.u.Address}</p>
        <p>Мобильный: {props.u.Mobile}</p>
        <p>E-mail: {props.u.Email}</p>
        <button onClick={chInfo}>Изменить данные</button>
      </div>
      <div id="inf">
        <p>Номер счёта: {props.u.AccountNumber}</p>
        <p>Баланс: {props.u.Balans}</p>
        <button>Оплатить</button>
      </div>
    </div>
  )
}

export function show() {
  const userSettings = ReactDOMClient.createRoot(document.getElementById("userInformation"));
  userSettings.render(<ShowUserInfo u={userPage} />);
}

function Iii(props) {

  return (
    <div>
      <Menue name="Личный кабинет" g="1" />
      <h1><a href="/" style={{ color: "brightblue" }}>Личный кабинет</a></h1>
      <div id="userSettings">
{/*         <a><p onClick={show}>Личная информация</p></a>
        <a><p onClick={userSupport}>Поддержка</p></a>
        <a><p onClick={userTreaty}>Информация договора</p></a>
        <a><p onClick={exit}>Выйти</p></a> */}
      </div>
      <div id="userInformation">
        <div id="inf">
          <p>Номер счёта: {props.u.AccountNumber}</p>
          <p>Баланс: {props.u.Balans}</p>
          <button>Оплатить</button>
        </div>
      </div>
    </div>
  )
}

//SysAdmin
function GetMess() {
  return (
    <div>
      <p>Список сообщений</p>
      <select size="10" id="listTariff">
        <option>234</option>
      </select>
      <button>Готово</button>

      <p>Текст сообщения</p>
      <textarea placeholder="Результат" id="nameTariffch"></textarea>
    </div>
  )
}

export function getMess() {
  const userSettings = ReactDOMClient.createRoot(document.getElementById("fullinfo"));
  userSettings.render(<GetMess />);
}

function Iii2(props) {
  return (
    <div>
      <Menue name="Личный кабинет" g="4" />
      <h1><a href="/" style={{ color: "brightblue" }}>Личный кабинет</a></h1>
      <div id="userSettings">
{/*     <a><p>Личная информация</p></a>
        <a><p onClick={chtariffset}>Управление тарифами</p></a>
        <a><p onClick={ctrlAcc}>Управление правами доступа</p></a>
        <a><p onClick={VideoChat}>Смотреть трансляцию</p></a>
        <a><p onClick={controlSchedule}>Управление расписанием</p></a>
        <a><p onClick={sysStat}>Статистика</p></a>
        <a><p onClick={exit}>Выйти</p></a> */}
      </div>
      <div id="fullinfo"></div>
    </div>
  )
}

//analitik
function Iii3(props) {
  return (
    <div>
      <Menue name="Личный кабинет" g="5" />
      <h1><a href="/" style={{ color: "brightblue" }}>Личный кабинет</a></h1>
      <div id="userSettings">
{/*     <a><p>Личная информация</p></a>
        <a><p onClick={chtariffset}>Управление тарифами</p></a>
        <a><p onClick={ctrlAcc}>Управление правами доступа</p></a>
        <a><p onClick={VideoChat}>Смотреть трансляцию</p></a>
        <a><p onClick={controlSchedule}>Управление расписанием</p></a>
        <a><p onClick={sysStat}>Статистика</p></a>
        <a><p onClick={exit}>Выйти</p></a> */}
      </div>
      <div id="fullinfo"></div>
    </div>
  )
}

//Support
function GetSup() {
  return (
    <div>
      <p>Список обращений</p>
      <select size="10" id="listTariff">
        <option>234</option>
      </select>
      <button>Готово</button>

      <p>Текст сообщения</p>
      <textarea placeholder="Результат" id="nameTariffch"></textarea>

      <p>Ответ</p>
      <textarea placeholder="Ответ" id="nameTariffch"></textarea>
      <button>Отправить</button>
      <button>Отправить сисадмину</button>
    </div>
  )
}

export function getSup() {
  const userSettings = ReactDOMClient.createRoot(document.getElementById("fullinfo"));
  userSettings.render(<GetSup />);
}

function Iii4(props) {
  return (
    <div>
      <Menue name="Личный кабинет" g="6" />
      <h1><a href="/" style={{ color: "brightblue" }}>Личный кабинет</a></h1>
      <div id="userSettings">
{/*     <a><p>Личная информация</p></a>
        <a><p onClick={chtariffset}>Управление тарифами</p></a>
        <a><p onClick={ctrlAcc}>Управление правами доступа</p></a>
        <a><p onClick={VideoChat}>Смотреть трансляцию</p></a>
        <a><p onClick={controlSchedule}>Управление расписанием</p></a>
        <a><p onClick={sysStat}>Статистика</p></a>
        <a><p onClick={exit}>Выйти</p></a> */}
      </div>
      <div id="fullinfo"></div>
    </div>
  )
}

export function exit() {
  //document.cookie = "login=0;max-age=0";
  //document.cookie = "password=0;max-age=0";
  document.cookie = "key=0;max-age=0";
  app.render(<SetMainPage />);
}

const app = ReactDOMClient.createRoot(document.getElementById("app"))

export function SetUserPage() {
  const request = new XMLHttpRequest();

  const url = "http://localhost:8080/lk";

  const params = "key=" + getCookie("key");

  request.open("POST", url, true);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {

    if (request.readyState === 4 && request.status === 200 && request.responseText !== "You no login!") {
      const obj = JSON.parse(request.responseText);

      userPage = obj;

      if (obj.Role === 0) {
        app.render(<Iii u={obj} />); //Client
      } else if (obj.Role === 1) {
        app.render(<Iii2 u={obj} />); //SysAdmin
      } else if (obj.Role === 2) {
        app.render(<Iii3 u={obj} />); //Analitik
      } else if (obj.Role === 3) {
        app.render(<Iii4 u={obj} />); //Support
      }
    }
  });

  request.send(params);
}

export function gc(cname) {
  return getCookie(cname);
}
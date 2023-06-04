import React from "react"
import ReactDOMClient from "react-dom/client"
import { VideoChat } from './videochat'
import { chtariffset } from './changetariff'
import { ctrlAcc } from './controlaccess'
import { userSupport } from './usersupport'
import { userTreaty } from './usertreaty'
import { controlSchedule } from './schedule'
import { sysStat } from './sysstats'
import { Menue, SetMainPage } from './index.js'
import { chInfo } from './changeInfo.js'
import { useState } from "react"
import { ShowTariffs, k } from './tariffs'
import { ShowTariffs2 } from './tariffs'

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
      <br></br><br></br>
      <button className="btn" onClick={chpassser} id="chpassb">Изменить</button>
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
        <p id="uts">Скорость тарифа: {props.u.Speed} Мбит/с</p>
        <p id="utc">Стоимость тарифа: {props.u.Cost} руб.</p>
        <button className="btn" onClick={chpass}>Сменить пароль</button>
      </div>
      <div id="inf">
        <p>ФИО: {props.u.FIO}</p>
        <p>Адрес: {props.u.Address}</p>
        <p>Мобильный: {props.u.Mobile}</p>
        <p>E-mail: {props.u.Email}</p>
        <button className="btn" onClick={chInfo}>Изменить данные</button>
      </div>
    </div>
  )
}

//Функция для отображения компонета
export function show(e) {
  const userSettings = ReactDOMClient.createRoot(document.getElementById("userInformation"));
  document.getElementById("h1name").textContent = e;
  userSettings.render(<ShowUserInfo u={userPage} />); // Вызов компонента для показа информации пользователя
}

//Компонент который будет отображаться, если в ИС зашёл клиент провайдера
function Iii(props) {
  return (
    <div>
      <Menue name="Личный кабинет" g="1" /> {/* Копонент меню */}
      <div id="userSettings">
        <a><p onClick={(event)=>{show(event.target.textContent)}}>Личная информация</p></a> {/* Вызов функции для отображения компонента личной информации */}
        <a><p onClick={(event)=>{userSupport(event.target.textContent)}}>Поддержка</p></a>
        <a><p onClick={(event)=>{userTreaty(event.target.textContent)}}>Информация договора</p></a>
        <a><p onClick={exit}>Выйти</p></a>
      </div>
      <h1><a id="h1name" href="/" style={{ color: "brightblue" }}>Личный кабинет</a></h1>
      <div id="userInformation">
        <div id="inf">
          <p>Номер счёта: {props.u.AccountNumber}</p>
          <p>Баланс: {props.u.Balans} руб.</p>
          <button className="btn">Оплатить</button>
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
      <button className="btn">Готово</button>

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
      <div id="userSettings">
        <a><p onClick={(event)=>{chtariffset(event.target.textContent)}}>Управление тарифами</p></a>
        <a><p onClick={(event)=>{ctrlAcc(event.target.textContent)}}>Управление правами доступа</p></a>
        <a><p onClick={(event)=>{VideoChat(event.target.textContent)}}>Смотреть трансляцию</p></a>
        <a><p onClick={(event)=>{controlSchedule(event.target.textContent)}}>Управление расписанием</p></a>
        <a><p onClick={exit}>Выйти</p></a>
      </div>
      <h1><a id="h1name" href="/" style={{ color: "brightblue" }}>Личный кабинет</a></h1>
      <div id="fullinfo"></div>
    </div>
  )
}

//analitik
function Iii3(props) {
  return (
    <div>
      <Menue name="Личный кабинет" g="5" />
      <div id="userSettings">
            <a><p>Личная информация</p></a>
        <a><p onClick={chtariffset}>Управление тарифами</p></a>
        <a><p onClick={ctrlAcc}>Управление правами доступа</p></a>
        <a><p onClick={VideoChat}>Смотреть трансляцию</p></a>
        <a><p onClick={controlSchedule}>Управление расписанием</p></a>
        <a><p onClick={sysStat}>Статистика</p></a>
        <a><p onClick={exit}>Выйти</p></a>
      </div>
      <h1><a href="/" style={{ color: "brightblue" }}>Личныпй кабинет</a></h1>
      <div id="fullinfo"></div>
    </div>
  )
}

//Support
var obj;

var ta = [];

var idSup = 0;

function setV(props) {
  console.log(props);
  console.log(ta);
  var tariff = ta.find(el => el.Date == props);
  console.log(tariff.Body);
  idSup = tariff.ID;
  document.getElementById("nameTariffch").value = tariff.Body;
}

function sendsup() {
  const request = new XMLHttpRequest();

  const url = "http://localhost:8080/anssup";

  const params = "Answer=" + document.getElementById("answerSup").value + "&ID=" + idSup;

  request.open("POST", url, true);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {

    if (request.readyState === 4 && request.status === 200) {
      getSup();
    }
  });

  request.send(params);
}

function GetSup(props) {
  const [value, setValue] = useState('');

  const options = props.t.map((item) => {
    if (item.State == 1) {
      return <option key={item.ID}>{item.Date}</option>;
    }

  });

  return (
    <div id="controlTariff">
      <div id="getsup">
        <p id="suptext">Обращение</p>
        <textarea placeholder="Текст обращения" id="nameTariffch"></textarea>
        <br></br>
        <textarea placeholder="Ответ" id="answerSup"></textarea>
        <br></br>
        <button className="btn" id="btnsup" onClick={sendsup}>Отправить</button>
      </div>

      <div>
        <p>История обращений</p>
        <select id="listTariff" size="3" value={value} onChange={(event) => { setValue(event.target.value); setV(event.target.value) }}>
          {options}
        </select>
      </div>
    </div>
  )
}

export function getSup(e) {
  document.getElementById("h1name").textContent = e;
  ta = [];

  const request = new XMLHttpRequest();

  const url = "http://localhost:8080/getsup";

  request.open("GET", url, true);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {

    if (request.readyState === 4 && request.status === 200) {
      var answer = request.responseText;
      var array = answer.split(';');

      for (let i = 1; i < array.length; i++) {
        obj = JSON.parse(array[i]);
        ta.push(obj);
      }
    }
    const userSettings = ReactDOMClient.createRoot(document.getElementById("fullinfo"));
    userSettings.render(<GetSup t={ta} />);
  });

  request.send();
}

function Iii4(props) {
  return (
    <div>
      <Menue name="Личный кабинет" g="6" />
      <div id="userSettings">
        <a><p onClick={(event)=>{VideoChat(event.target.textContent)}}>Смотреть трансляцию</p></a>
        <a><p onClick={(event)=>{controlSchedule(event.target.textContent)}}>Управление расписанием</p></a>
        <a><p onClick={(event)=>{getSup(event.target.textContent)}}>Обращения</p></a>
        <a><p onClick={exit}>Выйти</p></a>
      </div>
      <h1><a id="h1name" href="/" style={{ color: "brightblue" }}>Личный кабинет</a></h1>
      <div id="fullinfo"></div>
    </div>
  )
}

export function exit() {
  document.cookie = "key=0;max-age=0";
  app.render(<SetMainPage />);
}

const app = ReactDOMClient.createRoot(document.getElementById("app"))

var obj;

var ta = [];

function tariffs2() {
  ta = [];

  const request = new XMLHttpRequest();

  const url = "http://localhost:8080/tariffs";

  request.open("GET", url, true);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {

      if (request.readyState === 4 && request.status === 200) {
          var answer = request.responseText;
          var array = answer.split(';');

          for (let i = 1; i < array.length; i++) {
              obj = JSON.parse(array[i]);
              ta.push(obj);
          }
      }
      const userInformation = ReactDOMClient.createRoot(document.getElementById("app"));
      document.cookie = "logint=" + "login" + ";max-age=0";
      userInformation.render(<ShowTariffs2 t={ta} />);
  });

  request.send();
}

export function SetUserPage() {
  //Инициализация перемнной для отправки запроса на сервер
  const request = new XMLHttpRequest();

  const url = "http://localhost:8080/lk";
  //Получение ключа клиента из Cookies браузера и запись его в параметра запроса
  const params = "key=" + getCookie("key");

  request.open("POST", url, true);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //Выполнение запроса и проверка ответа
  request.addEventListener("readystatechange", () => {

    if (request.readyState === 4 && request.status === 200 && request.responseText !== "You no login!") {
      console.log(request.responseText);
      if (request.responseText === "bad") {
        document.cookie = "t=" + request.responseText + ";max-age=3600";
        tariffs2();
      } else {
        const obj = JSON.parse(request.responseText);

        userPage = obj;
        //В зависимости от полученной роли происходит рендер опредеоенного компонента, 
        //в него же передаются через просы данные клиента, которые будут отображаться в веб-интерфесте
        if (obj.Role === 0) {
          app.render(<Iii u={obj} />); //Client
        } else if (obj.Role === 1) {
          app.render(<Iii2 u={obj} />); //SysAdmin
        } else if (obj.Role === 2) {
          app.render(<Iii3 u={obj} />);
        } else if (obj.Role === 3) {
          app.render(<Iii4 u={obj} />); //Support
        }
      }
    }
  });

  request.send(params);
}

export function gc(cname) {
  return getCookie(cname);
}
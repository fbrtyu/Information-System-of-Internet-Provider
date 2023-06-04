import React from "react"
import ReactDOMClient from "react-dom/client"
import { gc } from './userpage.js'

function setInfo() {
    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/setinfo";
  
    const params = "key=" + gc("key") + "&Mobile=" + document.getElementById("newpass1").value + "&Email=" + document.getElementById("newpass2").value;
  
    request.open("POST", url, true);
  
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    request.addEventListener("readystatechange", () => {
  
      if (request.readyState === 4 && request.status === 200) {
        console.log("Данные изменились!");
      } else {
        console.log(request.status);
      }
    });
  
    request.send(params);

    console.log("ch");
}

function ChInfo() {
    return (
        <div id="userFullInfo">
            <div id="inf">
                <p>Новые данные</p>
                <div id="chpass">
                    <p>Новый мобильный</p><input type="text" name="newpass1" placeholder="Новый пароль" id="newpass1" />
                    <p>Новый E-mail</p><input type="text" name="newpass2" placeholder="Повтор нового пароля" id="newpass2" />
                    <button className="btn" onClick={setInfo} id="chpassb">Изменить</button>
                    <a id="messchpass" style={{ display: "none" }} href="/">Пароль успешно изменен, перейти в ЛК</a>
                </div>
            </div>
        </div>
    )
}

export function chInfo() {
    const fullinfo = ReactDOMClient.createRoot(document.getElementById("userFullInfo"));
    fullinfo.render(<ChInfo />);
}
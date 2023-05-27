import React, { useId, useState } from "react"
import ReactDOMClient from "react-dom/client"
import { gc, show } from './userpage.js'
import { Menue } from './index.js'

const app = ReactDOMClient.createRoot(document.getElementById("app"));

var obj;

var ta = [];

function tariffs() {
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
        //app.render(<ShowTariffs t={ta} />);
        const userInformation = ReactDOMClient.createRoot(document.getElementById("userInformation"));
        userInformation.render(<ShowTariffs t={ta} />);
    });

    request.send();
}

export function ShowTariffs(props) {
    let [click, setClick] = useState("");
    
    let res = props.t.map(function (item) {
        return <div key={item.ID}>
            <p>Название: {item.Name}
                <button id="btntariff" onClick={() => setClick(document.getElementById(item.Name).style.display = "block")}>Подробнее</button></p>
            <div className="full" id={item.Name}>
                <p>Скорость: {item.Speed} Мбит/с</p>
                <p>Стоимость: {item.Cost} руб.</p>
            </div>
        </div>
    });

    let res2 = props.t.map(function (item) {
        return <div key={item.ID}>
            <p>Название: {item.Name} Стоимость: {item.Cost}
                <button onClick={() => setClick(document.getElementById(item.Name).style.display = "block")}>Подробнее</button></p>
            <div className="full" id={item.Name}>
                <p>{item.Speed}</p>
                <button onClick={Buy} value={item.ID}>Оформить</button>
            </div>
        </div>;
    });

    if (gc("login")) {
        return (
            <div id="userInformation">
                
                {res2}
            </div>
        )
    } else {
        //if (gc("t")) {
            return (
                <div id="userInformation">
                    
                    {res}
                </div>
            )
        //}
    }
}

export function ShowTariffs2(props) {
    let [click, setClick] = useState("");
    
    let res = props.t.map(function (item) {
        return <div key={item.ID}>
            <p>Название: {item.Name}
                <button id="btntariff" onClick={() => setClick(document.getElementById(item.Name).style.display = "block")}>Подробнее</button></p>
            <div className="full" id={item.Name}>
                <p>Скорость: {item.Speed} Мбит/с</p>
                <p>Стоимость: {item.Cost} руб.</p>
            </div>
        </div>
    });

    let res2 = props.t.map(function (item) {
        return <div key={item.ID}>
            <p>Название: {item.Name} Стоимость: {item.Cost}
                <button onClick={() => setClick(document.getElementById(item.Name).style.display = "block")}>Подробнее</button></p>
            <div className="full" id={item.Name}>
                <p>{item.Speed}</p>
                <button onClick={(e)=>{Buy(e)}} value={item.ID} id={item.Cost}>Оформить</button>
            </div>
        </div>;
    });

    if (gc("t")) {
        return (
            <div id="userInformation">
                <p>ФИО</p><input type="text" name="newpass1" placeholder="Новый пароль" id="fio" />
                <p>Адрес</p><input type="text" name="newpass2" placeholder="Повтор нового пароля" id="address" />
                {res2}
            </div>
        )
    } else {
        if (gc("t")) {
            return (
                <div id="userInformation">
                    
                    {res}
                </div>
            )
        }
    }
}

function Buy(e) {
    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/settariff";

    const params = "id=" + e.target.value + "&cost=" + e.target.id + "&address=" + 
    document.getElementById("address").value + "&fio=" + document.getElementById("fio").value + "&key=" + gc("key");

    request.open("POST", url, true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 && request.status === 200) {
            console.log("OK");
            //show();
            window.location.reload();
        }
    });

    request.send(params);
}

export function k() {
    return tariffs();
}
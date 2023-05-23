import React, { useId, useState } from "react"
import ReactDOMClient from "react-dom/client"
import { gc } from './userpage.js'
import { Menue } from './index.js'

const app = ReactDOMClient.createRoot(document.getElementById("app"));

var obj;

var ta = [];

function tariffs() {

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
        app.render(<ShowTariffs t={ta} />);
    });

    request.send();
}

export function ShowTariffs(props) {
    let [click, setClick] = useState("");
    
    let res = props.t.map(function (item) {
        return <div key={item.ID}>
            <p>Название: {item.Name} Стоимость: {item.Cost} руб.
                <button onClick={() => setClick(document.getElementById(item.Name).style.display = "block")}>Подробнее</button></p>
            <div className="full" id={item.Name}>
                <p>Скорость: {item.Speed} Мбит/с</p>
            </div>
        </div>;
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
            <div>
                <Menue name="Тарифы" items={[{value: "Тест", href: "/main", icon: "anchor"}]} g="3"/>
                {res2}
            </div>
        )
    } else {
        return (
            <div>
                <Menue name="Тарифы" items={[{value: "Тест", href: "/main", icon: "anchor"}]} g="3"/>
                {res}
            </div>
        )
    }
}

const Buy = e => {
    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/settariff";

    const params = "ID=" + e.target.value + "&Login=" + gc("login");

    request.open("POST", url, true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 && request.status === 200) {
            console.log("OK", gc("login"));
        }
    });

    request.send(params);
}

export function k() {
    return tariffs();
}
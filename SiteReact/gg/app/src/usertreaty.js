import React from "react"
import ReactDOMClient from "react-dom/client"
import { userPage } from "./userpage";
import { useState } from "react"
import { gc } from './userpage.js'

var obj;

var ta = [];

var t1, t2, t3;

var idt = 0;

function setV(props) {
    console.log(props);
    console.log(ta);
    var tariff = ta.find(el => el.Name == props);
    console.log(tariff);

    t1 = tariff.Name;
    t2 = tariff.Speed;
    t3 = tariff.Cost;

    idt = tariff.ID;
}

function UserTreaty(props) {

    const [value, setValue] = useState('');

    const options = props.t.map((item) => {
        return <option key={item.ID}>{item.Name}</option>;
    });

    return (
        <div id="controlTariff">
            <div>
                <p>Тариф</p>
                <div id="inf">
                    <p id="utn">Ваш тариф: {userPage.Name}</p>
                    <p id="uts">Скорость тарифа: {userPage.Speed} Mbit/s</p>
                    <p id="utc">Стоимость тарифа: {userPage.Cost} руб.</p>
                    <br></br>
                    <p id="utn">Новый тариф: {t1}</p>
                    <p id="uts">Скорость тарифа: {t2} Mbit/s</p>
                    <p id="utc">Стоимость тарифа: {t3} руб.</p>
                    <button onClick={chtariff} >Сменить тариф</button>
                </div>
            </div>

            <div>
                <p>Список тарифов</p>
                <select id="listTariff" size="3" value={value} onChange={(event) => { setValue(event.target.value); setV(event.target.value) }}>
                    {options}
                </select>
            </div>
        </div>
    )
}

function chtariff() {
    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/settariff";

    const params = "key=" + gc("key") + "&ID=" + idt;

    request.open("POST", url, true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 && request.status === 200) {
            //document.cookie = "key=" + request.responseText + ";max-age=3600";
            //document.getElementById("chpassb").style.display = "none";
            //document.getElementById("messchpass").style = "block";
            console.log("Тариф изменился!");
        } else {
            console.log(request.status);
        }
    });

    request.send(params);
}

export function userTreaty() {

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
        const userInformation = ReactDOMClient.createRoot(document.getElementById("userInformation"));
        userInformation.render(<UserTreaty t={ta} />);
    });

    request.send();
}
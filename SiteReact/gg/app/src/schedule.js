import React, { useState } from "react"
import ReactDOMClient from "react-dom/client"
import { gc } from './userpage.js'
import IMask from 'imask'

var obj;

var ta = [];

function tariffs() {
    ta = [];

    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/streams";

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
            //console.log(ta);
        }
        //console.log(ta);
        const fullinfo = ReactDOMClient.createRoot(document.getElementById("fullinfo"));
        fullinfo.render(<ControlSchedule t={ta} />);
    });

    request.send();
}

function ControlSchedule(props) {
    let [click, setClick] = useState("");

    let res = props.t.map(function (item) {
        return <div key={item.ID}>
            <p>Тема: {item.Theme}</p>
            <p>Дата: {item.Date}</p>
        </div>
    });

    return (
        <div id="controlSchedule">
            <div id="listStream">
                <p>Список запланированных трансляций</p>
                {res}
            </div>

            <div id="selectDate">
                <p>Выберите дату: <input type="date" name="calendar" id="cal"></input></p>
                <p>Время: <input type="text" name="time" id="time" placeholder="ЧЧ:ММ:СС"></input></p>
                <p>Тема: <input type="text" name="themstream" id="themstream"></input></p>

                <button onClick={createStream}>Запланировать</button>
            </div>
        </div>
    )
}

export function controlSchedule() {
    tariffs();
}

function createStream() {
    var d = document.getElementById("cal").value;
    var t = document.getElementById("time").value;
    var theme = document.getElementById("themstream").value;

    var date = d + " " + t;

    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/setstream";

    const params = "key=" + gc("key") + "&Date=" + date + "&Theme=" + theme;

    request.open("POST", url, true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 && request.status === 200) {
            tariffs();
        }
    });

    request.send(params);
}
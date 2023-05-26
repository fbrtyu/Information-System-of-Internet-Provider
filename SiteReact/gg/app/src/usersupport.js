import React from "react"
import ReactDOMClient from "react-dom/client"
import { gc } from './userpage.js'
import { useState } from "react"

var obj;

var ta = [];

function setV(props) {
    console.log(props);
    console.log(ta);
    var tariff = ta.find(el => el.Date == props);
    console.log(tariff.Body);

    document.getElementById("nameTariffch").value = tariff.Body;
}

function UserSupport(props) {

    const [value, setValue] = useState('');

    const options = props.t.map((item) => {
        return <option key={item.IDS}>{item.Date}</option>;
    });

    return (
        <div id="controlTariff">
            <div>
                <p>Обращение</p>
                <textarea placeholder="Текст обращения" id="nameTariffch"></textarea>
                <br></br><br></br>
                <button>Отправить</button>
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

function sendsup() {
    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/sendsup";

    const params = "key=" + gc("key"); //id_client

    request.open("POST", url, true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 && request.status === 200) {
            var answer = request.responseText;
            //var array = answer.split(';');

            //for (let i = 1; i < array.length; i++) {
            //    obj = JSON.parse(array[i]);
            //    ta.push(obj);
            //}
        }
        //const userInformation = ReactDOMClient.createRoot(document.getElementById("userInformation"));
        //userInformation.render(<UserSupport t={ta} />);
    });

    request.send(params);
}

export function userSupport() {

    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/supuser";

    const params = "key=" + gc("key");

    request.open("POST", url, true);

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
        userInformation.render(<UserSupport t={ta} />);
    });

    request.send(params);
}
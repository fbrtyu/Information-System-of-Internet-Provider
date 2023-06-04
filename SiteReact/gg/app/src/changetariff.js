import React from "react"
import ReactDOMClient from "react-dom/client"
import { useState } from "react"

var obj;

var ta = [];

var t1, t2, t3;

var idt = 0;

function setV(props) {
    var tariff = ta.find(el => el.Name == props);

    t1 = tariff.Name;
    t2 = tariff.Speed;
    t3 = tariff.Cost;

    idt = tariff.ID;

    document.getElementById("nameTariffch").value = t1;
    document.getElementById("speedTariffch").value = t2;
    document.getElementById("costTariffch").value = t3;
}

function Chtariff(props) {

    const [value, setValue] = useState('');

    const options = props.t.map((item) => {
        return <option key={item.ID}>{item.Name}</option>;
    });

    return (
        <div id="controlTariff">
            <div id="chtariff1">
                <p>Добавить тариф</p>
                <label htmlFor="nameTariff">Название<span id="ss"></span></label>
                <input type="text" id="nameTariff"></input>
                <br></br><br></br>
                <label htmlFor="speedTariff">Скорость<span id="ss"></span></label>
                <input type="text" id="speedTariff"></input>
                <br></br><br></br>
                <label htmlFor="costTariff">Стоимость </label>
                <input type="text" id="costTariff"></input>
                <br></br><br></br>
                <button className="btn" onClick={addtariff}>Добавить</button>
            </div>

            <div id="chtariff1">
                <p>Изменение тарифа</p>
                <label htmlFor="nameTariffch">Название<span id="ss"></span></label>
                <input type="text" id="nameTariffch"></input>
                <br></br><br></br>
                <label htmlFor="speedTariffch">Скорость<span id="ss"></span></label>
                <input type="text" id="speedTariffch"></input> Мбит/с
                <br></br><br></br>
                <label htmlFor="costTariffch">Стоимость </label>
                <input type="text" id="costTariffch"></input> руб.
                <br></br><br></br>
                <button className="btn" onClick={chtariff}>Изменить</button>
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

export function chtariffset(e) {
    document.getElementById("h1name").textContent = e;
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
        const fullinfo = ReactDOMClient.createRoot(document.getElementById("fullinfo"));
        fullinfo.render(<Chtariff t = {ta}/>);
    });
    request.send();
}

function chtariff() {
    const request = new XMLHttpRequest();
    const url = "http://localhost:8080/updtariff";
    
    const params = "ID=" + idt + "&Name=" + document.getElementById("nameTariffch").value
     + "&Cost=" + document.getElementById("costTariffch").value
      + "&Speed=" + document.getElementById("speedTariffch").value;

    request.open("POST", url, true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 && request.status === 200) {
            chtariffset();
        }
    });
    request.send(params);
}

function addtariff() {
    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/addtariff";
    
    const params = "ID=" + idt + "&Name=" + document.getElementById("nameTariff").value
     + "&Cost=" + document.getElementById("costTariff").value
      + "&Speed=" + document.getElementById("speedTariff").value;

    request.open("POST", url, true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 && request.status === 200) {
            chtariffset();
        }
    });

    request.send(params);
}
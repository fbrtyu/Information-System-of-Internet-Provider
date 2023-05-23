import React, { useState } from "react"
import ReactDOMClient from "react-dom/client"

function CtrlAcc(props) {

    const [value, setValue] = useState('');

    const options = props.t.map((item) => {
        return <option key={item.Login}>{item.Login}</option>;
    });

    return (
        <div id="controlTariff">
            <div>
                <p>Изменение прав</p>
                <label for="nameTariffch">ID пользователя </label>
                <input type="text" id="nameTariffch"></input>
                <br></br><br></br>
                <label for="speedTariffch">Роль </label>
                <input type="text" id="speedTariffch" value={value}></input>
                <br></br><br></br>
                <button>Изменить</button>
            </div>

            <div>
                <p>Пользователи</p>
                    <select id="listTariff" size="3" value={value} onChange={(event) => setValue(event.target.value)}>
                        {options}
                    </select>
            </div>
        </div>
    )
}

export function ctrlAcc() {

    var obj;

    var ta = [];

    const app = ReactDOMClient.createRoot(document.getElementById("fullinfo"));

    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/chrole";

    request.open("GET", url, true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 && request.status === 200) {
            var answer = request.responseText;
            console.log(answer);
            var array = answer.split(';');

            for (let i = 1; i < array.length; i++) {
                obj = JSON.parse(array[i]);
                ta.push(obj);
            }
        }
        app.render(<CtrlAcc t={ta} />);
    });

    request.send();

    //const fullinfo = ReactDOMClient.createRoot(document.getElementById("fullinfo"));
    //fullinfo.render(<CtrlAcc />);
}
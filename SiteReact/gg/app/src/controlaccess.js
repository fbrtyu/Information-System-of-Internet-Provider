import React, { useState } from "react"
import ReactDOMClient from "react-dom/client"

var obj;

var ta = [];

var idSup = 0;

function setV(props) {
  //console.log(props);
  //console.log(ta);
  var tariff = ta.find(el => el.Login == props);
  //console.log(tariff.Body);
  idSup = tariff.Role;
  //document.getElementById("speedTariffch").value = tariff.Role;
}

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
                <input type="text" id="speedTariffch" value={idSup}></input>
                <br></br><br></br>
                <button onClick={chRole}>Изменить</button>
            </div>

            <div>
                <p>Пользователи</p>
                    <select id="listTariff" size="3" value={value} onChange={(event) => { setValue(event.target.value); setV(event.target.value) }}>
                        {options}
                    </select>
            </div>
        </div>
    )
}

export function ctrlAcc() {
    ta = [];

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
}

function chRole() {
    const request = new XMLHttpRequest();
  
    const url = "http://localhost:8080/setrole";
  
    const params = "Login=" + document.getElementById("listTariff").value + "&Role=" + document.getElementById("nameTariffch").value;
  
    request.open("POST", url, true);
  
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    request.addEventListener("readystatechange", () => {
  
      if (request.readyState === 4 && request.status === 200) {
        ctrlAcc();
      }
    });
  
    request.send(params);
  }
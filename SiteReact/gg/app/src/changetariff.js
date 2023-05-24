import React from "react"
import ReactDOMClient from "react-dom/client"

function Chtariff() {
    return (
        <div id="controlTariff">
            <div id="chtariff1">
                <p>Добавить тариф</p>
                <label for="nameTariff">Название </label>
                <input type="text" id="nameTariff"></input>
                <br></br><br></br>
                <label for="speedTariff">Скорость </label>
                <input type="text" id="speedTariff"></input>
                <br></br><br></br>
                <label for="costTariff">Стоимость </label>
                <input type="text" id="costTariff"></input>
                <br></br><br></br>
                <button>Добавить</button>
            </div>

            <div id="chtariff1">
                <p>Изменение тарифа</p>
                <label for="nameTariffch">Название </label>
                <input type="text" id="nameTariffch"></input>
                <br></br><br></br>
                <label for="speedTariffch">Скорость </label>
                <input type="text" id="speedTariffch"></input>
                <br></br><br></br>
                <label for="costTariffch">Стоимость </label>
                <input type="text" id="costTariffch"></input>
                <br></br><br></br>
                <button>Изменить</button>
            </div>

            <div>
                <p>Список тарифов</p>
                <select id="listTariff" size="10" multiple></select>
            </div>
        </div>
    )
}

export function chtariffset() {
    const fullinfo = ReactDOMClient.createRoot(document.getElementById("fullinfo"));
    fullinfo.render(<Chtariff />);
}
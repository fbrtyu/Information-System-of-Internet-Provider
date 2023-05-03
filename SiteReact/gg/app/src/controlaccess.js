import React from "react"
import ReactDOMClient from "react-dom/client"

function CtrlAcc() {
    return (
        <div id="controlTariff">
            <div>
                <p>Изменение прав</p>
                <label for="nameTariffch">ID пользователя </label>
                <input type="text" id="nameTariffch"></input>
                <br></br><br></br>
                <label for="speedTariffch">Роль </label>
                <input type="text" id="speedTariffch"></input>
                <br></br><br></br>
                <button>Изменить</button>
            </div>

            <div>
                <p>Пользователи</p>
                <select id="listTariff" size="10" multiple></select>
            </div>
        </div>
    )
}

export function ctrlAcc() {
    const fullinfo = ReactDOMClient.createRoot(document.getElementById("fullinfo"));
    fullinfo.render(<CtrlAcc />);
}
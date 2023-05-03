import React from "react"
import ReactDOMClient from "react-dom/client"
import { userPage } from "./userpage";

function UserTreaty() {
    return (
        <div id="controlTariff">
            <div>
                <p>Тариф</p>
                <div id="inf">
                    <p id="utn">Ваш тариф: {userPage.Name}</p>
                    <p id="uts">Скорость тарифа: {userPage.Speed} Mbit/s</p>
                    <p id="utc">Стоимость тарифа: {userPage.Cost} руб.</p>
                    <button>Сменить тариф</button>
                </div>
            </div>

            <div>
                <p>Список тарифов</p>
                <select id="listTariff" size="10" multiple></select>
            </div>
        </div>
    )
}

export function userTreaty() {
    const userInformation = ReactDOMClient.createRoot(document.getElementById("userInformation"));
    userInformation.render(<UserTreaty />);
}
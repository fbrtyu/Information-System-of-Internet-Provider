import React from "react"
import ReactDOMClient from "react-dom/client"

function UserSupport() {
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
                <select id="listTariff" size="10" multiple></select>
            </div>
        </div>
    )
}

export function userSupport() {
    const userInformation = ReactDOMClient.createRoot(document.getElementById("userInformation"));
    userInformation.render(<UserSupport />);
}
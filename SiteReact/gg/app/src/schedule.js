import React from "react"
import ReactDOMClient from "react-dom/client"

function ControlSchedule() {
    return (
        <div id="controlSchedule">
            <div id="listStream">
                <p>Список запланированных трансляций</p>
                <p>ФИО Тема ID</p>
            </div>

            <div id="selectDate">
                <p>Выберите дату: <input type="date" name="calendar"></input></p>
                <p>Тема: <input type="text" name="themstream"></input></p>
                <button>Запланировать</button>
            </div>
        </div>
    )
}

export function controlSchedule() {
    const fullinfo = ReactDOMClient.createRoot(document.getElementById("fullinfo"));
    fullinfo.render(<ControlSchedule />);
}
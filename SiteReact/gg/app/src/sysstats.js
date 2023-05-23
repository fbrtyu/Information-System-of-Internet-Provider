import React from "react"
import ReactDOMClient from "react-dom/client"

function SysStat() {
    return (
        <div id="sysStat">
            <p>Статистика входов выходов сотрудников</p>

            <p>Выберите дату от: <input type="date" name="calendar"></input></p>
            <p>Выберите дату до: <input type="date" name="calendar"></input></p>

            <textarea placeholder="Результат" id="nameTariffch"></textarea>
            <button>Вывести</button>
        </div>
    )
}

function SysStatClient() {
    return (
        <div id="sysStat">
            <p>Статистика ИС</p>

            <p>Выберите дату от: <input type="date" name="calendar"></input></p>
            <p>Выберите дату до: <input type="date" name="calendar"></input></p>

            <button>Покупки</button>
            <button>Обращения в поддержку</button>
            <button>Популярные тарифы</button>

            <textarea placeholder="Результат" id="nameTariffch"></textarea>
            <p>Графики</p>
            <button>Вывести</button>
        </div>
    )
}

export function sysStat() {
    const fullinfo = ReactDOMClient.createRoot(document.getElementById("fullinfo"));
    fullinfo.render(<SysStat />);
}

export function sysStatClient() {
    const fullinfo = ReactDOMClient.createRoot(document.getElementById("fullinfo"));
    fullinfo.render(<SysStatClient />);
}
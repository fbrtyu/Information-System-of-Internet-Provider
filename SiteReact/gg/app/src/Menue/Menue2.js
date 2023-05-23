import React from "react"
import ReactDOMClient from "react-dom/client"
import './menue2.css'
import { show } from '../userpage.js'
import { userSupport } from '../usersupport.js'
import { userTreaty } from '../usertreaty.js'
import { exit, getMess, getSup } from '../userpage.js'
import { k } from '../tariffs'
import { SetLogin, SetReg, menue, MainPage } from '../index.js'
import { controlSchedule } from '../schedule'
import { sysStat, sysStatClient } from '../sysstats'
import { VideoChat } from '../videochat'
import { chtariffset } from '../changetariff'
import { ctrlAcc } from '../controlaccess'

const Menue2 = ({ header, items, active, setActive, g }) => {
    if (g === "1") {
        let sigind = "0";

        if (sigind === "0") {
            document.getElementById("sig").innerText = "Выкл. уведомления";
        } else {
            document.getElementById("sig").innerText = "Вкл. уведомления";
        }

        function sig() {
            sigind = "1";
            alert("hi");

            if (sigind === "0") {
                document.getElementById("sig").innerText = "Выкл. уведомления";
            } else {
                document.getElementById("sig").innerText = "Вкл. уведомления";
            }
        }

        return (
            <div className={active ? 'menue2 active' : 'menue2'} onClick={() => setActive(false)}>
                <div className="blur" />
                <div className="menue_context" onClick={e => e.stopPropagation()}>
                    <div className="menue_header">{header}</div>
                    <ul>
                        {/* {items.map(item => 
                        <li>
                            <p onClick={showw}>{item.value}</p>
                            <span className="material-icons">{item.icon}</span>
                        </li>
                    )} */}
                        <li>
                            <p onClick={show}>Личная информация</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={userSupport}>Поддержка</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={userTreaty}>Информация договора</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p id="sig" onClick={sig}>123</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={exit}>Выйти</p>
                            <span className="material-icons">иконка</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    if (g === "2") {
        return (
            <div className={active ? 'menue2 active' : 'menue2'} onClick={() => setActive(false)}>
                <div className="blur" />
                <div className="menue_context" onClick={e => e.stopPropagation()}>
                    <div className="menue_header">{header}</div>
                    <ul>
                        {/* {items.map(item => 
                        <li>
                            <p onClick={showw}>{item.value}</p>
                            <span className="material-icons">{item.icon}</span>
                        </li>
                    )} */}
                        <li>
                            <p onClick={k}>Тарифы</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={SetLogin}>Вход</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={SetReg}>Регистрация</p>
                            <span className="material-icons">иконка</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    if (g === "3") {
        return (
            <div className={active ? 'menue2 active' : 'menue2'} onClick={() => setActive(false)}>
                <div className="blur" />
                <div className="menue_context" onClick={e => e.stopPropagation()}>
                    <div className="menue_header">{header}</div>
                    <ul>
                        {/* {items.map(item => 
                        <li>
                            <p onClick={showw}>{item.value}</p>
                            <span className="material-icons">{item.icon}</span>
                        </li>
                    )} */}
                        <li>
                            <p><a href="/">Главная</a></p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={SetLogin}>Вход</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={SetReg}>Регистрация</p>
                            <span className="material-icons">иконка</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    if (g === "4") {
        return (
            <div className={active ? 'menue2 active' : 'menue2'} onClick={() => setActive(false)}>
                <div className="blur" />
                <div className="menue_context" onClick={e => e.stopPropagation()}>
                    <div className="menue_header">{header}</div>
                    <ul>
                        {/* {items.map(item => 
                        <li>
                            <p onClick={showw}>{item.value}</p>
                            <span className="material-icons">{item.icon}</span>
                        </li>
                    )} */}
                        <li>
                            <p onClick={show}>Личная информация</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={chtariffset}>Управление тарифами</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={ctrlAcc}>Управление правами доступа</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={VideoChat}>Смотреть трансляцию</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={controlSchedule}>Управление расписанием</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={sysStat}>Статистика</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={getMess}>Сообщения</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={exit}>Выйти</p>
                            <span className="material-icons">иконка</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    if (g === "5") {
        return (
            <div className={active ? 'menue2 active' : 'menue2'} onClick={() => setActive(false)}>
                <div className="blur" />
                <div className="menue_context" onClick={e => e.stopPropagation()}>
                    <div className="menue_header">{header}</div>
                    <ul>
                        {/* {items.map(item => 
                        <li>
                            <p onClick={showw}>{item.value}</p>
                            <span className="material-icons">{item.icon}</span>
                        </li>
                    )} */}
                        <li>
                            <p onClick={show}>Личная информация</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={VideoChat}>Смотреть трансляцию</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={controlSchedule}>Управление расписанием</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={sysStatClient}>Статистика</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={getMess}>Сообщения</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={exit}>Выйти</p>
                            <span className="material-icons">иконка</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    if (g === "6") {
        return (
            <div className={active ? 'menue2 active' : 'menue2'} onClick={() => setActive(false)}>
                <div className="blur" />
                <div className="menue_context" onClick={e => e.stopPropagation()}>
                    <div className="menue_header">{header}</div>
                    <ul>
                        {/* {items.map(item => 
                        <li>
                            <p onClick={showw}>{item.value}</p>
                            <span className="material-icons">{item.icon}</span>
                        </li>
                    )} */}
                        <li>
                            <p onClick={show}>Личная информация</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={VideoChat}>Смотреть трансляцию</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={controlSchedule}>Управление расписанием</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={getSup}>Обращения</p>
                            <span className="material-icons">иконка</span>
                        </li>

                        <li>
                            <p onClick={exit}>Выйти</p>
                            <span className="material-icons">иконка</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Menue2;
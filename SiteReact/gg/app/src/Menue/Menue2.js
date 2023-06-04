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
        return (
            <div className={active ? 'menue2 active' : 'menue2'} onClick={() => setActive(false)}>
                <div className="blur" />
                <div className="menue_context" onClick={e => e.stopPropagation()}>
                    <div className="menue_header">{header}</div>
                    <ul>
                        <li>
                            <p onClick={(event)=>{show(event.target.textContent)}}>Личная информация</p>
                            <span className="material-icons">🔒</span>
                        </li>

                        {/* <li>
                            <p onClick={(event)=>{k(event.target.textContent)}}>Тарифы</p>
                            <span className="material-icons">🔍</span>
                        </li> */}

                        <li>
                            <p onClick={(event)=>{userSupport(event.target.textContent)}}>Поддержка</p>
                            <span className="material-icons">🔔</span>
                        </li>

                        <li>
                            <p onClick={(event)=>{userTreaty(event.target.textContent)}}>Информация договора</p>
                            <span className="material-icons">📃</span>
                        </li>

                        <li>
                            <p onClick={exit}>Выйти</p>
                            <span className="material-icons">👋</span>
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
                        <li>
                            <p onClick={(event)=>{k(event.target.textContent)}}>Тарифы</p>
                            <span className="material-icons">🔍</span>
                        </li>

                        <li>
                            <p onClick={SetLogin}>Вход</p>
                            <span className="material-icons">✔️</span>
                        </li>

                        <li>
                            <p onClick={SetReg}>Регистрация</p>
                            <span className="material-icons">🔑</span>
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
                        <li>
                            <p><a href="/">Главная</a></p>
                            <span className="material-icons">🏠</span>
                        </li>

                        <li>
                            <p onClick={SetLogin}>Вход</p>
                            <span className="material-icons">✔️</span>
                        </li>

                        <li>
                            <p onClick={SetReg}>Регистрация</p>
                            <span className="material-icons">🔑</span>
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
                        <li>
                            <p onClick={(event)=>{chtariffset(event.target.textContent)}}>Управление тарифами</p>
                            <span className="material-icons">📋</span>
                        </li>

                        <li>
                            <p onClick={(event)=>{ctrlAcc(event.target.textContent)}}>Управление правами доступа</p>
                            <span className="material-icons">🔧</span>
                        </li>

                        <li>
                            <p onClick={(event)=>{VideoChat(event.target.textContent)}}>Смотреть трансляцию</p>
                            <span className="material-icons">👀</span>
                        </li>

                        <li>
                            <p onClick={(event)=>{controlSchedule(event.target.textContent)}}>Управление расписанием</p>
                            <span className="material-icons">📆</span>
                        </li>

                        <li>
                            <p onClick={exit}>Выйти</p>
                            <span className="material-icons">👋</span>
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
                        <li>
                            <p onClick={show}>Личная информация</p>
                            <span className="material-icons">🔒</span>
                        </li>

                        <li>
                            <p onClick={VideoChat}>Смотреть трансляцию</p>
                            <span className="material-icons">👀</span>
                        </li>

                        <li>
                            <p onClick={controlSchedule}>Управление расписанием</p>
                            <span className="material-icons">📆</span>
                        </li>

                        <li>
                            <p onClick={getMess}>Обращения</p>
                            <span className="material-icons">✍</span>
                        </li>

                        <li>
                            <p onClick={exit}>Выйти</p>
                            <span className="material-icons">👋</span>
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
                        <li>
                            <p onClick={(event)=>{VideoChat(event.target.textContent)}}>Смотреть трансляцию</p>
                            <span className="material-icons">👀</span>
                        </li>

                        <li>
                            <p onClick={(event)=>{controlSchedule(event.target.textContent)}}>Управление расписанием</p>
                            <span className="material-icons">📆</span>
                        </li>

                        <li>
                            <p onClick={(event)=>{getSup(event.target.textContent)}}>Обращения</p>
                            <span className="material-icons">📞</span>
                        </li>

                        <li>
                            <p onClick={exit}>Выйти</p>
                            <span className="material-icons">👋</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Menue2;
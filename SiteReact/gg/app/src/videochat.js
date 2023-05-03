import ReactDOMClient from "react-dom/client"
import React, { useState, useRef, useEffect, useCallback } from "react";
import Hls from "hls.js";
import { gc } from './userpage.js'

const AppWs = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("");
    const ws = useRef(null);

    var clientMessage = {
        username: "username",
        destination: "destination",
        message: "message"
    }

    useEffect(() => {
        if (!isPaused) {
            ws.current = new WebSocket("ws:localhost:8080/ws"); // создаем ws соединение
            ws.current.onopen = () => setStatus("Соединение открыто");  // callback на ивент открытия соединения
            ws.current.onclose = () => setStatus("Соединение закрыто"); // callback на ивент закрытия соединения
            gettingData();
        }

        return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
    }, [ws, isPaused]);

    const gettingData = useCallback(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {//подписка на получение данных по вебсокету
            var a = JSON.parse(e.data, function (key, value) {
                if (key === 'username') return new String(value);
                return value;
            });
            setData(a);

            let chatmess = document.getElementById("chatmess");
            let newOption = new Option(a.username + ": " + a.message, "mess");
            chatmess.append(newOption);
        };
    });

    function sm() {
        clientMessage.username = gc("login");
        clientMessage.destination = "Client";
        clientMessage.message = document.getElementById("bs").value;
        ws.current.send(JSON.stringify(clientMessage));
    }

    return (
        <>
            {!!data &&
                <div>
                    <div>
                        <h2>{status}</h2>
                        <video id='video' controls></video>
                        <br></br>
                        <button id="onstream" onClick={vvv}>Включить трансляцию</button>
                    </div>
                    <button onClick={() => {
                        ws.current.close();
                        setIsPaused(!isPaused)
                    }}>{!isPaused ? 'Остановить соединение' : 'Открыть соединение'}</button>
                    <div>
                        <p>Сообщение: <input type="text" size="40" id="bs" /></p>
                    </div>
                    <button onClick={sm}>Отправить сообщение на сервер</button>
                    <p id="chat">Chat</p>

                    <select id="chatmess" name="select" size="10" multiple>
                    </select>
                </div>
            }
        </>
    )
    function vvv() {
        if (Hls.isSupported()) {
            var video = document.getElementById('video');
            var hls = new Hls();
            hls.lowLatencyMode = true;
            hls.loadSource('http://192.168.0.171:8080/hls/test.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () { video.play(); });
        }
    }
}

const app = ReactDOMClient.createRoot(document.getElementById("app"))

export function VideoChat() {
    app.render(<AppWs />)
}
# Информационная система для интернет-провайдера
<h1>React + Golang + MySQL</h1>

<p>Возможности системы:</p>
<ul>
  <li>JWT авторизация</li>
  <li>Разграничение прав доступа к функционалу системы</li>
  <li>Получение PUSH-уведомлений (Firebase)</li>
  <li>Смена пароля</li>
  <li>Обращение в поддержку</li>
  <li>Смена тарифа</li>
  <li>Заявка на подключение тарифа</li>
</ul>
</br>

<h2>Главная страница</h2>
<div align="center">
  <img src="https://github.com/fbrtyu/Information-System-of-Internet-Provider/blob/main/mainpage.jpg?raw=true" width="700"/>
</div>
</br>

<h2>Главная страница мобильная версия</h2>
<div align="center">
  <img src="https://github.com/fbrtyu/Information-System-of-Internet-Provider/blob/main/mainpagemobile.jpg?raw=true" width="700"/>
</div>
</br>

<h2>Личный кабинет</h2>
<div align="center">
  <img src="https://github.com/fbrtyu/Information-System-of-Internet-Provider/blob/main/lk.jpg?raw=true" width="700"/>
</div>
</br>

<h2>Страница смены пароля</h2>
<div align="center">
  <img src="https://github.com/fbrtyu/Information-System-of-Internet-Provider/blob/main/changepasswordmobile.jpg?raw=true" width="700"/>
</div>
</br>

<h2>Админ панель</h2>
<div align="center">
  <img src="https://github.com/fbrtyu/Information-System-of-Internet-Provider/blob/main/adminpanel.jpg?raw=true" width="700"/>
</div>
</br>

<h2>UML диаграмма классов</h2>
<div align="center">
  <img src="https://github.com/fbrtyu/Information-System-of-Internet-Provider/blob/main/1.jpg?raw=true" width="700"/>
</div>
</br>

<h2>Физическая модель БД</h2>
<div id="header" align="center">
  <img src="https://github.com/fbrtyu/Information-System-of-Internet-Provider/blob/main/3.jpg?raw=true" width="700"/>
</div>
</br>

<h2>Логическая модель БД</h2>
<div id="header" align="center">
  <img src="https://github.com/fbrtyu/Information-System-of-Internet-Provider/blob/main/4.jpg?raw=true" width="700"/>
</div>

Требования к системе
<p>1. Общие сведения</p>
<p>Данная ИС создана для интернет-провайдеров, чтобы автоматизировать некоторые бизнес-процессы. С её помощью можно выводить актуальную информацию о тарифных планах, заключать договор с клиентом, у каждого клиента есть личный кабинет, клиент может оставить отзыв или обратиться в поддержку. Так же по имеющимся данным в БД можно делать некоторые отчёты.</p>
<p>2. Назначение и цели создания (развития) системы</p>
<p>Данный продукт создаётся для автоматизации бизнес-процессов в компании интернет-провайдера. Для более лучшей коммуникации с клиентом, сбора данных, на основе которых можно будет корректировать некоторые бизнес-решения. Так же можно создать модуль оптимизации маршрутов для установщиков оборудования, тем самым ускорив процесс доставки и уменьшив затраты на поездки. А на основе данных об использовании тарифов, можно создавать новые или изменять имеющиеся, чтобы увеличить прибыль компании.</p>
</br>
<p>BPMN-диаграмма процесса создания заявки и договора</p>
<div align="center">
  <img src="https://github.com/fbrtyu/Information-System-of-Internet-Provider/blob/main/5.jpg?raw=true" width="700"/>
</div>
</br>
<p>BPMN-диаграмма процесса обращения в поддержку для смены IP-адреса</p>
<div align="center">
  <img src="https://github.com/fbrtyu/Information-System-of-Internet-Provider/blob/main/6.jpg?raw=true" width="700"/>
</div>
</br>
<p>Функциональные требования:</p>
<p>1. Авторизация и регистрация пользователя. Использование cookies-сессий или JWT.</p>
<p>2. Возможность проведения видео-трансляций. Необходимо использовать Nginx сервер, который будет обрабатывать входящие RTMP сигналы, конвертировать в HLS и DASH, рассылать видео в плеер.</p>
<p>3. Возможность создавать учётные записи с различными правами доступа к функционалу веб-приложения.</p>
<p>4. Иметь возможность редакировать данные клиентов. Нужно использовать REST API.</p>
<p>5. Веб-чат на трансляции. Для его реализации использовать WebSocket. Чат должен иметь возможность сохранять историю сообщений и показывать новым пользователям последние 10 сообщений.</p>
<br>
<p>Нефункциональные требования:</p>
<p>1. Адаптивный дизайн веб-приложения.</p>
<p>2. Плеер для трансляции, который будет работать на различных устройствах.</p>
<p>3. Задержка на трансляции от 1 до 3 секунд.</p>
<p>Имеются 3 роли, под которыми пользователь может зайти в ИС и выполнить некоторые действия.</p>
</br>
<p>1.	Клиент.</p>
<p>  a.	Создать заявку на подключение.</p>
<p>  b.	Войти в личный кабинет.</p>
<p>  c.	Обратиться в поддержку.</p>
<p>  d.	Сменить пароль.</p>
<p>  e.	Получать push-уведомления.</p>
<p>  f.	Изменить личные данные.</p>
</br>
<p>2.	Сотрудник поддержки.</p>
<p>  a.	Получать обращения и отвечать на них.</p>
<p>  b.	Доступ к прямым трансляциям.</p>
<p>  c.	Управление расписанием.</p>
<p>  d.	Получать push-уведомления.</p>
</br>
<p>3.	Системный администратор.</p>
<p>  a.	Управление тарифами.</p>
<p>  b.	Управление правами доступа.</p>
<p>  c.	Доступ к прямым трансляциям.</p>
<p>  d.	Управление расписанием трансляций.</p>
<p>  e.	Получать push-уведомления.</p>
<p>Настройки rtmp модуля</p>
<div id="header" align="center">
  <img src="7.jpg" width="700"/>
</div>

# Сократитель ссылок MERN

## Технологии:
- Javascript(React)
- NodeJS(Express)
- MongoDB

## Функционал
- Авторизация по JWT-токену.
  - Если токен истек, то авторизация на клиенте сбрасывается
  
- Сокращение ссылок и привязывание их к конкретному пользователю
  - Валидация ссылок
  - Конвертация отвалидированных ссылок к формату `http://<domain>`
  
  - Защита от множественных сокращений одной и той же ссылки(если ссылка уже есть, то он просто выдает ее короткий адрес)

## Использование
Склонируйте проект в нужную папку 

`
git clone <repository>
`

Склонируйте проект в нужную папку 

#### Для запуска в режиме разработки в проекта введите:

1. В конфиге config/default.json поменяете `mongoUrl` на ваш mongodb-кластер
([Подробнее](https://code.tutsplus.com/ru/tutorials/create-a-database-cluster-in-the-cloud-with-mongodb-atlas--cms-31840)).

2. Установите необходимые зависимости и запустите приложение в режиме разработки.
    ````
   npm install
   npm run dev
    ````

3. Все готово. Все запросы к API проксируются на 5000-порт.

#### Для запуска на сервере:

1. Обновим OC
    ```
    sudo apt-get update
    sudo apt-get upgrade
    ```

2. Установим некоторые пакеты для работы `npm`
    ```
    sudo apt-get install build-essential libssl-dev
    ```

3. Установим `nodejs` и `npm` и `pm2`
    (`pm2` нужен чтобы сервер не выключался при закрытии консоли).
    
    ```
    sudo apt-get install nodejs
    sudo apt-get install npm
    sudo npm install -g pm2
    ```

4. Установим небходимые пакеты через npm и создадим билд.
    ```
    sudo npm install
    sudo npm run client:install
    sudo npm run client:build
    ```

5. Запускаем сервер в production-режиме на фоне.
    ```
    pm2 start npm -- start  
    ```

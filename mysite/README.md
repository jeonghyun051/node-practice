# MySite on Node (Express)

## project manifest 파일(package.json) 생성
$ npm init -y

## 설치패키지
$ npm i express
$ npm i express-session
$ npm i ejs
$ npm i -D nodemon
$ npm i dotenv
$ npm i sequelize
$ npm i mysql2
& npm i moment                      // date format
& npm i winston                     // logging
& npm i winston-daily-rotate-file   // logging

## scripts in package.json
```JSON

  "scripts": {
    "start": "node index.js",
    "debug": "nodemon index.js"
  },

```
## project structure
<pre>
/mysite
    |--- index.js
    |--- package.json
    |--- pacage-lock.json
    |--- /node-modules
    |--- /config
    |--- /logging
    |--- /logs
    |--- /public
    |--- /routes
    |--- /controllers
    |--- /models
    |--- /views
            |--- /main
            |--- /user
            |--- /guestbook
</pre>
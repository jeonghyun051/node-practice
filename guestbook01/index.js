const http = require('http');
const path = require('path');
const express = require('express');

const guestbookRouter = require('./routes/guestbook');
const port = 8080;

// Application Setup
const application = express()
    // 1. static serve 
    .use(express.static(path.join(__dirname, 'public')))
    // 2. request body parser
    .use(express.urlencoded({extended: true})) // application/x-www-form-urlencoded
    .use(express.json())                       // application/json
    // 3. view engine setup
    .set('views', path.join(__dirname, 'views')) // views 경로 설정
    .set('view engine', 'ejs')
    // 4. request router
    .all('*', function(req, res, next) {    // 들어오는 전체경로
        res.locals.req = req;
        res.locals.res = res;
        next();
    })
    .use('/', guestbookRouter); // 주소창 / 설정

// Server Setup    
http.createServer(application)
    .on('listening', function(){
        console.info(`Http Server running on port ${port}`);
    })
    .on('error', function(error){
        if(error.syscall !== 'listen'){
            throw error;
        }
        switch(error.code){
            case 'EACCESS':
                console.error(`Port:${port} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`Port:${port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;        
        }
    })
    .listen(port);
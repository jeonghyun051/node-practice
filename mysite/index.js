// init
const { EACCES, EADDRINUSE } = require('constants');
const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const port = 8080;

// router
const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');


// Environment Variables(환경변수 관리)
dotenv.config({
    path: path.join(__dirname,'config/app.env')
})

// application setup
const application = express()
    // 1. static serve
    .use(express.static(path.join(__dirname,process.env.STATIC_RESOURCES_DIRECTORY)))
    // 2. request body parser
    .use(express.urlencoded({extended:true})) // application/x-www-form-urlencoded
    .use(express.json()) // application/json
    // 3. view engine setup
    .set("views",path.join(__dirname,"views"))
    .set("view engine","ejs")
    // 4. request router
        // 모든 method(GET,POST,PUT,DELETE), 모든 url
    .all('*',function(req,res,next){
        res.locals.req = req;
        res.locals.res = res;
        next();
    })
    .use("/",mainRouter)
    .use("/user",userRouter)
    .use((req,res) => res.render('error/404')) // 없는 url 처리
        

// server setup
http.createServer(application)
    .on('listening',function(){
        console.info(`HTTP server running on port ${process.env.PORT}`);
    })
    .on('error',function(error){
        if(error.syscal !== 'listen'){
            throw error; // node가 처리하도록 함
        }

        // listener prob
        switch(error.code){
            // port 못열때
            case 'EACCESS':
                console.error(`Port: ${process.env.PORT} requires privileges.`);
                process.exit(1); // 비정상 종료
                break;
            // 서버 또 열때
            case 'EADDRINUSE':
                console.error(`Port: ${process.env.PORT} is already used.`);
                process.exit(1);
                break;
            default:
                throw errors;
        }
    })
    .listen(process.env.PORT);
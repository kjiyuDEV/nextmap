const express = require('express');
const next = require('next');
const morgan = require('morgan');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

dotenv.config();

const app = next({ dev }); // next 모듈을 사용
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express(); // back 서버에서의 const app = express()

    server.use(morgan('dev'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    // server.use(
    //     expressSession({
    //         resave: false,
    //         saveUninitialized: false,
    //         cookie: {
    //             httpOnly: true,
    //             secure: false,
    //         },
    //     }),
    // );

    server.get('*', (req, res) => {
        // 모든 get 요청 처리
        return handle(req, res); // next의 get 요청 처리기
    });

    server.listen(3000, () => {
        console.log('next+expresss running on port 3000');
    });
});

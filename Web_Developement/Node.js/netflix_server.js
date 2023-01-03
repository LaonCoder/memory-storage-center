const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'netflix_login'
});

const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    const { user_email, user_pw } = req.body;
    console.log(user_email, user_pw);
    connection.query(
        'SELECT * FROM user_info WHERE user_email= ? AND user_pw = ?',
        [user_email, user_pw],
        (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.send({ success: true });
            } else {
                res.send({ success: false, message: '유효하지 않은 이메일, 또는 비밀번호입니다.' });
            }
        }
    );
});

app.listen(4000, () => console.log('Server listening on port 4000...'));
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [inputEmail, setInputEmail] = useState('');
    const [inputPw, setInputPw] = useState('');

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const onClickLogin = () => {
        axios.post('http://127.0.0.1:4000/login', {
          user_email: inputEmail,
          user_pw: inputPw
        })
        .then(res => {
          if (res.data.success) {
            navigate(`/app`);
          } else {
            alert(res.data.message);
          }
        })
        .catch(error => console.error(error));
      }

    return (
        <div className="login__container">
            <div className="nav__image">
                <img
                    alt="Netflix logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
                    className="nav__logo"
                    onClick={() => {navigate(`/`)}}
                />
            </div>
            <div className="login__banner__wrapper">
                <div className="login__banner">
                    <h2>로그인</h2>
                    <input type="text" value={inputEmail} onChange={handleInputEmail} placeholder="이메일을 입력하세요." />
                    <input type="password" value={inputPw} onChange={handleInputPw} placeholder="비밀번호를 입력하세요." />
                    <button type="button" onClick={onClickLogin}>로그인</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  // change: input value
  const [MEM_ID, setMEM_ID] = useState('');
  const [PASSWD, setPASSWD] = useState('');

  const userData = useContext(userContext);

  // post: login data
  const loginHandler = (e) => {
    e.preventDefault();

    const postData = {
      MEM_ID,
      PASSWD
    };
  
    axios
    .post('http://localhost:3333/login', postData)
    .then(res => {
      console.log(res);
      const userId = res.data.user.MEM_ID; // 변수 선언 추가
      const userImg = res.data.user.MEM_IMG_PATH;
      const userNick = res.data.user.MEM_NICK;
      localStorage.setItem('userId', userId); // userId 변수 사용
      localStorage.setItem('userImg', userImg);
      localStorage.setItem('userNick', userNick);
      userData.setIsLoggedIn(true);
      
      if (userId) {
        navigate('/');
      }
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <main className="login">
      <section>
        <div className="inner">
          <div id="wrap">
              <div className="login_form">
                <h2 id="login_mark">Login</h2>
                <div>
                  <p className="login_idpw">
                    <input type="text" id="login_id" name="MEM_ID" placeholder="아이디" value={MEM_ID} onChange={e => setMEM_ID(e.target.value)} />
                  </p>
                  <p className="login_idpw">
                    <input type="password" id="login_pw" name="PASSWD" placeholder="비밀번호" value={PASSWD} onChange={e => setPASSWD(e.target.value)} />
                  </p>
                </div>
                <p className="login_checkbox">
                  <input type="checkbox" id="login_checkbox" />아이디 저장
                </p>
                <p className="login_submit">
                  <input type="submit" className="submitHoverEffect" id="login_submit" value="로그인" onClick={loginHandler} />
                </p>
                <div className="search_join">
                  <a href="/1.핵심로그인,회원/02. 아이디_비밀번호찾기.html"><p id="search_idpw">아이디/비밀번호 찾기</p></a>
                  <Link to="/join"><p id="login_join">회원가입</p></Link>
                </div>

                <div id="socialLogin">

                  <a href="http://localhost:3333/kakao"><div className="socialLogin hoverEffect" id="kakaoLogin"><img src="/images/login_kakao.webp" className="loginImg" alt="kakao" /></div></a>
                  <a href="https://accounts.google.com/o/oauth2/auth?client_id=952834393063-9458trvdu5fqlamfki4t75rc65v2toaj.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=code&scope=email%20profile&access_type=offline"><div className="socialLogin hoverEffect" id="googleLogin"><img src="/images/login_google.png" className="loginImg" alt="google" /></div></a>
                  <a href=""><div className="socialLogin hoverEffect" id="appleLogin"><img src="/images/apple1.png" className="loginImg" alt="naver" /></div></a>
                </div>
              </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
import axios from "axios";
import StreakContainer from "../../components/streakContainer/streakContainer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import style from "./login.module.scss"
import { useCookies } from "react-cookie";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const api = process.env.REACT_APP_API

function Login() {
  const {isLogin, setIsLogin, setWorkCount, setAlertTime} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["streak-user"]);
  
  // const provider = new GoogleAuthProvider();

  const login = async (event) => {
    event.preventDefault(); // 페이지 리로드 방지

    const data = await axios.post(`${api}/open-api/user/login`,{
      "name" : email,
      "password" : password
    })


    if(data.data.result.resultCode == 200) {
      setCookie("streak-user",email)
      setIsLogin(email);
      setWorkCount(data.data.body.work_count)
      setAlertTime(data.data.body.alert_time)
      navigate("/")
    }
  };

  const gmailLogin = async (event) => {
    try{
      const auth = getAuth();
      const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = userCred.user;
      const idToken = await user.getIdToken();
      console.log("ID Token:", idToken);
      console.log(userCred)
      const data = await axios.post(`${api}/open-api/user/gmail-login`,{
        "name" : user.email,
        "id_token" : idToken
      })

      if(data.data.result.resultCode == 200) {
        setCookie("streak-user",user.email)
        setIsLogin(user.email);
        setWorkCount(data.data.body.work_count)
        setAlertTime(data.data.body.alert_time)
        navigate("/")
      }
    } catch(e) {
      console.log(e)
    }
  };

  return (
    <Container className={style.loginContext}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">로그인</h2>
          <Form onSubmit={login}>
            <Form.Group controlId="formBasicEmail" className={style.form}>
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className={style.form}>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <button type="submit" className={`${style.loginButton}`}>
              로그인
            </button>
            <img onClick={gmailLogin} src="web_light_rd_SI.svg" alt="My Happy SVG" className={`${style.loginButton} ${style.gmail}`}/>
            <div className={style.password}>
              <a href="/password">비밀번호을 잊었나요?</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
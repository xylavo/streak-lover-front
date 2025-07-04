import axios from "axios";
import StreakContainer from "../../components/streakContainer/streakContainer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import style from "./register.module.scss"

const api = process.env.REACT_APP_API

function Register() {
  const {isLogin, setIsLogin} = useAuth();
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault(); // 페이지 리로드 방지
    if(password != passwordCheck) {
      alert("비밀번호를 다시 확인해 주세요")
      return;
    }

    const data = await axios.post(`${api}/open-api/user/register`,{
      "name" : email,
      "password" : password
    })

    alert(data.data)

    if(data.data == '성공적으로 등록되었습니다!') {
      navigate("/login")
    }
  };

  async function getCode(){
    const data = await axios.post(`${api}/open-api/mail/register`,{
      "email" : email,
      "type" : "email"
    })
    alert("인증 코드가 전송되었습니다!");
  }

  async function getAuth(){
    const data = await axios.post(`${api}/open-api/mail/auth`,{
      "email" : email,
      "code" : emailCheck
    })
    alert(data.data);
  }

  return (
    <Container className={style.content}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">회원가입</h2>
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

            <Button variant="warning" className={`w-100 ${style.auth}`} onClick={getCode}>
              인증 코드 받기
            </Button>

            <Form.Group controlId="formBasicEmailCheck" className={style.form}>
              <Form.Label>이메일 인증</Form.Label>
              <Form.Control
                placeholder="인증 코드를 입력하세요"
                value={emailCheck}
                onChange={(e) => setEmailCheck(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" className={`w-100 ${style.auth}`} onClick={getAuth}>
              인증 하기
            </Button>

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

            <Form.Group controlId="formBasicPassword" className={style.form}>
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 한번 더 입력하세요"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              회원가입
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
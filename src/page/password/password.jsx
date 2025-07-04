import axios from "axios";
import StreakContainer from "../../components/streakContainer/streakContainer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import style from "./password.module.scss"

const api = process.env.REACT_APP_API

function Password() {
  const {isLogin, setIsLogin} = useAuth();
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const navigate = useNavigate();

  async function getCode(){
    const data = await axios.post(`${api}/open-api/user/password-reset`,{
      "email" : email,
    })
    alert("인증 코드가 전송되었습니다!");
  }

  return (
    <Container className={style.content}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">임시 비밀번호 발급</h2>
          <Form>
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
              임시 비밀번호 발급받기
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Password;
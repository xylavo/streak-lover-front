import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../App';
import axios from 'axios';
import { ButtonGroup, Col, Row, Form } from 'react-bootstrap';
import style from "./passwordChange.module.scss"

const api = process.env.REACT_APP_API

const PasswordChange  = ({}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const changeSetting = async (event) => {
    event.preventDefault(); // 페이지 리로드 방지

    try{
      const data = await axios.post(`${api}/api/user/change`,{
        "current_password" : currentPassword,
        "new_password" : newPassword,
        "confirm_password": confirmPassword
      });

      if(data.data.result.resultCode == 200) {
        alert("변경이 완료되었습니다!");
        navigate("/")
      }
    } catch(e){
      alert(e.response.data.result.resultDescription)
    }
  };

  return (
    <Container className={style.loginContext}>
      <Row className="justify-content-lg-center">
        <Col lg={6}>
          <h2 className="text-center">비밀번호 변경</h2>
          <Form onSubmit={changeSetting}>
            <Form.Group controlId="formBasicPrevPassword" className={style.form}>
              <Form.Label>현재 비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="현재 비밀번호를 입력하세요"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicNextPassword" className={style.form}>
              <Form.Label>새 비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="새 비밀번호를 입력하세요"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword" className={style.form}>
              <Form.Label>새 비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              로그인
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordChange;
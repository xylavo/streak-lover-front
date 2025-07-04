import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../App';
import axios from 'axios';
import { ButtonGroup } from 'react-bootstrap';
import style from "./header.module.scss"

const api = process.env.REACT_APP_API

function Header() {
  const {isLogin, setIsLogin} = useAuth();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.navbar-collapse');
      const target = document.querySelector('.navbar-toggler-icon');
      if(event.target == target) return;
      if (navbar && !navbar.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function login(){
    navigate("/login");
  }

  function setting(){
    navigate("/setting");
  }

  function register(){
    navigate("/register");
  }

  async function logout(){
    const data = await axios.get(`${api}/api/user/logout`)
    alert("로그아웃 되었습니다!")
    setIsLogin("");
    navigate("/");
    window.location.reload();
  }

  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${style.headerContext}`} sticky="top"
    expanded={expanded}
    onToggle={(isOpen) => setExpanded(isOpen)}
    >
      <Container>
        <Navbar.Brand href="/">Streak-Lover</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">스트릭</Nav.Link>
            <Nav.Link href="/explanation">설명</Nav.Link>
          </Nav>
          <Navbar.Text>
            {
              isLogin == "" ?
              (
                <>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="primary" onClick={login}>로그인</Button>
                  <Button variant="primary" onClick={register}>회원가입</Button>
                </ButtonGroup>
                </>
              ) : (
                <div className={style.userInfo}>
                  <p className={style.userName}>{isLogin}</p>
                  <ButtonGroup aria-label="Basic example" className={style.logedIn}>
                    <Button variant="primary" onClick={setting}>설정</Button>
                    <Button variant="danger" onClick={logout} className={style.logout}>로그아웃</Button>
                  </ButtonGroup>
                </div>
              )
            }
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
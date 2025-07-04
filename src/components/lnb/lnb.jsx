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
import style from "./lnb.module.scss"

const Lnb = ({ onSelect, active }) => {
  return (
    <div className={style.lnb}>
      <ul className={style.lnbMenu}>
        <li
          className={`${style.lnbItem} ${active === "password" ? style.active : ""}`}
          onClick={() => onSelect("password")}
        >
          비밀번호 변경
        </li>
        <li
          className={`${style.lnbItem} ${active === "profile" ? style.active : ""}`}
          onClick={() => onSelect("profile")}
        >
          유저 등급 및 아이템
        </li>
        <li
          className={`${style.lnbItem} ${active === "inquiry" ? style.active : ""}`}
          onClick={() => onSelect("inquiry")}
        >
          문의하기
        </li>
      </ul>
    </div>
  );
};

export default Lnb;
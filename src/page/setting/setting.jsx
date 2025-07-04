import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import style from "./setting.module.scss"; // 스타일 적용
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "App";

const PasswordChange = React.lazy(() => import('components/passwordChange/passwordChange'));
const UserInfo = React.lazy(() => import('components/userInfo/userInfo'));
const Inquiry = React.lazy(() => import('components/inquiry/inquiry'));
const Lnb = React.lazy(() => import('components/lnb/lnb'));

const Setting = () => {
  const {isLogin} = useAuth();
  const [activeTab, setActiveTab] = useState("password");
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogin){
      alert("로그인을 진행해 주세요");
      navigate("/login")
    }
  },[])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={style.settings}>
        <Lnb onSelect={setActiveTab} active={activeTab} />
        <div className={style.settingsContent}>
          {activeTab === "password" && <PasswordChange />}
          {activeTab === "profile" && <UserInfo />}
          {activeTab === "inquiry" && <Inquiry />}
        </div>
      </div>
    </Suspense>
  );
};

export default Setting;

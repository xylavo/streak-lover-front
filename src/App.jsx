import axios from "axios";
import Header from "./components/header/header";
import Login from "./page/login/login";
import Streak from "./page/streakDetail/streakDetail";
import Container from 'react-bootstrap/Container';
import { Route, Routes } from 'react-router-dom';
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import StreakMain from "./page/streakMain/streakMain";
import StreakDetail from "./page/streakDetail/streakDetail";
import Register from "./page/register/register";
import style from "./App.module.scss"
import StreakRegister from "./page/streakRegister/streakRegister";
import ExplanationPage from "page/explanationPage/explanationPage";
import Setting from "./page/setting/setting";
import Password from "page/password/password";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useCookies } from "react-cookie";

const firebaseConfig = {
  apiKey: "AIzaSyDHN-PdAwQaePOBreDNzgLDT8tTy4p3beY",
  authDomain: "streak-397c4.firebaseapp.com",
  projectId: "streak-397c4",
  storageBucket: "streak-397c4.firebasestorage.app",
  messagingSenderId: "1047481981982",
  appId: "1:1047481981982:web:49f5e1a1e1f002d421620f"
};

const app = initializeApp(firebaseConfig);
const firebaseToken = process.env.REACT_APP_FIREBASE_KEY;
const api = process.env.REACT_APP_API

const requestPermission = async () => {
  try {
    const messaging = getMessaging(app); // 안전하게 초기화 후 가져옴

    await Notification.requestPermission();
    const token = await getToken(messaging, { vapidKey: firebaseToken });
    console.log("FCM Token:", token);
    const data = await axios.post(`${api}/api/user/firebase-token`,{
      "token": token
    })
  } catch (error) {
    console.error("Error getting FCM token", error);
  }
};

const LoginContext = createContext(null);
function App() {
  axios.defaults.withCredentials = true;
  const [cookies, setCookie, removeCookie] = useCookies(["streak-user"]);
  const [isLogin, setIsLogin] = useState(cookies["streak-user"]);
  const [workCount, setWorkCount] = useState(0);
  const [alertTime, setAlertTime] = useState(0);

  useEffect(() => {
    if(isLogin){
      requestPermission()
    }
  },[isLogin])

  useLayoutEffect(() => {
    const user = async () => {
      const data = await axios.get(`${api}/api/user/user`)
      setCookie("streak-user",data.data.name ?? "")
      setIsLogin(data.data.name ?? "");
      setWorkCount(data.data.work_count)
      setAlertTime(data.data.alert_time)
    }
    user();
  }, [])

  return (
    <div>
      <LoginContext.Provider value={{isLogin, setIsLogin, workCount, setWorkCount,alertTime, setAlertTime}}>
        <Header></Header>
        <Container className={style.content}>
          <Routes>
            <Route path='/streak/:id' element={<StreakDetail/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<StreakMain/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/streak-register' element={<StreakRegister/>} />
            <Route path='/streak-edit/:id' element={<StreakRegister/>} />
            <Route path='/explanation' element={<ExplanationPage/>} />
            <Route path='/setting' element={<Setting/>} />
            <Route path='/password' element={<Password/>} />
          </Routes>
        </Container>
      </LoginContext.Provider>
    </div>
  );
}

export const useAuth = () => {
  const context = useContext(LoginContext)
  if(context == null) {
    throw new Error("NOT AUTH")
  }
  return context;
}

export default App;

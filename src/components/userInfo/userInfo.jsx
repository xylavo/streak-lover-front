import { useContext, useEffect, useState } from 'react';
import style from "./userInfo.module.scss"
import Select from "react-select";
import { Form } from 'react-bootstrap';
import { useAuth } from 'App';
import axios from "axios";

const api = process.env.REACT_APP_API

const UserInfo  = ({}) => {
  const {workCount, alertTime} = useAuth();
  const [notificationTime, setNotificationTime] = useState(alertTime);

  const handleTimeChange = (e) => {
    setNotificationTime(e.target.value);
  };

  async function setAlertTime(){
    console.log(notificationTime)
    const data = await axios.post(`${api}/api/user/alert-time`,{
      "alert_time" : notificationTime,
    })
    console.log(data);
    alert(data.data.body)
  }

  const timeOptions = ["알림 안씀"];
  for (let hour = 0; hour < 24; hour++) {
    ["00", "30"].forEach((minute) => {
      const time = `${String(hour).padStart(2, "0")}:${minute}`;
      timeOptions.push(time);
    });
  }

  const options = timeOptions.map((time) => ({ value: time, label: time }));

  return (
    <div className={style.userInfo}>
      <h2>유저 정보</h2>
      <div className={style.userGrade}>
        <p>
          <strong>등급:</strong> NORMAL
        </p>
        <p>
          <strong>등록 가능한 일정:</strong> {workCount}개
        </p>
      </div>
      <div className={style.notificationSettings}>
        <h3>알림 시간 설정</h3>
        <label htmlFor="notification-time">알림 받을 시간:</label>
        <Form.Select aria-label="Default select example"
        onChange={handleTimeChange}
        value={notificationTime}>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Form.Select>
        <button className={`${style.btn} btn btn-primary`} onClick={setAlertTime}>저장</button>
      </div>
    </div>
  );
};

export default UserInfo;
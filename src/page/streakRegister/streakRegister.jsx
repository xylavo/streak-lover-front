import axios from "axios";
import React, { useEffect, useState } from 'react';
import style from './streakRegister.module.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const api = process.env.REACT_APP_API

const StreakRegister = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState({
    "월": true,
    "화": true,
    "수": true,
    "목": true,
    "금": true,
    "토": true,
    "일": true,
  });

  useEffect(() => {
    let getData = async () => {
      try{
        const data = await axios.get(`${api}/api/work/${id}`)
        if(data.data.state == "DELETE") {
          alert("삭제된 일입니다!");
          navigate("/");
        }
        if (data.data === null) {
          alert("로그인을 해 주세요");
          navigate("/login");  // 로그인 페이지로 이동
          return;
        }

        let dayWeek = data.data.body.day_week;
        setTitle(data.data.body.name);
        setDescription(data.data.body.descript);
        setSelectedDays({
          "월": (dayWeek & 2) != 0,
          "화": (dayWeek & 4) != 0,
          "수": (dayWeek & 8) != 0,
          "목": (dayWeek & 16) != 0,
          "금": (dayWeek & 32) != 0,
          "토": (dayWeek & 64) != 0,
          "일": (dayWeek & 1) != 0,
        })
      } catch (e){
        console.error("데이터 가져오기 실패:", e);
      }
    }
    if(id){
      getData();
    }
  },[])

  useEffect(() => {
    const user = async () => {
      const data = await axios.get(`${api}/api/user/user`)
      if(data.data.name == null) {
        alert("로그인을 진행해 주세요");
        navigate("/login")
      }
    }
    user();
  }, [])

  const handleDayChange = (e) => {
    const { name, checked } = e.target;
    setSelectedDays({ ...selectedDays, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(id){
        const data = await axios.post(`${api}/api/work/register`,{ title, description, selected_days: selectedDays, work_num : parseInt(id) })
        alert("성공적으로 수정되었습니다!")
      } else {
        const data = await axios.post(`${api}/api/work/register`,{ title, description, selected_days: selectedDays })
        alert("성공적으로 등록되었습니다!")
      }
      navigate("/");
    } catch(e){
      alert(e.response.data.result.resultDescription)
    }
  };

  return (
    <div className={style.scheduleFormContainer}>
      <button onClick={() => navigate(-1)} className={style.backButton}>
        <FaArrowLeft size={20} /> {/* 화살표 아이콘 */}
      </button>
      <form onSubmit={handleSubmit}>
        <h2>일정 등록</h2>

        <label htmlFor="title">일정 제목:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">일정 설명:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>스트릭 연장 요일:</label>
        <div className={style.checkboxGroup}>
          {["일","월","화","수","목","금","토"].map((day, idx) => (
            <label key={idx} className={style.checkboxLabel}>
              <input
                type="checkbox"
                name={day}
                checked={selectedDays[day]}
                onChange={handleDayChange}
              />
              {day}  {/* Capitalizes day names */}
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className={style.submitButton}>
          확인
        </button>
      </form>
    </div>
  );
};

export default StreakRegister;

import React, { useEffect, useState } from "react";
import StreakContainer from "../../components/streakContainer/streakContainer";
import style from "./streakMain.module.scss"
import axios from "axios";
import { Button, Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
// import StreakCard from "../../components/streakCard/streakCard";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useAuth } from "App";

const StreakCard = React.lazy(() => import('components/streakCard/streakCard'));

const api = process.env.REACT_APP_API

function StreakMain() {
  const {isLogin, workCount} = useAuth();
  const [works, setWorks] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const getWork = async ()=>{
      const data = await axios.get(`${api}/api/user/work`)
      setWorks(data.data);
    }
    getWork()
  }, [])

  async function extend(id){
    const data = await axios.post(`${api}/api/work/extend`,{
      "id": id
    })
    setWorks(data.data);
  }

  function addStreak(){
    navigate("/streak-register")
  }

  return (
    <Container className={style.mainContainer}>
      {isLogin == false ? <></> :
        <div className={style.availableSchedules}>
          <FaRegCalendarAlt className={style.scheduleIcon} />
          <span className={style.text}>현재 등록 가능한 일정 : </span>
          <span className={`${style.count} ${workCount - works.length == 0 ? style.unavailable : style.available }`}>{workCount - works.length}</span>
        </div>
      }
      <Row>
        {works.length == 0 ? 
        <p>NO WORKS</p> : 
        works.map((work, index) => (
          <Col xs={12} md={6} lg={4} key={index}>
            <StreakCard
              taskName={work.name}
              streakDays={work.cur_streak}
              lastUpdatedAt={work.last_updated_at}
              workId={work.id}
              dayWeek={work.day_week}
              onExtend={() => extend(work.id)}
            />
          </Col>
        ))}
      </Row>
      <button className={style.addStreakButton} onClick={addStreak} disabled={workCount - works.length == 0}>+ Add Streak</button>
    </Container>
  );
}

export default StreakMain;
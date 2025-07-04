import React, { useEffect, useState } from "react";
// import StreakContainer from "../../components/streakContainer/streakContainer";
import style from "./streakDetail.module.scss"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, ButtonGroup, Container } from "react-bootstrap";
import { calcStreak, isExpend } from "utils";
import { useAuth } from "App";
import BadgeDisplay from "components/badge/badgeDisplay";

const StreakContainer = React.lazy(() => import('components/streakContainer/streakContainer'));

const api = process.env.REACT_APP_API

function StreakDetail() {
  const [work, setWorks] = useState(null);
  const {id} = useParams();
  const {isLogin} = useAuth();
  const navigate = useNavigate();

  async function getWork (id){
    try{
      const data = await axios.get(`${api}/api/work/${id}`)
      if (!data.data) {
        alert("로그인을 해 주세요");
        navigate("/login");  // 로그인 페이지로 이동
        return;
      }
      if(data.data.state == "DELETE") {
        alert("삭제된 일입니다!");
        navigate("/");
      }
      setWorks({
        ...data.data.body,
      })
    } catch (e){
      console.error("데이터 가져오기 실패:", e);
    }
  }

  useEffect(() => {
    if(!isLogin){
      return;
    }
    getWork(id)
  },[isLogin]);

  async function extendStreak(){
    try{
      const data = await axios.post(`${api}/api/work/extend`,{
        "id": parseInt(id)
      })
      alert("갱신되었습니다!")
      getWork(id);
    } catch(e){
    }
  }

  async function editStreak(){
    navigate(`/streak-edit/${id}`);
  }

  async function deleteStreak(){
    try{
      const data = await axios.post(`${api}/api/work/delete`,{
        "id" : parseInt(id)
      })
      alert("삭제되었습니다")
      navigate("/")
    } catch(e){
    }
  }

  async function repair(){
    try{
      const data = await axios.post(`${api}/api/work/repair`,{
        "id" : parseInt(id)
      })
      alert("스트릭이 수리되었습니다!")
      getWork(id);
    } catch(e){
    }
  }

  async function repairBuy(){
    try{
      const data = await axios.post(`${api}/api/work/repair-buy`,{
        "id" : parseInt(id)
      })
      alert("구매가 완료되었습니다!")
      getWork(id);
    } catch(e){
    }
  }

  return (
    <Container className={style.streakDetail}>
      {work ? (
        <>
          <div className={style.title}>{work.name}</div>
          <div className={style.createdTime}>created time : {work.created_at}</div>
          <p className={style.streakDescription}>{work.descript}</p>
          {/* <div className={style.badgeContainer}>
            <BadgeDisplay/>
          </div> */}
          <div className={style.streakCount}>🔥 {calcStreak(work.last_updated_at, work.cur_streak, work.day_week)}일 연속</div>
          <div className={style.streakCount}>💰 코인: {work.money}</div>
          <div className={style.streakCount}>🛠️ 스트릭 리페어(1500 코인): {work.repair}</div>

          <StreakContainer streakDay={calcStreak(work.last_updated_at, work.cur_streak, work.day_week)} streaks={work.streak} dayWeek={work.day_week}></StreakContainer>
          <ButtonGroup aria-label="Basic example">
            <Button className={style.extendButton} variant="primary" onClick={extendStreak} disabled={!isExpend(work.last_updated_at, work.day_week)}>연장</Button>
            <Button className={style.extendButton} variant="warning" onClick={editStreak}>수정</Button>
            <Button className={style.extendButton} variant="danger" onClick={deleteStreak}>삭제</Button>
          </ButtonGroup>
          <div className={style.repairSection}>
            <button className={style.repairBtn} onClick={repair} disabled={work.repair==0}>
              🛠️ 스트릭 리페어 사용
            </button>
          </div>
          <div className={style.repairSection}>
            <button className={style.repairPurchaseBtn} onClick={repairBuy} disabled={work.money<1500}>
              💳 스트릭 리페어 구매
            </button>
          </div>
        </>
      ) : (
        <>
          loading....
        </>
      )}
      
    </Container>
  );
}

export default StreakDetail;
import { Button, Card } from "react-bootstrap"
import style from "./streakCard.module.scss"
import axios from "axios";
import { FaFire } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import { calcStreak, isExpend, isToday, isYesterday } from "utils";

function StreakCard({ taskName, streakDays, lastUpdatedAt, onExtend, workId, dayWeek }) {
  const navigate = useNavigate();

  function toDetail(){
    navigate(`/streak/${workId}`);
  }

  streakDays = calcStreak(lastUpdatedAt, streakDays, dayWeek);

  return (
    <Card className={`text-center mb-4 ${style.card}`}>
      <Card.Header onClick={toDetail} className={style.header}>{taskName}</Card.Header>
      <Card.Body onClick={toDetail} className={style.body}>
        <FaFire color="orange" size={30} className="mt-2" />
        <Card.Text className={`mt-3 ${style.day}`}>
          {streakDays}일 연속
        </Card.Text>
      </Card.Body>
      {
        !isExpend(lastUpdatedAt, dayWeek) ? 
        <Card.Footer 
          className={`bg-secondary text-white text-center`}
        >
          연장 완료
        </Card.Footer> : 
        <Card.Footer 
          className="bg-primary text-white text-center"
          style={{ cursor: 'pointer' }}
          onClick={onExtend}
        >
          연장
        </Card.Footer>
      }
    </Card>
  );
}

export default StreakCard;
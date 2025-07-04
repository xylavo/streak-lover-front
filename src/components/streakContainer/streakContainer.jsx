import { useState, useEffect } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import style from "./streakContainer.module.scss";
import { useRef } from "react";
import { isToday } from "utils";

const height = 7;  // 7 days in a week
const width = 50;  // number of weeks

let marginDay = 0;

const colors = ["#ebedf0", "#9be9a8", "#FFA500", "#FF7F50", "#216e39"];  // GitHub-like colors

function getDayBlocks(rowNum, streakData, startDate) {
  const blocks = [];
  let show = 1;
  if(rowNum < 6 - new Date().getDay()) show = 0;
  for (let i = 0; i < width; i++) {
    const dayIndex = (width - i - 1) * 7 + rowNum;
    let contributionLevel = streakData[dayIndex]?.level || 0; // mock contribution level

    const today = new Date(new Date() - (dayIndex - (6 - new Date().getDay()))*24*60*60*1000);
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const today_start = new Date(`${year}-${month}-${day} 00:00:00`)

    if(contributionLevel==0 && startDate <=today_start) contributionLevel=2;
    if(contributionLevel==1 && startDate <=today_start) contributionLevel=3;
    // contributionLevel = streakData[dayIndex]?.level || 0; // mock contribution level

    blocks.push(
      <OverlayTrigger
        key={i}
        placement="top"
        overlay={<Tooltip>{`${year}-${month}-${day}`}</Tooltip>}
      >
        <div
          style={{
            backgroundColor: colors[contributionLevel],
            boxShadow: month%2==0 ? "0 1px 3px rgba(0, 123, 255, 0.5)" : "0 1px 3px rgba(220, 53, 69, 0.5)",
          }}
          className={`${style.block} ${show == 0 && i == width - 1 ? style.none : style.display}`}
        ></div>
      </OverlayTrigger>
    );
  }
  return blocks;
}

function getWeekRows(streakData, dayWeek, startDate) {
  const rows = [];
  let fr = 64;
  for (let i = 0; i < height; i++) {
    rows.push(
      <div className={style.baseRow} key={`row-${i}`}>
        <div className={`${style.row} ${(dayWeek & fr) != 0 ? style.light : ''}`}>{getDayBlocks(i, streakData, startDate)}</div>
      </div>
    );
    fr /= 2;
  }
  return rows;
}

function StreakContainer({ streakDay, streaks, dayWeek }) {
  const [streakData, setStreakData] = useState([]);
  const [isLeft, setIsLeft] = useState(true);
  const [startDate, setStartDate] = useState((new Date().getTime()) + 10000000000);
  const scrollContainerRef = useRef(null);

  function checkIfLeft() {
    if (scrollContainerRef.current) {
      setIsLeft(scrollContainerRef.current.clientWidth-scrollContainerRef.current.scrollLeft === scrollContainerRef.current.scrollWidth);
    }
  }

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = checkIfLeft;
    const handleResize  = checkIfLeft;

    setIsLeft(scrollContainerRef.current.clientWidth-scrollContainerRef.current.scrollLeft === scrollContainerRef.current.scrollWidth);
    // 스크롤 이벤트 등록
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      container?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    let _startDate = today - 1000*60*60*24*(streakDay + 1);
    marginDay = 6 - today.getDay();
    const streakData = new Array(350).fill(0).map((_, idx) => ({
      day: idx,
      level: Math.floor(0),  // Random contribution levels
    }));

    if(!streaks) {
      return;
    }

    for(let streak of streaks){
      let fr = 1, day = 1;
      let year = Math.floor(streak.month / 100)
      let month = streak.month % 100
      while(1){
        if(fr > streak.check_num) {
          break;
        }
        if((fr & streak.check_num) != 0){
          let targetDate = new Date(`${year}.${month}.${day} 00:00:00`)
          if(isToday(targetDate)){
            _startDate = today - 1000*60*60*24*streakDay;
          }
          let pos = Math.floor((today - targetDate) / (1000*60*60*24))
          streakData[marginDay + pos].level = 1
        }
        day++;
        fr *= 2;
      }
    }

    setStreakData(streakData);
    setStartDate(_startDate);
  }, [streaks]);

  return (
    <Card className={`${style.container} text-center`}>
      <Card.Body className={`${style.realContainer} ${!isLeft ? style.isDim : ''}`}>
        <div className={style.streakBox} ref={scrollContainerRef}>
          <div className={style.streak}>
            {getWeekRows(streakData, dayWeek, startDate)}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default StreakContainer;

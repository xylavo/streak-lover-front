export const isToday = (date) => {
    date = new Date(date)
    const today = new Date();
    
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
  
    const givenYear = date.getFullYear();
    const givenMonth = date.getMonth();
    const givenDate = date.getDate();
  
    return todayYear === givenYear && todayMonth === givenMonth && todayDate === givenDate;
};

export const isYesterday = (inputDate) => {
    const date = new Date(inputDate);
  
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
  
    // 입력한 날짜와 어제 날짜를 비교 (연도, 월, 일만 비교)
    return date.getFullYear() === yesterday.getFullYear() &&
           date.getMonth() === yesterday.getMonth() &&
           date.getDate() === yesterday.getDate();
};

export const calcStreak = (lastUpdatedAt, streakDays, dayWeek) => {
    const date = new Date(lastUpdatedAt);
    if(isToday(date) || isYesterday(date)) return streakDays;
    while(1){
        date.setDate(date.getDate() + 1);
        if(date.getDay()==0 && (dayWeek & 1) != 0) return 0;
        if(date.getDay()==1 && (dayWeek & 2) != 0) return 0;
        if(date.getDay()==2 && (dayWeek & 4) != 0) return 0;
        if(date.getDay()==3 && (dayWeek & 8) != 0) return 0;
        if(date.getDay()==4 && (dayWeek & 16) != 0) return 0;
        if(date.getDay()==5 && (dayWeek & 32) != 0) return 0;
        if(date.getDay()==6 && (dayWeek & 64) != 0) return 0;
        streakDays++;
        if(isYesterday(date)) return streakDays;
    }
};

export const isExpend = (lastUpdatedAt, dayWeek) => {
    if(isToday(lastUpdatedAt)) return false;

    const date = new Date();
    if(date.getDay()==0 && (dayWeek & 1) == 0) return false;
    if(date.getDay()==1 && (dayWeek & 2) == 0) return false;
    if(date.getDay()==2 && (dayWeek & 4) == 0) return false;
    if(date.getDay()==3 && (dayWeek & 8) == 0) return false;
    if(date.getDay()==4 && (dayWeek & 16) == 0) return false;
    if(date.getDay()==5 && (dayWeek & 32) == 0) return false;
    if(date.getDay()==6 && (dayWeek & 64) == 0) return false;
    return true;
};
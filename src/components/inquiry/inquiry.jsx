import { useContext, useEffect, useState } from 'react';
import style from "./inquiry.module.scss"
import Select from "react-select";
import { Form } from 'react-bootstrap';
import { useAuth } from 'App';
import axios from "axios";

const api = process.env.REACT_APP_API

const Inquiry   = ({}) => {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");

  async function sendEmail(event){
    event.preventDefault(); // 페이지 리로드 방지
    console.log(event)
    const data = await axios.post(`${api}/api/mail/inquiry`,{
      title : title,
      context : context
    });
    console.log(data)
    if(data.status == 200)
      alert("전송되었습니다. 메일로 답변 드리겠습니다!")
  }
  return (
    <div className={style.inquiryContainer}>
      <h2>문의하기</h2>
      <form className={style.inquiryForm} onSubmit={sendEmail}>
        {/* 제목 입력 */}
        <div className={style.formGroup}>
          <label htmlFor="inquiryTitle">문의 제목</label>
          <input
            type="text"
            id="inquiryTitle"
            className={style.formControl}
            placeholder="문의 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 내용 입력 */}
        <div className={style.formGroup}>
          <label htmlFor="inquiryDescription">문의 내용</label>
          <textarea
            id="inquiryDescription"
            className={style.formControl}
            rows={6}
            placeholder="문의 내용을 작성해주세요"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          ></textarea>
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className={`${style.btn} btn btn-primary`}>
          제출
        </button>
      </form>
    </div>
  );
};

export default Inquiry;
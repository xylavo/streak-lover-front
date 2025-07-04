import React, { useState } from 'react';
import style from './badgeDisplay.module.scss';

const BadgeDisplay = () => {
  const allBadges = [
    { icon: '🎖️', text: '10월 배지' },
    { icon: '🏅', text: '11월 배지' },
    { icon: '🌟', text: '12월 배지' },
    { icon: '🔥', text: '30일 연속' },
    { icon: '💎', text: '특별 도전 달성' },
    { icon: '🦄', text: '희귀 배지' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={style.badgeDisplay}>
      <h2 className={style.badgeTitle}>월간 배지</h2>
      <div className={style.badgeContainer}>
        {/* 상위 3개 배지만 표시 */}
        {allBadges.slice(0, 3).map((badge, index) => (
          <div key={index} className={style.badge}>
            <span className={style.badgeIcon}>{badge.icon}</span>
            <span className={style.badgeText}>{badge.text}</span>
          </div>
        ))}
      </div>
      {/* 모달 열기 버튼 */}
      <button className={style.showMore} onClick={() => setIsModalOpen(true)}>
        더보기
      </button>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <div className={style.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={style.modalTitle}>전체 배지</h3>
            <div className={style.modalBadgeContainer}>
              {allBadges.map((badge, index) => (
                <div key={index} className={style.badge}>
                  <span className={style.badgeIcon}>{badge.icon}</span>
                  <span className={style.badgeText}>{badge.text}</span>
                </div>
              ))}
            </div>
            <button className={style.closeModal} onClick={() => setIsModalOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;

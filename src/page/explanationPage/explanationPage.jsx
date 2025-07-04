// ExplanationPage.js
import React from 'react';
import style from './explanationPage.module.scss';

const ExplanationPage = () => {
  return (
    <div className={style.explanationPage}>
      <section className={style.section}>
        <h2 className={style.title}>스트릭(Streak)이란?</h2>
        <p className={style.text}>
        스트릭은 특정 활동을 연속해서 수행하는 것을 의미합니다. 깃허브의 잔디 심기나 운동 앱의 연속 달성처럼, 매일 꾸준히 수행한 활동을 기록하고 시각화하여 동기부여를 얻을 수 있습니다. 우리 서비스는 이러한 스트릭 관리를 더욱 쉽고 효과적으로 만들어드립니다. 스트릭을 통해 작은 습관이 큰 변화로 이어지는 것을 경험할 수 있으며, 목표 달성을 위한 강력한 도구로 활용할 수 있습니다. 또한 시각화를 통해 한눈에 자신의 성장 과정을 확인할 수 있습니다.
        </p>
      </section>

      <section className={style.section}>
        <h2 className={style.title}>나만의 스트릭 설정하기</h2>
        <p className={style.text}>
        운동, 독서, 코딩 등 어떤 활동이든 자유롭게 스트릭으로 설정할 수 있습니다. 활동의 종류와 알림 시간 등을 자유롭게 커스터마이징할 수 있어 자신만의 루틴을 만들 수 있습니다. 갑작스러운 일정이나 피치 못할 사정으로 활동을 하지 못했을 때는 스트릭 리페어 기능을 사용해 스트릭을 이어갈 수 있습니다. 여러 개의 스트릭을 동시에 관리할 수 있어 다양한 목표를 한 번에 추적할 수 있으며, 각각의 스트릭마다 다른 목표와 조건을 설정할 수 있습니다. 진행 상황에 따라 목표를 수정하고 조정할 수 있어 유연한 목표 관리가 가능합니다.
        </p>
      </section>

      <section className={style.section}>
        <h2 className={style.title}>유연한 일정 관리</h2>
        <p className={style.text}>
        모든 활동을 매일 해야 하는 것은 아닙니다. 우리 서비스는 활동을 수행할 요일을 자유롭게 선택할 수 있게 해줍니다. 월요일부터 금요일까지만 운동하거나, 주말에만 독서를 하는 등 자신의 라이프스타일에 맞춰 스트릭 일정을 설정할 수 있습니다. 이러한 유연한 일정 관리 덕분에 무리한 목표 설정으로 인한 부담을 줄이고, 더 오랫동안 지속 가능한 습관을 만들어갈 수 있습니다. 이를 통해 현실적이고 달성 가능한 목표 관리가 가능합니다.
        </p>
      </section>
    </div>
  );
};

export default ExplanationPage;

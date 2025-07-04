# 스트릭 관리 서비스

습관을 기록하고 포인트로 보상받는 최고의 스트릭(streak) 관리 서비스입니다. 다양한 활동을 연속적으로 관리하고, 시각화하며, 목표 달성을 돕습니다.

## 개요

스트릭은 특정 활동을 연속해서 수행하는 것을 의미합니다. 깃허브의 잔디 심기나 운동 앱의 연속 달성처럼, 매일 꾸준히 수행한 활동을 기록하고 시각화하여 동기부여를 얻을 수 있습니다.

## 주요 기능

### 핵심 기능
- **스트릭 등록/관리**: 운동, 독서, 코딩 등 원하는 활동을 스트릭으로 등록하고, 요일별로 반복 설정 가능
- **스트릭 시각화**: GitHub 잔디 스타일의 히트맵으로 연속 달성 현황을 한눈에 확인
- **뱃지 시스템**: 월간/특별/희귀 뱃지 등 다양한 배지 획득 가능
- **알림 기능**: 원하는 시간에 알림 설정, FCM 기반 푸시 알림 지원

### 계정 관리
- **회원가입**: 이메일 인증을 통한 회원가입
- **로그인**: 이메일/구글 로그인 지원
- **비밀번호 관리**: 비밀번호 변경/찾기(임시 비밀번호 발급)
- **알림 설정**: 원하는 시간에 알림 받기 설정

### 고급 기능
- **스트릭 리페어**: 불가피하게 놓친 날을 복구할 수 있는 리페어 기능
- **문의/고객지원**: 서비스 내 문의하기 제공
- **유연한 일정 관리**: 모든 활동을 매일 해야 하는 것은 아니며, 활동을 수행할 요일을 자유롭게 선택 가능

## 데모

- [서비스 바로가기](https://streak.self-manage.kr)

## 설치 및 실행 방법

### 1. 저장소 클론
```bash
git clone [저장소 URL]
cd streak-lover-front
```

### 2. 패키지 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env` 파일을 프로젝트 루트에 생성하고 아래와 같이 설정하세요:

```env
REACT_APP_API=백엔드_API_주소
REACT_APP_FIREBASE_KEY=Firebase_VAPID_Key
```

### 4. 개발 서버 실행
```bash
npm start
```

- [http://localhost:3000](http://localhost:3000)에서 확인

## 주요 페이지 및 컴포넌트

### 페이지 구조
- **메인 페이지** (`/`): 등록된 스트릭 목록, 남은 등록 가능 일정, 스트릭 추가 버튼
- **스트릭 상세** (`/streak/:id`): 스트릭 정보, 연속 일수, 포인트, 리페어, 수정/삭제/연장 기능
- **스트릭 등록** (`/streak-register`): 제목, 설명, 반복 요일 선택, 신규 등록
- **스트릭 수정** (`/streak-edit/:id`): 기존 스트릭 정보 수정
- **설정** (`/setting`): 비밀번호 변경, 알림 시간 설정, 유저 등급, 문의하기
- **회원가입** (`/register`): 이메일 인증을 통한 회원가입
- **로그인** (`/login`): 이메일/구글 로그인
- **비밀번호 찾기** (`/password`): 임시 비밀번호 발급
- **설명 페이지** (`/explanation`): 서비스 사용법 안내

### 주요 컴포넌트
- **StreakCard**: 스트릭 카드 표시, 연속 일수, 연장 버튼
- **StreakContainer**: GitHub 스타일 히트맵 시각화
- **BadgeDisplay**: 뱃지 모아보기, 모달로 전체 뱃지 확인
- **Header**: 네비게이션 헤더
- **UserInfo**: 유저 정보 및 알림 설정
- **PasswordChange**: 비밀번호 변경
- **Inquiry**: 문의하기 폼

## 기술 스택

### 프론트엔드
- **React 18**: 메인 프레임워크
- **React Router**: 클라이언트 사이드 라우팅
- **React Bootstrap**: UI 컴포넌트 라이브러리
- **Sass**: CSS 전처리기

### 라이브러리
- **Axios**: HTTP 클라이언트
- **react-cookie**: 쿠키 관리
- **react-icons**: 아이콘 라이브러리
- **react-circular-progressbar**: 원형 프로그레스바
- **react-calendar-heatmap**: 캘린더 히트맵
- **react-select**: 셀렉트 컴포넌트
- **react-helmet**: 메타 태그 관리

### 외부 서비스
- **Firebase**: FCM 푸시 알림
- **Google Auth**: 구글 로그인

## 환경 변수

### 필수 환경 변수
```env
REACT_APP_API=https://api.example.com
REACT_APP_FIREBASE_KEY=your_firebase_vapid_key
```

### 환경 변수 설명
- `REACT_APP_API`: 백엔드 API 서버 주소
- `REACT_APP_FIREBASE_KEY`: Firebase VAPID 키 (푸시 알림용)

## PWA 지원

### PWA 기능
- **manifest.json**: 앱 메타데이터
- **서비스워커**: firebase-messaging-sw.js (푸시 알림)
- **홈화면 추가**: 모바일에서 홈화면에 추가 가능

### PWA 설정
```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

## 개발 환경

### 요구사항
- **Node.js**: 16 이상 권장
- **npm**: 패키지 매니저

### 개발 도구
- **jsconfig.json**: src 기준 상대경로 import 지원
- **ESLint**: react-app 설정
- **Prettier**: 코드 포맷팅

### 사용 가능한 스크립트
```bash
npm start          # 개발 서버 실행
npm run build      # 프로덕션 빌드
npm test           # 테스트 실행
npm run eject      # 설정 추출 (주의: 되돌릴 수 없음)
```

## 프로젝트 구조

```
streak-lover-front/
├── public/                 # 정적 파일
│   ├── index.html         # 메인 HTML
│   ├── manifest.json      # PWA 매니페스트
│   └── firebase-messaging-sw.js  # 서비스워커
├── src/                   # 소스 코드
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── badge/        # 뱃지 관련
│   │   ├── header/       # 헤더
│   │   ├── streakCard/   # 스트릭 카드
│   │   ├── streakContainer/  # 스트릭 컨테이너
│   │   └── ...
│   ├── page/             # 페이지 컴포넌트
│   │   ├── login/        # 로그인 페이지
│   │   ├── register/     # 회원가입 페이지
│   │   ├── streakMain/   # 메인 페이지
│   │   ├── streakDetail/ # 상세 페이지
│   │   └── ...
│   ├── App.jsx           # 메인 앱 컴포넌트
│   ├── index.js          # 진입점
│   └── utils.js          # 유틸리티 함수
├── package.json           # 의존성 및 스크립트
└── jsconfig.json         # 경로 설정
```

## 주요 기능 상세

### 스트릭 관리
- **등록**: 제목, 설명, 반복 요일 설정
- **수정**: 기존 스트릭 정보 변경
- **삭제**: 스트릭 완전 삭제
- **연장**: 일일 스트릭 연장
- **리페어**: 놓친 날 복구 (1500 코인 소모)

### 뱃지 시스템
- **월간 배지**: 10월, 11월, 12월 배지
- **특별 배지**: 30일 연속, 특별 도전 달성
- **희귀 배지**: 희귀한 성취 배지

### 알림 시스템
- **시간 설정**: 30분 단위로 알림 시간 설정
- **푸시 알림**: FCM 기반 브라우저 푸시 알림
- **알림 해제**: 알림을 받지 않을 수 있음

## 기여 방법

### 개발 가이드라인
1. **이슈 등록**: 버그 리포트 또는 기능 요청
2. **포크 후 PR**: 변경사항을 포크 후 PR로 요청
3. **코드 스타일**: Prettier, ESLint(react-app) 준수
4. **논의**: 주요 변경 전 이슈/PR로 논의 권장

### 개발 워크플로우
```bash
# 1. 저장소 포크
# 2. 로컬 클론
git clone [포크된 저장소 URL]
cd streak-lover-front

# 3. 브랜치 생성
git checkout -b feature/your-feature-name

# 4. 개발 및 테스트
npm start
npm test

# 5. 커밋 및 푸시
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin feature/your-feature-name

# 6. PR 생성
```

## 라이선스

MIT License

## 문의

- **이메일**: [xylavo@gmail.com](mailto:xylavo@gmail.com)
- **서비스 URL**: https://streak.self-manage.kr

# todo-with-search

![todo-width-search-demo](https://github.com/KwakHyeonJi/todo-with-search/assets/22536999/c880d90f-6ed4-43b7-b707-18e57b11a1f8)

## 🔍 프로젝트 소개

- Todo List와 연동된 검색창 구현
- 원티드 프리온보딩 인턴십 프론트엔드 팀 프로젝트

<br />

## 👀 배포

- API 외부 유출 방지를 위해 배포 링크는 기재하지 않습니다.

<br />

## 🚴‍♀️ 실행 방법

```
yarn
yarn run start
```

<br />

## 🛠 기술 스택

- React
- TypeScript
- Styled-components
- Axios
- ESLint | Prettier | Husky

<br />

## ✒ 개발 내용

### 1. 공통

- API 호출, 검색, Todo 관련 로직들을 각각 class 단위로 모듈화하고, ContextAPI로 의존성을 주입하여 유지보수가 용이하도록 구현했습니다.
- ContextAPI와 Reducer를 이용하여 비동기 요청 상태를 loading, success, error 3가지의 action으로 나누어 관리했습니다. 이를 통해, 검색 중에는 Todo 추가 버튼이 스피너로 바뀌는 등 각 상태별로 다른 UI를 보여줄 수 있도록 구현했습니다.
- Error Boundary를 이용하여 모든 API 요청에서 발생한 에러를 공통적으로 처리하도록 구현했습니다.

### 2. 추천 검색어

- 추천 검색어 API 호출 시 검색 키워드에 debounce를 적용하여 호출 횟수를 조절했습니다.
- `scrollHeight`, `scrollTop`, `clientHeight`을 활용하여 별도의 라이브러리 없이 무한 스크롤을 구현했습니다.
- 정규 표현식을 활용하여 특정 문자열에서 검색어 부분만 하이라이트 표시하는 컴포넌트를 구현했습니다.

### 3. Todo

- `useReducer`, `dispatch`를 통해 상태 관련 로직을 분리하고 코드의 가독성을 향상 시켰습니다.
- 상수값으로 사용할 Action type 문자열들을 `enum`으로 타입 지정하여 변수 참조로 사용할 수 있도록 구현했습니다.

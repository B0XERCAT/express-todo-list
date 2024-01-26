# TODO List 
### React + TypeScript + Tailwind + Express + MongoDB

## API 개요
Express 프레임워크를 활용하여 To-do 데이터를 다루는 기본적인 RESTful API 서버
- Express 활용
- MongoDB / MySQL 중 택1

## 필수 구현 내용

### todos controller
`GET`/api/todos : 모든 투두 리스트 조회 API
`POST` /api/todos/ :  투두 생성 API
`GET` /api/todos/{id} : 특정 투두 조회 API
`PATCH` /api/todos/{id} : 특정 투두 수정 API
`DELETE` /api/todos/{id} : 특정 투두 삭제 API

## Schema

```
Todo {
id* string (pk)
status* enum : [NOTSTARTED,PROGRESS,DONE]
title* : string
desc : string
}
```

(\*) -> required

- `id` : 주 식별자
- `status` : enum 사용, 투두 상태 
- `title` : 투두 기본 내용
- `desc` : 투두 추가 내용

## 선택 사항
- 특정 status의 투두만 필터링하여 조회하는 API
- 키워드로 투두 검색하여 조회하는 API

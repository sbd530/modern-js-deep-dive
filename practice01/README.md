## 망고디비

- 식당을 갔을 경우를 상상해봅시다. 손님은 직원에게 말을 통해 음식을 주문하고, 점원은 말을 통해 주문을 받습니다.
  점원은 종이나 전자기계를 통해 메뉴를 입력하고, 그 주문이력은 주방으로 전달되어 출력됩니다.
  주방의 셰프는 주문이력을 시각적으로 입력받아 음식을 준비하고, 음식을 반환합니다.
  일련의 과정을 통해 최종적으로 손님은 음식을 받게 됩니다.

- 우리는 수많은 입력과 출력으로 이루어진 세상 속에 살고 있을지도 모릅니다. 그런 의미에서 첫번째 과제는 js를 통해 간단한 입출력을 받는 응용 프로그램을 구축해보겠습니다.

- 키-밸류 알고리즘을 이용한 MongoDB는 빠른 조회 속도를 자랑하는 강력한 NoSQL 데이터베이스 관리 시스템입니다. 우리는 빠르진 않지만 맛은 좋을 수 있는 MangoDB를 만듭니다.

### 환경 설정

1. 적절한 workspace를 정하고, 프로젝트 루트 디렉터리는 `mangodb'로 만듭니다.

2. `/mangodb` 하위에는 `/src` 디렉터리와 `/test` 디렉터리, `.env` 파일, `mango.db` 파일을 만듭니다.

3. `/src` 하위에는 각자 사용할 javascript 파일을 생성할 것입니다.

4. `/test` 하위에는 `/src` 에서 작성한 코드들의 테스트코드를 생성할 것입니다.

5. `.env` 파일은 DB 커넥션에 필요한 유저아이디와 비밀번호가 들어가게 됩니다. 유닉스 키밸류형태로 라인별로 아이디와 비밀번호를 저장하도록 하겠습니다. ~~userid=abcd~~

6. `mango.db` 파일은 데이터를 저장할 공간입니다. 간단하게 JSON 형식으로 문자열을 저장하도록 하겠습니다.

7. Jest 테스트 프레임워크를 사용하기 위해 npm 을 사용합니다.

```shell
npm init -y

npm install -D jest @types/jest @babel/core @babel/preset-env
```

8. 루트 디렉터리에 `babel.config.json`과 `jest.config.json` 파일을 생성합니다.

- babel.config.json

```json
{
  "presets": ["@babel/preset-env"]
}
```

- jest.config.json

```json
{
  "collectCoverage": true,
  "moduleFileExtensions": ["js", "mjs"],
  "transform": {
    "^.+\\.js$": "babel-jest",
    "^.+\\.mjs$": "babel-jest"
  },
  "testRegex": "((\\.|/*.)(test))\\.js?$"
}
```

9. 테스트 파일은 `/test` 하위에 `/src` 에 있는 파일 이름에 `test` 를 붙여서 만들고, import 하여 `npm test` 테스트를 진행합니다.

- ~~XXX.js -> XXX.test.js~~

10. `.gitignore` 파일을 생성하여 커밋시에 제외할 파일을 적절히 설정합니다.

11. 그 외의 소스파일이나 클래스 등의 아키텍쳐는 자유롭게 작성하시면 됩니다.

### 기능

1. 사용자에게 입력을 받아 과일에 대한 정보를 조회합니다. 과일 하나당 하나의 레코드(이름과 원산지)를 가지며, 레코드는 식별자로써 0 이상의 정수형인 `_id` 를 가집니다.

```json
{
  "_id": 0,
  "name": "apple",
  "origins": [
    { "origin": "korea", "price": 1000 },
    { "origin": "japan", "price": 2000 }
  ]
}
```

1. 프로그램을 실행 시켰을 때 사용자에게 유저 아이디와 패스워드를 입력 받고, `.env`에 저장된 userid와 password의 값과 일치하지 않으면 프로그램을 종료합니다.

2. 로그인에 성공하면, 쿼리를 입력받습니다:

- 조회 쿼리 예

```shell
$ find apple

{
  "_id": 0,
  "name": "apple",
  "origins": [
    { "origin": "korea", "price": 1000 },
    { "origin": "japan", "price": 2000 }
  ]
}
```

```shell
$ find like *ppl*

{
  "_id": 0,
  "name": "apple",
  "origins": [
    { "origin": "korea", "price": 1000 },
    { "origin": "japan", "price": 2000 }
  ]
},
{
  "_id": 13,
  "name": "pineapple",
  "origins": [
    { "origin": "philippines", "price": 6000 },
    { "origin": "vietnam", "price": 5000 }
  ]
}
```

```shell
$ find --all

{
  "_id": 0,
  "name": "apple",
  "origins": [
    { "origin": "korea", "price": 1000 },
    { "origin": "japan", "price": 2000 }
  ]
},
{
  "_id": 1,
  "name": "orange",
  "origins": [
    { "origin": "usa", "price": 2000 },
    { "origin": "australia", "price": 3000 }
  ]
},
...
```

```shell
$ find grape

No such fruit.
```

```shell
$ findsomething
$ find
$ find--all

Wrong Grammer.
```

3. 시간이 남는다면 삭제까지 구현합니다. 단, `mango.db` 파일이 수정되어야 합니다.

- 삭제 쿼리 예

```shell
$ delete apple
apple deleted.

$ delete grape
No such fruit.

$ delete --all
All of data has been deleted.

$ delete
$ deleteapple
$ delete--all

Wrong Grammer.
```

4. `exit` 명령어를 받으면 프로그램을 종료합니다.

```shell
$ exit
See ya.
```

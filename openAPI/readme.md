# OpenAI Chat API 예시 프로젝트
- 이 프로젝트는 OpenAI API를 사용하여 간단한 형태의 AI 응답(요약, 번역, FAQ 등)을 생성하는 Express 서버 예시입니다. 
- Swagger를 통해 자동화된 API 문서를 제공합니다.

## 사전 요구사항
- Node.js (v14 이상 권장)
- npm 또는 Yarn (여기서는 npm 기준으로 설명)

## 설정
### 환경 변수 설정
- 환경 변수로 OPENAI_API_KEY 를 설정합니다.
- Run/Debug Configurations > Environment Variables > 변수 설정

### 패키지 설치
```
  npm install openai     
  npm install dotenv  
  npm install swagger-jsdoc swagger-ui-express
  ```
- openai: OpenAI ChatCompletion API 사용 
- dotenv: .env 파일을 사용하기 위한 환경 변수 설정 
- swagger-jsdoc & swagger-ui-express: Swagger 자동 문서화

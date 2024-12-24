// services/open-ai.js
const OpenAI = require('openai');
const openai = new OpenAI();

const typeMapping = {
  SUMMARY: ["title", "summarizedText"],
  TRANSLATION: ["translatedText", "language: Korean"],
  FAQ: ["answer"],
};

/**
 * OpenAI Chat Completion API를 호출하여 AI 응답을 생성
 * @param {string} type - "SUMMARY" | "TRANSLATION" | "FAQ"
 * @param {string} prompt - 사용자 입력 프롬프트
 * @returns {Object} - OpenAI의 ChatCompletion 응답 메시지
 */
async function generateAIResponse(type, prompt) {
  try {
    const keys = typeMapping[type];
    if (!keys) {
      throw new Error(`Invalid type: ${type}`);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content:  `You are a helpful assistant. Provide a ${type} response in a JSON format with keys: ${keys.join(", ")} in Korean.` },
        { role: "user", content: prompt },
      ],
    });
    return completion.choices[0].message;
  } catch (error) {
    console.error('OpenAI API 요청 중 오류 발생:', error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = { generateAIResponse };



// routes/openai.js

const express = require('express');
const router = express.Router();
const { generateAIResponse } = require('../services/open-ai');


/**
 * @openapi
 * /openai/ai:
 *   post:
 *     summary: 사용자 입력을 바탕으로 AI 응답 생성
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: SUMMARY
 *               prompt:
 *                 type: string
 *                 example: "특정 사용자 이름이랑 나이를 말해줘 Json으로 반환해줘"
 *     responses:
 *       200:
 *         description: 성공적으로 AI 응답 생성
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 aiResponse:
 *                   type: object
 *                   example: {
 *                     "role": "assistant",
 *                     "content": "{\"title\": \"...\", \"summarizedText\": \"...\"}"
 *                   }
 *       400:
 *         description: prompt가 누락된 경우
 *       500:
 *         description: 서버 에러
 */
router.post('/ai', async (req, res) => {
  const { type, prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'prompt가 필요합니다.' });
  }

  try {
    const aiResponse = await generateAIResponse(type, prompt);
    res.json({ aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI 답변 생성 중 오류가 발생했습니다.' });
  }
});

module.exports = router;



// services/swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API with Swagger',
      version: '1.0.0',
      description: '이 문서는 Haiku 생성 API와 기타 엔드포인트를 설명합니다.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [
    path.join(__dirname, '..', 'routes', '*.js'),
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;









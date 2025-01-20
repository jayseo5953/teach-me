import api from '@/services/api/client';
import delay from '@/utils/delay';

const END_POINT = '/api/reports';

export async function getOverallReport(lectureList) {
  // const response = await api.post(`${END_POINT}/overview`, {
  //   lectureList: lectureList.map((lecture) => lecture.id),
  // });

  // return response.data;
  console.log('getOverallReport');
  await delay(2000);

  return {
    understanding: {
      score: 9,
      reason:
        'The teacher demonstrated a strong grasp of the topics discussed. They accurately explained the central tendency measures, outlier impacts, and the distinctions between independent and dependent probability events, reflecting an effective understanding of statistical and probability concepts.',
    },
    achievement: {
      score: 9,
      reason:
        'The teacher effectively communicated key aspects of statistics and probability, addressing each question with clear, concise explanations. Their responses were correct and helped to clarify complex topics, thus meeting the teaching objectives successfully.',
    },
    satisfaction: {
      score: 8,
      reason:
        "The teacher responded promptly and informatively to the student's questions, suggesting satisfaction with the teaching process. However, a more enthusiastic or engaging tone could potentially enhance the perception of satisfaction.",
    },
    enthusiasm: {
      score: 7,
      reason:
        'While the teacher was responsive and correct in their answers, there was a level of formality in the responses that lacked a strong sense of enthusiasm. Incorporating more enthusiasm could make the learning experience more engaging.',
    },
    totalScore: 8.25,
    correctAnswerRate: {
      rate: 100,
      reason:
        "All of the teacher's responses to the student’s questions were accurate and pertinent to the queries made. This indicates a complete effectiveness in providing correct information throughout the sessions.",
    },
    overallComment:
      'The teacher performs effectively in delivering content on statistics and probability, with a strong understanding and achievement of educational goals. The responses were accurate and pertinent. To further enhance the lectures, incorporating a more engaging and enthusiastic delivery style could improve student engagement and satisfaction. Possible approaches include using real-life examples, interactive questioning, or integrating multimedia resources to illustrate points more vividly.',
  };
}

export async function getProperAnswers(lectureId) {
  // const response = await api.post(`${END_POINT}/proper-answers`, {
  //   lecture: lectureId,
  // });

  // return response.data;

  console.log('getProperAnswers');
  await delay(2000);
  return {
    'Good Answer': [
      {
        'AI Question':
          'Good morning, teacher! Could you please explain the difference between descriptive and inferential statistics?',
        'User Good Answer':
          'Descriptive statistics summarize and describe characteristics of a data set, while inferential statistics use sample data to make predictions or inferences about a population.',
        'Improved Answer': null,
      },
      {
        'AI Question':
          'Thanks for that explanation! Can you provide an example of how inferential statistics can be applied in real life?',
        'User Good Answer':
          'A company uses inferential statistics to analyze survey data from a sample of customers to estimate overall satisfaction levels for its entire customer base.',
        'Improved Answer': null,
      },
    ],
    'Bad Answer': [
      {
        'AI Question':
          'Could you explain how sampling methods can affect the results of inferential statistics?',
        'User Bad Answer': '',
        'Improved Answer':
          'Sampling methods can significantly impact the results of inferential statistics because the method used determines how representative the sample is of the entire population. Poor sampling techniques can lead to biased results, which in turn affect the validity of the inferences made.',
      },
    ],
  };
}

export async function getLectureRport(lecture) {
  // const response = await api.post(`${END_POINT}/lecture`, {
  //   lecture,
  // });
  console.log('getLectureRport');

  await delay(2000);

  return {
    contentQuality: {
      score: 8,
      reason:
        'The content provided in the conversation offers a clear and concise explanation of when to use different measures of central tendency based on the nature of the data. The answers are accurate and cater to fundamental aspects of statistical analysis, showing good professionalism and structure.',
    },
    delivery: {
      score: 7,
      reason:
        'The delivery, as suggested by the flow of the conversation, seems interactive and engaging, which is effective for teaching. However, it would benefit from more example-driven explanations to enhance understanding.',
    },
    overallScore: {
      value: 7.5,
      calculation:
        'The overall score is calculated by averaging the scores of content quality and delivery ((8 + 7) / 2).',
    },
    improvements: {
      suggestions: [
        'Include more practical examples to illustrate the impact of outliers on the mean and median.',
        'Provide additional real-world data sets where choosing the appropriate measure of central tendency is demonstrated.',
      ],
    },
  };
}

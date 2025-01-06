import api from '@/services/api/client';

const END_POINT = '/api/reports';

export async function getOverallReport(lectureList) {
  const response = await api.post(`${END_POINT}/overview`, {
    lectureList: lectureList.map((lecture) => lecture.id),
  });

  return response.data;
}

export async function getProperAnswers(lectureId) {
  const response = await api.post(`${END_POINT}/proper-answers`, {
    lecture: lectureId,
  });

  return response.data;
}

import api from '@/services/api/client';

const END_POINT = '/api/reports';

export async function getOverallReport(lectureList) {
  const response = await api.post(`${END_POINT}/overview`, {
    lectureList: lectureList.map((lecture) => lecture.id),
  });

  return response.data;
}

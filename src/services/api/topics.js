import api from '@/services/api/client';

const END_POINT = '/api/texts/analyze-subject-text';

export async function generateTopics(subjectText) {
  const response = await api.post(END_POINT, { subjectText });
  return response.data;
}

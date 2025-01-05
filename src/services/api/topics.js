import api from '@/services/api/client';

const END_POINT = '/api/texts/analyze-subject-text';
const student = '677a1f33be4c699c3bc402bb';

export async function generateTopics(subjectText) {
  const response = await api.post(END_POINT, { subjectText, student });
  return response.data;
}

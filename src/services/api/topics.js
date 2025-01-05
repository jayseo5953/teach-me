import api from '@/services/api/client';

const END_POINT = '/api/texts/analyze-subject-text';

export async function generateTopics({ subjectText, studentId }) {
  const response = await api.post(END_POINT, {
    subjectText,
    student: studentId,
  });
  return response.data;
}

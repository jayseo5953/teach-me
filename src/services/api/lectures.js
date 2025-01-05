import api from '@/services/api/client';

const END_POINT = '/api/lectures';
const user = '677a08c430664fe2645d4c43';
const student = '677a08c530664fe2645d4c46';

export async function createLecture({ subject, topic }) {
  const response = await api.post(END_POINT, {
    subject,
    topic,
    user,
    student,
  });
  return response.data;
}

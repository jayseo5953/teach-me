import api from '@/services/api/client';

const END_POINT = '/api/lectures';
const user = '677a1f33be4c699c3bc402b9';
const student = '677a1f33be4c699c3bc402bb';

export async function createLecture({ subject, topic }) {
  const response = await api.post(END_POINT, {
    subject,
    topic,
    user,
    student,
  });
  return response.data;
}

export async function getLectureMessages(lectureId) {
  const response = await api.get(`api/messages/${lectureId}`);
  return response.data;
}

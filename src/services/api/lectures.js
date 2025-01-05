import api from '@/services/api/client';

const END_POINT = '/api/lectures';

export async function createLecture({ subject, topic, studentId, userId }) {
  const response = await api.post(END_POINT, {
    subject,
    topic,
    user: userId,
    student: studentId,
  });
  return response.data;
}

export async function getLectureMessages(lectureId) {
  const response = await api.get(`api/messages/${lectureId}`);
  return response.data;
}

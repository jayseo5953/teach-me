import api from '@/services/api/client';

const END_POINT = '/api/students';

export async function getStudents() {
  const response = await api.get(END_POINT);

  return response.data;
}

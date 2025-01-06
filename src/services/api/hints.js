import api from '@/services/api/client';

const END_POINT = '/api/hints';

export async function getHint(question) {
  const response = await api.post(`${END_POINT}`, {
    question,
  });

  return response.data;
}

import api from '@/services/api/client';
import delay from '@/utils/delay';

const END_POINT = '/api/students';

export async function getStudents() {
  // const response = await api.get(END_POINT);
  await delay(2000);
  console.log('getStudents');
  return [
    {
      name: 'Harper',
      role: 'High school student',
      characteristic: 'Cheerful',
      openAiPersona:
        'You are a high school student. Your characteristic is cheerful. You enjoy engaging in discussions with enthusiasm and optimism.',
      image:
        'https://katec-hackathon-s3.s3.us-west-1.amazonaws.com/images/original/910145bb-f869-4dca-9597-933b52644e53',
      createdAt: '2025-01-05T20:15:54.815Z',
      id: '677ae87a144ffdff851bc2d8',
    },
    {
      name: 'Adrian',
      role: 'Professional',
      characteristic: 'Prickly',
      openAiPersona:
        'You are a professional. Your characteristic is prickly. You tend to be sharp, critical, and prefer getting straight to the point in discussions.',
      image:
        'https://katec-hackathon-s3.s3.us-west-1.amazonaws.com/images/original/1abf42aa-4d59-41e3-bd81-fbb56ade9edc',
      createdAt: '2025-01-05T20:15:54.816Z',
      id: '677ae87a144ffdff851bc2da',
    },
    {
      name: 'Bennett',
      role: 'College student',
      characteristic: 'Warm',
      openAiPersona:
        'You are a college student. Your characteristic is warm. You are approachable, empathetic, and enjoy making others feel comfortable during conversations.',
      image:
        'https://katec-hackathon-s3.s3.us-west-1.amazonaws.com/images/original/c6878458-94e2-443a-ad6d-a46f98d78b7b',
      createdAt: '2025-01-05T20:15:54.816Z',
      id: '677ae87a144ffdff851bc2d9',
    },
    {
      name: 'Elliott',
      role: 'Middle school student',
      characteristic: 'Timid',
      openAiPersona:
        'You are a middle school student. Your characteristic is timid. You are shy and cautious but willing to learn when encouraged gently.',
      image:
        'https://katec-hackathon-s3.s3.us-west-1.amazonaws.com/images/original/f61a226a-9c87-4c16-97f3-b3e79eaec2ed',
      createdAt: '2025-01-05T20:15:54.817Z',
      id: '677ae87a144ffdff851bc2db',
    },
  ];
}

import { API_BASE_URL } from '@/config/apiConfig';
import { JobDescriptionResponse } from '@/types/jobTypes';

export const uploadJobDescription = async ( jobDescription: string, files: FileList): Promise<JobDescriptionResponse> => {
  const formData = new FormData();
  formData.append('job_offer', jobDescription);
  Array.from(files).forEach((file) => formData.append('cvs', file));

  const response = await fetch(`${API_BASE_URL}/rank-cvs/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error en la solicitud');
  }

  return response.json() as Promise<JobDescriptionResponse>;
};

import { useState } from 'react';
import { uploadJobDescription } from '@/services/jobService';
import { JobDescriptionResponse } from '@/types/jobTypes';

export function useJobUpload(jobDescription: string, files: FileList | null) {
  const [progress, setProgress] = useState(0);
  const [currentCV, setCurrentCV] = useState(0);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(0);

  const averageProcessingTimePerCV = 10;

  const upload = async (): Promise<JobDescriptionResponse | null> => {
    if (!files || files.length === 0) {
      return null;
    }
  
    const totalCVs = files.length;
    const totalTime = totalCVs * averageProcessingTimePerCV;
    let timeElapsed = 0;
  
    const interval = setInterval(() => {
      timeElapsed += 1;
      const newProgress = Math.min((timeElapsed / totalTime) * 100, 100);
      setProgress(newProgress);
      setEstimatedTimeRemaining(Math.max(totalTime - timeElapsed, 0));
  
      if (totalCVs === 1) {
        setCurrentCV(1);
      } else {
        const currentIndex = Math.min(Math.floor((timeElapsed / totalTime) * totalCVs), totalCVs - 1);
        setCurrentCV(currentIndex + 1);
      }
  
      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 1000);
  
    try {
      const response = await uploadJobDescription(jobDescription, files);
      clearInterval(interval);
      setProgress(100);
      setCurrentCV(totalCVs);
      return response;
    } catch (error) {
      clearInterval(interval);
      console.error('Error al procesar los CVs', error);
      throw new Error('Error al procesar los CVs. Intente nuevamente.');
    }
  };

  return {
    progress,
    currentCV,
    estimatedTimeRemaining,
    upload,
  };
}
import { useState } from 'react';
import { useGenerateQuestionsFromFileMutation, useGenerateQuestionsFromUrlMutation, AIQuestionGenerator } from '@/apis/AIApi';

export function useAIQuestionGeneration() {
  const [generateFromFile] = useGenerateQuestionsFromFileMutation();
  const [generateFromUrl] = useGenerateQuestionsFromUrlMutation();
  
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<string>('');

  /**
   * Generate questions from cloud storage URL
   */
  const generateFromCloudUrl = async (cloudUrl: string) => {
    setLoading(true);
    setProgress(0);
    
    try {
      // Option 1: Download file and upload to AI API
      const result = await AIQuestionGenerator.generateWithProgress(
        cloudUrl,
        (file) => generateFromFile(file).unwrap(),
        (stage, progress) => {
          setStage(stage);
          setProgress(progress);
        }
      );
      
      return result;
    } finally {
      setLoading(false);
      setProgress(0);
      setStage('');
    }
  };

  /**
   * Generate questions by sending URL to backend
   */
  const generateByUrl = async (videoUrl: string, sectionId?: number) => {
    setLoading(true);
    
    try {
      const result = await generateFromUrl({ videoUrl, sectionId }).unwrap();
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateFromCloudUrl,
    generateByUrl,
    loading,
    progress,
    stage,
  };
}
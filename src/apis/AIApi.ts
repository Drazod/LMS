import { API_URL } from "@/configs/ApiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareVideoForAI, processVideoWithRetry } from "@/utils/fileUtils";

export const AIApi = createApi({
  reducerPath: "AIApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["AI"],
  endpoints: (build) => ({
    
    // Method 1: Direct file upload
    generateQuestionsFromFile: build.mutation<any, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append('video', file);
        formData.append('instructorId', localStorage.getItem("userId") || '');
        
        return {
          url: 'ai/generate-questions',
          method: 'POST',
          body: formData,
        };
      },
    }),

    // Method 2: Send cloud storage URL to backend
    generateQuestionsFromUrl: build.mutation<any, { videoUrl: string; sectionId?: number }>({
      query: ({ videoUrl, sectionId }) => ({
        url: 'ai/generate-questions-from-url',
        method: 'POST',
        body: {
          videoUrl,
          sectionId,
          instructorId: localStorage.getItem("userId"),
        },
      }),
    }),

    // Method 3: Generate questions with additional context
    generateQuestionsWithContext: build.mutation<any, {
      videoUrl: string;
      courseId: number;
      sectionId: number;
      questionCount?: number;
      difficulty?: 'easy' | 'medium' | 'hard';
      questionTypes?: string[];
    }>({
      query: (params) => ({
        url: 'ai/generate-questions-advanced',
        method: 'POST',
        body: {
          ...params,
          instructorId: localStorage.getItem("userId"),
        },
      }),
    }),

  }),
});

export const {
  useGenerateQuestionsFromFileMutation,
  useGenerateQuestionsFromUrlMutation,
  useGenerateQuestionsWithContextMutation,
} = AIApi;

// Helper functions for different scenarios
export class AIQuestionGenerator {
  
  /**
   * Generate questions from cloud storage URL (downloads and uploads)
   */
  static async generateFromCloudUrl(
    cloudUrl: string, 
    generateFn: (file: File) => Promise<any>
  ): Promise<any> {
    return processVideoWithRetry(cloudUrl, generateFn);
  }

  /**
   * Generate questions with progress tracking
   */
  static async generateWithProgress(
    cloudUrl: string,
    generateFn: (file: File) => Promise<any>,
    onProgress?: (stage: string, progress: number) => void
  ): Promise<any> {
    try {
      onProgress?.('downloading', 0);
      const videoFile = await prepareVideoForAI(cloudUrl);
      
      onProgress?.('processing', 50);
      const result = await generateFn(videoFile);
      
      onProgress?.('complete', 100);
      return result;
      
    } catch (error) {
      onProgress?.('error', 0);
      throw error;
    }
  }
}
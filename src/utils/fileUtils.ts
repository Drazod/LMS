/**
 * Utility functions for handling file operations
 */

/**
 * Download a file from URL and convert to File object
 */
export async function downloadFileFromUrl(url: string, filename?: string): Promise<File> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const fileName = filename || extractFilenameFromUrl(url) || 'video.mp4';
    
    return new File([blob], fileName, { type: blob.type || 'video/mp4' });
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}

/**
 * Extract filename from URL
 */
function extractFilenameFromUrl(url: string): string | null {
  try {
    const urlPath = new URL(url).pathname;
    const filename = urlPath.split('/').pop();
    return filename && filename.includes('.') ? filename : null;
  } catch {
    return null;
  }
}

/**
 * Convert cloud storage URL to File for AI processing
 */
export async function prepareVideoForAI(cloudUrl: string): Promise<File> {
  console.log('Starting video download from:', cloudUrl);
  
  // Download the video from cloud storage
  const videoFile = await downloadFileFromUrl(cloudUrl);
  
  console.log('Video downloaded to memory:', {
    name: videoFile.name,
    size: `${(videoFile.size / 1024 / 1024).toFixed(2)} MB`,
    type: videoFile.type,
    lastModified: new Date(videoFile.lastModified),
    // Note: File is stored in browser memory, not on disk
    storageLocation: 'Browser Memory (RAM)',
    willBeDeletedWhen: 'Tab closes or garbage collected'
  });
  
  // Validate file type
  if (!videoFile.type.startsWith('video/')) {
    throw new Error('File must be a video');
  }
  
  // Check file size (optional - adjust limit as needed)
  const maxSize = 100 * 1024 * 1024; // 100MB
  if (videoFile.size > maxSize) {
    throw new Error('Video file too large for AI processing');
  }
  
  return videoFile;
}

/**
 * Process video with retry logic
 */
export async function processVideoWithRetry(
  cloudUrl: string, 
  processFn: (file: File) => Promise<any>,
  maxRetries: number = 3
): Promise<any> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const videoFile = await prepareVideoForAI(cloudUrl);
      return await processFn(videoFile);
    } catch (error) {
      lastError = error as Error;
      console.warn(`Attempt ${i + 1} failed:`, error);
      
      // Wait before retry (exponential backoff)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  
  throw lastError!;
}

/**
 * Save downloaded video to browser's Downloads folder (optional)
 */
export async function saveVideoToDownloads(videoFile: File): Promise<void> {
  try {
    // Create download link
    const url = URL.createObjectURL(videoFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = videoFile.name;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log(`Video saved to Downloads folder: ${videoFile.name}`);
  } catch (error) {
    console.error('Failed to save video:', error);
    throw error;
  }
}

/**
 * Create a temporary object URL for the video (for preview/debugging)
 */
export function createVideoPreviewUrl(videoFile: File): string {
  const url = URL.createObjectURL(videoFile);
  console.log('Temporary video URL created:', url);
  console.log('⚠️ Remember to call URL.revokeObjectURL() when done');
  return url;
}
import axios from 'axios';
import { SERVER_URL } from '../common/constants';

interface VideoData {
  id: string;
  user_id: string;
  task_id: string;
  image_url: string;
  url: string;
  status: string;
}



export const generateVideo = async (formData: FormData): Promise<string> => {
  const response = await axios.post(`/api/svd/img2video`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.task_id;
};

export const getVideoStatus = async (videoId: string): Promise<VideoData | null> => {
  try {
    const response = await axios.get(`/api/svd/videos/${videoId}`);
    return response.data.data;
  } catch (error) {
    return null;
  }
};


export const getAssetUrl = (url?: string): string => {
    return `${SERVER_URL}${url}`;
  };

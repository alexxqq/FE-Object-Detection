import axios from 'axios';
import { ImageEndpoint } from '../common/constants/image.endpoint';
import { TaskEndpoint } from '../common/constants/task.enpoint';
class DetectionService {
  private API_URL: string;

  constructor() {
    this.API_URL = `${import.meta.env.VITE_APP_API_URL}`;
  }

  async detectObjectsToJson(formData: FormData) {
    try {
      const token = localStorage.getItem('token');
      
      const headers: { [key: string]: string } = {
        'Content-Type': 'multipart/form-data',
      };
  
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
  
      const response = await axios.post(`${this.API_URL}/${ImageEndpoint.Json}`, formData, {
        headers,
      });
  
      return response.data.detect_objects;
    } catch (error: any) {
      throw new Error(error.response?.data.detail || 'Error detecting objects to JSON');
    }
  }
  

  async detectObjectsToImg(formData: FormData) {
    try {
  
      const response = await axios.post(`${this.API_URL}/${ImageEndpoint.Img}`, formData, {
        responseType: 'blob',
        headers: {
          
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data.detail || 'Error detecting objects to image');
    }
  }
  async getHistory() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${this.API_URL}/${TaskEndpoint.History}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data.detail || 'Error fetching history');
    }
  }
  async deleteTask(taskId: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }
      await axios.delete(`${this.API_URL}/${TaskEndpoint.History}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Error deleting task');
    }
  }
}


const detectionService = new DetectionService();
export default detectionService;

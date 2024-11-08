import axios from 'axios';

class DetectionService {
  private API_URL: string;

  constructor() {
    this.API_URL = `${import.meta.env.VITE_APP_API_URL}`;
  }

  // Detect objects and return JSON data
  async detectObjectsToJson(formData: FormData) {
    try {
      const token = localStorage.getItem('token');
      
      // Create headers object
      const headers: { [key: string]: string } = {
        'Content-Type': 'multipart/form-data',
      };
  
      // Add Authorization header if token exists
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
  
      const response = await axios.post(`${this.API_URL}/image/img_object_detection_to_json`, formData, {
        headers,
      });
  
      return response.data.detect_objects;
    } catch (error: any) {
      throw new Error(error.response?.data.detail || 'Error detecting objects to JSON');
    }
  }
  

  // Detect objects and return image with bounding boxes
  async detectObjectsToImg(formData: FormData) {
    try {
  
      const response = await axios.post(`${this.API_URL}/image/img_object_detection_to_img`, formData, {
        responseType: 'blob', // Important for image response
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
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.get(`${this.API_URL}/task/history`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add auth header with token
        },
      });
      return response.data; // Assuming the response contains the history
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
      await axios.delete(`${this.API_URL}/task/history/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Error deleting task');
    }
  }
}


const detectionService = new DetectionService();
export default detectionService;

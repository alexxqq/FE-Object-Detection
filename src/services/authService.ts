import axios, { AxiosResponse } from 'axios';
import { AuthEndpoint } from '../common/constants/auth.endpoint';

interface AuthResponse {
  access_token: string;
  token_type: string;
}


class AuthService {
  private API_URL: string;

  constructor() {
    this.API_URL = `${import.meta.env.VITE_APP_API_URL}` as string;
  }

  async register(username: string, password: string, email: string): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(`${this.API_URL}/${AuthEndpoint.Register}`, { username, password, email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Error registering user');
    }
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(`${this.API_URL}/${AuthEndpoint.Login}`, { username, password });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      console.log(response)
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Invalid login credentials');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  async getCurrentUser(): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }
      const response: AxiosResponse<any> = await axios.get(`${this.API_URL}/${AuthEndpoint.Me}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      throw new Error('Unable to fetch user details');
    }
  }
}

const authService = new AuthService();
export default authService;

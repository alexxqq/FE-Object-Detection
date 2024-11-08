import axios, { AxiosResponse } from 'axios';

// Define the response type for login and register endpoints
interface AuthResponse {
  access_token: string;
  token_type: string;
}

// interface User {
//   username: string;
//   password: string;
// }

class AuthService {
  private API_URL: string;

  constructor() {
    this.API_URL = `${import.meta.env.VITE_APP_API_URL}/auth` as string;
  }

  // Register a new user
  async register(username: string, password: string, email: string): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(`${this.API_URL}/register`, { username, password, email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Error registering user');
    }
  }

  // Login a user
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(`${this.API_URL}/login`, { username, password });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token); // Save token to localStorage
      }
      console.log(response)
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Invalid login credentials');
    }
  }

  // Logout a user
  logout(): void {
    localStorage.removeItem('token'); // Remove token from localStorage
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null; // Returns true if token exists, false otherwise
  }

  // Get current authenticated user's details
  async getCurrentUser(): Promise<any> {  // Adjust return type if you have a specific User type
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }
      const response: AxiosResponse<any> = await axios.get(`${this.API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      throw new Error('Unable to fetch user details');
    }
  }
}

// Export an instance of AuthService
const authService = new AuthService();
export default authService;

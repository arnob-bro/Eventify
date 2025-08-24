import axios from "axios";

export default class AuthService {
  constructor(baseURL = "https://eventify-wwfb.onrender.com/auth") {
    this.api = axios.create({ baseURL });
  }

  async signup(userData) {
    try {
      const response = await this.api.post("/signup", userData);
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Signup failed" };
    }
  }

  async login(identifier, password) {
    try {
      const response = await this.api.post("/login", { identifier, password });
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Login failed" };
    }
  }
}

import axios from "./config/axios";
const MODULE_API = "/auth";

const authService = {
  login: (payload) => axios.post(`${MODULE_API}/login`, payload),
  logout: (payload) => axios.post(MODULE_API, payload),
};

export default authService;

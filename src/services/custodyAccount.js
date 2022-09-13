import axios from "./config/axios";
const API = "/custody-account";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  find: (Id) => {
    console.log(`${API}/${Id}`);
    return axios.get(`${API}/${Id}`);
  },
};

import axios from "./config/axios";
const MODULE_API = "/custody-account";

const custodyAccountService = {
  all: async (token) =>
    axios.get(`${MODULE_API}`, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    }),
  find: async (Id, token) =>
    axios.get(`${MODULE_API}/${Id}`, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    }),
};

export default custodyAccountService;

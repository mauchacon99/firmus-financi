import { useState, useEffect } from "react";

import custodyAccount from "../services/custodyAccount";

export const useCustodyAccount = (custodyAccountId = 1441) => {
  const [value, setValue] = useState([]);

  const findCustodyAccount = async () => {
    const data = await custodyAccount.find(1441);
    setValue(data);
  };

  findCustodyAccount();
  return [value, setValue];
};

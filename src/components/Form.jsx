import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import custodyAccountService from "../services/custodyAccount.service.ts";

const Form = ({
  setFormEntity,
  setLoading,
  formEntity,
  handleSubmitEntity,
  clearLocalStorage,
  handleSummary,
  handleLogout,
  setStateApp,
  stateApp,
}) => {
  const [custodys, setCustody] = useState([]);

  const getAllCustodys = async () => {
    try {
      let isActive = true;
      if (isActive) {
        setLoading(true);
        const { data } = await custodyAccountService.all(stateApp.token);
        setCustody(data);
        setLoading(false);
      }
      return () => {
        isActive = false;
      };
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.statusCode === 401) handleLogout();
    }
  };

  const handleSelectedCustody = ({ Id: id }) => {
    setFormEntity({
      ...formEntity,
      id,
    });
  };

  useEffect(() => {
    getAllCustodys();
  }, []);

  return (
    <>
      <div className="flex w-full my-2 px-2">
        <div className="grid lg:grid-cols-5 md:grid-cols-3  grid-cols-2  gap-4">
          <Autocomplete
            disablePortal
            className="col-span-2"
            options={custodys}
            getOptionLabel={(option) => option.AccountFirmus}
            onChange={(event, newValue) => {
              handleSelectedCustody(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Custody" size="small" />
            )}
          />

          <Button
            onClick={handleSubmitEntity}
            disabled={!formEntity.id}
            variant="contained"
            className=""
            color="primary"
            size="small"
          >
            Buscar
          </Button>

          <Button
            onClick={handleSummary}
            className=""
            variant="contained"
            color="success"
            size="small"
          >
            Ver Resumen
          </Button>
          <Button
            className=""
            onClick={clearLocalStorage}
            variant="contained"
            color="error"
            size="small"
          >
            Limpiar Informacion
          </Button>
        </div>
      </div>
    </>
  );
};

export default Form;

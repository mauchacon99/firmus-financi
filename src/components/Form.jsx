import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import SendIcon from "@mui/icons-material/Send";
const Form = ({
  setFormEntity,
  formEntity,
  handleSubmitEntity,
  clearLocalStorage,
  handleSummary,
  loading,
}) => {
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="ID Entidad"
          type="number"
          required
          variant="outlined"
          id="standard-error-helper-text"
          helperText="Campo Requerido"
          value={formEntity.id}
          onChange={({ target }) =>
            setFormEntity({
              ...formEntity,
              id: target.value,
            })
          }
          name="id"
        />
        <Button
          onClick={handleSubmitEntity}
          variant="contained"
          color="primary"
          size="small"
        >
          BUSCAR
        </Button>
        <Button
          onClick={handleSummary}
          variant="contained"
          color="success"
          size="small"
        >
          Ver Resumen
        </Button>
        <Button
          onClick={clearLocalStorage}
          variant="contained"
          color="error"
          size="small"
        >
          Limpiar Informacion
        </Button>
      </Box>
    </>
  );
};

export default Form;

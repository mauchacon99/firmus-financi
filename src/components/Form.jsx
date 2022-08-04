import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { listColor, listEntity } from "./../data";

const Form = ({
  setFormEntity,
  formEntity,
  handleSubmitEntity,
  clearLocalStorage,
  handleSummary,
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
        <TextField
          id="standard-error-helper-text"
          label="entity"
          required
          value={formEntity.entity}
          onChange={({ target }) =>
            setFormEntity({
              ...formEntity,
              entity: target.value,
            })
          }
          name="entity"
          variant="outlined"
          helperText="Campo Requerido"
          sx={{ m: 1, width: "100ch" }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Colores</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formEntity.color}
            name="color"
            label="Color"
            onChange={({ target }) =>
              setFormEntity({
                ...formEntity,
                color: target.value,
              })
            }
          >
            {listColor.map((item) => {
              return (
                <MenuItem key={item.code} value={item.code}>
                  {" "}
                  {item.color}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {" "}
            Tipo de Entidad{" "}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formEntity.type}
            name={"type"}
            label="Tipo de Entidad"
            onChange={({ target }) =>
              setFormEntity({
                ...formEntity,
                type: target.value,
              })
            }
          >
            {listEntity.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {" "}
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          onClick={handleSubmitEntity}
          variant="contained"
          color="primary"
          size="small"
        >
          Agregar Entidad
        </Button>
        <Button
          onClick={handleSummary}
          variant="contained"
          color="primary"
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

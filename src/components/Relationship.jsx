import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { ListTypeRelationship } from "./../data";


const Relationship = ({ nodes, fieldsEgdes, setFieldsEgdes, AddEgdes }) => {
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
        {/*  Input From */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Origen </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="from"
            value={fieldsEgdes.from}
            label="Origen"
            onChange={({ target }) => {
              setFieldsEgdes({
                ...fieldsEgdes,
                from: parseInt(target.value),
              });
            }}
          >
            {nodes.map((item) => {
              return (
                fieldsEgdes.to !== parseInt(item.id) && (
                  <MenuItem key={item.id} value={item.id}>
                    {item.id} {item.entity}
                  </MenuItem>
                )
              );
            })}
          </Select>
        </FormControl>
        {/*  Input Relations */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Relacion </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="relation"
            onChange={({ target }) => {
              setFieldsEgdes({
                ...fieldsEgdes,
                label: target.value,
              });
            }}
            value={fieldsEgdes.label}
            label="Relacion"
          >
            {ListTypeRelationship.map((item, index ) => {
              return (
                <MenuItem key={index} value={item.label}>
                  {item?.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/*  Input To */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Destino </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="to"
            onChange={({ target }) => {
              setFieldsEgdes({
                ...fieldsEgdes,
                to: parseInt(target.value),
              });
            }}
            value={fieldsEgdes.to}
            label="Destino"
          >
            {nodes.map((item) => {
              return (
                fieldsEgdes.from !== parseInt(item.id) && (
                  <MenuItem key={item.id} value={item.id}>
                    {item.id} {item.entity}
                  </MenuItem>
                )
              );
            })}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={AddEgdes}
          color="primary"
          size="small"
        >
          Crear Relacion
        </Button>
      </Box>
    </>
  );
};

export default Relationship;

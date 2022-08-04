import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { listTypeRelationship } from "../data/index.js";

const Relationship = ({ nodes, fieldsEdges, setFieldsEdges, AddEdges }) => {
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
            value={fieldsEdges.from}
            label="from"
            onChange={({ target }) => {
              setFieldsEdges({
                ...fieldsEdges,
                from: parseInt(target.value),
              });
            }}
          >
            {nodes.map((item) => {
              return (
                fieldsEdges.to !== parseInt(item.id) && (
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
              setFieldsEdges({
                ...fieldsEdges,
                label: target.value,
              });
            }}
            value={fieldsEdges.label}
            label="relation"
          >
            {listTypeRelationship.map((item, index) => {
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
              setFieldsEdges({
                ...fieldsEdges,
                to: parseInt(target.value),
              });
            }}
            value={fieldsEdges.to}
            label="to"
          >
            {nodes.map((item) => {
              return (
                fieldsEdges.from !== parseInt(item.id) && (
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
          onClick={AddEdges}
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

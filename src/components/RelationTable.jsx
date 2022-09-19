import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconBuilding, IconUser } from "./icons/index.ts";

export default function BasicTable({ rows, nodes, data }) {
  const typePersona = (Id) => {
    const person = data.find((item) => parseInt(item.ID) === Id);
    return person.EntityType;
  };

  return (
    <>
      {rows.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  <strong> Destino </strong>{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  <strong> Tipo </strong>{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  <strong> Relacion </strong>{" "}
                </TableCell>

                <TableCell>
                  {" "}
                  <strong> Origen </strong>{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex">
                      {`${row.from}`}{" "}
                      {nodes.find((e) => parseInt(e.id) === row.from)?.label}{" "}
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {typePersona(row.from) === "N" ? (
                      <IconUser />
                    ) : (
                      <IconBuilding />
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.label}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.to} {""}
                    {nodes.find((e) => e.id === row.to)?.label}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

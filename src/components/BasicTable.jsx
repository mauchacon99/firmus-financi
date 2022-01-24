import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {  listColor, listEntity } from "./../data";

export default function BasicTable({ rows }) {
  return (
    <>
      {rows.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  <strong> Id </strong>{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  <strong> Entidad </strong>{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  <strong> Tipo </strong>{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  <strong> Color </strong>{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.entity}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {listEntity.find((e) => e.id === row.type).label}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {listColor.find((e) => e.code === row.color).color}
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

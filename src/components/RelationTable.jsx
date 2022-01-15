import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ rows, relations, nodes }) {
  return (
    <>
  
      {rows.length  > 0 && (
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
                    {row.from} {" "}
                    { nodes.find((e) => parseInt(e.id) === row.from)?.entity }
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.label}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.to } {""}
                    { nodes.find((e) => parseInt(e.id) === row.to)?.entity }
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

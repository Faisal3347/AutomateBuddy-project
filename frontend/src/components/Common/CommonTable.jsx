import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function CommonTable({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p style={{ textAlign: "center" }}>No data available</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", marginTop: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col} style={{ fontWeight: "bold" }}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col) => (
                <TableCell key={col}>{row[col]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommonTable;

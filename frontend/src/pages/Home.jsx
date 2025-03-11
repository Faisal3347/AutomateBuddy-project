import * as React from 'react';
import { menuData } from "../data/menuData";
import OrderSummary from "../components/OrderSummary";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const { addItem, order } = useContext(OrderContext);
  const navigae=useNavigate()

  console.log(order, 'aaaaaaaaaaaaaa')
  const handleOrderSummary=()=>{
    navigae('/ordersummary')
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        overflow: "auto",
        marginTop: '30px'

      }}
    >
      <h1>List of Product</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", width: "60%",cursor:'pointer' }} onClick={handleOrderSummary}>
        <Badge badgeContent={order?.length ?? 0} color="primary">
          <ProductionQuantityLimitsIcon color="action" fontSize="large" />
        </Badge>
      </div>


      {/* Centered Table */}
      <TableContainer component={Paper} sx={{ width: "60%", textAlign: "center" }}>
        <Table sx={{ minWidth: 650 }} aria-label="menu table">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Price ($)</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuData.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">{item.name}</TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="right">{item.category}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addItem(item)}
                  >
                    Add to Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Summary Section */}
      {/* <OrderSummary /> */}
    </Box>
  );
}

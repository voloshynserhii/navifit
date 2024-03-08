import * as React from 'react';
import moment from 'moment';
import { IconButton, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UsersTable({ data = [] }) {
  if (!data.length) return <CircularProgress />

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Paid User</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">BMR</TableCell>
            <TableCell align="right">BMI</TableCell>
            <TableCell align="right">Calories Needed</TableCell>
            <TableCell align="right">Kg to burn</TableCell>
            <TableCell align="right">Date to</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.isDraftUser ? 'NO' : 'YES'}</TableCell>
              <TableCell align="right">{moment(row.createdAt).format('DD MMMM YYYY, h:mm a')}</TableCell>
              <TableCell align="right">{row.userData.BMR}</TableCell>
              <TableCell align="right">{row.userData.BMI}</TableCell>
              <TableCell align="right">{row.userData.personalDailyKCalNeeded}</TableCell>
              <TableCell align="right">{row.userData.dimensions.weight - row.userData.desiredWeight}</TableCell>
              <TableCell align="right">{row.userData.desiredDate}</TableCell>
              <TableCell align="right">
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
import * as React from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function UsersTable({ data = [] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Paid User</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">BMR</TableCell>
            <TableCell align="right">Clories Needed</TableCell>
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
              <TableCell align="right">{row.userData.personalDailyKCalNeeded}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
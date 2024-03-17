import { useState, useEffect } from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation'
import { IconButton, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Form from './Forms/User'
import api from '../../../utils/api'

export default function UsersTable({ data }) {
  const router = useRouter()
  const [list, setList] = useState([])
  const [editUser, setEditUser] = useState()

  useEffect(() => {
    if (!list.length && data?.length) setList(data)
  }, [list, data])

  const onCancel = () => setEditUser(undefined)
  
  const onUpdate = item => {    
    api.user.update(process.env.NEXT_PUBLIC_DB_HOST, item).then(({ user }) => {
      const newList = [...list]
      const index = list.findIndex(item => item._id === user?._id)
      
      newList[index] = user
      
      setList(newList)
      onCancel()
    }).catch(err => console.log(err))
  }
  
  const onRemove = (id) => {}
  
  if (!data) return <CircularProgress />
  
  if (!data?.length) return <>No users found</>

  if (editUser) return <Form item={editUser} onCancel={onCancel} onUpdate={item => onUpdate(item)} />
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">BMR</TableCell>
            <TableCell align="right">BMI</TableCell>
            <TableCell align="right">Calories Needed</TableCell>
            <TableCell align="right">Kg to burn</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
            >
              <TableCell component="th" scope="row" onClick={() => !row.isDraftUser && router.push(`/account/plan/${row._id}`)}>
                {row.email}
              </TableCell>
              <TableCell align="right">{row.isDraftUser ? 'NO' : 'YES'}</TableCell>
              <TableCell align="right">{moment(row.createdAt).format('DD MMMM YYYY, h:mm a')}</TableCell>
              <TableCell align="right">{row.userData.BMR}</TableCell>
              <TableCell align="right">{row.userData.BMI}</TableCell>
              <TableCell align="right">{row.userData.personalDailyKCalNeeded}</TableCell>
              <TableCell align="right">{row.userData.weight - row.userData.desiredWeight}</TableCell>
              <TableCell align="right">{row.userData.desiredDate}</TableCell>
              <TableCell align="right">
                <Tooltip title="Reset password">
                  <IconButton>
                    <ContactMailIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={row.isDraftUser ? 'Activate' : 'Deactivate'}>
                  <IconButton>
                    {!row.isDraftUser ? <ToggleOnIcon /> : <ToggleOffIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton onClick={() => setEditUser(row)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => onRemove(row._id)}>
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
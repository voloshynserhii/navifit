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
import PopConfirm from '../../../components/PopConfirm'
import api from '../../../utils/api'
import { useAppStore } from '../../../store';

export default function UsersTable({ data }) {
  const router = useRouter()
  const [state, dispatch] = useAppStore();
  const [list, setList] = useState([])
  const [editUser, setEditUser] = useState()
  const [passwordAnchor, setPasswordAnchor] = useState()
  const [deleteAnchor, setDeleteAnchor] = useState()
  const [activateAnchor, setActivateAnchor] = useState()

  useEffect(() => {
    if (!list.length && data?.length) setList(data)
  }, [list, data])

  const onCancel = () => setEditUser(undefined)
  
  const onUpdate = item => {    
    api.user.update(process.env.NEXT_PUBLIC_DB_HOST, item).then(({ currentUser }) => {
      const newList = [...list]
      const index = list.findIndex(item => item._id === currentUser?._id)
      
      newList[index] = currentUser
      
      setList(newList)
      onCancel()
    }).catch(err => console.log(err))
  }
  
  const onOpenPopConfirm = (target, type) => {
    if (type === 'delete') {
      setDeleteAnchor(target)
    }
    if (type === 'activate') {
      setActivateAnchor(target)
    }
    if (type === 'password') {
      setPasswordAnchor(target)
    }
  }
  
  const onConfirmResetPassword = id => {
    setPasswordAnchor(undefined)
  }
  
  const onConfirmDelete = id => {
    api.user.remove(process.env.NEXT_PUBLIC_DB_HOST, id).then(() => {
      setList(prev => prev.filter(user => user._id !== id))
      setDeleteAnchor(undefined)
    })
  }
  
  const onConfirmChangeActive = (id, isDraft) => {
    api.user.update(process.env.NEXT_PUBLIC_DB_HOST, { _id: id, isDraft }).then(({ currentUser }) => {
      const newList = [...list]
      const index = list.findIndex(item => item._id === currentUser?._id)
      
      newList[index] = currentUser
      
      setList(newList)
      setActivateAnchor(undefined)
    })
  }

  
  if (!data) return <CircularProgress />
  
  if (!data?.length) return <>No users found</>

  if (editUser) return <Form item={editUser} onCancel={onCancel} onUpdate={item => onUpdate(item)} />
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{moment(row.createdAt).format('DD MMMM YYYY, h:mm a')}</TableCell>
              <TableCell align="right" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <Tooltip title="Reset password">
                  <IconButton onClick={(e) => onOpenPopConfirm(e.target, 'password')}>
                    <ContactMailIcon />
                  </IconButton>
                </Tooltip>
                <PopConfirm text='Are you sure you want to reset user password?' anchor={passwordAnchor} onConfirm={() => onConfirmResetPassword(row._id)} onCancel={() => setPasswordAnchor(undefined)} />
                <Tooltip title={row.isDraftUser ? 'Activate' : 'Deactivate'}>
                  <IconButton onClick={(e) => onOpenPopConfirm(e.target, 'activate')}>
                    {!row.isDraftUser ? <ToggleOnIcon /> : <ToggleOffIcon />}
                  </IconButton>
                </Tooltip>
                <PopConfirm text={`Are you sure you want to ${row.isDraftUser ? 'Activate' : 'Deactivate'} user?`} anchor={activateAnchor} onConfirm={() => onConfirmChangeActive(row._id, row.isDraftUser)} onCancel={() => setActivateAnchor(undefined)} />
                <Tooltip title="Edit">
                  <IconButton onClick={() => setEditUser(row)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={(e) => onOpenPopConfirm(e.target, 'delete')}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <PopConfirm text='Are you sure you want to delete user?' anchor={deleteAnchor} onConfirm={() => onConfirmDelete(row._id)} onCancel={() => setDeleteAnchor(undefined)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
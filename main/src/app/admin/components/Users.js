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
import ResetPasswordModal from '../../../components/ResetPassword'
import api from '../../../utils/api'
import { useAppStore } from '../../../store';

export default function UsersTable({ data = [], onEditModeOn }) {
  const router = useRouter()
  const [_, dispatch] = useAppStore();
  const [list, setList] = useState([])
  const [editUser, setEditUser] = useState()
  const [deleteAnchor, setDeleteAnchor] = useState()
  const [activateAnchor, setActivateAnchor] = useState()
  const [resetPasswordId, setResetPasswordId] = useState(null)

  useEffect(() => {
    setList(data)
  }, [data])

  const loadData = (currentUser) => {
    const newList = [...list]
    const index = list.findIndex(item => item._id === currentUser?._id)

    newList[index] = currentUser

    setList(newList)
    onCancel()
  }

  const onCancel = () => {
    setEditUser(undefined)
    onEditModeOn(false)
  }

  const onUpdate = item => {
    api.user.update(item).then(({ currentUser }) => {
      loadData(currentUser)
    }).catch(err => console.log(err))
  }

  const onOpenPopConfirm = (target, type) => {
    if (type === 'delete') {
      setDeleteAnchor(target)
    }
    if (type === 'activate') {
      setActivateAnchor(target)
    }
  }

  const onResetPassword = (newPassword) => {
    api.user.update({ _id: resetPasswordId, password: newPassword }).then(({ currentUser }) => {
      loadData(currentUser)
      setResetPasswordId(null)
    })
  }

  const onConfirmDelete = id => {
    api.user.remove(id).then(() => {
      setList(prev => prev.filter(user => user._id !== id))
      setDeleteAnchor(undefined)
    })
  }

  const onConfirmChangeActive = (id, isDraft) => {
    api.user.update({ _id: id, isDraft }).then(({ currentUser }) => {
      loadData(currentUser)
      setActivateAnchor(undefined)
    })
  }

  const onOpenUserAccount = user => {
    dispatch({
      type: 'CURRENT_USER',
      payload: user,
    });

    router.push(`/account/plan/${user._id}`)
  }

  if (!data) return <CircularProgress />

  if (!data?.length) return <>No users found</>

  if (editUser) return <Form item={editUser} onCancel={onCancel} onUpdate={item => onUpdate(item)} />

  if (resetPasswordId) return <ResetPasswordModal onClose={() => setResetPasswordId(null)} onConfirm={onResetPassword} />

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
          {list?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
            >
              <TableCell component="th" scope="row" onClick={() => !row.isDraftUser && onOpenUserAccount(row)}>
                {row.email}
              </TableCell>
              <TableCell align="right">{row.isDraftUser ? 'NO' : 'YES'}</TableCell>
              <TableCell align="right">{moment(row.createdAt).format('DD MMMM YYYY, h:mm a')}</TableCell>
              <TableCell align="right">{row.userData?.BMR}</TableCell>
              <TableCell align="right">{row.userData?.BMI}</TableCell>
              <TableCell align="right">{row.userData?.personalDailyKCalNeeded}</TableCell>
              <TableCell align="right">{row.userData ? row.userData?.weight - row.userData?.desiredWeight : ''}</TableCell>
              <TableCell align="right">{row.userData?.desiredDate}</TableCell>
              <TableCell align="right" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <Tooltip title="Reset password">
                  <IconButton onClick={(e) => {
                      setResetPasswordId(row._id)
                      onOpenPopConfirm(e.target, 'password')
                    }}>
                    <ContactMailIcon />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title={row.isDraftUser ? 'Activate' : 'Deactivate'}>
                  <IconButton onClick={(e) => onOpenPopConfirm(e.target, 'activate')}>
                    {!row.isDraftUser ? <ToggleOnIcon /> : <ToggleOffIcon />}
                  </IconButton>
                </Tooltip>
                <PopConfirm text={`Are you sure you want to ${row.isDraftUser ? 'Activate' : 'Deactivate'} user?`} anchor={activateAnchor} onConfirm={() => onConfirmChangeActive(row._id, row.isDraftUser)} onCancel={() => setActivateAnchor(undefined)} />
                
                <Tooltip title="Edit">
                  <IconButton onClick={() => {
                    setEditUser(row)
                    onEditModeOn(true)
                  }}>
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
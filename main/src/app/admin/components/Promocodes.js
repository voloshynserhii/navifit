import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Form from './Forms/Promocode'
import api from '../../../utils/api'

export default function PromocodesTable({ data = [] }) {
  const [list, setList] = useState(data)
  const [edit, setEdit] = useState()

  useEffect(() => {
    setList(data)
  }, [data])

  const onCancel = () => setEdit(undefined)
  
  const onUpdate = item => {    
    api.promo.update(process.env.NEXT_PUBLIC_DB_HOST, item).then(({ promocode }) => {
      const newList = [...list]
      const index = list.findIndex(item => item._id === promocode._id)
      
      newList[index] = promocode
      
      setList(newList)
      onCancel()
    }).catch(err => console.log(err))
  }
  
  const onRemove = id => {
    api.promo.remove(process.env.NEXT_PUBLIC_DB_HOST, id).then(() => {
      const newList = list.filter(promocode => promocode._id !== id)
      
      setList(newList)
      onCancel()
    }).catch(err => console.log(err))
  }
  
  if (!data) return <CircularProgress />

  if (!data?.length) return <>No promocodes found</>

  if (edit) return <Form item={edit} onCancel={onCancel} onUpdate={item => onUpdate(item)} />

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Discount&nbsp;(%)</TableCell>
            <TableCell align="right">Date due</TableCell>
            <TableCell align='right' style={{ width: 200 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list?.map((row) => (
            <TableRow
              key={row?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.code}
              </TableCell>
              <TableCell align="right">{+row?.type ? 'Personal' : 'Public'}</TableCell>
              <TableCell align="right">{row?.email || ''}</TableCell>
              <TableCell align="right">{row?.discount}</TableCell>
              <TableCell align="right">{row?.dateDue ? dayjs(row?.dateDue).format('YYYY-MM-DD') : ''}</TableCell>
              <TableCell align='right'>
                <Tooltip title="Edit">
                  <IconButton onClick={() => setEdit(row)}>
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
import { useState, useEffect } from 'react';
import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Form from './Forms/Plan'
import api from '../../../utils/api'

export default function PlansTable({ data = [] }) {
  const [list, setList] = useState([])
  const [editPlan, setEditPlan] = useState()

  useEffect(() => {
    setList(data)
  }, [list, data])

  const onCancel = () => setEditPlan(undefined)
  
  const onUpdate = item => {    
    api.plan.updatePlan(process.env.NEXT_PUBLIC_DB_HOST, item).then(({ plan }) => {
      const newList = [...list]
      const index = list.findIndex(item => item._id === plan._id)
      
      newList[index] = plan
      
      setList(newList)
      onCancel()
    }).catch(err => console.log(err))
  }
  
  const onRemove = id => {
    api.plan.removePlan(process.env.NEXT_PUBLIC_DB_HOST, id).then(() => {
      const newList = list.filter(plan => plan._id !== id)
      
      setList(newList)
      onCancel()
    }).catch(err => console.log(err))
  }
  
  if (!data) return <CircularProgress />

  if (!data?.length) return <>No plans found</>

  if (editPlan) return <Form item={editPlan} onCancel={onCancel} onUpdate={item => onUpdate(item)} />

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Price&nbsp;(zl)</TableCell>
            <TableCell align="right">Promo Price&nbsp;(zl)</TableCell>
            <TableCell align="right">Duration&nbsp;(months)</TableCell>
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
                {row?.title}
              </TableCell>
              <TableCell align="right">{row?.price}</TableCell>
              <TableCell align="right">{row?.promoPrice}</TableCell>
              <TableCell align="right">{row?.duration}</TableCell>
              <TableCell align='right'>
                <Tooltip title="Edit">
                  <IconButton onClick={() => setEditPlan(row)}>
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
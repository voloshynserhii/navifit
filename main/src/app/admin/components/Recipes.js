import { useState, useEffect, forwardRef, Fragment } from 'react';
import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableVirtuoso } from 'react-virtuoso';
import Form from './Forms/Recipe'
import api from '../../../utils/api'

const columns = [
  {
    width: 200,
    label: 'Name',
    dataKey: 'name',
  },
  {
    width: 120,
    label: 'Calories\u00A0(100g)',
    dataKey: 'calories',
    numeric: true,
  },
  {
    width: 120,
    label: 'Fats',
    dataKey: 'fats',
    numeric: true,
  },
  {
    width: 120,
    label: 'Carbs',
    dataKey: 'carbs',
    numeric: true,
  },
  {
    width: 120,
    label: 'Proteins',
    dataKey: 'proteins',
    numeric: true,
  },
  {
    width: 120,
    label: 'Time\u00A0(min)',
    dataKey: 'cookingTime',
    numeric: true,
  },
];

const VirtuosoTableComponents = {
  Scroller: forwardRef(function Scroll(props, ref) {
    return (
      <TableContainer component={Paper} {...props} ref={ref} />
    )
  }),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: (props) => <TableRow {...props} />,
  TableBody: forwardRef(function Body(props, ref) { return <TableBody {...props} ref={ref} /> }),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
      <TableCell align='right' style={{ width: 100 }}>Actions</TableCell>
    </TableRow>
  );
}

function rowContent(_index, row, onEdit, onDelete) {
  return (
    <Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column?.dataKey]}
        </TableCell>
      ))}
      <TableCell align='right'>
        <Tooltip title="Edit">
          <IconButton onClick={() => onEdit(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => onDelete(row._id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </Fragment>
  );
}

export default function ReactVirtualizedTable({ data }) {
  const [list, setList] = useState([])
  const [editRow, setEditRow] = useState()
  
  useEffect(() => {
    if (!list.length && data?.length) setList(data)
  }, [list, data])

  const onCancel = () => setEditRow(undefined)
  
  const onUpdate = item => {    
    api.admin.updateRecipe(process.env.NEXT_PUBLIC_DB_HOST, item).then(({ recipe }) => {
      const newList = [...list]
      const index = list.findIndex(item => item._id === recipe._id)
      
      newList[index] = recipe
      
      setList(newList)
      onCancel()
    }).catch(err => console.log(err))
  }
  
  const onRemoveRecipe = id => {
    api.admin.removeRecipe(process.env.NEXT_PUBLIC_DB_HOST, id).then(() => {
      const newList = list.filter(recipe => recipe._id !== id)
      
      setList(newList)
      onCancel()
    }).catch(err => console.log(err))
  }
  
  if (!data) return <CircularProgress />
  
  if (!data?.length) return <>No recipes found</>
  
  if (editRow) return <Form item={editRow} onCancel={onCancel} onUpdate={item => onUpdate(item)} />
  
  return (
    <Paper style={{ height: '70vh', width: '100%', position: 'relative' }}>
      <Typography sx={{ position: 'absolute', top: '-50px' }}>Total: {list.length} recipes</Typography>
      <TableVirtuoso
        data={list}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={(i, r) => rowContent(i, r, (row) => setEditRow(row), onRemoveRecipe)}
      />
    </Paper>
  );
}
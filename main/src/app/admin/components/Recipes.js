import { useState, useEffect, forwardRef, Fragment } from 'react';
import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableVirtuoso } from 'react-virtuoso';
import Form from './Forms/Recipe'
import PopConfirm from '../../../components/PopConfirm'
import api from '../../../utils/api'
import { ingredients } from '../../../utils/Plans'
import { getTitle } from '../helpers'

const flattenedIngredients =  [] 

Object.values(ingredients).forEach(arr => {
  flattenedIngredients.push(...arr)
})

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
  {
    width: 100,
    label: 'Essential Ingredients',
    dataKey: 'essentialIngredientIds',
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

function rowContent(_index, row, { removeAnchor, onEdit, onOpenPopConfirm, onConfirmRemoveRecipe, onCancelRemoveRecipe }) {
  return (
    <Fragment>
      {columns.map((column) => {
        let val
        
        if(Array.isArray(row[column?.dataKey])) {
          val = flattenedIngredients.filter(ingredient => row[column?.dataKey].includes(ingredient.id)).map(item => getTitle(item.title)).join(', ')
        }
        
        return (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
          >
            {val ? val : row[column?.dataKey]}
          </TableCell>
        )
      })}
      <TableCell align='right'>
        <Tooltip title="Edit">
          <IconButton onClick={() => onEdit(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={(e) => onOpenPopConfirm(e.target)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <PopConfirm text='Are you sure you want to delete the recipe?' anchor={removeAnchor} onConfirm={() => onConfirmRemoveRecipe(row._id)} onCancel={onCancelRemoveRecipe} />
      </TableCell>
    </Fragment>
  );
}

export default function ReactVirtualizedTable({ data = [], onEditModeOn }) {
  const [list, setList] = useState([])
  const [editRow, setEditRow] = useState()
  const [removeAnchor, setRemoveAnchor] = useState()

  useEffect(() => {
    setList(data)
  }, [data])

  const onCancel = () => {
    setEditRow(undefined)
    onEditModeOn(false)
  }

  const onUpdate = item => {
    api.recipe.update(process.env.NEXT_PUBLIC_DB_HOST, item).then(({ recipe }) => {
      const newList = [...list]
      const index = list.findIndex(item => item._id === recipe._id)

      newList[index] = recipe

      setList(newList)
      onCancel()
    }).catch(err => console.log(err))
  }

  const onRemoveRecipe = id => {
    api.recipe.remove(process.env.NEXT_PUBLIC_DB_HOST, id).then(() => {
      const newList = list.filter(recipe => recipe._id !== id)

      setList(newList)
      onCancel()
      setRemoveAnchor(undefined)
    }).catch(err => console.log(err))
  }

  if (!data) return <CircularProgress />

  if (!data?.length) return <>No recipes found</>

  if (editRow) return <Form item={editRow} onCancel={onCancel} onUpdate={item => onUpdate(item)} />

  return (
    <Paper style={{ height: '70vh', width: '100%', position: 'relative' }}>
      <TableVirtuoso
        data={list}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={(i, r) => rowContent(i, r, {
          removeAnchor,
          onEdit: (row) => {
            setEditRow(row)
            onEditModeOn(true)
          },
          onOpenPopConfirm: (target) => setRemoveAnchor(target),
          onConfirmRemoveRecipe: onRemoveRecipe,
          onCancelRemoveRecipe: () => setRemoveAnchor(undefined)
        })}
      />
    </Paper>
  );
}
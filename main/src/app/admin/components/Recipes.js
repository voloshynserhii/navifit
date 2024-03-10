import { forwardRef, Fragment } from 'react';
import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableVirtuoso } from 'react-virtuoso';

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
    label: 'Fat\u00A0(g)',
    dataKey: 'fats',
    numeric: true,
  },
  {
    width: 120,
    label: 'Carbs\u00A0(g)',
    dataKey: 'carbs',
    numeric: true,
  },
  {
    width: 120,
    label: 'Protein\u00A0(g)',
    dataKey: 'proteins',
    numeric: true,
  },
  {
    width: 120,
    label: 'Time\u00A0(min)',
    dataKey: 'cookingTime',
    numeric: true,
  },
  // {
  //   width: 120,
  //   label: 'Actions',
  //   numeric: true,
  // },
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

function rowContent(_index, row) {
  return (
    <Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
      <TableCell align='right'>
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </Fragment>
  );
}

export default function ReactVirtualizedTable({ data }) {
  if (!data.length) return <CircularProgress />

  return (
    <Paper style={{ height: '70vh', width: '100%' }}>
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
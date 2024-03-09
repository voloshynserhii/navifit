import { forwardRef, Fragment } from 'react';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
];

const VirtuosoTableComponents = {
  Scroller: forwardRef(function Scroll(props, ref) {
    return (
      <TableContainer component={Paper} {...props} ref={ref} />
    )
  }),
  // Scroller: forwardRef((props, ref) => (
  //   <TableContainer component={Paper} {...props} ref={ref} />
  // )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: (props) => <TableRow {...props} />,
  TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
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
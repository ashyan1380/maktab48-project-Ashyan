import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';

const columns = [
  {
    field: 'prodName',
    headerName: 'نام محصول',
    width: 200,
    editable: false,
  },
  {
    field: 'price',
    headerName: 'قیمت محصول',
    width: 150,
    editable: false,
  },
  {
    field: 'number',
    headerName: 'تعداد',
    type: 'number',
    width: 150,
    editable: false,
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function ProductsOfUsers(products) {
    // console.log(products.products);
  return (
    <div style={{ height: 200 }}>
      <DataGrid
      align="right"
        rows={products.products}
        columns={columns}
        pageSize={5}
        // checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

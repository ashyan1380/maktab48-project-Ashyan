import React , {useState , useEffect , useCallback 
  , useRef } from 'react';
import Button from '@material-ui/core/Button';
import {useSelector , useDispatch} from 'react-redux';
import {fetchProd } from '../Stor/Action/index'
import {Provider} from 'react-redux';
import {update} from '../api/patchProdoct';

import {
  GridColumns,
  GridRowsProp,
  useGridApiRef,
  XGrid,
  GridApiRef,
  MuiEvent,
} from '@material-ui/x-grid';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const defaultTheme = createMuiTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      justifyContent: 'center',
      display: 'flex',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }),
  { defaultTheme },
);

function EditToolbar(props) {
  const { selectedCellParams, apiRef, setSelectedCellParams } = props;
  const classes = useStyles();
  const handleClick = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field, cellMode } = selectedCellParams;
    if (cellMode === 'edit') {
      const editedCellProps = apiRef.current.getEditCellPropsParams(id, field);
      apiRef.current.commitCellChange(editedCellProps);
      // update field
      // ----------------------------------
      console.log(editedCellProps);
      if(editedCellProps.field == "price"){
        // console.log(editedCellProps);
        let newProd = {
          "id":editedCellProps.id,
          "price":editedCellProps.props.value,
        }
        // console.log(newProd);
        update(newProd);
      } else if (editedCellProps.field == "number"){
        let newProd = {
          "id":editedCellProps.id,
          "number":editedCellProps.props.value,
        }
        // console.log(newProd);
        update(newProd);
      }
      apiRef.current.setCellMode(id, field, 'view');
      setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
    } else {
      apiRef.current.setCellMode(id, field, 'edit');
      setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit' });
    }
  };
  
  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };
  
  return (
    <div className={classes.root} style={{"justifyContent":"start"}} >
      <Button 
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        color="primary"
        >
        {selectedCellParams?.cellMode === 'edit' ? 'ذخیره' : 'ویرایش'}
      </Button>
    </div>
  );
}
// ---------------------------------------------*******
export default function PriceAndNumber() {
  const rows = useSelector(state => state.rowsNames);
  const apiRef = useGridApiRef();
  const [selectedCellParams, setSelectedCellParams] =useState({});

  const handleCellClick = React.useCallback((params) => {
    setSelectedCellParams(params);
  }, []);
  
  const handleDoubleCellClick = React.useCallback(
    (params, event) => {
      event.stopPropagation();
    },
    [],
  );

  // Prevent from rolling back on escape
  const handleCellKeyDown = React.useCallback(
    (params, event) => {
      if (['Escape', 'Delete', 'Backspace', 'Enter'].includes(event.key)) {
        event.stopPropagation();
      }
    },
    [],
  );

  // Prevent from committing on focus out
  const handleCellFocusOut = React.useCallback(
    (params, event) => {
      if (params.cellMode === 'edit' && event) {
        event.defaultMuiPrevented = true;
      }
    },
    [],
  );

  return (
    <div style={{ height: 450, width: '100%' }}>
      <XGrid
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        onCellClick={handleCellClick}
        onCellDoubleClick={handleDoubleCellClick}
        onCellFocusOut={handleCellFocusOut}
        onCellKeyDown={handleCellKeyDown}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: {
            selectedCellParams,
            apiRef,
            setSelectedCellParams,
          },
        }}
      />
    </div>
  );
}

const columns = [
  {
    field: 'id',
    headerName: 'شماره کالا',
    width: 220,
    editable: false,
  },
  { field: 'productName',
    headerName: 'نام کالا',
    width: 180,
    editable: false },
  { field: 'price',
   headerName: 'قیمت(ریال)',
   width: 180,
    type: 'number',
     editable: true },
  {
    field: 'number',
    headerName: 'تعداد',
    type: 'number',
    width: 180,
    editable: true,
  }
];

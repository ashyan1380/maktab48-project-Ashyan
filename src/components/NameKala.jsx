import React , { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import TableHead from '@material-ui/core/TableHead';
import { createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useSelector , useDispatch} from 'react-redux';
import {fetchProd ,deletProd ,editProd} from '../Stor/Action/index'
import {Provider} from 'react-redux';
import {getNames} from '../api/getPro';
import {deleteProdoct} from '../api/deletProd';
import {update} from '../api/putProdoct';
import {add} from '../api/postProd';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ImageUpload from 'image-upload-react';
//important for getting nice style.
import 'image-upload-react/dist/index.css';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;
  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 500,
  },
}));
// -------------------------------------------------------------------------
export default function NameKala() {
    const rows = useSelector(state => state.rowsNames);
    const dispatch = useDispatch();
    useEffect(() => {
      getNames ()
      .then ((data)=> {dispatch(fetchProd(data))})
      .catch(err=> {return err})
    }, [])
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  function deleteRow(row)
    {
      let id = row.id;
      deleteProdoct(id);
      dispatch(deletProd(row.id));
    }
    function handleEditAddBtn(rw) {
        setOpen(true);
        setSelected(rw);
    }
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%)`,
    };
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEditSubmit = () => {
      dispatch(deletProd(selected.id));
      let prodoct = {
          "id":selected.id,
          "productName":nameProd, 
          "category":categProd,
          "image":imageSrc,
        }
        // for edit section
        if(selected.id != (rows.length+1)){
          update(prodoct);
        }else{  // for add section
          add(prodoct);
        }
        dispatch(editProd(prodoct));
    setOpen(false);
}
  const [nameProd, setNameProd] = useState();
  const [categProd, setCategProd] = useState();
  useEffect(() => {
    console.log(categProd);
  }, [categProd])
  //   upload img
  const [imageSrc, setImageSrc] = useState()
 
  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]))
  }
//  console.log(imageSrc);
 function setdisplay() {
   return{
     width:"100%"
   }
   
 }
 
 const handleChange = (event) => {
  setCategProd(event.target.value);
};
  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" onClick={() => handleEditAddBtn({id:(rows.length+1)})}>
       افزودن کالا
      </Button><br></br>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow style={{"background":"gray"}}>
            <TableCell>شماره کالا</TableCell>
            <TableCell>نام کالا</TableCell>
            <TableCell>دسته بندی</TableCell>
            <TableCell>تصویر</TableCell>
            <TableCell>ویرایش/ حذف</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                {row.productName}
              </TableCell>
              <TableCell>
                {row.category}
              </TableCell>
              <TableCell>
              <Avatar alt="userAvatar" src={row.image} />
              </TableCell>
              <TableCell>
              <Button variant="contained" color="primary">
                  <button className="btn" onClick={()=> deleteRow(row)}>
                    <DeleteIcon/>
                  </button>
                  <button className="btn" onClick={() => handleEditAddBtn(row)}>
                    <EditIcon/>
                  </button>
              </Button>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'صفحه' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <Modal
            open={open}
            onClose={()=>setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >

            <div style={getModalStyle()} className={classes.paper}>افزودن/ ویرایش کالا <br></br><br></br>
            <form  style={setdisplay()} className={classes.root} noValidate autoComplete="off">
                <TextField style={setdisplay()} id="outlined-basic" label="نام کالا" variant="outlined" onChange={(e)=>setNameProd(e.target.value)}/>
                    <br></br>
                    <br></br>
                    <FormControl className={classes.formControl} style={setdisplay()}>
                  <InputLabel shrink htmlFor="age-native-label-placeholder">
                    دسته ها
                  </InputLabel>
                  <NativeSelect
                    value={categProd}
                    onChange={handleChange}
                  >
                    <option value="" >
                    دسته بندی
              </option>
                  <option onChange={()=>setCategProd("لباس")} >لباس</option>
                  <option  onClick={()=>setCategProd("لبنیات")}>لبنیات</option>
                  <option  onClick={()=>setCategProd("کفش")}>کفش</option>
                  <option  onClick={()=>setCategProd("لپتاپ")}>لپتاپ</option>
                  <option  onClick={()=>setCategProd("لوازم جانبی")}>لوازم جانبی</option>
                  </NativeSelect>
                </FormControl><br></br><br></br>
                <div>

                <label>:تصویر کالا </label><br></br>
                <ImageUpload 
                    handleImageSelect={handleImageSelect}
                    imageSrc={imageSrc}
                    setImageSrc={setImageSrc}
                    style={{
                        width: 120,
                        height: 120,
                        background: 'blue',
                        // marginLeft: "200%",
                    }}
                    /></div>
                    <br></br><br></br>
                <Button variant="contained" color="primary" style={{"width":"100%"}} onClick={handleEditSubmit}>ذخیره</Button>
            </form>
            </div>
        </Modal>
    </TableContainer>
  );
}

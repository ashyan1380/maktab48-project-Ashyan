import React , { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme,StylesProvider, jssPreset } from '@material-ui/core/styles';
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
import {fetchProd , deletProd} from '../Stor/Action/index'
import {Provider} from 'react-redux';
import {getNames} from '../api/getPro';
import {deleteProdoct} from '../api/deletProd';
import {update} from '../api/patchProdoct';
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
import { create } from 'jss';
import rtl from 'jss-rtl';
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));


function TablePaginationActions(props) {

  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
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
    // const rows = []
    // console.log(rows);
    const dispatch = useDispatch();
    useEffect(() => {
      getNames ()
      .then ((data)=> {dispatch(fetchProd(data))})
      .catch(err=> {setError("?????? ???????? ???????? ???????? ?????????? ?????? ???? ?????????? ????????");})
      console.log(error);
      // set categories
  
      }, [])
    const idSelected = 0;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState();
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [error, setError] = useState();

  function deleteRow(id)
    {
      // let id = id;
      deleteProdoct(id);
      dispatch(deletProd(id));
      setOpenDelete(false)
    }
    function handleEditAddBtn(rw) {
        setOpen(true);
        setSelected(rw);
    }
  function getModalStyle() {
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
  useEffect(() => {
    selected && setImageSrc(selected.image);
  }, [selected])
  const handleEditSubmit = () => {
      // dispatch(deletProd(selected.id));
      let prodoct = {
          "id":selected.id,
          "productName":nameProd, 
          "category":categProd,
          "image":imageSrc,
        }
        console.log(nameProd);
        // for edit section
        if(selected.id != (rows.length)){
          update(prodoct);
        }else{  // for add section
          add(prodoct);
        }
        getNames ()
        .then ((data)=> {dispatch(fetchProd(data))})
        .catch(err=> {setError("?????? ???????? ???????? ???????? ?????????? ?????? ???? ?????????? ????????");})
    setOpen(false);
}
  useEffect(() => {
    console.log(error);
  }, [error])
  const [nameProd, setNameProd] = useState();
  const [categProd, setCategProd] = useState();
  // useEffect(() => {
  //   console.log(categProd);
  // }, [categProd])
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

 const handleDelete = (row)=>{
  setSelected(row.id);

  console.log(selected);
  setOpenDelete(true);
 }
 const handleChange = (event) => {
  setCategProd(event.target.value);
};
  return (
    <StylesProvider jss={jss}>
    <div dir="rtl">
      {error ? <div>{error}</div>:
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" onClick={() => handleEditAddBtn({id:(rows.length+1)})}>
       ???????????? ????????
      </Button><br></br><br></br>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow style={{"background":"#3f51b5"}}>
            <TableCell style={{"color":"white"}}>?????????? ????????</TableCell>
            <TableCell style={{"color":"white"}}>?????? ????????</TableCell>
            <TableCell style={{"color":"white"}}>???????? ????????</TableCell>
            <TableCell style={{"color":"white"}}>??????????</TableCell>
            <TableCell style={{"color":"white"}}>????????????/ ??????</TableCell>
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
              <TableCell align="center">
              <Avatar align="center" alt="userAvatar" src={row.image} />
              </TableCell>
              <TableCell>
              <Button variant="contained" color="primary">
                  <button style={{"backgroundColor":"#3f51b5","border":"none"}}  className="btn" onClick={()=> handleDelete(row)}>
                    <DeleteIcon style={{"color":"white"}} />
                  </button>
                  <button style={{"backgroundColor":"#3f51b5","border":"none"}} className="btn" onClick={() => handleEditAddBtn(row)}>
                    <EditIcon style={{"color":"white"}}/>
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
                inputProps: { 'aria-label': '????????' },
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
            align="right"
            open={open}
            onClose={()=>setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >

            <div style={getModalStyle()} className={classes.paper}>????????????/ ???????????? ???????? <br></br><br></br>
            <form  style={setdisplay()} className={classes.root} noValidate autoComplete="off">
                <TextField style={setdisplay()} id="outlined-basic" label={selected ? selected.productName :"??????"} variant="outlined"
                 onChange={(e)=>setNameProd(e.target.value)} align="right"/>
                    <br></br>
                    <br></br>
                    <FormControl align="right" className={classes.formControl} style={setdisplay()}>
                  <InputLabel shrink htmlFor="age-native-label-placeholder">
                  ???????? ????????
                  </InputLabel>
                  <NativeSelect
                    placeholder={selected ? selected.category :"???????? ????????"}
                    value={categProd}
                    onChange={handleChange}
                  >
                    <option value="" >
                    {selected ? selected.category :"???????? ????????"}
              </option>
                  <option onChange={()=>setCategProd("????????")} >????????</option>
                  <option  onClick={()=>setCategProd("????????????")}>????????????</option>
                  <option  onClick={()=>setCategProd("??????")}>??????</option>
                  <option  onClick={()=>setCategProd("??????????")}>??????????</option>
                  <option  onClick={()=>setCategProd("?????????? ??????????")}>?????????? ??????????</option>
                  </NativeSelect>
                </FormControl><br></br><br></br>
                <div>

                <label>:?????????? ???????? </label><br></br>
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
                <Button variant="contained" color="primary" style={{"width":"100%"}} onClick={handleEditSubmit}>??????????</Button>
            </form>
            </div>
        </Modal>

        <Modal
            align="right"
            open={openDelete}
            onClose={()=>setOpenDelete(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={getModalStyle()} className={classes.paper}>?????? ???????? <br></br><br></br>
           ?????? ?????????? ??????????<br></br>
            <Button onClick={()=>deleteRow(selected)} variant="contained" color="primary" style={{"width":"45%"}} >??????</Button>&emsp;
            <Button onClick={()=>setOpenDelete(false)} variant="contained" color="primary" style={{"width":"45%"}} >????</Button>

            </div>
        </Modal>
    </TableContainer>}</div>
    </StylesProvider>
  );
}

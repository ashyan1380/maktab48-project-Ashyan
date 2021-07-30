import React , {useState , useEffect} from 'react';
import { withStyles, Theme, createStyles, makeStyles, useTheme  } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import {useSelector , useDispatch} from 'react-redux';
import {getUser } from '../Stor/Action/index'
import {Provider} from 'react-redux';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {getNOHandledUsers} from "../api/getNOHandledUsers";
import {listOfUsers} from "../Stor/Reducer/listOfUsers";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ProductsOfUsers from './ProductsOfUsers';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {handled} from '../api/changeHandled';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';

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
const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
    //   backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    // backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 700,
  },
}));

export default function UsersNotOrder() {
    const rows = useSelector(state => state.listOfUsers);
    const dispatch = useDispatch();
    useEffect(() => {
      getNOHandledUsers ()
        .then ((data)=> {dispatch(getUser(data))})
        .catch(err=> {return err})
    }, [])
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const classes = useStyles();
  const [nameModal, setNameModal] = useState();
  const [addressModal, setAddress] = useState();
  const [phon, setPhon] = useState();
  const [orderTime, setOrderTime] = useState();
  const [products, setProducts] = useState();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [newUser, setnewUser] = useState([]);
  function handleShowInfo(row) {
    setOpen(true);
    setNameModal(row.userName);
    setAddress(row.addres);
    setPhon(row.phon);
    setOrderTime(row.orderTime);
    setProducts(row.products);
    setId(row.id)
  }

  function getModalStyle() {
    return {
      
      backgroundColor:"#fff",
      width:"80%",
      margin:"auto",
      // top: "100%",
      // left: "50%",
      transform: `translate(-2%, 3%)`,
      padding:"50px",
      paddingTop:"10px",
      paddingButtom:"10px",
    };
  }
  function styleInfo(){
    return{
      margin:"20px"
    }
  }
  
  
  function handling() {
    let s= new Date().toLocaleString();
    let userInfo = {
      "id":id,
      "handleTime":s,
      "isHandOver":true,
    }
    // console.log(userInfo);
    handled(userInfo);
    setOpen(false)
    getNOHandledUsers ()
    .then ((data)=> {console.log(data)})
    .catch(err=> {return err})
  }
  return (
    <TableContainer component={Paper}>
      <h1 align="right">سفارشات تحویل داده نشده</h1>
      <Table className={classes.table} aria-label="customized table">
        <TableHead style={{"backgroundColor":"#3f51b5"}} >
          <TableRow>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right">زمان ثبت سفارش</StyledTableCell>
            <StyledTableCell align="right">مجموع مبلغ</StyledTableCell>
            <StyledTableCell align="right">نام کاربر</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) =>
            <StyledTableRow key={row.id}>
              <StyledTableCell align="right"><Button variant="contained" color="primary"
              onClick={()=>handleShowInfo(row)}>
                بررسی سفارش
              </Button>
              </StyledTableCell>
              <StyledTableCell align="right">{row.orderTime}</StyledTableCell>
              <StyledTableCell align="right">{row.products.map((prod)=>
                  prod.price*prod.number
              )}</StyledTableCell>
              <StyledTableCell align="right">{row.userName}</StyledTableCell>
            </StyledTableRow>
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
            // align="right"
            open={open}
            onClose={()=>setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        ><article style={getModalStyle()} className={classes.root}>
         <bottun onClick={()=>setOpen(false)} align="left" style={{"color":"#3f51b5"}}>
          <HighlightOffIcon  align="left"/>
         </bottun>
          <h1 align="right">اطلاعات مشتری</h1>
            <h3 align="right">نام مشتری: {nameModal}</h3>
            <h3 align="right">آدرس: {addressModal}</h3>
            <h3 align="right">تلفن: {phon}</h3>
            <h3 align="right">زمان سفارش: {orderTime}</h3>
            <ProductsOfUsers products={products} /><br></br>
          <Button variant="contained" color="primary" onClick={handling} >
              تحویل شد
          </Button>
          </article>
          </Modal>
    </TableContainer>
  );
}
import React , {useState , useEffect} from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector , useDispatch} from 'react-redux';
import {getUser } from '../Stor/Action/index'
import {Provider} from 'react-redux';
import {getNOHandledUsers} from "../api/getNOHandledUsers";
import {listOfUsers} from "../Stor/Reducer/listOfUsers";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ProductsOfUsers from './ProductsOfUsers';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {handled} from '../api/changeHandled';
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
    
  const classes = useStyles();
  const [nameModal, setNameModal] = useState();
  const [addressModal, setAddress] = useState();
  const [phon, setPhon] = useState();
  const [orderTime, setOrderTime] = useState();
  const [products, setProducts] = useState();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
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
    .then ((data)=> {dispatch(getUser(data))})
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
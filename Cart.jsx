import React, { useState ,useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme,StylesProvider, jssPreset  } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {getNames} from '../api/getPro';
import {fetchProd , deletProd} from '../Stor/Action/index'
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Link , useParams } from 'react-router-dom';
import { logout } from "../utils/auth";
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import getOwnProd from '../api/getOwnProd';
import loading from '../c1bcd8a8c945b53da6b29f10a2a553c0.gif';
import TextField from '@material-ui/core/TextField'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Badge from '@material-ui/core/Badge';
import {useSelector , useDispatch} from 'react-redux';
import {addProdToCart} from "../Stor/Action/index"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { create } from 'jss';
import rtl from 'jss-rtl';
import HomeIcon from '@material-ui/icons/Home';
import {deletProdToCart} from "../Stor/Action/index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',

    },
  },
  table: {
    minWidth: 650,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const backGround =()=>{
  return{
    backgroundColor:"#c150f6",
    color:"white",
  }
}
function Cart(props) {
  
  const cart = useSelector(state => state.cart);
  // console.log(cart);
  const dispatch = useDispatch();
    const [prodInfo, setProdInfo] = useState();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [numberProd, setNumberProd] = useState(1);
  const [total, settotal] = useState();
  const { id } = useParams();
  // console.log(id);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    getOwnProd(id)
    .then(data => {setProdInfo(data[0])})
    .catch(err => {console.log(err);});
    // console.log(prodInfo);
  }, [])
  // useEffect(() => {
  //   console.log(cart);
  // }, [cart])

  const addCart =() =>{
    let cartProd = {
      productName : prodInfo.productName,
      price: prodInfo.price,
      number: numberProd,
    }
    dispatch(addProdToCart(cartProd));
  }

  const container = window !== undefined ? () => window().document.body : undefined;
  //   console.log(window.document.body );
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  useEffect(() => {
    let sum = 0;
    (cart.map((prod)=>{
      sum += parseInt(prod.price*prod.number);
    }));
    settotal(sum);
    console.log(total);
  }, [cart]);

  const deletCart =(id) =>{
    console.log(id);
    dispatch(deletProdToCart(id));
  }

  return (
    <StylesProvider jss={jss}>
    <div className={classes.root} dir="rtl">
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar style={{"backgroundColor":"#7000a6"}}>
          
          <Link to="/setting">            
             <Button variant="contained" style={backGround()} onClick={logout}>
               <SettingsIcon/>
             </Button>
             </Link>
             &emsp;
             <Link to="/">            
            <Button variant="contained" style={backGround()} color="primary" onClick={logout}>
              <HomeIcon/>
            </Button>
            </Link>
           
           <Typography
            align="right" 
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
             &emsp; فروشگاه اینترنتی
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <nav className={classes.drawer} aria-label="mailbox folders">
      
      </nav> */}
      <main style={{"justifyContent":"center"}} className={classes.content}>
        <div className={classes.toolbar} />
      <div >
<TableContainer component={Paper}style={{"width":"70%"}}  > 
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">نام کالا</TableCell>
            <TableCell align="right">قیمت</TableCell>
            <TableCell align="right">تعداد</TableCell>
            <TableCell align="right">حذف</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="right" component="th" scope="row">
                {row.productName}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.number}</TableCell>
              <TableCell align="right">
                <Button variant="contained" style={backGround()} onClick={()=>deletCart(row.id)}>
                  حذف
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer><br></br>
    <h1>جمع کل: {total}</h1>
    <Link to="/endCart" style={{"text-decoration": "none"}}>           
      <Button variant="contained" style={backGround()}>
        نهایی کردن خرید
      </Button>
    </Link>
      </div>
      </main>
    </div></StylesProvider>
  );
}

Cart.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Cart;

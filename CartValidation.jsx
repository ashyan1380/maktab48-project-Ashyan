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
import { newUserOrder } from '../api/newUserOrder';
import {userInfo} from "../Stor/Action/index";

import {
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker
} from "react-advance-jalaali-datepicker";

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
  form:{
    '& > *': {
        margin: theme.spacing(1),
        width: 'min(50ch ,100%)',
        // minWidth: '100%',
    },
    alignItems:"right",
    justify:"right",
    textAlign:"center",
  },
  date:{
    width: 'min(500px ,100%)',
    height:'50px',
    padding:"10px",
    backgroundColor:"#fafafa",
    border:"1px solid #bfbfbf",
    borderRadius:"5px",
  }
}));
const backGround =()=>{
  return{
    backgroundColor:"#c150f6",
    color:"white",
  }
}
function Cart(props) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [fName, setFName] = useState();
  const userInfoo = useSelector(state => state.userInfoo);
  // console.log(userInfoo);
  const [Lname, setLname] = useState();
  const [phon, setPhon] = useState();
  const [addres, setAddres] = useState();
  const [date, setDate] = useState();
  // console.log(cart);
  const { window } = props;
  const classes = useStyles();
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
    const handleCart =()=> {
        const user = {
            "userName":fName+" "+Lname,
            "addres": addres,
            "phon": phon,
            "isHandOver": false,
            "orderTime": date,
            "products":cart,
        }
        dispatch(userInfo(user));
        console.log(userInfoo);
        // ===============================================
    }
    const change=(unix, formatted)=> {
      console.log(formatted); 
      setDate(formatted)
    }
    const DatePickerInput=(props)=> {
      return <input className={classes.date} {...props} />;
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
      <h1>نهایی کردن سبد خرید</h1>
      <form style={{"textAlign":"right"}} className={classes.form} noValidate autoComplete="on">
            <TextField required placeholder={"نام:"} onChange={(e)=>setFName(e.target.value)} id="outlined-basic" label="" variant="outlined" />
            <TextField required placeholder={"نام خانوادگی:"} onChange={(e)=>setLname(e.target.value)} id="outlined-basic" label="" variant="outlined" />
            <TextField required placeholder={"تلفن همراه"} onChange={(e)=>setPhon(e.target.value)} id="outlined-basic" label="" variant="outlined" />
            <TextField required placeholder={"آدرس:"} id="outlined-basic" onChange={(e)=>setAddres(e.target.value)} multiline="true" label="" variant="outlined" />
            <DatePicker 
                required
                placeholderStart="تاریخ شروع"
                className={classes.date}
                inputComponent={DatePickerInput}
                placeholder="تاریخ تحویل"
                format="jYYYY/jMM/jDD"
                onChange={change}
                id="datePicker"
                preSelected=""
                style={{width:"800px"}}
              />
              {fName && Lname&&addres&& phon&&date&&cart&&<Link to="/cash" style={{"text-decoration": "none"}}>           
                <Button onClick={handleCart} variant="contained" style={backGround()}>
                    نهایی کردن خرید
                </Button>
              </Link>}

        </form>

      </div>
      </main>
    </div>
    </StylesProvider>
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

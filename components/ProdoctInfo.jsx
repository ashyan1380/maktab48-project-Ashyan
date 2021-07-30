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
import { makeStyles, useTheme,StylesProvider, jssPreset } from '@material-ui/core/styles';
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
import {addProdToCart} from "../Stor/Action/index";
import {deletProdToCart} from "../Stor/Action/index";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { create } from 'jss';
import rtl from 'jss-rtl';
import HomeIcon from '@material-ui/icons/Home';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const backGround =()=>{
  return{
    backgroundColor:"#c150f6",
    color:"white",
  }
}
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100%)`,
      // marginLeft: drawerWidth,
      // marginRight: drawerWidth,
    },
    backgroundColor:"#7000a6",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ProdoctInfo(props) {
  const cart = useSelector(state => state.cart);
  // console.log(cart);
  const dispatch = useDispatch();
    const [prodInfo, setProdInfo] = useState();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [numberProd, setNumberProd] = useState(1);
  const [isSelect, setIsSelect] = useState(false);
  const { prodId } = useParams();
  // console.log(prodId);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    getOwnProd(prodId)
    .then(data => {setProdInfo(data[0])})
    .catch(err => {console.log(err);});
    console.log(prodInfo);
  }, [])
  useEffect(() => {
    console.log(cart.find(({id})=> id == id));
    // setIsSelect(!isSelect)
    // console.log(id);
    cart.find(({id})=> id == prodId) && setIsSelect(!isSelect);
    
  }, [])
  const addCart =() =>{
    // const jsdjd= cart;
    // jsdjd.filter((sfssd) => sfssd.productName !== prodInfo.productName);
    // console.log(jsdjd);
    let cartProd = {
      id : prodInfo.id,
      productName : prodInfo.productName,
      price: prodInfo.price,
      number: numberProd,
    }
    dispatch(addProdToCart(cartProd));
    setIsSelect(true);
  }
  const deletCart =() =>{
    dispatch(deletProdToCart(prodId));
    console.log(cart);
    setIsSelect(false);
  }

  const container = window !== undefined ? () => window().document.body : undefined;
//   console.log(window.document.body );

  return (
    <StylesProvider jss={jss}>
    <div className={classes.root} dir="rtl">
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>

          <Link to="/setting" style={{"text-decoration": "none"}}>            
             <Button variant="contained" style={backGround()} onClick={logout}>
               <SettingsIcon/>
             </Button>
             </Link>
             &emsp;
             <Link to="/cart" style={{"text-decoration": "none"}}>            
             <Badge badgeContent={cart.length} color="secondary">
             <Button variant="contained" style={backGround()} onClick={logout}>
            <ShoppingCartIcon/>
            </Button>
            </Badge>
             </Link> &emsp;
             <Link to="/">            
            <Button variant="contained" style={backGround()} color="primary" onClick={logout}>
              <HomeIcon/>
            </Button>
            </Link>
           <Typography
            component="h1"
            variant="h6"
            color="inherit"
            style={{"textAlign":"right"}}
            noWrap
            className={classes.title}
          >
             &emsp; فروشگاه اینترنتی
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <nav className={classes.drawer} aria-label="mailbox folders">
      
      </nav> */}
      <main style={{"color":"#292a2d"}} className={classes.content}>
        <div className={classes.toolbar} />
      {prodInfo ? <div align="right">
        <img align="right" style={{"margin":"20px","width":"250px","height":"200px"}}
        src={prodInfo.image}/>&ensp;
        <h1 >{prodInfo.productName}</h1>
        <h2 >{prodInfo.category}</h2>
        <h3><strong>{prodInfo.price}</strong>تومان</h3>
        <TextField 
          style={{"width":"50px"}}
          align="right"
          InputLabelProps={{ shrink: true }}  
          type="number" 
          placeholder="1"
          onChange={(e)=>setNumberProd(e.target.value)}
        />
         &emsp;
         {!isSelect ? <Button align="right" variant="contained"
          onClick={addCart} 
          style={{"backgroundColor":"#25d366","color":"white"}}
          disableElevation>
            <AddCircleIcon/>&emsp;افزودن به سبد خرید 
        </Button>:<Button align="right" variant="contained"
          onClick={deletCart} 
          style={{"backgroundColor":"#f50057","color":"white"}}
          disableElevation>
            <RemoveCircleOutlineIcon/>&emsp;حذف از سبد خرید
        </Button>} &emsp;
      </div> :
        <img src={loading}/>
      }
      <br></br>
      {/* <div>ژانر رومنس یا عاشقانه از ژانرهای پرطرفدار و سرگرم‌کننده دنیای سینما و انیمیشن است که بهره‌گیری از آن، می‌تواند باعث جذب مخاطبان زیادی شود. این ژانر می‌تواند با کشش‌های عاطفی و صحنه‌های رومانتیک دل ما را به لرزه بیاندازد و ما را به دیدن ادامه فیلم و سریال موردنظر تشویق کند. محبوبیت بالای این ژانر باعث شده است تا تعداد بسیار زیادی فیلم و سریال عاشقانه تولید شوند که در بسیاری از مواقع، داستان‌های مشابهی دارند و از کلیشه‌های تکراری پیروی می‌کنند. این امر سبب شده است تا مخاطبان این ژانر، روزبه‌روز نکته‌سنج و سخت‌پسندتر شوند و به‌راحتی گول ظاهر وسوسه‌انگیزش را نخورند. به همین دلیل، بسیاری از کارگردانان و فیلم‌نامه‌نویسان تلاش کرده‌اند که ژانر عاشقانه یا رومنس را در بسترهای متفاوتی روایت کنند تا از این راه، کلیشه‌ها را دور بزنند و رنگ و بوی تازه‌تری به این ژانر ببخشند.</div> */}
      </main>
    </div></StylesProvider>
  );
}

ProdoctInfo.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ProdoctInfo;
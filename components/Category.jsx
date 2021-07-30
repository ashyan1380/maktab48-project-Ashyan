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
import React, {useState , useEffect} from "react";
import NameKala from "./NameKala";
import {useSelector , useDispatch} from 'react-redux';
import {Provider} from 'react-redux';
import {getNames} from '../api/getPro';
import {fetchProd , deletProd} from '../Stor/Action/index'
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { logout } from "../utils/auth";
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ProdoctInfo from "./ProdoctInfo";
import Badge from '@material-ui/core/Badge';
import Cart from './Cart'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { Link , useParams } from 'react-router-dom';
import prodoctsCategor from "../api/getProdFromCtegor";
import HomeIcon from '@material-ui/icons/Home';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'right',
    // backgroundImage: `url(${backImag})` ,
    // width:"100%",
  },
  media: {
    height: 140,
  },
  rootCard:{
    minWidth:"200px",
    // maxWidth:"300px",
    flexGrow: 2,
    display: 'flex',
    justify:"right"
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% )`,
      alignItems: 'right',
      marginRight: drawerWidth,
    },
    backgroundColor:"#7000a6",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .5)",
    // filter: "blur(10px)",
    // backdropFilter: "blur(5px)",
  },
}));

function Category(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const rows = useSelector(state => state.rowsNames);
  const dispatch = useDispatch();
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const cart = useSelector(state => state.cart);
  const { category } = useParams();
  const [prodoct, setProdoct] = useState([]);
  // set prodocts to show
  useEffect(() => {
    // window.location.reload();
    prodoctsCategor (category)
    .then ((data)=> {setProdoct(data);})
    .catch(err=> {return err});
    console.log(prodoct);
  }, [category])
  useEffect(() => {
   console.log(prodoct);
  }, [prodoct])
  // console.log(cart.length);
    // get all prodocts
  useEffect(() => {
    getNames ()
    .then ((data)=> {dispatch(fetchProd(data))})
    .catch(err=> {return err})
    // console.log(rows);
    // set categories
    }, [])
    // set categories in drawer
    useEffect(() => {
      let categoreis = [];
      rows.map((row)=> categoreis.push(row.category))
        // console.log(categoreis);
      setUniqueCategories(categoreis.filter((c, index) => 
       categoreis.indexOf(c) === index)
        )
      // console.log(uniqueCategories);
  }, [rows])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const backGround =()=>{
    return{
      backgroundColor:"#c150f6",
      color:"white",
    }
  }
  const drawerRespansive = (
    <div>
      <div className={classes.toolbar}>
          <IconButton style={{'marginLeft':"20px"}} onClick={handleDrawerToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
      </div>
      <Divider />
      <List>
        {uniqueCategories.map((text, index) => (
          <Link to={`/categories/${text}`} style={{"text-decoration": "none"}}>
          <ListItem button key={text} style={{"textAlign":"right"}}>
            <ListItemText primary={text} style={{"textAlign":"right"}}/>
          </ListItem> </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {uniqueCategories.map((text, index) => (
          <Link to={`/categories/${text}`} style={{"text-decoration": "none"}}>
          <ListItem button key={text} style={{"textAlign":"right"}}>
            <ListItemText primary={text} style={{"textAlign":"right"}}/>
          </ListItem> </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
//   console.log(window.document.body );

  return (
    <StylesProvider jss={jss}>
    <div className={classes.root} dir="rtl">
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">            
            <Button variant="contained"style={backGround()} onClick={logout}>
              <HomeIcon/>
            </Button>
            </Link> &emsp;
          <Link to="/setting" style={{"text-decoration": "none"}}>            
             <Button variant="contained" style={backGround()} onClick={logout}>
               <SettingsIcon/>
             </Button>
             </Link>
             &emsp;
             <Link to="/cart" style={{"text-decoration": "none"}}>            
             <Badge color="secondary" badgeContent={cart.length} >
             <Button variant="contained" style={backGround()} onClick={logout}>
            <ShoppingCartIcon/>
            </Button>
            </Badge>
             </Link>
           <Typography
            align="left" 
            component="h1"
            variant="h6"
            color="inherit"
            style={{"align":"right"}}
            noWrap
            className={classes.title}
          >
            &emsp; فروشگاه اینترنتی
          </Typography>
          <IconButton
            align="right"
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
            </IconButton>
        </Toolbar>
      </AppBar>
      <nav justify="right" className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            anchor={"right"} 
            container={container}
            variant="temporary"
            // anchor={theme.direction =  'right'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerRespansive}
          </Drawer>
        </Hidden>
        <Hidden 
         justify="right" 
         xsDown style={{"align":"right"}} 
         anchor={"right"}  implementation="css">
          <Drawer
          anchor={"right"} 
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}  align="right">
      <div className={classes.toolbar} />
      <div>
        {/* {prodoct.map(()=><div>jskdjlfljfskf</div>)} */}
        <Grid xs container spacing={2}>
        {prodoct.map((prod)=>
          <Grid item xs={3} align="right">
            <Link to={`/${prod.id}`}  style={{"text-decoration": "none"}}>
            <Card className={classes.rootCard}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={prod.image}
                title="Contemplative Reptile"
              />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {prod.productName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      تومان{prod.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </Link>
              </Grid>
              )}
              </Grid>
      </div>
    </main>
    </div></StylesProvider>
  );
}

Category.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Category;
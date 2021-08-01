import React , {useState , useEffect} from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { makeStyles, useTheme,StylesProvider, jssPreset } from '@material-ui/core/styles';
import { Link , useParams } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import {useSelector , useDispatch} from 'react-redux';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import {deletAllCart} from "../Stor/Action/index";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const backGround =()=>{
    return{
      backgroundColor:"#c150f6",
      color:"white",
    }
  }
const ResponseCach = () => {
  const cart = useSelector(state => state.cart);
    // console.log(cart);
  const dispatch = useDispatch();
  const { res } = useParams();
  //   console.log(res);
  const styles= ()=>{
      return{
          paddingRight:"20%",
      }
  }
    // res == "complated" && dispatch(deletAllCart());
  useEffect(() => {
    if(res=="complated"){
      dispatch(deletAllCart());
      // console.log(cart);
    }
  }, [])
    return (
    <StylesProvider jss={jss}>

        <div style={{textAlign:"right", "padding":"10px"}}>
            <h1>نتیجه پرداخت</h1>
            {res == "canceled" &&  <div style={styles()}>
                <CancelIcon style={{"width":"100px","height":"100px","color":"#cf2a27"}} />
                <p>پرداخت موفقیت آمیز نبود. سبد خرید شما در انتظار پرداخت است</p>
                <Link to="/" style={{"text-decoration": "none"}}>            
                <Button variant="contained" style={backGround()} >
                <HomeIcon/>&emsp; بازگشت به صفحه اصلی
                </Button>
                </Link>
                &emsp;
                <Link to="/cart" style={{"text-decoration": "none"}}>            
                    <Badge badgeContent={cart.length} color="secondary">
                        <Button variant="contained" style={backGround()}>
                        <ShoppingCartIcon/>&emsp;بازگشت به سبد خرید
                        </Button>
                    </Badge>
                </Link> 
                </div>}
            {res == "complated" &&  <div style={styles()}>
                <CheckCircleIcon style={{"width":"100px","height":"100px","color":"#009e0f"}}/>
                <p>با تشکر از پرداخت شما, سفارش شما ثبت شده و جهت هماهنگی ارسال با شما تماس گرفته خواهد شد<div className=""></div></p>
                <Link to="/" style={{"text-decoration": "none"}}>            
                <Button variant="contained" style={backGround()} >
                <HomeIcon/>&emsp; بازگشت به صفحه اصلی
                </Button>
                </Link>
                &emsp;
                <Link to="/setting" style={{"text-decoration": "none"}}>            
                <Button variant="contained" style={backGround()}>
                  <SettingsIcon/>&emsp; مدیریت سایت
                </Button>
                </Link>
                </div>}

        </div>
    </StylesProvider>
    )
}

export default ResponseCach

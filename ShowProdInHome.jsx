import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import prodoctsCategor from "../api/getProdFromCtegor";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
        flexGrow: 2,
      display: 'flex',
    },
    rootCard:{
      minWidth:"200px",
      // maxWidth:"300px",
      flexGrow: 2,
      display: 'flex',
      justify:"right"
    },
    media: {
      height: 250,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    }, 
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'right',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'right',
        color: theme.palette.text.secondary,
      },
  }),
);
function styles() {
    return{
        width:"325px",
        justifyContent:"right",
    }
}
const ShowProdInHome = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [allProd, setAllProd] = useState([]);
    const [prodoct, setProdoct] = useState([]);
    useEffect(() => {
        prodoctsCategor (props.categor)
        .then ((data)=> {setProdoct(data.splice(0,4))})
        .catch(err=> {return err});
    }, [])
    const backGround =()=>{
      return{
        backgroundColor:"#c150f6",
        color:"white",
      }
    }
    // console.log(prodoct);
    return (
        <div >
          <br></br>
          <Link to={`/categories/${props.categor}`}  style={{"text-decoration": "none"}}>
          <Button 
          align="right" variant="contained" style={backGround()} disableElevation>
              <ArrowLeftIcon/>کالاهای گروه {props.categor}
          </Button>
          </Link><br></br><br></br>
          <div className={classes.root}>
          <Grid xs container spacing={4}>
          {prodoct.map((prod)=>
          <Grid item xs align="right">
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
          </div><br></br>
        </div>
    )
}

export default ShowProdInHome;

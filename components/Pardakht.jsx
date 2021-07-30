import React, {useState , useEffect} from 'react'
import { Link , useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    justifyContent:"center",
    marginLeft:"43%"
  },
}));
const Pardakht = () => {
    const classes = useStyles();

    return (
        <div style={{"justifyContent":"center"}}>
            <img style={{width:"100%"}} src="https://static4.donya-e-eqtesad.com/thumbnail/GdKbrBF8iaWv/vXJwwA1o8rIoZ7wrPHPV-QYqssTF6UH1BwhMCHO9O4SdbVkfXsgGzjmyHn-dhgOYlBH-hXHgenSPkchyUb3fFQ8Bvzddp2ShPRan7j6Xoky7bpym50cJMg,,/%D8%A8%D9%87+%D9%BE%D8%B1%D8%AF%D8%A7%D8%AE%D8%AA.jpg"></img>
            <div className={classes.root}>
                <Link to="/responseCach/canceled" style={{"text-decoration": "none"}}>           
                <Button style={{color:"white", "backgroundColor":"#f9d273"}} variant="contained" color="secondary">
                    انصراف
                </Button>
                </Link>
                <Link to="/responseCach/complated" style={{"text-decoration": "none"}}>           
                <Button style={{color:"white", "backgroundColor":"#0ec77f"}} variant="contained" color="secondary">
                    پرداخت
                </Button>
                </Link>
            </div>
        </div>
    )
}

export default Pardakht

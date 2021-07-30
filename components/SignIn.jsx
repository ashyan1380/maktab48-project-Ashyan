import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { login } from "../api/login";
import {BrowserRouter, Linked, Route, Switch } from "react-router-dom";
import Dashboard from './Dashboard';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createMuiTheme({
    direction: 'rtl',
  });
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({}) {
  const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogedIn, setIsLogedIn] = useState(true);
  const classes = useStyles();
  const handleLogin = (e) => {
    e.preventDefault();
    if ((email, password)) {
      login(email, password)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          history.push("/dashboard");
        })
        .catch((err) => console.error(err));
    } else {
      console.log("email and password fields could not be empty! ");
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Container dir="rtl"  component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
         فرم ورود
        </Typography>
        <form onSubmit={handleLogin} className={classes.form} dir="rtl" noValidate autoComplete="off">
        <div dir="rtl">
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
           placeholder=" نام کاربری"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
        onChange={handleChange}
          /> 
      </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="رمز ورود"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
        onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="یاد آوری کن"
          />
           <Button
           onClick={handleLogin} 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ورود
          </Button>
        </form>
      </div>
      <Box mt={8}>
        {/* <Copyright /> */}
      </Box>
    </Container> 
    </ThemeProvider>
  );
}
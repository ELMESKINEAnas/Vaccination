import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { API_URL } from "../../config";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import toastr from 'toastr'
import "toastr/build/toastr.css"


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '3px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserCreate() {
  const classes = useStyles();
  
  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'email': email,
      'password': password,
    }
    fetch(`${API_URL}loginResp`, {
        method: 'POST',
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
      },
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(res => {
        if(res.error){
            toastr.error(res.error,'Check Your Form !!',{positionClass:"toastr-bottom-left"})
        }else{
           toastr.info('Login Success ','Welcome',{positionClass:"toastr-bottom-left"})
            localStorage.setItem('token-info',JSON.stringify(res.user))
            window.location = '/respo/home'
        }
    })
    }

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Respo Login 
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                onChange={(e) => setemail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                id="password"
                type="password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>

  );
}
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { API_URL } from "../../config";
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {MenuItem} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
const {handleClose,open,ff }=props
const handleSubmit = event => {
    event.preventDefault();
    var data = {
        'username': username,
        'email': email,
        'password':password,
        'region':region

    }
    fetch(`${API_URL}signupResp`, {
        method: 'POST',
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
      },
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(res => {
        ff()
    })
    }
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [region, setregion] = useState('');
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Create Center"}</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            fullWidth
            variant="standard"
            onChange={(e) => setusername(e.target.value)}
          />
        <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type={"email"}
            fullWidth
            variant="standard"
            onChange={(e) => setemail(e.target.value)}
          />
        <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type={"password"}
            fullWidth
            variant="standard"
            onChange={(e) => setpassword(e.target.value)}
          />
          <TextField 
          id="select" 
          margin="dense" 
          fullWidth 
          label="Region"  
          onChange={(e) => setregion(e.target.value)}
           select
 >
            <MenuItem value={3}>Casablanca</MenuItem>
            <MenuItem value={1}>Marrakesh/Safi</MenuItem>
            <MenuItem value={2}>Tanger</MenuItem>
        </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={(event)=> { 
              handleSubmit(event)
               handleClose()}}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
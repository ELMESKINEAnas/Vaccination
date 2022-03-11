import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { API_URL } from "../../config";
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
const {handleClose,open , userId }=props
const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'password': password
    }
    fetch(`${API_URL}validation/`+userId, {
        method: 'POST',
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
      },
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(res => {
    })
    }
    const [password, setpassword] = useState('');
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please Enter Your Password?"}</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setpassword(e.target.value)}
          />
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
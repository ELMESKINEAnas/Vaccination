import React, { useState,useEffect } from "react";
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

export default function AlertDialogSlide1(props) {
const {handleClose,open,respoId,ff }=props
useEffect(() => {
    fetch(`${API_URL}OneRespo/`+respoId)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result)
            setusername(result.respo.username)
            setemail(result.respo.email)
        }
      )
  }, [respoId])
const handleSubmit = event => {
    event.preventDefault();
    var data = {
        'username': username,
        'email': email,
    }
    fetch(`${API_URL}UpdateRespo/`+respoId,{
        method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
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
            id="name"
            label="Name"
            fullWidth
            value={username}
            variant="standard"
            onChange={(e) => setusername(e.target.value)}
          />
        <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            fullWidth
            type={"email"}
            value={email}
            variant="standard"
            onChange={(e) => setemail(e.target.value)}
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
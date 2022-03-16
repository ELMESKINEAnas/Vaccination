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
const {handleClose,open,ff }=props
const handleSubmit = event => {
    event.preventDefault();
    var data = {
        'name': name,
        'address': address,
        'city': city,
    }
    fetch(`${API_URL}CreateCentre`, {
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
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [city, setcity] = useState('');
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
            variant="standard"
            onChange={(e) => setname(e.target.value)}
          />
        <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            fullWidth
            variant="standard"
            onChange={(e) => setaddress(e.target.value)}
          />
        <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            fullWidth
            variant="standard"
            onChange={(e) => setcity(e.target.value)}
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
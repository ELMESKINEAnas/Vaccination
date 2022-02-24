import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MultiStep from './MultiStep'
import { useEffect } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {

const{handleClose,open, values}=props;

useEffect(()=>{

  console.log("multi",values);

},[values])

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please fill up this form"}</DialogTitle>
        <DialogContent>
          <MultiStep validate={values}  />
        </DialogContent>
        
      </Dialog>
    </div>
  );
}

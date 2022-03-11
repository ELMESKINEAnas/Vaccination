import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Case from './Case';
// import MultiStep from './MultiStep';
// import link from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {

const{handleClose,open,disabled,values}=props;

React.useEffect(() => {
  console.log("from condition 1",values);
}, [values])


  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please answer this question"}</DialogTitle>
        <DialogContent>
          <Case chronic_disease={disabled}/>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}

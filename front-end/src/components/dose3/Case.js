import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import MultiStep from './MultiStep'
// import None from './NoCase'
// import {Link} from 'react-router-dom';

export default function RadioButtonsGroup() {
    const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  }

      const [value, setValue] = useState({
      yes : false,
      no : false,
  });

    useEffect(() => {
        if(value.yes){
          const  covid = {
            status : "Covid"
          }
          console.log(covid);
             
            } else if(value.no){
              const noCovid ={
                status : "NoCovid"
              }
              console.log(noCovid);
        }
        
    },[value])

    
    
  return (
    
      <div>
      <div>
      <h1>Take a Rdv "Dose3"</h1>
      <hr />
      <br />
      </div>
      <div>

      <FormControl >
      <FormLabel id="demo-radio-buttons-group-label">have you got fever or flu last two week ?</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        >
        <FormControlLabel value={value.yes}  control={<Radio checked={value.yes} onChange ={(e)=>setValue({no:false,yes: true})} />} label="Yes" />
        <FormControlLabel value={value.no}  control={<Radio checked={value.no} onChange ={(e)=>setValue({yes:false,no : true})} />} label="No" />
      </RadioGroup>
    {/* <Button variant="outlined" onClick={handleClickOpen}>Submit</Button> */}
    </FormControl>


      {(value.yes ||value.no) && <MultiStep covid={value.yes} noCovid={value.no} value={value} handleClose={handleClose} open={open} /> }
      </div>
      </div>
  );
}
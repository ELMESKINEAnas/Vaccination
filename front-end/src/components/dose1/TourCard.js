import Paper from '@mui/material/Paper';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AlertDialogSlide from './Condition1'
import AlertDialog from './Condition2'
import { useFormikContext } from 'formik';






const TourCard = () =>{
    const [disabled, setDisabled] = useState(false)
 const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const {
    values,
    setFieldValue
  } = useFormikContext();

  
  useEffect(() => {
   console.log("formik",values);
  }, [values])
  

  const [checkbox, setCheckbox] = useState({
      diabete : false,
      maladie : false,
      cancer : false
  });

  
  
  

  

    useEffect(() => {
        
        if (disabled) {
            console.log(disabled);
            setCheckbox({
      diabete : false,
      maladie : false,
      cancer : false
  })
         }
        
    },[disabled])

    useEffect(() => {
        
    },[checkbox])


    console.log(checkbox);

    return <>  <Grid  item xs={3}>
            
            <Paper elevation ={3}>
                
                
                <FormGroup >
                    <Box padding={5}>

                    <FormControlLabel   control={<Switch checked ={checkbox.diabete}  onChange = {(e)=>{
                        setFieldValue("diabete",!checkbox.diabete)
                        setCheckbox({...checkbox,diabete: !checkbox.diabete})
                    }} disabled={disabled}/>}
                    value={checkbox.diabete}
                    label="diabete" 
                    name="diabete" />
                    <FormControlLabel  control={<Switch checked ={checkbox.maladie}  onChange = {(e)=>{
                        setFieldValue("maladie",!checkbox.diabete)
                        setCheckbox({...checkbox,maladie:  !checkbox.maladie})
                    }} disabled={disabled}/>} 
                    value={checkbox.maladie} 
                    label="Maladies cardiaques" 
                    name="Maladies cardiaques" />
                    <FormControlLabel   control={<Switch checked ={checkbox.cancer} onChange = {(e)=>setCheckbox({...checkbox,cancer:  !checkbox.cancer})} disabled={disabled}/>}
                    value={checkbox.cancer} 
                    label="Maladies pulmonaires" 
                    name="Maladies pulmonaires" />
                    </Box>

                    <Box>

                    <Checkbox onChange = {()=>setDisabled(!disabled)}  
                    label="healthy"
                    name ="healthy"/>

                        i dont suffer from any disease
                    </Box>
                    

                    
                    <Box sx={{
                        display: "flex",
                        justifyContent : "flex-end",
                        margin : "2rem 1rem 1rem 0rem"
                    }}>
                        
                        <Button  onClick={() => handleClickOpen(!open)  } variant="contained">Submit</Button>

                    </Box>
                </FormGroup>
                
            </Paper>
           
            {disabled &&  <AlertDialogSlide values={values} disabled={!disabled} handleClose={handleClose} open={open} />}

          </Grid>

          {!disabled && Object.values(checkbox).some(e=>e===true)  && <AlertDialog disabled={!disabled}  values={values} handleClose={handleClose} open={open} />}

          
      
      
    </>
        
    
}

export default TourCard;
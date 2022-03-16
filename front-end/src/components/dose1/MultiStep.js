import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
} from "@material-ui/core";
// import InputLabel from '@mui/material/InputLabel';
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "../../config";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// import DateAdapter from '@mui/lab/AdapterMoment';


const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Personal information",
    "Cin",
  ];
}




const BasicForm = () => {
  const [centres, setCentres] = useState([]);

useEffect(() => {
  CentresGet()
}, [])


const CentresGet = () => {
  fetch(`${API_URL}getAllcentre`)
    .then(res => res.json())
    .then(
      (result) => {
        setCentres(result.centres)
      }
    )
}
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="prenom"
        render={({ field }) => (
          <TextField
            id="first-name"
            label="First Name"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
       <Controller
        control={control}
        name="nom"
        render={({ field }) => (
          <TextField
            id="last-name"
            label="Last Name"
            variant="outlined"
            placeholder="Enter Your Last Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
<Controller
control={control}
name="region"
render={({ field }) => (
<TextField 
          id="select" 
          margin="dense" 
          fullWidth 
          label="Region"  
           select
           {...field}
 >
            <MenuItem value={3}>Casablanca</MenuItem>
            <MenuItem value={1}>Marrakesh/Safi</MenuItem>
            <MenuItem value={2}>Tanger</MenuItem>
        </TextField>
  )}
/>
<Controller
control={control}
name="centre"
render={({ field }) => (
<TextField 
          id="select" 
          margin="dense" 
          fullWidth 
          label="Centre"
          {...field}
           select
 >
{centres.map((centre) => (
    <MenuItem key={centre._id} value={centre._id}>{centre.name}</MenuItem>
  ))}        
</TextField>
  )}
/>
    </>
  );
};

const CinForm = () => {
    const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="age"
        render={({ field }) => (
          <TextField
            id="age"
            label="Age"
            variant="outlined"
            placeholder="Enter Your Age"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="cin"
        render={({ field }) => (
          <TextField
            id="cin"
            label="cin"
            variant="outlined"
            placeholder="Enter Your CIN"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

        <Controller
        control={control}
        name="date_fin_cin"
        
        render={({ field }) => (
            <LocalizationProvider dateAdapter={DateAdapter}>
                
          <DesktopDatePicker
            id="date_fin_cin"
            label="Enter your fin CIN "
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            fullWidth
            color="black"
            margin="normal"
            {...field}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
          </LocalizationProvider>
        )}
      /><br/>
      <br/>

    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;
    case 1:
      return <CinForm />;
    default:
      return "unknown step";
  }
}
const MySwal = withReactContent(Swal)
const LinaerStepper = (props) => {

const {chronic_disease,covid,noCovid}=props;
useEffect(()=>{
  console.log(chronic_disease);

},[chronic_disease])
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      nom: "",
      prenom: "",
      age: "",
      cin: "",
      date_fin_cin: "",
      chronic_disease,
      covid,
      noCovid,
      region : ""
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();



  const handleNext = (data) => {
    console.log(data);
    if (activeStep === steps.length - 1) {
          setActiveStep(activeStep + 1);
          fetch(`${API_URL}storeAdult`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res =>res.json())
        .then(res => {
           console.log(res)
           MySwal.fire({
            position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
            
          }).then(() => {
            return MySwal.fire(       
              window.location = '/'
            )
          })
            
        })
    } else {
      setActiveStep(activeStep + 1);
      

    }

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };



  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                back
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                // onClick={handleNext}
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default LinaerStepper;

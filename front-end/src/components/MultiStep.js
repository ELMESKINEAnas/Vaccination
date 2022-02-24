import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';

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
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="firstName"
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
        name="lastName"
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
            placeholder="Enter Your cin"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

        <Controller
        control={control}
        name="finCin"
        
        render={({ field }) => (
            <LocalizationProvider dateAdapter={DateAdapter}>
                
          <DesktopDatePicker
            id="finCin"
            label="enter your fin cin "
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            fullWidth
            margin="normal"
            {...field}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
          </LocalizationProvider>
        )}
      /><br/>
      <br/>

      {/* <Controller
        control={control}
        name="finCin"
        render={({ field }) => (
          <TextField
            id="finCin"
            label="fin cin"
            variant="outlined"
            placeholder="Enter Your fin cin"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      /> */}
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

const LinaerStepper = (props) => {

const {validate,covid,noCovid}=props;
useEffect(()=>{
  console.log(validate);

},[validate])
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      cin: "",
      finCin: "",
      validate,
      covid,
      noCovid
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();



  const handleNext = (data) => {
    console.log(data);
    if (activeStep === steps.length - 1) {

          setActiveStep(activeStep + 1);
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

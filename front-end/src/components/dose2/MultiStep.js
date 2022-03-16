import React from "react";
import { API_URL } from "../../config";
import {
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  FormProvider,
} from "react-hook-form";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// import DateAdapter from '@mui/lab/AdapterMoment';


const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const LinaerStepper = (props) => {
  const jwt = localStorage.getItem('token-Dose')
  const cin = JSON.parse(jwt)
const {covid,noCovid}=props;

  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      covid,
      noCovid
    },
  });
  const MySwal = withReactContent(Swal)
  const handleNext = (data) => {
    console.log(data);
    fetch(`${API_URL}storeDose2/`+cin,{
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
      didOpen: () => {
        MySwal.clickConfirm()
        window.location = '/'
      }
    }).then(() => {
      return MySwal.fire(<p>Votre Rendez vous :<br></br>{res.response.rdv}</p>)
    })
      
  })
  };

  return (
  
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
              >
                Take a Rdv
              </Button>
            </form>
          </FormProvider>
        </>
   
  );
};

export default LinaerStepper;

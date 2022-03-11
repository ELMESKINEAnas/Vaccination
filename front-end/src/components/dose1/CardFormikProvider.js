import React from "react";
import { FormikProvider, useFormik } from "formik";
// import { post } from "@/hooks";



// const validationSchema = () =>
//   Yup.object({
//     email: Yup.string().required(),
//     password: Yup.string().required(),
//   });

export const CardFormikProvider = ({ children }) => {
  const formik = useFormik({
    initialValues: {
      diabete : false,
      cancer : false,
      maladie : false
    },

    
    // validationSchema,
    onSubmit:  (values) => {
      
    },
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: false,
  });
  return <FormikProvider value={formik}>{children}</FormikProvider>;
};
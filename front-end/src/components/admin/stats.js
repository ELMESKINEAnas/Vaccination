import React, { useEffect, useState } from 'react'
import { Typography, Box } from "@mui/material"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { API_URL } from "../../config";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
        textAlign: "center",
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "25px",
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    dd: {
        justifyContent: "center",
        alignItems: "center"
    }
  }));


ChartJS.register(ArcElement, Tooltip, Legend)
export default function Stats() {
    const classes = useStyles();
    const [FirstDose, setFirstDose] = useState([]);
    const [SecondeDose, setSecondeDose] = useState([]);
    const [ThirdDose, setThirdDose] = useState([]);
    useEffect(() => {
        FirstDoose()
        SecondeDoose()
        ThirdDoose()
      }, [])
    const FirstDoose = () => {

    fetch(`${API_URL}getFirstDose`)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result.users)
            setFirstDose(result.users)

        }
      )
    }
    const SecondeDoose = () => {

    fetch(`${API_URL}getSecondeDose`)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result.users)
            setSecondeDose(result.users)

        }
      )
    }
    const ThirdDoose = () => {

    fetch(`${API_URL}getThirdDose`)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result.users)
            setThirdDose(result.users)

        }
      )
    }
    const data = {
    
        labels: ["first shot", "second shot", "third shot"],
        datasets: [
          {
            label: "# of Votes",
            data: [FirstDose, SecondeDose, ThirdDose],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }
  return (
    <>
    <Container className={classes.container} maxWidth="lg">
    <Paper elevation={3} className={classes.paper}> 
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Stats
    </Typography>
    <Box
    className={classes.dd}
      component="form"
      noValidate
      sx={{
        mt: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: "50%",
          width: "50%",
        }}
      >
        <Doughnut data={data} options={{}} height="100%" width="100%" />
      </Box>
    </Box>
    </Paper>
    </Container>

  </>
  )
}


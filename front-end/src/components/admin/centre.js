import React, { useEffect, useState } from 'react'
import { API_URL } from "../../config";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import AlertDialogSlide from "./test";
import AlertDialogSlide1 from "./editcentre";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



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
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }));


  export default function Centre() {


    const classes = useStyles();
    const [centreId , setCentreId] = useState("")
    const [centres, setCentres] = useState([]);
    useEffect(() => {
        CentresGet()
      }, [])

  const CentresGet = () => {
    fetch(`${API_URL}getAllcentre`)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result.centres)
            setCentres(result.centres)
        }
      )
  }
  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

  
    const handleClose = () => {
      setOpen(false);
    };
  const [open1, setOpen1] = React.useState(false);

    const handleClickOpen1 = () => {
      setOpen1(true);
    };

  
    const handleClose1 = () => {
      setOpen1(false);
    };

    const  CentreDelete = async id => {
        var data = {
          'id': id
        }
        await fetch(`${API_URL}DeleteCentre/`+id, {
          method: 'DELETE',
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }) 
        CentresGet();    
    
      }
  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Centres
              </Typography>
            </Box>
            <Box>
                <Button variant="contained" color="primary"onClick={() => {handleClickOpen(!open)} }>
                  CREATE
                </Button>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">City</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {centres.map((centre) => (
                <TableRow  key={centre._id} >
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <Avatar  />
                    </Box>
                  </TableCell>
                  <TableCell align="left">{centre.name}</TableCell>
                  <TableCell align="left">{centre.address}</TableCell>
                <TableCell align="left">{centre.city}</TableCell>
    
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <EditIcon  onClick={() => {
                        handleClickOpen1(!open1) 
                        setCentreId(centre._id)
                    }}>Edit</EditIcon>
                    <DeleteIcon onClick={() => CentreDelete(centre._id)}>Del</DeleteIcon>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
        {<AlertDialogSlide ff={CentresGet}  handleClose={handleClose} open={open} />}
        {<AlertDialogSlide1 ff={CentresGet} centreId={centreId} handleClose={handleClose1} open={open1} />}
      </Container>
        </div>
  )
}
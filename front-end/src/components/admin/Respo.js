import React, { useEffect, useState } from 'react'
import { API_URL } from "../../config";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialogSlide from "./createrespo";
import AlertDialogSlide1 from "./editrespo";



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


  export default function Respo() {
    
    const classes = useStyles();
    const [respoId , setRespoId] = useState("")
    const [respos, setRespos] = useState([]);
    useEffect(() => {
        ResposGet()
      }, [])

  const ResposGet = () => {
    fetch(`${API_URL}AllRespo/`)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result.respos)
          setRespos(result.respos)
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

    const  RespoDelete = async id => {
        var data = {
          'id': id
        }
        await fetch(`${API_URL}DeleteRespo/`+id, {
          method: 'DELETE',
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }) 
        ResposGet();    
    
      }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Responsable
              </Typography>
            </Box>
            <Button variant="contained" color="primary"onClick={() => {handleClickOpen(!open)} }>
                  CREATE
                </Button>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="left">Full Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">createdAt</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {respos.map((respo) => (
                <TableRow key={respo._id}>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <Avatar src={respo.avatar} />
                    </Box>
                  </TableCell>
                  <TableCell align="left">{respo.username}</TableCell>
                  <TableCell align="left">{respo.email}</TableCell> 
                  <TableCell align="left">{respo.createdAt}</TableCell> 
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <EditIcon  onClick={() => {
                        handleClickOpen1(!open1) 
                        setRespoId(respo._id)
                    }}>Edit</EditIcon>
                    <DeleteIcon onClick={() => RespoDelete(respo._id)}>Del</DeleteIcon>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
        {<AlertDialogSlide ff={ResposGet}  handleClose={handleClose} open={open} />}
        {<AlertDialogSlide1 ff={ResposGet} respoId={respoId} handleClose={handleClose1} open={open1} />}
      </Container>
        </div>
  )
}
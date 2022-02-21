import TourCard from './components/TourCard';
// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MultiStep from './components/MultiStep'
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";


function App() {
  return (
    <div className="App">
       <>

      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <MultiStep></MultiStep>
        </Paper>
      </Container>
      <Container>
        <Grid container sx={{display : 'flex',
      justifyContent : 'center',
      alignItems : 'center'}} >
          <TourCard />
          {/* <TourCard />
          <TourCard />
          <TourCard /> */}
        </Grid>
      </Container> 
     </>
      
    </div>
  );
}

export default App;

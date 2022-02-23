import TourCard from './components/TourCard';
// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CssBaseline, Container } from "@material-ui/core";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


function App() {
  return (
      <Router>
       

    <div className="App">
       <>
       <CssBaseline />
      <Container>
        <Grid container sx={{
          height:"100vh",
          display : 'flex',
          justifyContent : 'center',
          alignItems : 'center'
        }} >
       <Routes>
      
          
          <Route path="/home" element={<TourCard />} />
          
      </Routes>
        </Grid>
      </Container> 
     </>
      
    </div>
      </Router>
  );
}

export default App;

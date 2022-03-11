import TourCard from './components/dose1/TourCard';
import Case from './components/dose2/Case';
import Case2 from './components/dose3/Case';
// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CssBaseline, Container } from "@material-ui/core";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { CardFormikProvider } from './components/dose1/CardFormikProvider';
import Start  from './components/Start';
import Respo  from './components/respo/';
import RespoHome  from './components/respo/home';



function App() {
  return (
      <Router>
       

    <div className="App" >
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
      
          
          <Route path="/newUser" element={<CardFormikProvider><TourCard /></ CardFormikProvider>} />
          <Route path="/dose2" element={<Case />}/>
          <Route path="/dose3" element={<Case2 />}/>
          <Route path="/" element={<Start></Start>}/>
          <Route path="/respo" element={<Respo></Respo>}/>
          <Route path="/respo/home" element={<RespoHome></RespoHome>}/>
          
      </Routes>
        </Grid>
      </Container> 
     </>
      
    </div>
      </Router>
  );
}

export default App;

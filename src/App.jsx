import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material"
import './App.css';
import QuoteIntroAnimation from './components/animations/Intro';
import Topbar from './components/key-components/Topbar';
import Home from './components/hero/ComingSoon'; // Assuming Home component exists

const theme = createTheme({
  palette: {
    primary: { main: "#339c5e" },
  },
});

function App() {
  // const [introDone, setIntroDone] = useState(false);

  return (
    <ThemeProvider theme={theme}>
    <Router>
      {/* <Topbar /> */}
      {/* {!introDone ? ( */}
        {/* <QuoteIntroAnimation onComplete={() => setIntroDone(true)} /> */}
      {/* ) : ( */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here as needed */}
        </Routes>
      {/* )} */}
    </Router>
    </ThemeProvider>
  );
}

export default App;

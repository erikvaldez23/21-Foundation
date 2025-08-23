// App.jsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material"
import './App.css';
import HeroClark from './components/landing/hero';
import Events from './components/landing/Events';
import Footer from './components/key-components/Footer';
import Quote from './components/landing/Quote';
import Topbar from './components/key-components/Topbar';
import AboutPage from './components/about/About';

const theme = createTheme({
  palette: {
    primary: { main: "#339c5e" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Topbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <HeroClark />
                <Quote />
                <Events />
              </>
            } 
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;

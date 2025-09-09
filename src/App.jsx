// App.jsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material"
import './App.css';
import HeroClark from './components/landing/hero';
import Events2 from './components/landing/Events2';
import Footer from './components/key-components/Footer';
import Quote from './components/landing/Quote';
import Topbar from './components/key-components/Topbar';
import AboutPage from './components/sub-pages/about/About';
import Contact from './components/sub-pages/contact/Contact';
import Give from './components/sub-pages/give/Give'
import Shop from './components/sub-pages/shop/Shop';
import EventsHero from './components/sub-pages/events/EventHero';
import Gallery from './components/sub-pages/gallery/Gallery';
import ImpactPillars from './components/landing/ImpactPillars';
import Headliner from './components/key-components/Headlne'
import CTA from "./components/key-components/CTA"
import LoadingAnimation from "./components/animate/LoadingAnimation/"

const theme = createTheme({
  palette: {
    primary: { main: "#339c5e" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
         <Headliner
        formUrl="https://docs.google.com/forms/d/your-google-form-id/viewform"
        message="Be the first to hear about new programs and events."
        ctaText="Sign Up"
        // storageKey="clark21_headliner_v1" // optional: change to re-show after updates
      />
        <Topbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
              <LoadingAnimation />
                <HeroClark />
                {/* <EventsHero /> */}
                <Quote />
                <Events2 />
                <ImpactPillars />
                <CTA />
              </>
            } 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/give" element={<Give />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/events" element={<EventsHero />} />
          <Route path="/gallery" element={<Gallery />} />
           {/* <Route path="/events/:slug" element={<EventDetailsPage />} /> */}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;

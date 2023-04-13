import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WebFooter from './components/WebFooter';
import TripDetails from './components/TripDetails';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import CityOverview from './views/trippo/CityOverview';
import MyTrips from './views/trippo/MyTrips';
import Profile from './views/profile/Profile';
import Planning from './views/trippo/Planning';
import TripPlan from './views/trippo/TripPlan';
import HowItWorks from './views/HowItWorks';

import './components/Search.css';
import './components/DestinationCard.css';
import './styles/NavbarFooterStyles.css';
import './views/trippo/planning.css';
import './views/trippo/tripPlan.css';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CityOverview" element= {<CityOverview />}/>
        <Route path="/CityOverview/:cityParams" element= {<CityOverview />}/>
        <Route path="/plan-de-viaje" element={<TripPlan />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/planning/:city" element={<Planning />} />
        <Route path="/trip/mis-viajes" element={<MyTrips />} />
        <Route path="/como-funciona" element=   {<HowItWorks />} />
        <Route path="/trip/mis-viajes/:planId" element={<TripDetails />} />
  
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WebFooter />
      <Footer />
    </div>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import Footer from './components/Footer';
import CityOverview from './views/trippo/CityOverview';
import Trip from './views/trippo/Trip';
import MyTrips from './views/trippo/MyTrips';
import Profile from './views/user/Profile';
import Planning from './views/trippo/Planning';
import TripPlan from './views/trippo/TripPlan';
import CityOverviewDetails from './components/CityOverviewDetails';
import './Search.css';
import './DestinationCard.css';
import './PopularDestination.css';
import './views/user/profile.css';
import './views/trippo/planning.css';
import'./home.css';
import './cityoverview.css';
import './MyTrips.css';

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
        <Route path="/city/:id" element={<CityOverviewDetails />} />
        <Route path="/trip" element={<Trip />}>
        <Route path="/trip/planning" element={<Planning />} />
        <Route path="/trip/mis-viajes" element={<MyTrips />} />
        {/* <Route path="/trip/mis-viajes" element={<MyTrips />} /> */}
        <Route path="/trip/mis-viajes" element={<MyTrips />} />
      
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

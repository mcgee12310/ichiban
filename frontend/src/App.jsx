import { Routes, Route } from "react-router-dom";
import './App.css'
import Auth from "./user/components/Auth";
import EventsSearch from './user/pages/searchPage/EventsSearch';
import HomePage from './user/pages/homePage/HomePage';
import PlaceDetailPage from "./user/pages/Detail";
import FavoritePage from "./user/pages/FavoritePage";
import About from "./user/pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/events/search" element={<EventsSearch/>}/>
      <Route path="/events/:eventId" element={<PlaceDetailPage/>}/>
      <Route path="/favorites" element={<FavoritePage/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
  )
}

export default App

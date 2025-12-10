import { Routes, Route } from "react-router-dom";
import './App.css'
import Auth from "./user/components/Auth";
import EventsSearch from './user/pages/searchPage/EventsSearch';
import HomePage from './user/pages/homePage/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/events/search" element={<EventsSearch/>}/>
    </Routes>
  )
}

export default App

import { Routes, Route } from "react-router-dom";
import './App.css'
import Auth from "./user/components/Auth";
import EventsSearch from './user/pages/searchPage/EventsSearch';
import PlaceDetailPage from "./user/pages/Detail";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/events/search" element={<EventsSearch/>}/>
      <Route path="/detail" element={<PlaceDetailPage/>}/>
    </Routes>
  )
}

export default App

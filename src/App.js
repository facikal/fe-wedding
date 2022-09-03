import MainLayouts from './components/MainLayouts'
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import EditCoupleInfo from './components/dashboard/EditCoupleInfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditEventImage from './components/dashboard/EditEventImage';
import EditEventInfo from './components/dashboard/EditEventInfo';
import EditNorek from './components/dashboard/EditNorek';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayouts />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/logadminpost' element={<Login />} />
        <Route path='/dashboard/editcoupleinfo/:id' element={<EditCoupleInfo />} />
        <Route path='/dashboard/editeventimage/:id' element={<EditEventImage />} />
        <Route path='/dashboard/editeventinfo/:id' element={<EditEventInfo/>} />
        <Route path='/dashboard/editnorek/:id' element={<EditNorek/>} />
      </Routes>
    </Router>
  );
}

export default App;

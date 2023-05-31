import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './login'
import Shift from './shift'
import User from './user'
import Manage from './manage'

function App() {

  return (
  < div className="app">
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/shift" element={<Shift/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/manage" element={<Manage/>} />
      </Routes>
    </Router>
  </ div>
  );

  }

export default App;

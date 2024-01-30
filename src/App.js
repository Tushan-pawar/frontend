/* imports */
import { Routes, Route } from 'react-router';
import './App.css';
// import { useEffect, useState } from 'react';
// import ViewPosts from './jsonplaceholder_components/view_posts';
// import ViewUsers from './jsonplaceholder_components/view_users';
// import InsertPosts from './jsonplaceholder_components/insert_posts';
// import CustomerDashboard from './components/dashboard';
// import NavbarUi from './components/navbar';
import AdministratorDashboard from './components/administrator/dashboard';
import ResidentDashboard from './components/resident/dashboard';
import GatekeeperDashboard from './components/gatekeeper/dashboard';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Logout from './components/auth/logout';

/* function (Hook) called App */
function App() {

  return (

    <div className='App'>

<Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/administrator/dashboard" element={<AdministratorDashboard />}></Route>
          <Route path="/resident/dashboard" element={<ResidentDashboard />}></Route>
          <Route path="/gatekeeper/dashboard" element={<GatekeeperDashboard />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/signup" element={<Signup />}></Route>
          <Route path="/auth/logout" element={<Logout />}></Route>
</Routes>



     {/* <ViewPosts /> */}
    {/* <ViewUsers /> */}
    {/* <ViewUsers />
   <InsertPosts /> */}
{/* <NavbarUi />
<CustomerDashboard /> */}
    </div>
  );
}

export default App;

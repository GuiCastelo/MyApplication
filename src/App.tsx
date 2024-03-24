import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './shared/components/Header/Header';
import Users from './pages/users/Users/Users';
import NewUser from './pages/users/NewUser/NewUser';
import MyAppFloaterNotification from './shared/components/MyAppFloaterNotification/MyAppFloaterNotification';
import EditUser from './pages/users/EditUser/EditUser';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path=''>
          <Route index element={<Users/>}></Route>
          <Route path='new' element={<NewUser/>}></Route>
          <Route path=':id' element={<EditUser/>}></Route>
        </Route>
      </Routes>
      <MyAppFloaterNotification/>
    </BrowserRouter>
  );
}

export default App;


import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './component/login';
import Signup from './component/signup';
import UserProfile from './component/Userprofile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <BrowserRouter>
        <ToastContainer/>
       <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/user-profile' element={<UserProfile/>}></Route>
       </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

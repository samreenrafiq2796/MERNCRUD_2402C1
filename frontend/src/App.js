import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './Compo/Create';
import GetData from './Compo/GetData';
import "bootstrap-icons/font/bootstrap-icons.css"
import Login from './Compo/Login';
import ForgetPassword from './Compo/ForgetPassword';
import ResetPassword from './Compo/ResetPassword';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route element={<Create/>} path="/cr"/>
        <Route element={<GetData/>} path="/show"/>
        <Route element={<Login/>} path=""/>
        <Route element={<ForgetPassword/>} path="/fp"/>
        <Route element={<ResetPassword/>} path="/reset/:token"/>




      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

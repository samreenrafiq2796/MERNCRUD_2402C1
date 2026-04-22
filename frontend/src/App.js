import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './Compo/Create';
import GetData from './Compo/GetData';
import "bootstrap-icons/font/bootstrap-icons.css"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route element={<Create/>} path="/cr"/>
        <Route element={<GetData/>} path=""/>

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

import {BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login';
import Header from './pages/Header';
import Home from './pages/Home';
import Usuario from './pages/Usuario';
import AgendarMesas from './pages/AgendarMesas';



function RoutesApp(){
 return(
    <BrowserRouter>
        <Header />
            <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/usuario" element={<Usuario/>}/>
                    <Route path="/agendarmesas" element={<AgendarMesas/>}/>
            </Routes>
    </BrowserRouter>
 )
}
export default RoutesApp;

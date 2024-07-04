import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../paginas/Login'
import Cadastro from '../paginas/Cadastro'
import Dashboard from '../paginas/Dashboard'
import RotaPrivada from './RotaPrivada'
import Perfil from '../paginas/Perfil'
import Clientes from '../paginas/Clientes'

const Rotas = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/cadastro' element={<Cadastro/>} />
        <Route path='/dashboard' element={<RotaPrivada><Dashboard/></RotaPrivada>} />
        <Route path='/perfil' element={<RotaPrivada><Perfil/></RotaPrivada>} />
        <Route path='/clientes' element={<RotaPrivada><Clientes/></RotaPrivada>} />
    </Routes>
  )
}

export default Rotas
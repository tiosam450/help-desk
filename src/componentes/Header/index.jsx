import React, { useContext, useState } from 'react';
import './header.css';
import { Context } from '../../contexApi/contextApi';
import fotoPerfil from '../../assets/foto_perfil.jpg';
import { Link } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { FaNoteSticky } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const { usuario, logout } = useContext(Context);
  const [iconeMenu, setIconeMenu] = useState(true)

  function menuMobile(){
    const menuMobile = document.querySelector('.menuMobile');
    const sideBar = document.querySelector('.sideBar');

    menuMobile.classList.add('sideBarMobile');
    sideBar.classList.toggle('sideBarMobile');

    setIconeMenu(!iconeMenu)
  }

  return (
    <>
    {iconeMenu ? <FaBars className='menuMobile' onClick={menuMobile}/> : <IoClose className='menuMobile' onClick={menuMobile} />}
    

    <div className='sideBar'>
      <div className="menu">

        <div className="avatar">
          <img src={usuario.avatarUrl == null ? fotoPerfil : usuario.avatarUrl} alt="Foto Perfil" />
        </div>

        <div className="menu">
          <hr />
          <Link to={'/dashboard'}><FaNoteSticky /> Chamados</Link>
          <Link to={'/clientes'}><HiUsers /> Clientes</Link>
          <Link to={'/perfil'}> <FaUserEdit /> Perfil</Link>
          <hr />
        </div>

      </div>

      <div className='menu'>
        <a className='logout' onClick={() => logout()}> <FaSignOutAlt />Logout</a>
      </div>
    </div>
    </>
  )
}

export default Header
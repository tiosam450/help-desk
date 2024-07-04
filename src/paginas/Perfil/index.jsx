import { useContext, useState } from 'react'
import Header from '../../componentes/Header'
import Titulo from "../../componentes/Titulo";
import avatar from '../../assets/foto_perfil.jpg'
import { FaUserEdit } from "react-icons/fa";
import { FiUpload } from 'react-icons/fi'
import { Context } from "../../contexApi/contextApi";
import './perfil.css';

export default function Perfil() {

  const { usuario } = useContext(Context);
  const [avatarUrl, setAvatarUrl] = useState(usuario && usuario.avatarUrl)
  const [imagem, setImagem] = useState(null)
  const [nome, setNome] = useState(usuario && usuario.nome)
  const [email, setEmail] = useState(usuario && usuario.email)

  function carregaImagem(e) {
    if (e.target.files[0]) {
      const imagemPerfil = e.target.files[0];

      setImagem(imagemPerfil)
      setAvatarUrl(URL.createObjectURL(imagemPerfil))
    } else {
      alert("Selecione uma imagem!")
      setAvatarUrl(null);
    }

  }

  return (
    <div className="bg">
      <div className="menuDash">
        <Header />
      </div>

      <div className="conteudo">
        <Titulo nome="Perfil">
          <FaUserEdit />
        </Titulo>


        <form className="containerFormPerfil">
          <label className="labelPerfil">
            <span className='labelIcone'>
              <FiUpload color="#FFF" />
            </span>

            <input onChange={carregaImagem} className='campoFoto' type="file" accept="image/*" /> <br />
            {avatarUrl === null ? (
              <div className="avatarPerfil">
                <img src={avatar} alt="Foto de perfil" /></div>
            ) : (
              <img className="avatarPerfil" src={avatarUrl} alt="Foto de perfil" />
            )}

          </label>

          <label className='labelPerfilin' htmlFor='nome'>Nome</label>
          <input name='nome' type="text" value={nome} placeholder="Seu nome" onChange={((e) => { setNome(e.target.value) })} />

          <label className='labelPerfilin' htmlFor='email' >Email</label>
          <input name='email' type="email" value={email} disabled={true} />

          <button className='btnSalvar' type="submit">Salvar</button>
        </form>

      </div>

    </div>
  )
}
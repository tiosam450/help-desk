import { useContext, useState } from 'react'
import Header from '../../componentes/Header'
import Titulo from "../../componentes/Titulo";
import avatar from '../../assets/foto_perfil.jpg'
import { FaUserEdit } from "react-icons/fa";
import { FiUpload } from 'react-icons/fi'
import { Context } from "../../contexApi/contextApi";
import './perfil.css';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db, storage } from '../../services/firebaseConnection';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Perfil() {

  const { usuario, setUsuario, salvaLocalStorage, } = useContext(Context);
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
//Atualiza Perfil
  async function atualizaPerfil (e){
    e.preventDefault();
    //Atualiza apenas o nome
    if(nome !== '' && imagem === null){
      const query = doc(db, 'usuarios', usuario.uid);
      await updateDoc(query, {
        nome: nome,
      }).then(()=>{
        let dados = {
          ...usuario,
          nome: nome,
        }

        setUsuario(dados)
        salvaLocalStorage(dados)
        toast.success("Atualizado com sucesso!")

      }).catch((erro)=>{
        console.log(erro)
        toast.error('Algo deu errado!')
      })

    }else if(nome !== '' && imagem !== null){
      upload()
    }
  }

//Faz upload da foto de perfil
async function upload(){
  const uidUsuario = usuario.uid;
  const fotoRef = ref(storage, `imagem/${uidUsuario}/${imagem.name}`)
  const upLoadFoto = uploadBytes(fotoRef, imagem).then((foto)=>{
    getDownloadURL(foto.ref).then((async (downLoadUrl)=>{
      let urlFoto = downLoadUrl;
      const  query = doc(db, 'usuarios', usuario.uid);
      await updateDoc(query, {
        avatarUrl: urlFoto,
        nome: nome,
      }).then(()=>{
        let dados = {
          ...usuario,
          nome: nome,
          avatarUrl: urlFoto,
        }

        setUsuario(dados);
        salvaLocalStorage(dados);
        toast.success('Atualizado com sucesso!')

      })
    }))
  })
}

function removeFoto(){
  let dados = {
    ...usuario,
    nome: nome,
    avatarUrl: null,
  }

  setUsuario(dados);
  setImagem(null)
  setAvatarUrl(null)

  salvaLocalStorage(dados);
  toast.success('Foto removida! Salve as alterações.')
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


        <form className="containerFormPerfil" onSubmit={atualizaPerfil}>
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

          <button onClick={removeFoto} className='btnRemoveFoto' type="button">Remover foto</button>
          
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
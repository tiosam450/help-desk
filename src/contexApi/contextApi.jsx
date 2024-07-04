import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Context = createContext({});

function ContextApi({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Função que verifica se sem usuário logado
  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem('dadosUsuario');

      if (storageUser) {
        setUsuario(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);

    }

    loadUser();
  }, []);

  //Função Logar
  async function logar(email, senha) {
    setCarregando(true);

    await signInWithEmailAndPassword(auth, email, senha).then(async (dados) => {
      let uid = dados.user.uid;

      const query = doc(db, 'usuarios', uid);
      const resultado = await getDoc(query);

      let dadosUsuario = {
        uid: uid,
        nome: resultado.data().nome,
        email: dados.user.email,
        avatarUrl: resultado.data().avatarUrl,
      }

      setUsuario(dadosUsuario);
      salvaLocalStorage(dadosUsuario);
      setCarregando(false);
      toast.success('Bem-vindo ao sistema!');
      navigate('/dashboard');
    }).catch((erro) => {
      console.log(erro);
      toast.error('Algo deu errado!');
      setCarregando(false);
    })
  }

  //Função logout
  async function logout(){
    signOut(auth);
    localStorage.removeItem('dadosUsuario');
    setUsuario(null);
  }

  //Função Cadastrar
  async function cadastrar(nome, email, senha) {
    setCarregando(true);

    await createUserWithEmailAndPassword(auth, email, senha).then(async (dados) => {
      let uid = dados.user.uid;

      await setDoc(doc(db, 'usuarios', uid), {
        nome: nome,
        avatarUrl: null

      }).then(() => {
        setCarregando(false);

        let dadosUsuario = {
          uid: dados.user.uid,
          nome: nome,
          email: email,
          avatarUrl: null,
        }

        setUsuario(dadosUsuario);
        salvaLocalStorage(dadosUsuario);
        toast.success('Bem-vindo ao sistema!');
        navigate('/dashboard');

      }).catch((erro) => {
        console.log(erro);
        toast.error('Algo deu errado!');
        setCarregando(false);
      })
    })

  }

  //Função salvar no localstorage
  function salvaLocalStorage(dados) {
    localStorage.setItem('dadosUsuario', JSON.stringify(dados))
  }

  return (
    <Context.Provider value={{
      logado: !!usuario,
      usuario,
      carregando,
      loading,
      logar,
      logout,
      cadastrar,
    }}>
      {children}
    </Context.Provider>
  )
}

export default ContextApi;
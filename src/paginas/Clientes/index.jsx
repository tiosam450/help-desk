import { useContext, useState } from "react";
import Header from "../../componentes/Header";
import Titulo from "../../componentes/Titulo";
import { HiUsers } from "react-icons/hi2";
import { Context } from "../../contexApi/contextApi";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Clientes() {
    const [loading, setLoading] = useState(false)
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const navigate = useNavigate()

    async function cadastraClientes(e) {
        e.preventDefault();
        setLoading(true)
        if (nomeEmpresa !== '' && cnpj !== '' && endereco !== '') {
           addDoc(collection(db, 'clientes'), {
            nome: nomeEmpresa,
            cpf_cnpj: cnpj,
            endereco: endereco,
           })
           .then(()=>{
            setLoading(false)
            setNomeEmpresa('');
            setCnpj('');
            setEndereco('');
            toast.success('Cadastrado com sucesso!')
        }).catch((erro)=>{
            console.log(erro)
            toast.error('Algo deu errado!')
        })
        } else {
            toast.warn('Preencha todos os campos!')
        }
    }
    function voltar(){
        navigate('/dashboard')
    }


    return (
        <div className="bg">
            <div className="menuDash">
                <Header />
            </div>
            <div className="conteudo">
                <Titulo nome="Clientes">
                    <HiUsers />
                </Titulo>
                <form className="containerFormPerfil" onSubmit={cadastraClientes}>
                    <label className='labelPerfilin' htmlFor='nome'>Nome / Empresa</label>
                    <input name='nome' type="text" value={nomeEmpresa} placeholder="Digite o nome do cliente" onChange={((e)=>{setNomeEmpresa(e.target.value)})} />

                    <label className='labelPerfilin' htmlFor='cnpj' >CPF/CNPJ</label>
                    <input name='cnpj' type="text" value={cnpj} placeholder="Digite um CNPJ ou CNPJ" onChange={((e)=>{setCnpj(e.target.value)})} />

                    <label className='labelPerfilin' htmlFor='endereco' >Endereço</label>
                    <input name='endereco' type="text" value={endereco} placeholder="Digite o endereço" onChange={((e)=>{setEndereco(e.target.value)})} />
                    <div className="botoes">
                        <button className='btnSalvar' onClick={voltar}>Voltar</button>
                        <button className='btnSalvar' type="submit">{loading ? "Carregando..." : "Salvar"}</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
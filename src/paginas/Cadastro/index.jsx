import { Link } from 'react-router-dom';
import '../../css/formularios.css';
import { useContext, useState } from 'react';
import logoHelpDesk from '../../assets/helpdesk.svg';
import {Context} from '../../contexApi/contextApi';

export default function Cadastrar() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { cadastrar, carregando } = useContext(Context);

    async function cadastro(e) {
        e.preventDefault();
        if (nome !== "" && email !== "" && senha !== "") {
            await cadastrar(nome, email, senha);
            setNome('');
            setEmail('');
            setSenha('');
        }else{
            alert('Preencha os dados corretamente');
        }
    }

    return (
        <>
            <div className="container containerC">
                <form className="formCadastro" onSubmit={cadastro}>
                    <img className='logoHelpdesk' src={logoHelpDesk} alt="" />
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" />
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" />
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha" />
                    <button type="submit" className='btnSubmit'>{carregando ? "Carregando..." : "Criar conta"}</button>
                    <p>Já cadastro? <Link to='/'>Faça login</Link></p>
                </form>
            </div>
        </>
    )
}
import { Link } from 'react-router-dom';
import '../../css/formularios.css';
import { useContext, useState } from 'react';
import logoHelpDesk from '../../assets/helpdesk.svg';
import {Context} from '../../contexApi/contextApi';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const {logar, carregando} = useContext(Context);

    function login(e){
        e.preventDefault();
        if(email!=="" && senha!==""){
            logar(email, senha);
        }
    }

    return (
        <>
            <div className="container containerC">
                <form className="formCadastro" onSubmit={login}>
                    <img className='logoHelpdesk' src={logoHelpDesk} alt="" />
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Insira seu email" />
                    <input type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} placeholder="Digite sua senha" />
                    <button type="submit" className='btnSubmit'>{carregando ? "Carregando..." : "Acessar"}</button>
                    <p>Ainda não tem cadastro? <Link to='/cadastro'>Crie uma conta</Link></p>
                </form>
            </div>
        </>
    )
}
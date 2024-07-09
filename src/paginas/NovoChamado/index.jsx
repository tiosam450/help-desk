import Titulo from "../../componentes/Titulo";
import Header from "../../componentes/Header";
import { BiPlusCircle } from "react-icons/bi";
import { useState } from "react";

export default function NovoChamado() {
    const [loading, setLloading] = useState(false)

    function novoChamado() {
        alert('Teste')
    }

    return (
        <div className="bg">
            <div className="menuDash">
                <Header />
            </div>

            <div className="conteudo">
                <Titulo nome="Novo Chamado">
                    <BiPlusCircle />
                </Titulo>

                <form className="containerFormPerfil" onSubmit={novoChamado}>
                    <label htmlFor="clientes">Clientes</label>
                    <select name="clientes">
                        <option key={1} value={1}>Samuel</option>
                        <option key={2} value={2}>Paty</option>
                        <option key={3} value={3}>Gustavo</option>
                    </select>

                    <label htmlFor="assunto">Assunto</label>
                    <select name="assunto">
                        <option value="Suporte">Suporte</option>
                        <option value="Visita Técnica">Visita Técnica</option>
                        <option value="Outros assuntos">Outros assuntos</option>

                    </select>

                    <label htmlFor="" name="status">Status</label>
                    <div>
                        <span>Aberto</span>
                        <input type="radio" name="status" value="Aberto" />
                        <span>Em andamento</span>
                        <input type="radio" name="status" value="Em andamento" />
                        <span>Concluído</span>
                        <input type="radio" name="status" value="Concluído" />
                    </div>

                    <label htmlFor="" name="descricao">Descrição</label>
                    <textarea name="descricao"/>

                    <button className='btnSalvar' type="submit">{loading ? "Carregando..." : "Salvar"}</button>
                </form>




            </div>

        </div>
    )
}
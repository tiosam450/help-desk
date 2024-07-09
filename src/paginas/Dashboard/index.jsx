import { useContext } from "react";
import { Context } from "../../contexApi/contextApi";
import Header from "../../componentes/Header";
import './dashboard.css';
import Titulo from "../../componentes/Titulo";
import { FaNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { TbEyeSearch } from "react-icons/tb";

export default function Dashboard() {

    return (
        <div className="bg">
            <div className="menuDash">
                <Header />
            </div>
            <div className="conteudo">
                <Titulo nome="Chamados">
                <FaNoteSticky />
                </Titulo>

                <Link to='/novoChamado'><button className="btnNovoChamado">+</button></Link>
                
                <table>
                    <thead>
                       <tr>
                        <th scope='col'>Código</th>
                        <th scope='col'>Cliente</th>
                        <th scope='col'>Assunto</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Data</th>
                        <th scope='col'>Ações</th>
                       </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label='Código'>01</td>
                            <td data-label='Cliente'>Pixel Web</td>
                            <td data-label='Assunto'>Novo chamado</td>
                            <td data-label='Status'> <span className=" status cinza">Aberto</span></td>
                            <td data-label='Data'>07/08/2024</td>
                            <td data-label='Ações' className="acoes">
                                <div>
                                <button className="acao amarelo"><FaEdit /></button>
                                <button className="acao azul"><TbEyeSearch /></button>
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td data-label='Código'>01</td>
                            <td data-label='Cliente'>Pixel Web</td>
                            <td data-label='Assunto'>Novo chamado</td>
                            <td data-label='Status'> <span className=" status cinza">Aberto</span></td>
                            <td data-label='Data'>07/08/2024</td>
                            <td data-label='Ações' className="acoes">
                                <div>
                                <button className="acao amarelo"><FaEdit /></button>
                                <button className="acao azul"><TbEyeSearch /></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>



        </div>
    )
}
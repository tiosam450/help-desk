import { useContext } from "react";
import { Context } from "../../contexApi/contextApi";
import Header from "../../componentes/Header";
import './dashboard.css';
import Titulo from "../../componentes/Titulo";
import { FaNoteSticky } from "react-icons/fa6";


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
            </div>
        </div>
    )
}
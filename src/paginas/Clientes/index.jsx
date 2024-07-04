import Header from "../../componentes/Header";
import Titulo from "../../componentes/Titulo";
import { HiUsers } from "react-icons/hi2";

export default function Clientes() {
    return (
        <div className="bg">
            <div className="menuDash">
                <Header />
            </div>
            <div className="conteudo">
                <Titulo nome="Clientes">
                    <HiUsers />
                </Titulo>
            </div>
        </div>
    )
}
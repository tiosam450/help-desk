import './modal.css'
import { IoClose } from "react-icons/io5";

export default function Modal({informacoes, fechaModal}) {
    return (
        <div className='containerModal'>
            <div className='modal'>
                <h2>Detalhes do chamado</h2>
                <hr/>
                <h3>Cliente: <span>{informacoes.cliente}</span></h3>
                <h3>Status: <span className={informacoes.status == 'Aberto' && "verde"}>{informacoes.status}</span></h3>
                <h3>Data: <span>{informacoes.data}</span></h3>
                <h3>Descrição:</h3>
                <p>{informacoes.descricao}</p>
                <span onClick={fechaModal}><IoClose/></span>
            </div>
        </div>
    )
}
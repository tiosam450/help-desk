import { useEffect, useState } from "react";
import Header from "../../componentes/Header";
import './dashboard.css';
import Titulo from "../../componentes/Titulo";
import { FaNoteSticky } from "react-icons/fa6";
import { Link} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbEyeSearch } from "react-icons/tb";
import { collection, deleteDoc, getDocs, limit, orderBy, query, startAfter, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { format } from "date-fns";
import Modal from "../../componentes/Modal";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [chamados, setchamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listaVazia, setListaVazia] = useState(false);
    const [loadingMais, setloadingMais] = useState(false);
    const [ultimoDoc, setUltimoDoc] = useState();
    const colecaoChamados = collection(db, 'chamados');
    const [showModal, setShowModal] = useState(false);
    const [infoModal, setInfoModal] = useState({})

// Carrega lista de chamados
    useEffect(() => {
        async function carregaChamados() {
            const consulta = query(colecaoChamados, orderBy('data', 'desc'), limit(7));
            const consultaChamados = await getDocs(consulta)
            setchamados([])
            atualizaEstado(consultaChamados);
            setLoading(false)
        }
        carregaChamados()
    }, [])

//Atualiza lista de chamados
    async function atualizaEstado(consultaChamados) {
        const listaVazia2 = consultaChamados.size == 0;
        if (!listaVazia2) {
            let lista = [];

            consultaChamados.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().id,
                    assunto: doc.data().assunto,
                    status: doc.data().status,
                    data: format(doc.data().data.toDate(), 'dd/MM/yyyy'),
                    descricao: doc.data().descricao,
                })
            })

            const lastDoc = consultaChamados.docs[consultaChamados.docs.length - 1]
            setchamados([...chamados, ...lista]);
            setUltimoDoc(lastDoc);
            setListaVazia(true)

        } else {
            setListaVazia(false);
        }
        setloadingMais(false);
    }

//Atualiza título e avisa quando o sistema busca resultados de chamados
    if (loading) {
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

                    <div className="nenhumChamado">
                        <span>Buscando Chamados...</span>
                    </div>
                </div>
            </div>
        )
    }

// Carrega mais resultados
    async function mais() {
        setloadingMais(true);
        const query2 = query(colecaoChamados, orderBy('data', 'desc'), startAfter(ultimoDoc), limit(7));
        const consultaChamados = await getDocs(query2);
        atualizaEstado(consultaChamados)
    }

// Abre modal
    function abreModal(item){
        setShowModal(!showModal)
        setInfoModal(item)
    }
    
// Deleta chamado
    async function deletaChamado(id){
        if(confirm('Quer realmente apagar este chamado?')){
            const docRef = doc(db, 'chamados', id)
        await deleteDoc(docRef).then(()=>{
            toast.success('Chamado deletado!')
            window.location.href='/dashboard'
        }).catch((erro)=>{
            console.log(erro);
            toast.error('Algo deu errado!')
        })
        }
    }

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

                {chamados.length == 0 ?
                    <div className="nenhumChamado">
                        <span>Nenhum chamado</span>
                    </div> :
                    <table>
                        <thead>
                            <tr>
                                <th scope='col'>Cliente</th>
                                <th scope='col'>Assunto</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Data</th>
                                <th scope='col'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chamados.map((item, index) => (
                                <tr key={index}>
                                    <td data-label='Cliente'>{item.cliente}</td>
                                    <td data-label='Assunto'>{item.assunto}</td>
                                    <td data-label='Status'> <span className={item.status == "Aberto" ? "status verde" : " status cinza"
                                    }>{item.status}</span></td>
                                    <td data-label='Data'>{item.data}</td>
                                    <td data-label='Ações' className="acoes">
                                        <div>
                                            <Link to={`/novochamado/${item.id}`} className="acao amarelo"><FaEdit /></Link>
                                            <Link className="acao azul" onClick={()=> abreModal(item)}><TbEyeSearch /></Link>
                                            <span className="acao vermelho" onClick={()=> deletaChamado(item.id)}><FaRegTrashAlt /></span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}

                {loadingMais && <div className="nenhumChamado">
                    <span>Carregando...</span>
                </div>}
                {listaVazia ? <div className="nenhumChamado">
                    <span className="btnMais" onClick={mais}>Mais resultados</span>
                </div> : '' }
            </div>
           {showModal &&  <Modal informacoes={infoModal} fechaModal={()=>setShowModal(!showModal)}/>}
        </div>
    )
}
import { useContext, useEffect, useState } from "react";
import { Context } from "../../contexApi/contextApi";
import Header from "../../componentes/Header";
import './dashboard.css';
import Titulo from "../../componentes/Titulo";
import { FaNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { TbEyeSearch } from "react-icons/tb";
import { collection, getDoc, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { format } from "date-fns";

export default function Dashboard() {
    const [chamados, setchamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listaVazia, setListaVazia] = useState(false);
    const [loadingMais, setloadingMais] = useState(false)
    const [ultimoDoc, setUltimoDoc] = useState()
    const colecaoChamados = collection(db, 'chamados');


    useEffect(() => {
        async function carregaChamados() {
            const consulta = query(colecaoChamados, orderBy('data', 'desc'), limit(1));
            const consultaChamados = await getDocs(consulta)
            setchamados([])
            atualizaEstado(consultaChamados);
            setLoading(false)
        }
        carregaChamados()
    }, [])

    async function atualizaEstado(consultaChamados) {
        const listaVazia = consultaChamados.size == 0;
        if (!listaVazia) {
            let lista = [];

            consultaChamados.forEach((doc) => {
                lista.push({
                    id: doc.uid,
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

        } else {
            setListaVazia(false);
        }
        setloadingMais(false);
    }

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

    async function mais(){
        setloadingMais(true);
        const query2 = query(colecaoChamados, orderBy('data', 'desc'), startAfter(ultimoDoc), limit(1));
        const consultaChamados = await getDocs(query2);
        atualizaEstado(consultaChamados)
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
                                <th scope='col'>Código</th>
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
                                    <td data-label='Código'></td>
                                    <td data-label='Cliente'>{item.cliente}</td>
                                    <td data-label='Assunto'>{item.assunto}</td>
                                    <td data-label='Status'> <span className={item.status=="Aberto" ? "status verde" : " status cinza"
                                    }>{item.status}</span></td>
                                    <td data-label='Data'>{item.data}</td>
                                    <td data-label='Ações' className="acoes">
                                        <div>
                                            <button className="acao amarelo"><FaEdit /></button>
                                            <button className="acao azul"><TbEyeSearch /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}

                {loadingMais && <div className="nenhumChamado">
                    <span>Carregando...</span>
                </div>}
                <div className="nenhumChamado">
                    <span className="btnMais" onClick={mais}>Mais resultados</span>
                </div>
            </div>
        </div>
    )
}
import Titulo from "../../componentes/Titulo";
import Header from "../../componentes/Header";
import { BiPlusCircle } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import "./novoChamado.css"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Context } from "../../contexApi/contextApi";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";

export default function NovoChamado() {
    const { usuario } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [loadingClientes, setLoadingClientes] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(0)
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Abertpo')
    const [descricao, setDescricao] = useState('');
    const listaDeclientesDb = collection(db, 'clientes');

    useEffect(() => {
        async function listaClientes() {
            await getDocs(listaDeclientesDb).then((lista) => {
                let listaClientes = []

                lista.forEach((doc) => {
                    listaClientes.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        endereco: doc.data().endereco,
                    })
                })
                setClientes(listaClientes)
                setLoadingClientes(true)


            }).catch((erro) => {
                console.log(erro);
                toast.error('Algo deu errado!')
            })
        }

        listaClientes()
    }, [])


    async function novoChamado(e) {
        e.preventDefault()
        await addDoc(collection(db, 'chamados'), {
            data: new Date(),
            idCliente: clientes[clienteSelecionado].id,
            cliente: clientes[clienteSelecionado].nome,
            assunto: assunto,
            descricao: descricao,
            status: status,
            idUsuario: usuario.uid,
        }).then(()=>{
            toast.success('Novo chamado inserido!');
            setDescricao('');
            setClienteSelecionado(0);
        }).catch(()=>{
            toast.error('Algo deu errado!');
            console.log(erro);
        })

    }

    function statusNovo(e) {
        setStatus(e.target.value);
    }

    function assuntoChamado(e) {
        setAssunto(e.target.value)
    }

    function selecionaCliente(e) {
        setClienteSelecionado(e.target.value)
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

                <form className="containerFormNovo" onSubmit={novoChamado}>
                    <label className="labelNovoChamado" htmlFor="clientes">Clientes</label>
                    {loadingClientes ? <select className="selectNovoChamado" name="clientes" value={clienteSelecionado} onChange={selecionaCliente}>
                        {clientes.map((item, index) => (
                            <option key={index} value={index}>{item.nome}</option>
                        ))}

                    </select> : <input type="text" disabled={true} value='Carregando...' />}

                    <label className="labelNovoChamado" htmlFor="assunto" >Assunto</label>
                    <select className="selectNovoChamado" name="assunto" value={assunto} onChange={assuntoChamado}>
                        <option value="Suporte">Suporte</option>
                        <option value="Visita Técnica">Visita Técnica</option>
                        <option value="Outros assuntos">Outros assuntos</option>
                    </select>

                    <label className="labelNovoChamado" htmlFor="" name="status">Status</label>
                    <div className="statusNovoChamado">
                        <div>
                            <input type="radio" name="status" value="Aberto" checked={status == "Aberto"} onChange={statusNovo} />
                            <span>Aberto</span>
                        </div>
                        <div>
                            <input type="radio" name="status" value="Em andamento" onChange={statusNovo} checked={status == "Em andamento"} />
                            <span>Em andamento</span>
                        </div>
                        <div>
                            <input type="radio" name="status" value="Concluído" onChange={statusNovo} checked={status == "Concluído"} />
                            <span>Concluído</span>
                        </div>
                    </div>

                    <label className="labelNovoChamado" htmlFor="" name="descricao">Descrição</label>
                    <textarea name="descricao" value={descricao} placeholder="Escreva detalhadamente o motivo do chamado." onChange={e => setDescricao(e.target.value)} />

                    <button className='btnSalvar' type="submit">{loading ? "Carregando..." : "Salvar"}</button>
                </form>




            </div>

        </div>
    )
}
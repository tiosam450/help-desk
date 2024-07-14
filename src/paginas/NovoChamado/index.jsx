import Titulo from "../../componentes/Titulo";
import Header from "../../componentes/Header";
import { BiPlusCircle } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import "./novoChamado.css"
import { addDoc, collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { Context } from "../../contexApi/contextApi";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function NovoChamado() {
    const { id } = useParams()
    const { usuario } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [loadingClientes, setLoadingClientes] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(0)
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [descricao, setDescricao] = useState('');
    const listaDeclientesDb = collection(db, 'clientes');
    const [loadingId, setLoadingId] = useState(false)
    const navigate = useNavigate()

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
                setClientes(listaClientes);
                setLoadingClientes(true);
                if (id) {
                    carregaId(listaClientes);
                    setLoadingId(true);
                }


            }).catch((erro) => {
                console.log(erro);
                toast.error('Algo deu errado!');
                setLoadingId(false);

            })
        }

        listaClientes();
    }, [id])

    async function carregaId(listaClientes) {
        const docRef = doc(db, 'chamados', id);
        await getDoc(docRef).then((item) => {
            setAssunto(item.data().assunto);
            setStatus(item.data().status)
            setDescricao(item.data().descricao)

            let index = listaClientes.findIndex(item2 => item2.id == item.data().idCliente)
            setClienteSelecionado(index)

        }).catch((erro) => {
            console.log(erro);
            toast.error('Algo deu errado!')
        })

    }

    async function novoChamado(e) {
        e.preventDefault()
        if(clientes !=='' && descricao !=='' && assunto !==''){
            if (loadingId) {
                const docRef = (doc(db, 'chamados', id))
                await updateDoc(docRef, {
                    data: new Date(),
                    idCliente: clientes[clienteSelecionado].id,
                    cliente: clientes[clienteSelecionado].nome,
                    assunto: assunto,
                    descricao: descricao,
                    status: status,
                    idUsuario: usuario.uid,
                }).then(() => {
                    toast.success('Chamado atualizado!');
    
                }).catch((erro) => {
                    toast.error('Algo deu errado!');
                    console.log(erro);
                })
                return;
            }
    
            await addDoc(collection(db, 'chamados'), {
                data: new Date(),
                idCliente: clientes[clienteSelecionado].id,
                cliente: clientes[clienteSelecionado].nome,
                assunto: assunto,
                descricao: descricao,
                status: status,
                idUsuario: usuario.uid,
            }).then(() => {
                toast.success('Novo chamado inserido!');
                setDescricao('');
                setClienteSelecionado(0);
            }).catch(() => {
                toast.error('Algo deu errado!');
                console.log(erro);
            })
        }else{
            alert('Preencha os dados corretamente')
        }

    }

    function voltar(){
        navigate('/dashboard')
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
                <Titulo nome={id ? "Editar Chamado" : "Novo Chamado"}>
                    <BiPlusCircle />
                </Titulo>

                <form className="containerFormNovo" onSubmit={novoChamado}>
                    <label className="labelNovoChamado" htmlFor="clientes">Clientes</label>
                    {loadingClientes ? <select className="selectNovoChamado" name="clientes" value={id ? clienteSelecionado : null} onChange={selecionaCliente}>
                        <option selected>Selecione</option>
                        {clientes.map((item, index) => (
                            <option key={index} value={index}>{item.nome}</option>
                        ))}

                    </select> : <input type="text" disabled={true} value='Carregando...' />}

                    <label className="labelNovoChamado" htmlFor="assunto" >Assunto</label>
                    <select className="selectNovoChamado" name="assunto" value={id ? assunto : null} onChange={assuntoChamado}>
                        <option selected>Selecione</option>
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
                    <div className="botoes">
                        <button className='btnSalvar' onClick={voltar}>Voltar</button>
                        <button className='btnSalvar' type="submit">{loading ? "Carregando..." : "Salvar"}</button>
                    </div>
                </form>




            </div>

        </div>
    )
}
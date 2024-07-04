import './titulo.css';

export default function Titulo ({children, nome}){
    return(
        <div className="contentTitulo">
            {children}
            <h2>{nome}</h2>
        </div>
    )
}
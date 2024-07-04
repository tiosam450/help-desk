import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {Context} from "../contexApi/contextApi";

export default function RotaPrivada({children}){
    const {logado, loading, } = useContext(Context);

    if(loading){
        return <div></div>
    }

    if(!logado){
        return <Navigate to='/'/>
    }

    return children
}
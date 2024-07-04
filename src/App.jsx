import { BrowserRouter } from 'react-router-dom'
import Rotas from './rotas'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ContextApi from './contexApi/contextApi';


export default function App() {

  return (
    <BrowserRouter>
      <ContextApi>
        <ToastContainer autoClose={2000} />
        <Rotas />
      </ContextApi>
    </BrowserRouter>
  )
}

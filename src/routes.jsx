import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Seleccion from './pages/Seleccion'
import Analizando from './pages/Analizando'
import DetalleProblema from './pages/DetalleProblema'
import Encuesta from './pages/Encuesta'
import Intersticial from './pages/Intersticial'
import Gracias from './pages/Gracias'
import Solucion from './pages/Solucion'
import Revisar from './pages/Revisar';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            { index: true, element: <Home /> },
            { path: 'seleccion', element: <Seleccion/> },
            { path: 'analizando', element: <Analizando/> },
            { path: 'problema/:id', element: <DetalleProblema/> },
            { path: 'problema/:id/encuesta', element: <Encuesta/> },
            { path: 'problema/:id/solucion', element: <Solucion /> },
            { path: 'intersticial', element: <Intersticial/> },
            { path: 'revisar', element: <Revisar /> },
            { path: 'gracias', element: <Gracias/> },
        ],
    },
])


export default router
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import './styles/theme.css'  //importa las variables globales
import './styles/fonts.css'   // fuentes
import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider >
    <RouterProvider router={router}/>
  </MantineProvider>
)

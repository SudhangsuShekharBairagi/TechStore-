import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GetDataProvider, GetImageByIdContext, GetProductByIdProvider} from './context/GetDataProvider.jsx'

createRoot(document.getElementById('root')).render(

    <GetDataProvider>
      <GetProductByIdProvider>
        <GetImageByIdContext>
    <App />
    </GetImageByIdContext>
     </GetProductByIdProvider>
    </GetDataProvider>
   
 
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GetDataProvider, GetImageByIdContext, GetProductByIdProvider} from './context/GetDataProvider.jsx'
import { Provider } from 'react-redux';
import { store } from './store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GetDataProvider>
      <GetProductByIdProvider>
        <GetImageByIdContext>
    <App />
    </GetImageByIdContext>
     </GetProductByIdProvider>
    </GetDataProvider>
    </Provider>
   
 
)

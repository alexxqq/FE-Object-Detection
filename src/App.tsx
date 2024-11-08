import AppRouter from './routers';
import GlobalStyles from './styles/GlobalStyles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
     <ToastContainer/>
      <GlobalStyles />
      <AppRouter/>
    </>
    
  );
}

export default App;

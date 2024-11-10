import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import History from '../pages/History';
import { Path } from '../common/constants/path.enum';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.REGISTER} element={<Register />} />
        <Route path={Path.HISTORY} element={<History />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

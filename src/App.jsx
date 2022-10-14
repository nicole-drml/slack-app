
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp';

const App = () => {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/signin' element={<SignIn /> } />
      <Route path='/signup' element={<SignUp /> } />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </Router>
  )
}
export default App;

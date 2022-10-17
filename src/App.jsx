
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp';

const App = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/signin' element={<SignIn /> } />
      <Route path='/signup' element={<SignUp /> } />
      <Route path='/dashboard' element={<Dashboard /> } />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  )
}
export default App;

import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Sign from './pages/Sign';
import './App.css';
import Jobs from './pages/Jobs';
import Science from './pages/Science';
import Arts from './pages/Arts';
import Commerce from './pages/Commerce';
import CareerDetails from './pages/CareerDetails';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <>
    <BrowserRouter>
      <nav>
          <div className='logo'>Marg.</div>
          <div className='divert'>
            <Link to='/'>Home</Link> 
            <Link to='/career'>Careers</Link> 
            <Link to='/blog'>Our Blog</Link> 
            <Link to='/job'>Jobs</Link> 
            <Link to='/contactus'>Contact Us</Link>
          </div>
          <div className='sign'><Link to='/sign'><span className='in'>Sign in</span></Link></div>
      </nav>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/career' element={<Careers/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/job' element={<Jobs/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/sign' element={<Sign/>}/>
        <Route path="/science" element={<Science/>} />
        <Route path="/arts" element={<Arts/>} />
        <Route path="/commerce" element={<Commerce/>} />
        <Route path="/career/:careerId" element={<CareerDetails/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

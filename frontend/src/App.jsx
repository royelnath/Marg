import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Help from './pages/Help';

function App() {
  return (
    <>
    <BrowserRouter>
      <nav>
          <Link to='/'>Home</Link> {" "}
          <Link to='/help'>Help_desk</Link>
      </nav>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/help' element={<Help/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

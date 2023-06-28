import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Products from './components/Products';
import ProductDets from './components/ProductDets';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Products />}></Route>
          <Route path='/product/:id' element={<ProductDets />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


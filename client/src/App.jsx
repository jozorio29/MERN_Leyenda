import PetDetails from './components/Form/PetDetails';
import PetsTable from './components/Table/PetsTable';
import PetForm from './components/Form/PetForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PetsTable/>} />
        <Route path='/mascotas' element={<PetsTable/>} />
        <Route path='/crear-mascota' element={<PetForm/>} />
        <Route path='/crear-mascota/:id' element={<PetForm/>} />
        <Route path='/detalle-mascota/:id' element={<PetDetails/>} />

      </Routes>
    </Router>
  );
}

export default App;
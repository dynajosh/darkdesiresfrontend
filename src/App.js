import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/home/Home';
import { ModalStateContext } from './context/modalContext';
import { NewItemContext } from './context/newItemContext';
import Footer from './components/footer';

function App() {
  const [createModalState, setCreateModalState] = useState(false);
  const [newItem, setNewItem] = useState(false)

  return (
    <ModalStateContext.Provider value={{createModalState, setCreateModalState}}>
      <NewItemContext.Provider value={{newItem, setNewItem}}>
        <Home />
        <Footer />
      </NewItemContext.Provider>
    </ModalStateContext.Provider>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home'
import CreateBook from '../src/pages/CreateBook'
import ShowBook from '../src/pages/ShowBook'
import EditBook from '../src/pages/EditBook'
import DeleteBook from '../src/pages/DeleteBook'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/header';
import Footer from './components/footer';
import './App.css'; // Import your custom styles
import LayoutComp from './components/layout';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <AppHeader />
        <LayoutComp />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Intro from './components/Home/Intro';
import Admin from './components/Admin/homeAdmin/Admin';
import BestCoffee from './components/Home/BestCoffee';
import DailyMenu from './components/Home/DailyMenu';
import Items from './components/Home/Items';
import ContactPage from './components/Home/Contact';

import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import './templatemo-style.css'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MenuPage from './components/Home/MenuPage';
function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (


    <Router>
      <div className="App">
        <div >
          <Switch>
            <Route exact path="/">
              <Header />
              <Intro />
              <div className="tm-main-section light-gray-bg">
                <div className="container" id="main">
                  <BestCoffee />
                  <Items />
                  <DailyMenu />
                </div>
              </div>
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/menu">
          <Header />
            <MenuPage />
          </Route>
          <Route path="/contact">
          <Header />
            <ContactPage />
          </Route>
          {/* <Route path="/contact">
          <Header />
            <ContactPage />
          </Route>
          
          <Route path="/today-special">
          <Header />
            <Intro />
            <TodayPage />
          </Route>
          <Route>
          <Header />
            <Page404 />
          </Route> */}
          </Switch>
        </div>
      </div>
      <Footer />

    </Router>


  );
}

export default App;

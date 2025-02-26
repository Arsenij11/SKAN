import React from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./components/header";
import Main from './components/Main'
import Footer from './components/Footer';

class App extends React.Component {
    render() {
        return (
           <Routes>
               <Route path="/" element={
                   <>
                       <Header />
                       <Main />
                       <Footer />
                   </>
               } />
           </Routes>
        )
    }
}

export default App;
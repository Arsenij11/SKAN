import React from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./components/header";
import Main from './components/Main'
import Footer from './components/Footer';
import Auth from './components/Auth'
import Search from './components/Search'
import Result from './components/Result'

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
               <Route path="/auth" element={
                   <>
                       <Header />
                       <Auth />
                       <Footer />
                   </>
               } />
               <Route path="/search" element={
                    <>
                        <Header />
                        <Search />
                        <Footer />
                    </>
               } />
           </Routes>
        )
    }
}

export default App;
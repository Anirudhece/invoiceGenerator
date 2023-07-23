import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import InvoiceForm from "./components/InvoiceForm";
import Bills from "./components/Bills";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

class App extends Component {
  render() {
    return (
    
      <div
        className="App d-flex flex-column 
      align-items-center justify-content-center w-100"
      >
        <Container>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Bills />}></Route>
            <Route path="/InvoiceForm" element={<InvoiceForm />}></Route>
          </Routes>
        </Container>
        <ToastContainer />
      </div>
    );
  }
}

export default App;

import './App.css';
import { Routes } from './Routes/Routes';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="App-container">
      <Navbar />
      <main className="main-content">
        <Routes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
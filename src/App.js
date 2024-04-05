import './App.css';
import ResponsiveDrawer from './Components/test'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Expenses from './Components/Expenses'
import Home from './Components/Home';
import DemoApp from './Components/Agenda'
import Notes from './Components/Notes';
function App() {
  return (
    <div className="App">
    <Router>
      <ResponsiveDrawer />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/Notes" element={<Notes />} />
        <Route path="/Expenses" element={<Expenses />} />
        <Route path="/Agenda" element={<DemoApp />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

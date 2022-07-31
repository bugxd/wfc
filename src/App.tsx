import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import CorePage from './pages/Core';
import HomePage from './pages/Home';
import TilesPage from './pages/Tiles';

function App() {

  return (
    <>
      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">WFC</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/core" className="nav-link">Core</Link>
              <Link to="/tiles" className="nav-link">Tiles</Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/core" element={<CorePage />} />
          <Route path="/tiles" element={<TilesPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

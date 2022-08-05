import { useReducer, createContext, Dispatch } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import AddTilePage from './pages/AddTile';
import CorePage from './pages/Core';
import HomePage from './pages/Home';
import TilePage from './pages/Tile';
import TilesPage from './pages/Tiles';
import { initialTilesState, TilesAction, tilesReducer, TilesState } from './store/tilesStore';

export const TilesContext = createContext<{state: TilesState, dispatch: Dispatch<TilesAction>}>({state: initialTilesState, dispatch: () => null});

function App() {
  const [state, dispatch] = useReducer(tilesReducer, initialTilesState);

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
              <Link to="/tiles/add" className="nav-link">Add Tile</Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      <TilesContext.Provider value={{state, dispatch}}>
        <Container>
          <Routes>
            <Route path="/core" element={<CorePage />} />
            <Route path="/tiles" element={<TilesPage />} />
            <Route path="/tiles/:id" element={<TilePage />} />
            <Route path="/tiles/add" element={<AddTilePage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Container>
      </TilesContext.Provider>
    </>
  );
}

export default App;

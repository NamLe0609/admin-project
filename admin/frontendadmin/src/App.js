import './App.css';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
      <Container>
      <Row>
        <Login></Login>
      </Row>
    </Container>
    </div>
  );
}

export default App;

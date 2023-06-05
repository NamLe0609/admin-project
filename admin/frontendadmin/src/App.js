import './App.css';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';


function App() {
  return (
      <Container className='vw-100 vh-100 justify-content-center'>
        <Login></Login>
      </Container>
  );
}

export default App;

import Form from './components/Form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Обов'язкові стилі для сповіщень
import './App.css'

function App() {
  return (
    <div>
      <Form />
      {/* Додаємо контейнер, щоб сповіщення з'являлися знизу праворуч */}
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default App
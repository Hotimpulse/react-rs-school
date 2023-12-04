import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import './App.css';
import ReactHookForm from './components/ReactHookForm';
import UncontrolledForm from './components/UncontrolledForm';
import Home from './components/Home';
import { Provider } from 'react-redux';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="home" />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/uncontrolled-form',
    element: <UncontrolledForm />,
  },
  {
    path: '/react-hook-form',
    element: <ReactHookForm />,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;

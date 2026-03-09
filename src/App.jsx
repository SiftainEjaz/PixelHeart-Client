import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import Profile from './components/Profile.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import appStore from './utils/appStore.js';
import Feed from "./components/Feed.jsx";
import Connections from "./components/Connections.jsx";
import Requests from "./components/Requests.jsx";
import EditPassword from "./components/EditPassword.jsx";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/password" element={<EditPassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App

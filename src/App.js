import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./Home/Home";
import Login from "./login/Login";
import Signin from "./signin/Signin";
import Main from "./main/Main";
import Chat from "./main/Chat/Chat";
import Call from "./main/Call/Call";
import VideoCall from "./main/VideoCall/VideoCall";
import Profile from "./Profile/Profile"
import MyAccount from "./MyAccount/MyAccount"
import {ContextProvider} from "./socketContext"
function App() {  
  return (
    <ContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/main/chat/:user_id" element={<Main />} />
        <Route path="/main/chat/:user_id/u/:id" element={<Chat />} />
        <Route path="/main/chat/:user_id/profile" element={<Profile /> } />
        <Route path="/main/chat/:user_id/my-account" element={<MyAccount />} />
        <Route path="/main/chat/:user_id/u/:id/call" element={<Call />} />
      </Routes>
    </Router>
    </ContextProvider>
  );
}

export default App;

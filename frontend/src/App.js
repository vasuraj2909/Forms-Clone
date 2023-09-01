import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, FormPage, UserView } from "./components";
import UserProvider from "./context/user/UserProvider";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form/:id/edit" element={<FormPage />} />
            <Route path="/form/:id/viewform" element={<UserView />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;

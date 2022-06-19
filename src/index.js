import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, HomePage, LoginPage ,ArchivePage,SignupPage} from "./routes";
import { ToastProvider } from "./context/toast-context";
import { UserProvider } from "./context/user-context";
import { NoteProvider } from "./context/note-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <UserProvider>
          <NoteProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/" element={<App />}>
                <Route path="home" element={<HomePage />} />
                <Route path="archive" element={<ArchivePage />}/>
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />}/>
            </Routes>
          </NoteProvider>
        </UserProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

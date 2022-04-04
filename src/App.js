import {Routes, Route} from "react-router-dom";
import {LandingPage} from "./routes";
import {HomePage} from "./routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/home" element={<HomePage />}/>
    </Routes>
  );
}

export default App;

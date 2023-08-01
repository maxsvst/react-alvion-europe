import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./App.module.css";
import Header from "./components/layout/Header/Header";
import Data from "./components/screens/Data";
import Projects from "./components/screens/Projects/Projects";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<Data />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

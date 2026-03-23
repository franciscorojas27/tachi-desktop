import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ManhwaDetails from "./pages/ManhwaDetails";
import ManhwaView from "./pages/ManhwaView";

function App() {
  return (
    <div id="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="*" element={<Home />} />
            <Route path="/chapter/manhwa/:id" element={<ManhwaView />} />
            <Route path="/details/manhwa/:id" element={<ManhwaDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routerApp } from "./Routers/Router";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {routerApp.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
};

export default App;

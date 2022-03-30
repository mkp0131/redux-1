import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Detail from 'routes/Detail';
import Home from 'routes/Home';

function App() {
  useEffect(() => {
    fetch('https://picsum.photos/1920/1080').then((res) => {
      if (res.ok) {
        document.body.style.backgroundImage = `url(${res.url})`;
      }
    });
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

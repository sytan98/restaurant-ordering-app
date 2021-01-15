import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [ currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time'). then(res => res.json()).then(data => {
      
      setTimeout(()=>{setCurrentTime(data.time);}, 5000);
    });
  })
  return (
    <div className="App">
      <p>The current time is {currentTime}</p>
    </div>
  );
}

export default App;

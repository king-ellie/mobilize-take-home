import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


function HooksComponent() {
  const [state, setState] = useState("starting state");

  useEffect(() => {
    // function that executes upon component mounting
  });

  return (
    <h2>This is your hooks component!</h2>
  )
}

export default HooksComponent

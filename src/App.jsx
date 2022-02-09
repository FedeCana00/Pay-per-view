import React from "react";
import Home from "./components/home/Home";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <p>{!data ? "Loading..." : data}</p>
      <Home />
    </div>
  );
}

export default App;

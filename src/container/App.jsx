import { useState } from "react";

import Login from "../pages/Login";
import VisApp from "../pages/VisApp";

import { useLocalStorage } from "../hooks/useLocalStorage";
import SpinnerLoader from "../components/SpinnerLoader";

function App() {
  const dataInitApp = {
    user: {},
    message: null,
    token: null,
    isLogged: false,
  };
  const [stateApp, setStateApp] = useLocalStorage("_data", dataInitApp);

  const [loading, setLoading] = useState(false);

  return (
    <>
      <SpinnerLoader loading={loading} />
      {stateApp.isLogged ? (
        <VisApp
          stateApp={stateApp}
          setLoading={setLoading}
          setStateApp={setStateApp}
        />
      ) : (
        <Login setStateApp={setStateApp} setLoading={setLoading} />
      )}
    </>
  );
}

export default App;

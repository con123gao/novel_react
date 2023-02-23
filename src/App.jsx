import React from "react";
import { HashRouter } from 'react-router-dom'
import RouterView from "./router";
// import { keepAliveProvider } from 'keepalive-react-component'
import { KeepAliveProvider } from "keepalive-react-component/lib";

function App() {
  return <HashRouter>
    <KeepAliveProvider>
      <RouterView />
    </KeepAliveProvider>
  </HashRouter>
}
export default App;

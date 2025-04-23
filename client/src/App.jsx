import React from "react";
import Routing from "./components/Routing";
import { AuthProvider } from "./components/AuthContext";
import firebaseApp from "./components/firebase";


const App = ()=> {
 
  return (
    <>
    
    <AuthProvider firebaseApp={firebaseApp}>
      {/* All components within AuthProvider will have access to the context */}
      <Routing />
    </AuthProvider>
    </>
  )
}

export default App;

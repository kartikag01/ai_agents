import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
// import Sidebar from "./Components/Sidebar";
import AppRoutes from "./router/routes";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header />
        {/* <div className="flex flex-1">
          <Sidebar /> */}
          <main className="flex-1 p-6 overflow-auto">
            <AppRoutes />
          </main>
        </div>
     
    </BrowserRouter>
  );
}

export default App;

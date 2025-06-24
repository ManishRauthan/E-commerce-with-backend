import "./App.css";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import ProductList from "./Component/ProductList";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import AppStore from "./Utils/AppStore";

function App() {
  return (
    <>
      <Provider store={AppStore}>
        <Header />
        <Outlet />
        <Footer />
      </Provider>
    </>
  );
}

export default App;

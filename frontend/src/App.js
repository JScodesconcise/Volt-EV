import MainPage from "./features/MainPage.jsx";
import "./variables.css";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext.jsx";

function App() {
	return <MainPage />;
}

export default App;

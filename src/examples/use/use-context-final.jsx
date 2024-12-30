import { createContext, use } from "react";
const ThemeContext = createContext(null);

const Header = () => {
	// use вместо useContext
	const theme = use(ThemeContext);

	return (
		<header className={`header ${theme}`}>
			<h1 className="fs-1">Header</h1>
		</header>
	);
};

const App = () => {
	return (
		<>
			<h2 className="fs-3 mb-5">
				use() <small className="fw-lighter">вместо useContext</small>
			</h2>
			{/* ThemeContext вместо ThemeContext.Provider */}
			<ThemeContext value="dark">
				<Header />
			</ThemeContext>
		</>
	);
};

export default App;

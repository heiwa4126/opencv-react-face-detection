import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import App1 from "./App1";
import App2 from "./App2";

function App() {
	// NOTE: 最新のやつを / と /index.html に割り当てておくこと
	return (
		<>
			<Routes>
				<Route path="/" element={<App2 />} />
				<Route path="/index.html" element={<App2 />} /> {/* for AWS S3 HTTPS */}
				<Route path="/2" element={<App2 />} />
				<Route path="/1" element={<App1 />} />
			</Routes>
			<AppSelector />
		</>
	);
}

function AppSelector() {
	return (
		<>
			<h2>App Selector</h2>
			<ul>
				<li>
					<Link to="/2">v2. 作業中</Link>
				</li>
				<li>
					<Link to="/1">v1. ほぼオリジナル</Link>
				</li>
			</ul>
		</>
	);
}

export default App;

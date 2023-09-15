import { getMonth } from "./util.js";
import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Month from "./components/Month.jsx";
import GlobalContext from "./context/GlobalContext.js";
import EventModal from "./components/EventModal.jsx";

function App() {
	const [currentMonth, setCurrentMonth] = useState(getMonth());
	const { monthIndex, showEventModal } = useContext(GlobalContext);
	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex));
	}, [monthIndex]);
	return (
		<>
			{showEventModal && <EventModal />}
			<div className="h-screen flex flex-col">
				<Header />
				<div className="flex flex-1 ">
					<Sidebar />
					<Month month={currentMonth} />
				</div>
			</div>
		</>
	);
}

export default App;

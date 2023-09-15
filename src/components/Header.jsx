import React, { useContext } from "react";
import dayjs from "dayjs";
import logo from "../assets/calLogo.svg";
import GlobalContext from "../context/GlobalContext";
const Header = () => {
	const { monthIndex, setMonthIndex } = useContext(GlobalContext);
	function handlePrevMonth() {
		setMonthIndex(monthIndex - 1);
	}
	function handleNextMonth() {
		setMonthIndex(monthIndex + 1);
	}
	function handleRightNow() {
		setMonthIndex(
			monthIndex === dayjs().month()
				? monthIndex + Math.random()
				: dayjs().month()
		);
	}
	return (
		<header className="px-4 py-2 flex items-center">
			<img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
			<h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>
			<button
				className="border rounded py-2 px-4 mr-5"
				onClick={handleRightNow}
			>
				Today
			</button>
			<button
				className="border rounded py-2 px-4 mr-5"
				onClick={handlePrevMonth}
			>
				<span>
					<ion-icon name="chevron-back"></ion-icon>
				</span>
			</button>
			<button
				className="border rounded py-2 px-4 mr-5"
				onClick={handleNextMonth}
			>
				<span>
					<ion-icon name="chevron-forward"></ion-icon>
				</span>
			</button>
			<h2 className="ml-4 text-xl text-gray font-bold">
				{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
			</h2>
		</header>
	);
};

export default Header;

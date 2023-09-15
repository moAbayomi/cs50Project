import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { getMonth } from "../util";
import GlobalContext from "../context/GlobalContext";
const SmallCalendar = () => {
	const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
	const [currentMonth, setCurrentMonth] = useState(getMonth());
	const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
		useContext(GlobalContext);
	useEffect(() => {
		setCurrentMonth(getMonth(currentMonthIdx));
	}, [currentMonthIdx]);

	useEffect(() => {
		setCurrentMonthIdx(monthIndex);
	}, [monthIndex]);

	function handlePrevMonth() {
		setCurrentMonthIdx(currentMonthIdx - 1);
	}
	function handleNextMonth() {
		setCurrentMonthIdx(currentMonthIdx + 1);
	}

	function getDayClass(day) {
		const format = "DD-MM-YY";
		const nowDay = dayjs().format(format);
		const currDay = day.format(format);
		const slcDay = daySelected && daySelected.format(format);
		if (nowDay === currDay) {
			return "bg-blue-500 rounded-full flex justify-center items-center text-white";
		} else if (currDay === slcDay) {
			return "bg-blue-100 rounded-full flex justify-center items-center text-white";
		} else return "";
	}
	return (
		<div className="mt-9 ">
			<div className="flex justify-between items-center">
				<header className="flex justify-between">
					<p className="text-gray-500 font-bold">
						{dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
							"MMMM YYYY"
						)}
					</p>
				</header>
				<div className="flex gap-4 justify-between items-center">
					<button
						onClick={handlePrevMonth}
						className="bg-gray-50 hover:bg-gray-100 shadow-sm p-3 hover:shadow-lg w-5 h-5 rounded-full flex justify-center items-center"
					>
						<span className="cursor-pointer p-1 text-gray-600 mx-2">
							<ion-icon name="chevron-back-outline"></ion-icon>
						</span>
					</button>
					<button
						onClick={handleNextMonth}
						className="bg-gray-50 hover:bg-gray-100 p-3 shadow-sm hover:shadow-lg w-5 h-5 rounded-full flex justify-center items-center"
					>
						<span className="cursor-pointer p-1 text-gray-600 mx-2">
							<ion-icon name="chevron-forward-outline"></ion-icon>
						</span>
					</button>
				</div>
			</div>
			<div className="grid grid-cols-7 grid-rows-6">
				{currentMonth[0].map((day, i) => {
					return (
						<span key={i} className="text-sm py-1 text-center">
							{day.format("dd").charAt(0)}
						</span>
					);
				})}
				{currentMonth.map((row, i) => {
					return (
						<React.Fragment key={i}>
							{row.map((day, idx) => {
								return (
									<button
										key={idx}
										className={`py-1 w-full ${getDayClass(day)}`}
										onClick={() => {
											setSmallCalendarMonth(currentMonthIdx);
											setDaySelected(day);
										}}
									>
										<span className="text-sm">{day.format("D")}</span>
									</button>
								);
							})}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default SmallCalendar;

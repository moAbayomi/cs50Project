import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

const Day = ({ day, rowIdx }) => {
	const [dayEvents, setDayEvents] = useState([]);

	const {
		setShowEventModal,
		setDaySelected,
		filteredEvents,
		setSelectedEvent,
	} = useContext(GlobalContext);

	useEffect(() => {
		const events = filteredEvents.filter(
			(event) => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
		);
		setDayEvents(events);
	}, [filteredEvents, day]);
	function getCurrentDay() {
		return day.format("DD-MM-YY") == dayjs().format("DD-MM-YY")
			? "bg-blue-600 text-white rounded-full w-7"
			: "";
	}

	return (
		<div className="border broder-gray-200 flex flex-col">
			<header className="flex flex-col items-center">
				{rowIdx === 0 && (
					<p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
				)}

				<p className={`text-sm p-1 m-1 text-center ${getCurrentDay()}`}>
					{day.format("DD")}
				</p>
			</header>
			<div
				className="flex-1 cursor-pointer"
				onClick={() => {
					setDaySelected(day);
					setShowEventModal(true);
				}}
			>
				{dayEvents.map((event, idx) => {
					return (
						<div
							onClick={() => setSelectedEvent(event)}
							key={idx}
							className={`bg-${event.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
						>
							{event.title}
						</div>
					);
				})}
			</div>{" "}
		</div>
	);
};

export default Day;

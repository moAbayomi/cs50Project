import React, { useState, useEffect, useReducer, useMemo } from "react";
import dayjs from "dayjs";
import GlobalContext from "./GlobalContext";

function savedEventsReducer(state, { type, payload }) {
	switch (type) {
		case "push":
			return [...state, payload];
		case "update":
			return state.map((event) => (event.id === payload.id ? payload : event));
		case "delete":
			return state.filter((event) => event.id !== payload.id);
		default:
			throw new Error();
	}
}

function initEvents() {
	const storageEvents = localStorage.getItem("savedEvents");
	const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
	return parsedEvents;
}

const ContextWrapper = ({ children }) => {
	const [monthIndex, setMonthIndex] = useState(dayjs().month());
	const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
	const [daySelected, setDaySelected] = useState(null);
	const [showEventModal, setShowEventModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [labels, setLabels] = useState([]);
	const [savedEvents, dispatchCallEvent] = useReducer(
		savedEventsReducer,
		[],
		initEvents
	);

	const filteredEvents = useMemo(() => {
		return savedEvents.filter((evt) =>
			labels
				.filter((lbl) => lbl.checked)
				.map((lbl) => lbl.label)
				.includes(evt.label)
		);
	}, [savedEvents, labels]);

	useEffect(() => {
		if (smallCalendarMonth !== null) {
			setMonthIndex(smallCalendarMonth);
		}
	}, [smallCalendarMonth]);

	useEffect(() => {
		setLabels((prevLabels) => {
			return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
				const currentLabel = prevLabels.find((lbl) => lbl.label === label);
				return {
					label,
					checked: currentLabel ? currentLabel.checked : true,
				};
			});
		});
	}, [savedEvents]);

	useEffect(() => {
		if (!showEventModal) {
			setSelectedEvent();
		}
	}, [showEventModal]);

	useEffect(() => {
		localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
	}, [savedEvents]);

	function updateLabel(label) {
		setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
	}

	return (
		<GlobalContext.Provider
			value={{
				monthIndex,
				setMonthIndex,
				smallCalendarMonth,
				setSmallCalendarMonth,
				daySelected,
				setDaySelected,
				showEventModal,
				setShowEventModal,
				dispatchCallEvent,
				selectedEvent,
				setSelectedEvent,
				savedEvents,
				labels,
				setLabels,
				updateLabel,
				filteredEvents,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default ContextWrapper;

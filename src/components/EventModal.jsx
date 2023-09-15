import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
	const { setShowEventModal, daySelected, dispatchCallEvent, selectedEvent } =
		useContext(GlobalContext);

	const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
	const [description, setDescription] = useState(
		selectedEvent ? selectedEvent.description : ""
	);
	const [selectedLabel, setSelectedLabel] = useState(
		selectedEvent
			? labelClasses.find((label) => label === selectedEvent.label)
			: labelClasses[0]
	);

	function handleSubmit(e) {
		e.preventDefault();
		const calendarEvent = {
			title,
			description,
			label: selectedLabel,
			day: daySelected.valueOf(),
			id: selectedEvent ? selectedEvent.id : Date.now(),
		};
		if (selectedEvent) {
			dispatchCallEvent({ type: "update", payload: calendarEvent });
		} else {
			dispatchCallEvent({ type: "push", payload: calendarEvent });
		}
		setShowEventModal(false);
	}

	console.log(labelClasses);

	return (
		<div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
			<form action="" className="bg-white rounded-lg shadow-2xl w-1/4">
				<header className="bg-gray-100 px-4 flex justify-between items-center">
					<span className="text-gray-400">_</span>
					{selectedEvent && (
						<span
							onClick={() => {
								dispatchCallEvent({ type: "delete", payload: selectedEvent });
								setShowEventModal(false);
							}}
							className="cursor-pointer bg-gray-500"
						>
							<ion-icon name="trash"></ion-icon>
						</span>
					)}
					<button
						onClick={() => {
							setShowEventModal(false);
						}}
					>
						<span className="text-gray-400">
							<ion-icon name="close"></ion-icon>
						</span>
					</button>
				</header>

				<div className="p-3">
					<div className="grid grid-cols-1/5 items-end gap-y-7">
						<div></div>
						<input
							type="text"
							name="title"
							placeholder="add title"
							required
							className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
						<span>
							<ion-icon name="calendar-clear"></ion-icon>
						</span>
						<p className="text-left">
							{daySelected === null
								? dayjs().format("dddd, MMMM, DD")
								: daySelected.format("dddd, MMMM, DD")}
						</p>
						<span>
							<ion-icon name="newspaper"></ion-icon>
						</span>
						<input
							type="text"
							name="title"
							placeholder="add description"
							required
							className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
						<span>
							<ion-icon name="bookmarks"></ion-icon>
						</span>

						<div className="flex gap-x-2">
							{labelClasses.map((labelClass, i) => {
								console.log(`bg-${labelClass}-500`);
								return (
									<span
										onClick={() => {
											setSelectedLabel(labelClass);
										}}
										key={i}
										className={`bg-${labelClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer `}
									>
										{selectedLabel === labelClass && (
											<ion-icon name="checkmark"></ion-icon>
										)}
									</span>
								);
							})}
						</div>
					</div>
				</div>
				<footer className="flex justify-end w-100 border-t p-3 mt-5">
					<button
						type="submit"
						onClick={handleSubmit}
						className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
					>
						Save
					</button>
				</footer>
			</form>
		</div>
	);
};

export default EventModal;

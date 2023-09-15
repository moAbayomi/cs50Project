import React from "react";
import CreateEventbuton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
const Sidebar = () => {
	return (
		<aside className="hidden md:hidden lg:block border p-5 w-64">
			<CreateEventbuton />
			<SmallCalendar />
			<Labels />
		</aside>
	);
};

export default Sidebar;

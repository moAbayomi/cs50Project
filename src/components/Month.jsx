import React from "react";
import Day from "./Day";

const Month = ({ month }) => {
	return (
		<div className="flex-1 grid grid-cols-7 grid-rows-">
			{month.map((row, i) => {
				return (
					<React.Fragment key={i}>
						{row.map((day, idx) => {
							return <Day day={day} key={idx} rowIdx={i} />;
						})}
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default Month;

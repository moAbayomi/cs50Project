import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const Labels = () => {
	const { labels, updateLabel } = useContext(GlobalContext);
	return (
		<React.Fragment>
			<p className="text-gray-500 font-bold mt-10">label</p>
			{labels.map(({ label: lbl, checked }, i) => {
				<label key={i} className="items-center mt-3 block">
					<input
						type="checkbox"
						checked={checked}
						onChange={() => {
							updateLabel({ label: lbl, checked: !checked });
						}}
						className={`form-checkbox h-5 w-5 text-${lbl}.color-300 rounded focus:ring-0 cursor-pointer`}
						name=""
						id=""
					/>
					<span className="ml-2 text-gray-700 capitalize">{lbl}</span>
				</label>;
			})}
		</React.Fragment>
	);
};

export default Labels;

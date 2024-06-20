export const SelectGradeBox = (props) => {
/*
    console.log("defaultValue : " + props.defaultValue);

    for (let x in props.options) {	
        console.log("Data : " + props.options[x].code);

        if( props.defaultValue === props.options[x].code)
            console.log("Data2 : " + props.options[x].code);

    };
*/
	return (
		<select onChange={props.handle} className="form-control" >
			{props.options.map((option) => (
				<option
                    key={option.code}
					value={option.code}
					defaultValue={props.defaultValue === option.code}
				>
					{option.grade}
				</option>
			))}
		</select>
	);
};

export const SelectWorkBox = (props) => {
	return (
		<select onChange={props.handle} className="form-control">
			{props.options.map((option) => (
				<option
                    key={option.workCode}
					value={option.workCode}
					defaultValue={props.defaultValue === option.workCode}
				>
					{option.work}
				</option>
			))}
		</select>
	);
};
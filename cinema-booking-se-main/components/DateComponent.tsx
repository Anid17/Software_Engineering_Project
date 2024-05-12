import React from 'react'
import Date from './Date';

interface Props {
	date: any;
	onClick: any;
	className: string;
}

const DateComponent: React.FC<Props> = ({date,onClick,className}) => {
	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'short' });
	const dayname = date.toLocaleString('default', { weekday: 'short' });

	return (
		<Date className={className} onClick={() => onClick(date)} day={day} month={month} dayname={dayname} />
	);
}

export default DateComponent
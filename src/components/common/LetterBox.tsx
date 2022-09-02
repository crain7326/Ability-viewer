import React from 'react'

export interface LetterBoxProps {
	characters: string;	
}

const LetterBox = ({characters}: LetterBoxProps) => {
	return (
		<div>{characters} 자</div>
	)
}

export default LetterBox
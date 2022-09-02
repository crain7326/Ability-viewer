import React from 'react'

export interface LetterBoxProps {
	characters: number;	
}

const LetterBox = ({characters}: LetterBoxProps) => {
	return (
		<div>공백포함 {characters} 자</div>
	)
}

export default LetterBox
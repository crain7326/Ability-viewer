import React from 'react'

 interface NotificationProps  {
	message: string 
}	

const Notification  = ({message} : NotificationProps) => {
	return (
		<>
			<p>{message}</p>
		</>
	)
}

export default Notification
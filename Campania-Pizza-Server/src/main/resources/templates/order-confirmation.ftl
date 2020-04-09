<html>

<head>
	<title>Campania Pizza Order Confirmation Email</title>
</head>

<body>
	<span>
		Thank you for your order. :)<br>
		Your order will be ready for pickup after 30 minutes.<br>
		Please say your last name and phone number to the cashier to pickup your order.<br><br>
	</span>
	<span> 
		Pickup Location:<br>
	</span>
	<#if pickupLocation=='Midtown'>
		<span>
			Campania Pizza, Midtown<br> 
			31 W 46th St<br> 
			New York, NY 10036<br><br>
		</span> 
	</#if> 
	<#if pickupLocation=='Chelsea'> 
		<span>
			Campania Pizza, Chelsea<br> 
			601 6th Ave<br> 
			New York, NY 10011<br><br>
		</span> 
	</#if> 
	<#if pickupLocation=='East Village'> 
		<span> 
			Campania Pizza, East Village<br> 
			32 St Marks Pl<br> 
			New York, NY 10003<br><br>
		</span> 
	</#if>
	<span> 
		First Name: ${firstName}<br> 
		Last Name: ${lastName}<br> 
		Phone Number: ${phoneNumber}<br> 
		Email: ${email}
	</span>
</body>
</html>
<html>

<head>
	<title>Campania Pizza Order Confirmation Email</title>
</head>


<body>
	
		<div>Checkout</div>
		<div>Pickup Location</div>
		<div>
			
				<#if pickupLocation == 'Midtown'> 
					<span> 
						Campania Pizza, Midtown<br> 
						31 W 46th St<br> 
						New York, NY 10036
					</span> 
				</#if>
				<#if pickupLocation == 'Chelsea'> 
					<span> 
						Campania Pizza, Chelsea<br> 
						601 6th Ave<br> 
						New York, NY 10011
					</span> 
				</#if>
				<#if pickupLocation == 'EastVillage'> 
					<span> 
						Campania Pizza, East Village<br> 
						32 St Marks Pl<br> 
						New York, NY 10003
					</span> 
				</#if>
			
		</div>
	
</body>
</html>
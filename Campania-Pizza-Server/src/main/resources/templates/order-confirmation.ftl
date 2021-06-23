<html>

<head>
	<title>Campania Pizza Order Confirmation Email</title>
</head>

<body>

	<span>
		Thank you for your order. :)<br>
		Here is your summary.<br><br>
	</span>

	<span class="row">
  		<span style="float: left; width: 33.33%;">
  			Contact Info:<br> 
			${firstName}&nbsp;${lastName}<br> 
			${phoneNumber}<br> 
			${email}<br><br>
  		</span>
  		<#if pickupLocation=='Midtown'>
			<span style="float: left; width: 33.33%;">
				Pickup Location:<br>
				Campania Pizza, Midtown<br> 
				31 W 46th St<br> 
				New York, NY 10036<br><br>
			</span> 
		</#if> 
		<#if pickupLocation=='Chelsea'> 
			<span style="float: left; width: 33.33%;">
				Pickup Location:<br>
				Campania Pizza, Chelsea<br> 
				601 6th Ave<br> 
				New York, NY 10011<br><br>
			</span> 
		</#if> 
		<#if pickupLocation=='East Village'> 
			<span style="float: left; width: 33.33%;"> 
				Pickup Location:<br>
				Campania Pizza, East Village<br> 
				32 St Marks Pl<br> 
				New York, NY 10003<br><br>
			</span> 
		</#if>
		<span style="float: left; width: 33.33%;">
  			Paid With:<br>
			${cardType}<br>
			${cardLastFourNumbers}<br><br>
  		</span>
	</span><br><br>
	
	
	<#function calculateTotalForItem price quantity>
    	<#return price?number * quantity?number>
	</#function>
	
	
<table width="100%">
	<thead>
		<tr>
			<th style="border-bottom: 1px solid #ddd;">Order Details</th>
			<th style="border-bottom: 1px solid #ddd;">Amount</th>
		</tr>
	</thead>
	<tbody>
		<#list pizzaItems as pizzaItem>
			<tr>
				<td data-title="Order Details" style="border-bottom: 1px solid #ddd;">
        			${pizzaItem.quantity} x ${pizzaItem.type}<br>
					<#list pizzaItem.emailDisplay as display>
							&nbsp;&nbsp;&nbsp;${display}<br>
					</#list>
      			</td>
				<td data-title="Amount" style="border-bottom: 1px solid #ddd;">
					(${pizzaItem.quantity} x $${pizzaItem.price}) = $${calculateTotalForItem(pizzaItem.price, pizzaItem.quantity)}
				</td>
			</tr>
		</#list>
		<#list saladItems as saladItem>
			<tr>
				<td data-title="Order Details" style="border-bottom: 1px solid #ddd;">
					${saladItem.quantity} x ${saladItem.type}<br>
        			<#list saladItem.emailDisplay as display>
							&nbsp;&nbsp;&nbsp;${display}<br>
					</#list>
      			</td>
				<td data-title="Amount" style="border-bottom: 1px solid #ddd;">
					(${saladItem.quantity} x $${saladItem.price}) = $${calculateTotalForItem(saladItem.price, saladItem.quantity)}
				</td>
			</tr>
		</#list>
		<#list drinkItems as drinkItem>
			<tr>
				<td data-title="Order Details" style="border-bottom: 1px solid #ddd;">
						${drinkItem.quantity} x ${drinkItem.type}<br>
      			</td>
				<td data-title="Amount" style="border-bottom: 1px solid #ddd;">
					(${drinkItem.quantity} x $${drinkItem.price}) = $${calculateTotalForItem(drinkItem.price, drinkItem.quantity)}
				</td>
			</tr>
		</#list>
		<#list dessertItems as dessertItem>
        	<tr>
				<td data-title="Order Details" style="border-bottom: 1px solid #ddd;">
        			<#if dessertItem.type=='Cookies'> 
						${dessertItem.quantity} x ${dessertItem.cookieChoice?upper_case}<br>
					</#if>
					<#if dessertItem.type=='Brownies'> 
						${dessertItem.quantity} x ${dessertItem.brownieChoice?upper_case}<br>
					</#if>
      			</td>
				<td data-title="Amount" style="border-bottom: 1px solid #ddd;">
					(${dessertItem.quantity} x $${dessertItem.price}) = $${calculateTotalForItem(dessertItem.price, dessertItem.quantity)}
				</td>
			</tr>
		</#list>
		
		<tr>
			<td data-title="Name" style="border-bottom: 1px solid #ddd;">Subtotal</td>
			<td data-title="Total" style="border-bottom: 1px solid #ddd;">$${subtotal}</td>
		</tr>
    	<tr>
			<td data-title="Name" style="border-bottom: 1px solid #ddd;">Tax</td>
			<td data-title="Total" style="border-bottom: 1px solid #ddd;">$${tax}</td>
		</tr>
    	<tr>
			<td data-title="Name" style="border-bottom: 1px solid #ddd;">Total</td>
			<td data-title="Total" style="border-bottom: 1px solid #ddd;">$${amount}</td>
		</tr>
	</tbody>
</table>


    
        
</body>
</html>
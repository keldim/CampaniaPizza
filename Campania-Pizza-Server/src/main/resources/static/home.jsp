<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="security"
	uri="http://www.springframework.org/security/tags"%>

<html>

<head>
<title>chrisyoo Company Home Page</title>
</head>

<body>

	<h2>chrisyoo Company Home Page</h2>
	<hr>

	<p>Welcome to the chrisyoo company home page!</p>

	<hr>

	


	<form:form action="${pageContext.request.contextPath}/logout"
		method="POST">

		<input type="submit" value="Logout" />

	</form:form>

</body>

</html>
<?php

$config = require("../config/config.php");


?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>ME2 SMC</title>
		<link rel="stylesheet" href="../cdn/stylesheets/app-1.0.0.min.css" />
	</head>
	<body>
		<div id="app">

		</div>

		<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.compat.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/async/0.9.0/async.js"></script>
		<script src="../source/vendor/finch/finch.min.js"></script>
		<script src="../source/vendor/rx/rx.all.js"></script>
		<script src="../cdn/javascript/app-1.0.0.js"></script>
		<script>
			$(function () {

				// Create the app instance
				//var app = new App.Game("<?php echo $config["uris"]["api-proxy"]; ?>", "<?php echo $config["uris"]["cdn"] ?>");

				// Initialise Knockout
				//ko.applyBindings(app);

				// Debugging
				//window.app = app;
			});
		</script>
	</body>
</html>
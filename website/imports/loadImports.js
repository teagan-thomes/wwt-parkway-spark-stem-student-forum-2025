fetch("/website/imports/header.html")
	.then((response) => response.text())
	.then((data) => {
		document.getElementById("header-placeholder").innerHTML = data;
		console.log("Header loaded");
	});

fetch("/website/imports/footer.html")
	.then((response) => response.text())
	.then((data) => {
		document.getElementById("footer-placeholder").innerHTML = data;
		console.log("Footer loaded");
	});

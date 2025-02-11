// Function to get URL parameters
function getUrlParameter(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	var results = regex.exec(location.search);
	return results === null
		? ""
		: decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Function to generate checksum
function generateChecksum(str) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}
	return Math.abs(hash).toString(16);
}

// Verify certificate validity
window.onload = function () {
	const name = getUrlParameter("name");
	const providedChecksum = getUrlParameter("checksum");
	const secretKey = "WWT-PARKWAY-STEM-2025"; // This should match the key used to generate the checksum

	if (name && providedChecksum) {
		const expectedChecksum = generateChecksum(name + secretKey);

		if (providedChecksum === expectedChecksum) {
			// Valid certificate request
			document.getElementById("recipientName").textContent = name;

			// Set current date
			const today = new Date();
			const options = { year: "numeric", month: "long", day: "numeric" };
			document.getElementById("certDate").textContent =
				today.toLocaleDateString("en-US", options);

			// Show certificate
			document.getElementById("certificateContainer").style.display = "block";
		} else {
			// Invalid checksum
			document.getElementById("errorMessage").style.display = "block";
		}
	} else {
		// Missing parameters
		document.getElementById("errorMessage").style.display = "block";
	}
};

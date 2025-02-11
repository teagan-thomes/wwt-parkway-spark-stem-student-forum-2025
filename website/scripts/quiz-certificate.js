// Function to generate checksum (same as in certificate.js)
function generateChecksum(str) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}
	return Math.abs(hash).toString(16);
}

// Function to generate certificate URL
function generateCertificateURL(name) {
	const secretKey = "WWT-PARKWAY-STEM-2025";
	const checksum = generateChecksum(name + secretKey);
	return `certificate.html?name=${encodeURIComponent(
		name
	)}&checksum=${checksum}`;
}

// Function to close name dialog
function closeNameDialog() {
	const dialog = document.querySelector(".name-dialog");
	if (dialog) {
		dialog.remove();
	}
}

// Function to show name input dialog
function showNameInputDialog() {
	// Remove any existing dialog first
	closeNameDialog();

	const nameDialog = document.createElement("div");
	nameDialog.className = "name-dialog";
	nameDialog.innerHTML = `
        <div class="name-dialog-content">
            <h2>Congratulations!</h2>
            <p>Please enter your name as you would like it to appear on your certificate:</p>
            <input type="text" id="certificate-name" placeholder="Your Name">
            <div class="dialog-buttons">
                <button onclick="submitName()">Get Certificate</button>
                <button onclick="closeNameDialog()" class="cancel-button">Cancel</button>
            </div>
        </div>
    `;

	// Add click event to close dialog when clicking outside
	nameDialog.addEventListener("click", function (e) {
		if (e.target === nameDialog) {
			closeNameDialog();
		}
	});

	document.body.appendChild(nameDialog);

	// Focus the input field
	setTimeout(() => {
		const input = document.getElementById("certificate-name");
		if (input) input.focus();
	}, 100);
}

// Function to submit name and redirect to certificate
function submitName() {
	const nameInput = document.getElementById("certificate-name");
	const name = nameInput.value.trim();

	if (name) {
		const certificateURL = generateCertificateURL(name);
		window.location.href = certificateURL;
	} else {
		alert("Please enter your name");
	}
}

// Function to add certificate button after quiz completion
function addCertificateButton(resultElement) {
	const certificateButton = document.createElement("button");
	certificateButton.className = "certificate-button";
	certificateButton.textContent = "Get Your Certificate";
	certificateButton.onclick = showNameInputDialog;
	resultElement.appendChild(certificateButton);
}

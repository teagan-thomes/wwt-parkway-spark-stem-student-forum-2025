// Theme management
const themes = {
	dark: {
		"--primary-color": "#007bff",
		"--secondary-color": "#0056b3",
		"--background-color": "#181a1b",
		"--light-background": "#272a2c",
		"--text-color": "#f0f7ff",
		"--fade-text-color": "#f0f7ff80",
		"--header-footer-background-color": "var(--light-background)",
		"--header-footer-box-shadow": "rgba(0, 0, 0, 0.1)",
		"--border-color": "#007bff",
		"--hover-color": "#f0f7ff80",
		"--card-background-color": "var(--light-background)",
		"--card-box-shadow": "rgba(0, 0, 0, 0.1)",
		"--card-hover-shadow": "rgba(0, 0, 0, 0.2)",
		"--correct-color": "#1abc9c",
		"--dark-green": "#1abc9c27",
		"--incorrect-warning-color": "#f44336",
		"--result-color": "white",
		"--result-warning-color": "black",
		"--practice-background-color": "var(--background-color)",
		"--feedback-color": "#dc3545",
		"--code-background-color": "var(--light-background)",
		"--header-hover-background": "#333333",
		"--icon-filter": "1",
	},
	light: {
		"--primary-color": "#007bff",
		"--secondary-color": "#0056b3",
		"--background-color": "#ffffff",
		"--light-background": "#f8f9fa",
		"--text-color": "#333333",
		"--fade-text-color": "#33333380",
		"--header-footer-background-color": "var(--light-background)",
		"--header-footer-box-shadow": "rgba(0, 0, 0, 0.1)",
		"--border-color": "#007bff",
		"--hover-color": "#e9ecef",
		"--card-background-color": "white",
		"--card-box-shadow": "rgba(0, 0, 0, 0.1)",
		"--card-hover-shadow": "rgba(0, 0, 0, 0.2)",
		"--correct-color": "#28a745",
		"--dark-green": "#28a74527",
		"--incorrect-warning-color": "#dc3545",
		"--result-color": "white",
		"--result-warning-color": "black",
		"--practice-background-color": "var(--light-background)",
		"--feedback-color": "#dc3545",
		"--code-background-color": "#f8f9fa",
		"--header-hover-background": "#e9ecef",
		"--icon-filter": "0",
	},
	amoled: {
		"--primary-color": "#007bff",
		"--secondary-color": "#0056b3",
		"--background-color": "#000000",
		"--light-background": "#121212",
		"--text-color": "#f0f7ff",
		"--fade-text-color": "#f0f7ff80",
		"--header-footer-background-color": "#121212",
		"--header-footer-box-shadow": "rgba(0, 0, 0, 0.1)",
		"--border-color": "#007bff",
		"--hover-color": "#f0f7ff80",
		"--card-background-color": "#121212",
		"--card-box-shadow": "rgba(0, 0, 0, 0.1)",
		"--card-hover-shadow": "rgba(0, 0, 0, 0.2)",
		"--correct-color": "#1abc9c",
		"--dark-green": "#1abc9c27",
		"--incorrect-warning-color": "#f44336",
		"--result-color": "white",
		"--result-warning-color": "black",
		"--practice-background-color": "#000000",
		"--feedback-color": "#dc3545",
		"--code-background-color": "#121212",
		"--header-hover-background": "#333333",
		"--icon-filter": "1",
	},
};

// Function to apply a given theme and update UI elements
function applyTheme(themeName) {
	const theme = themes[themeName];
	for (const [property, value] of Object.entries(theme)) {
		document.documentElement.style.setProperty(property, value);
	}
	localStorage.setItem("theme", themeName);
	updateThemeIcon(themeName);
	updateAmoledButtonVisibility(themeName);
}

// Toggle between dark and light themes (treating amoled as a variant of dark)
function toggleTheme() {
	const currentTheme = localStorage.getItem("theme") || "dark";
	// If current is light, switch to dark; otherwise (if dark or amoled), switch to light.
	const newTheme = currentTheme === "light" ? "dark" : "light";
	applyTheme(newTheme);
}

// Update the icon and tooltip for the dark/light toggle button
function updateThemeIcon(themeName) {
	const themeIcon = document.querySelector(".theme-icon-img");
	if (themeIcon) {
		// Add a class if in light mode (for possible animation effects)
		themeIcon.classList.toggle("light-mode", themeName === "light");
		const button = document.getElementById("theme-icon");
		if (button) {
			// When in light mode, clicking will switch to dark; otherwise switch to light.
			button.title = themeName === "light" ? "Switch to Dark Mode" : "Switch to Light Mode";
		}
	}
}

// Show or hide the AMOLED button: only visible when theme is dark.
function updateAmoledButtonVisibility(themeName) {
	const amoledButton = document.getElementById("amoled-button");
	if (amoledButton) {
		amoledButton.style.display = themeName === "dark" ? "inline-block" : "none";
	}
}

// Function to set the AMOLED theme
function setAmoledTheme() {
	applyTheme("amoled");
}

// Initialize theme on DOM load
document.addEventListener("DOMContentLoaded", () => {
	const savedTheme = localStorage.getItem("theme") || "dark";
	applyTheme(savedTheme);
});

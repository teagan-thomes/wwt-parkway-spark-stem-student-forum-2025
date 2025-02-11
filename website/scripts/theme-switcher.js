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
};

// Function to apply theme
function applyTheme(themeName) {
	const theme = themes[themeName];
	for (const [property, value] of Object.entries(theme)) {
		document.documentElement.style.setProperty(property, value);
	}
	localStorage.setItem("theme", themeName);
	updateThemeIcon(themeName);
}

// Function to toggle theme
function toggleTheme() {
	const currentTheme = localStorage.getItem("theme") || "dark";
	const newTheme = currentTheme === "dark" ? "light" : "dark";
	applyTheme(newTheme);
}

// Function to update theme icon
function updateThemeIcon(themeName) {
	const themeIcon = document.querySelector(".theme-icon-img");
	if (themeIcon) {
		themeIcon.classList.toggle("light-mode", themeName === "light");
		const button = document.getElementById("theme-icon");
		if (button) {
			button.title =
				themeName === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
		}
	}
}

// Initialize theme
document.addEventListener("DOMContentLoaded", () => {
	const savedTheme = localStorage.getItem("theme") || "dark";
	applyTheme(savedTheme);
});

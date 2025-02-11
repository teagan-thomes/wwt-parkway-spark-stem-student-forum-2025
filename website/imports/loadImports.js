// loadImports.js

/**
 * Loads an HTML component from a file and inserts it into the placeholder element.
 * @param {string} placeholderId - The ID of the element to receive the content.
 * @param {string} filePath - The relative path to the HTML file.
 */
function loadComponent(placeholderId, filePath) {
	fetch(filePath)
		.then((response) => {
			if (!response.ok) {
				// Log an error if the HTTP response is not OK (e.g., 404 or 500)
				throw new Error(`Failed to load ${filePath}: HTTP ${response.status}`);
			}
			return response.text();
		})
		.then((htmlContent) => {
			const placeholder = document.getElementById(placeholderId);
			if (placeholder) {
				placeholder.innerHTML = htmlContent;
				console.log(`${filePath} loaded successfully into #${placeholderId}`);
			} else {
				console.error(
					`Placeholder element with id "${placeholderId}" not found.`
				);
			}
		})
		.catch((error) => {
			console.error(error);
		});
}

/**
 * Gets the website root path and current depth
 * @returns {Object} Object containing websiteRoot and currentPath
 */
function getWebsitePaths() {
	const path = decodeURIComponent(window.location.pathname);
	console.log("Full decoded path:", path);

	// Find the website directory in the path
	const websiteIndex = path.indexOf("/website/");
	if (websiteIndex === -1) {
		console.log("Not in website directory");
		return {
			websiteRoot: "/",
			currentPath: path,
		};
	}

	// Extract the website root path and the path after /website/
	const websiteRoot = path.substring(0, websiteIndex) + "/website/";
	const currentPath = path.substring(websiteIndex + 9); // +9 to skip '/website/'

	console.log("Website root:", websiteRoot);
	console.log("Current path:", currentPath);

	return { websiteRoot, currentPath };
}

document.addEventListener("DOMContentLoaded", function () {
	const { websiteRoot, currentPath } = getWebsitePaths();

	// Load theme switcher script
	const themeSwitcherScript = document.createElement("script");
	themeSwitcherScript.src = `${websiteRoot}scripts/theme-switcher.js`;
	themeSwitcherScript.defer = true;
	document.head.appendChild(themeSwitcherScript);

	// Function to load a component
	function loadComponent(name, elementId) {
		const url = `${websiteRoot}imports/${name}.html`;
		console.log(`Attempting to load ${name} from:`, url);

		fetch(url)
			.then((response) => {
				console.log(`${name} response status:`, response.status);
				if (!response.ok) {
					throw new Error(`Failed to load ${name}: HTTP ${response.status}`);
				}
				return response.text();
			})
			.then((data) => {
				const element = document.getElementById(elementId);
				if (!element) {
					throw new Error(`Element #${elementId} not found`);
				}

				// Update image paths in the content to be relative to website root
				const modifiedData = data.replace(
					/src="images\//g,
					`src="${websiteRoot}images/`
				);
				element.innerHTML = modifiedData;

				// Adjust paths based on component type
				if (name === "header") {
					const logoImg = document.getElementById("logo-img");
					const homeLink = document.getElementById("home-link");
					const coursesLink = document.getElementById("courses-link");
					const themeIcon = document.querySelector(".theme-icon-img");

					if (logoImg) logoImg.src = `${websiteRoot}images/wwt.png`;
					if (homeLink) homeLink.href = `${websiteRoot}index.html`;
					if (coursesLink)
						coursesLink.href = `${websiteRoot}course_content.html`;
					if (themeIcon) themeIcon.src = `${websiteRoot}images/dark-mode.svg`;
				} else if (name === "footer") {
					const tosLink = document.querySelector('footer a[href*="TOS.html"]');
					const privacyLink = document.querySelector(
						'footer a[href*="privacy.html"]'
					);

					if (tosLink) tosLink.href = `${websiteRoot}TOS.html`;
					if (privacyLink) privacyLink.href = `${websiteRoot}privacy.html`;
				}

				// Initialize theme after header is loaded
				if (name === "header") {
					const savedTheme = localStorage.getItem("theme") || "dark";
					if (window.applyTheme) {
						window.applyTheme(savedTheme);
					} else {
						// If theme switcher hasn't loaded yet, wait and try again
						setTimeout(() => {
							if (window.applyTheme) {
								window.applyTheme(savedTheme);
							}
						}, 100);
					}
				}
			})
			.catch((error) => {
				console.error(`Error loading ${name}:`, error);
				console.error("Current path:", currentPath);
				console.error("Attempted URL:", url);
			});
	}

	// Load header and footer
	loadComponent("header", "header-placeholder");
	loadComponent("footer", "footer-placeholder");
});

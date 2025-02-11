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
		  console.error(`Placeholder element with id "${placeholderId}" not found.`);
		}
	  })
	  .catch((error) => {
		console.error(error);
	  });
  }
  
  // Use relative paths from the current file (course_placeholder.html is in the /website folder)
  loadComponent("header-placeholder", "imports/header.html");
  loadComponent("footer-placeholder", "imports/footer.html");
  
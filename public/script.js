const fs = require("fs");

// Read the JSON file containing route documentation
fs.readFile("./route_doc.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading routes documentation file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const routes_doc = JSON.parse(data);

    // Now you can use the routes_doc object in your code
    console.log(routes_doc);

    // Loop through each route and append to HTML
    routes_doc.routes.forEach((route, index) => {
      // Create a div element for the route
      const routeDiv = document.createElement("div");

      // Create HTML content for the route
      const routeContent = `
        <p><strong>Path:</strong> ${route.path}</p>
        <p><strong>Method:</strong> ${route.method}</p>
        <p><strong>Middleware:</strong> ${route.middleware.join(", ")}</p>
      `;

      // Set the HTML content to the route div
      routeDiv.innerHTML = routeContent;

      // Append the route div to the body
      document.body.appendChild(routeDiv);
    });
  } catch (error) {
    console.error("Error parsing routes documentation JSON:", error);
  }
});

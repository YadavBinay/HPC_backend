document.addEventListener("DOMContentLoaded", function () {
  try {
    const data = [
      {
        path: "/api/v1/user/signup",
        method: "POST",
        middleware: [],
        controller: "signup",
        parameters: [
          "userName",
          "email",
          "password",
          "phoneNumber",
          "gender",
          "dateOfBirth",
          "maritalStatus",
          "state",
          "profilePicture->file",
        ],
      },
      {
        path: "/api/v1/user/login",
        method: "POST",
        middleware: [],
        controller: "login",
        parameters: ["userName", "password"],
      },
      {
        path: "/api/v1/user",
        method: "GET",
        middleware: ["checkForAuthenticationToken"],
        controller: "userDetail",
        parameters: null,
      },
      {
        path: "/api/v1/user/allusers",
        method: "GET",
        middleware: ["just for testing and will be removed"],
        controller: "allUsers",
      },
      {
        path: "/api/v1/appointment",
        method: "POST",
        middleware: ["restrictUserWithoutToken"],
        controller: "createNewAppointment",
        parameters: ["doctorId", "date", "time"],
      },
      {
        path: "/api/v1/appointment",
        method: "GET",
        middleware: ["restrictUserWithoutToken"],
        controller: "getAllAppointMents",
        parameters: null,
      },
      {
        path: "/api/v1/appointment/complete",
        method: "GET",
        middleware: ["restrictUserWithoutToken"],
        controller: "completedAppointments",
        parameters: null,
      },
      {
        path: "/api/v1/appointment/future",
        method: "GET",
        middleware: ["restrictUserWithoutToken"],
        controller: "upcomingAppointements",
        parameters: null,
      },
      {
        path: "/api/v1/appointment/:id",
        method: "PATCH",
        middleware: ["restrictUserWithoutToken"],
        controller: "markAppointementCompleted",
        parameters: ["id"],
      },
      {
        path: "/api/v1/child/addChild",
        method: "POST",
        middleware: ["restrictUserWithoutToken"],
        controller: "addChild",
        parameters: ["firstName", "lastName", "gender", "dateOfBirth"],
      },
      {
        path: "/api/v1/child/rootChild",
        method: "GET",
        middleware: ["restrictUserWithoutToken"],
        controller: "getRootChild",
        parameters: null,
      },
      {
        path: "/api/v1/child/parent/:id",
        method: "GET",
        middleware: [],
        controller: "getChildByParentId",
        parameters: ["id"],
      },
      {
        path: "/api/v1/child/:id",
        method: "GET",
        middleware: [],
        controller: "childDetail",
        parameters: ["id"],
      },
      {
        path: "/api/v1/doctor",
        method: "POST",
        middleware: [],
        controller: "createDoctor",
        parameters: [
          "name",
          "specialization",
          "available",
          "location",
          "contactNumber",
          "email",
          "experience",
          "education",
          "bio",
        ],
      },
      {
        path: "/api/v1/doctor/:id",
        method: "POST",
        middleware: [],
        controller: "getDoctorById",
        parameters: ["id"],
      },
      {
        path: "/api/v1/doctor",
        method: "GET",
        middleware: [],
        controller: "getAllDoctors",
        parameters: null,
      },
      {
        path: "/api/v1/document",
        method: "POST",
        middleware: ["restrictUserWithoutToken"],
        controller: "createDocument",
        parameters: ["document->file", "contentType->mimetype"],
      },
      {
        path: "/api/v1/document",
        method: "GET",
        middleware: [],
        controller: "getAllDocuments",
        parameters: null,
      },
      {
        path: "/api/v1/document/:id",
        method: "GET",
        middleware: ["restrictUserWithoutToken"],
        controller: "getDocumentById",
        parameters: ["id"],
      },
      {
        path: "/api/v1/image/upload",
        method: "POST",
        middleware: ["restrictUserWithoutToken"],
        controller: "uploadImage",
        parameters: ["childId", "image->file"],
      },
      {
        path: "/api/v1/chat/getmessages",
        method: "POST",
        middleware: [],
        controller: "getMessagesBetweenUsers",
        parameters: ["senderId", "receiverId"],
      },
      {
        path: "/api/v1/otp/send-otp",
        method: "POST",
        middleware: [],
        controller: "sendOtp",
        parameters: ["email"],
      },
      {
        path: "/api/v1/otp/verify-otp",
        method: "POST",
        middleware: [],
        controller: "verifyOtp",
        parameters: ["email", "otp"],
      },
      {
        path: "/api/v1/payment",
        method: "POST",
        middleware: ["restrictUserWithoutToken"],
        controller: "createPayment",
        parameters: ["amount", "date", "status"],
      },
      {
        path: "/api/v1/payment",
        method: "GET",
        middleware: ["restrictUserWithoutToken"],
        controller: "getPayment",
        parameters: null,
      },
      {
        path: "/api/v1/payment",
        method: "PATCH",
        middleware: ["restrictUserWithoutToken"],
        controller: "updatePayment",
        parameters: null,
      },
      {
        path: "/api/v1/report",
        method: "GET",
        middleware: ["restrictUserWithoutToken"],
        controller: "getReports",
        parameters: null,
      },
      {
        path: "/api/v1/subscription",
        method: "POST",
        middleware: ["restrictUserWithoutToken"],
        controller: "createSubscription",
        parameters: ["planType"],
      },
      {
        path: "/api/v1/subscription",
        method: "GET",
        middleware: ["restrictUserWithoutToken"],
        controller: "getSubscriptions",
        parameters: null,
      },
    ];
    // Parse the JSON data
    const routes_doc = data;

    // Loop through each route and append to HTML
    routes_doc.forEach((route, index) => {
      // Create a div element for the route
      const routeDiv = document.createElement("div");

      // Create HTML content for the route
      const routeContent = `
        <hr/>
        <p><strong>Path:</strong> ${route.path}</p>
        <p><strong>Method:</strong> ${route.method}</p>
        <p><strong>Middleware:</strong> ${route.middleware?.join(", ")}</p>
        <p><strong>Parameters:</strong> ${
          !route.parameters ? "not required" : route.parameters.join(", ")
        }</p>

      `;

      // Set the HTML content to the route div
      routeDiv.innerHTML = routeContent;

      // Append the route div to the body
      document.body.appendChild(routeDiv);
    });
  } catch (error) {
    console.error("Error :", error);
  }
});

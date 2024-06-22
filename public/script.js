document.addEventListener('DOMContentLoaded', function () {
  const userDiv = document.querySelector('.user');
  const childDiv = document.querySelector('.child');
  const doctorDiv = document.querySelector('.doctor');
  const otpDiv = document.querySelector('.otp');
  const appointmentDiv = document.querySelector('.appointment');
  const documentDiv = document.querySelector('.document');
  const imageDiv = document.querySelector('.image');
  const chatDiv = document.querySelector('.chat');
  const paymentDiv = document.querySelector('.payment');
  const reportDiv = document.querySelector('.report');
  const subscriptionDiv = document.querySelector('.subscription');

  const copyToClipboard = text => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const alert = document.createElement('div');
        alert.classList.add('clipboard-alert');
        alert.innerHTML = `<b>Copied to Clipboard</b><p>${text}</p>`;
        document.body.appendChild(alert);

        setTimeout(() => {
          alert.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(alert);
          }, 300);
        }, 1500);
      })
      .catch(err => {
        console.error('Error copying to clipboard:', err);
      });
  };

  try {
    const routes_doc = [
      {
        type: 'USER',
        path: '/api/v1/user/signup',
        method: 'POST',
        middleware: [],
        controller: 'signup',
        parameters: [
          'userName',
          'email',
          'password',
          'phoneNumber',
          'gender',
          'dateOfBirth',
          'maritalStatus',
          'state',
          'profilePicture->file',
        ],
      },
      {
        type: 'USER',
        path: '/api/v1/user/login',
        method: 'POST',
        middleware: [],
        controller: 'login',
        parameters: ['userName', 'password'],
      },
      {
        type: 'USER',
        path: '/api/v1/user',
        method: 'GET',
        middleware: ['checkForAuthenticationToken'],
        controller: 'userDetail',
        parameters: null,
      },
      {
        type: 'USER',
        path: '/api/v1/user/allusers',
        method: 'GET',
        middleware: ['just for testing and will be removed'],
        controller: 'allUsers',
      },
      {
        type: 'APPOINTMENT',
        path: '/api/v1/appointment',
        method: 'POST',
        middleware: ['restrictUserWithoutToken'],
        controller: 'createNewAppointment',
        parameters: ['doctorId', 'date', 'time'],
      },
      {
        type: 'APPOINTMENT',
        path: '/api/v1/appointment',
        method: 'GET',
        middleware: ['restrictUserWithoutToken'],
        controller: 'getAllAppointMents',
        parameters: null,
      },
      {
        type: 'APPOINTMENT',
        path: '/api/v1/appointment/complete',
        method: 'GET',
        middleware: ['restrictUserWithoutToken'],
        controller: 'completedAppointments',
        parameters: null,
      },
      {
        type: 'APPOINTMENT',
        path: '/api/v1/appointment/future',
        method: 'GET',
        middleware: ['restrictUserWithoutToken'],
        controller: 'upcomingAppointements',
        parameters: null,
      },
      {
        type: 'APPOINTMENT',
        path: '/api/v1/appointment/:id',
        method: 'PATCH',
        middleware: ['restrictUserWithoutToken'],
        controller: 'markAppointementCompleted',
        parameters: ['id'],
      },
      {
        type: 'CHILD',
        path: '/api/v1/child/addChild',
        method: 'POST',
        middleware: ['restrictUserWithoutToken'],
        controller: 'addChild',
        parameters: ['firstName', 'lastName', 'gender', 'dateOfBirth'],
      },
      {
        type: 'CHILD',
        path: '/api/v1/child/rootChild',
        method: 'GET',
        middleware: ['restrictUserWithoutToken'],
        controller: 'getRootChild',
        parameters: null,
      },
      {
        type: 'CHILD',
        path: '/api/v1/child/parent/:id',
        method: 'GET',
        middleware: [],
        controller: 'getChildByParentId',
        parameters: ['id'],
      },
      {
        type: 'CHILD',
        path: '/api/v1/child/:id',
        method: 'GET',
        middleware: [],
        controller: 'childDetail',
        parameters: ['id'],
      },
      {
        type: 'DOCTOR',
        path: '/api/v1/doctor',
        method: 'POST',
        middleware: [],
        controller: 'createDoctor',
        parameters: [
          'name',
          'specialization',
          'available',
          'location',
          'contactNumber',
          'email',
          'experience',
          'education',
          'bio',
        ],
      },
      {
        type: 'DOCTOR',
        path: '/api/v1/doctor/:id',
        method: 'POST',
        middleware: [],
        controller: 'getDoctorById',
        parameters: ['id'],
      },
      {
        type: 'DOCTOR',
        path: '/api/v1/doctor',
        method: 'GET',
        middleware: [],
        controller: 'getAllDoctors',
        parameters: null,
      },
      {
        type: 'DOCUMENT',
        path: '/api/v1/document',
        method: 'POST',
        middleware: ['restrictUserWithoutToken'],
        controller: 'createDocument',
        parameters: ['document->file', 'contentType->mimetype'],
      },
      {
        type: 'DOCUMENT',
        path: '/api/v1/document',
        method: 'GET',
        middleware: [],
        controller: 'getAllDocuments',
        parameters: null,
      },
      {
        type: 'DOCUMENT',
        path: '/api/v1/document/:id',
        method: 'GET',
        middleware: ['restrictUserWithoutToken'],
        controller: 'getDocumentById',
        parameters: ['id'],
      },
      {
        type: 'IMAGE',
        path: '/api/v1/image/upload',
        method: 'POST',
        middleware: ['restrictUserWithoutToken'],
        controller: 'uploadImage',
        parameters: ['childId', 'image->file'],
      },
      {
        type: 'CHAT',
        path: '/api/v1/chat/getmessages',
        method: 'POST',
        middleware: [],
        controller: 'getMessagesBetweenUsers',
        parameters: ['senderId', 'receiverId'],
      },
      {
        type: 'OTP',
        path: '/api/v1/otp/send-otp',
        method: 'POST',
        middleware: [],
        controller: 'sendOtp',
        parameters: ['email'],
      },
      {
        type: 'OTP',
        path: '/api/v1/otp/verify-otp',
        method: 'POST',
        middleware: [],
        controller: 'verifyOtp',
        parameters: ['email', 'otp'],
      },
      {
        type: 'PAYMENT',
        path: '/api/v1/payment',
        method: 'POST',
        middleware: ['restrictUserWithoutToken'],
        controller: 'createPayment',
        parameters: ['amount', 'date', 'status'],
      },
      {
        type: 'PAYMENT',
        path: '/api/v1/payment',
        method: 'GET',
        middleware: ['restrictUserWithoutToken'],
        controller: 'getPayment',
        parameters: null,
      },
      {
        type: 'PAYMENT',
        path: '/api/v1/payment',
        method: 'PATCH',
        middleware: ['restrictUserWithoutToken'],
        controller: 'updatePayment',
        parameters: null,
      },
      {
        type: 'REPORT',
        path: '/api/v1/report',
        method: 'GET',
        middleware: ['restrictUserWithoutToken'],
        controller: 'getReports',
        parameters: null,
      },
      {
        type: 'SUBSCRIPTION',
        path: '/api/v1/subscription',
        method: 'POST',
        middleware: ['restrictUserWithoutToken'],
        controller: 'createSubscription',
        parameters: ['planType'],
      },
      {
        type: 'SUBSCRIPTION',
        path: '/api/v1/subscription',
        method: 'GET',
        middleware: ['restrictUserWithoutToken'],
        controller: 'getSubscriptions',
        parameters: null,
      },
    ];
    routes_doc.forEach((route, index) => {
      const routeDiv = document.createElement('div');
      routeDiv.classList.add('route');

      const routeContent = `
        <div class="route-content">
            <table>
                <tbody>
                    ${Object.entries(route)
                      .map(([key, value]) => {
                        if (Array.isArray(value)) {
                          value = value.join(', ');
                        }
                        return `
                                <tr>
                                    <td><strong>${key.toLocaleUpperCase()}</strong></td>
                                    <td>${
                                      key == 'path'
                                        ? `<code class="path">${value}</code>`
                                        : value
                                    }</td>
                                </tr>
                            `;
                      })
                      .join('')}
                </tbody>
            </table>
        </div>
`;

      routeDiv.innerHTML = routeContent;

      if (route.type === 'USER') {
        userDiv.appendChild(routeDiv);
      } else if (route.type === 'CHILD') {
        childDiv.appendChild(routeDiv);
      } else if (route.type === 'DOCTOR') {
        doctorDiv.appendChild(routeDiv);
      } else if (route.type === 'OTP') {
        otpDiv.appendChild(routeDiv);
      } else if (route.type === 'APPOINTMENT') {
        appointmentDiv.appendChild(routeDiv);
      } else if (route.type === 'DOCUMENT') {
        documentDiv.appendChild(routeDiv);
      } else if (route.type === 'IMAGE') {
        imageDiv.appendChild(routeDiv);
      } else if (route.type === 'CHAT') {
        chatDiv.appendChild(routeDiv);
      } else if (route.type === 'PAYMENT') {
        paymentDiv.appendChild(routeDiv);
      } else if (route.type === 'REPORT') {
        reportDiv.appendChild(routeDiv);
      } else if (route.type === 'SUBSCRIPTION') {
        subscriptionDiv.appendChild(routeDiv);
      }
    });

    // Add event listener to copy path to clipboard
    const pathElements = document.querySelectorAll('.path');
    pathElements.forEach(element => {
      element.addEventListener('click', () => {
        copyToClipboard(
          'https://hpcbackend-production.up.railway.app' + element.textContent
        );
      });
    });
  } catch (error) {
    console.error('Error :', error);
  }
});

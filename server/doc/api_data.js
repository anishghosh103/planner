define({ "api": [
  {
    "type": "post",
    "url": "/api/meetings/",
    "title": "Create new Meeting",
    "name": "CreateNewMeeting",
    "group": "Meeting",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User ID of the user on whose account the meeting is created. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "purpose",
            "description": "<p>Purpose of the meeting. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the meeting. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "startTime",
            "description": "<p>Starting time of the meeting. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "endTime",
            "description": "<p>Ending time of the meeting. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "place",
            "description": "<p>Place of the meeting. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n message: 'Meeting created.',\n status: 200,\n data: {\n   meeting: {\n     meetingId: String,\n     userId: String,\n     purpose: String,\n     date: {\n       day: Number,\n       month: Number,\n       year: Number\n     },\n     startTime: {\n       hour: Number,\n       minute: Number,\n     },\n     endTime: {\n       hour: Number,\n       minute: Number,\n     },\n     place: String,\n     createdAt: Date,\n     createdBy: {,\n       adminId: String,\n       adminName: String,\n     },\n     updatedAt: Date,\n     updatedBy: {,\n       adminId: String,\n       adminName: String,\n     },\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/meetings/post.js",
    "groupTitle": "Meeting",
    "error": {
      "examples": [
        {
          "title": "Error Response (403)",
          "content": "{\n errors: {\n   message: 'You need to have \\'admin\\' account to access this route.'\n }\n status: 403\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/meetings/:id",
    "title": "Delete a Meeting",
    "name": "DeleteMeeting",
    "group": "Meeting",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Meeting ID. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n message: 'Meeting deleted.',\n status: 200,\n data: {\n   meeting: {\n     meetingId: String,\n     userId: String,\n     purpose: String,\n     date: {\n       day: Number,\n       month: Number,\n       year: Number\n     },\n     startTime: {\n       hour: Number,\n       minute: Number,\n     },\n     endTime: {\n       hour: Number,\n       minute: Number,\n     },\n     place: String,\n     createdAt: Date,\n     createdBy: {,\n       adminId: String,\n       adminName: String,\n     },\n     updatedAt: Date,\n     updatedBy: {,\n       adminId: String,\n       adminName: String,\n     },\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/meetings/delete.js",
    "groupTitle": "Meeting",
    "error": {
      "examples": [
        {
          "title": "Error Response (404)",
          "content": "{\n errors: {\n   message: 'Meeting not found.'\n },\n status: 404\n}",
          "type": "json"
        },
        {
          "title": "Error Response (403)",
          "content": "{\n errors: {\n   message: 'You need to have \\'admin\\' account to access this route.'\n }\n status: 403\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/meetings/:id",
    "title": "Get Meeting By Id",
    "name": "GetMeetingById",
    "group": "Meeting",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Meeting Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n message: 'Meeting found.',\n status: 200,\n data: {\n   meeting: {\n     meetingId: String,\n     userId: String,\n     purpose: String,\n     date: {\n       day: Number,\n       month: Number,\n       year: Number\n     },\n     startTime: {\n       hour: Number,\n       minute: Number,\n     },\n     endTime: {\n       hour: Number,\n       minute: Number,\n     },\n     place: String,\n     createdAt: Date,\n     createdBy: {,\n       adminId: String,\n       adminName: String,\n     },\n     updatedAt: Date,\n     updatedBy: {,\n       adminId: String,\n       adminName: String,\n     },\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/meetings/get.js",
    "groupTitle": "Meeting",
    "error": {
      "examples": [
        {
          "title": "Error Response (404)",
          "content": "{\n errors: {\n   message: 'Meeting not found.'\n },\n status: 404\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/meetings/:id",
    "title": "Update a Meeting",
    "name": "UpdateMeeting",
    "group": "Meeting",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Meeting ID. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "purpose",
            "description": "<p>Purpose of the meeting. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "date",
            "description": "<p>Date of the meeting. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "startTime",
            "description": "<p>Starting time of the meeting. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "endTime",
            "description": "<p>Ending time of the meeting. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "place",
            "description": "<p>Place of the meeting. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n message: 'Meeting updated.',\n status: 200,\n data: {\n   meeting: {\n     meetingId: String,\n     userId: String,\n     purpose: String,\n     date: {\n       day: Number,\n       month: Number,\n       year: Number\n     },\n     startTime: {\n       hour: Number,\n       minute: Number,\n     },\n     endTime: {\n       hour: Number,\n       minute: Number,\n     },\n     place: String,\n     createdAt: Date,\n     createdBy: {,\n       adminId: String,\n       adminName: String,\n     },\n     updatedAt: Date,\n     updatedBy: {,\n       adminId: String,\n       adminName: String,\n     },\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/meetings/put.js",
    "groupTitle": "Meeting",
    "error": {
      "examples": [
        {
          "title": "Error Response (404)",
          "content": "{\n errors: {\n   message: 'Meeting not found.'\n },\n status: 404\n}",
          "type": "json"
        },
        {
          "title": "Error Response (403)",
          "content": "{\n errors: {\n   message: 'You need to have \\'admin\\' account to access this route.'\n }\n status: 403\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/users/:id/activate",
    "title": "Activate User",
    "name": "ActivateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n message: 'User verified.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/put.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (404)",
          "content": "{\n errors: {\n   message: 'User not found.'\n },\n status: 404\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/users/notifications",
    "title": "Delete All Notifications",
    "name": "DeleteAllNotifications",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n message: 'Notifications deleted.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/delete.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n errors: {\n   message: 'You are not authorized to access this route.'\n }\n status: 401\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/users/notifications/:notificationId",
    "title": "Delete Notification By Id",
    "name": "DeleteNotificationById",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notificationId",
            "description": "<p>Notification ID. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n message: 'Notification deleted.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/delete.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n errors: {\n   message: 'You are not authorized to access this route.'\n }\n status: 401\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/users/forgot-password",
    "title": "Forgot Password",
    "name": "ForgotPassword",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n message: 'Password reset mail sent.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n errors: {\n   username: 'Username does not exist.'\n },\n status: 400,\n}",
          "type": "json"
        },
        {
          "title": "Error Response (403)",
          "content": "{\n errors: {\n   message: 'A user is already logged in.'\n }\n status: 403\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/post.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/",
    "title": "Get All Users",
    "name": "GetAllUsers",
    "group": "User",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page number of the search result (each page contains 20 results). (Query Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n message: 'Users found.'\n status: 200,\n data: {\n   total: Number,\n   users: [{\n     userId: String,\n     firstname: String,\n     lastname: String,\n     email: String,\n     username: String,\n     mobile: String,\n     userType: String,\n   }]\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/get.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n errors: {\n   message: 'You are not authorized to access this route.'\n }\n status: 401\n}",
          "type": "json"
        },
        {
          "title": "Error Response (403)",
          "content": "{\n errors: {\n   message: 'You need to have \\'admin\\' account to access this route.'\n }\n status: 403\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/auth-status",
    "title": "Get Authorization Status of User",
    "name": "GetAuthStatus",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n message: 'User authorized.'\n status: 200,\n data: {\n   user: {\n     userId: String,\n     firstname: String,\n     lastname: String,\n     email: String,\n     username: String,\n     mobile: String,\n     userType: String,\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/get.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n errors: {\n   message: 'You are not authorized to access this route.'\n }\n status: 401\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "api/users/:id/meetings",
    "title": "Get Meetings Of a User",
    "name": "GetMeetingsOfUser",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "year",
            "description": "<p>Year. (Query Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "month",
            "description": "<p>Month. (Query Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "day",
            "description": "<p>Date. (Query Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number. Each page contains 20 meetings. (Query Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n message: 'Meetings found.',\n status: 200,\n data: {\n   total: Number,\n   meetings: [{\n     meetingId: String,\n     userId: String,\n     purpose: String,\n     date: {\n       day: Number,\n       month: Number,\n       year: Number\n     },\n     startTime: {\n       hour: Number,\n       minute: Number,\n     },\n     endTime: {\n       hour: Number,\n       minute: Number,\n     },\n     place: String,\n     createdAt: Date,\n     createdBy: {,\n       adminId: String,\n       adminName: String,\n     },\n     updatedAt: Date,\n     updatedBy: {,\n       adminId: String,\n       adminName: String,\n     },\n   }]\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/get.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n errors: {\n   message: 'You are not authorized to access this route.'\n }\n status: 401\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/notifications",
    "title": "Get Notifications of User",
    "name": "GetNotifications",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page number of the search result (each page contains 20 results). (Query Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n message: 'Notifications found.'\n status: 200,\n data: {\n   total: Number,\n   notifications: [{\n     notificationId: String,\n     userId: String,\n     notificationType: ['created', 'updated', 'deleted'],\n     meeting: {\n       meetingId: String,\n       userId: String,\n       purpose: String,\n       date: {\n         day: Number,\n         month: Number,\n         year: Number\n       },\n       startTime: {\n         hour: Number,\n         minute: Number,\n       },\n       endTime: {\n         hour: Number,\n         minute: Number,\n       },\n       place: String,\n       createdAt: Date,\n       createdBy: {,\n         adminId: String,\n         adminName: String,\n       },\n       updatedAt: Date,\n       updatedBy: {,\n         adminId: String,\n         adminName: String,\n       },\n     }\n   }]\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/get.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n errors: {\n   message: 'You are not authorized to access this route.'\n }\n status: 401\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Get User details by ID",
    "name": "GetUserById",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n message: 'User found.'\n status: 200,\n data: {\n   user: {\n     userId: String,\n     firstname: String,\n     lastname: String,\n     email: String,\n     username: String,\n     mobile: String,\n     userType: String,\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404)",
          "content": "{\n errors: {\n   message: 'User not found.',\n }\n status: 404\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n errors: {\n   message: 'You are not authorized to access this route.'\n }\n status: 401\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/get.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/login",
    "title": "Login",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n message: 'Login successful.',\n status: 200,\n data: [\n   user: {\n     userId: String,\n     firstname: String,\n     lastname: String,\n     email: String,\n     username: String,\n     mobile: String,\n     userType: String,\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n errors: {\n   message: 'Some field is empty.',\n }\n status: 400\n}",
          "type": "json"
        },
        {
          "title": "Error Response (400)",
          "content": "{\n errors: {\n   password: 'Incorrect password.',\n }\n status: 400\n}",
          "type": "json"
        },
        {
          "title": "Error Response (400)",
          "content": "{\n errors: {\n   username: 'Username not found.',\n }\n status: 400\n}",
          "type": "json"
        },
        {
          "title": "Error Response (400)",
          "content": "{\n errors: {\n   username: 'User is not verified.',\n }\n status: 400\n}",
          "type": "json"
        },
        {
          "title": "Error Response (403)",
          "content": "{\n errors: {\n   message: 'A user is already logged in.'\n }\n status: 403\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/post.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/logout",
    "title": "Logout",
    "name": "Logout",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n message: 'Logout successful.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/post.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n errors: {\n   message: 'You are not authorized to access this route.'\n }\n status: 401\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/users/reset-password",
    "title": "Reset Password",
    "name": "ResetPassword",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token from the password reset email. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'Password reset successful.',\n status: 200,\n data: {\n   userId: String,\n   firstname: String,\n   lastname: String,\n   username: String,\n   email: String,\n   mobile: String,\n   userType: String\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n errors: {\n   message: 'Password not provided.',\n }\n status: 400\n}",
          "type": "json"
        },
        {
          "title": "Error Response (400)",
          "content": "{\n errors: {\n   message: 'Invalid token.',\n }\n status: 400\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n errors: {\n   message: 'User not found.'\n },\n status: 404\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n errors: {\n   message: 'You are not authorized to access this route.'\n }\n status: 401\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/put.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/signup",
    "title": "Sign Up",
    "name": "SignUp",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>First name of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last name of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>Mobile no. of the user. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n message: 'Registration successful.',\n status: 200,\n data: {\n   userId: String,\n   firstname: String,\n   lastname: String,\n   username: String,\n   email: String,\n   mobile: String,\n   userType: String,\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n errors: {\n   message: 'Some field is empty.',\n }\n status: 400,\n}",
          "type": "json"
        },
        {
          "title": "Error Response (400)",
          "content": "{\n errors: {\n   email: 'Email is already registered.'\n },\n status: 400,\n}",
          "type": "json"
        },
        {
          "title": "Error Response (400)",
          "content": "{\n errors: {\n   username: 'Username is already taken.'\n },\n status: 400,\n}",
          "type": "json"
        },
        {
          "title": "Error Response (403)",
          "content": "{\n errors: {\n   message: 'A user is already logged in.'\n }\n status: 403\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n errors: {\n   message: 'Error occurred.'\n }\n status: 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/doc/users/post.js",
    "groupTitle": "User"
  }
] });

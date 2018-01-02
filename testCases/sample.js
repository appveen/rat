module.exports = {
    "testName": "Sample API Tests",
    "url": [
        "http://localhost:8080"
    ],
    "globals": [
        "loginResponse",
        "data"
    ],
    "tests": [{
            "endpoint": "1",
            "name": "Error API - GET",
            "request": {
                "method": "GET",
                "url": "/",
                "responseCode": 403
            }
        },
        {
            "endpoint": "1",
            "name": "Error API - POST",
            "request": {
                "method": "POST",
                "url": "/",
                "responseCode": 400
            }
        },
        {
            "endpoint": "1",
            "name": "Login - Valid",
            "request": {
                "method": "POST",
                "url": "/login",
                "payload": {
                    "username": "alice",
                    "password": "password"
                },
                "responseCode": 200,
                "saveResponse": "loginResponse"
            },
            "response": {
                "body": {
                    "token": null
                }
            }
        },
        {
            "endpoint": "1",
            "name": "Login - Invalid",
            "request": {
                "method": "POST",
                "url": "/login",
                "payload": {
                    "username": "alice123",
                    "password": "password"
                },
                "responseCode": 400
            },
            "response": {
                "body": {
                    "message": "Login error!"
                }
            }
        },
        {
            "endpoint": "1",
            "name": "Fetch data - Valid",
            "request": {
                "method": "GET",
                "url": "/data",
                "headers": {
                    "token": "{{loginResponse.token}}"
                },
                "responseCode": 200
            },
            "response": {
                "body": [
                    null
                ]
            }
        },
        {
            "endpoint": "1",
            "name": "Fetch data - Invalid",
            "request": {
                "method": "GET",
                "url": "/data",
                "headers": {
                    "token": "asdasdasdasd"
                },
                "responseCode": 400
            },
            "response": {
                "body": {
                    "message": "Invalid request"
                }
            }
        },
        {
            "endpoint": "1",
            "delimiters": ["<%", "%>"],
            "name": "Send data",
            "request": {
                "method": "POST",
                "url": "/data",
                "headers": {
                    "thisHeaderWontBeParsed": "{{loginResponse.token}}",
                    "token": "<%loginResponse.token%>"
                },
                "payloadFile": "sampleRequestPayload.json",
                "responseCode": 200,
                "saveResponse": "data"
            },
            "response": {
                "headers": {
                    "time": null,
                    "allOk": "yes"
                },
                "body": {
                    "name": "Alice Cooper",
                    "address": {
                        "line1": "#404 Pritam Woods",
                        "line2": "Bellandur",
                        "city": "Bangalore",
                        "state": "Karnataka",
                        "country": "India",
                        "pin": "560103"
                    },
                    "mobile": "+91 987 654 4323",
                    "nameOfChildren": [
                        "Alpha Cooper",
                        "Beta Cooper",
                        "Charlie Cooper"
                    ],
                    "dateOfBirths": null
                }
            }
        },
        {
            "endpoint": "1",
            "name": "Fetch data with ID",
            "request": {
                "method": "GET",
                "url": "/data/{{data._id}}",
                "headers": {
                    "token": "{{loginResponse.token}}"
                },
                "responseCode": 200
            },
            "response": {
                "bodyFile": "sampleResponsePayload.json"
            }
        },
        {
            "endpoint": "1",
            "name": "Update data",
            "request": {
                "method": "PUT",
                "url": "/data/{{data._id}}",
                "headers": {
                    "token": "{{loginResponse.token}}"
                },
                "payload": {
                    "name": "Alice Cooper",
                    "number": "123123123"
                },
                "responseCode": 200
            },
            "response": {
                "body": {
                    "name": "Alice Cooper",
                    "number": "123123123",
                    "_id": "{{data._id}}"
                }
            }
        },
        {
            "endpoint": "1",
            "name": "Fetch data with ID after UPDATE",
            "request": {
                "method": "GET",
                "url": "/data/{{data._id}}",
                "headers": {
                    "token": "{{loginResponse.token}}"
                },
                "responseCode": 200
            },
            "response": {
                "body": {
                    "name": "Alice Cooper",
                    "number": "123123123"
                }
            }
        },
        {
            "endpoint": "1",
            "name": "Delete data",
            "request": {
                "method": "DELETE",
                "url": "/data/{{data._id}}",
                "headers": {
                    "token": "{{loginResponse.token}}"
                },
                "responseCode": 200
            },
            "response": {
                "body": {
                    "_id": null
                }
            }
        },
        {
            "endpoint": "1",
            "name": "Fetch data with ID after DELETE",
            "request": {
                "method": "GET",
                "url": "/data/{{data._id}}",
                "headers": {
                    "token": "{{loginResponse.token}}"
                },
                "responseCode": 404
            }
        },{
            "endpoint": "1",
            "name": "Stop on errror",
            "request": {
                "method": "GET",
                "url": "/data",
                "headers": {
                    "token": "asdasdasdasd"
                },
                "responseCode": 200
            },
            "response": {
                "body": {
                    "message": "Invalid request"
                }
            }
        },{
            "endpoint": "1",
            "name": "This will not be executed",
            "request": {
                "method": "GET",
                "url": "/data",
                "headers": {
                    "token": "{{loginResponse.token}}"
                },
                "responseCode": 200
            },
            "response": {
                "body": [
                    null
                ]
            }
        }
    ]
};
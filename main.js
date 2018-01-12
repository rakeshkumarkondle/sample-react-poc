import angular from 'angular';
// import reactDirective from './src/angular/reactDirective'

const app = angular.module('app', []);
app.controller('TodoCtrl', function($scope) {


  // TODO
  // Inter fields relationship
  // Form submit action

  $scope.metaInfos = [{
    "fieldName": "personalInfo",
    "componentType": "accordion",
    "formName": "personalInfo",
    description: undefined,
    "type": "array",
    "personalInfo": {
      "fields": [{
          "fieldName": "name",
          "componentType": "accordion",
          description: undefined,
          "formName": "name",
          "name": {
            "fields": [{
                "fieldName": "Title",
                "componentType": "segment",
                "type": "string",
                "options": ["Mr", "Mrs", "Miss", "Ms.", "Dr.", "Prof."],
                "key": "title"
              },
              {
                "fieldName": "First name",
                "componentType": "textbox",
                "type": "string",
                "key": "firstName",
                "group": "group1-horizontal"
              },
              {
                "fieldName": "Middle name",
                "componentType": "textbox",
                "type": "string",
                "key": "middleName"
              },
              {
                "fieldName": "Last name",
                "componentType": "textbox",
                "type": "string",
                "key": "lastName"
              }
            ]
          }
        },
        {
          "fieldName": "date of birth",
          description: undefined,
          "componentType": "accordion",
          "formName": "dateOfBirth",
          "dateOfBirth": {
            "fields": [{
              "fieldName": "Select",
              "componentType": "datePicker",
              "type": "date",
              "key": "dateOfBirth"
            }]
          }
        },
        {
          "fieldName": "Gender",
          description: undefined,
          "formName": "gender",
          "componentType": "accordion",
          "gender": {
            "fields": [{
              "fieldName": "Select",
              "componentType": "segment",
              "type": "string",
              "options": ["Male", "Female", "Other"],
              "key": "gender"
            }]
          }
        },
        {
          fieldName: "Place of birth",
          description: undefined,
          "componentType": "accordion",
          "formName": "placeOfBirth",
          "placeOfBirth": {
            "fields": [{
                "fieldName": "Country of birth",
                "componentType": "selectBox",
                "type": "string",
                "options": [],
                "key": "countryOfBirth"
              },
              {
                "fieldName": "State of birth",
                "componentType": "selectBox",
                "type": "string",
                "options": [],
                "key": "stateOfBirth"
              }
            ]
          }
        },
        {
          fieldName: "Safeguards",
          description: undefined,
          "componentType": "accordion",
          action: undefined,
          "formName": "safeGuards",
          "safeGuards": {
            "fields": [{
                "fieldName": "Do you have impaired vision?",
                "componentType": "segment",
                "type": "string",
                "options": ["Yes", "No"],
                "key": "impairedVision"
              },
              {
                "fieldName": "Is your hearing impaired?",
                "componentType": "segment",
                "type": "string",
                "options": ["Yes", "No"],
                "key": "impairedHearing"
              },
              {
                "fieldName": "Do you nedd assistance?",
                "componentType": "segment",
                "type": "string",
                "options": ["Yes", "No"],
                "key": "needAssistance"
              }
            ]
          }

        },
        {
          fieldName: "Additional info",
          description: undefined,
          "formName": "additionalInfo",
          "componentType": "accordion",
          "additionalInfo": {
            "fields": [{
                "fieldName": "Personal disability or illness",
                "componentType": "segment",
                "type": "string",
                "options": ["Yes", "No"],
                "key": "disability"
              },
              {
                "fieldName": "Condition",
                "componentType": "textbox",
                "type": "string",
                "key": "condition"
              },
              {
                "fieldName": "Retirement age",
                "componentType": "textbox",
                "type": "number",
                "key": "retirementAge"
              },
              {
                "fieldName": "Date of death",
                "componentType": "datePicker",
                "type": "date",
                "key": "dateOfDeath"
              }
            ]
          }
        },
        {
          fieldName: "Margin Infos",
          description: undefined,
          "componentType": "accordion",
          //"type": "array",
          "formName": "marginInfos",
          "marginInfos": {
            "fields": [{
              "fieldName": "Margin Info",
              description: undefined,
              "componentType": "accordion",
              "type": "array",
              "formName": "marginInfo",
              "marginInfo": {
                "fields": [{
                    "fieldName": "Title",
                    "componentType": "textbox",
                    "type": "string",
                    "key": "title"
                  },
                  {
                    "fieldName": "Email",
                    "componentType": "textbox",
                    "type": "string",
                    "key": "email"
                  }
                ]
              }
            }]
          }

        },
        {
          fieldName: "Address",
          description: undefined,
          "componentType": "accordion",
          "formName": "address",
          "address": {
            "fields": [{
                "fieldName": "Address",
                "componentType": "addressAutoComplete",
                "type": "string",
                "key": "address"
              },
              {
                "fieldName": "Document",
                "componentType": "fileUpload",
                "type": "string",
                "key": "docPath"
              }
            ]
          }
        }
      ]
    }
  }]

  $scope.fields = {
    "personalInfos": [{
        "personalInfo": {
          name: {
            title: "Mr.",
            firstName: "Jeans",
            middleName: "Pual",
            lastName: "Duminy"
          },
          dateOfBirth: {
            "dateOfBirth": "2017-10-18T04:21:08.062Z"
          },
          gender: {
            "gender": ""
          },
          placeOfBirth: {
            "countryOfBirth": "India",
            "stateOfBirth": "Telangana"
          },
          safeGuards: {
            "impairedVision": "",
            "impairedHearing": "",
            "needAssistance": ""
          },
          "additionalInfo": {
            "disability": "",
            "condition": "",
            "retirementAge": "",
            "dateOfDeath": ""
          },
          "marginInfos": [{
              "marginInfo": {
                "title": "abc",
                "email": "abc@x.co"
              }

            },
            {
              "marginInfo": {
                "title": "ab1c",
                "email": "abc1@x.co"
              }

            }, {
              "marginInfo": {
                "title": "abc3",
                "email": "ab3c@x.co"
              }

            },
          ],
          address: {
            address: "melbourne,australia",
            "docPath": ""
          }
        }
      },
      {
        "personalInfo": {
          name: {
            title: "Mr.",
            firstName: "Jeans",
            middleName: "Pual",
            lastName: "Duminy"
          },
          dateOfBirth: {
            "dateOfBirth": "2017-10-18T04:21:08.062Z"
          },
          gender: {
            "gender": ""
          },
          placeOfBirth: {
            "countryOfBirth": "India",
            "stateOfBirth": "Telangana"
          },
          safeGuards: {
            "impairedVision": "",
            "impairedHearing": "",
            "needAssistance": ""
          },
          "additionalInfo": {
            "disability": "",
            "condition": "",
            "retirementAge": "",
            "dateOfDeath": ""
          },
          "marginInfos": [{
              "marginInfo": {
                "title": "abc",
                "email": "abc@x.co"
              }

            },
            {
              "marginInfo": {
                "title": "ab1c",
                "email": "abc1@x.co"
              }

            }, {
              "marginInfo": {
                "title": "abc3",
                "email": "ab3c@x.co"
              }

            },
          ],
          address: {
            address: "melbourne,australia",
            "docPath": ""
          }
        }
      }
    ]

  }

})


export default app;

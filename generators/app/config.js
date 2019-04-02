module.exports = {
    options: {
        quick: {
            description: 'Quick generation using default values. Will not prompt for user input during  generation process.',
            required: false,
            type: Boolean,
            default: false
        }
    },
    prompts: [{
            name: 'apptype',
            type: 'list',
            message: 'Enter Application Type:',
            default: 'quarkus',
            choices: [{
                    name: 'Quarkus',
                    value: 'quarkus'
                },
                {
                    name: 'SpringBoot',
                    value: 'springboot'
                }
            ],
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter valid Application Type..';
                }
            }
        },
        {
            name: 'groupid',
            type: 'input',
            message: 'Enter App Group Id:',
            default: 'com.company',
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Please enter group id.';
            }
        }, {
            name: 'artifactid',
            type: 'input',
            message: 'Enter App Artifact Id:',
            default: 'sample-kaas',
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Please enter artifact id.';
            }
        }, {
            name: 'version',
            type: 'input',
            message: 'Enter App Version:',
            default: '1.0-SNAPSHOT',
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Please enter app version.';
            }
        },
        {
            name: 'kaasversion',
            type: 'input',
            message: 'Enter Kaas Version:',
            default: '8.0.0-SNAPSHOT',
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Please enter kaas version.';
            }
        },
        {
            name: 'swaggerversion',
            type: 'input',
            message: 'Enter Swagger Version:',
            default: '1.5.9',
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Please enter swagger version.';
            }
        }

    ]
};

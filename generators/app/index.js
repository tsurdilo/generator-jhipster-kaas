/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const chalk = require('chalk');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const config = require('./config');
const constants = require('./constants');
const packagejs = require('../../package.json');

module.exports = class extends BaseGenerator {
    constructor(args, opts) {
        super(args, opts);
        for (const optionName in config.options) {
            this.option(optionName, config.options[optionName]);
        }
        this.appDetails = {};
    }

    get initializing() {
        return {
            init(args) {
                if (args === 'default') {
                    // do something when argument is 'default'
                }
            },
            displayLogo() {
                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster Kaas App')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
            }
        };
    }

    prompting() {
        const defaultAppDetails = {
            apptype: 'quarkus',
            groupid: 'com.company',
            artifactid: 'kaasapp',
            version: '1.0.0',
            quarkusversion: '0.11.0',
            kaasversion: '8.0.0-SNAPSHOT',
            swaggerversion: '1.5.9',
            cxfversion: '3.2.6'
        };

        if (this.options.quick && this.options.quick === true) {
            this.appDetails = defaultAppDetails;
        } else {
            return this.prompt(config.prompts).then((answers) => {
                this.answers = answers;

                this.appDetails.apptype = this.answers.apptype;
                this.appDetails.groupid = this.answers.groupid;
                this.appDetails.artifactid = this.answers.artifactid;
                this.appDetails.version = this.answers.version;
                this.appDetails.quarkusversion = defaultAppDetails.quarkusversion;
                this.appDetails.cxfversion = defaultAppDetails.cxfversion;
                this.appDetails.kaasversion = this.answers.kaasversion;
                this.appDetails.swaggerversion = this.answers.swaggerversion;

                this.appDetails.options = this.answers.options;
            });
        }
        return '';
    }

    _writingquarkus() {
        this.template(
            `${constants.genconstants.QUARKUS_TEMPLATES_DIR}/pom.xml.ejs`,
            `${this.appDetails.artifactid}/pom.xml`
        );

        this.template(
            `${constants.genconstants.QUARKUS_TEMPLATES_DIR}/README.md`,
            `${this.appDetails.artifactid}/README.md`
        );

        this.template(
            `${constants.genconstants.QUARKUS_TEMPLATES_DIR}/src/main/resources/META-INF/kmodule.xml`,
            `${this.appDetails.artifactid}/src/main/resources/META-INF/kmodule.xml`
        );

        this.template(
            `${constants.genconstants.QUARKUS_TEMPLATES_DIR}/src/main/resources/test-process.bpmn2.ejs`,
            `${this.appDetails.artifactid}/src/main/resources/test-process.bpmn2`
        );
    }

    _writingspringboot() {
        this.template(
            `${constants.genconstants.SPRINGBOOT_TEMPLATES_DIR}/pom.xml.ejs`,
            `${this.appDetails.artifactid}/pom.xml`
        );

        this.template(
            `${constants.genconstants.SPRINGBOOT_TEMPLATES_DIR}/README.md`,
            `${this.appDetails.artifactid}/README.md`
        );

        this.template(
            `${constants.genconstants.SPRINGBOOT_TEMPLATES_DIR}/src/main/resources/META-INF/kmodule.xml`,
            `${this.appDetails.artifactid}/src/main/resources/META-INF/kmodule.xml`
        );

        this.template(
            `${constants.genconstants.SPRINGBOOT_TEMPLATES_DIR}/src/main/resources/application.properties.ejs`,
            `${this.appDetails.artifactid}/src/main/resources/application.properties`
        );

        this.template(
            `${constants.genconstants.SPRINGBOOT_TEMPLATES_DIR}/src/main/resources/test-process.bpmn2.ejs`,
            `${this.appDetails.artifactid}/src/main/resources/test-process.bpmn2`
        );

        this.template(
            `${constants.genconstants.SPRINGBOOT_TEMPLATES_DIR}/src/main/java/Application.java.ejs`,
            `${this.appDetails.artifactid}/src/main/java/Application.java`
        );
    }

    writing() {
        if (this.appDetails.apptype === 'quarkus') {
            this._writingquarkus();
        } else {
            this._writingspringboot();
        }
    }

    end() {
        this.log('End of jhipster-kaas generator');
    }
};

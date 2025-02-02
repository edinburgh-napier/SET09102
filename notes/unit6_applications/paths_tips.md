---
title: Environments Tips
parent: Environments
has_children: false
nav_exclude: true
nav_order: 1
---

# Practical tips for working with multiple environments

1 Understand the Purpose of Each Environment

    > Development is for coding and initial testing, test (or staging) is for QA and user acceptance 
    > testing, and production is the live environment where end-users interact with the application. 
    > Understanding the unique role of each environment will help you make decisions about what kinds of 
    > changes and tests are appropriate in each one.

2. Use Environment-Specific Configurations

    > Ensure that configuration files, such as database connections, API keys, and URLs, are specific to 
    > each environment. Avoid hardcoding these values in your code. Instead, use environment variables or 
    > configuration files that vary per environment to prevent issues, like connecting to the wrong database.

3. Automate Deployments and Reduce Manual Steps

    > Manual deployments can lead to errors, especially in multiple environments. Use automation tools 
    > like GitHub Actions, Jenkins, or Docker to create repeatable and reliable deployment pipelines. 
    > Automation makes it easy to push code to different environments and reduces the chance of human error.

4. Use Environment-Specific Branches and Pull Requests

    > In projects with multiple environments, use branching strategies that align with each environment. 
    > For instance, the main branch may align with production, while dev could represent the development 
    > environment. Creating separate branches makes it easier to control what goes where and to ensure only 
    > tested and approved code reaches production.

5. Use Clear Naming for Environment Variables

    > Clearly label environment variables to avoid confusion. For example, use DATABASE_URL_DEV, 
    > DATABASE_URL_TEST, and DATABASE_URL_PROD for different environments. Clear names help prevent 
    > accidental mistakes, like using the wrong database.

6. Add Logging and Monitoring for All Environments

    > Include logging and monitoring tools (such as LogRocket, Datadog, or New Relic) across all environments 
    > to help you identify and troubleshoot issues. Development logs can help debug, while production logs 
    > provide insights into user behaviour and help detect errors or performance issues.

7. Avoid Testing Directly in Production

    > Use the test or staging environment to verify new features and fixes before deploying to production. 
    > Testing in production is risky and can lead to user-facing errors. If you must test in production, use 
    > a safe method like feature toggles or A/B testing to limit exposure.

8. Set Up Automated Tests for Each Environment

    > Ensure that automated tests run before deploying code to the next environment in the pipeline. For 
    > example, unit tests might run in development, integration tests in test/staging, and smoke tests in 
    > production. Automated tests help maintain quality and prevent bugs from progressing through environments.

9. Use Feature Toggles for Gradual Rollouts

    > Feature toggles allow you to enable or disable new features without deploying new code. This is useful 
    > for rolling out new features gradually in production, as it lets you test features with a small group 
    > before a full release. Libraries like LaunchDarkly and Unleash support feature toggles.

10. Back Up Databases Regularly in All Environments

    > Data loss can happen unexpectedly, even in non-production environments. Set up regular backups for 
    > databases, especially in test and production environments, to recover easily in case of an error or 
    > accidental data deletion.

11. Limit Access to Sensitive Environments

    > Limit access to production and sensitive data to reduce the chance of accidental or unauthorised 
    > changes. Grant team members the access they need to perform their work while keeping sensitive 
    > environments restricted to essential personnel.

12. Double-Check Configuration Before Deploying

    > Before pushing changes to a new environment, double-check configuration settings, dependencies, and 
    > environment-specific values. Verifying configurations can prevent issues such as pointing to the wrong 
    > database or API endpoint after deployment.

13. Use Color-Coding or Clear Labels in the UI

    > For applications that you interact with in multiple environments, add color-coded labels (e.g., green 
    > for development, yellow for test, red for production) to clearly distinguish which environment you’re 
    > working in. This helps avoid accidental changes in the wrong environment.

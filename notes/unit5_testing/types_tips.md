---
title: Testing Pitfalls
parent: Types of Testing
has_children: false
nav_exclude: true
nav_order: 1
---

# Pitfalls to Avoid with Integration, End-to-End and Regression Tests

1. Over-Testing and Under-Testing Components

    > Inexperienced developers may either test too many details in integration and E2E tests or focus 
    > too narrowly, missing key interactions. Over-testing occurs when developers try to cover every 
    > small detail in high-level tests, leading to redundant or overly complex tests. This slows down 
    > test execution and creates maintenance overhead. Conversely, under-testing leaves gaps, 
    > especially in critical workflows where interactions matter most. Focusing on key interactions 
    > and core user paths is a better approach, balancing coverage with simplicity.

2. Relying on Real External Services for Integration Tests

    > New developers sometimes use live services for integration tests, thinking this is closer to 
    > “real-world” testing. However, real external services can be unreliable, slow, or expensive to 
    > access during testing. This setup increases test execution time and makes tests prone to 
    > failures from issues beyond the developer’s control (e.g., network problems, rate limits). 
    > Using mocks, stubs, or a dedicated test environment for external dependencies can make tests 
    > faster, more reliable, and less expensive to run.

3. Writing Fragile E2E Tests That Break with Minor UI Changes

    > E2E tests are often vulnerable to small changes in the UI, such as updates to element IDs, 
    > layout adjustments, or button text changes. Novice developers sometimes write tests that 
    > depend heavily on specific UI selectors or hardcoded text, which leads to frequent failures 
    > when the UI is updated. Writing robust E2E tests that rely on stable element attributes, such 
    > as data attributes, and using reusable page objects or helper functions can reduce this fragility.

4. Creating Long, Complex Test Flows in E2E Tests

    > Trying to cover multiple workflows in a single E2E test is a common mistake. Long, complex 
    > tests are harder to debug and often fail without providing clear information on the issue. 
    > For instance, a single test that covers user registration, login, and profile updates is 
    > complex and prone to multiple points of failure. Breaking down tests into smaller, focused 
    > scenarios (e.g., separate tests for registration and login) makes them easier to maintain and 
    > debug, and improves the clarity of test results.

5. Neglecting Test Maintenance in Regression Testing

    > Regression test suites can become large and unwieldy over time. Inexperienced developers may 
    > assume that once a regression test is written, it never needs to be revisited. However, as 
    > the codebase evolves, certain tests may become outdated, redundant, or irrelevant, leading 
    > to increased execution time and noise in test results. Regularly reviewing and updating the 
    > regression test suite—removing or updating obsolete tests—keeps it efficient and focused on 
    > relevant functionality.

6. Ignoring Test Data Isolation and Reusability

    > When tests share data (e.g., using the same user account for multiple tests) or don’t clean up 
    > after themselves, they can create conflicts, especially in integration and E2E tests. This can 
    > lead to intermittent failures or data corruption, making test results unreliable. Each test 
    > should ideally run independently with isolated data. Using unique test data, setting up and 
    > tearing down test data between runs, or working with database transactions that rollback data 
    > are best practices to maintain test isolation.

7. Assuming Automated Regression Testing Catches Everything

    > Relying solely on automated regression tests to catch all bugs is another common misconception. 
    > While regression tests are critical, they cannot cover every possible scenario or interaction. 
    > Inexperienced developers may not realise that manual exploratory testing, code reviews, and 
    > integration tests are also necessary to uncover edge cases and complex interactions that 
    > automated tests might miss.

8. Not Addressing Flaky Tests Promptly

    > Flaky tests—tests that sometimes pass and sometimes fail without code changes—are common in 
    > E2E and integration testing. Novice developers might ignore these, leading to a lack of trust 
    > in the test suite. Flaky tests can arise from timing issues, network delays, or dependencies 
    > on external services. Addressing flakiness by adding wait conditions, improving test data 
    > stability, or mocking unpredictable dependencies is essential to maintaining a reliable test 
    > suite.

9. Skipping CI/CD Integration for Automated Tests

    > Many inexperienced developers run tests manually, which can lead to inconsistent testing and 
    > missed regressions. Failing to integrate tests into a Continuous Integration/Continuous 
    > Deployment (CI/CD) pipeline means tests may not run automatically with every code push, 
    > increasing the risk of undetected issues. Setting up automated test runs in the CI/CD 
    > pipeline (e.g., using GitHub Actions or Jenkins) ensures that tests are consistently run 
    > and issues are detected early.

10. Writing Tests That Are Dependent on Specific Environments

    > Tests that work only in specific environments (e.g., tests that rely on local paths, 
    > specific databases, or custom environment variables) are difficult to scale and automate. 
    > Novice developers may write tests that pass only in the local environment but fail in 
    > staging or CI environments. Writing environment-agnostic tests by using environment 
    > variables, configuring paths dynamically, and avoiding hardcoded dependencies makes tests 
    > more portable and reliable across different stages of deployment.

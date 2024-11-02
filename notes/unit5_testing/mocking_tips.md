---
title: Mocking Tips
parent: Mocking
has_children: false
nav_exclude: true
nav_order: 1
---

# Practical tips for using mocking in unit tests

1. Mock Only External Dependencies

    > Mocks are best used for external dependencies that are outside the scope of the test, such 
    > as databases, APIs, file systems, or external services. Avoid mocking code within the class 
    > being tested—focus on dependencies instead. This keeps your tests simple and focused on 
    > verifying your own code.

2. Use a Mocking Framework

    > Mocking frameworks (like [Moq](https://github.com/devlooped/moq) in C#, 
    > [Mockito](https://site.mockito.org/ in Java, or 
    > [unittest.mock](https://docs.python.org/3/library/unittest.mock.html) in Python) simplify 
    > creating and configuring mocks, allowing you to focus more on writing tests than on manually 
    > creating mock classes. Take time to learn the basics of a mocking library for your language, 
    > as it will make the mocking process much faster and more reliable.

3. Set Clear Expectations for Mocks

    > When setting up a mock, specify exactly what you expect it to do in the test. For example, if 
    > you expect a method to return a certain value or to be called a specific number of times, 
    > define this behaviour explicitly. This ensures that the test is checking exactly what you 
    > intend to verify.

4. Keep Mocks Simple and Relevant

    > Avoid over-configuring mocks with unnecessary behaviour. Only set up the behaviours that are 
    > essential for the test. This keeps tests clean and ensures they remain focused on the behaviour 
    > of the code you are testing rather than on the details of the mock itself.

5. Verify Mock Interactions to Ensure Correct Behaviour

    > Use the mock’s verification capabilities to check that methods were called as expected. For 
    > example, verify that a method was called once, or with specific parameters, to confirm that 
    > your code is interacting correctly with the dependency. This is especially helpful when 
    > testing methods with side effects or multiple interactions.

6. Handle Edge Cases by Configuring Mocks to Throw Exceptions

    > To test how your code handles errors, configure mocks to throw exceptions. For example, if 
    > testing a network call that might fail, set up the mock to throw an exception to verify that 
    > your code correctly handles it. This ensures your code is resilient to failures in real-world 
    > scenarios.

7. Use Mocks Sparingly and Where Necessary

    > Avoid overusing mocks. For instance, if a dependency is simple (like a small helper class), 
    > you may not need a mock—use the actual class instead. Too many mocks can make tests complex 
    > and harder to understand. Focus on mocking only where a dependency is heavy, slow, or external.

8. Organise Tests Using the AAA Pattern (Arrange, Act, Assert)

    > Structure your tests using the AAA pattern: Arrange (set up mocks and test data), Act (run 
    > the method you’re testing), and Assert (verify results and mock interactions). This structure 
    > makes your tests easier to read and understand.

9. Use Mock Return Values for Predictability

    > When configuring mock methods to return specific values, keep the responses simple and 
    > predictable. For instance, if a mock database should return a list of users, use a predefined 
    > list of test users. This predictability ensures tests are stable and free from randomness.

10. Avoid Mocking Too Many Layers

    > When mocking layers of dependencies, try not to mock every layer if it’s unnecessary. For 
    > instance, instead of mocking all data access methods, you can mock only the service that 
    > calls the database, keeping the test focused on one level and reducing complexity.

11. Regularly Run and Refactor Tests with Mocks

    > Run tests frequently to catch issues early. If mocks are too complex or make the test harder 
    > to maintain, consider refactoring to simplify them. Ensure that the use of mocks aligns with 
    > your test’s goals and makes your tests more reliable, not more complicated.

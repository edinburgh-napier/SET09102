---
title: Unit Tests Tips
parent: Unit Tests
has_children: false
nav_exclude: true
nav_order: 1
---

# Practical tips for writing effective unit tests

1. Start Small and Test One Thing at a Time

    > Each unit test should focus on testing one specific piece of functionality. Keep your tests 
    > small, clear, and targeted. For example, if you’re testing a method that calculates the sum of 
    > two numbers, write a test that focuses only on verifying that calculation.

2. Use Descriptive Test Names

    > Name your tests in a way that clearly describes what they’re testing. This makes it easy to 
    > understand what each test does and why it might fail. A common approach is to use a naming 
    > convention like MethodName_StateUnderTest_ExpectedBehaviour 
    > (e.g., Add_TwoPositiveNumbers_ReturnsSum).

3. Focus on Testing Behaviour, Not Implementation

    > Write tests that verify what the method is supposed to do, not how it does it. Avoid testing 
    > private methods or internal workings; instead, focus on inputs and expected outputs. This makes 
    > your tests more resilient to changes in the underlying code.

4. Use Mocks and Stubs for Dependencies

    > When testing classes that depend on external services, databases, or complex objects, use 
    > mocking libraries (such as Moq in C#) to simulate these dependencies. This allows you to test 
    > the behaviour of your class in isolation without setting up external systems.

5. Write Tests Before Fixing Bugs or Adding Features

    > Following Test-Driven Development (TDD) principles, consider writing a failing test that 
    > represents the bug or new feature you want to address. This helps confirm that the bug is fixed 
    > or the feature works as expected once you make the changes.

6. Validate Edge Cases

    > Don’t just test the "happy path." Consider edge cases, such as empty inputs, null values, or 
    > extremely large numbers. Handling edge cases helps make your code more robust and reduces the 
    > likelihood of unexpected failures.

7. Use Assertions Effectively

    > Use assertions to validate the results of your tests. Assertions should clearly define what you 
    > expect to happen in the test. For instance, Assert.AreEqual(expected, actual) is a common way 
    > to check if the result matches your expectations.

8. Aim for Independence

    > Each unit test should be independent of other tests. A test should not depend on the result of 
    > a previous test, nor should it alter any shared state that could affect subsequent tests. If 
    > you need shared setup, consider using setup methods that reset the state before each test.

9. Run Tests Frequently

    > Run your tests often, especially as you make changes to the code. Regularly running tests helps 
    > catch issues early, making them easier to debug and fix. Integrate tests into your CI/CD pipeline 
    > to ensure they’re run automatically on code pushes.

10. Keep Tests Simple and Readable

    > Write tests that are easy to read and understand, even at a glance. Avoid complex logic in 
    > your tests, as this can make them harder to maintain and debug. Simple, clear tests make it 
    > easier to identify why a test failed.

11. Use AAA (Arrange, Act, Assert) Structure

    > Follow the AAA pattern to organise your tests: Arrange (set up necessary data and objects), 
    > Act (execute the code you’re testing), and Assert (verify the results). This structure helps 
    > keep tests organised and easy to follow.

12. Don’t Aim for 100% Coverage as an Absolute Goal

    > Code coverage is useful, but high coverage alone doesn’t guarantee quality. Focus on covering 
    > important functionality and edge cases. Coverage tools can help you identify untested code, but 
    > prioritise meaningful tests over arbitrary coverage percentages.

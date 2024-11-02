---
title: Test-Driven Development
parent: Testing
has_children: true
has_toc: false
nav_order: 3
mermaid: true
---

# Test-Driven Development

Over time, testing has become increasingly formalised as part of the development process. In
the past, a lot of faulty code was released because developers were under pressure to complete
their projects by a deadline and testing seemed to be a supplementary activity that could be
cut from the project if necessary. The waterfall development lifecycle seemed to encourage
this way of thinking because it postponed testing until the last stage of a project. (This
was not actually true of the waterfall approach, but that was how it was perceived).

The ultimate turnaround came with the introduction in 1999 of *test-driven development* (TDD)
as part of [Extreme Programming](https://en.wikipedia.org/wiki/Extreme_programming). 
Kent Beck, one of the signatories to the Agile Manifesto, published a
[book](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923574478202111)
on the topic in 2003.

There are two main principles behind TDD. The first is that tests are written first and then
minimally sufficient code is written to allow the test to pass. The process the continues in
an iterative fashion until the application meets its acceptance criteria. The second principle
is that code is continuously refactored as the development proceeds to maintain a clear and
simple structure. The process is visualised in Fig. 3.

``` mermaid
flowchart LR
    node1([Write unit test])
    node2([Write minimal code])
    decision1{Does the<br/>test pass?}
    decision2{Refactoring<br/>required?}

    node1 -- run --> decision1
    decision1 -- yes --> decision2
    node2 -- run --> decision1
    decision1 -- no --> node2
    decision2 -- no --> node1
    decision2 -- yes --> node2
```
*Fig. 3: Test-driven development*

In TDD, tests act as a safety net, alerting developers if changes break existing functionality. 
This makes TDD ideal for complex or evolving projects, as it ensures each feature or function is 
thoroughly verified and provides immediate feedback if regressions occur. The test-first approach 
also enforces simpler, more modular designs since developers are required to think carefully about 
the behavior of each unit of code.

## The Red-Green-Refactor Cycle

TDD follows a simple, iterative process known as the Red-Green-Refactor cycle:

* **Red**: Write a test that defines a small piece of desired functionality, but which will fail 
  because the functionality hasn’t been implemented yet. The test’s failure (the "red" state) 
  confirms that the feature is missing, ensuring the test is correctly set up.
* **Green**: Write just enough code to make the test pass. The goal here is not to build a complete, 
  polished solution but to satisfy the test’s conditions. Once the test passes (the "green" state), 
  you know the functionality works as specified.
* **Refactor**: With a passing test, you can now refactor the code to improve its structure, 
  readability, or performance while ensuring the test still passes. Refactoring at this stage 
  helps you write clean, maintainable code without altering behavior, as the test will confirm 
  if any issues arise from the changes.

This cycle repeats for each new piece of functionality, allowing developers to build features 
incrementally and confidently. The Red-Green-Refactor process makes TDD a disciplined, test-centric 
approach that fosters both robust code and thoughtful design.

## A TDD Example

To illustrate TDD, let’s create a simple `Calculator` class that can add two numbers. We’ll use TDD 
to build this class incrementally.

**Step 1: Red - Write a Failing Test**

First, we write a test that will fail because the `Calculator` class and its `Add` method don’t exist 
yet.

```c#
using Xunit;

public class CalculatorTests
{
    [Fact]
    public void Add_ReturnsSumOfTwoNumbers()
    {
        // Arrange
        var calculator = new Calculator();

        // Act
        var result = calculator.Add(2, 3);

        // Assert
        Assert.Equal(5, result);
    }
}
```

In this test, we create a `Calculator` instance and call its `Add` method, expecting the result 
to be the sum of 2 and 3, which is 5. At this stage, since the `Calculator` class doesn’t exist, 
this test will fail.

**Step 2: Green - Write Code to Pass the Test**

Next, we create a minimal `Calculator` class and implement the `Add` method with enough 
functionality to make the test pass.

```c#
public class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }
}
```

With this simple code, the `Add` method adds two integers and returns the result. When we run the 
test now, it should pass because the `Add` method returns the correct sum.

**Step 3: Refactor - Improve Code Without Changing Behavior**

At this stage, we examine the code to see if any improvements are needed. In this case, the code 
is already simple and meets the requirement, so no refactoring may be necessary. However, in a 
more complex scenario, this step could involve improving variable names, breaking down complex 
methods, or optimizing logic, all while ensuring that the test still passes.

After the initial test, we can add new tests for additional functionality using the same 
Red-Green-Refactor process. For example, if we wanted to add subtraction, we would first write 
a test for Subtract, watch it fail, implement Subtract to pass the test, and then refactor if 
needed.

## Benefits of TDD

Test-Driven Development (TDD) offers several significant benefits for developers and teams. First, 
TDD creates built-in documentation for the codebase. Each test serves as a form of documentation, 
demonstrating how each piece of functionality is supposed to work and allowing future developers 
to understand the intended behavior without needing extensive external documentation. Additionally, 
TDD enables early bug detection by ensuring that tests are in place before code is written. This 
approach helps developers identify and fix bugs early in the development process, reducing the 
risk of costly errors in production.

Another major advantage of TDD is that it builds confidence in refactoring. Since the tests provide 
a safety net, developers can refactor their code to improve its structure, readability, or 
performance without fear of breaking existing functionality. If a refactor causes a test to fail, 
developers know immediately, allowing them to maintain quality while making necessary improvements. 
Furthermore, TDD encourages a focus on requirements, as writing tests first pushes developers to 
think about what the code should accomplish rather than diving straight into implementation. This 
focus on meeting specific requirements leads to more purposeful, streamlined code and reduces the 
risk of building unnecessary features. Together, these benefits make TDD a powerful practice for 
developing high-quality, maintainable software.

## Critique of TDD

While TDD is widely recognized for its benefits, it also presents several challenges and 
limitations that can make it difficult to adopt or fully implement. One of the main critiques of 
TDD is that it requires a significant shift in mindset and workflow for developers. Writing tests 
before code can feel unnatural, especially for developers accustomed to traditional development 
methods, where code is implemented first and then tested. This shift can slow down initial 
development, as developers must pause to define test cases before any functionality is written, 
which can seem counterintuitive, particularly under tight deadlines.

Moreover, TDD can be time-consuming, especially in complex systems with intricate dependencies or 
components that are difficult to isolate for unit testing. Creating mocks and stubs for 
dependencies requires additional setup, and this can become especially challenging in systems 
involving database access, external APIs, or other external resources. For these reasons, TDD 
often requires a well-structured codebase that facilitates dependency injection and modular 
design, which isn’t always feasible in legacy systems or when working with rigid architectures.

Maintaining TDD can also be challenging as requirements evolve. Because TDD tests are written to 
meet specific requirements defined at the start, changes in requirements necessitate reworking 
both the tests and the underlying code, which can double the effort. If requirements are frequently 
changing, developers may find themselves spending considerable time rewriting tests, which can 
create frustration and slow down development. This maintenance burden is often cited as a reason 
why some teams struggle to sustain TDD practices over the long term.

In addition, TDD’s reliance on unit tests can sometimes result in an overly narrow focus on 
isolated functionality, leading to blind spots regarding how different components interact. While 
TDD is excellent for testing individual units, it doesn’t cover integration or system-level 
interactions, which are essential for understanding how components work together in production. 
For this reason, TDD often needs to be supplemented with additional integration, system, and 
end-to-end tests, adding to the testing load.

Lastly, TDD is not universally suitable for all types of projects. In exploratory or 
research-based projects, where the goals or requirements are ambiguous, it can be difficult to 
define specific tests upfront. In such cases, TDD may hinder progress by enforcing a structure 
that doesn’t align with the project’s iterative or discovery-based nature.

In summary, while TDD has many advantages, it is not a universal solution. Its effectiveness 
depends on project type, team expertise, codebase structure, and stability of requirements. When 
these factors align, TDD can significantly improve code quality, but in less ideal circumstances, 
it can add complexity, increase maintenance, and detract from agile responsiveness. For teams 
considering TDD, understanding these limitations and balancing it with other testing strategies 
is essential for making the most of its benefits.

<iframe width="560" height="315" src="https://www.youtube.com/embed/IN9lftH0cJc?si=VWR8PGcFPjSIG4p8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Practical tips for getting started with TDD](tdd_tips)

## Further reading

* Alls ([2020](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923706264502111)) Chapter 6. 
* [TDD vs BDD vs ATDD and other Agile development techniques](https://www.techtarget.com/searchsoftwarequality/tip/TDD-vs-BDD-vs-ATDD-and-other-Agile-development-techniques)
* Test-driven development [(Beck, 2003)](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923574478202111)

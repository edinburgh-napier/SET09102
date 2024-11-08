---
title: Internal Quality
parent: Metrics
has_children: true
has_toc: false
nav_order: 2
mermaid: true
---

# Internal Quality

When assessing internal code quality, it’s helpful to understand both _quantitative_ and _qualitative_ 
criteria. Quantitative criteria include metrics that can be measured numerically, like cyclomatic 
complexity or test coverage. These metrics are often obtained through automated tools and help give 
objective insights into the structure and maintainability of the code. Qualitative criteria, on the 
other hand, focus on subjective aspects of code quality, such as readability, modularity, and adherence 
to coding standards. These are best assessed through code reviews and developer judgment, focusing on 
how intuitive and well-organised the code appears to be for others on the team. Combining quantitative 
and qualitative assessments provides a well-rounded view of internal code quality. 

## Cyclomatic complexity

Cyclomatic complexity is a quantitative software metric based on the number of independent paths through 
the code, where a higher score indicates more complexity. High complexity makes code harder to understand, 
test, and maintain. Tools like [SonarQube](https://youtu.be/xeTwG9XFFTE?si=c2TcqvymaKsSVMRH) or 
[CodeClimate](https://github.com/codeclimate/codeclimate) can measure this automatically, flagging 
functions with excessive complexity for refactoring to improve simplicity and readability.

Cyclomatic complexity was defined by [Thomas J. McCabe](https://doi.org/10.1109/TSE.1976.233837) in 1976, 
and calculates the number of independent paths using the formula

$$
M = E - N + 2P
$$

where

* E = the number of edges in the control flow graph
* N = the number of nodes
* P = the number of connected components (typically 1 for a single program)
{: .equation-symbols}

There is no specific value of cyclomatic complexity that can be used as an upper limit in all cases. 
However, [NIST235](http://www.mccabe.com/pdf/mccabe-nist235r.pdf) suggests that a limit of 10 is a 
good starting point:

> The precise number to use as a limit, however, remains somewhat controversial. The original limit 
> of 10 as proposed by McCabe has significant supporting evidence, but limits as high as 15 have 
> been used successfully as well. Limits over 10 should be reserved for projects that have several 
> operational advantages over typical projects, for example experienced staff, formal design, a 
> modern programming language, structured programming, code walkthroughs, and a comprehensive test 
> plan. In other words, an organisation can pick a complexity limit greater than 10, but only if 
> it is sure it knows what it is doing and is willing to devote the additional testing effort 
> required by more complex modules.
> 
> [NIST235](http://www.mccabe.com/pdf/mccabe-nist235r.pdf)

## Cognitive complexity

While cyclomatic complexity accurately calculates the minimum number of test cases required for 
full test coverage, it is not necessarily a good indicator of understandability. Methods with equal 
cyclomatic complexity scores are not necessarily equally difficult to maintain and it therefore 
over-values some structures and under-values others. Because it was designed for use on Fortran 
programs in 1976, cyclomatic complexity does not take account of more recent language structures 
such as try/catch and lambdas.

In response to the limitations of cyclomatic complexity, the new metric of _cognitive complexity_ 
was formulated as a way of calculating complexity scores that more accurately reflect methods’ 
relative understandability. It attempts to reflect perceived complexity rather than representing 
it purely as a mathematical derivation. The details of how it works are presented in a 
[SonarQube white paper](https://www.sonarsource.com/resources/cognitive-complexity/) which offers 
the following simple example that illustrates the difference between cyclomatic and cognitive 
complexity scores.


``` c#
// METHOD A
// 
// Cyclomatic complexity = 4
// Cognitive complexity = 7

int sumOfPrimes(int max) {
  int total = 0;
  OUT: for (int i = 1; i <= max; ++i) {
    for (int j = 2; j < i; ++j) {
      if (i % j == 0) {
        continue OUT;
      }
    }
    total += i;
  }
  return total;
}
```
{: .side-by-side}



``` c#
// METHOD B
//
// Cyclomatic complexity = 4
// Cognitive complexity = 1

String getWords(int number) {
  switch (number) {
    case 1:
      return "one";
    case 2:
      return "a couple";
    case 3:
      return "a few";
    default:
      return "lots";
  }
}
```
{: .side-by-side}

The code blocks above show two methods, A and B, with their cyclomatic and cognitive complexity
scores. While the cyclomatic complexity scores are the same, cognitive complexity is intuitively the 
better measure in this simple case.

## Maintainability Index

The maintainability index is a composite quantitative metric derived from factors like code complexity, 
lines of code, and comments. It provides an overall indication of maintainability on a scale, usually from 
0 to 100. Tools like Visual Studio’s code analysis or CodeClimate generate maintainability scores, helping 
teams monitor and improve the codebase’s long-term health.

The standard formula for calculating the Maintainability Index is:

$$MI = 171 − 5.2 × ln(HV) − 0.23 × CC − 16.2 × ln(LOC)$$

where:

* HV = [Halstead Volume](https://en.wikipedia.org/wiki/Halstead_complexity_measures), a measure of code 
  complexity based on operators and operands.
* CC = Cyclomatic Complexity, a metric for the number of linearly independent paths through the code.
* LOC = Lines of Code, the count of lines in the codebase, which reflects code size and readability.

The MI score is typically normalised to a range of 0 to 100, where higher values (around 85–100) indicate 
better maintainability and lower values (below 50) suggest that the code is harder to maintain and may 
benefit from refactoring. In some tools, the formula also includes a factor for code comments, which can slightly improve the 
MI if the code is well-documented.

## Test Coverage

Also a quantitative metric, test coverage measures the percentage of code covered by automated tests. 
High test coverage means that a larger portion of code is verified to work as intended, reducing the 
likelihood of bugs. Tools like [JaCoCo](https://github.com/jacoco/jacoco?tab=readme-ov-file) (Java), 
[Istanbul](https://istanbul.js.org/) (JavaScript), and 
[Coverlet](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-code-coverage?tabs=linux) 
(.NET) generate test coverage reports. While high coverage doesn’t guarantee quality, it provides 
confidence when paired with meaningful tests for different scenarios.

While test coverage is commonly used as a code quality metric, relying on it as a primary indicator has 
several limitations. Although high test coverage indicates that many lines of code are executed during 
tests, this doesn’t guarantee that the tests are effective or that the code quality is high. Here are 
some key critiques of using test coverage as a code quality metric:

1. **Coverage Doesn’t Equal Quality**
   High test coverage only shows that the code has been executed during tests, not that it has been 
   thoroughly tested for correctness, edge cases, or performance issues. Poorly designed tests may 
   achieve high coverage without actually verifying that the code behaves as expected. This can lead to 
   a false sense of security, where teams assume high-quality code based solely on coverage percentage.

2. **Encourages Focus on Quantity Over Quality**

    When teams focus too heavily on coverage goals, they may prioritise hitting coverage targets rather 
    than writing meaningful, high-quality tests. Developers may write superficial or redundant tests just 
    to increase coverage metrics, without thoroughly examining edge cases, error handling, or unusual 
    inputs. This can lead to inflated coverage without genuine code quality improvement.

3. **Ignores Logic and Branch Complexity**

    Basic test coverage metrics like line or statement coverage don’t account for more complex control 
    flows or conditional logic. For example, testing a single execution path in a complex if-else block 
    may achieve line coverage but not verify all possible branches. More advanced metrics, like branch or 
    path coverage, partially address this but still don’t fully ensure code robustness.

4. **Overlooks Code Readability and Maintainability**

    Test coverage provides no insight into internal code quality attributes like readability, modularity, 
    or maintainability. Code could be well-covered yet still difficult to understand, heavily coupled, or 
    challenging to extend. In such cases, high coverage might mask technical debt or poor design choices, 
    making it harder to identify code that may need refactoring.

5. **Doesn’t Address Test Quality or Accuracy**

    Test coverage metrics don’t account for the accuracy or relevance of the tests themselves. High 
    coverage may result from tests that pass but don’t check for correct outputs or fail to catch 
    potential issues. For instance, a test that only verifies that a method executes without exceptions 
    could pass without ensuring that the output meets specifications.

6. **Can Encourage Poor Testing Practices**

    Focusing on coverage targets can encourage poor practices like testing implementation details rather 
    than behaviour. Tests that are tightly coupled to internal implementation details can be fragile, 
    requiring updates with every minor code change, even if functionality hasn’t changed. This can make 
    testing cumbersome and reduce the productivity of developers.

7. **May Not Reflect Business-Critical Coverage**

    Coverage metrics treat all lines of code equally, without distinguishing between high-importance, 
    business-critical code and auxiliary code. For example, testing a utility function thoroughly may be 
    less valuable than testing key business logic. Coverage metrics alone don’t capture the criticality 
    of different parts of the codebase, potentially misrepresenting overall code quality.

8. **Neglects Non-Code Quality Aspects**

    Test coverage doesn’t account for other aspects of code quality, such as security, scalability, 
    or performance. High coverage may still leave vulnerabilities untested or areas of code that 
    perform poorly under load unaddressed. Focusing solely on coverage risks neglecting these essential 
    quality attributes.

To get the most from test coverage as a metric, it’s important to combine it with other quality 
indicators, such as cyclomatic complexity, code reviews, code maintainability, and functional testing 
metrics. Aiming for meaningful coverage that addresses critical paths, edge cases, and core functionality 
is more beneficial than striving for a high percentage alone. Additionally, teams can emphasise branch 
and path coverage over simple line coverage for areas of complex logic, helping to ensure thorough testing.

## Depth of Inheritance

Depth of Inheritance (DOI) is a quantitative code quality metric used in object-oriented programming to 
measure the depth of the inheritance hierarchy for a class within a codebase. This metric calculates how 
many layers or levels of inheritance exist from a given class back to the root (or base) class. For example, 
if a class inherits from a superclass, which in turn inherits from another superclass, the DOI would be 3 for 
the bottom-level class. In languages that support single inheritance, this is simply the chain of classes from 
the subclass to the highest ancestor. In languages that support multiple inheritance, DOI is typically 
calculated as the longest path back to any root class.

A higher DOI indicates a deeper inheritance hierarchy, which can make it harder for developers to understand 
how a class functions. When multiple layers of inheritance exist, it’s more challenging to trace behaviour back 
to the root class, particularly if methods or properties are overridden at various levels. Lower DOI values tend 
to make code easier to understand and modify.

Deep inheritance structures can make code more brittle and tightly coupled. The code can become inflexible and
difficult to maintain since there is a higher cognitive load for the developer. There is no strict threshold 
for “good” or “bad” DOI, but generally, a DOI between 1 and 4 is considered manageable in most systems. 
Shallow hierarchies (DOI ≤ 2) are often preferred, as they strike a balance between code reuse and simplicity.

Many design guidelines recommend composition over inheritance, especially in cases where a deep inheritance 
hierarchy would be required. Using composition, where objects contain instances of other classes instead of 
inheriting from them, can reduce DOI and improve flexibility, allowing behaviour to be easily modified or 
extended without changing a class’s inheritance chain.

While DOI is a useful indicator of inheritance complexity, it should be evaluated alongside other metrics, 
such as Cyclomatic Complexity. High DOI alone doesn’t necessarily mean poor design, particularly if the 
hierarchy is logical and well-documented. Additionally, some patterns, like the Template Method or Factory 
Method, naturally involve deeper hierarchies and may still produce high-quality, maintainable code.

## Class Coupling

Class coupling is a quantitative metric that measures the degree of dependency between classes within a 
codebase. High coupling occurs when a class is heavily dependent on other classes to perform its functions, 
whereas low coupling indicates that a class operates more independently. In general, lower coupling is 
preferred because it improves maintainability, testability, and reusability, making it easier to modify 
code without impacting multiple parts of a system.

Class coupling is typically measured by counting the number of distinct classes that a class interacts with. 
This includes classes referenced through method calls, inheritance, composition, associations, and field 
declarations. A higher count indicates higher coupling, while a lower count suggests that a class is more 
self-contained.

Lower class coupling improves code maintainability because changes in one class are less likely to affect 
others. When classes have fewer dependencies, modifications or bug fixes in one class are isolated and won’t 
trigger cascading changes. High coupling, on the other hand, creates dependencies that can complicate updates, 
requiring developers to understand multiple interconnected classes before making changes.

Highly coupled classes are harder to test independently because they rely on other classes for their 
functionality. This often necessitates setting up additional dependencies during testing, making unit tests 
more complex and fragile. Low coupling makes it easier to isolate classes, enabling more straightforward and 
reliable unit testing.

Classes with low coupling are typically easier to reuse in other parts of an application or in other projects 
because they’re less dependent on specific classes. High coupling reduces reusability since each reused class 
may require importing all its dependencies, which might not be relevant or useful in different contexts.

When classes have fewer dependencies, the system becomes more flexible. It’s easier to replace one component 
with another, extend functionalities, or add new features without affecting a large portion of the codebase. 
High coupling, however, makes extensibility challenging, as modifications can lead to widespread changes and 
potential errors.

Consider the following example in C#:

```c#
public class OrderService
{
    private readonly PaymentService _paymentService;
    private readonly ShippingService _shippingService;

    public OrderService(PaymentService paymentService, ShippingService shippingService)
    {
        _paymentService = paymentService;
        _shippingService = shippingService;
    }

    public void ProcessOrder(Order order)
    {
        _paymentService.ProcessPayment(order);
        _shippingService.ScheduleDelivery(order);
    }
}
```

In this example, `OrderService` is coupled to `PaymentService` and `ShippingService`. If there are changes in 
either `PaymentService` or `ShippingService`, there may be a need to modify `OrderService` as well. This type of
tight coupling can be avoided by using dependency injection and interface abstraction. 

While class coupling is a valuable indicator of how interdependent classes are, it should be used in 
conjunction with other metrics to get a complete picture of code quality. A low coupling score alone 
doesn’t guarantee good design; some classes naturally require more dependencies due to their role in the 
system, and a certain level of coupling is often necessary in complex applications.

## Lines of Code

Lines of Code (LOC) and Lines of Executable Code (LEC) are internal code quality metrics that measure the 
size of a codebase by counting the number of lines in a program. LOC counts all lines, including comments, 
blank lines, and non-executable statements, while LEC specifically measures lines that can be executed, 
excluding comments and formatting.

As a metric, LOC provides a basic understanding of a project's scale and can indicate potential maintenance 
needs — larger codebases often require more effort to manage. However, LOC lacks nuance and can be misleading: 
a high LOC count doesn’t necessarily mean high functionality, nor does a low count ensure simplicity. LOC 
also doesn’t account for code quality; for instance, well-designed, modular code may have fewer lines than 
complex or redundant code that accomplishes the same task.

LEC offers a slightly refined view by focusing on actual logic in the code, potentially providing more 
insight into the code’s functional complexity. LEC can be helpful for understanding testing needs, as it 
reflects the count of lines that must be covered by tests. However, LEC still has limitations — it doesn’t 
reveal code complexity, readability, or maintainability and can incentivise developers to write less code 
without regard to clarity or best practices.

Overall, while LOC and LEC can provide high-level indicators of project scope, they should be used in 
conjunction with more comprehensive metrics, such as cyclomatic complexity or maintainability index, to 
accurately assess code quality. Relying solely on LOC or LEC may lead to inaccurate conclusions about the 
quality and manageability of a codebase. For example, LOC includes blank lines and comments and is
therefore highly dependent on coding style and standards. LEC on the other hand is just an indication of 
the size of the application. It could be argued that applying the Clean Code approach of maximum extraction 
would tend to increase the overall number of executable lines of code but would at the same time improve
maintainability and reduce cyclomatic complexity. In this instance it is worth bearing in
mind this quote attributed to Bill Gates:

<blockquote class="pretty"><span>
Measuring programming progress by lines of code is like <br/>measuring aircraft building progress by weight.
</span></blockquote>

## Qualitative metrics

While quantitative metrics can be calculated through static code analysis, quantitative metrics require
human judgement. They are best evaluated through code reviews and should be treated as part of the
culture of the development team. Automated linters and formatting tools, like 
[Prettier](https://prettier.io/) (JavaScript) or 
[Black](https://black.readthedocs.io/en/stable/the_black_code_style/current_style.html) (Python), 
can be configured to enforce consistent styling, which helps with some criteria such as readability. 
If you are working with the same language on a regular basis, you will gradually become aware of the 
recognised best practices in that context. They are occasionally documented as is the case for 
[C#](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions) and 
they are often referred to in technical forums such as Stack Overflow. This illustrates the dynamic 
nature of code conventions: an authority such as Microsoft may set out their expectations and update 
them over time as the language itself develops, and in parallel with that, a further set of preferences 
will evolve among the user community.

Some examples of qualitative metrics are summarised in the following table.

| Criterion                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Readability                   | A measure of how easily other developers can understand the code’s purpose and functionality. Code should use descriptive variable, function, and class names, consistent formatting, and concise inline comments where necessary.                                                                                                                                                                                                                        |
| Modularity                    | Measures how well code is divided into discrete, reusable components such as classes, functions, or modules. Modular code is easier to test, maintain, and extend. This can be assessed by reviewing the structure of the code, checking for components that adhere to principles like the Single Responsibility Principle (SRP). Static analysis tools can also analyse dependencies to highlight areas for potential refactoring to improve modularity. |
| Adherence to Coding Standards | Coding standards ensure consistency in style, naming conventions, and organisation. Following standards makes code more predictable and easier for others to navigate. Adherence to standards can be assessed by using linters (e.g., ESLint for JavaScript, Checkstyle for Java) that automatically flag deviations, while code reviews ensure standards are understood and consistently applied.                                                        |
| Code Documentation            | Well-documented code makes it easier for others to understand the purpose and context of each component. Documentation completeness can be assessed by checking that public methods, classes, and modules have clear descriptions. Documentation tools like Javadoc (Java) or Doxygen (C++) enforce consistency by generating documentation directly from comments.                                                                                       |
| Error Handling and Resilience | Code should anticipate and handle potential issues gracefully, ensuring that exceptions are managed effectively and the system fails safely. Error handling can be assessed by reviewing the code to confirm that critical operations include appropriate error management. Static analysis and code reviews help ensure that the code is robust and resilient to unexpected inputs or conditions.                                                        |

Dependency Management is a metric that can be considered both quantitative an qualitative. Minimising 
dependencies between unrelated modules or components reduces code coupling, making the code easier to 
modify or extend. Excessive dependencies are usually flagged by dependency analysis tools (like SonarQube 
or npm’s [depcheck](https://www.npmjs.com/package/depcheck)), which identify unused or redundant 
dependencies. Reviewing dependencies manually is also important for checking that dependencies are 
kept to the essentials, reducing complexity.

## Product Quality Evaluation Method

The Product Quality Evaluation Method (PQEM) [(Falco & Robolio, 2020)](https://doi.org/10.1109/ARGENCON49523.2020.9505405)
is a systematic framework based on [ISO/IEC 25010](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/19n0mho/cdi_bsi_primary_000000000030215101).
It breaks the task of assessing the quality of a software product into five steps as illustrated in Fig. 1.
The approach examins various attributes relevant to a system's performance, reliability, usability, 
maintainability, and other quality criteria using the goal-question-metric (GQM) approach
([Basili, Caldiera & Rombach, 1994](https://www.ecs.csun.edu/~rlingard/COMP587/gqm.pdf)).
The result is a single value between 0 and 1 that represents the overall product quality synthesised
from measurements of selected quality attribute requirements (QARs).

``` mermaid
flowchart LR
    classDef invisible stroke:none,fill:none
    classDef mainStep fill:#dae8fa,stroke:#e6e1e8,fontSize:18px
    classDef subStep fill:#e4fada,stroke:#e6e1e8

    subgraph id2["&nbsp;2. Elicitation of Quality<br/>Attributes Requirements (QARs)"]
        subgraph spacer [ ]
            direction TB
            id2a --> id2b
            id2b --> id2c
            id2c --> id2d
        end
    end

    id1(["&nbsp;1. Product<br/>setup"])
    id2a(["a. Select quality characteristics<br/>and sub-characteristics"])
    id2b(["b. Specify quality attributes<br/>requirements"])
    id2c(["c. Define metrics of each<br/>quality attribute requirement"])
    id2d(["d. Define the<br/>acceptance criteria for the<br/>expected quality level"])
    id3(["&nbsp;3. Measure and test<br/>each quality attribute<br/>requirement"])
    id4(["&nbsp;4. Collect and<br/>synthesise<br/>results"])
    id5(["&nbsp;5. Assessment of<br/>the product<br/>quality level"])

    id1 --> id2
    id2 --> id3
    id3 --> id4
    id4 --> id5

    class spacer invisible
    class id1 mainStep
    class id2 mainStep
    class id3 mainStep
    class id4 mainStep
    class id5 mainStep
    class id2a subStep
    class id2b subStep
    class id2c subStep
    class id2d subStep
```

{: .figcaption}
Fig. 1: PQEM process

PQEM is not widely standardised or universally adopted across the software industry at the moment. While PQEM 
principles — evaluating software quality based on defined quality attributes — are integral to various software 
quality assessment frameworks, PQEM itself does not have the same recognition or formalised use as other 
models like ISO/IEC 25010 (the international standard for software product quality) or 
[Six Sigma](https://www.geeksforgeeks.org/six-sigma-in-software-engineering/) in quality management.

In practice, many organisations adopt custom quality evaluation frameworks inspired by PQEM’s approach, 
tailored to fit their specific needs, industry standards, or project goals. These customised approaches 
often draw from broader industry models, incorporating best practices for measuring maintainability, 
performance, usability, and security, which are central to PQEM. Larger organisations with complex 
software projects may adopt structured evaluation methods similar to PQEM, though they are more likely 
to use ISO standards or popular methodologies like Agile quality metrics, which offer more widespread 
tool support and community best practices.

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Tips for applying internal quality criteria](internal_tips)

## Further reading

* OOCQM: Object Oriented Code Quality Meter ([Shaheen et al., 2019](https://doi.org/10.1007/978-3-030-25225-0_11))

<!-- Mathjax Support -->
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

---
title: Readability
parent: Code Quality
has_children: true
has_toc: false
nav_order: 5
---

# Readability and Documentation

Code readability and documentation are critical aspects of 
writing maintainable and efficient code. Readable code ensures that developers can easily 
understand and work with the codebase, facilitating collaboration, debugging, and future 
enhancements. As code evolves and different team members contribute, clear and readable 
code reduces the likelihood of errors, minimises onboarding time for new developers, and 
enhances the overall productivity of the team. Documentation, both in the form of comments 
and external documentation, provides context, clarifies design decisions, and explains 
complex logic that might not be immediately obvious from the code itself. Together, code 
readability and documentation form the foundation of a well-structured and maintainable 
software system, ensuring long-term project success and smooth handover between team members.

## Clean Code

In software engineering, **_clean code_** refers to writing code that is easy to understand, 
simple to maintain, and free of unnecessary complexity. Coined and popularised by 
Robert C. (Uncle Bob) Martin in his book 
[Clean Code: A Handbook of Agile Software Craftsmanship](https://eu.alma.exlibrisgroup.com/leganto/public/44NAP_INST/citation/6676837810002111?auth=SAML),
clean code principles emphasise readability, clarity, and the importance 
of writing code that is not just functional but also intuitive for other developers (and 
your future self) to read and work with. Martin argues that the true test of clean code 
is whether someone else can easily read, understand, and modify it.

![Fig. 1. Code Quality (<a href="https://xkcd.com/1695">xkcd</a>)](https://imgs.xkcd.com/comics/code_quality_2.png){: standalone #fig1 data-title="Code Quality" }

Clean code is not only about making the software work but also about creating systems that 
are elegant, efficient, and adaptable to change. It advocates for simplicity, avoiding 
duplication, proper naming conventions, and adherence to fundamental design principles 
like Single Responsibility Principle and DRY (Don’t Repeat Yourself). Writing clean code 
results in fewer bugs, reduced technical debt, and more maintainable and scalable software 
systems.

In this set of instructional notes, we will explore key concepts from Bob Martin's clean 
code philosophy, offering practical guidelines for writing clean, readable, and maintainable 
code. These principles form the foundation for building high-quality software that not only 
meets immediate requirements but also supports long-term success by being easier to debug, 
extend, and refactor.

## Self-documenting code

From the clean code perspective, self-documenting code refers to code that is so clear and 
readable that it conveys its intent and functionality without the need for additional 
comments. The idea is that the code itself should be expressive enough to explain what it 
does, why it does it, and how it does it. This reduces the need for comments to explain 
basic logic or structure, allowing developers to focus on understanding the code through 
its inherent clarity. To achieve this, Uncle Bob identifies several important guidelines:

* **Meaningful Names**: The most important aspect of self-documenting code is using 
  meaningful, descriptive names for variables, functions, classes, and methods. Names 
  should clearly convey the purpose and behaviour of the entity they represent. For example, 
  instead of using a generic name like temp, use userInput or calculatedDiscount to 
  describe the actual intent.

* **Small, Focused Functions**: Functions and methods should be small, with each 
  performing a single, well-defined task. This makes the code easier to understand at a 
  glance. A function named CalculateDiscount should only handle discount calculations, 
  not additional tasks like logging or data validation.

* **Code Structure and Organisation**: Properly structured code, with clear separation 
  of concerns and following principles like the Single Responsibility Principle (SRP), is 
  easier to read and reason about. Grouping related logic together and keeping the code 
  modular contributes to its readability.

* **Expressive Control Flow**: Using straightforward control flow with clear conditionals, 
  loops, and well-chosen abstractions helps the reader follow the logic without confusion. 
  For example, instead of using complex, nested conditionals, break down logic into smaller 
  functions with descriptive names.

## Example of Self-Documenting Code

**Before (With Unnecessary Comments):**

``` c#
// This function calculates the total price after applying the discount
public double CalcTotal(double price, double discount)
{
    // Subtract the discount from the original price
    double discountedPrice = price - discount;
    // Return the final price
    return discountedPrice;
}
```

**After (Self-Documenting Code, No Comments Needed):**

``` c#
public double CalculateTotalPrice(double price, double discount)
{
    double discountedPrice = price - discount;
    return discountedPrice;
}
```

In the second version, the method name is clearer (`CalculateTotalPrice`), and the code 
is simple enough that it doesn't require comments to explain its logic. The code itself 
becomes the documentation.

Self-documenting code is central to the clean code philosophy. By writing code that is 
readable, clear, and expressive, you minimise the need for comments and make the code 
easier to maintain in the long run. Clean, self-documenting code is easier for developers 
to understand, reduces technical debt, and ensures that the codebase remains agile and 
adaptable to future changes.

## Clean Code and Software Engineering Principles

In the clean code approach, standard software engineering principles are embodied through 
a strong emphasis on simplicity and minimising dependencies, both of which are key to 
writing maintainable, scalable, and efficient code. Here's how common software engineering 
principles align with the clean code philosophy in these two areas:

### Simplicity

Simplicity is a core tenet of clean code and aligns with several important software 
engineering principles:

* **KISS (Keep It Simple, Stupid)**: The clean code approach strongly emphasises avoiding 
  unnecessary complexity. Simplicity is achieved by breaking down problems into smaller, 
  manageable parts and focusing on writing code that is easy to understand. For example, 
  the clean code practice of writing small, focused functions with clear names directly 
  implements the KISS principle. Each function should do one thing, and do it well, 
  making the code easier to follow and modify.

* **Single Responsibility Principle (SRP)**: Clean code strongly supports the Single 
  Responsibility Principle, which states that a class or function should only have one 
  reason to change. This principle ensures that code is simpler by limiting the scope and 
  responsibility of each component. By following SRP, the code is organised into small, 
  focused units, reducing the likelihood of tangled logic and making it easier to 
  maintain and extend.

* **DRY (Don’t Repeat Yourself)**: The DRY principle is another way in which simplicity 
  is enforced in clean code. Avoiding code duplication reduces complexity because any 
  logic is implemented in one place, preventing the need for repetitive updates or fixes. 
  Clean code encourages developers to abstract common functionality into reusable methods 
  or classes, which minimises redundancy and simplifies maintenance.

* **YAGNI (You Aren't Gonna Need It)**: Clean code also follows the principle of YAGNI, 
  which discourages implementing features or adding code that isn't immediately needed. 
  By keeping the code focused on the current requirements, developers avoid clutter and 
  unnecessary complexity that could make future changes harder to manage.

In the clean code approach, simplicity is about writing code that anyone can easily 
understand without requiring deep context or additional explanation. This results in code 
that is easier to debug, refactor, and extend over time.

### Minimising Dependencies

The clean code approach also stresses the importance of minimising dependencies, which 
aligns with the following software engineering principles:

* **Dependency Inversion Principle (DIP)**: In clean code, the Dependency Inversion 
  Principle is applied to ensure that high-level modules are not dependent on low-level 
  modules, but both depend on abstractions. This means that components are loosely 
  coupled, promoting flexibility and ease of change. Clean code encourages the use of 
  interfaces and dependency injection to reduce direct dependencies between classes, 
  which improves modularity and allows changes to be made to one part of the system 
  without impacting others.

* **Law of Demeter (LoD)**: Clean code also promotes the Law of Demeter, which suggests 
  that an object should only interact with its immediate collaborators and not with the 
  internal details of others. This principle minimises dependencies by preventing deep, 
  complex relationships between classes. By following this guideline, clean code ensures 
  that changes in one part of the system are less likely to cause a ripple effect 
  throughout the codebase, which can reduce bugs and simplify future modifications.

* **Open/Closed Principle (OCP)**: The Open/Closed Principle in clean code ensures that 
  systems are open for extension but closed for modification. By adhering to this 
  principle, developers can minimise dependencies by building modular components that 
  can be extended without changing their core structure. Clean code encourages the use 
  of polymorphism, abstraction, and inheritance to achieve flexibility while reducing 
  the need to modify existing code when introducing new functionality.

* **Encapsulation**: Clean code also prioritises encapsulation, hiding the internal 
  workings of a class or module and exposing only what is necessary. This helps to 
  minimise dependencies because external components are not reliant on the internal 
  implementation details of a class. Changes to the internal implementation can occur 
  without affecting how other parts of the system interact with it.

By minimising dependencies, clean code ensures that systems remain modular and flexible, 
which simplifies maintenance and testing. Code that is heavily dependent on other 
components is fragile and difficult to change without introducing errors. Clean code’s 
emphasis on reducing these dependencies leads to more stable, robust, and adaptable software.

The clean code approach effectively represents standard software engineering principles 
by emphasising simplicity and minimising dependencies. These two key goals are achieved 
through adherence to principles like SRP, DRY, DIP, and KISS, which promote clear, 
understandable, and maintainable code. By focusing on writing code that is simple, 
modular, and loosely coupled, the clean code philosophy aligns with broader software 
engineering best practices to ensure that systems are scalable, adaptable, and easier to 
work with over time.

## Using comments

In clean code, comments should be minimised, but they are not entirely discouraged. 
Instead, they should be used sparingly and strategically. The guiding principle is that 
comments should not explain what the code does—because the code itself should already do 
that — but rather why certain decisions were made, or to explain complex logic that is 
difficult to simplify.

**When to Avoid Comments:**

* **Explaining Basic Logic**: If your code requires comments to explain simple 
  functionality, it's a sign that the code isn't clear enough. For example, commenting 
  on what a method called AddNumbers(int a, int b) does is redundant if the method name 
  is self-explanatory.
* **Obvious Comments**: Avoid comments like // Add 1 to index next to index++;. This does 
  not provide any additional information and adds clutter to the code.
* **Updating**: Comments can become outdated or inaccurate as the code evolves. If the 
  code changes and the comment is not updated, it creates confusion and can mislead other 
  developers.

**When to Use Comments:**

* **Clarifying Intent**: If there’s a complex algorithm or an unusual design decision that 
  might not be immediately apparent, a comment explaining why the decision was made is 
  helpful.
* **Warnings**: Comments can be used to highlight important information, such as 
  performance bottlenecks or potential side effects, which might not be obvious from 
  reading the code alone.
* **Legal or Domain-Specific Context**: In some cases, domain-specific knowledge 
  (e.g., specific legal requirements or compliance constraints) may not be easily 
  conveyed through code alone, so a comment is appropriate.

Poor commenting practices can have several negative consequences for a codebase. One 
issue is **redundancy**, where comments explain things that are already clear from the code 
itself. This leads to unnecessary clutter, making the code harder to read and maintain. 
When comments are used to describe basic logic, such as explaining a simple operation 
like index++;, they add no real value and can slow down developers by forcing them to 
read both the code and the redundant comments.

Another problem with poor commenting is that comments can become **outdated** or incorrect 
as the code changes over time. If a piece of code is updated but the accompanying comment 
is not, the comment can mislead developers by suggesting the code behaves in a way it no 
longer does. This creates confusion and increases the likelihood of introducing bugs, 
as developers may rely on inaccurate information when making modifications.

Additionally, over-reliance on comments instead of writing clear, self-documenting code 
contributes to **code rot**. As the codebase grows, excessive or outdated comments add to 
the complexity, making the system harder to understand and maintain. Rather than improving 
clarity, these comments can obscure the real logic of the code, leading to more technical 
debt and greater difficulty when future developers need to make changes.

While comments can be valuable in certain situations, relying on them too 
heavily or using them poorly can degrade the quality of the codebase, making it more 
difficult to work with and less maintainable over time.

## Structured comments

While conversational comments are discouraged in clean code, structured XML comments 
can play a vital role in generating clear and consistent API documentation. This provides 
developers with insights into how to use the functionality within a codebase effectively. 
By embedding structured comments directly within the code, developers can automatically 
generate detailed documentation that includes descriptions of classes, methods, parameters, 
and return values. Tools like [Doxygen](https://www.doxygen.nl/) leverage these XML 
comments to produce comprehensive, human-readable documentation in various formats, such 
as HTML or PDF. This approach ensures that API documentation stays up-to-date with the 
code, reduces manual effort in maintaining separate documentation, and makes it easier 
for other developers to understand the functionality, usage, and design intentions of 
the API. Structured XML comments, combined with tools like Doxygen, enhance the 
transparency and usability of APIs, promoting better collaboration and software maintenance.

The example below illustrates how to add structured comments directly above the 
class declaration and its members (fields, methods, etc.). Doxygen uses special keywords 
and tags to extract and format these comments into readable documentation. The comments 
can describe the purpose of the class, its methods, parameters, return values, and any 
other relevant information.

``` c#
/// <summary>
/// A class representing a bank account.
/// </summary>
/// <remarks>
/// This class allows basic banking operations such as depositing, withdrawing,
/// and checking the balance of an account. It also includes a facility for 
/// checking account holder details.
/// </remarks>
/// <seealso cref="User"/>
/// <seealso cref="Transaction"/>
public class BankAccount
{
    /// <summary>
    /// The current balance of the bank account.
    /// </summary>
    private double balance;

    /// <summary>
    /// Name of the account holder.
    /// </summary>
    private string accountHolderName;

    /// <summary>
    /// Constructor to create a BankAccount object.
    /// </summary>
    /// <param name="name">The name of the account holder.</param>
    /// <param name="initialBalance">The starting balance of the account.</param>
    public BankAccount(string name, double initialBalance)
    {
        accountHolderName = name;
        balance = initialBalance;
    }

    /// <summary>
    /// Deposits an amount into the account.
    /// </summary>
    /// <param name="amount">The amount to deposit.</param>
    public void Deposit(double amount)
    {
        balance += amount;
    }

    /// <summary>
    /// Withdraws an amount from the account.
    /// </summary>
    /// <param name="amount">The amount to withdraw.</param>
    /// <returns>
    /// <c>true</c> if the withdrawal was successful; 
    /// <c>false</c> if the balance was insufficient.
    /// </returns>
    /// <exception cref="InvalidOperationException">
    /// Thrown when the balance is insufficient for the withdrawal.
    /// </exception>
    public bool Withdraw(double amount)
    {
        if (balance >= amount)
        {
            balance -= amount;
            return true;
        }
        else
        {
            throw new InvalidOperationException("Insufficient balance");
        }
    }

    /// <summary>
    /// Retrieves the current balance of the account.
    /// </summary>
    /// <returns>The current balance.</returns>
    public double GetBalance()
    {
        return balance;
    }

    /// <summary>
    /// Gets the name of the account holder.
    /// </summary>
    /// <returns>The account holder's name.</returns>
    public string GetAccountHolderName()
    {
        return accountHolderName;
    }
}
```
> **Breakdown**
> 
> Class-Level Documentation:
>
>* The class-level comment block uses `<summary>` to provide an overview of the class, 
>  describing what the `BankAccount` class does. The `<remarks>` tag is used for more 
>  detailed information, explaining additional features or behaviours.
>* The `<seealso>` tag references related classes (`User` and `Transaction`) to provide 
>  context and link related documentation.
>
> Member Variable Documentation:
>
> * The member variables `balance` and `accountHolderName` are documented with a simple 
>   `<summary>` tag that explains their roles in the class.
> 
> Constructor and Method Documentation:
>
>* The constructor and methods are documented using the `<summary>` tag to describe what 
>  they do.
>* The `<param>` tag is used to document method parameters (e.g., `name`, `initialBalance`, 
>  and `amount`).
>* The `<returns>` tag is used to describe the return value of the methods, such as the 
>  result of the `Withdraw` method.
>* The `Withdraw` method also uses `<exception>` to document the 
>  `InvalidOperationException` that can be thrown if there’s insufficient balance, 
>  making it clear to developers using this method.

With the comments embedded correctly, documentation in HTML or PDF format can be 
generated by running the Doxygen executable. For more details on the Doxygen syntax, 
please refer to the [documentation](https://www.doxygen.nl/manual/index.html).

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Practical strategies for improving readability](readability_tips)

## Further reading (and viewing)

* [Clean Code with Uncle Bob](https://www.youtube.com/playlist?list=PLmmYSbUCWJ4x1GO839azG_BBw8rkh-zOj) (video lectures)
* Clean Code in C# ([Alls, 2020](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923706264502111))

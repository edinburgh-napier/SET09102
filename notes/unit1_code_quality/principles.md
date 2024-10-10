---
title: Software Engineering Priciples
parent: Code quality
has_children: true
nav_order: 1
---

# Software Engineering Priciples

In software engineering, principles serve as foundational guidelines that help engineers 
make informed decisions throughout the software development lifecycle. These principles 
are not rigid rules but rather general best practices that, when applied, contribute to 
the creation of robust, efficient, and maintainable software systems. They provide a 
framework for addressing common challenges such as complexity, change, scalability, and 
collaboration in software projects.

The purpose of software engineering principles is to ensure that software is developed 
in a way that is predictable, reliable, and adaptable to evolving requirements. Adhering 
to these principles helps to reduce the likelihood of errors, improve team productivity, 
and create software that is easier to maintain and extend over time.

## Why Principles Matter

* **Guiding Decision-Making**: Principles help engineers navigate the complexity of software 
systems by offering strategies to make trade-offs between conflicting requirements, 
such as performance versus scalability or flexibility versus simplicity.

* **Improving Software Quality**: By following well-established principles, software engineers 
can create higher-quality software that is less prone to bugs, easier to test, and more 
aligned with user needs.

* **Supporting Collaboration**: In team environments, shared principles provide a common 
language and approach to problem-solving, making it easier for developers to work 
together and understand each other's code.

* **Facilitating Long-Term Maintenance**: Principles guide the design of systems that can 
accommodate changes over time, ensuring that the software remains maintainable and 
scalable as new requirements emerge.

* **Encouraging Efficiency**: By adhering to best practices, engineers can streamline the 
development process, reduce redundancy, and avoid reinventing the wheel, ultimately 
leading to faster and more cost-effective software delivery.

Software engineering principles are not one-size-fits-all solutions; their application 
often depends on the context of the project, the goals of the development team, and the 
specific challenges being faced. Understanding when and how to apply these principles 
is a key skill for any software engineer, as it involves balancing various factors such 
as time constraints, technical limitations, and user expectations.

## SOLID

The SOLID principles are a set of five design guidelines that aim to make software 
systems more maintainable, scalable, and flexible. These principles promote clean and 
modular code by encouraging better organization and reducing dependencies between 
components. By following SOLID principles, developers can create systems that are easier 
to understand, extend, and modify, while also minimizing the risk of introducing bugs 
when making changes. These principles are widely recognized as foundational concepts in 
object-oriented software design and are key to building robust software architectures.

### Single Responsibility Principle

The Single Responsibility Principle (SRP) states that a class should have only one 
reason to change, meaning that a class should have only one job or responsibility. 
Adhering to SRP helps to keep code more maintainable, readable, and easier to modify 
without introducing errors.

Key Concepts:

* **One Responsibility**: A class should focus on only one functionality or concern.
* **Reason to Change**: If a class is responsible for multiple things, a change in one 
  responsibility could affect the other, leading to fragile code.
* **Separation of Concerns**: By splitting responsibilities into separate classes, you 
  reduce complexity and make each part of the code easier to test, understand, and modify.

SRP is important because it greatly enhances the maintainability of your code. When 
each class is focused on only one responsibility, the code becomes easier to understand 
and modify. This means that changes or updates to a specific functionality won’t 
unintentionally affect other parts of the system. SRP also improves the testability 
of your code. By isolating responsibilities into separate classes, each class has 
fewer dependencies, making it easier to test specific functionalities without complex 
setups. Furthermore, SRP promotes reusability. Classes that have a single responsibility 
are often more self-contained and can be reused in different contexts without 
modification. As a result, your code becomes more modular, flexible, and easier 
to extend.

### Example: Problem and Solution Using SRP

**Problem: A Class with Multiple Responsibilities**

Let's take an example of an Invoice class that handles both invoice generation and 
sending emails. This class violates SRP because it is responsible for two things: 
generating the invoice and emailing it.

``` c#
public class Invoice
{
    public void GenerateInvoice(Order order)
    {
        // Code to generate invoice
        Console.WriteLine("Invoice generated for order.");
    }

    public void SendEmail(Order order)
    {
        // Code to send email to customer
        Console.WriteLine("Email sent to customer for order.");
    }
}
```

Issues with this Design:

* **Multiple Responsibilities**: The Invoice class is doing two things: generating 
  invoices and sending emails. These are separate concerns and should be handled 
  independently.
* **Maintenance Problem**: If you need to change the way emails are sent (e.g., adding 
  logging or changing the email provider), you need to modify the Invoice class, even 
  though the invoice generation logic hasn’t changed. This makes the code fragile.
* **Testing Complication**: Testing this class would involve setting up both invoice 
  generation and email sending, even if you're only interested in testing one of those 
  behaviors.

**Solution: Refactor Using SRP**

By applying the SRP, we can separate the concerns. We will create two separate classes: 
one for generating the invoice and another for sending the email.

``` c#
// Class responsible for generating the invoice
public class InvoiceGenerator
{
    public void GenerateInvoice(Order order)
    {
        // Code to generate invoice
        Console.WriteLine("Invoice generated for order.");
    }
}

// Class responsible for sending the email
public class EmailSender
{
    public void SendEmail(Order order)
    {
        // Code to send email
        Console.WriteLine("Email sent to customer for order.");
    }
}
```

Now, when you need to generate an invoice and send an email, you can do so by calling 
both classes:

``` c#
public class InvoiceService
{
    private InvoiceGenerator invoiceGenerator;
    private EmailSender emailSender;

    public InvoiceService()
    {
        invoiceGenerator = new InvoiceGenerator();
        emailSender = new EmailSender();
    }

    public void ProcessInvoice(Order order)
    {
        invoiceGenerator.GenerateInvoice(order);
        emailSender.SendEmail(order);
    }
}
```

Benefits of the Refactored Code:

* **Separation of Concerns**: The InvoiceGenerator class is responsible only for invoice 
  generation, and the EmailSender class is responsible only for sending emails. Each 
  class has a single responsibility.
* **Easier Maintenance**: Changes to how invoices are generated or how emails are sent 
  will only affect their respective classes. You can modify one without risking changes 
  in the other.
* **Improved Testability**: Testing these classes is now simpler because you can write 
  unit tests for each responsibility independently. For example, you can test the 
  InvoiceGenerator without worrying about email functionality.

### Key Takeaways

> SRP simplifies the design of your system by keeping each class focused on a single task 
> or responsibility.
> 
> By separating concerns, you reduce the likelihood of introducing bugs when making 
> changes and increase the modularity of your code.
> 
> Adhering to SRP leads to cleaner, more maintainable, and testable code.

### The Open/Closed Principle

The Open/Closed Principle (OCP) states that software entities (classes, modules, 
functions, etc.) should be **open for extension but closed for modification**. In other 
words, you should be able to add new functionality to a class or module without 
changing its existing code. This principle encourages writing code that can adapt 
to new requirements or features without altering the already tested and functional 
parts of the system.

Key Concepts:

* **Open for Extension**: You should be able to extend the behavior of a class or 
  module to add new functionality.
* **Closed for Modification**: Once a class or module is implemented and tested, you 
  should not modify its existing code to prevent introducing new bugs or breaking 
  existing functionality.
* **Avoid Breaking Changes**: By adhering to OCP, you minimize the risk of breaking 
  existing code when adding new features, leading to more stable and maintainable software.

OCP is important because it enhances the maintainability and flexibility of a software 
system. By ensuring that software entities are open for extension but closed for 
modification, developers can add new features or functionality without altering the 
existing, stable code. This approach minimizes the risk of introducing bugs or 
breaking existing behavior, which is crucial in larger systems where changes can 
have widespread impacts. OCP also promotes scalability, allowing the system to grow 
by adding new modules or classes instead of rewriting or modifying existing ones. 
Ultimately, OCP leads to a more modular and adaptable codebase that can evolve over 
time while maintaining stability and reducing development risks.

### Example: Problem and Solution Using OCP

**Problem: A Class that Violates OCP**

Let’s say you have a InvoicePrinter class that prints invoices for customers in plain 
text. Later, a new requirement comes in to add support for printing invoices in PDF 
format. Without following OCP, you might be tempted to modify the InvoicePrinter class 
directly to accommodate the new format, which would violate OCP because the class 
would now need to be modified every time a new format is added.

``` c#
public class InvoicePrinter
{
    public void PrintInvoice(Order order, string format)
    {
        if (format == "TEXT")
        {
            // Logic to print the invoice in text format
            Console.WriteLine("Printing invoice in text format...");
        }
        else if (format == "PDF")
        {
            // Logic to print the invoice in PDF format
            Console.WriteLine("Printing invoice in PDF format...");
        }
    }
}
```

Issues with this Design:

* **Violation of OCP**: The InvoicePrinter class is not closed for modification because 
  every time a new format (e.g., HTML, XML) is added, you have to modify the PrintInvoice 
  method.
* **Fragility**: Modifying the existing method increases the risk of introducing bugs or 
  breaking functionality for previously supported formats.
* **Unscalable**: As the number of supported formats grows, the method will become 
  increasingly complex and harder to maintain.

**Solution: Refactor Using OCP**

To apply the OCP, we can refactor the code by introducing an interface that defines a 
method for printing invoices, and then create separate classes for each specific format. 
This way, when a new format is needed, you can extend the behavior by adding a new 
class without modifying the existing ones.

``` c#
// Define an interface for printing invoices
public interface IInvoicePrinter
{
    void PrintInvoice(Order order);
}

// Class for printing in text format
public class TextInvoicePrinter : IInvoicePrinter
{
    public void PrintInvoice(Order order)
    {
        Console.WriteLine("Printing invoice in text format...");
    }
}

// Class for printing in PDF format
public class PdfInvoicePrinter : IInvoicePrinter
{
    public void PrintInvoice(Order order)
    {
        Console.WriteLine("Printing invoice in PDF format...");
    }
}
```

Now, you can easily add a new format by creating a new class that implements the 
IInvoicePrinter interface without touching the existing code:

``` c#
// Example of adding a new format without modifying existing code
public class HtmlInvoicePrinter : IInvoicePrinter
{
    public void PrintInvoice(Order order)
    {
        Console.WriteLine("Printing invoice in HTML format...");
    }
}
```

To use this setup, you can manage the specific printer implementation through 
dependency injection or by selecting the appropriate printer at runtime:

``` c#
public class InvoiceService
{
    private IInvoicePrinter invoicePrinter;

    public InvoiceService(IInvoicePrinter printer)
    {
        this.invoicePrinter = printer;
    }

    public void ProcessInvoice(Order order)
    {
        invoicePrinter.PrintInvoice(order);
    }
}
```

**Benefits of the Refactored Code:**

* **Open for Extension**: New formats can be added by creating new classes (e.g., 
  HtmlInvoicePrinter) that implement the IInvoicePrinter interface. This allows you 
  to extend functionality without modifying the existing code.
* **Closed for Modification**: The InvoicePrinter class itself is never modified. 
  Existing functionality remains stable, reducing the risk of introducing bugs or 
  regressions.
* **Better Scalability**: The system can easily accommodate future requirements (e.g., 
  XML, CSV formats) by simply adding new printer classes without changing the core logic.
* **Cleaner Code**: The code is more modular, easier to test, and more aligned with 
  good design practices.

Key Takeaways:

> OCP encourages you to write code that can be easily extended but not modified. This 
> leads to better maintainability and stability in software projects.
> 
> OCP helps you add new features or behaviors (such as new formats for invoice printing) 
> without altering the tested and stable parts of your system.
> 
> By using abstractions (like interfaces or abstract classes), you can keep your core 
> logic intact while still allowing flexibility for new functionality.
> 
> Following OCP not only improves the modularity and scalability of your system but 
> also reduces the chances of introducing errors when adding new features. It ensures 
> that your codebase remains stable as it evolves.

### Liskov Substitution Principle

The Liskov Substitution Principle (LSP) states that objects of a superclass should be 
replaceable with objects of a subclass without affecting the correctness of the program. 
In simpler terms, if class B is a subclass of class A, you should be able to replace 
A with B without changing the expected behavior of the program.

This principle helps maintain polymorphism while ensuring that inheritance is used 
correctly, preserving the expected functionality of the base class when extending it. 
Violating LSP leads to unexpected behavior and breaks the substitutability of objects, 
reducing the flexibility and reliability of the system.

Key Concepts:

* **Substitutability**: Subclasses should be able to stand in for their base classes 
  without affecting the correctness of the application.
* **Behavioral Integrity**: Subclasses should not override or alter base class methods 
  in a way that violates the expected behavior.
* **Avoid Breaking Contracts**: Subclasses must honor the "contract" established by the 
  base class, meaning they should not weaken postconditions or strengthen preconditions 
  of the base class methods.

LSP is crucial because it ensures that a program remains correct and reliable when 
subclasses are used in place of their base classes. Adhering to LSP allows developers to 
extend functionality through inheritance without breaking the existing behavior of the 
system. It maintains the integrity of polymorphism by ensuring that objects of a 
subclass can seamlessly replace those of the superclass, without causing unexpected 
outcomes or requiring additional checks. This principle promotes flexibility, enabling 
code reuse while reducing the risk of introducing bugs. By following LSP, you create 
more maintainable, modular, and robust systems that can evolve over time without 
compromising reliability or correctness.

### Example: Problem and Solution Using LSP

**Problem: A Class that Violates LSP**

Let’s say we have a base class Bird with a method Fly(). We then create a subclass 
Penguin, but penguins can’t fly. This introduces a violation of the Liskov Substitution 
Principle because substituting a Penguin for a Bird breaks the expected behavior defined 
by the base class.

``` c#
public class Bird
{
    public virtual void Fly()
    {
        Console.WriteLine("Flying...");
    }
}

public class Penguin : Bird
{
    public override void Fly()
    {
        throw new InvalidOperationException("Penguins can't fly!");
    }
}
```

**Issues with this Design:**

* **Violation of LSP**: The Penguin class cannot fulfill the expectations set by the 
  Bird class because Penguin.Fly() throws an exception, which breaks the contract that 
  all birds should be able to fly.
* **Unreliable Substitution**: Any code that expects a Bird object to fly will fail when 
  it encounters a Penguin. This violates the expectation of substitutability.
* **Fragile Code**: Developers who use the Bird class must now include checks to handle 
  the case where a bird cannot fly, making the code more complex and error-prone.

**Solution: Refactor Using LSP**

To adhere to LSP, we need to avoid forcing all birds to implement the Fly() method. 
Instead, we can refactor the design by introducing a more appropriate abstraction. We 
can create a separate IFlyable interface that is implemented by birds that can fly, and 
remove the Fly() method from the base Bird class. This way, we separate the flying 
behavior from the general bird behavior, ensuring that subclasses only implement behaviors 
that apply to them.

``` c#
public class Bird
{
    public string Name { get; set; }

    public void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }
}

public interface IFlyable
{
    void Fly();
}

public class Sparrow : Bird, IFlyable
{
    public void Fly()
    {
        Console.WriteLine($"{Name} is flying.");
    }
}

public class Penguin : Bird
{
    // Penguins don't implement IFlyable because they can't fly
}
```

**Benefits of the Refactored Code:**

* **Substitutability Preserved**: Now, both Sparrow and Penguin can be substituted for 
  Bird without violating LSP, since there is no assumption that all birds can fly.
* **Clear Separation of Concerns**: The ability to fly is now handled by the IFlyable 
  interface, meaning only birds that can fly will implement it. This ensures that 
  Penguin is not forced to provide an invalid implementation for flying.
* **More Flexible Design**: Other animals that can fly (like bats or insects) can also 
  implement the IFlyable interface, increasing the flexibility of the design without 
  changing the core behavior of the Bird class.
* **Simplified Code**: The code now makes it clear which animals can fly and which 
  cannot, reducing the need for conditionals or error-prone workarounds.

#### Key Takeaways:

> LSP ensures that subclasses can replace their base classes without introducing unexpected 
> behavior, maintaining the correctness of the program.
> 
> When using inheritance, avoid overriding or altering methods in a way that violates the 
> expectations set by the base class. If a subclass cannot properly implement a method, 
> it should not inherit that method.
> 
> Adhering to LSP promotes modular, reliable, and flexible code that leverages 
> inheritance and polymorphism correctly. It helps prevent fragile code that requires 
> constant checking or handling of special cases, leading to a cleaner and more robust 
> design.


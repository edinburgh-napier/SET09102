---
title: Design Patterns
parent: Code Quality
has_children: true
has_toc: false
nav_order: 3
---

# Design patterns

Design patterns are proven, reusable solutions to common problems encountered in software 
development. They provide a standardized way to structure and solve recurring issues, helping 
software engineers write more efficient, maintainable, and scalable code. Rather than reinventing 
the wheel, design patterns allow developers to apply well-established approaches to various design 
challenges, improving code quality and collaboration within teams. Understanding and applying 
design patterns is essential for software engineers to build robust systems, as these patterns 
encapsulate best practices in areas like object creation, structure, and behavior. Learning 
design patterns enables engineers to write cleaner, more modular code that is easier to extend 
and adapt to future needs.

The concept of software engineering design patterns originated from the work of architect 
Christopher Alexander in the 1970s, who introduced the idea of patterns in architecture. This 
concept was later adapted to software development by the Gang of Four—Erich Gamma, Richard Helm, 
Ralph Johnson, and John Vlissides—in their seminal 1994 book "Design Patterns: Elements of 
Reusable Object-Oriented Software." The book cataloged 23 design patterns, classified into 
creational, structural, and behavioral patterns, offering reusable solutions to common design 
problems. Since then, design patterns have become a cornerstone of object-oriented software 
development, providing developers with a shared vocabulary and best practices for solving 
recurring design challenges efficiently. Over time, these patterns have been expanded and 
applied across various programming paradigms and technologies, evolving as software development 
practices have matured.

## Types of design pattern

Design patterns can be split into three broad categories:

1. **Creational patterns** are concerned with the object creation mechanisms. They provide ways 
   to instantiate objects, allowing more flexibility and control over the creation process. These 
   patterns abstract the process of object creation, ensuring that objects are created in a manner 
   that suits the situation, often involving considerations like minimizing object creation cost, 
   ensuring singletons, or creating complex objects step by step.

   **Examples**

   * **Singleton**: Ensures a class has only one instance and provides a global point of access 
     to it.
   * **Factory Method**: Defines an interface for creating objects, but allows subclasses to 
     alter the type of objects that will be created.
   * **Abstract Factory**: Provides an interface for creating families of related or dependent 
     objects without specifying their concrete classes.
   * **Builder**: Separates the construction of a complex object from its representation, 
     allowing the same construction process to create different representations.
   * **Prototype**: Creates new objects by copying an existing object, or "prototype," rather 
     than instantiating a new one.

2. **Structural patterns** focus on how objects and classes are composed to form larger 
   structures. They help ensure that different components of a system work together while 
   promoting flexibility and reusability. They typically facilitate relationships between 
   different entities or subsystems and make it easier to assemble objects and extend 
   functionality without modifying the existing system.

   **Examples**

   * **Adapter**: Allows incompatible interfaces to work together by wrapping an existing class 
     with a new interface.
   * **Decorator**: Adds additional functionality to an object dynamically, without altering its 
     structure, by wrapping it in a decorator class.
   * **Facade**: Provides a simplified interface to a complex system of classes, subsystems, or 
     libraries.
   * **Proxy**: Provides a placeholder or surrogate for another object to control access, reduce 
     complexity, or delay expensive operations.
   * **Composite**: Treats individual objects and compositions of objects uniformly, allowing 
     clients to work with complex tree structures more easily.
   * **Bridge**: Separates an object’s abstraction from its implementation, allowing them to 
     vary independently.

3. **Behavioural patterns** focus on communication between objects. They define how objects 
   interact, coordinate, and manage responsibilities in a dynamic way to accomplish tasks, 
   ensuring that communication is flexible, organized, and decoupled. They typically address 
   responsibilities, interactions, and communication flow between objects.

   **Examples**

   * **Observer**: Defines a subscription mechanism to notify multiple objects about any changes 
     in the state of another object (often used for event handling).
   * **Strategy**: Defines a family of algorithms and makes them interchangeable, allowing the 
     algorithm to vary independently of the client using it.
   * **Command**: Encapsulates a request or action as an object, thereby allowing 
     parameterization of clients with queues, requests, or operations.
   * **Template Method**: Defines the skeleton of an algorithm in the base class but allows 
     subclasses to override specific steps of the algorithm.
   * **State**: Allows an object to change its behavior when its internal state changes, 
     appearing as if the object has changed its class.
   * **Chain of Responsibility**: Passes a request along a chain of handlers, allowing 
     multiple objects to handle the request or none at all.
   * **Mediator**: Centralizes communication between objects, reducing direct dependencies and 
     simplifying interactions between classes.
   * **Visitor**: Separates algorithms from the objects on which they operate, allowing new 
     operations to be added without modifying the objects.

For a detailed discussion of design patterns with examples in C#, please see 
[Nesteruk, 2022](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923851973502111)

The [Refactoring Guru](https://refactoring.guru/design-patterns) website also provides details
on selected patterns in an accessible way.

## Solving problems with design patterns

Design patterns offer well-established solutions to common software design problems, helping 
developers build systems that are scalable, maintainable, and flexible. By providing a 
structured way to solve recurring design challenges, design patterns improve code quality and 
streamline development. The examples below illustrate how design patterns can be applied to
practical problems without having to reinvent the wheel.

## Improving Code Reusability

Design patterns help reduce redundancy by promoting reusable code. Once a pattern is applied, 
its structure can be reused across different projects or components, saving time and reducing 
the need for rewriting the same logic.

The [Singleton](https://refactoring.guru/design-patterns/singleton) pattern ensures 
that a class has only one instance, which is particularly useful for managing shared resources 
like database connections.

``` c#
public class DatabaseConnection
{
    private static DatabaseConnection instance;
    private DatabaseConnection() { }

    public static DatabaseConnection GetInstance()
    {
        if (instance == null)
        {
            instance = new DatabaseConnection();
        }
        return instance;
    }

    public void Connect() 
    {
        Console.WriteLine("Database Connected");
    }
}

// Usage:
DatabaseConnection connection1 = DatabaseConnection.GetInstance();
DatabaseConnection connection2 = DatabaseConnection.GetInstance();
Console.WriteLine(connection1 == connection2);  // True, same instance
```

The Singleton pattern ensures that only one instance of `DatabaseConnection` exists, which can 
be reused across the application, avoiding redundant object creation and resource conflicts.

## Enhancing Maintainability and Extensibility

Design patterns allow developers to write code that is easier to maintain and extend. Changes 
can be made with minimal impact on existing code, making the system more adaptable to future 
needs.

The [Factory Method](https://refactoring.guru/design-patterns/factory-method) pattern 
provides an interface for creating objects, but lets subclasses decide which class to 
instantiate. This makes the system easier to extend by adding new types without changing 
existing code.

``` c#
public abstract class Button
{
    public abstract void Render();
}

public class WindowsButton : Button
{
    public override void Render()
    {
        Console.WriteLine("Rendering a Windows button");
    }
}

public class MacButton : Button
{
    public override void Render()
    {
        Console.WriteLine("Rendering a Mac button");
    }
}

public abstract class Dialog
{
    public abstract Button CreateButton();
}

public class WindowsDialog : Dialog
{
    public override Button CreateButton()
    {
        return new WindowsButton();
    }
}

public class MacDialog : Dialog
{
    public override Button CreateButton()
    {
        return new MacButton();
    }
}

// Usage:
Dialog dialog = new WindowsDialog();
Button button = dialog.CreateButton();
button.Render();
```

The Factory Method pattern makes it easy to add new button types (e.g., `LinuxButton`) without 
modifying existing code. The system remains maintainable and extensible as new features are 
introduced.

## Promoting Loose Coupling

Design patterns often encourage loose coupling between components, meaning that components 
depend less on each other, making the system more modular and easier to change. Loose coupling 
reduces the risk of breaking parts of the system when making changes or adding new features.

The [Observer](https://refactoring.guru/design-patterns/observer) pattern establishes a 
relationship between objects such that when one object (the subject) changes state, all its 
dependent objects (observers) are notified.

``` c#
public interface IObserver
{
    void Update(string message);
}

public class EmailNotifier : IObserver
{
    public void Update(string message)
    {
        Console.WriteLine("Sending email notification: " + message);
    }
}

public class SMSNotifier : IObserver
{
    public void Update(string message)
    {
        Console.WriteLine("Sending SMS notification: " + message);
    }
}

public class OrderSystem
{
    private List<IObserver> observers = new List<IObserver>();

    public void Attach(IObserver observer)
    {
        observers.Add(observer);
    }

    public void Detach(IObserver observer)
    {
        observers.Remove(observer);
    }

    public void Notify(string message)
    {
        foreach (var observer in observers)
        {
            observer.Update(message);
        }
    }

    public void NewOrder()
    {
        Console.WriteLine("Processing new order...");
        Notify("New order has been placed.");
    }
}

// Usage:
OrderSystem orderSystem = new OrderSystem();
orderSystem.Attach(new EmailNotifier());
orderSystem.Attach(new SMSNotifier());

orderSystem.NewOrder();
```

The Observer pattern decouples the `OrderSystem` from the `EmailNotifier` and `SMSNotifier`. 
This allows for flexible additions and changes, such as adding new types of notifications, 
without modifying the `OrderSystem` class.

## Increasing Code Readability and Understandability

Design patterns improve code readability by providing well-known, standardized solutions. 
Developers familiar with these patterns can quickly understand the structure and purpose of 
code, making collaboration and onboarding easier.

The [Decorator](https://refactoring.guru/design-patterns/decorator) pattern allows additional 
behavior to be dynamically added to objects without modifying their structure.

``` c#
public interface ICoffee
{
    string GetDescription();
    double GetCost();
}

public class SimpleCoffee : ICoffee
{
    public string GetDescription()
    {
        return "Simple coffee";
    }

    public double GetCost()
    {
        return 5.0;
    }
}

public abstract class CoffeeDecorator : ICoffee
{
    protected ICoffee coffee;
    
    public CoffeeDecorator(ICoffee coffee)
    {
        this.coffee = coffee;
    }

    public virtual string GetDescription()
    {
        return coffee.GetDescription();
    }

    public virtual double GetCost()
    {
        return coffee.GetCost();
    }
}

public class MilkDecorator : CoffeeDecorator
{
    public MilkDecorator(ICoffee coffee) : base(coffee) {}

    public override string GetDescription()
    {
        return coffee.GetDescription() + ", with milk";
    }

    public override double GetCost()
    {
        return coffee.GetCost() + 1.5;
    }
}

public class SugarDecorator : CoffeeDecorator
{
    public SugarDecorator(ICoffee coffee) : base(coffee) {}

    public override string GetDescription()
    {
        return coffee.GetDescription() + ", with sugar";
    }

    public override double GetCost()
    {
        return coffee.GetCost() + 0.5;
    }
}

// Usage:
ICoffee coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
Console.WriteLine(coffee.GetDescription() + " costs $" + coffee.GetCost());
```

The Decorator pattern increases readability by clearly separating the responsibilities of each 
component. Developers can easily see how new behaviors (like milk or sugar in coffee) are added 
dynamically, making the code easy to extend and understand.

## Facilitating Testing and Debugging

Design patterns like Dependency Injection (related to DIP) and Strategy help make code more 
testable by separating concerns and enabling dependency management. This allows mock objects or 
alternative implementations to be used during testing.

The [Strategy](https://refactoring.guru/design-patterns/strategy) pattern allows an algorithm 
to be selected at runtime by encapsulating each algorithm in a separate class.

``` c#
public interface IPaymentStrategy
{
    void Pay(double amount);
}

public class CreditCardPayment : IPaymentStrategy
{
    public void Pay(double amount)
    {
        Console.WriteLine($"Paying {amount} using Credit Card.");
    }
}

public class PayPalPayment : IPaymentStrategy
{
    public void Pay(double amount)
    {
        Console.WriteLine($"Paying {amount} using PayPal.");
    }
}

public class PaymentProcessor
{
    private IPaymentStrategy paymentStrategy;

    public PaymentProcessor(IPaymentStrategy paymentStrategy)
    {
        this.paymentStrategy = paymentStrategy;
    }

    public void ProcessPayment(double amount)
    {
        paymentStrategy.Pay(amount);
    }
}

// Usage:
PaymentProcessor paymentProcessor = new PaymentProcessor(new PayPalPayment());
paymentProcessor.ProcessPayment(100);
```

The Strategy pattern makes testing easier by allowing you to mock different payment strategies. 
You can easily swap in different implementations (e.g., `CreditCardPayment`, `PayPalPayment`) 
without changing the core logic, improving testability.

## Conclusion

Using design patterns in day-to-day software engineering brings practical benefits such as 
code reusability, improved maintainability, loose coupling, and enhanced readability. Patterns 
provide tried-and-true solutions to common problems, enabling developers to build more robust, 
scalable, and flexible software systems. By understanding and applying patterns effectively, 
developers can write cleaner, more efficient code that is easier to test, extend, and maintain.

Learning and applying design patterns effectively requires practice and understanding of the 
problems they solve. Focus on gradually building your knowledge, applying patterns in real-world 
scenarios, and continuously evaluating when and how to use them appropriately. By incorporating 
design patterns thoughtfully, you'll improve the quality, maintainability, and flexibility of 
your software solutions.

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> General tips for applying design patterns](design_patterns_tips)


---
title: Code Smells
parent: Code Quality
has_children: true
has_toc: false
nav_order: 6
---

# Code Smells

Some code weaknesses listed are specific and can be easily identified if you
know what you are looking for. Other issues are less obvious - they emerge from the
code because of the general way it has been written and not from any one specific
error. In their 1999 book
[Refactoring: improving the design of existing code](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923667458902111),
Kent Beck and Martin Fowler introduce the concept of the *code smell*. Starting from
the premise that code should be easy to read and understand, a code smell is a clue
that something may not be right. It is a suspicion arising from untidy code or code
that has been put together with little care and attention. A code smell does not
always indicate that there is a problem. For example, long methods are best avoided
but occasionally a method with more that a dozen lines or so is actually needed.

<iframe width="560" height="315" src="https://www.youtube.com/embed/x-_ns8xcrlw?si=YH6hT1g_ivhxNpB1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Beck and Fowler describe 24 smells which they tabulate for reference at the end of the
book. The table is reproduced below - the various refactoring strategies are described
in other sections of the book. Since publication, other smells have been documented.
This [GitHub page](https://luzkan.github.io/smells/) summarises 56 of them.

*Table 1. Code smells ([Beck & Fowler, 1999](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923667458902111))*

| Smell                                         | Common Refactorings                                                                                                                                                                                                                                   |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Alternative Classes with Different Interfaces | Change Function Declaration, Move Function, Extract Superclass                                                                                                                                                                                        |
| Comments                                      | Extract Function, Change Function Declaration, Introduce Assertion                                                                                                                                                                                    |
| Data Class                                    | Encapsulate Record, Remove Setting Method, Move Function, Extract Function, Split Phase                                                                                                                                                               |
| Data Clumps                                   | Extract Class, Introduce Parameter Object, Preserve Whole Object                                                                                                                                                                                      |
| Divergent Change                              | Split Phase, Move Function, Extract Function, Extract Class                                                                                                                                                                                           |
| Duplicated Code                               | Extract Function, Slide Statements, Pull Up Method                                                                                                                                                                                                    |
| Feature Envy                                  | Move Function, Extract Function                                                                                                                                                                                                                       |
| Global Data                                   | Encapsulate Variable                                                                                                                                                                                                                                  |
| Insider Trading                               | Move Function, Move Field, Hide Delegate, Replace Subclass with Delegate, Replace Superclass with Delegate                                                                                                                                            |
| Large Class                                   | Extract Class, Extract Superclass, Replace Type Code with Subclasses                                                                                                                                                                                  |
| Lazy Element                                  | Inline Function, Inline Class, Collapse Hierarchy                                                                                                                                                                                                     |
| Long Function                                 | Extract Function, Replace Temp with Query, Introduce Parameter Object, Preserve Whole Object, Replace Function with Command, Decompose Conditional, Replace Conditional with Polymorphism, Split Loop                                                 |
| Long Parameter List                           | Replace Parameter with Query, Preserve Whole Object, Introduce Parameter Object, Remove Flag Argument, Combine Functions into Class                                                                                                                   |
| Loops                                         | Replace Loop with Pipeline                                                                                                                                                                                                                            |
| Message Chains                                | Hide Delegate, Extract Function, Move Function                                                                                                                                                                                                        |
| Middle Man                                    | Remove Middle Man, Inline Function, Replace Superclass with Delegate, Replace Subclass with Delegate                                                                                                                                                  |
| Mutable Data                                  | Encapsulate Variable, Split Variable, Slide Statements, Extract Function, Separate Query from Modifier, Remove Setting Method, Replace Derived Variable with Query, Combine Functions into Class, Combine Functions into Transform, Change Reference to Value |
| Mysterious Name                               | Change Function Declaration, Rename Variable, Rename Field                                                                                                                                                                                            |
| Primitive Obsession                           | Replace Primitive with Object, Replace Type Code with Subclasses, Replace Conditional with Polymorphism, Extract Class, Introduce Parameter Object                                                                                                    |
| Refused Bequest                               | Push Down Method, Push Down Field, Replace Subclass with Delegate, Replace Superclass with Delegate                                                                                                                                                   |
| Repeated Switches                             | Replace Conditional with Polymorphism                                                                                                                                                                                                                 |
| Shotgun Surgery                               | Move Function, Move Field, Combine Functions into Class, Combine Functions into Transform, Split Phase, Inline Function, Inline Class                                                                                                                 |
| Speculative Generality                        | Collapse Hierarchy, Inline Function, Inline Class, Change Function Declaration, Remove Dead Code                                                                                                                                                      |
| Temporary Field                               | Extract Class, Move Function, Introduce Special Case                                                                                                                                                                                                  |

The concept of code smells is closely tied to recognised software engineering principles 
because code smells indicate violations of fundamental best practices that affect code 
quality. For example, the **Single Responsibility Principle** (SRP) is often violated when 
you encounter code smells like **Large Class** or **Long Method**, where classes or methods 
do too much, making them harder to maintain. Similarly, code smells like **Feature Envy** 
highlight poor encapsulation and tight coupling, which contradict the **Law of Demeter** 
and the **Dependency Inversion Principle** (DIP), as methods access and manipulate data 
from other classes excessively. Addressing code smells involves refactoring to adhere to 
these principles, promoting modularity, loose coupling, and maintainability, which 
ultimately leads to cleaner, more robust, and scalable code. By identifying and 
eliminating code smells, developers can ensure that their code aligns with the core 
tenets of software engineering, such as **DRY** (Don't Repeat Yourself) and **KISS** (Keep It 
Simple, Stupid), resulting in higher-quality, more maintainable software systems.

![Fig. 1. Smelly Code (<a href="https://xkcd.com/1513">xkcd</a>)](https://imgs.xkcd.com/comics/code_quality.png#figure){: standalone #fig1 data-title="Smelly Code" }

The next few sections provide some examples of code smells with slightly opaque names.
This is not to suggest these are the most important ones to know about - you should make
it your business to learn to recognise, avoid and resolve as many as possible. Resolving
code smells should be a high priority during code reviews.

## Alternative Classes with Different Interfaces

This code smell occurs when two or more classes perform similar functions or represent 
similar concepts but have different method names or interfaces. This makes it harder to 
use these classes interchangeably, complicating code maintenance and increasing the 
likelihood of duplicated functionality.

In such cases, classes may be intended to serve a common purpose, but because their 
method signatures or interfaces differ, they cannot be easily swapped or reused in a 
flexible manner. This can lead to unnecessary complexity when trying to work with them 
or integrate them into a system, and often results in duplicated code.

**How to Fix It**

The solution is typically to standardise the interfaces by renaming methods, using 
Extract Interface, or introducing a common parent class or interface that defines the 
shared behaviour. This enables polymorphism and allows classes to be used interchangeably.

**Example Before Refactoring**

``` c#
public class EmailService
{
    public void SendEmail(string email, string message)
    {
        // Logic to send email
        Console.WriteLine($"Sending email to {email}: {message}");
    }
}

public class SmsService
{
    public void SendTextMessage(string phoneNumber, string message)
    {
        // Logic to send SMS
        Console.WriteLine($"Sending SMS to {phoneNumber}: {message}");
    }
}

public class Notification
{
    public void NotifyByEmail(EmailService emailService, string email, string message)
    {
        emailService.SendEmail(email, message);
    }

    public void NotifyBySms(SmsService smsService, string phoneNumber, string message)
    {
        smsService.SendTextMessage(phoneNumber, message);
    }
}
```

**What's Wrong?**

The `EmailService` and `SmsService` classes provide similar functionality (sending 
notifications), but they use different method names (`SendEmail` vs. `SendTextMessage`) and 
different parameter types (`email` vs. `phoneNumber`). This results in the `Notification` 
class having to know which method to call depending on the service type, leading to tight 
coupling and reduced flexibility.

**After Refactoring**

To fix this, we can introduce a common interface, such as `INotificationService`, and 
standardise the method names across both `EmailService` and `SmsService`.

``` c#
// Define a common interface for notification services
public interface INotificationService
{
    void SendMessage(string recipient, string message);
}

public class EmailService : INotificationService
{
    public void SendMessage(string email, string message)
    {
        // Logic to send email
        Console.WriteLine($"Sending email to {email}: {message}");
    }
}

public class SmsService : INotificationService
{
    public void SendMessage(string phoneNumber, string message)
    {
        // Logic to send SMS
        Console.WriteLine($"Sending SMS to {phoneNumber}: {message}");
    }
}

public class Notification
{
    public void Notify(INotificationService service, string recipient, string message)
    {
        service.SendMessage(recipient, message);
    }
}
```

**What's Improved?**

* **Unified Interface**: Both `EmailService` and `SmsService` now implement the 
  `INotificationService` interface, which has a single method `SendMessage`. This 
  standardises the method name and parameters.
* **Polymorphism**: The `Notification` class can now send notifications using any service 
  that implements `INotificationService`, without needing to know the specific service 
  type or method names. This reduces coupling and makes the system more flexible.
* **Easier Maintenance**: If a new notification type (e.g., push notifications) is added, 
  it only needs to implement the `INotificationService` interface, and the existing 
  `Notification` class can use it without any changes.

## Feature Envy

This code smell occurs when a method in one class is overly focused on the data or 
functionality of another class. This means that the method frequently accesses the fields 
or methods of another class rather than using its own. Feature Envy indicates that the 
method might be better placed in the class it is "envying" because that class contains 
the data the method relies on.

Feature Envy creates tight coupling between classes, leading to poor encapsulation and 
making the code harder to maintain, extend, or refactor. When classes are tightly coupled, 
any changes to one class often require changes to the other, increasing the risk of bugs 
and technical debt.

**How to Fix It**

To address Feature Envy, the solution is typically to move the method closer to the data 
it is working with, usually by relocating the method to the class that owns the data being 
accessed.

**Example Before Refactoring**

``` c#
public class Order
{
    public Customer Customer { get; set; }
    public double TotalAmount { get; set; }

    public Order(Customer customer, double totalAmount)
    {
        Customer = customer;
        TotalAmount = totalAmount;
    }

    public double GetLoyaltyDiscount()
    {
        // Feature Envy: this method accesses Customer's data too much
        if (Customer.IsLoyalCustomer)
        {
            return TotalAmount * 0.1;  // 10% discount for loyal customers
        }
        return 0;
    }
}

public class Customer
{
    public string Name { get; set; }
    public bool IsLoyalCustomer { get; set; }

    public Customer(string name, bool isLoyalCustomer)
    {
        Name = name;
        IsLoyalCustomer = isLoyalCustomer;
    }
}
```

**What's Wrong?**

In the `Order` class, the `GetLoyaltyDiscount` method has Feature Envy because it is 
heavily reliant on the `Customer` class. It accesses `Customer.IsLoyalCustome`r to 
determine whether the customer qualifies for a discount. Since the discount logic is 
based entirely on the customer's loyalty status, this logic should ideally belong in the 
`Customer` class.

**After Refactoring**

``` c#
public class Order
{
    public Customer Customer { get; set; }
    public double TotalAmount { get; set; }

    public Order(Customer customer, double totalAmount)
    {
        Customer = customer;
        TotalAmount = totalAmount;
    }

    public double GetLoyaltyDiscount()
    {
        // Delegate the loyalty discount calculation to the Customer class
        return Customer.CalculateLoyaltyDiscount(TotalAmount);
    }
}

public class Customer
{
    public string Name { get; set; }
    public bool IsLoyalCustomer { get; set; }

    public Customer(string name, bool isLoyalCustomer)
    {
        Name = name;
        IsLoyalCustomer = isLoyalCustomer;
    }

    // Move the discount logic to the Customer class
    public double CalculateLoyaltyDiscount(double totalAmount)
    {
        if (IsLoyalCustomer)
        {
            return totalAmount * 0.1;  // 10% discount for loyal customers
        }
        return 0;
    }
}
```

**What's Improved?**

* The `Customer` class now handles its own loyalty logic. The method 
  `CalculateLoyaltyDiscount` is placed in `Customer`, the class that owns the data 
  (`IsLoyalCustomer`).

* The `Order` class simply delegates the discount calculation to the `Customer` class, 
  reducing tight coupling and improving encapsulation.
* This structure makes it easier to maintain and modify customer-related logic without 
  affecting the Order class.

## Insider Trading

This code smell refers to a situation where two classes share too much information 
between themselves, often accessing each other's private or internal state in ways that 
break encapsulation. This leads to tight coupling between the classes, making the system 
harder to maintain and more fragile. When one class knows too much about the 
implementation details of another class, changes in one class can directly affect the 
other, leading to cascading changes throughout the system.

Insider Trading typically occurs when classes are overly dependent on each other's inner 
workings, instead of interacting through well-defined, public interfaces. It violates the 
principle of encapsulation, which dictates that the internal state and behaviour of an 
object should not be exposed directly to other objects.

**How to Fix It**

To fix the "Insider Trading" smell, refactor the code to reduce unnecessary dependencies 
between the classes. You can achieve this by:

* Hiding internal details using private fields or methods.
* Exposing only necessary information through well-defined public methods.
* Applying the Law of Demeter (also known as the "principle of least knowledge"), 
  which suggests that an object should only interact with its immediate collaborators.

**Example Before Refactoring**

``` c#
public class Employee
{
    private string name;
    private double salary;

    public Employee(string name, double salary)
    {
        this.name = name;
        this.salary = salary;
    }

    // Accessing private details of the Payroll class
    public void UpdatePayroll(Payroll payroll)
    {
        payroll.Salary = this.salary;
    }

    public string GetName()
    {
        return name;
    }
}

public class Payroll
{
    public double Salary { get; set; }

    public void Process(Employee employee)
    {
        // Insider Trading: Payroll class accesses the private data of Employee
        Console.WriteLine($"{employee.GetName()} will be paid {Salary}");
    }
}
```

**What's Wrong?**

* The `Employee` class directly modifies the internal `Salary` property of the `Payroll` 
  class. This violates encapsulation because `Payroll` should control how its salary is set 
  or updated.

* The `Payroll` class, in turn, knows too much about the internal details of `Employee`, 
  such as accessing its private data to print employee information.

This creates a tightly coupled relationship between `Employee` and `Payroll`, making both 
classes fragile and harder to maintain.

**After Refactoring**

To fix this, we can refactor the code so that `Employee` and `Payroll` interact through 
well-defined methods, keeping their internal data encapsulated.

``` c#
public class Employee
{
    private string name;
    private double salary;

    public Employee(string name, double salary)
    {
        this.name = name;
        this.salary = salary;
    }

    public double GetSalary()
    {
        return salary;
    }

    public string GetName()
    {
        return name;
    }
}

public class Payroll
{
    public void UpdateSalary(Employee employee)
    {
        double salary = employee.GetSalary();
        Console.WriteLine($"{employee.GetName()} will be paid {salary}");
    }
}
```

**What's Improved?**

* **Encapsulation**: The `Payroll` class no longer has direct access to the `Employee` 
  class’s internal data. It interacts with `Employee` only through its public methods, 
  which respect the principle of encapsulation.
* **Reduced Coupling**: Both `Employee` and `Payroll` now interact through well-defined 
  interfaces (`GetSalary()` and `GetName()`), rather than accessing each other’s internal 
  state. This reduces the dependency between the two classes and makes them easier to 
  change independently.
* **Law of Demeter**: The classes now follow the Law of Demeter, which ensures that they 
  only communicate with their direct collaborators (public methods) rather than 
  manipulating each other's internal state.

## Middle Man

This code smell occurs when a class exists primarily to delegate tasks to other classes, 
acting as a "middle man" without adding significant value. This often happens when a 
class is delegating too many of its responsibilities to another class, without providing 
any meaningful functionality of its own. The presence of too many delegation methods in 
a class indicates that the class might not be necessary at all, and its existence only 
adds unnecessary complexity and indirection.

Classes that exhibit the "Middle Man" code smell typically violate the Single 
Responsibility Principle (SRP), because they don't have enough responsibility of their 
own. This can make the code harder to maintain and extend, as unnecessary layers of 
abstraction complicate the system and make it harder to follow the flow of logic.

**How to Fix It**

To fix the "Middle Man" smell, you should either:

* Remove the middle man by allowing the client code to interact directly with the class 
  performing the work, or
* Refactor the middle-man class to take on a more meaningful responsibility if it is 
  still needed for some structural reason.

**Example Before Refactoring**

``` c#
public class Customer
{
    public string Name { get; private set; }
    public Address Address { get; private set; }

    public Customer(string name, Address address)
    {
        Name = name;
        Address = address;
    }

    public string GetCustomerName()
    {
        return Name;
    }

    public string GetCustomerStreet()
    {
        return Address.Street;
    }

    public string GetCustomerCity()
    {
        return Address.City;
    }
}

public class Address
{
    public string Street { get; private set; }
    public string City { get; private set; }

    public Address(string street, string city)
    {
        Street = street;
        City = city;
    }
}

// Client code
public class Order
{
    private Customer customer;

    public Order(Customer customer)
    {
        this.customer = customer;
    }

    public void PrintShippingLabel()
    {
        Console.WriteLine("Shipping to: " + customer.GetCustomerStreet() + ", " + customer.GetCustomerCity());
    }
}
```

**What's Wrong?**

The `Customer` class here is acting as a middle man. It doesn't add significant 
functionality of its own; instead, it just delegates calls to the `Address` class. 
Methods like `GetCustomerStreet()` and `GetCustomerCity()` simply forward the request to 
`Address`, offering no additional processing or value.

The client (`Order` class) should be able to interact directly with `Address` instead of 
going through the `Customer` class. The existence of these delegation methods in 
`Customer` adds unnecessary complexity, as they don't contribute anything beyond 
relaying information.

**After Refactoring**

To eliminate the "Middle Man" code smell, we can remove the unnecessary delegation 
methods in `Customer` and allow the client (`Order` class) to interact with `Address` 
directly.

``` c#
public class Customer
{
    public string Name { get; private set; }
    public Address Address { get; private set; }

    public Customer(string name, Address address)
    {
        Name = name;
        Address = address;
    }
}

public class Address
{
    public string Street { get; private set; }
    public string City { get; private set; }

    public Address(string street, string city)
    {
        Street = street;
        City = city;
    }
}

// Client code
public class Order
{
    private Customer customer;

    public Order(Customer customer)
    {
        this.customer = customer;
    }

    public void PrintShippingLabel()
    {
        // Interacting directly with Address class
        Console.WriteLine("Shipping to: " + customer.Address.Street + ", " + customer.Address.City);
    }
}
```

**What's Improved?**

* **Direct Access**: The `Order` class now accesses the `Address` class directly through 
  the `Customer` object, removing the unnecessary delegation methods in `Customer`. This 
  reduces unnecessary indirection.
* **Simplified Code**: The `Customer` class is now more focused on its core 
  responsibility — representing the customer — and no longer acts as a "middle man" for 
  `Address`. This simplifies the design and makes the code easier to understand.
* **Reduced Coupling**: By eliminating the delegation methods, we've reduced the coupling 
  between `Customer` and `Address`. The `Order` class interacts directly with `Address`, 
  making the code more modular and easier to maintain.

## Primitive Obsession

Primitive Obsession is a code smell that occurs when primitive data types (like `int`, 
`string`, `bool`, etc.) are overused to represent concepts in your application, instead 
of creating custom types or classes that encapsulate these concepts. This can lead to a 
number of problems, such as scattered validation logic, difficulty in maintaining the 
code, and a lack of expressiveness.

For example, if you use strings to represent complex values such as addresses, email 
addresses, or phone numbers, you may end up duplicating validation logic throughout the 
codebase. This not only makes the code harder to understand but also increases the 
chance of bugs.

**How to Fix Primitive Obsession**

The solution is to replace the primitive types with custom classes that encapsulate the 
behaviour, validation, and logic of the underlying concept. This followsEncapsulation 
and the Single Responsibility Principle (SRP) by creating a focused class to 
manage a specific type of data.

**Example Before Refactoring**

``` c#
public class Order
{
    public string CustomerName { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }

    public Order(string customerName, string phoneNumber, string address)
    {
        // Primitive types are used directly to represent complex concepts
        CustomerName = customerName;
        PhoneNumber = phoneNumber;
        Address = address;
    }

    public void PlaceOrder()
    {
        // Scattered validation logic
        if (PhoneNumber.Length != 10)
        {
            throw new ArgumentException("Invalid phone number format");
        }

        if (string.IsNullOrEmpty(Address))
        {
            throw new ArgumentException("Address cannot be empty");
        }

        Console.WriteLine("Order placed for " + CustomerName + " at " + Address + ". Phone: " + PhoneNumber);
    }
}
```

**What’s Wrong?**

* The `PhoneNumber` and `Address` are represented by simple strings, even though these 
  are complex concepts that should have their own validation and behaviour encapsulated 
  in dedicated classes.
* Validation for `PhoneNumber` is scattered in the `Order` class, leading to duplicated 
  validation across the codebase if the same logic is needed elsewhere.
* There’s a lack of expressiveness and type safety, which makes the code harder to 
  maintain and prone to errors.

**After Refactoring**

To fix this, we can introduce custom types for `PhoneNumber` and `Address`, encapsulating 
their validation and behaviour within these classes.

``` c#
public class PhoneNumber
{
    public string Value { get; private set; }

    public PhoneNumber(string value)
    {
        if (value.Length != 10)
        {
            throw new ArgumentException("Phone number must be 10 digits");
        }
        Value = value;
    }

    public override string ToString()
    {
        return Value;
    }
}

public class Address
{
    public string Value { get; private set; }

    public Address(string value)
    {
        if (string.IsNullOrEmpty(value))
        {
            throw new ArgumentException("Address cannot be empty");
        }
        Value = value;
    }

    public override string ToString()
    {
        return Value;
    }
}

public class Order
{
    public string CustomerName { get; set; }
    public PhoneNumber PhoneNumber { get; set; }
    public Address Address { get; set; }

    public Order(string customerName, PhoneNumber phoneNumber, Address address)
    {
        CustomerName = customerName;
        PhoneNumber = phoneNumber;
        Address = address;
    }

    public void PlaceOrder()
    {
        // No validation needed here, as it's handled by the custom types
        Console.WriteLine($"Order placed for {CustomerName} at {Address}. Phone: {PhoneNumber}");
    }
}
```

**What’s Improved?**

* **Encapsulation**: The `PhoneNumber` and `Address` classes encapsulate their own 
  validation logic and behaviours, ensuring that any logic related to these concepts is 
  centralised within their respective classes.
* **Clarity and Type Safety**: The use of custom types makes the code more expressive 
  and provides better type safety. The Order class no longer has to worry about how to 
  validate phone numbers or addresses.
* **Maintainability**: If we need to change how phone numbers or addresses are validated in the future, we can do so in one place (within the PhoneNumber or Address class), rather than updating scattered validation logic throughout the codebase.
* **Single Responsibility Principle (SRP)**: Each class now has a clear responsibility. 
  The `PhoneNumber` class handles phone number validation, and the `Address` class handles 
  address-related logic, reducing the complexity in the `Order` class.


## Shotgun Surgery

This code smell occurs when a small change in the system requires making multiple, 
scattered changes across several classes or modules. This indicates poor cohesion and 
high coupling, where behaviour related to a single concern is spread across different parts 
of the codebase.

When Shotgun Surgery is present, a change in one piece of functionality necessitates making 
changes in several places, increasing the risk of errors and making maintenance more 
difficult. This also leads to code fragility, where modifying the system becomes 
time-consuming and prone to introducing bugs, because each small change touches many 
parts of the code.

**How to Fix It**

To fix Shotgun Surgery, you can refactor the code by centralising related behaviour into a 
single class or a smaller number of cohesive classes. This reduces the need for scattered 
changes across the codebase. Encapsulating behaviour and adhering to the Single 
Responsibility Principle (SRP) can help reduce the risk of this code smell by keeping 
related logic together.

**Example Before Refactoring**

In this example, imagine a system where the process of applying a discount involves 
making changes in multiple classes:

``` c#
public class Order
{
    public double TotalAmount { get; set; }

    public void ApplyDiscount(double discountRate)
    {
        TotalAmount -= TotalAmount * discountRate;
    }
}

public class Invoice
{
    public double AmountDue { get; set; }

    public void ApplyDiscount(double discountRate)
    {
        AmountDue -= AmountDue * discountRate;
    }
}

public class Receipt
{
    public double PaymentAmount { get; set; }

    public void ApplyDiscount(double discountRate)
    {
        PaymentAmount -= PaymentAmount * discountRate;
    }
}
```

**Problem with the Example**

If you need to modify the way the discount is applied (for example, by adding a minimum 
order amount for discounts), you would have to make changes to multiple classes (`Order`, 
`Invoice`, and `Receipt`). This is a typical example of Shotgun Surgery because a single 
change requires modifications in multiple places. This increases the complexity of the 
system, the risk of missing changes, and the possibility of introducing bugs.

**After Refactoring**

To resolve Shotgun Surgery, we can centralise the discount logic into a single class, 
creating a cohesive and reusable solution. Instead of spreading the logic across multiple 
classes, we encapsulate it in a `DiscountService` class.

``` c#
public class DiscountService
{
    public double ApplyDiscount(double amount, double discountRate)
    {
        return amount - (amount * discountRate);
    }
}

public class Order
{
    public double TotalAmount { get; set; }
    private DiscountService discountService;

    public Order(DiscountService discountService)
    {
        this.discountService = discountService;
    }

    public void ApplyDiscount(double discountRate)
    {
        TotalAmount = discountService.ApplyDiscount(TotalAmount, discountRate);
    }
}

public class Invoice
{
    public double AmountDue { get; set; }
    private DiscountService discountService;

    public Invoice(DiscountService discountService)
    {
        this.discountService = discountService;
    }

    public void ApplyDiscount(double discountRate)
    {
        AmountDue = discountService.ApplyDiscount(AmountDue, discountRate);
    }
}

public class Receipt
{
    public double PaymentAmount { get; set; }
    private DiscountService discountService;

    public Receipt(DiscountService discountService)
    {
        this.discountService = discountService;
    }

    public void ApplyDiscount(double discountRate)
    {
        PaymentAmount = discountService.ApplyDiscount(PaymentAmount, discountRate);
    }
}
```

**What's Improved?**

* **Centralised Logic**: The discount logic is now centralised in the `DiscountService` 
  class, eliminating the need to duplicate discount calculations across multiple classes.
* **Reduced Coupling**: Classes like `Order`, `Invoice`, and `Receipt` no longer need to 
  implement their own discount logic. Instead, they delegate this responsibility to 
  `DiscountService`, which improves cohesion and reduces coupling.
* **Ease of Maintenance**: If the discount logic needs to be changed in the future (e.g., 
  adding special discount conditions), the change only needs to be made in 
  `DiscountService`, not in multiple places. This reduces the risk of missing something or 
  introducing bugs.
* **Adheres to SRP**: Each class now has a single responsibility — `Order`, `Invoice`, 
  and `Receipt` deal with their own data, while `DiscountService` handles discount logic. 
  This follows the Single Responsibility Principle (SRP) and makes the system more modular.

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Practical tips for learning how to stop and correct code smells](code_smells_tips)


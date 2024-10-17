---
title: Refactoring Techniques
parent: Code Quality
has_children: true
has_toc: false
nav_order: 4
---

# Refactoring techniques

Refactoring is the process of improving the internal structure of existing code without altering 
its external behavior. It involves making incremental changes to the codebase to enhance 
readability, maintainability, and performance while ensuring that the system continues to 
function as expected. Refactoring is a critical practice in software engineering because, 
over time, codebases can become cluttered, difficult to manage, or suffer from technical debt 
due to rapid development, evolving requirements, or poor initial design.

The primary goal of refactoring is to make the code cleaner, more efficient, and easier to 
extend while maintaining its original functionality. This often involves simplifying complex 
logic, removing duplication, improving the organization of classes and methods, and applying 
design patterns where appropriate. Effective refactoring helps prevent bugs, reduces the cost 
of future modifications, and enhances overall code quality, leading to more robust and scalable 
software systems.

In these notes, we will explore various refactoring techniques, from simple adjustments like 
renaming variables and extracting methods, to more advanced techniques like restructuring large 
classes or applying design patterns. Understanding and applying these techniques is essential 
for software engineers who aim to write high-quality, maintainable code that can adapt to change 
over time. To use them effectively, you need to understand basic concepts from object orientation 
such as encapsulation, inheritance and polymorphism, and you need a good working knowledge 
of software engineering principles and design patterns.

## Simple Refactoring Techniques

Some refactoring techniques are just about writing readable and efficient code. You may need to
apply some of the following, for example, if you realise that you have inadvertently violated
the KISS or DRY principles.

1. **Rename Variables or Methods**

    Renaming variables or methods to more meaningful names improves code readability and 
    helps convey the intent of the code.

    <br>

    Before:
    
    ``` c#
    public class Order
    {
        public double x;  // "x" isn't clear
    
        public void Calc()  // Method name isn't descriptive
        {
            x = x * 1.1;
        }
    }
    ```
    
    After:
    
    ``` c#
    public class Order
    {
        public double totalAmount;  // Clear, descriptive variable name
    
        public void CalculateTotalWithTax()  // Method name conveys intent
        {
            totalAmount = totalAmount * 1.1;
        }
    }
    ```
    
    The code is more readable and self-explanatory. This reduces the need for comments to 
    explain what `x` or `Calc()` do.

    <br>

2. **Extract Method**

    When you have a block of code that does a specific task, extract it into a separate method. 
    This simplifies the original method and promotes code reuse.
    
    <br>
   
    Before:
    
    ``` c#
    public void ProcessOrder(Order order)
    {
        // Calculate discount
        if (order.Amount > 100)
        {
            order.Amount -= order.Amount * 0.1;
        }
    
        // Print receipt
        Console.WriteLine($"Order total: {order.Amount}");
    }
    ```
    
    After:
    
    ``` c#
    public void ProcessOrder(Order order)
    {
        ApplyDiscount(order);  // Extracted method
        PrintReceipt(order);   // Extracted method
    }
    
    private void ApplyDiscount(Order order)
    {
        if (order.Amount > 100)
        {
            order.Amount -= order.Amount * 0.1;
        }
    }
    
    private void PrintReceipt(Order order)
    {
        Console.WriteLine($"Order total: {order.Amount}");
    }
    ```
    
    The `ProcessOrder` method is now shorter, easier to read, and each extracted method has a 
    clear responsibility.

    <br>

3. **Inline Method**

    If a method’s body is simple and is only used in one place, you can replace the method 
    call with the method body to reduce unnecessary indirection.
    
    <br>
    
    Before:
    
    ``` c#
    public void ProcessOrder(Order order)
    {
        double total = GetTotal(order);
        Console.WriteLine($"Total: {total}");
    }
    
    private double GetTotal(Order order)
    {
        return order.Amount;
    }
    ```
    
    After:
    
    ``` c#
    public void ProcessOrder(Order order)
    {
        double total = order.Amount;  // Inlined method
        Console.WriteLine($"Total: {total}");
    }
    ```
    
    The `GetTotal` method was redundant. Inlining simplifies the code and removes 
    unnecessary abstraction.

    <br>

4. **Replace Magic Numbers with Constants**

    Using "magic numbers" (hard-coded numeric values) makes code less readable. Replace them 
    with constants that describe their meaning.
    
    <br>
    
    Before:
    
    ``` c#
    public void ApplyDiscount(Order order)
    {
        order.Amount -= order.Amount * 0.05;  // What does 0.05 represent?
    }
    ```
    
    After:
    
    ``` c#
    public const double DiscountRate = 0.05;
    
    public void ApplyDiscount(Order order)
    {
        order.Amount -= order.Amount * DiscountRate;  // Clear intent
    }
    ```
    
    The use of constants makes the code easier to understand, and future changes to the 
    discount rate can be made in one place.

    <br>

5. **Introduce Explaining Variable**

    Use variables to clarify the meaning of complex expressions by breaking them down into 
    smaller, more understandable parts.
    
    <br>
    
    Before:
    
    ``` c#
    public bool IsEligibleForDiscount(Order order)
    {
        return order.Amount > 100 && order.Customer.HasLoyaltyPoints && order.Items.Count > 5;
    }
    ```
    
    After:
    
    ``` c#
    public bool IsEligibleForDiscount(Order order)
    {
        bool hasEnoughAmount = order.Amount > 100;
        bool hasLoyaltyPoints = order.Customer.HasLoyaltyPoints;
        bool hasEnoughItems = order.Items.Count > 5;
    
        return hasEnoughAmount && hasLoyaltyPoints && hasEnoughItems;
    }
    ```
    
    Breaking down the expression into smaller variables makes the code easier to read and 
    understand at a glance.

    <br>

6. **Consolidate Duplicate Conditional Fragments**

    If the same code appears in multiple branches of a conditional, move it outside the 
    conditional to eliminate duplication.
    
    <br>
    
    Before:
    
    ``` c#
    public void PrintReceipt(Order order)
    {
        if (order.IsPriority)
        {
            Console.WriteLine("Priority Order");
            Console.WriteLine($"Total: {order.Amount}");
        }
        else
        {
            Console.WriteLine("Standard Order");
            Console.WriteLine($"Total: {order.Amount}");
        }
    }
    ```
    
    After:
    
    ``` c#
    public void PrintReceipt(Order order)
    {
        if (order.IsPriority)
        {
            Console.WriteLine("Priority Order");
        }
        else
        {
            Console.WriteLine("Standard Order");
        }
    
        Console.WriteLine($"Total: {order.Amount}");  // Duplicated code moved outside the conditional
    }
    ```
    
    Duplicated code is reduced, making the code more concise and easier to maintain.
    
    <br>

7. **Encapsulate Field**

    Directly accessing fields breaks encapsulation. Use getter and setter methods to control 
    access to a field, allowing better control over how the field is accessed or modified.
    
    <br>
    
    Before:
    
    ``` c#
    public class Order
    {
        public double amount;  // Direct field access
    }
    ```
    
    After:
    
    ``` c#
    public class Order
    {
        private double amount;
    
        public double GetAmount()  // Encapsulated field access
        {
            return amount;
        }
    
        public void SetAmount(double value)
        {
            amount = value;
        }
    }
    ```
    
    Encapsulation provides flexibility to add validation, logging, or other logic when 
    getting or setting values, without exposing the internal implementation.
    
    <br>

8. **Decompose Conditional**

    Complex conditionals can be hard to understand. Break them into separate methods or 
    use guard clauses to improve clarity.
    
    <br>
    
    Before:
    
    ``` c#
    public double CalculateShippingCost(Order order)
    {
        if (order.Customer.IsPremium && order.Amount > 100)
        {
            return 0;
        }
        else if (order.Customer.IsPremium)
        {
            return 5;
        }
        else
        {
            return 10;
        }
    }
    ```
    
    After:
    
    ``` c#
    public double CalculateShippingCost(Order order)
    {
        if (IsFreeShipping(order)) return 0;
        if (IsDiscountedShipping(order)) return 5;
        return 10;
    }
    
    private bool IsFreeShipping(Order order)
    {
        return order.Customer.IsPremium && order.Amount > 100;
    }
    
    private bool IsDiscountedShipping(Order order)
    {
        return order.Customer.IsPremium;
    }
    ```
    
    The conditional logic is now more readable and easier to modify or extend.
    
    <br>

## Advanced refactoring techniques

Some problems run a little deeper than just improving code readability. Identifying and
resolving structural issues with your core requires a good working knowledge of software
engineering principles and design patterns.

1. **Extract Class**

    When a class becomes too large and takes on too many responsibilities, it violates the 
    Single Responsibility Principle (SRP). To correct this, you can refactor by splitting 
    the class into smaller, more focused classes.
    
    <br>
    
    Before:
    
    ``` c#
    public class Customer
    {
        public string Name { get; set; }
        public string Email { get; set; }
    
        // Address information
        public string Street { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
    
        public void SendEmail()
        {
            Console.WriteLine($"Sending email to {Email}");
        }
    }
    ```
    
    After:
    
    ``` c#
    public class Customer
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public Address Address { get; set; }  // Address extracted into its own class
    
        public void SendEmail()
        {
            Console.WriteLine($"Sending email to {Email}");
        }
    }
    
    public class Address
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
    }
    ```
    
    This refactor follows the Single Responsibility Principle (SRP), as each class is now 
    responsible for one thing. The `Customer` class handles customer-specific data and behavior, 
    while the `Address` class encapsulates address-related information. This separation 
    simplifies future modifications, improves code readability, and reduces the likelihood 
    of changes to one class affecting the other.
    
    <br>

2. **Move Method**

    If a method in one class uses data from another class more than its own, it may be better 
    suited in the other class. This promotes cohesion by ensuring related functionality 
    resides together.
    
    <br>
    
    Before:
    
    ``` c#
    public class Order
    {
        public double Amount { get; set; }
        public Customer Customer { get; set; }
    
        public double CalculateDiscount()
        {
            if (Customer.IsLoyalCustomer)
            {
                return Amount * 0.1;
            }
            return 0;
        }
    }
    ```
    
    After:
    
    ``` c#
    public class Order
    {
        public double Amount { get; set; }
        public Customer Customer { get; set; }
    
        public double ApplyDiscount()
        {
            return Customer.CalculateDiscount(Amount);  // Move discount logic to Customer
        }
    }
    
    public class Customer
    {
        public bool IsLoyalCustomer { get; set; }
    
        public double CalculateDiscount(double amount)
        {
            return IsLoyalCustomer ? amount * 0.1 : 0;
        }
    }
    ```
    
    This refactor adheres to the [Law of Demeter](https://deviq.com/laws/law-of-demeter) 
    (also known as the principle of least knowledge) and SRP. The discount logic is more 
    naturally tied to the Customer class, as it depends on customer properties. Moving this 
    method ensures that classes deal primarily with their own data, improving cohesion and 
    making the code easier to understand and maintain.
    
    <br>

3. **Replace Conditional with Polymorphism**

    When you have conditionals (e.g., if-else or switch statements) that change behavior 
    based on the type of an object, you can refactor by using polymorphism to simplify the 
    code. This adheres to the Open/Closed Principle (OCP), as the class can now be extended 
    without modification.
    
    <br>
    
    Before:
    
    ``` c#
    public class Employee
    {
        public string Type { get; set; }
    
        public double CalculateBonus(double salary)
        {
            if (Type == "Manager")
            {
                return salary * 0.5;
            }
            else if (Type == "Developer")
            {
                return salary * 0.2;
            }
            return 0;
        }
    }
    ```
    
    After:
    
    ``` c#
    public abstract class Employee
    {
        public abstract double CalculateBonus(double salary);
    }
    
    public class Manager : Employee
    {
        public override double CalculateBonus(double salary)
        {
            return salary * 0.5;
        }
    }
    
    public class Developer : Employee
    {
        public override double CalculateBonus(double salary)
        {
            return salary * 0.2;
        }
    }
    ```
    
    By replacing the conditional logic with polymorphism, we follow the Open/Closed Principle 
    (OCP). Now, the `Employee` class can be extended by adding new types (e.g., `Intern`, 
    `Consultant`) without modifying the existing code, thus reducing the risk of breaking 
    functionality when the system evolves. It also improves code readability and removes 
    clutter from conditionals.
    
    <br>

4. **Replace Data Value with Object**

    When primitive data is used to represent multiple attributes or behaviors, you can 
    refactor it into a class that represents that concept. This follows Encapsulation and SRP.
    
    <br>
    
    Before:
    
    ``` c#
    public class Order
    {
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    
        public double GetTotalPrice()
        {
            return Quantity * Price;
        }
    }
    ```
    
    After:
    
    ``` c#
    public class Product
    {
        public string Name { get; set; }
        public double Price { get; set; }
    }
    
    public class Order
    {
        public Product Product { get; set; }
        public int Quantity { get; set; }
    
        public double GetTotalPrice()
        {
            return Quantity * Product.Price;
        }
    }
    ```
    
    This refactor improves encapsulation by bundling product-related attributes and behaviors 
    within the `Product` class, keeping the logic grouped logically. It follows SRP, as `Product` 
    now manages its own state, and the `Order` class focuses on order-specific behavior. This 
    separation of concerns makes both classes easier to maintain and extend.
    
    <br>

5. **Introduce Parameter Object**

    When a method has too many parameters, you can refactor by introducing an object that 
    encapsulates related data. This promotes readability and reduces cognitive complexity.
    
    <br>
    
    Before:
    
    ``` c#
    public void CreateOrder(string productName, int quantity, double price, string customerName, string customerAddress)
    {
        // Order creation logic
    }
    ```
    
    After:
    
    ``` c#
    public class Product
    {
        public string Name { get; set; }
        public double Price { get; set; }
    }
    
    public class Customer
    {
        public string Name { get; set; }
        public string Address { get; set; }
    }
    
    public void CreateOrder(Product product, int quantity, Customer customer)
    {
        // Order creation logic
    }
    ```
    
    This refactor improves code readability by reducing the number of parameters and grouping 
    related data into cohesive objects (`Product` and `Customer`). This follows SRP and reduces 
    the complexity of method signatures, making the code more maintainable and scalable. As the 
    system grows, it is easier to add new properties to `Product` or `Customer` without 
    modifying the method signature.
    
    <br>

6. **Introduce Null Object**

Instead of returning `null` and having many `null` checks in the code, you can introduce a 
Null Object that represents a default behavior or empty state. This improves encapsulation 
and reduces error-prone null checks.

<br>

Before:

``` c#
public class Customer
{
    public Address Address { get; set; }
}

public string GetCustomerStreet(Customer customer)
{
    if (customer == null || customer.Address == null)
    {
        return "No Address";
    }
    return customer.Address.Street;
}
```

After:

``` c#
public class NullAddress : Address
{
    public override string Street => "No Address";
}

public class Customer
{
    public Address Address { get; set; } = new NullAddress();  // Default to Null Object
}

public string GetCustomerStreet(Customer customer)
{
    return customer.Address.Street;
}
```

Using a Null Object avoids error-prone `null` checks and simplifies the code. This follows 
the [Tell, Don’t Ask](https://deviq.com/principles/tell-dont-ask) principle, allowing 
methods to ask objects to do things rather than query their state and act accordingly. 
This also enhances encapsulation by allowing objects to manage their own behavior for 
edge cases (like `null` states).

<br>

7. **Replace Temp with Query**

    When a temporary variable is assigned a value that could be calculated directly in the 
    method, consider eliminating the variable and replacing it with a query (method call). 
    This improves readability and adheres to KISS (Keep It Simple, Stupid).
    
    <br>
    
    Before:
    
    ``` c#
    public double CalculateTotal(Order order)
    {
        double discount = GetDiscount(order);  // Temporary variable
        return order.Amount - discount;
    }
    ```
    
    After:
    
    ``` c#
    public double CalculateTotal(Order order)
    {
        return order.Amount - GetDiscount(order);  // Replace temp with query
    }
    ```
    
    This refactor follows the KISS principle, as it simplifies the method by removing 
    unnecessary temporary variables. It makes the code easier to read and maintain by 
    eliminating an intermediate step, directly executing the query instead. This also 
    leads to cleaner, more focused methods.
    
    <br>

8. **Encapsulate Collection**

If a class exposes a collection (such as a list) directly, clients of the class can 
modify the collection, breaking encapsulation. Encapsulating the collection ensures 
better control over how the collection is accessed or modified.

<br>

Before:

``` c#
public class Order
{
    public List<Item> Items { get; set; } = new List<Item>();
}
```

After:

``` c#
public class Order
{
    private List<Item> items = new List<Item>();

    public IReadOnlyList<Item> Items => items.AsReadOnly();  // Read-only access

    public void AddItem(Item item)
    {
        items.Add(item);
    }

    public void RemoveItem(Item item)
    {
        items.Remove(item);
    }
}
```

By encapsulating the collection, you follow encapsulation and information hiding 
principles. The client cannot directly modify the `Items` collection, ensuring that the 
class controls how the collection is manipulated. This protects the internal state and 
enforces consistency in how the collection is accessed.

<br>

## When to apply refactoring

Refactoring is an essential part of the software development process and can be applied at 
various stages to improve the code's structure, readability, maintainability, and performance. 
Here are key points during the development process where refactoring techniques should be applied:

1. During Code Reviews

    During code reviews, team members may identify code smells, duplication, or excessive 
    complexity. This is an ideal time to refactor because it ensures that only clean, 
    maintainable code is merged into the main codebase. Code reviews provide an opportunity 
    to catch potential issues before they become embedded in the project, and refactoring at 
    this stage can prevent future technical debt.

2. After Writing the First Draft of Code

    After completing the initial implementation, it's a good idea to review the code for 
    clarity, structure, and adherence to best practices. The first version of the code often 
    focuses on functionality, and as developers gain a deeper understanding of the problem, 
    it’s important to refactor the code to make it simpler, more modular, and easier to 
    maintain. This step ensures that the initial logic is refined and optimized before it 
    becomes part of the larger codebase.

3. Before Adding New Features

    When preparing to implement new functionality, it’s essential to assess the current 
    state of the code. If the existing codebase is burdened with technical debt or complexity, 
    refactoring it before introducing new features makes the process smoother and reduces 
    the risk of introducing bugs. By cleaning up the code first, developers ensure that the 
    foundation is solid, allowing for easier extension and minimizing future headaches.

4. When Fixing Bugs

    If you encounter confusing or overly complex code while fixing a bug, it is a good practice 
    to refactor that code. Often, poorly structured code can hide bugs or make them harder to 
    resolve. By simplifying and clarifying the code during the bug-fixing process, you not only 
    solve the immediate problem but also reduce the likelihood of encountering similar issues 
    in the future. Refactoring in this context is key to improving the long-term maintainability 
    of the system.

5. When Implementing Code that Violates SOLID Principles

    The SOLID principles are fundamental to writing clean, scalable code. If you notice 
    violations of these principles, refactoring the affected areas ensures that the code 
    adheres to good design practices, making it easier to modify, extend, and maintain as 
    the project grows. This proactive approach prevents the accumulation of technical debt.

6. As Part of Continuous Refactoring (Technical Debt Reduction)

    Incorporating continuous refactoring as part of your daily workflow is another important 
    strategy. Over time, even well-written code can accumulate technical debt as new features 
    are added or requirements change. Regular refactoring, such as setting aside time during 
    each sprint or development cycle, ensures that the code remains clean and manageable. 
    This approach minimizes long-term technical debt and keeps the codebase in a healthy 
    state, allowing the team to focus on adding value rather than constantly fixing problems.

7. When Performance Becomes a Concern

    If you identify performance bottlenecks or inefficient code, refactoring can help you 
    streamline operations, optimize algorithms, or reduce redundancy, all without altering 
    the external behavior of the system. By addressing performance issues through refactoring, 
    you ensure that the code remains both functional and efficient.

8. When the Code Becomes Hard to Understand (Code Smells)

    Over time, complex logic, unclear naming, and code duplication can make it difficult for 
    developers to understand and maintain the code. If you find yourself or others struggling 
    to grasp the code’s purpose or flow, refactoring can help. This might involve renaming 
    variables, breaking down large methods into smaller, more manageable ones, or simplifying 
    logic to make the code more readable. This approach ensures that the code remains accessible 
    and maintainable, even as the project grows.

9. Before Merging Code into the Main Branch

    Ensuring that the newly developed feature adheres to coding standards, doesn’t introduce 
    unnecessary complexity, and follows best practices is critical. Refactoring before merging 
    ensures that the codebase remains clean, scalable, and free of technical debt, which is 
    especially important for long-term maintenance.

10. When Onboarding New Team Members

    If new developers struggle to understand the existing codebase, it may be a sign that 
    the code needs refactoring for clarity. Refactoring at this stage not only helps the new 
    team members become productive faster but also improves the overall quality of the code, 
    making it easier for everyone to work with in the long term.

11. During Legacy Code Maintenance

    When working on legacy systems, you often encounter outdated practices, overly complex 
    logic, or code that violates modern principles. Refactoring legacy code ensures that it 
    adheres to current standards and becomes easier to maintain and extend. This approach helps 
    breathe new life into old systems and allows them to evolve with the project’s needs.

## Conclusion

Refactoring is a key practice for improving code quality, readability, and maintainability. 
Simple refactoring techniques can be applied to most codebases and will lead to more 
robust and clean code. More advanced refactoring techniques align with key software engineering 
principles like Single Responsibility (SRP), Open/Closed Principle (OCP), and Encapsulation. 

Refactoring should be applied continuously throughout the development process. By refactoring 
early and often, you can improve code quality, reduce technical debt, and keep the codebase 
adaptable for future growth. Applying refactoring techniques at key points—such as during 
code reviews, after bug fixes, or before adding new features—ensures that the code remains 
clean, readable, and maintainable over time.

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Tips for refactoring](refactoring_techniques_tips)


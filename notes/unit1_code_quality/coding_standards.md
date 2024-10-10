---
title: Coding standards
parent: Code quality
has_children: true
nav_order: 2
---

# Coding standards

Coding standards are a critical aspect of writing clean, maintainable, and collaborative 
code. They ensure consistency, readability, and quality across development teams, 
especially in professional software engineering environments. Beyond technical benefits, 
following coding standards plays a vital role in fostering inclusive engineering 
practices, effective teamwork, and clear communication with both technical and 
non-technical stakeholders.

## Why coding standards matter

* **Readability**: Clear, consistent code is easier to understand, which benefits all team 
  members regardless of their background or experience level.
* **Maintainability**: Code that adheres to standards is easier to extend, refactor, and 
  debug, making long-term maintenance efficient and sustainable.
* **Collaboration**: Coding standards help ensure that teams write code in a similar style, 
  making collaboration across diverse groups more effective.
* **Error Reduction**: By following best practices, developers can avoid common pitfalls and 
  reduce the introduction of bugs into the codebase.
* **Inclusivity**: Standardized coding practices reduce entry barriers for team members from 
  different backgrounds, ensuring everyone can contribute equally and confidently.

## Key areas of coding standards

1. **Naming Conventions**

    Consistent and meaningful naming conventions promote clarity and make it easier for 
    everyone on the team to understand the code, regardless of their experience level or 
    cultural background. Inclusive coding standards help create a collaborative 
    environment where every member can easily comprehend and contribute to the project.
    
    * Classes and Interfaces: Use PascalCase for class names and interfaces (prefix 
        interfaces with an _I_).
    
        Example:
    
        ``` c#
        public class CustomerManager { }
        public interface ICustomerRepository { }
        ```
   
    * Methods and Properties: Use PascalCase for method and property names.

        Example:
    
        ``` c#
        public void CalculateTotalPrice() { }
        public int CustomerAge { get; set; }
       ```
   
    * Variables and Parameters: Use camelCase for local variables and method parameters.
    
        Example:
    
        ``` c#
        int customerCount = 0;
        public void SetCustomerAge(int customerAge) { }
       ```
   
    By using clear, descriptive naming conventions, you reduce ambiguity and cognitive 
    load, making it easier for developers from all backgrounds to understand and 
    contribute. It ensures that everyone can equally participate in code reviews and 
    collaborative coding efforts.
    
2. **Indentation and Whitespace**

    Proper indentation and the use of whitespace are crucial for readability. It helps 
    ensure that your code is easily understandable by others, regardless of their 
    familiarity with the codebase. C# typically uses 4 spaces per indent.
    
    Method Example:
    
    ``` c#
    public void ProcessOrder(Order order)
    {
        if (order == null)
        {
            throw new ArgumentNullException(nameof(order));
        }
    
        CalculateTotal(order);
        SaveOrder(order);
    }
    ```
    
    Adhering to consistent indentation and formatting standards fosters an inclusive 
    environment where code is easier to understand and modify by any team member, leading 
    to more effective collaboration. When all team members write code in the same style, 
    the barrier to onboarding new team members or reviewing peer code is significantly 
    reduced, increasing overall team efficiency.
    
3. **Comments**

    Comments are essential for making code accessible to others, especially for complex 
    sections or when working in diverse teams. A consistent commenting strategy helps 
    everyone — whether technical or non-technical—understand the intention and functionality 
    of the code.
    
    * Inline Comments: Use inline comments to explain non-obvious logic.
    
        ``` c#
        // Calculate the total price after applying discounts
        decimal totalPrice = order.Subtotal - discount;
    ```

  * XML Documentation Comments: Use for documenting public methods, properties, and classes.

      ``` c#
      /// <summary>
      /// Calculates the total price of the order.
      /// </summary>
      /// <param name="order">The order for which to calculate the price.</param>
      /// <returns>The total price.</returns>
      public decimal CalculateTotalPrice(Order order)
      {
          // Calculation logic here
      }
      ```

    Good comments facilitate effective communication between team members and stakeholders. 
    They ensure that non-technical team members, or those with less experience, can 
    understand complex code logic and participate meaningfully in discussions about 
    software design and functionality.
    
4. **Error Handling and Defensive Programming**

    Always handle exceptions and use defensive programming techniques to ensure robustness 
    and clarity, allowing everyone on the team to understand and handle errors consistently.
    
    * Try/Catch Example:
    
        ``` c#
        public decimal DivideNumbers(decimal numerator, decimal denominator)
        {
            try
            {
                return numerator / denominator;
            }
            catch (DivideByZeroException)
            {
                Console.WriteLine("Error: Cannot divide by zero.");
                return 0;
            }
        }
        ```
    
      * Null Checking: Always check for null values to avoid runtime errors.
    
    
        ``` c#
        if (order == null)
        {
            throw new ArgumentNullException(nameof(order));
        }
        ```
    
    Defensive programming creates a safety net, reducing errors that can disproportionately 
    affect developers with less experience or those unfamiliar with a specific codebase. By 
    making code predictable and clear, all developers can contribute confidently, enhancing 
    the inclusivity of the engineering environment.

5. **Code Structure and Modularity** 

    A well-structured and modular codebase allows team members to work on individual 
    components independently. This approach fosters both inclusivity and teamwork by 
    breaking down large tasks into manageable, clearly defined units that can be assigned 
    to team members based on their strengths or development goals.
    
    Good Structure Example:
    
    ``` c#
    public class OrderProcessor
    {
        public void ProcessOrder(Order order)
        {
            ValidateOrder(order);
            CalculateTotal(order);
            CompleteTransaction(order);
        }
    
        private void ValidateOrder(Order order) { /* Validation logic */ }
        private void CalculateTotal(Order order) { /* Calculation logic */ }
        private void CompleteTransaction(Order order) { /* Transaction logic */ }
    }
    ```
    
    This promotes effective teamwork by allowing individuals or smaller teams to work on 
    specific modules without stepping on each other’s toes. It also helps evaluate both 
    individual and team performance by making contributions easy to track and measure, 
    enabling continuous improvement.
    
6. **Consistent Use of Braces**

    Braces {} should always be used with control structures, even for single-line statements. 
    This consistency prevents subtle bugs and makes the code clearer to everyone on the team, 
    especially during peer reviews or when non-expert team members are contributing.
    
    Example:
    
    ``` c#
    if (isLoggedIn)
    {
        ShowDashboard();
    }
    else
    {
        ShowLoginScreen();
    }
    ```
    
    Avoid omitting braces:
    
    ``` c#
    if (isLoggedIn)
        ShowDashboard();
    ```
    
    Consistent brace usage ensures that the code communicates intent clearly to all 
    stakeholders, reducing ambiguity and improving the effectiveness of code reviews and 
    team discussions. Non-technical audiences can more easily follow the logical flow when 
    presented with consistent, well-formatted code.
    
    Bad Example vs. Good Example
    
    Bad Example:
    
    ``` c#
    int a=10; int b=20; public void Add(int a,int b){Console.WriteLine(a+b);}
    if (customer!=null) showCustomerDetails(customer); else hideCustomerDetails();
    ```
    
    Good Example:
    
    ``` c#
    public class Calculator
    {
        public void Add(int a, int b)
        {
            Console.WriteLine(a + b);
        }
    }
    
    public void DisplayCustomerDetails(Customer customer)
    {
        if (customer != null)
        {
            ShowCustomerDetails(customer);
        }
        else
        {
            HideCustomerDetails();
        }
    }
    ```

## Conclusion

Consistent coding standards help ensure that everyone — regardless of their background, 
experience, or identity — can contribute equally to a project. They level the playing 
field by reducing the complexity of the codebase, making it easier to understand and 
collaborate on. By adopting clear naming conventions, code formatting, and commenting 
practices, we foster a more inclusive environment where all team members feel valued 
and capable of making meaningful contributions.

Coding standards facilitate teamwork by ensuring that all contributors follow the same 
rules, making it easier for teams to work on the same project simultaneously. By adhering 
to standards, teams can evaluate their performance more effectively, measure progress, 
and identify areas for improvement. Clear, modular code also helps in delegation, 
allowing team members to focus on specific components, fostering collaboration and 
mutual support.

Standards play a critical role in how we communicate complex engineering concepts, both 
within the team and to external stakeholders. Well-commented and structured code helps 
technical and non-technical audiences understand the purpose and behavior of the software. 
By adhering to standards, developers ensure that their code "speaks the same language," 
making communication smoother and more effective across different audiences.

Coding standards are about much more than just writing "clean" code. They help foster an 
inclusive engineering culture, promote effective teamwork, and facilitate clear 
communication across diverse teams and audiences. By adhering to these principles, 
software engineering becomes not only more efficient but also more equitable and 
collaborative.

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Guidelines for coding standards](notes/unit1_code_quality/codeing_standards_guidelines.md)

---
title: Documentation Tips
parent: Documentation
has_children: false
nav_exclude: true
nav_order: 1
---

# Practical tips for producing effective documentation

1. Write Self-Documenting Code First

    > Aim to make your code as clear and readable as possible, following clean code principles. Use 
    > meaningful variable, function, and class names that clearly describe their purpose, reducing the 
    > need for excessive comments. For example, prefer calculateTotalPrice() over calc() or total(). 
    > When code is easy to read, you can focus on documenting the bigger picture rather than explaining 
    > individual lines.

2. Use Structured Comment Systems Like Javadoc or Doxygen

    > For more extensive documentation, use structured comment systems such as 
    > [Javadoc](https://www.oracle.com/uk/technical-resources/articles/java/javadoc-tool.html) (for Java) 
    > or [Doxygen](https://www.doxygen.nl/) (for C++, Python, etc.). These tools generate documentation 
    > automatically from specially formatted comments, making it easy to keep documentation up to date. 
    > Structured comments help you document complex classes, methods, parameters, and return types in a 
    > consistent, organized way.
    >
    > ```c#
    > /**
    >  * Calculates the total price including tax.
    >  *
    >  * @param price The base price of the item.
    >  * @param taxRate The tax rate as a decimal.
    >  * @return The total price with tax included.
    >  */
    > public double calculateTotalPrice(double price, double taxRate) {
    >     return price * (1 + taxRate);
    > }
    > ```

3. Document the Purpose, Not the Implementation

    > Avoid commenting on what each line of code does, as it can clutter your code. Instead, explain 
    > the purpose of functions, classes, or code blocks. For example, comment on why a function exists 
    > or what a class is responsible for, rather than detailing each internal step. This approach makes 
    > comments more meaningful and less likely to become outdated as code changes.

4. Include Parameter and Return Descriptions in Functions

    > When documenting functions or methods, clearly describe the purpose of each parameter and the 
    > return value. For instance, use `@param` and `@return` in 
    > [Javadoc](https://www.oracle.com/uk/technical-resources/articles/java/javadoc-tool.html) or 
    > [Doxygen](https://www.doxygen.nl/) to explain inputs and outputs concisely. This helps other 
    > developers understand the function’s expected usage without needing to dive into the code details.

5. Write High-Level Documentation for Modules and Classes

    > Provide an overview of each module or class at the top of the file, explaining its purpose, 
    > functionality, and how it fits into the larger system. This high-level documentation gives other 
    > developers context, making it easier to understand the code’s structure and goals. Structured 
    > comment systems can help with this by allowing you to add class or module descriptions that are
    > automatically organized in the documentation.

6. Use Consistent Formatting and Structure

    > Consistency in documentation style makes it easier to read and navigate. Follow your team’s 
    > conventions or choose a structure and stick with it. For example, decide on a consistent way to 
    > describe parameters, return values, and exceptions, such as always including @throws for 
    > exceptions in Java or following a specific order for parameter descriptions in Doxygen.

7. Document Assumptions, Limitations, and Edge Cases

    > Explain any assumptions you’re making in the code, known limitations, and important edge cases. 
    > This information is critical for anyone extending or modifying the code, as it clarifies why certain 
    > design decisions were made and what risks or constraints to keep in mind. For instance, if a method 
    > expects a non-null parameter, document this assumption explicitly.

8. Leverage Auto-Generated Documentation for API Consistency

    > For larger projects or APIs, auto-generated documentation (from 
    > [Javadoc](https://www.oracle.com/uk/technical-resources/articles/java/javadoc-tool.html), 
    > [Doxygen](https://www.doxygen.nl/), or similar tools) keeps documentation up-to-date as code 
    > changes. These tools help enforce consistent formatting and make it easy to browse functions, 
    > parameters, and return types, especially in complex libraries or public APIs.

9. Include Examples Where Useful

    > Adding usage examples in the documentation helps other developers understand how to use a class or 
    > method correctly. For complex methods or APIs, provide code snippets demonstrating typical usage. 
    > Examples make the documentation more practical and reduce the need for developers to experiment just 
    > to understand basic functionality.
    >
    > ```c#
    > /// <summary>
    > /// Connects to the database using the provided connection string.
    > /// </summary>
    > /// <param name="connectionString">The database connection string.</param>
    > /// <exception cref="DatabaseConnectionException">Thrown if unable to connect to the database.</exception>
    > /// <example>
    > /// <code>
    > /// var database = new Database();
    > /// database.Connect("Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;");
    > /// </code>
    > /// </example>
    > public void Connect(string connectionString)
    > {
    >     // Implementation here
    > }
    > ```

10. Update Documentation When Code Changes

    > Documentation is only valuable if it reflects the current state of the code. Whenever you modify 
    > a function, class, or module, review its documentation and update it as necessary. Structured 
    > documentation tools can help, as they highlight missing or outdated comments, prompting you to 
    > make updates alongside code changes.

11. Use Inline Comments Sparingly for Complex Logic

    > Inline comments are useful for explaining complex logic or non-intuitive sections of code. Place 
    > them sparingly and directly above the relevant lines, only where the code’s intent isn’t 
    > immediately clear. Inline comments should clarify “why” something is done rather than “what” is 
    > done, which should already be apparent from good naming and structure.

12. Create a README for Project-Level Documentation

    > Include a README file at the root of your project. This file should provide a high-level overview, 
    > including the project’s purpose, setup instructions, dependencies, and usage examples. A README 
    > serves as the first point of contact for anyone new to the project, offering the essential context 
    > they need to get started quickly.

13. Use TODO Comments for Known Issues or Future Enhancements

    > For code that requires future improvements or has known limitations, use TODO comments. These comments help keep track of incomplete sections and serve as a reminder for future enhancements. For example:
    >
    > ```c#
    > // TODO: Optimize this loop for performance.
    >```
    > 
    > When reviewing code, other developers will see these markers, helping them prioritize improvements.

14. Keep Documentation Concise and Focused

    > Avoid overly verbose comments that could distract from the main points. Aim for brevity and 
    > clarity, focusing only on what’s necessary to understand or use the code effectively. Concise 
    > documentation is easier to maintain and quicker for others to read.

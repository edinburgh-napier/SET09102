---
title: Readability Tips
parent: Readability
has_children: false
nav_exclude: true
nav_order: 1
---

# Tips for improving code readability

Apart from the recommendation that are built into clean code such as using meaningful
names and short methods, you can apply the following strategies to continuously improve
your coding style and commenting practice.

1. Follow Consistent Naming Conventions

    > Adhere to a consistent naming convention (such as camelCase for variables and PascalCase 
    > for classes in C#). This improves readability and reduces cognitive load.
    > 
    > Agree on a naming standard with your team and stick to it across the entire codebase.

2. Comment on the “Why,” Not the “What”

    > Avoid writing comments that explain what the code does; focus on explaining why certain 
    > decisions were made or any non-obvious aspects of the code.
    > 
    > For example, avoid comments like `// Increment x by 1`. Instead, provide context for 
    > complex logic, such as `// Ensure x is incremented to maintain the sequence`.

3. Keep Comments Up-to-Date

    > Ensure that your comments are always in sync with the code. Outdated or incorrect 
    > comments are worse than no comments because they mislead developers.
    > 
    > Whenever you update the code, check that the related comments reflect the current 
    > logic and behaviour.

4. Break Long Lines of Code

    > Avoid long lines of code that require horizontal scrolling. Break long statements into 
    > multiple lines for better readability.
    > 
    > Use indentation and line breaks to split complex expressions across multiple lines, 
    > making it easier to follow the logic.

5. Use Proper Code Formatting and Indentation

    > Consistently format your code with proper indentation, spaces, and line breaks to make 
    > it more readable. Unformatted code is difficult to scan and understand.
    > 
    > Use code formatting tools in your IDE (e.g., Visual Studio, VSCode) to automatically 
    > format the code. Adopt a coding standard that ensures uniformity across the codebase.

6. Refactor Often

    > Regularly refactor your code to improve clarity, structure, and readability. Don’t wait 
    > for the code to become unmanageable.
    > 
    > Refactor complex or messy code as part of your normal development process. Break down 
    > large methods, eliminate duplication, and clean up unnecessary logic.

7. Group Related Code Together

    > Keep related methods, variables, and logic grouped together. This makes it easier to 
    > follow the flow of the code and understand the relationships between components.
    > 
    > For example, place helper methods near the code that calls them, and group similar 
    > functions together in logical sections.

8. Use Consistent Control Flow

    > Be consistent in how you handle conditionals, loops, and error handling. This ensures 
    > that your code follows a predictable structure, making it easier to read.
    > 
    > Stick to common patterns for control flow (e.g., avoid deeply nested conditionals by 
    > refactoring with guard clauses or breaking out complex logic into separate functions).

9. Avoid Deep Nesting

    > Deeply nested code is difficult to follow. Avoid deep nesting by simplifying your control 
    > flow and using early returns or breaking out logic into smaller functions.
    > 
    > Refactor deeply nested loops or conditionals into more readable structures to flatten 
    > the code and reduce complexity.

10. Use Constants and Enums Instead of Magic Numbers

    > Avoid "magic numbers" or hard-coded values in your code. Use constants or enums to give 
    > meaning to these values, improving both readability and maintainability.
    > 
    > Replace numbers like `5` or `10` with meaningful constants like `MAX_RETRIES` or use enums 
    > for state or condition flags.

11. Review and Learn from Others

    > Participate in code reviews and learn from how other developers write readable and 
    > well-commented code. Pay attention to feedback on your own code readability.
    > 
    > During code reviews, look for areas where the code can be clarified, both in terms of 
    > readability and documentation. Observe best practices used by more experienced developers.

12. Write Clear and Descriptive Error Messages

    > When handling exceptions or logging errors, write clear and descriptive messages. This 
    > helps other developers (and future you) quickly understand the problem.
    > 
    > Instead of generic messages like "Error occurred," provide meaningful context, such as 
    > "File not found: Check the path in the configuration file."

13. Use Unit Tests to Clarify Intent

    > Well-written unit tests can act as documentation for your code by showing how the code 
    > is expected to behave in different scenarios.
    > 
    > Write tests that cover a range of cases and use clear naming to describe what each test 
    > is checking. This makes the code’s purpose and behaviour more transparent.


---
title: Internal Quality Tips
parent: Internal Quality
has_children: false
nav_exclude: true
nav_order: 1
---

# Practical tips for applying internal quality criteria

1. Use Automated Tools for Quantitative Metrics

    > Tools like SonarQube, CodeClimate, or similar static analysis tools can measure cyclomatic complexity, 
    > test coverage, and code duplication automatically. Set up these tools in your CI/CD pipeline to track 
    > these metrics continuously, so you’re alerted to areas with high complexity or low coverage as you work.

2. Regularly Review and Refactor Code for Readability

    > High readability improves collaboration and maintenance. Aim to make each function or class as clear as 
    > possible by using meaningful names, reducing overly complex logic, and adhering to a consistent style. 
    > Refactor code that becomes confusing or difficult to follow, as this directly enhances readability.

3. Break Down High-Complexity Functions

    > Cyclomatic complexity measures the number of decision paths in your code, and high scores indicate 
    > difficult-to-maintain functions. If you encounter a function with high complexity, break it into smaller, 
    > focused functions. This practice not only makes testing easier but also aligns with the Single 
    > Responsibility Principle.

4. Prioritise Testing for Critical Paths

    > Test coverage is an important internal metric, but 100% coverage isn’t always realistic or necessary. 
    > Focus on testing critical areas thoroughly, such as core logic, calculations, and functions with high 
    > cyclomatic complexity, to maximise reliability in key areas of the codebase.

5. Adopt and Enforce Coding Standards

    > Adhering to consistent coding standards helps create uniformity, making it easier for others to 
    > understand your code. Use linters and formatters to enforce standards and conduct code reviews with 
    > coding standards in mind. This approach improves code quality across the team and ensures best practices 
    > are consistently followed.

6. Modularise for Maintainability

    > Modular, decoupled code is easier to maintain and extend. Aim to create small, cohesive modules and 
    > avoid dependencies between unrelated components. For example, use interfaces to abstract dependencies, 
    > which enhances testability and supports changes with minimal impact on other parts of the system.

7. Use Code Reviews to Assess Qualitative Aspects

    > Set up regular code reviews to evaluate qualitative criteria such as readability, adherence to standards, 
    > and modularity. Reviews provide opportunities for feedback, help maintain high standards, and allow 
    > developers to catch issues that automated tools may miss.

8. Document Complex Code and Design Decisions

    > For sections of code with inherently high complexity or critical design decisions, use inline comments 
    > or a separate documentation file to provide context. This helps team members understand the reasoning 
    > behind specific approaches, improving maintainability.

9. Balance Quantitative Metrics with Judgment

    > High scores in quantitative metrics like test coverage or low cyclomatic complexity don’t guarantee 
    > high-quality code on their own. Use these metrics as indicators but rely on qualitative assessments to 
    > capture code quality more holistically.

---
title: Requirements Tips
parent: Requirements
has_children: false
nav_exclude: true
nav_order: 1
---

# Practical tips for thinking about evolution

1. Design for Maintainability from the Start

    > Adopt coding practices and architecture decisions that prioritise maintainability, such as using 
    > modular code, following consistent naming conventions, and writing clear, well-documented code. 
    > This makes future updates or bug fixes easier to implement.
    > 
    > Focusing only on initial development speed can lead to “technical debt” that complicates 
    > maintenance later.

2. Document Key Parts of the Codebase

    > Document the most complex and frequently modified parts of the code, explaining how components 
    > work, why certain decisions were made, and any potential issues to watch out for. Good 
    > documentation is invaluable for anyone performing maintenance tasks.
    > 
    > Leaving code undocumented or over-documenting obvious sections can lead to misunderstandings 
    > or wasted time during maintenance.

3. Understand the Importance of Testing in Maintenance

    > Implement comprehensive automated tests, especially for critical parts of the code, as these 
    > will allow future updates or changes to be verified quickly. A strong testing suite can catch 
    > issues early and prevent regressions in functionality.
    > 
    > Relying on manual testing or neglecting tests entirely increases the risk of bugs during 
    > maintenance, making it harder to confidently deploy updates.

4. Keep Dependencies Up-to-Date

    > Regularly update dependencies (libraries, frameworks, etc.) to avoid security vulnerabilities, 
    > incompatibility, and technical debt. Use tools to monitor for new versions or patches.
    > 
    > Ignoring dependency updates can lead to obsolete software that becomes challenging to 
    > maintain, especially when compatibility issues arise.

5. Plan for User Feedback in Evolution

    > Create processes for gathering, prioritising, and acting on user feedback. Users provide 
    > valuable insights into which features to improve or add and where bugs may exist, helping guide 
    > the product’s evolution.
    > 
    > Ignoring feedback or lacking a process to manage it can lead to a product that drifts from user 
    > needs and loses relevance over time.

6. Prioritise and Manage Technical Debt

    > Track technical debt as part of your backlog, using tools or labels to categorise it. Regularly 
    > allocate time in sprints to address technical debt alongside feature updates, especially for 
    > critical areas.
    > 
    > Ignoring technical debt can make the codebase increasingly difficult to work with, eventually 
    > slowing down development and increasing maintenance costs.

7. Anticipate and Plan for Change Requests

    > Establish a clear process for handling change requests, including assessing their impact on 
    > current code, testing, and documentation. A structured approach helps manage expectations 
    > and ensures quality.
    > 
    > Accepting changes without proper evaluation or planning can lead to instability, poorly 
    > implemented features, and rushed bug fixes.

8. Implement Logging and Monitoring

    > Set up logging for key application events and use monitoring tools to track performance, errors, 
    > and user behaviours. This allows you to quickly identify issues in production and helps prioritise 
    > maintenance.
    > 
    > Lack of visibility into production behaviour can result in delayed responses to issues or missed 
    > opportunities for improvement.

9. Use Version Control and Release Management Practices

    > Use version control effectively, with clear commit messages, feature branches, and tagging 
    > for releases. Adopting release management practices, like using staging environments, helps 
    > you safely deploy and rollback changes as needed.
    > 
    > Poor version control or release practices can make it difficult to trace changes or manage 
    > issues in production effectively, increasing the risk of introducing errors.

10. Refactor Regularly to Avoid “Code Rot”

    > Regularly review and refactor code to prevent “code rot,” where the codebase becomes messy 
    > and hard to work with due to accumulated changes over time. Focus on cleaning up redundant, 
    > overly complex, or inefficient code sections.
    > 
    > Ignoring refactoring can lead to a brittle codebase that’s difficult to maintain, slowing down 
    > both maintenance and new feature development.

11. Build Backward Compatibility When Evolving the Product

    > When making updates or adding new features, ensure that changes are backward-compatible 
    > whenever possible to avoid disrupting existing users. This is particularly important for 
    > APIs and integrations with other systems.
    > 
    > Breaking backward compatibility can frustrate users and lead to extra support and maintenance 
    > costs to address compatibility issues.

12. Regularly Review and Update Security Practices

    > Make security part of ongoing maintenance by regularly reviewing code for vulnerabilities, 
    > following up on security alerts, and keeping libraries secure. Routine security audits help 
    > maintain user trust and prevent costly incidents.
    > 
    > Failing to address security in maintenance leaves the product vulnerable, especially as new 
    > threats and exploits emerge.

13. Focus on User Documentation and Training Resources

    > Provide clear, updated user documentation and training resources, especially when the product 
    > evolves significantly. This reduces support requests and improves the user experience, helping 
    > users get the most out of new features or updates.
    > 
    > Neglecting user documentation can lead to user frustration and increased reliance on support, 
    > taking resources away from proactive maintenance.

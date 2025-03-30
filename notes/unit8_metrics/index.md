---
title: Metrics
parent: Notes
has_children: true
nav_order: 8
---

# Software Metrics and Code Analysis Tools

<hr class="splash">

![Steve McConnell](../../images/people/steve_mcconnell.png)

<blockquote class="pretty"><span>
The problem with quick and dirty...<br/>
is that dirty remains long after quick has been forgotten.
</span></blockquote>
<p class="attribution"><a href="https://stevemcconnell.com/">Steve McConnell</a></p>

<hr class="splash-bottom">

Code quality is a vital aspect of software development, but it is impossible to measure without 
some kind of definition. That also turns out to be difficult because *quality* is such a generic term.
One way to appraoch the question of how to measure quality is first to divide the overall concept into
*internal* and *external* parts.

**Internal code quality** refers to the attributes of the code itself — its structure, readability, and 
organization. This type of quality directly influences how easily other developers can understand, 
modify, and extend the code. Factors like readability, modularity, adherence to coding standards, and 
simplicity fall under internal quality. Clean, well-organized code with clear comments and consistent 
naming conventions makes development faster, reduces the likelihood of bugs, and improves collaboration 
among team members.

**External code quality**, on the other hand, pertains to how well the software meets its functional and 
non-functional requirements when deployed. It focuses on the user’s experience and includes factors 
like performance, reliability, security, and usability. While internal quality concerns how the code 
works under the surface, external quality focuses on how well the application meets end-user needs and 
maintains stability in production environments.

Addressing both internal and external quality criteria is essential for sustainable development. High 
internal quality supports future updates, minimizes technical debt, and reduces costs associated with 
maintaining and evolving the software. High external quality ensures that the software performs well in 
real-world scenarios, providing a reliable and satisfying experience for users.

In these instructional notes, we will explore the specific criteria that define internal and external 
code quality, methods for assessing each type, and best practices for achieving quality in both areas. 
By understanding and applying these criteria, developers can create software that is efficient, 
maintainable, and reliable, leading to both immediate and long-term success in development projects.



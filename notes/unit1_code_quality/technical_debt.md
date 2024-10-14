---
title: Technical Debt
parent: Code quality
has_children: true
has_toc: false
nav_order: 7
---

# Technical Debt

According to the [2022 report](https://www.it-cisq.org/the-cost-of-poor-quality-software-in-the-us-a-2022-report/)
by the Consortium for Information and Software Quality (CISQ), the overall annual cost to
industry of poor quality code was \$2.41 trillion. Of this overall total, about
\$1.52 trillion was attributed to *technical debt* (TD).

TD arises when short-term priorities are allowed to take precedence over known best
practices which would ensure a higher quality product. The name comes from an analogy
with financial debt where money that is borrowed has to be paid off in the long term.
Like financial debt, TD is divided into two elements:

> **Principal** refers to the cost of remediating must-fix problems in production code.
> At a minimum, the principal is calculated from the number of hours required to
> remediate these problems, multiplied by the fully burdened hourly cost of those
> involved in designing, implementing, and unit testing these fixes.
>
> **Interest** refers to the continuing costs, primarily in IT, attributable to
> must-fix problems so long as they remain in production code. These ongoing costs
> can result from the excessive effort to modify unnecessarily complex code, greater
> resource usage by inefficient code, etc.
>
> [CISQ, 2018, p. 2](https://www.omg.org/spec/ATDM)

## Causes of Technical Debt

Technical debt can arise from several factors, often due to decisions made under pressure 
or with incomplete information. The table below lists the most common causes.

| Cause                                     | Description                                                                                                                                                                                                                                                                                                                                                        |
|-------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Time Pressure                             | When development teams are working under tight deadlines or trying to meet aggressive delivery dates, they may prioritize delivering features quickly over maintaining code quality. This often leads to shortcuts in design, testing, or architecture, with the understanding that these issues will be fixed later, though they often aren't addressed promptly. |
| Lack of Planning or Design                | Insufficient upfront planning or poor architectural decisions can lead to a codebase that is difficult to scale and maintain. Without a clear design or roadmap, developers may implement features in ways that are convenient at the moment but are inefficient or incompatible in the long term.                                                                 |
| Insufficient Refactoring                  | As systems evolve, code becomes more complex, and what was initially a good solution may become outdated. Failing to refactor regularly or clean up "quick fixes" results in accumulated technical debt. Without refactoring, the code becomes harder to understand, maintain, and extend.                                                                         |
| Poorly Written or Unclear Code            | Developers who write unclear, unorganized, or poorly documented code contribute to technical debt by making the code harder for others to maintain. This often happens when coding standards aren’t enforced, or when developers are inexperienced or unfamiliar with best practices.                                                                              |
| Lack of Automated Testing                 | Failing to implement proper unit tests, integration tests, or automated testing frameworks can lead to fragile code that is prone to errors. Without tests, it becomes difficult to modify the code with confidence, as developers may unintentionally introduce bugs or break existing functionality.                                                             |
| Changing Requirements                     | Technical debt often accumulates when requirements change frequently during development. Initial solutions might no longer be appropriate, but teams might delay refactoring or redesigning systems to accommodate new requirements, leading to inconsistencies and complexity.                                                                                    |
| Inadequate Documentation                  | Poor or missing documentation contributes to technical debt by making it harder for developers to understand the system, onboard new team members, or maintain and extend existing functionality. When developers have to spend extra time deciphering how a system works, the overall velocity of the team decreases.                                             |
| Overly Complex Solutions                  | Overengineering or implementing complex solutions when a simpler one would suffice can also contribute to technical debt. Code that is unnecessarily complex is harder to maintain, debug, and extend, leading to higher costs in the long run.                                                                                                                    |
| Use of Outdated Technologies or Libraries | Relying on outdated or unsupported technologies, frameworks, or libraries can lead to technical debt. This makes it harder to maintain and extend the software, especially when security vulnerabilities or compatibility issues arise.                                                                                                                            |
| Poor Communication and Collaboration      | A lack of communication between teams—such as developers, designers, and stakeholders—can lead to misunderstandings about requirements, technical decisions, or the long-term impact of certain approaches. Misalignment often results in quick fixes that introduce technical debt.                                                                               |

Understanding the causes of technical debt helps teams proactively manage it by making 
better-informed decisions, prioritizing refactoring, improving communication, and 
maintaining a balance between short-term speed and long-term maintainability.

## Consequences of Technical Debt

The consequences of technical debt can be significant and grow over time, affecting both 
the development process and the long-term maintainability of the software. 
As technical debt accumulates, the codebase becomes harder to maintain. Fixing bugs, 
adding new features, or modifying existing functionality requires more time and effort, 
leading to **higher development costs**. Maintenance tasks often take longer because 
developers need to work around poorly written or outdated code and this **slows down 
development velocity**. Each new feature or modification requires developers to spend 
extra time understanding and working around technical debt. The more technical debt 
a codebase contains, the longer it takes to make changes, as developers must account 
for fragile or poorly structured areas of the system.

Codebases burdened with technical debt are often **more prone to bugs and errors**. 
Poorly designed or unrefactored code tends to be more difficult to understand and test, 
making it easier for new bugs to be introduced. Fixing these bugs can be difficult 
because they are often hidden within complex or messy code structures. 
The result is **lower overall code quality** as the codebase becomes harder to read, 
less cohesive, and more difficult to manage. This diminishes software quality over time
and leads to **reduced reliability**, with the software more prone to crashes, errors, 
or unexpected behavior, **reducing customer satisfaction** and trust in the product.

Greater levels of technical debt make it **difficult to scale** a system. Handling 
increased usage or incorporating new technologies and architectures becomes more
difficult, as does **adding new features**. Developers need to work around or clean up old, 
inefficient code which leads to longer development cycles for new features and increased 
complexity in integrating those features with the existing codebase.

Working in a codebase riddled with technical debt can lead to frustration and **decreased 
morale** among developers. Constantly dealing with poor-quality code and 
difficult-to-understand workarounds can demotivate teams, as they spend more time 
firefighting than building new, valuable features. New developers joining a team may 
struggle to understand a codebase burdened with technical debt. The lack of clarity, 
poor structure, and incomplete documentation can make the onboarding process longer and 
more challenging, delaying the new team member’s productivity.


## Code Weaknesses

Although coding style is important because of its impact on characteristics such
as maintainability, code may also contain structural weaknesses. These impact
some of the other external quaity characteristics such as reliability and
security. While some programming languages may make certain weaknesses impossible,
they are essentially generic across all programming environments.
[MITRE](https://www.mitre.org) is an American corporation set up to advise
various arms of the US government on national security. It maintains a database
of system weaknesses that is useful beyond it main security focus including 445 items
related to software development in 40 categories. The
[Common Weakness Enumeration (CWE)](https://cwe.mitre.org/data/definitions/699.html)
is developed by the user community and provides descriptions of identified
weaknesses along with observed occurrences and possible solutions. Some examples from
the *Bad Coding Practice* category are

<details>
<summary>CWE-478: Missing Default Case in Multiple Condition Expression</summary>
If a multiple-condition expression (such as a switch in C) omits the default
case but does not consider or handle all possible values that could occur, then
this might lead to complex logical errors and resultant weaknesses. Because of this,
further decisions are made based on poor information, and cascading failure results.
This cascading failure may result in any number of security issues, and constitutes a
significant failure in the system.
</details>

<details>
<summary>CWE-1079: Parent Class without Virtual Destructor Method</summary>
A parent class contains one or more child classes, but the parent class does not have a
virtual destructor method. This issue can prevent the product from running reliably due
to undefined or unexpected behaviors. If the relevant code is reachable by an attacker,
then this reliability problem might introduce a vulnerability.
</details>

<details>
<summary>CWE-1092: Use of Same Invokable Control Element in Multiple Architectural Layers</summary>
The product uses the same control element across multiple architectural layers. This
issue makes it more difficult to understand and maintain the product, which indirectly
affects security by making it more difficult or time-consuming to find and/or fix
vulnerabilities. It also might make it easier to introduce vulnerabilities.
</details>

<details>
<summary>CWE-1103: Use of Platform-Dependent Third Party Components</summary>
The product relies on third-party components that do not provide equivalent functionality
across all desirable platforms. This issue makes it more difficult to maintain the
product, which indirectly affects security by making it more difficult or time-consuming
to find and/or fix vulnerabilities. It also might make it easier to introduce
vulnerabilities.
</details>

The CISQ document quoted above is a specification for a method of measuring TD based 
on the CWE code weaknesses database, and generates an estimated
value based on the time required to fix a particular problem and the cost of the staff
required to carry out the work. The estimate takes into account 86 CWE items related
to the quality characteristics of **reliability**, **security**, **performance
efficiency** and **maintainability**. Theoretically, the existence of this
specification - which is likely to be adopted as a standard - will enable static
analysis tools to calculate the TD of a piece of code automatically. Progress on
this is slow, however, and CISQ expect that it will take another few years for the
management of technical debt to become standardised. In the meantime, some tools
such as [SonarQube](https://docs.sonarsource.com/sonarqube/latest/user-guide/metric-definitions/#maintainability)
include a calculation, but not necessarily one based on agreed standards.

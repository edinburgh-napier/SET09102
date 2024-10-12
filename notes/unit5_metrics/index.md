---
title: Metrics
parent: Notes
has_children: true
nav_order: 5
---

# Software Metrics and Code Analysis Tools

<hr class="splash">

![Steve McConnell](../../images/steve_mcconnell.png)

<blockquote class="pretty"><span>
The problem with quick and dirty...is that dirty remains long after quick has been forgotten.
</span></blockquote>
<p class="attribution">Steve McConnell</p>

<hr class="splash">


## External quality criteria

Quality is a very difficult concept to pin down with a definition.
[SEVOCAB](https://pascal.computer.org/) offers three versions from different
sources:

> ### **quality**
>
> (1) degree to which the system satisfies the stated and implied needs of its
> various stakeholders, and thus provides value
> ([ISO/IEC 25010](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/19n0mho/cdi_bsi_primary_000000000030215101))
>
> (2) ability of a product, service, system, component, or process to meet customer
> or user needs, expectations, or requirements
> ([ISO/IEC/IEEE 24765](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/19n0mho/cdi_bsi_primary_000000000030413573))
>
> (3) the degree to which a set of inherent characteristics fulfils the requirements
> ([PMBOK](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923796446002111))

All of these definitions focus on the final product from the point of view of the
customer. In that sense, quality can only be evaluated with reference to the
*external properties* of the system which include, for example:

* **Reliability**:
  The degree to which a system, product or component performs specified functions
  under specified conditions for a specified period of time
  ([ISO/IEC 25010](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/19n0mho/cdi_bsi_primary_000000000030215101))
* **Security**:
  Protection against intentional subversion or forced failure
  ([ISO/IEC 15288](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/19n0mho/cdi_bsi_primary_000000000030433813))
* **Maintainability**:
  The degree of effectiveness and efficiency with which a product or system can be
  modified by the intended maintainers
  ([ISO/IEC 25010](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/19n0mho/cdi_bsi_primary_000000000030215101))
* **Portability**:
  The ease with which a system or component can be transferred from one hardware or
  software environment to another
  ([ISO/IEC 24765](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/19n0mho/cdi_bsi_primary_000000000030346267))
* **Usability**:
  The degree to which a product or system can be used by specified users to achieve
  specified goals with effectiveness, efficiency and satisfaction in a specified
  context of use
  ([ISO/IEC 25010](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/19n0mho/cdi_bsi_primary_000000000030215101))

External properties describe the operation of the whole system and therefore need
to be evaluated at the system level. That is, the system has to be tested in use.
This system-level testing is explicitly captured in the
[V life cycle model](../unit3_agile/Week03a_lifecycle.md#the-v-model) where it is paired with the
analysis phase of the waterfall. This type of quality testing is relevant for any
software development project including those that use an agile approach. The
derivation of external quality criteria and their evaluation is discussed in more
detail in the [requirements modelling](Week11a_requirements_modelling.md) section.

## Internal quality criteria

While the external properties of a software product are those that are visible to
the client, they depend to a large extent on the *internal properties* of the code.
These are aspects of the code that can be verified by static analysis or inspection.
For example, code that is easy to read will necessarily be easier to maintain.
Similarly, code that is systematically tested will be more reliable.

Some languages such as Python require code to be laid out and indented in a
particular way and this acts as a quality control. Other languages such as C# allow
the developer more freedom. In that case, a set of best-practice conventions may
evolve around the particular language, and organisations may go further and create
an internal set of coding standards that developers are expected to follow.

As well as indentation rules, coding conventions can cover other aspects of the
code including

* Acceptable names for variables, functions, classes, namespaces, etc.
* Use of comments
* Use of whitespace
* Preferred methods where alternatives exist
* Exception handling
* etc.

If you are working with the same language on a regular basis, you will gradually
become aware of the recognised best practices in that context. They are occasionally
documented as is the case for
[C#](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
and they are often referred to in technical forums such as
[Stack Overflow](https://stackoverflow.com/questions/14973642/how-using-try-catch-for-exception-handling-is-best-practice).
This illustrates the dynamic nature of code conventions: an authority such as
Microsoft may set out their expectations and update them over time as the language
itself develops, and in parallel with that, a further set of preferences will
evolve among the user community.

## Code weaknesses

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

Building on the CWE database, the [Object Management Group (OMG)](https://www.omg.org/)
has created a standard for automatic identification of code weaknesses based on
measures that can be taken from static code analysis. The standard has been adopted by
the ISO as [ISO 5055](https://www.it-cisq.org/standards/code-quality-standards/). The
standard is used by tools that check code automatically and alert the developer as
they go along. Such tools treat the number of occurrences of weakness patterns as
*metrics* whose value is an indication of code quality. A metric is simply something that
can be measured, and some metrics are more useful than others. For example, a very easy
metric often used in software development projects is the number of lines of  code, or
more often, thousands of lines of code (KLOC). However, Bill Gates once commented that

> Measuring programming progress by lines of code is like measuring aircraft building
> progress by weight
>
> [Stephens, 2022, Ch. 15](https://learning.oreilly.com/library/view/beginning-software-engineering/9781119901709/c15.xhtml)

The metrics that you use in any situation have to be genuinely meaningful.
Stephens provides the following criteria for choosing a good metric (which with some small
reordering abbreviates to MORSE):

> **Simple**: The easier the attribute is to understand, the better.
>
> **Measurable**: For the attribute to be useful, you must measure it.
>
> **Relevant**: If an attribute doesn't lead to a useful indicator, there's no point
> measuring it.
>
> **Objective**: It's easier to get meaningful results from objective data than from
> subjective opinions. The number of bugs is objective. The application's “warmth and
> coziness” is not.
>
> **Easily obtainable**: You don't want to realize the team members’ fears by making them
> spend so much time gathering tracking data that they can't work on the actual project.
> Gathering attribute data should not be a huge burden.
>
> [Stephens, 2022, Ch. 15](https://learning.oreilly.com/library/view/beginning-software-engineering/9781119901709/c15.xhtml)


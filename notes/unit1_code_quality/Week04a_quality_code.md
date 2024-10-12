# Quality: code

<hr class="splash">

![Martin Fowler](../../images/martin_fowler.png)

### Any fool can write code that a computer can understand. Good programmers write code that humans can understand.

<br/>

*Martin Fowler*

<hr class="splash">

###### Contents

1. [External quality criteria](#external-quality-criteria)
2. [Internal quality criteria](#internal-quality-criteria)
3. [Code weaknesses](#code-weaknesses)
4. [Code smells](#code-smells)
5. [Technical debt](#technical-debt)
6. [Clean Code](#clean-code)
7. [Further reading](#further-reading-and-viewing)


## Technical debt

According to the [2022 report](https://www.it-cisq.org/the-cost-of-poor-quality-software-in-the-us-a-2022-report/)
by the Consortium for Information and Software Quality (CISQ), the overall annual cost to
industry of poor quality code was $2.41 trillion. Of this overall total, about
$1.52 trillion was attributed to *technical debt* (TD).

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
> [CISQ, 2018, p. 2](https://www.omg.org/spec/ATDM/1.0/PDF)

The source of the quote above is a specification document for a method of measuring
TD. It is again based on the CWE code weaknesses database, and generates an estimated
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

## Clean code

![Code quality](https://imgs.xkcd.com/comics/code_quality_2.png#figure)
[*Source: xkcd* ](https://xkcd.com/1695)

An automated, numerical approach to code quality has its place: it can enable the
developer's IDE to provide useful feedback and refinement hints as the code is being
written. However, it cannot be comprehensive. The potential complexity of a piece of
software and the developer's freedom to structure it however they please means that
there are just too many unknown factors. The concept of the code smell is more useful
because it relies more on intuition. However, familiarity with code smells can only
be built with experience and must therefore develop over time. Because of these
drawbacks, it is useful to have an easy-to-follow set of guidelines for writing good
quality code.

In 2009, Robert C. Martin, one of the signatories to the Agile Manifesto and
affectionately known as Uncle Bob, published
[Clean Code: a handbook of agile software craftsmanship](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/13v8mut/alma9923571583602111)
along with six co-authors. Its aim is to provide a solid framework for writing good
code, methods for identifying bad code and methods for turning bad code into good code.
Summarising its contents here is difficult because as the introduction states

> Learning to write clean code is hard work. It requires more than just the knowledge of
> principles and patterns. You must sweat over it. You must practice it yourself, and
> watch yourself fail. You must watch others practice it and fail. You must see them
> stumble and retrace their steps. You must see them agonize over decisions and see the
> price they pay for making those decisions the wrong way.
>
> (Clean Code, Introduction)

With that proviso in mind, here are some of the main principles of Clean Code with short
examples and rationales. The book provides more examples and further detail as well as
covering other important concepts. **You are encouraged to read the whole book**.

Clean Code ([Martin, 2009](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/13v8mut/alma9923581530002111#please-read))

### Use meaningful names

Grady Booch said that

> Clean code reads like well-written prose

One way to make that possible is to use names for variables, functions, classes, etc.
that are readable, searchable and meaningful within the context. Martin provides the
following simple java example at the start of Chapter 2:

``` java
public List<int[]> getThem() {
  List<int[]> list1 = new ArrayList<int[]>();
  for (int[] x : theList)
    if (x[0] == 4)
      list1.add(x);
    return list1;
 }
```
(Clean Code, Ch. 2)

It is easy to see that the code is extracting certain values from an `ArrayList`, but
why? What is the developer's *intent*? Simply renaming the variables reveals that the
code is identifying flagged items.

### Functions

In his lecture series presenting Clean Code, Martin summarises the approach as
[*polite*](https://youtu.be/7EmboKQH8lM?si=lSU5Z4T6WLIsxQVf&t=3160). It should read like
a newspaper article which follows certain conventions concerning the structure of the
paragraphs, the length of the paragraphs and the level of detail in each part. By
analogy, functions should

* Have names that are *verbs*
* Be short
* Have a small number of parameters
* Do one thing
* Have no side effects
* Confine themselves to a single level of abstraction

To arrive at a set of functions that adhere to these rules typically involves getting
something working first and then refining it through iterative refactoring.

### Comments

Clean Code should be self-documenting in the sense that simply reading the code
reveals the intent of the developer and the purpose of the code. Occasionally, that
is difficult and a comment has to be used. Whenever you are tempted to add a comment,
Martin recommends that you consider rewriting the code instead to make it more expressive.
In the book he says

> The proper use of comments is to compensate for our failure to express ourselves in code.
> Note that I used the word failure. I meant it. Comments are always failures. We must
> have them because we cannot always figure out how to express ourselves without them,
> but their use is not a cause for celebration.
>
> (Clean Code, Ch. 4)

The Clean Code approach to comments is at odds with some traditional views which suggest
that abundant comments are a sign of good code. When trying to understand someone else's
code, which would you prefer?

### Objects and data structures

Using an object-oriented (OO) approach to describe geometical shapes, you might think
of an abstract class `Shape` that defines a virtual method `area`. Each specific shape
such as `Square` or `Circle` would override the virtual method using the relevant area
formula. Martin suggests a different approach in which there is a major distinction
between *objects* and *data structures* which aids code clarity:

> **Objects** hide their data behind abstractions and expose functions that operate on
> that data.
>
> **Data structures** expose their data and have no meaningful functions.
>
> (Clean Code, Ch. 6)

Martin provides an example where the area calculation is a utility function inside a
general `Geometry` class. While more procedural, this approach is easier to follow
and makes certain maintenance tasks easier.

## Software engineering principles

As a further guide to good programming, there are several well-known principles and
rules of thumb that you need to be aware of. They come with mnemonics that help you
to remember them, and to a large extend they are included in the principles of Clean
Code.

### KISS

Standing for *Keep It Simple, Stupid*, the KISS principle targets the readability of code
by eliminating unnecessary complexity. The test is whether you would be able to return to
your own code after a couple of months and still be able to understand its operation
perfectly.

### DRY

The situation often arises, especially when building code iteratively, that you need a
code block that is either identical to one used previously, or something very similar.
The quick and dirty method is to copy the previous block and to make any minor
modifications needed to make it run. The proper way to handle this situation would be
to extract the code you are re-using into a separate function with parameters to control
any variations. This would be an exampe of the DRY principle: Do Not Repeat Yourself.

### YAGNI

In the interests of avoiding unnecessary complexity, a developer should only add code
when necessary rather than pre-emptively. This cautious approach avoids the risk of
redundant, partially-implemented or dead code accumulating in a system. When tempted
to do this, say to youself, "You Ain't Gonna Need It".

### SOLID

The SOLID acronym actually represents a set of five separate principles of code design:

> **Single Responsibility Principle**
>
> Classes and methods should only perform a single responsibility. All the elements that
> form a single responsibility should be grouped together and encapsulated.
>
> **Open/Closed Principle**
>
> Classes and methods should be open for extension and closed for modification. When a
> change to the software is required, you should be able to extend the software without
> modifying any of the code.
>
> **Liskov Substitution**
>
> Your function has a pointer to a base class. It must be able to use any class derived
> from the base class without knowing it.
>
> **Interface Segregation Principle**
>
> When you have large interfaces, the clients that use them may not need all the methods.
> So, using the Interface Segregation Principle (ISP), you extract out methods to
> different interfaces. This means that instead of having one big interface, you have
> many small interfaces. Classes can then implement interfaces with only the methods they
> need.
>
> **Dependency Inversion Principle**
>
> When you have a high-level module, it should not be dependent upon any low-level
> modules. You should be able to switch between low-level modules freely without
> affecting the high-level module that uses them. Both high-level and low-level modules
> should depend upon abstractions.
>
> (Clean Code in C# ([Alls, 2020](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923706264502111)))

## Further reading (and viewing)

* [Clean Code with Uncle Bob](https://www.youtube.com/playlist?list=PLmmYSbUCWJ4x1GO839azG_BBw8rkh-zOj) (video lectures)
* Trends and Findings in Measuring Software Quality Metrics in the Industry
  [Falco & Rabiolo, 2022](https://doi.org/10.1109/ARGENCON55245.2022.9939935)
* Clean Code in C# ([Alls, 2020](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923706264502111))

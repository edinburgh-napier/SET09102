---
title: Test-Driven Development
parent: Testing
has_children: true
has_toc: false
nav_order: 1
---

# Test-Driven Development

Over time, testing has become increasingly formalised as part of the development process. In
the past, a lot of faulty code was released because developers were under pressure to complete
their projects by a deadline and testing seemed to be a supplementary activity that could be
cut from the project if necessary. The waterfall development lifecycle seemed to encourage
this way of thinking because it postponed testing until the last stage of a project. (This
was not actually true of the waterfall approach, but that was how it was perceived).

The ultimate turnaround came with the introduction in 1999 of *test-driven development* (TDD)
as part of [Extreme Programming](https://en.wikipedia.org/wiki/Extreme_programming). Kent Beck,
one of the signatories to the Agile Manifesto, published a
[book](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923574478202111)
on the topic in 2003.

There are two main principles behind TDD. The first is that tests are written first and then
minimally sufficient code is written to allow the test to pass. The process the continues in
an iterative fashion until the application meets its acceptance criteria. The second principle
is that code is continuously refactored as the development proceeds to maintain a clear and
simple structure. The process is visualised in Fig. 3.

``` mermaid
flowchart LR
    node1([Write unit test])
    node2([Write minimal code])
    decision1{Does the<br/>test pass?}
    decision2{Refactoring<br/>required?}

    node1 -- run --> decision1
    decision1 -- yes --> decision2
    node2 -- run --> decision1
    decision1 -- no --> node2
    decision2 -- no --> node1
    decision2 -- yes --> node2
```
*Fig. 3: Test-driven development*

## Further reading

* Alls ([2020](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923706264502111)) Chapter 6. 
* [TDD vs BDD vs ATDD and other Agile development techniques](https://www.techtarget.com/searchsoftwarequality/tip/TDD-vs-BDD-vs-ATDD-and-other-Agile-development-techniques)
* Test-driven development [(Beck, 2003)](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923574478202111)

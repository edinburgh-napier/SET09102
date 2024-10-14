---
title: Issues
parent: Processes and Workflow
has_children: true
has_toc: false
nav_order: 3
---

# Issues

Issues are a powerful tool for managing tasks, bugs, and feature requests in a software 
project. Mastering the basics of creating, labeling, assigning, and collaborating on issues will 
help you stay organized and contribute effectively to your team. Understanding how to track progress, 
link work, and participate in discussions about issues is essential for any developer working in 
a collaborative environment.

## Issue creation

The lifecycle of an issue tends to follow the pattern shown in Fig. 1. 

![Fig. 1. Issue lifecycle](images/lifecycle_creation.png){: standalone #fig1 data-title="Issue lifecycle"}

Issues are created for various reasons, each helping to track different aspects of the development 
process. During an initial development project to build a software product from scratch, the main 
source of new issues is the initial analysis work that produces a set of user stories. Even in a
development project, though, issues are created in a variety of situations:

<details class="blue-bar">
<summary>Bug reporting</summary>
<p>This occurs when a problem or defect is found in the software, such as when the application doesn’t 
behave as expected. For example, a user might report being unable to log in after a password reset 
or a page might crash when submitting a form.</p>
</details>

<details class="blue-bar">
<summary>Feature requests or enhancements</summary>
<p>Here, developers or stakeholders propose new functionality or improvements to existing features. 
Examples include requests to add a dark mode to the user interface or to improve the performance of 
the search function.</p>
</details>

<details class="blue-bar">
<summary>Technical debt</summary>
<p>This refers to areas of the code that need refactoring or cleanup to improve maintainability. For 
instance, developers might need to refactor the authentication module to improve readability or reduce 
duplicate code in the payment processing system.</p>
</details>

<details class="blue-bar">
<summary>Task management</summary>
<p>These tasks might not involve code changes but are still critical to the project, such as setting up 
a continuous integration/continuous deployment (CI/CD) pipeline or writing documentation for an API.</p>
</details>

<details class="blue-bar">
<summary>Performance issues</summary>
<p>Performance issues track areas where the software may be performing inefficiently and needs 
optimization, such as improving database query performance for large datasets or optimizing image 
loading times on a webpage.</p>
</details>

<details class="blue-bar">
<summary>Security vulnerabilities</summary>
<p>Potential or known flaws that could compromise the system lead to the creation of issues. For 
example, a SQL injection vulnerability might need to be fixed, or stronger password encryption 
might need to be implemented.</p>
</details>

<details class="blue-bar">
<summary>User feedback</summary>
<p>When end users provide suggestions or report problems, developers create issues to track and 
address this feedback. Examples include users requesting the ability to export data as CSV or 
reporting that the interface is not intuitive on mobile devices.</p>
</details>

<details class="blue-bar">
<summary>Testing requirements</summary>
<p>Requirements for unit tests, integration tests, or the performance of user acceptance testing (UAT)
are documented as issues. For example, a developer might create an issue to write unit tests for the 
payment processing module or to perform cross-browser testing on a new feature.</p>
</details>

<details class="blue-bar">
<summary>Infrastructure issues</summary>
<p>These are created when there are problems with the project's infrastructure, such as server downtime, 
configuration errors, or deployment failures. An example might be a server crashing during high 
traffic or a misconfiguration in the database connection string.</p>
</details>

<details class="blue-bar">
<summary>Compliance and legal requirements</summary>
<p>Issues are often used to capture compliance and regulatory requirements, especially when ensuring 
that the software meets regulatory or industry standards. Examples include making sure the system 
complies with GDPR regulations or implementing accessibility features in line with WCAG 2.1 
standards.</p>
</details>

<details class="blue-bar">
<summary>Dependencies</summary>
<p>Projects that depend on third-party libraries or services often track dependency-related issues. 
For example, issues might be created to update a third-party library to its latest version or to 
fix an integration problem with a payment gateway API.</p>
</details>

<details class="blue-bar">
<summary>Version releases</summary>
<p>Issues can be used to track specific tasks that must be completed before a new version is deployed. 
This might include preparing release notes for version 2.0 or fixing critical bugs before version 
1.5 is rolled out.</p>
</details>

## Issue selection

![Fig. 2. Issue selection](images/lifecycle_selection.png){: standalone #fig2 data-title="Issue selection"}

The set of open issues associated with a repository is commonly referred to as the _issue backlog_. 
This term is used to describe all the open issues that need to be addressed, including bugs, feature 
requests, tasks, and other tracked work. The backlog helps teams organize and prioritize the issues 
that are pending resolution. In Agile or Scrum projects, this backlog may be further refined into 
sprints or milestones. Issue selection refers to the process of choosing which issues from the 
backlog will be included in a particular sprint.

## Issue assignment

![Fig. 3. Issue assignment](images/lifecycle_assignment.png){: standalone #fig3 data-title="Issue assignment"}

Issue assignment is the process of designating a specific person or team to be responsible for 
resolving or working on an issue in a software development project. By assigning an issue, the 
project team ensures that someone is accountable for addressing it, which helps organize the 
workload, distribute tasks efficiently, and track progress within the project.

Once an issue is assigned there are some key points to be aware of:

* **Ownership**: When an issue is assigned to a developer or team, it becomes their responsibility 
  to work on resolving the issue, whether it's fixing a bug, developing a new feature, or 
  completing a task.
* **Accountability**: Assignment helps project managers or team leads hold developers accountable 
  for specific tasks, making it easier to track who is responsible for each part of the project.
* **Collaboration**: Issue assignment is often part of collaborative workflows in software 
  development projects, ensuring that tasks are distributed appropriately and no work is overlooked.
* **Tracking**: On platforms like GitHub, GitLab, or Jira, an assignee can be tagged within the 
  issue, making it easier to follow up on progress and review updates.

Issues are typically assigned manually by a project maintainer, team lead, or even by developers 
who assign themselves to an issue. Some tools and systems allow for automated issue assignment based 
on predefined rules, like distributing issues evenly among developers or assigning specific types of 
issues to specialized team members. Once an issue is assigned, the responsible developer will usually 
update the issue's status as they work on it, and provide feedback through comments or commits 
linked to the issue.

## Issue elaboration

![Fig. 4. Issue elaboration](images/lifecycle_elaboration.png){: standalone #fig4 data-title="Issue elaboration"}

Issue elaboration refers to the process of expanding and clarifying the details of an issue in a 
software development project to ensure it is well-defined and actionable. This typically involves 
providing a thorough description, context, and specific requirements related to the issue, such as 
the problem it addresses, steps to reproduce a bug, expected behaviour, or technical details for a 
feature request.

The goal of issue elaboration is to ensure that developers, testers, and other stakeholders fully 
understand the scope, requirements, and priority of the issue before any work begins. Well-elaborated 
issues help streamline development by minimizing confusion and the need for back-and-forth 
clarifications.

### Issue decomposition

If it becomes clear during issue elaboration that the issue is too large to address in one go,
the developer should break the issue down into smaller, manageable tasks. This process, known as 
_issue decomposition_, helps ensure that each task can be handled independently, improving focus, 
efficiency, and clarity. In such a situation, the developer needs to:

<details class="blue-bar">
<summary>1. Identify the Subtasks</summary>
<p>Break the larger issue into smaller, more manageable subtasks or issues. Each subtask should 
represent a specific, actionable piece of work that can be completed independently.
For example, if the original issue is about building a complex feature, subtasks could be related 
to backend logic, frontend design, database setup, or testing.
</p>
</details>

<details class="blue-bar">
<summary>2. Create New Issues for Each Subtask</summary>
<p>If possible, create separate issues for each subtask. This ensures that each piece of work is 
tracked individually and can be assigned or completed independently.
Clearly label these issues and link them to the original, larger issue to maintain context and 
traceability.
</p>
</details>

<details class="blue-bar">
<summary>3. Update the Original Issue</summary>
<p>Refine the original issue to reflect its new purpose as a "parent" issue or epic that tracks 
the progress of the subtasks.
Include links or references to the newly created subtasks. This helps everyone involved in the 
project understand how the smaller tasks relate to the original, larger goal.
</p>
</details>

<details class="blue-bar">
<summary>4. Prioritize and Estimate the Subtasks</summary>
<p>Once the issue is broken down, each subtask should be prioritized and estimated. Determine 
which tasks are essential or high priority and address them first.
Estimating the time or effort needed for each subtask ensures realistic expectations for completion.
</p>
</details>

<details class="blue-bar">
<summary>5. Collaborate with the Team</summary>
<p>Discuss the decomposition with your team, project manager, or stakeholders. Ensure that everyone 
is aligned on the plan and that subtasks are distributed effectively.
Make sure the scope of each subtask is clear and doesn't overlap unnecessarily with other parts of 
the project.
</p>
</details>

<details class="blue-bar">
<summary>6. Consider Dependencies</summary>
<p>Identify any dependencies between the subtasks. Some tasks may need to be completed before 
others, so establishing a logical order of execution is important.
Document these dependencies in the issue tracker or in the task descriptions.
</p>
</details>

<details class="blue-bar">
<summary>7. Monitor and Track Progress</summary>
<p>As the subtasks are addressed, track the progress of each one individually. The completion of 
all subtasks should lead to the resolution of the original, larger issue.
Use tools like GitHub Milestones, Jira Epics, or Kanban boards to visualize the breakdown and 
progress of the subtasks.
</p>
</details>

As an example, consider an original issue is "Build a User Authentication System". The developer 
might break it down into subtasks like:

* Implement User Registration API
* Implement User Login and Logout
* Set Up Password Recovery
* Integrate Frontend with Authentication API
* Write Unit Tests for User Authentication

Each of these subtasks can be tackled individually, making the overall task more manageable.

Key Elements of Issue Elaboration:
Description:

A clear, concise explanation of the issue, including what needs to be done or what problem is being addressed. For bug reports, this might include the error encountered, while for feature requests, it might describe the desired functionality.
Steps to Reproduce (for Bugs):

A detailed list of steps that can reliably reproduce a bug, ensuring developers can replicate the issue before fixing it.
Expected vs. Actual Behavior:

A description of the behavior that is expected compared to what is currently happening, especially for bug reports.
Technical Specifications:

Any technical details required to address the issue, such as dependencies, relevant code snippets, database structures, or integration points.
Acceptance Criteria:

Specific conditions that must be met for the issue to be considered resolved or completed. These criteria help developers know when their work is done and allow testers to verify the outcome.
Priority and Severity:

Information on how critical the issue is to the project. For example, high-priority issues may require immediate attention, while low-priority ones can be handled later.
Screenshots or Error Logs:

Visual aids, error logs, or other supporting materials that provide additional context to help diagnose or explain the issue.
Why Issue Elaboration is Important:
Clarity: Well-elaborated issues provide developers with a clear understanding of the problem or feature, reducing misunderstandings and the need for follow-up questions.
Efficiency: By having all the necessary information upfront, developers can begin working on the issue more quickly and effectively.
Collaboration: Elaboration helps ensure that all stakeholders—developers, testers, product owners, and project managers—are aligned on the scope and requirements of the issue.
Quality: Proper elaboration can reduce the risk of incomplete solutions or misaligned expectations, leading to higher-quality deliverables.
In summary, issue elaboration ensures that an issue is thoroughly defined and understood, allowing developers and teams to work more efficiently and produce higher-quality outcomes. It is an essential part of managing issues in software development.

## Issue-related workflow

Most code management platforms provide features to help manage projects. In GitHub, a project can be
represented in a tabular format, as a roadmap or in the form of a Kanban-style task board. The choice
of format is up to the team, but for the purposes of these notes, we will assume the use of a task board.

By default, a task board in GitHub contains the three swimlanes, `Todo`, `In Progress` and `Done` as
shown in Fig. 2. Further columns can be added if needed - this depends on how the team decides to
manage the work. For example, a swimlane for stalled tasks could be added, or for tasks in review.
The task board can be as complicated as required, but in general, the simpler the structure, the
more intuitive it is to use.

![Fig. 2. Default GitHub task board](images/github_task_board.png){: standalone #fig2 data-title="Default GitHub task board"}

Tasks in GitHub are represented by [issues](https://docs.github.com/en/issues). They can be added
directly on the task board using the button at the bottom of each swimlane. If you take that option,
you will need to explicitly attach the new issue to the relevant code repository. This is because
the relationship between projects and repositories doesnot have to be one-to-one. You can also create
issues using the issues tab on the repository page. If you take that option, you will need to say
explicitly which project the issue should be added to. This is done using the controls on the right of
the issue creation page as shown in Fig. 3.

![Fig. 3. New issue page](images/new_issue.png){: standalone #fig3 data-title="GitHub new issue page"}

When using a task board, an item gradually accumulates detail and moves through the swimlanes from left
to right as the work progresses. Exactly *when* an item is moved from one swimlane to the next needs to
be defined in the team workflow so that there is no ambiguity. Once defined, these rules can be
performed and enforced manually, but GitHub can help to automate some of the steps. Clicking on the
three-dots icon in the top right-hand corner of the task board (see Fig. 5) allows you to select a
`Workflows` option. Here, you can define several actions to be triggered automatically. The options
are more or less self-explanatory and require some experimentation. The main point is that a team
should make explicit decisions about how their task board should operate and which steps are to be
automated. Thos decisions should be clearly documented sothat they are easy for team members to
follow.

## Definition of Ready

It is a simple observable fact that the majority of developers like to get started working on
code changes as quickly as possible. However, that is not always the most efficient approach
and it can lead to dead ends, delays and re-work. To counter this, a *Definition of Ready* (DoR)
can be used. Essentially, it is a checklist that defines the criteria for starting on a
development task. The DoR might include items such as:

* Requirements are clear
* Requirements are testable
* Acceptance criteria are defined
* Dependencies have been identified

A good way to decide whether a development task is ready to be worked on is to use the INVEST
method:

> **Independent**:
> It should be possible to work on a task independently of any other
>
> **Negotiable**:
> A task should not be over-constrained; instead, there should be room for negotiatioon about
> the best way to implement it
>
> **Valuable**:
> The value of the task for the project/client should be clear. This is usually captured by
> acceptance criteria
>
> **Estimable**:
> It should be possible to make a reasonably accurate estimate of the time required for the task.
> If a task is too complex this will be difficult and the task may need splitting.
>
> **Small**:
> (See previous point) Ideally a single task should represent a few person-days of work.
>
> **Testable**:
> Another indication that a task needs to be split is when the tests required are hard to define
> or are very complex.

## Definition of Done

In Scrum, the *Definition of Done* (DoD) is a checklist of things that need to ticked off
before a product configuration is considered ready to release. An example of a simple DoD might be:

* All acceptance criteria are met
* Unit test coverage > 80%
* Functional tests passed
* No known defects
* Documentation is up-to-date

The DoD defines the threshold for release of the product, but at the point a development task
is completed it also needs to be checked against the DoD. This ensures that acceptance
criteria are checked at the earliest opportunity, for example, and avoids the accumulation
of hidden problems.

## Summary

In light of the previous sections, two main phases of activity can be identified around
any piece of development work as shown in Fig.4. The time required for each stage depends on the
complexity of the original issue.

![Fig. 4. Development process](images/dev_process.png){: standalone #fig4 data-title="Two-phase development process"}

The rules that a team sets for itself in defining a standard workflow are intended to help
with communication and to avoid errors and conflicts. Although there are examples of good
practice available, there is no golden standard - each team needs to define its own specific
workflow. Some steps are entirely procedural in the sense that they are the responsibility of
the individual developer and cannot be automated. Others are made trivially easy by using the
digital tools available. It must be stressed, however, that the team workflow needs to be
actively managed. If assumptions are made about how team members will behave, serious difficulties
may arise if they do not behave as expected. It is also tempting to try to define a complicated
workflow from the outset in order to keep tight control over the project. This can be
counter-productive, however, making the workflow difficult to understand. A good approach is
often to set up a relatively simple workflow using default or standard options,and then to
introduce changes when it becomes clear that the workflow can be improved.

## Further reading

* [Definition of Ready](https://resources.scrumalliance.org/Article/pros-cons-definition-ready)
* [Definition of Done](https://www.scrum.org/resources/blog/done-understanding-definition-done)

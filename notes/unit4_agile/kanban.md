---
title: Kanban
parent: Agile
has_children: true
nav_order: 5
---

# Kanban

The Kanban approach is a flexible, visual method within Agile software development that focuses on 
optimizing workflow and improving efficiency. Originally developed in manufacturing by Toyota, 
Kanban has been adapted for software development to help teams visualize their work, limit work 
in progress (WIP), and streamline processes to enhance productivity. Unlike other Agile frameworks 
that use time-boxed iterations (like sprints in Scrum), Kanban operates as a continuous flow system, 
making it especially valuable for teams managing a steady stream of tasks or handling unpredictable 
workloads.

Kanban emphasizes four core principles: 

* Visualizing work
* Limiting work in progress
* Managing flow
* Continuously improving

By visualizing tasks on a Kanban board, teams gain a clear understanding of the current status of 
each task, allowing them to identify bottlenecks and areas for improvement. Limiting WIP ensures 
that the team remains focused on completing existing work before starting new tasks, which reduces 
context switching and improves task completion rates.

## Visualising work

In Kanban, the concept of visualizing work is fundamental to managing and improving workflow. 
Visualizing work involves using a Kanban board to represent all tasks, their current status, and 
the workflow stages. The board provides a clear, shared view of work items (represented as cards) 
and the steps they pass through (represented as columns) from initiation to completion. This visual 
approach enhances transparency, promotes collaboration, and helps teams quickly identify 
bottlenecks and inefficiencies.



The Kanban board typically includes columns that represent stages in the workflow, such as 
_To Do_, _In Progress_, and _Done_. The stages can vary based on the team’s specific process and 
may include additional columns like _Ready for Review_ or _Blocked_.

Cards for Tasks or Work Items: Each task or work item is represented by a card on the board, which contains information such as a task title, description, due date, and assignee. Cards are moved across the board as the task progresses through each stage.

Workflow Visualization: As work items move through the board, team members can see the entire workflow at a glance. This allows everyone to understand what tasks are in progress, what is completed, and what is waiting to be started.

Benefits of Visualizing Work
Transparency: A Kanban board makes the status of every task visible to all team members and stakeholders, fostering a shared understanding of the team’s current workload and priorities.

Improved Focus: By making each task’s status clear, the team can focus on completing work in progress before starting new tasks, reducing distractions and context-switching.

Bottleneck Identification: Visualizing work allows the team to see where tasks may be piling up or slowing down, indicating potential bottlenecks. For example, if many tasks are in the "In Progress" column but few reach "Done," it may signal a need for more resources in a specific stage.

Enhanced Collaboration: With a shared visual board, team members can collaborate more effectively, adjusting resources and support as needed to move tasks along the workflow.

Visualizing work on a Kanban board transforms the abstract idea of “progress” into a concrete, easily understood process. This shared visualization promotes accountability, aligns team efforts, and provides valuable insights for continuous improvement, making it a key element of Kanban’s approach to optimizing workflow.

## Kanban and XP compared

Kanban and Extreme Programming (XP) are both Agile approaches to software development, but they 
differ significantly in their structure, focus, and practices. The table below highlights some
of the main differences.

| Aspect                        | Kanban                                                                                                                                                                                                                                                                                   | XP                                                                                                                                                                                                                                                                                               |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Workflow vs. Iterative Cycles | Uses a continuous flow system with no fixed-length iterations. Work items are pulled through the workflow as capacity allows, with a focus on optimizing flow rather than time-boxed cycles.                                                                                             | Works in short, iterative cycles (typically 1-2 weeks) called iterations, where the team commits to a set of user stories at the beginning of each cycle and aims to complete them by the end. This iterative approach enables regular feedback and planning cycles.                             |
| Work in Progress (WIP) Limits | Actively enforces WIP limits on each workflow stage to control the amount of work in progress at any given time. This practice helps manage capacity, avoid bottlenecks, and keep the flow steady.                                                                                       | Does not have explicit WIP limits but encourages managing workload by committing only to achievable tasks within each iteration. XP’s practices like Pair Programming and Test-Driven Development (TDD) help improve focus and quality but don’t directly limit the number of tasks in progress. |
| Core Practices and Techniques | Focuses on visualizing work on a Kanban board, managing flow, limiting WIP, and continuously improving processes. It does not prescribe specific engineering practices or technical practices, allowing it to be adapted to a wide range of work types.                                  | Includes specific technical practices such as Pair Programming, TDD, Continuous Integration, Refactoring, and Collective Code Ownership. These practices are intended to improve code quality, collaboration, and responsiveness to changing requirements.                                       |
| Planning and Commitment       | Has a flexible approach to planning, allowing tasks to be added or reprioritized as capacity opens up. There is no formal planning session; instead, work is pulled continuously as the team completes tasks, supporting a just-in-time approach to planning.                            | Uses formal planning sessions, including Release Planning (high-level) and Iteration Planning (for each cycle). The team commits to a set of user stories for each iteration, encouraging focus and goal alignment within the cycle’s timeframe.                                                 |
| Customer Involvement          | While Kanban encourages collaboration, it doesn’t require continuous customer involvement in the same way as XP. The approach is less prescriptive about roles, focusing instead on managing and optimizing workflow.                                                                    | Requires close collaboration with an on-site customer or product owner, who actively participates in the planning and provides frequent feedback. This role is central to XP, as it helps ensure that development aligns closely with user needs and business goals.                             |
| Feedback Frequency            | Feedback is continuous but tends to be focused on improving the process and optimizing flow rather than on the product itself. Teams hold regular retrospectives to identify process improvements, but the system itself does not inherently require user feedback at regular intervals. | Emphasizes frequent product feedback through iteration reviews, testing, and continuous customer involvement. Feedback is both technical and functional, addressing code quality and alignment with customer requirements.                                                                       |
| Flexibility and Adaptability  | Offers more flexibility since there are no iteration commitments; tasks can be reprioritized at any time based on business needs. This approach is suitable for teams that handle frequent ad hoc requests or have variable workloads.                                                   | Is slightly less flexible within iterations, as the team commits to a set of user stories at the beginning of each cycle. However, XP is designed to be adaptive over the long term, with short iterations enabling the team to regularly reassess priorities.                                   |
| Process vs. Engineering Focus | Primarily focuses on workflow management and process optimization. Kanban can be applied to any workflow, including non-software domains, because it emphasizes efficient task flow rather than specific technical practices.                                                            | Has a strong engineering focus, with prescribed technical practices and development principles aimed at ensuring code quality, collaboration, and adaptability. XP is especially suited to software development due to its technical discipline and customer-focused approach.                   |

In essence, Kanban is a flexible, flow-based approach focused on visualizing and optimizing 
workflow, with a strong emphasis on limiting WIP and continuously improving processes. XP, on 
the other hand, is a structured, iteration-based approach with defined technical practices that 
emphasize high-quality code, close customer collaboration, and regular feedback. Kanban is ideal 
for teams that need flexibility and streamlined process management, while XP is suited to development 
teams that benefit from strong engineering practices and regular cycles of customer feedback.



---
title: Scrum
parent: Agile
has_children: true
has_toc: false
nav_order: 6
---

# Scrum

Scrum is an agile project management framework designed to help teams work collaboratively on 
complex projects while delivering high-quality products in short, iterative cycles. Developed 
for software development but now applied across various fields, Scrum emphasizes flexibility, 
transparency, and continuous improvement, making it especially valuable for projects with evolving 
requirements or user needs. By breaking down work into manageable increments called sprints 
(typically lasting two to four weeks), Scrum allows teams to respond to feedback and adapt to 
changing priorities quickly.

![Fig. 1: The Scrum framework ([Scrum.org](https://www.scrum.org/learning-series/what-is-scrum))](images/scrum.png){: standalone #fig1 data-title="The Scrum framework"}

Scrum provides a clear structure for organizing work through roles, events, and artifacts. Key 
roles include the Product Owner, responsible for defining and prioritizing features; 
the Scrum Master, who facilitates the process and removes obstacles; and the Development Team, 
which collaboratively delivers the product increments. Essential events like Sprint Planning, 
Daily Standups, Sprint Reviews, and Retrospectives keep the team aligned, allow for regular 
inspection, and promote incremental progress.

In this set of instructional notes, we will explore the foundational concepts of Scrum, including 
its core roles, events, artifacts, and guiding principles. By understanding Scrum’s structure and 
values, teams can create a collaborative, efficient work environment that delivers high-quality 
products and maximizes responsiveness to feedback.

## Scrum Roles

In Scrum, defined roles create a clear and focused team structure, ensuring 
accountability, and facilitating collaboration. Each role serves a unique purpose within the 
Scrum framework, helping to balance responsibilities and support a smooth, effective workflow. 
By establishing specific roles, Scrum enables team members to focus on their core contributions — 
whether it’s prioritizing work, maintaining process integrity, or delivering the product increment 
— while fostering a shared understanding of each person’s responsibilities. This clarity not only 
enhances communication but also promotes self-organization, allowing the team to remain agile and 
aligned in reaching project goals.

![Fig. 2: The Scrum team](images/scrum_team.png){: standalone #fig2 data-title="The Scrum team"}

### Product Owner

The Product Owner in Scrum is responsible for maximizing the value of the product by defining and 
managing the product backlog, which is a prioritized list of features, enhancements, and fixes for 
the development team to work on. Acting as the bridge between stakeholders and the development 
team, the Product Owner ensures that the team works on the most valuable features first, aligning 
with business objectives and customer needs. They continuously refine and prioritize backlog items, 
clarify requirements, and set clear goals for each sprint, ensuring that the team has a well-defined, 
actionable list of tasks to accomplish. The Product Owner also actively engages with stakeholders, 
gathering feedback and adjusting priorities as needed to reflect changing business goals or user 
feedback. This role requires a deep understanding of the product vision and market demands, as the 
Product Owner is ultimately accountable for ensuring that the team delivers a product that meets 
user needs and achieves business objectives. Through close collaboration with both the development 
team and stakeholders, the Product Owner drives the direction of the product, ensuring it delivers 
maximum value with each sprint.

The role of Product Owner shares some characteristics with that of a traditional project manager
but there are also some important differences as illustrated in the table below. Whereas the
project manager role is designed for a structured development approach and has been adapted to
suit the Agile context, the role of Product Owner is specifically designed for Agile environments.

| Aspect                                  | Project Manager                                                                                                                                                                                                                                                           | Product Owner                                                                                                                                                                                                                                                                                                                                             |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Focus and Accountability                | responsible for delivering a project within a defined scope, timeline, and budget. They focus on planning, coordinating, and monitoring project progress, managing resources, and often handling risks and changes in scope to meet the project’s objectives.             | responsible for maximizing the value of the product by managing the product backlog, prioritizing features, and ensuring that the development team works on the most valuable items. The Product Owner is accountable for the product’s direction and success from a value perspective, aligning development work with business goals and customer needs. |
| Approach to Planning and Prioritization | typically creates a comprehensive project plan outlining tasks, timelines, milestones, and dependencies. They maintain this plan throughout the project, making adjustments as necessary to ensure the project progresses smoothly and meets its completion goals.        | manages the product backlog and prioritizes tasks based on business value, stakeholder input, and market needs. They ensure that each sprint delivers high-value increments by focusing on features that best align with the product vision and goals. Planning is iterative, adjusting based on feedback after each sprint.                              |
| Authority and Decision-Making           | may have authority over project scope and timelines but does not have the same level of influence over the product’s feature set or roadmap. They typically facilitate work according to project constraints but may need to consult stakeholders for strategic changes.  | has authority over what the team works on, making decisions about product features, scope, and priorities. They act as the voice of the customer, translating business needs into specific features and requirements for the team.                                                                                                                        |
| Collaboration with the Development Team | often works more independently of the development team. While they may communicate regularly with the team and track progress, they are less embedded in day-to-day decision-making and are usually responsible for coordinating across multiple teams or stakeholders.   | works closely with the development team, continuously refining the backlog, clarifying requirements, and ensuring that the team understands what’s most valuable. They are a dedicated member of the Scrum team, directly involved in each sprint.                                                                                                        |

### Scrum Master

The Scrum Master ensures that the team follows Scrum principles and practices while fostering a 
collaborative, productive, and self-organizing work environment. Acting as both a servant leader 
and a coach, the Scrum Master’s primary responsibility is to support the team’s success by removing 
obstacles, guiding continuous improvement, and facilitating communication. They help the team stay 
focused on the goals of each sprint, protect the team from unnecessary interruptions, and ensure 
that Scrum ceremonies (such as sprint planning, daily standups, sprint reviews, and retrospectives) 
are conducted effectively and provide value.

Beyond facilitating team activities, the Scrum Master serves as an advocate for Scrum within the 
organization, working to build an environment that supports agile values. This may involve educating 
stakeholders, managers, and other teams about Scrum principles, emphasizing the importance of 
iterative progress and responding to change. They often help the organization understand why agile 
practices benefit the team and the product, building awareness of concepts like transparency, 
incremental improvement, and adaptability.

The Scrum Master also plays a key role in coaching both the team and the Product Owner. For the 
development team, they encourage self-organization, accountability, and continuous learning. For 
the Product Owner, they may provide support in managing the product backlog, ensuring that 
priorities are clear and that there’s alignment with the overall product vision. As an experienced 
Scrum practitioner, the Scrum Master works to create a high-trust environment where team members 
feel empowered to innovate, learn from each sprint, and grow together.

The role of the Scrum Master is typically filled by a dedicated individual who serves as a 
constant presence throughout the Scrum project, rather than rotating among team members. While 
it is possible for teams to share Scrum Master responsibilities, having a fixed Scrum Master is 
generally preferred to ensure continuity, consistency, and focus on the role’s specific 
responsibilities.

A fixed Scrum Master brings several advantages. They develop a deep understanding of the team’s 
dynamics, the unique challenges the team faces, and how best to support continuous improvement 
over time. This consistency allows the Scrum Master to build trust with the team, enabling them 
to provide tailored coaching, anticipate recurring obstacles, and fine-tune Scrum practices to 
fit the team’s needs. Additionally, a fixed Scrum Master is better able to serve as an advocate 
for Scrum within the organization, educating stakeholders and building a supportive environment 
for agile practices.

However, in some cases — such as in smaller teams or organizations with limited resources — 
Scrum Master responsibilities may be rotated among team members or taken on by someone with 
other responsibilities, like a developer or Product Owner. While this can work, it may dilute the 
focus on Scrum practices and reduce the ability to continuously support the team’s agile development.

### Scrum Team (Developers)

The Scrum Team is collectively responsible for creating the product increments that deliver value 
to the customer. In Scrum, the developer role encompasses a wide range of responsibilities, 
including planning, designing, coding, testing, and delivering high-quality, functional product 
features within each sprint. Developers work collaboratively, relying on their cross-functional 
skills to complete tasks, from initial planning to final deployment. Unlike traditional development 
roles, Scrum developers are not limited to specific tasks but are instead empowered to contribute 
to all aspects of product creation, making the team self-organizing and adaptable to changing 
requirements.

At the start of each sprint, developers participate in sprint planning, where they help estimate, 
prioritize, and commit to the tasks they believe can be completed within the sprint. During the 
sprint, developers attend daily standups to discuss progress, identify obstacles, and coordinate 
with team members. This ongoing communication ensures alignment, helps maintain focus on sprint 
goals, and allows the team to self-manage their workload. Scrum developers are also responsible 
for meeting the Definition of Done for each task, ensuring that features are complete, tested, 
and meet the quality standards before they are considered done.

Beyond technical responsibilities, Scrum developers play a key role in fostering a collaborative 
and transparent team environment. They participate in sprint reviews, where they demonstrate 
their work to the Product Owner and stakeholders, gathering feedback and gaining insights that 
shape future development. During retrospectives, they reflect on the sprint process, identifying 
areas for improvement and contributing to the team’s continuous improvement efforts.

The role of a Scrum Developer is both dynamic and collaborative, combining technical expertise 
with a commitment to teamwork and agile values. By working closely with each other, the Product 
Owner, and the Scrum Master, developers help ensure that each sprint delivers a functional, 
valuable increment of the product while fostering a culture of quality, adaptability, and 
continuous learning.

## Scrum ceremonies



## Sprint planning

Although Scrum is the most widely-used agile methodology, there are other such as 
[Kanban](https://kanbanize.com/kanban-resources) which dispense with sprints and adopt a fully
continuous process instead. Despite their differences, there is a large degree of overlap in agile
methods, and a practical implementation of agile will include elements from more than one.

For a discussion of agile methods, please read [Stephens, 2022, Ch. 19](https://learning.oreilly.com/library/view/beginning-software-engineering/9781119901709/c19.xhtml#please-read)

## DevOps

Because an agile project is delivering working software in a continuous series of increments, it then
becomes possible to automate some of the essential steps in the process. The current term for this
is *DevOps*, a compound of *Development* and  *Operations*. The main goal is to eliminate delays and
human error involved in some of the routine aspects of software quality assurance including,
for example, building, testing and even deployment. *Continuous integration* (CI) is the terms used
to indicate that changes to a software application are automatically assembled, compiled and tested.
The process is often visualised as a series of steps known as a *pipeline*. Going one step further
and automatically releasing and deploying software increments is known as *Continuous deployment* (CD).
CD is obviously a more risky proposition that CI and a complete CI/CD pipeline includes rigorous
verification and monitoring steps before software is actually released to users as illustrated in
Fig. 10.

![Fig 10: The four activities of continuous deployment ([Scaled Agile, 2023](https://scaledagileframework.com/continuous-deployment/))](https://scaledagileframework.com/wp-content/uploads/2023/01/Continuous_Deployment_F02-2.svg#figure){: standalone #fig10 data-title="The four activities of continuous deployment"}


https://resources.scrumalliance.org/Article/scrum-team

---
title: Requirements engineering
parent: Lifecycles and Stages
has_children: true
has_toc: false
nav_order: 3
---

# Requirements engineering

Having a clear understanding of a project's requirements is essential for success. It is often 
difficult for the development team to understand the requirements from the end user's point of view 
and for this reason, it is important to employ appropriate analytical techniques. This usually 
requires communication skills rather than software development skills and may therefore feel 
unfamiliar. However, effective clarification of requirements ensures that the development effort 
remains aligned with business priorities and delivers maximum value. It also keeps the development 
team focused on delivering features that meet user needs and expectations, helps identify 
potential issues early, reducing the risk of costly rework and delays and streamlines the 
development process by ensuring that requirements are clear, feasible, and well-understood by 
all team members.

## Requirements elicitation and analysis

To fully understand the complexities involved, it is important to break the concept down in 
various ways. Firstly, we can distinguish between requirements _elicitation_ and requirements 
_analysis_. Both are crucial steps in understanding and defining what needs to be built. 
However, they serve different purposes and involve different activities.

**_Requirements elicitation_** is the process of gathering information about the requirements from 
stakeholders and other sources. Clients and users are the only authentic sources of information 
about the system requirements, but they may struggle to articulate them clearly and in ways that 
are useful to the software development team. The main goal of requirements elicitation is to gather 
a comprehensive list of requirements, understanding stakeholder needs, expectations, and 
constraints. It is about discovering the "what" and "why" of the project. Key activities can 
therefore include

*   **Stakeholder Identification**: Identifying all the stakeholders who have a vested interest in 
    the project, including users, clients, and team members.
*   **Interviews and Surveys**: Conducting interviews, surveys, and questionnaires to gather 
    insights and expectations from stakeholders.
*   **Workshops and Brainstorming**: Holding collaborative workshops and brainstorming sessions 
    to uncover requirements through group discussions.
*   **Observation**: Observing users in their environment to understand how they interact with 
    existing systems and to identify pain points and opportunities for improvement.
*   **Document Analysis**: Reviewing existing documentation, such as process flows, user manuals, 
    and system specifications, to extract relevant requirements.

Early in an agile project, for example, requirements elicitation might involve the product owner 
conducting a series of interviews with key users to understand their needs and problems, followed 
by a workshop with the development team to brainstorm potential solutions.

**_Requirements Analysis_** is the process of refining, prioritising, and detailing the gathered 
requirements to ensure they are clear, feasible, and aligned with the project goals. The main goal 
of requirements analysis is to transform the raw requirements into a structured and prioritised set 
of actionable items that can guide the development process. It is about defining the "how" and 
"when" of the project. Key activities include

* **Prioritisation**: Assessing and ranking the requirements based on their value, impact, and 
  feasibility. In Agile, this is often done through the product backlog and a useful method is 
  MoSCoW prioritisation.
* **Refinement**: Breaking down high-level requirements into more detailed user stories or tasks 
  that can be acted upon by the development team.
* **Validation**: Ensuring that the requirements are feasible and that they accurately represent 
  the needs and constraints of the stakeholders. This might involve creating prototypes or models 
  such as wireframes.
* **Defining Acceptance Criteria**: Specifying the conditions under which a requirement or user 
  story will be considered complete and acceptable.
* **Collaboration and Communication**: Ongoing discussions with stakeholders and team members to 
  clarify and refine requirements as the project progresses.

During an agile project, for example, requirements analysis might involve the product owner and 
development team refining a user story from the backlog, detailing the acceptance criteria, and 
discussing how it fits into the upcoming sprint.

| Aspect                      | Requirements Elicitation                                     | Requirements Analysis                                     |
|-----------------------------|--------------------------------------------------------------|-----------------------------------------------------------|
| **Focus**                   | Gathering information and identifying needs                  | Refining and detailing requirements for implementation    |
| **Activities**              | Interviews, surveys, workshops, observation, document review | Prioritisation, refinement, validation, defining criteria |
| **Outcome**                 | Comprehensive list of requirements                           | Detailed, prioritised, and actionable user stories        |
| **Stakeholder Involvement** | High involvement during information gathering                | Continuous involvement for clarification and validation   |
| **Stage**                   | Early stages of the project                                  | Ongoing throughout the project in iterations              |

While requirements elicitation and requirements analysis are closely related, they serve distinct 
purposes in Agile software development. Elicitation focuses on discovering and gathering the needs 
and expectations of stakeholders, whereas analysis is concerned with refining, prioritising, and 
detailing these requirements to guide the development process. Both are essential for ensuring 
that the final product meets stakeholder needs and aligns with business goals. Their relationship, 
especially at the outset of the project, can be visualised as shown in Fig. 11.

![Fig. 11: Requirements engineering divided into elicitation and analysis](images/requirement_engineering.png){: standalone #fig11 data-title="The four activities of continuous deployment"}

Requirements analysis in the context of agile software development is the process of refining, 
prioritising, and detailing the requirements gathered from stakeholders to ensure they are 
understood, feasible, and align with the project's goals. This process is continuous and 
iterative, aligning with the Agile principles of flexibility and adaptability. It is therefore 
a feature of most development interactions.

## Development perspectives

As software engineers, we are mainly interested in the functions provided by the system we are 
building; however, the way in which those functions are presented to the user can have a major 
impact on the success of the eventual product. A system may function perfectly, but if it is 
difficult to use it may not fulfil its intended purpose. We can therefore differentiate between 
_functional_ requirements and _non-functional_ requirements. Understanding and properly addressing 
both types of requirements ensures that the product not only works correctly but also performs 
well and provides a good user experience.

**_Functional requirements_** specify the specific behaviours, functions, or tasks that the system 
must perform. They define how the system interacts with users, other systems, and data and can be 
tested objectively using white box testing techniques such as automated unit testing. Some examples 
might be

* **User Authentication**: The system must allow users to log in using a username and password.
* **Data Processing**: The system must calculate and display the monthly sales report.
* **Transaction Handling**: The system must process and record financial transactions.

The main goal of functional requirements is to ensure that the system performs the necessary tasks 
that fulfil the users' needs and business objectives. They are usually captured as user stories 
which include explicit acceptance criteria for validating that the functionality is correctly 
implemented.

**_Non-functional requirements_** specify how the system should perform in terms of its 
operational qualities and constraints. They capture quality attributes such as performance, 
usability, reliability and security, as well as system-wide constraints such as compliance, 
compatibility, and scalability. Non-functional requirements affect the overall behaviour and 
experience of the system rather than specific functionalities. Some examples are

* **Performance**: The system must respond to user actions within 2 seconds.
* **Usability**: The system must be accessible to users with disabilities, following WCAG 2.1 
  guidelines.
* **Security**: The system must encrypt all sensitive data in transit and at rest.

The main goal of non-functional requirements is to ensure that the system meets explicit standards 
and operates effectively and efficiently under various conditions. The Definition of Done (DoD) 
is an important tool in an Agile project for ensuring that quality attributes are considered 
during each sprint. Non-functional aspects can also be part of acceptance criteria for relevant 
user stories.

The table below contrasts these two types of requirement

| Aspect                  | Functional Requirements                                    | Non-Functional Requirements                                          |
|-------------------------|------------------------------------------------------------|----------------------------------------------------------------------|
| **Focus**               | What the system should do                                  | How the system should perform                                        |
| **Type**                | Specific behaviours and functionalities                     | Quality attributes and operational constraints                       |
| **Examples**            | User authentication, data processing, transaction handling | Performance, usability, security, scalability                        |
| **Measurement**         | Directly testable through functionality tests              | Measured through performance tests, user feedback, and audits        |
| **Documentation**       | User stories, use cases, functional specifications         | Quality attributes, service level agreements, compliance standards   |
| **Impact**              | Affects specific functions or modules                      | Affects the overall system behaviour and user experience              |
| **Importance in Agile** | User stories with clear acceptance criteria                | Included in the definition of done and acceptance criteria           |
| **Stakeholder Focus**   | End users, business analysts, developers                   | System architects, QA testers, IT operations                         |

## User experience (UX)

UX is a concept closely related to that of non-functional requirements. It focuses explicitly on 
understanding and improving the user's interaction with the product, ensuring it is intuitive, 
accessible, and satisfying. It requires intense communication between the development team and 
the client/users to fully understand how the system is expected to behave. Part of the process is 
about understanding the pathways through the system from the users' point of view. Key activities 
that can help to discover the users' expectations include

* **User Research**: Conducting studies to understand the target users, their needs, behaviours, 
  and pain points. Methods include interviews, surveys, and observation.
* **Personas and User Stories**: Creating personas to represent different user types and user 
  stories to capture their needs and goals.
* **Wireframing and Prototyping**: Designing wireframes and prototypes to visualise the user 
  interface and interaction flow.
* **Usability Testing**: Testing the prototypes with real users to gather feedback and identify 
  usability issues.
* **Interaction Design**: Designing the interactions users have with the product to ensure they 
  are seamless and intuitive.
* **Visual Design**: Creating the look and feel of the product, including layout, colour schemes, 
  and typography.

In an agile project, a UX designer might create a prototype of a new feature and conduct usability 
tests to ensure it is easy to navigate and meets user expectations. Feedback from these tests would 
then be used to refine the design iteratively. The table below illustrates the differences between 
a functional approach to system design and one focused on UX. It is clear from the table contents 
that the two perspectives are complementary and that bot are needed to deliver a successful project.

| Aspect                      | UX (User Experience) Analysis                                   | Functional Analysis                                             |
|-----------------------------|-----------------------------------------------------------------|-----------------------------------------------------------------|
| **Focus**                   | User interaction and satisfaction                               | System functionality and behaviour                               |
| **Primary Concern**         | How users feel about and interact with the product              | What the system should do and how it should do it               |
| **Activities**              | User research, wireframing, prototyping, usability testing      | Requirement gathering, use case development, system modelling   |
| **Outcome**                 | Improved user interface and interaction design                  | Detailed functional requirements and specifications             |
| **Stakeholder Involvement** | High involvement from end users and UX designers                | High involvement from business analysts and stakeholders        |
| **Tools and Methods**       | Personas, user stories, wireframes, prototypes, usability tests | Use cases, functional specifications, flowcharts, data diagrams |
| **Goal**                    | Enhance usability, accessibility, and user satisfaction         | Ensure the system performs required functions correctly         |

### User Stories:

In agile projects, requirements are typically captured as _user stories_, which are short, simple 
descriptions of a feature told from the perspective of the end user. They help to ensure that 
each requirement provides value to the end user and keeps the development team focused on delivering 
user-centric features. In addition to clarifying what is required, user stories are also a useful 
communication tool to facilitate conversations between end users and the development team.

_As a [type of user], I want [an action] so that [benefit/reason]_

In the context of a hospital management system, for example, some user stories might be as follows:

*   **Appointment Booking**:
    *   **As a** patient, **I want** to book an appointment with a doctor **so that** I can receive medical consultation.
    *   **As a** patient, **I want** to view available appointment slots **so that** I can choose a convenient time.
*   **Medical Records Access**:
    *   **As a** doctor, **I want** to access a patient’s medical history **so that** I can provide informed medical care.
    *   **As a** patient, **I want** to view my medical records online **so that** I can stay informed about my health.
*   **Prescription Management**:
    *   **As a** doctor, **I want** to write and send electronic prescriptions to pharmacies **so that** patients can get their medications easily.
    *   **As a** patient, **I want** to view my current prescriptions and refill status **so that** I can manage my medication.

Notice that a key requirement is to identify the different types of user that the system must 
cater for. This will feed into the overall system design by underpinning role-based navigation 
and security.

The complete set of user stories defined during the requirements analysis process is referred to 
as the _product backlog_: Here, user stories are prioritised according to their value to the 
business, user needs, and the feasibility of implementation along with system features, 
enhancements, and bug fixes. Regular sessions (often referred to as backlog grooming or refinement) 
are held to review and update the backlog, ensuring that it accurately reflects current priorities 
and understanding.

During development - during a sprint planning session, for example - user stories are selected for 
development according to their priority. At this point, further requirements analysis is typically 
needed to add more detail to the task and also to define the task's acceptance criteria. These are 
the conditions that must be met for the story to be considered complete. Acceptance criteria 
provide clear, testable conditions that help the development team understand what is required and 
help ensure the feature meets the stakeholders' expectations. Refining a user story may require 
input from project stakeholders such as end users as well as from cross-functional team members 
such as developers, testers and product owners. These actors collaborate to ensure a shared 
understanding and technical feasibility.

Because agile projects deliver features in small, manageable increments, ongoing requirements 
analysis is needed so that each increment delivers valuable and usable functionality. Each 
increment provides an opportunity for stakeholders to give feedback, which is then used to 
refine future requirements.

## Change management

Agile project embraces change and therefore, requirements analysis in Agile is flexible, allowing 
for adjustments based on new information, changes in business priorities, or feedback from earlier 
increments. In most cases, changes are agreed between the client and the development team in the 
normal course of iterative development. The product backlog is a useful tool for managing changing 
requirements because it provides a central repository for all current project requirements. This 
means that it can be used as a focus for discussions during sprint planning and review meetings 
and the priorities assigned to particular requirements can be updated as the project proceeds. 
If the client introduces a new requirement that was not discussed at the outset of the project, 
it is simply added to the backlog. Its priority is then evaluated in the context of other 
requirements and the time available which may imply changes in the priorities of other backlog 
items.

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Practical tips for requirements engineering](requirements_tips)

## Further reading

*   Requirements engineering ([O'Regen, 2022, Ch. 5](https://link-springer-com.napier.idm.oclc.org/book/10.1007/978-3-031-07816-3))
*   [UX guidelines for people-friendly software](https://www.techtarget.com/searchsoftwarequality/feature/UX-guidelines-for-people-friendly-software)

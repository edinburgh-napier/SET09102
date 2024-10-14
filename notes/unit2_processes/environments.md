---
title: Environments
parent: Processes and Workflow
has_children: true
has_toc: false
nav_order: 2
---

# Environments

Before getting into the topic of team work flows, it is important to have a clear idea of the typical
context in which a software development team works.
An *environment* is the working context of a software system. The term is widely used and it
is important to understand its full implications. The major distinction is between the *live*
environment (also referred to as the *production* environment) where a system is in actual use,
and the *development* environment where software developers are making changes. As the software
system evolves over time, code changes will be introduced into the live environment, but this has
to be done very carefully to avoid any disruption to the users. The development environment
replicates the live environment including code and supporting infrastructure such as databases.
Because each member of the development team will be working on different changes to the codebase,
each one will have their own development environment. This is an important detail: the development
environment is not shared - each member of the team has their own copy which includes the last known
good configuration of the codebase, plus the changes they are currently working on.

![Environments](../../images/environments.png#figure)
*Fig 1: System environments*

Code repositories such as GitHub are excellent tools for managing the synchronisation of the
various environments in use. Once developers have completed the changes they are working on,
they *push* the code to the repository. Once any quality assurance procedures have been
completed, the code can then be *deployed* to the live environment. Fig. 1 illustrates this
and also includes a test environment where integrated code can be tested before deployment.
Like the live environment, the test environment is a shared instance of the code that is
hosted on a server or on the cloud. Development environments, in contrast, are located on
the workstation belonging to the individual developer. In order for their personal development
environment to be kept up to date, developers need to *fetch* changes from the repository on
a regular basis. Typically, this is done just before starting a new development task. During
work on a task, it is important that developer's working environment remains stable. Changes
from other developers are only introduced between one task and the next.

As well as being used for synchonising code across different environments, GitHub has
many other useful features that can be used to manage projects. In a team situation,
the risks and problems quickly balloon compared to working on an individual project,
and it is a good investment of time to establish robust working routines. Using GitHub
is not the only way to do this - there are other tools and platforms such as
[Jira](https://www.atlassian.com/software/jira). However, as one of the most popular
services, GitHub has reliability and recognition value in its favour.

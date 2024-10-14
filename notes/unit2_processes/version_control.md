---
title: Version Control
parent: Processes and Workflow
has_children: true
has_toc: false
nav_order: 1
---

# Version Control

Version control is a fundamental practice in software development that allows teams and 
individuals to manage changes to code, track its history, and collaborate effectively. It 
provides a structured way to track changes, manage different versions of software, and 
coordinate the efforts of multiple developers. By maintaining a history of changes, version 
control helps developers understand who made modifications, when they were made, and why, 
making it easier to debug, refactor, or revert to previous versions if necessary.

The most widely used version control systems today, such as [Git](https://git-scm.com/), 
[Subversion](https://subversion.apache.org/) (SVN), and 
[Mercurial](https://www.mercurial-scm.org/), allow for distributed collaboration, where 
each developer works independently on their own copy of the project. With tools like 
[GitHub](https://github.com),[GitLab](https://about.gitlab.com/), and 
[Bitbucket](https://bitbucket.org/product/), teams can easily manage branches, pull 
requests, and code reviews, ensuring that changes are properly reviewed and integrated 
into the main codebase.

Version control also plays a critical role in supporting continuous integration/continuous 
deployment (CI/CD) workflows by enabling automated testing and deployment pipelines. 
Whether working alone or in a large team, version control is an essential tool for 
maintaining the integrity of a codebase, managing collaboration, and ensuring that 
software can evolve efficiently over time.

![Fig. 1. Don't be ignorant (<a href="https://xkcd.com/1597">xkcd</a>)](https://imgs.xkcd.com/comics/git.png){: standalone #fig1 data-title="Don't be ignorant" }

## Repositories

A code repository, or repo, is a centralized location where software project files and 
their version history are stored and managed. It serves as the backbone of version control 
systems, allowing multiple developers to collaborate on a project while keeping track of 
every change made over time. Developers save files to the repo through the _commit_ action.

A file version history is a detailed record of all the changes made to each file in a 
project over time. Every time a developer makes modifications and commits them, the system 
saves a snapshot of those changes, including the author of the change, the timestamp, and 
a message describing what was done. This history allows developers to track the evolution 
of the codebase, see who made specific changes, and understand why those changes were made.

![Fig. 2. File histories](images/file_histories.png){: standalone #fig1 data-title="File histories" }

A major advantage of maintaining a full file history is that changes can always be undone.
However, that is only possible for committed version of the file. Committing often is 
therefore a good practice to develop. 

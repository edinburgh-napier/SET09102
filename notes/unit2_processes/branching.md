---
title: Branching
parent: Processes and Workflow
has_children: true
has_toc: false
nav_order: 4
---

# Branching and merging

A _branch_ in a code repository is a separate version of the project that allows developers 
to work on new features, bug fixes, or experiments independently of the main codebase. 
By creating a branch, developers can isolate their changes without affecting the stable 
version of the software, enabling parallel development workflows. Each branch starts as a 
copy of the code at a specific point in time, and any changes made to that branch are 
tracked separately. Once the work on a branch is complete and reviewed, it can be merged 
back into the main branch, typically through a pull request. Branching is an essential 
practice in modern software development, allowing teams to collaborate efficiently and 
manage multiple streams of work within the same project.

A software application can be thought of as a consistent set of files including code,
settings, images, documentation, etc. Typically, each file will have its  own revision
number, and the term for the set of versioned files that work together is a *configuration*.
A released version of the application represents a stable configuration. Between releases,
the development team will be working on changes to the codebase, thus introducing instabilities.
As mentioned in the previous section, the process of code deployment is carefully controlled
to avoid users coming into contact with any errors caused by these instabilities. If they,
however, it still has to be possible for the development team to fix any errors in the released
code and release an emergency patch. In this scenario, we need to different configurations,
the one representing the released version of the application,and the one representing the
next release where a lot of development work is going on. Because the next release builds on
the current one, we can imagine taking a copy of the codebase at the point of release. That
way, we can fix emergencies with the live code in parallel with the new development work
because the two configurations are independent. In GitHib and other similar systems, this
is referred to as a *branch* in the code as illustrated in Fig. 2. Note that the branch
representing the current release is called `main` - this is a common convention.

``` mermaid
gitGraph
   commit id: " "
   commit id: "release"
   branch next_release
   checkout next_release
   commit id: "change 1"
   checkout main
   commit id: "bug fix 1"
   checkout next_release
   commit id: "change 2"
   checkout main
   commit id: "bug fix 2"
```
*Fig. 2: Release branch*

Once the code configuration for the new release is stable, the parallel code branch can be
*merged* with the main branch as illustrated in Fig. 3. During this process, it is possible
for code conflicts to arise. This is where changes have occurred to the same file in
both branches and keeping one version would mean losing the changes in the other. Some such
conflicts can be handled in an automated way, but others will require the two versions of the file
to be merged manually to create a third composite version that preserves the changes from both
branches.

``` mermaid
gitGraph
   commit id: " "
   commit id: "Release 1"
   branch next_release
   checkout next_release
   commit id: "change 1"
   checkout main
   commit id: "bug fix 1"
   checkout next_release
   commit id: "change 2"
   checkout main
   commit id: "bug fix 2"
   checkout next_release
   commit id: "change 3"
   checkout main
   merge next_release id: "Release 2"
   commit id: " "
```

*Fig. 3: Merging branches*

A further complication that needs to be managed is that several pieces of development work will be
going on simultaneously, each being worked on by a different developer. It is essential that these
changes do not conflict with each other. A good way to manage this extra complication is to create
a separate branch for each piece of work as illustrated in Fig. 4. In the example, one developer
creates a branch to work on feature 1 and a second developer creates a parallel branch to work on
feature 2. Once both pieces of work are complete they are merged into the new release branch. The
same procedure would be done for the bug fixes in the main branch.

``` mermaid
gitGraph
   commit id: " "
   commit id: "Release 1"
   branch next_release
   checkout next_release
   commit id: "change 1"
   checkout main
   commit id: "bug fix 1"
   checkout next_release
   branch feature_1
   branch feature_2
   checkout feature_2
   commit id: "F2 change 1"
   checkout feature_1
   commit id: "F1 change 1"
   checkout next_release
   merge feature_1
   checkout main
   commit id: "bug fix 2"
   checkout feature_2
   commit id: "F2 change 2"
   checkout next_release
   merge feature_2
   checkout main
   merge next_release id: "Release 2"
   commit id: " "
```

*Fig 4: Parallel feature branches*

A merge operation is triggered by a *pull request* (PR). With a PR, the developer is indicating that the
code changes and testing are complete,and that the modified code is ready to be pulled into the parent
branch. Between the PR and the actual merge, it is good practice for the code changes to be reviewed by
another developer to identify any defects. The original developer then addresses the review comments
before completing the merge.

## GitHub Flow

GitHub defines a basic workflow called
[GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) that teams
can follow when making changes to code.

> 1. Create a branch
> 2. Make code changes
> 3. Create a pull request
> 4. Address review comments
> 5. Merge your pull request
> 6. Delete your branch

GitHub Flow assumes the simple branching strategy discussed above. If a team is working on multiple
versions of an application at the same time, a more complicated strategy might be needed to keep
the different versions from interfering with each other.

The process defined above only takes care of problems that are directly related to code changes.
however, it can form the basis of a more complete procedure that also includes the management of
tasks on a task board and any other procedural requirements that the team agrees on.

## Further reading

* [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)

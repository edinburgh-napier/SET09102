---
title: Pull Requests
parent: Processes and Workflow
has_children: true
has_toc: false
nav_order: 5
---

# Pull Requests

### Issuing a pull request

GitHub and other similar tools provide excellent support for reviewing the changes you have made
to pieces of code. At the point you create a PR, code changes are displayed automatically. You should
take the opportunity to look over the changes as part of the final sanity check before going ahead with
the PR.

It is good to keep in mind that a large PR will be difficult and time-consuming for the reviewer. Small
PRs are typically preferred because they represent a smaller interruption to the reviewer's other work,
and they provide faster feedback to the original developer.

### Responding to a pull request

To carry out a review properly, you will need to clone the developer's feature branch. That will allow
you to run the modified code, and crucially to run the unit tests as well.

There are essentially three options for your response:

1. Add a comment and accept the PR. This indicates that all is well, but code conflicts may still
   arise at the point the feature branch is merged into the main codebase.
2. Add a comment and close the PR, effectively rejecting it. This would need to be pretty bad to take
   this option.
3. Add a comment or query to be addressed by the developer. This could simply involve an exchange of
   information, but may require the developer to make further changes. If further cfhanges are needed,
   the developer can use the tools in GitHub to request another review from the same person once they
   are done.


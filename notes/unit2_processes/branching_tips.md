---
title: Branching Tips
parent: Branching
has_children: false
nav_exclude: true
nav_order: 1
---

# Tips for learning about branching

1. Understand What Branching Is

    > A branch is essentially a separate copy of the codebase where you can work on new features, 
    > bug fixes, or experiments without affecting the main code.
    > 
    > Think of a branch as a "safe space" where you can make changes independently of the main 
    > (production) branch. This allows you to test, experiment, or develop new features while keeping 
    > the main branch stable.

2. Always Create a New Branch for New Work

    > Don’t work directly on the main or master branch. Always create a new branch for any task you're 
    > working on.
    > 
    > Before starting a new feature or fix, create a branch with a meaningful name:
    > 
    > ```sh
    > git checkout -b feature/new-feature-name
    > ```
    > 
    > This keeps your changes separate from the production code and allows you to switch back and forth 
    > between branches if needed.

3. Use Descriptive Branch Names

    > Give your branches descriptive names that reflect the task or issue you’re working on.
    > Use a naming convention that’s clear and organised. For example:
    > 
    > * feature/add-user-authentication
    > * bugfix/fix-login-issue
    > * hotfix/security-patch
    > 
    > This helps both you and your team easily understand what each branch is for.

4. Learn the Basic Branching Commands

    > Get comfortable with the basic Git commands for working with branches.
    > 
    > Practice these essential commands:
    > 
    > * Create a new branch: `git checkout -b my-branch-name`
    > * Switch to another branch: `git checkout main` or `git switch main`
    > * List all branches: `git branch`
    > * Delete a branch: `git branch -d my-branch-name` (locally) or 
    >   `git push origin --delete my-branch-name` (remotely)
    > * Push your branch to the remote repository: `git push origin my-branch-name`

5. Work on One Thing Per Branch

    > Stick to one feature or bug fix per branch to avoid mixing unrelated changes.
    > 
    > For each task or issue, create a separate branch. This keeps your work modular and easy to 
    > manage. For example, avoid working on feature A and bug fix B in the same branch, as it makes 
    > tracking changes and reviewing code harder.

6. Sync Your Branch with the Latest Changes

    > Regularly pull changes from the main branch into your feature branch to stay up-to-date.
    > Periodically sync your branch with the main branch, especially if other developers are working 
    > on the same project. This reduces the risk of merge conflicts later:
    > 
    > ```sh
    > git checkout main
    > git pull origin main
    > git checkout my-branch
    > git merge main
    > ```
    > 
    > Alternatively, you can use git rebase to reapply your branch’s changes on top of the latest 
    > main branch (but rebase with caution as it rewrites history).

7. Avoid Committing Directly to the Main Branch

    > Always commit changes to your feature or development branch first, and then merge into main.
    > 
    > Make sure you’re on your feature branch before committing changes:
    > 
    > ```sh
    > git add .
    > git commit -m "Implement feature X"
    > ```
    > 
    > This keeps the main branch clean and stable, as all new work is done in feature branches.

8. Test Your Branch Before Merging

    > Before merging your branch into main, ensure that your code works as expected and passes any tests.
    > 
    > Test the functionality you’ve implemented in your branch thoroughly. If your project has 
    > automated tests, run them on your branch to catch bugs early. Ensure your branch is stable 
    > before requesting a merge.

9. Use Pull Requests for Merging

    > When you’re ready to merge your branch into main, create a pull request (PR) rather than merging 
    > directly.
    > 
    > Submit a pull request so that your changes can be reviewed by a team member. A PR allows for a 
    > more controlled and collaborative approach to merging:
    > 
    > ```sh
    > git push origin my-branch
    > ```
    > 
    > Open a PR in your repository's interface (GitHub, GitLab, etc.), and request a review from 
    > your team.

10. Handle Merge Conflicts Carefully

    > Merge conflicts happen when two branches make conflicting changes to the same part of the code. 
    > Learn how to resolve them carefully.
    > 
    > If a conflict arises during a merge, Git will stop the process and give you a chance to resolve 
    > the conflicts:
    > 
    > ```sh
    > git merge main
    > ```
    > 
    > Git will highlight conflicting areas in your files. After resolving them, mark the files as 
    > resolved:
    > 
    > ```sh
    > git add <file>
    > git commit
    > ```
    > 
    > Take your time to understand the conflict and decide which changes should be kept.

11. Don’t Be Afraid to Delete Branches

    > Once your branch has been merged and the changes are in main, it’s safe to delete the branch.
    > 
    > After a successful merge or pull request, delete the branch locally and on the remote repository 
    > to keep things clean:
    > 
    > ```sh
    > git branch -d my-branch
    > git push origin --delete my-branch
    > ```
    > 
    > This reduces clutter and keeps the branch list manageable.

12. Experiment Safely on Separate Branches

    > If you’re working on experimental changes or are unsure about your solution, create a new branch 
    > specifically for experimentation.
    > 
    > If you want to try something new but don’t want to mess up your main feature branch, create a 
    > temporary branch:
    > 
    > ```sh
    > git checkout -b experiment/new-idea
    > ```
    > 
    > You can safely experiment and later delete the branch if the changes don’t work out.

13. Document Your Branching Strategy

    > For collaborative projects, agree on and document a branching strategy (such as Git Flow, 
    > GitHub Flow, or Trunk-Based Development).
    > 
    > Follow a standard branching model so everyone on the team is consistent. For example:
    > 
    > * Git Flow: Use long-lived branches like main, develop, and release, along with short-lived
    >   feature branches.
    > * GitHub Flow: Use main and feature branches with pull requests for deployment.
    > * Trunk-Based Development: Have short-lived feature branches that are regularly merged into 
    >   the main branch.

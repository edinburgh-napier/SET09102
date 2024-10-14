---
title: Version Control Tips
parent: Version Control
has_children: false
nav_exclude: true
nav_order: 1
---

# Practical tips for getting started with Git and GitHub

1. Learn your way around the [GitHub documentation](https://docs.github.com/en/get-started)

    > You can waste a lot of time doing random searches on the internet. The best approach is to use
    > the authorative guide.

2. Start with the Basics: Git Commands

    > Learn and practice the basic Git commands, such as `git init`, `git add`, `git commit`, `git status`, 
    > and `git log`. These are the fundamental commands that you’ll use frequently.
    > 
    > Set up a small project on your local machine and initialize a Git repository (`git init`). Make 
    > some changes, track them with `git add`, commit those changes, and check the status with 
    > `git status` and the commit history with `git log`.

3. Use GitHub for Remote Repositories

    > Create a GitHub account and use it to host your repositories remotely. Understand the difference 
    > between local and remote repositories and how to interact with them.
    > 
    > Create a repository on GitHub, clone it to your local machine using `git clone`, and start making 
    > changes. Push updates to the remote repository using `git push` and pull changes from the remote 
    > repository with `git pull`.

4. Understand the Purpose of `.gitignore`

    > Learn how to use the `.gitignore` file to exclude files that don’t belong in version control, such 
    > as logs, build artifacts, and sensitive data like API keys.
    > 
    > Create a `.gitignore` file in your project and add entries like `*.log`, `node_modules/`, or 
    > `.env` to prevent Git from tracking those files. Commit the `.gitignore` file to your repository.

5. Work with Cloning and Forking

    > Understand how cloning and forking work in GitHub. Cloning creates a local copy of a repository, 
    > while forking makes a personal copy of someone else’s repository that you can modify.
    > 
    > Practice cloning a repository from GitHub using `git clone`. If you're interested in contributing 
    > to an open-source project, fork the repository and clone your fork. Then, make changes and submit 
    > a pull request to the original project.

6. Practice Working with Remote Repositories

    > Understand how to synchronize local and remote repositories using `git push` and `git pull`. 
    > These commands allow you to send your changes to GitHub and retrieve updates from the remote 
    > repository.
    > 
    > Make changes to your local repository, commit them, and push them to GitHub. Ask a collaborator 
    > to make changes, and practice pulling their updates to your local environment.

7. Experiment with `.gitignore` Templates

    > Use `.gitignore` templates for different programming languages or environments. GitHub offers a 
    > variety of templates that you can use as a starting point.
    > 
    > Search for a `.gitignore` template for your project type (e.g., Python, Node.js) on GitHub’s 
    > `.gitignore` [repository](https://github.com/github/gitignore) and use it in your project. 
    > Customize the template as needed.

8. Understand the Difference Between `git pull` and `git fetch`

    > `git pull` retrieves and merges changes from the remote repository, while `git fetch` only 
    > downloads changes without merging. Knowing when to use each can help you avoid unwanted merges.
    > 
    > Practice using both commands. Try `git fetch` to see what changes are available on the remote 
    > without affecting your working directory, and then manually merge changes with `git merge` if needed.

9. Experiment with Undoing Changes

    > Learn how to undo changes safely using `git reset`, `git revert`, and `git checkout`. These 
    > commands help you undo commits or changes to the working directory.
    > 
    > Make intentional mistakes or commits and practice undoing them using different methods. For 
    > example, use `git reset` to unstage files, `git checkout` to revert changes to a file, and 
    > `git revert` to undo a commit while keeping the history intact.

10. Keep Track of Changes with `git diff`

    > Use `git diff` to see the differences between your working directory, staging area, and the 
    > latest commit. This helps you review changes before committing.
    > 
    > Before committing, run `git diff` to review the changes you've made. Then use `git add` to stage 
    > the changes and commit them with `git commit`.

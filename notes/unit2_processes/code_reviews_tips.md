---
title: Code Reviews Tips
parent: Code Reviews
has_children: false
nav_exclude: true
nav_order: 1
---

# Practical tips for code review

1. Start by Observing
> If you’re new to code reviews, begin by observing how experienced developers participate in the 
> process.
> 
> Watch how other team members give feedback, respond to comments, and resolve issues. This will 
> give you a sense of the expectations and standards for code reviews in your team or project.

2. Submit Small, Focused Pull Requests
> Break your work into smaller, focused pull requests (PRs) instead of submitting one large PR with 
> many changes.
> 
> Focus each PR on a single feature or fix. Smaller PRs are easier to review and get merged faster, 
> and reviewers can provide more targeted feedback. This also helps you understand feedback in 
> manageable chunks.

3. Write Clear and Descriptive PR Descriptions

    > Help reviewers by writing a clear and concise description of what your pull request does.
    > 
    > Summarise the purpose of your code changes, including any relevant context (e.g., links to issues, 
    > a description of the problem being solved, or any special considerations). Mention if certain 
    > parts of the code need special attention or testing instructions.

4. Be Open to Feedback

    > Be prepared to receive feedback, whether it’s about bugs, coding style, or improvements. Code 
    > reviews are not personal critiques, they’re meant to improve the quality of the project.
    > 
    > Take feedback as a learning opportunity. Ask questions if you’re unsure about a suggestion, 
    > and explain your approach if needed. If you disagree with feedback, discuss it constructively 
    > and be open to alternative viewpoints.

5. Focus on Code Quality and Best Practices

    > Follow coding standards and best practices from the start to avoid getting a lot of style-related 
    > comments.
    > 
    > Familiarise yourself with the coding standards and guidelines used by your team. Tools like 
    > linters (e.g., ESLint for JavaScript) can help you catch many formatting issues before you 
    > submit a PR.

6. Run Tests Before Submitting

    > Ensure your code works and passes tests before submitting it for review.
    > 
    > Run all relevant tests (unit tests, integration tests, etc.) before submitting the PR. If there 
    > are automated CI tests in place, wait for them to pass before requesting a review. This helps 
    > reviewers focus on the code rather than spending time pointing out failing tests.

7. Respond to Review Comments Promptly

    > When you receive feedback, address the comments as soon as you can to keep the review process moving.
    > 
    > After making the requested changes, reply to the reviewer’s comments to acknowledge the feedback, 
    > explain how you resolved it, or ask for clarification if needed.

8. Ask for Clarification When Needed

    > Don’t hesitate to ask questions if feedback is unclear.
    > If you don’t understand a reviewer’s comment, ask for clarification. It’s better to have a clear 
    > understanding than to guess and implement something incorrectly. For example, “Could you clarify 
    > what you mean by ‘refactor this function’? Do you have a preferred approach in mind?”

9. Be Respectful and Courteous

    > Code reviews are collaborative processes, so always remain respectful and professional, whether 
    > you’re the one giving or receiving feedback.
    > 
    > Avoid defensive responses to feedback. Instead, thank the reviewer for their time and 
    > contributions. When giving feedback, aim for constructive and respectful comments that focus 
    > on improving the code, not criticising the developer.

10. Get Familiar with Tools Like GitHub, GitLab, or Bitbucket

    > Learn how to use the code review tools on your platform (e.g., GitHub, GitLab, or Bitbucket) 
    > efficiently.
    > 
    > Explore features like pull requests, inline comments, approving/rejecting changes, and viewing 
    > file differences. Knowing how to navigate these tools will make the review process smoother for 
    > both you and your team.

11. Look at Code from a Reviewer’s Perspective

    > Even if you’re not doing a formal review, take time to read through other team members' pull 
    > requests to see how they approach problems.
    > Practicing reviewing someone else’s code helps you improve your own. Look at other PRs and think 
    > about the following:
    > 
    > * Is the code clear and readable?
    > * Are there edge cases the developer may have missed?
    > * Are there opportunities for optimisation or simplification?

12. Be Patient

    > Code reviews take time, so be patient when waiting for feedback.
    > 
    > After submitting a PR, allow reviewers enough time to thoroughly go through your code. If 
    > it’s urgent, you can politely ask for a review, but don’t rush the process.

13. Prepare for Rework

    > Understand that code reviews may require multiple iterations.
    > 
    > After receiving feedback and making changes, be prepared for further rounds of review. It's 
    > common to revise your code several times before it’s finally merged, especially when dealing 
    > with complex features.

14. Review Your Own Code Before Submitting

    > Before submitting a PR, review your own code to catch obvious mistakes or unnecessary complexity.
    > 
    > Do a self-review and ask yourself:
    > 
    > * Is my code clean and easy to understand?
    > * Are there any unnecessary comments or debug statements I need to remove?
    > * Have I tested this code thoroughly?
    > * Can I simplify or improve any part of the implementation?

15. Keep Track of Review Progress

    > Stay engaged during the review process.
    > 
    > Keep track of the progress of your review by following up on unresolved comments, checking 
    > CI/CD status, and monitoring if new feedback is provided. This helps ensure that the review 
    > progresses smoothly.

---
title: Human Factors
parent: Building Applications
has_children: true
has_toc: false
nav_order: 1
---

# Human Factors in Software Engineering

If you think about software engineering as simply writing code, it is easy to
overlook the other people who have an interest in the software products that you
are creating. Fig. 1 illustrates some of the most important ones.

![Fig. 1. Other people with an interest in the software engineer's work](images/other_people.gif){: standalone #fig1 data-title="Other people with an interest in the software engineer's work" }

Communication and collaboration are fundamental to modern software development, shaping productivity, 
morale, and overall success. Teams must effectively share information to avoid misunderstandings, 
duplicated efforts, or overlooked requirements. For instance, if developers fail to communicate about 
changes in code, this can lead to integration issues that require time-consuming rework. Teams that 
utilize communication tools, hold regular meetings, and practice collaborative coding techniques like 
pair programming often work more cohesively and efficiently.

Emotional intelligence and empathy contribute significantly to a positive work environment both
within the team and in its interactions with external stakeholder. When developers understand and 
manage their emotions, as well as show empathy towards colleagues, they foster better collaboration 
and resolve conflicts effectively. Applying the same skills to external relations makes the Agile
process smoother with honest feedback and effective discussions.

Addressing and managing human factors — communication, team dynamics, diversity, leadership, 
motivation, and adaptability — can create a supportive environment where development teams thrive. 
Teams that prioritize these aspects tend to produce higher-quality work, adapt better to challenges, 
and maintain long-term productivity and morale.

## External Stakeholders

A *stakeholder* is any person, group of people or organisation with an interest in
a project. The client (or customer) obviously has an interest in the system being
built: they have set the requirements and they are paying for it. Depending on
the type of system and the context of use, however, there may be many other
stakeholders that need to be considered as the development proceeds. The process
of mapping out all of these separate concerns is called *stakeholder analysis*.
You need to be aware that sometimes, your software development project may not be
welcome and certain stakeholders may be resistant to the intended outcome.
Identifying those negative interests can help you to avoid unexpected setbacks.

[Smith, 2000](https://www.pmi.org/learning/library/stakeholder-analysis-pivotal-practice-projects-8905)
provides a clear explanation of how to conduct a thorough stakeholder analysis.

1. **Identify the stakeholders**

   Starting with an initial brainstorming session, all possible interests are
   included. Candidate stakeholders may be dropped later  if it becomes clear that
   they are not in fact concerned with the project.

2. **Identify stakeholders' interests, impact level, and relative priority**

   The next step is to gather the list of stakeholders into a
   convenient format such as a spreadsheet, to rate their level of potential
   impact on the project and rank them in terms of importance. Direct
   conversations with the stakeholders is useful at this stage.

3. **Assess stakeholders for importance and influence**

   *Influence* is an indication of the control that a stakeholder has over the
   project. The client is very influential because they can terminate the project
   at any time. *Importance* quantifies the extent to which a stakeholder is
   critical for the success of the project. For example, if the target users
   are dissatisfied with the outcome, the project may be considered a failure.

   As part of this step it can be useful to visualise stakeholders on a chart
   divided into four quadrants as shown in Fig. 2. Those in the top right quadrant
   are the key stakeholders for your project.

   ![Fig. 2. Stakeholders mapped by importance and influence](images/stakeholder_map.png){: standalone #fig2 data-title="Stakeholders mapped by importance and influence" }

4. **Outline assumptions and risks**

   Risk management in a software development project usually focuses on resource
   availability and technical risks. One of the benefits of performing a stakeholder
   analysis is that it offers a simple way to include sociopolitical risks into
   your thinking. This information can be added to the spreadsheet.

5. **Define stakeholder participation**

   This final step is about making decisions about *who* should participate in
   the project and *when*. Some stakeholders just need to be kept informed;
   others need to be actively kept on-side.

## Communication skills

To maintain strong and effective relationships with external stakeholders, a software developer 
needs a blend of social and analytical skills that enable clear communication, foster trust, and 
ensure that technical solutions align with stakeholder needs. One essential social skill is active 
listening. Developers who [actively listen](https://hbr.org/2024/01/what-is-active-listening) can 
understand stakeholder concerns, priorities, and requirements more accurately, which is crucial 
for translating business needs into technical solutions. When stakeholders feel heard, trust and 
mutual respect grow, creating a foundation for a productive, collaborative relationship.

Empathy is another critical social skill that allows developers to appreciate the perspectives and 
challenges of stakeholders, who may come from diverse professional backgrounds. By empathizing with 
stakeholders, developers can better align their solutions with real-world challenges, anticipate 
concerns, and address potential misunderstandings before they escalate. This sensitivity to others’ 
needs and constraints is invaluable when managing expectations, particularly if there are technical 
limitations or complex requirements.

Effective communication is indispensable, as developers often need to explain technical concepts 
in a clear and accessible manner to non-technical stakeholders. Simplifying complex ideas and 
avoiding jargon help prevent misinterpretations, making it easier for stakeholders to understand 
progress, challenges, and the reasoning behind technical decisions. Regular, transparent 
communication helps stakeholders feel informed and valued, which is essential for long-term trust.

On the analytical side, problem-solving skills are essential for addressing the dynamic needs of 
external stakeholders. Stakeholders frequently bring forward new requirements or unexpected issues 
that require immediate attention. A developer’s ability to analyze problems from both a technical 
and a stakeholder perspective allows them to propose feasible, effective solutions that satisfy 
project goals and timelines. Strong problem-solving skills also help in identifying risks early 
and preparing strategies that can prevent potential issues.

Adaptability and flexibility are also crucial analytical skills, as external requirements and 
expectations can shift during a project. Developers who can adjust their approach, accommodate 
changes, and remain responsive to feedback demonstrate their commitment to meeting stakeholder 
needs. Flexibility also allows developers to pivot quickly when business goals shift, which is 
common in fast-paced projects or competitive industries.

Another key analytical skill is attention to detail. Meeting stakeholder expectations often hinges 
on precision in implementing specifications, adhering to agreed timelines, and catching potential 
issues before they escalate. Details matter, especially when working on features that directly 
impact the end-user experience or address specific business objectives. Developers who are 
detail-oriented can better ensure that the delivered solution aligns exactly with stakeholder 
expectations.

Finally, stakeholder management — which combines social and analytical skills — is necessary for 
balancing technical decisions with stakeholder priorities. Developers need to manage expectations 
effectively, providing realistic timelines, explaining the impacts of decisions, and clarifying 
dependencies. Good stakeholder management includes knowing when to negotiate and prioritize certain 
tasks based on the stakeholder’s strategic goals, while ensuring that technical standards and 
project quality are maintained.

## The team

Team dynamics and relationships play a crucial role in how a team functions. Teams that trust and 
respect one another are more likely to support each other and collaborate effectively. Conversely, 
conflicts or negative interactions can create a toxic environment that stalls progress. For example, 
a team where certain members dominate decision-making without considering others' input may struggle 
with morale and decreased motivation.

Diversity and inclusion within a team contribute to broader perspectives and better problem-solving 
capabilities. A development team that includes members from different backgrounds may approach a 
feature or problem in varied, innovative ways, leading to more comprehensive solutions. Without a 
commitment to inclusion, teams risk falling into 
[groupthink](https://www.psychologytoday.com/gb/basics/groupthink), where creativity and fresh 
ideas are stifled.

The skills and experience levels within a team can also significantly influence productivity and 
knowledge-sharing. A balanced team that includes junior, mid-level, and senior developers can 
foster mentorship and skill development. For example, senior developers can guide less experienced 
team members on best practices and architecture decisions. However, an imbalance where the team 
has too many juniors without enough guidance from seniors can lead to inefficiencies and technical 
debt.

Motivation and engagement are key to sustained productivity. Developers who are motivated often 
take ownership of their work and strive for high-quality output. A team working on a challenging 
and meaningful project, with clear goals and recognition from leadership, is more likely to stay 
engaged. On the other hand, a lack of engagement can result in minimal effort, higher error rates, 
and decreased output quality.

[Leadership](https://hbr.org/2024/04/6-common-leadership-styles-and-how-to-decide-which-to-use-when) 
and [management](https://asana.com/resources/management-styles) style have a profound effect on team 
performance. Leaders who empower their teams, encourage autonomy, and provide guidance contribute to 
a positive, high-functioning environment. For instance, a supportive project manager who listens to 
concerns and facilitates solutions can maintain team morale and productivity. On the contrary, 
micromanagement or an absence of leadership can lead to frustration and demotivation.

Maintaining a healthy work-life balance is essential to prevent burnout and ensure long-term 
productivity. When developers consistently face high stress and long hours, their output and 
morale suffer. Teams that foster a balance, such as offering flexible work hours or recognizing 
the importance of downtime, are more resilient and productive over time.

Clearly defined roles and responsibilities help team members understand their contributions to 
the project. Ambiguity can lead to task duplication or essential tasks being overlooked. For 
example, if two developers assume someone else is responsible for a critical feature, it may not 
be completed on time. Defining roles ensures everyone knows their focus areas, which streamlines 
work processes and minimizes conflicts.

Adaptability to change is another crucial factor in the fast-paced world of software development. 
Teams that embrace new tools, processes, or project shifts stay competitive and relevant. A team 
open to adopting an updated framework can often deliver projects more efficiently, while teams 
resistant to change may find themselves lagging behind. A well-known case of adaptability having
a positive effect on morale and productivity is provided by the 
[Hawthorne Effect](https://www.devpath.com/blog/the-hawthorne-effect) based on a series of 
experiments in an electrical factory in America in the 1920s.

A culture of feedback and continuous improvement is important for growth and maintaining high 
standards. Teams that regularly engage in constructive feedback, such as through code reviews or 
retrospective meetings, can identify areas for improvement and make necessary adjustments. For 
instance, feedback in a code review may highlight a more efficient algorithm, improving overall 
code quality. In contrast, a lack of feedback stifles development and leaves potential issues 
unaddressed.

Problem-solving and decision-making approaches also affect a team’s progress. Teams that 
collaborate openly and consider diverse ideas often reach better solutions faster. For example, 
a team brainstorming session that includes developers, testers, and product managers can result 
in a more robust feature design. However, if decision-making is overly centralized with just a 
few individuals, it can delay progress and reduce team engagement.

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Tips for working with external stakeholders](human_factors_tips)

## Further reading

* [Stephens, 2022, Ch. 3](https://learning.oreilly.com/library/view/beginning-software-engineering/9781119901709/c03.xhtml#please-read)
* [Stephens, 2022, Ch. 4](https://learning.oreilly.com/library/view/beginning-software-engineering/9781119901709/c04.xhtml)
* [Rehman et al., 2019](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/n96pef/alma9923909970902111)
* [Interpersonal Skills: What Developers Need to Know (& How to Improve)](https://arc.dev/talent-blog/interpersonal-skills/)

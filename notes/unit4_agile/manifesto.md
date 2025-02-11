---
title: Agile Manifesto
parent: Agile
has_children: true
has_toc: false
nav_order: 1
---

# Overview and the Agile Manifesto

Structured method have been criticised for not having a way to manage the unexpected or the 
uncertain. Additionally, from a management point of view, once the design and the timescale have 
been agreed, legal and commercial interests come into play that place huge constraints on the 
development team. To a certain extent, the rigid structure of the waterfall model was the result 
of a misinterpretation of [Royce's original paper](https://dl.acm.org/doi/10.5555/41765.41801). It was an oversimplification that
downplayed the challenge of creating a comprehensive design in advance of any development work. 

The need for a more nuanced approach to the management of software development was recognised by
many pioneering figures from the 1980s onwards. Several methodologies were proposed that were based
on the principles of iterative prototype building and incremental refinement of requirements. Some
notable examples are RAD ([Martin, 1991](https://en.wikipedia.org/wiki/Rapid_application_development))
and Dynamic Systems Development Method (DSDM) reviewed by 
Millington and Stapleton ([1995](https://doi.org/10.1109/52.406757)).

The final move to a dynamic approach that prioritised the incremental nature of software development
occurred in 2001 with the publication of the 
[Manifesto for Agile Software Development](https://agilemanifesto.org/). It marked a major 
[paradigm shift](https://en.wikipedia.org/wiki/Paradigm_shift) and Agile has become the preferred 
approach to software development projects for many companies. According to
[some sources](https://www.simform.com/blog/state-of-agile-adoption/), up to 94% of companies
practice agile to some extent, although only 52% use Agile for the majority of projects. 

## Agile values

The [Manifesto for Agile Software Development](https://agilemanifesto.org/) outlines four key value 
statements that guide Agile software development. Each value highlights a shift in focus from 
traditional methodologies toward a more flexible, people-centered approach.

**Individuals and Interactions over Processes and Tools**

> Agile prioritises human collaboration and communication as the driving forces of success. While 
> processes and tools are important, it's the ability of team members to work together effectively 
> that ultimately leads to high-quality outcomes. Emphasising collaboration ensures teams can 
> quickly resolve problems, adapt to change, and innovate.

**Working Software over Comprehensive Documentation**

> Agile focuses on delivering functional software that meets user needs, rather than creating 
> exhaustive documentation that may not add immediate value. While documentation has its place, 
> the primary goal is to build software that works, and Agile ensures that the product is always 
> prioritised over paperwork.

**Customer Collaboration over Contract Negotiation**

> Agile fosters close collaboration with customers throughout the development process, ensuring 
> their feedback shapes the product. Rather than relying solely on predefined contracts or rigid 
> agreements, Agile encourages ongoing dialogue with customers to adjust and adapt the product to 
> meet their evolving requirements. This leads to better customer satisfaction and more relevant 
> software solutions.

**Responding to Change over Following a Plan**

> Agile embraces the reality that requirements and priorities can shift throughout a project. 
> Rather than sticking rigidly to a predetermined plan, Agile teams are empowered to adapt to new 
> information and changing circumstances. This flexibility allows them to deliver the most value 
> to customers, even if it means changing course mid-project.

{: .warning-title }
> <i class="fa-solid fa-exclamation-triangle"></i> Warning!
> 
> Do not misinterpret these values! They do not imply that you can forget about planning entirely
> or that standardised processes are not important. Adapting to change does not mean that you should
> be a continual victim of events. Agile is not the absence of rules - it is simply better rules.
> The most common mistakes when attempting to apply an Agile approach are:
> 
> * Ignoring processes, tools, or documentation entirely
> * Failing to empower teams to make decisions and collaborate effectively
> * Delivering incomplete or low-quality software in the name of speed
> * Allowing customer demands to cause scope creep or lose focus
> * Abandoning planning or overreacting to change without a balanced, thoughtful approach

## Agile principles

On their own, the four values are not detailed enough to act as a framework for development. The
Manifesto develops them as the 12 principle listed below, and named methodologies such as Scrum
refine them even further into usable processes.

<details markdown=1 class="blue-bar">
<summary>1. Our highest priority is to satisfy the customer through early and continuous delivery of 
valuable software.</summary>

<p>
In a collaborative software development project, customer satisfaction drives the process. This 
principle emphasises the importance of delivering functional pieces of software early and frequently. 
By doing so, teams can gather feedback from stakeholders throughout the project, ensuring that the 
software remains aligned with customer needs and business objectives. Instead of waiting until the 
end of the project for delivery, each iteration produces a tangible, valuable result, increasing 
stakeholder confidence and reducing the risk of misalignment between expectations and the final 
product.
</p>
</details>

<details markdown=1 class="blue-bar">
<summary>2. Welcome changing requirements, even late in development. Agile processes harness 
change for the customer’s competitive advantage.</summary>

<p>
Collaborative teams recognise that requirements often evolve as stakeholders gain a deeper 
understanding of the project’s goals or as market conditions change. This principle encourages 
flexibility, allowing the team to adapt even during later stages of development. By welcoming 
change rather than resisting it, the team can deliver software that provides a competitive edge. 
In this context, team members work closely with stakeholders, regularly reviewing requirements to 
ensure the final product meets the evolving needs of the business or customer, rather than sticking 
rigidly to an outdated specification.
</p>
</details>

<details markdown=1 class="blue-bar">
<summary>3. Deliver working software frequently, with a preference for shorter timescales.</summary>

<p>
Collaborative software development thrives on frequent, iterative deliveries that demonstrate 
progress to stakeholders. Short timescales, typically within a few weeks, allow the team to focus 
on completing small, manageable increments of the product. Each delivery of working software fosters 
a sense of accomplishment, keeps the project moving forward, and provides regular opportunities for 
feedback. This continuous delivery process builds trust with the customer, as they can see tangible 
results and offer input early and often, reducing the risk of surprises at the end of the project.
</p>
</details>

<details markdown=1 class="blue-bar">
<summary>4. Business people and developers must work together daily throughout the project.</summary>

<p>
In collaborative environments, close cooperation between business stakeholders and the development 
team is crucial to ensuring that the project remains aligned with the business goals. Daily 
interactions help resolve misunderstandings quickly, clarify requirements, and prioritise work 
effectively. Whether it’s through stand-up meetings, workshops, or informal discussions, these 
frequent touchpoints help to bridge the gap between technical implementation and business objectives. 
This principle emphasises that collaboration between both sides leads to a more informed, responsive, 
and adaptive development process, ultimately delivering more value.
</p>
</details>

<details markdown=1 class="blue-bar">
<summary>5. Build projects around motivated individuals. Give them the environment and support they 
need, and trust them to get the job done.</summary>

<p>
Successful collaborative projects rely on teams of motivated, self-organising individuals who are 
given the autonomy to make decisions and take ownership of their work. This principle highlights the 
importance of trust and empowerment within the team. When developers, testers, and designers feel 
trusted and supported, they are more engaged and productive. Providing an environment that fosters 
creativity, accountability, and problem-solving ensures that the team is equipped to overcome 
challenges and deliver high-quality software. The team’s motivation directly influences the success 
of the project.
</p>
</details>

<details markdown=1 class="blue-bar">
<summary>6. The most efficient and effective method of conveying information to and within a 
development team is face-to-face conversation.</summary>

<p>
Direct, face-to-face communication fosters collaboration and quick decision-making in software 
development projects. While tools like email or documentation have their place, in-person 
conversations (or video calls in remote settings) are the most effective way to resolve issues, 
clarify misunderstandings, and share ideas. Face-to-face communication allows team members to 
quickly ask questions, discuss solutions, and gain immediate feedback, reducing the potential 
for delays or miscommunication. In a collaborative project, this method accelerates the flow of 
information and enables teams to stay aligned.
</p>
</details>

<details markdown=1 class="blue-bar">
<summary>7. Working software is the primary measure of progress.</summary>

<p>
In Agile, the focus is on delivering functional software, not on the volume of documentation or 
the completion of tasks. In a collaborative project, this principle helps ensure that the team 
remains aligned on what matters most: producing software that works and delivers value. Regularly 
delivering working software provides a tangible measure of progress that stakeholders can review 
and test. This approach keeps the project moving forward, as the team can continuously refine and 
improve the product based on real feedback rather than theoretical completion markers.
</p>
</details>

<details markdown=1 class="blue-bar">
<summary>8. Agile processes promote sustainable development. The sponsors, developers, and users 
should be able to maintain a constant pace indefinitely.</summary>

<p>
Collaborative teams strive for a steady, manageable pace throughout the project to avoid burnout 
and maintain productivity over the long term. Sustainable development means setting realistic goals 
and avoiding periods of intense work followed by downtime. In a team environment, this constant 
pace ensures that all members, including sponsors and end users, can stay engaged and contribute 
consistently. This approach leads to higher-quality work and a more enjoyable work environment, 
which ultimately improves the team’s effectiveness and the project’s outcome.
</p>
</details>

<details markdown=1 class="blue-bar">
<summary>9. Continuous attention to technical excellence and good design enhances agility.</summary>

<p>
Technical excellence and strong design practices form the foundation for an Agile project’s 
flexibility. In a collaborative environment, team members focus on writing clean, maintainable 
code and designing robust systems that can adapt to changes. This principle emphasises that 
high-quality engineering is essential for remaining responsive to new requirements or shifts 
in direction. By focusing on technical excellence, the team ensures that the software is scalable, 
easier to modify, and less prone to bugs, which supports the Agile goal of quick iteration and 
adaptation.
</p>
</details>

<details markdown=1 class="blue-bar">
<summary>10. Simplicity — the art of maximising the amount of work not done — is essential.</summary>

<p>
Agile promotes simplicity, encouraging teams to focus on doing only what is necessary to deliver 
value. In collaborative software development, this means avoiding unnecessary complexity or 
features that don’t directly contribute to the project’s goals. Teams must prioritise the most 
important tasks and eliminate waste. By focusing on simplicity, the team can deliver value faster, 
reduce the risk of overengineering, and create a product that is easier to maintain and scale. 
This principle ensures that the team remains focused and efficient.
</p>
</details>

<details markdown=1 class="blue-bar">
<summary>11. The best architectures, requirements, and designs emerge from self-organising teams.
</summary>

<p>
Self-organising teams have the autonomy to decide how best to approach their work, which leads to 
better problem-solving and innovation. In collaborative projects, this principle empowers team 
members to take ownership of architecture, design, and implementation decisions. By encouraging 
collaboration and trust within the team, Agile creates an environment where the best ideas can 
come from anyone, not just senior leaders. This autonomy allows the team to respond quickly to 
changes and find creative solutions that fit the project’s unique challenges.
</p>
</details>

<details markdown=1 class="blue-bar">
<summary>12. At regular intervals, the team reflects on how to become more effective, then tunes 
and adjusts its behaviour accordingly.</summary>

<p>
Agile values continuous improvement through regular reflection. In collaborative projects, teams 
hold retrospectives at the end of each iteration to assess what worked well and what didn’t. This 
practice encourages transparency and open communication, allowing the team to learn from their 
experiences and improve processes for the next iteration. By consistently reflecting and adjusting, 
the team becomes more efficient, productive, and cohesive over time, leading to better outcomes 
and a more effective development process. This principle reinforces the idea that no project is 
ever static—there’s always room for growth.
</p>
</details>



{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Practical tips for getting started with Agile](manifesto_tips)

## Further reading

* Software Project Management ([O'Regen, 2022, Ch. 4](https://link-springer-com.napier.idm.oclc.org/chapter/10.1007/978-3-031-07816-3_4))
* Manifesto for Agile Software Development ([Beck et al., 2001](https://agilemanifesto.org/))
* Developing information for users in an agile environment ([ISO/IEC/IEEE 26515](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/19n0mho/cdi_ieee_standards_0b0000648897745a))

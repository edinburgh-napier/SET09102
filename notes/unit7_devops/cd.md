---
title: Continuous Delivery/Deployment
parent: DevOps
has_children: true
has_toc: false
nav_order: 3
---

# The D in CI/CD

The abbreviation _CD_ stands for continuous delivery (CD) or continuous deployment (CD) depending on the
goals and practices of a particular team or organisation. _Continuous delivery_ extends continuous 
integration (CI) by automating the process up to the point of release, ensuring that the code is always 
in a deployable state. However, deployment to production still requires manual approval. Continuous 
_deployment_ goes a step further, fully automating the release process so that every code change 
that passes the CI/CD pipeline is deployed directly to production without any manual intervention.

Continuous deployment offers numerous advantages, particularly for teams seeking to release software 
updates frequently and minimise delays between development and production. One of the primary advantages 
is the acceleration of the development lifecycle, as every code change that passes automated tests and 
validations is deployed immediately to production without manual intervention. This enables teams to 
release new features, bug fixes, and improvements faster, making them more responsive to user feedback 
and market demands. Continuous deployment also promotes a robust, well-tested codebase because the 
pipeline enforces strict automated testing at every stage, helping to ensure code quality remains high. 
By reducing manual steps, continuous deployment decreases the risk of human error, leading to a more 
efficient, reliable release process.

However, continuous deployment also has its disadvantages. The process demands a high level of discipline, 
automation, and testing coverage, as any oversight in testing could result in flawed code reaching 
end users. It requires substantial effort to set up and maintain automated tests, static analysis, and 
other quality checks, particularly as codebases grow and become more complex. Teams must invest time and 
resources into robust test automation and staging environments that accurately replicate production 
conditions. Additionally, continuous deployment may not be suitable for all industries, particularly 
those with strict regulatory requirements, as the automated deployment of updates may conflict with the 
need for audit trails and formal approvals.

The risks associated with continuous deployment largely centre around the potential for undetected 
issues to reach users quickly. Since changes are deployed automatically, there is little room to catch 
last-minute bugs or perform manual reviews before the code goes live. An inadequate test suite or lack of 
comprehensive environment simulation can result in breaking changes, downtime, or negative user 
experiences. Continuous deployment also requires effective rollback strategies and monitoring systems 
to handle issues immediately if they occur in production. Without these safeguards, teams could face 
disruptions or damage to the application’s reputation.

Overall, while continuous deployment offers significant benefits for agile, iterative development, it 
requires rigorous testing, monitoring, and rollback capabilities to manage the associated risks. Teams 
adopting continuous deployment must weigh these considerations carefully, ensuring they have the necessary 
infrastructure and processes in place to support reliable, high-quality releases.

## Case studies

[Savor et al, 2016](http://dx.doi.org/10.1145/2889160.2889223) document early experiences with 
continuous deployment at Facebook and [OANDA](https://www.oanda.com/uk-en/), a currency trading platform. 
They find similar experiences at both companies.

{: .information-title }
> <i class="fa-solid fa-circle-info"></i> Case study: Facebook
> 
> Facebook implemented continuous deployment by establishing an infrastructure that allowed developers to 
> push code changes directly to production multiple times a day. The process was highly automated, 
> incorporating extensive automated testing, real-time monitoring, and deployment tools that enabled 
> developers to release incremental updates rapidly. Facebook focused on building a strong foundation of 
> internal tools that streamlined code integration, testing, and deployment. They relied on automated 
> checks and a robust system of quality gates to ensure that only stable, reliable code went live. 
> Developers were also empowered to take ownership of their code changes, and the organisation fostered 
> a culture of accountability and rapid iteration.
>
> The challenges Facebook encountered with continuous deployment were largely organisational and cultural, 
> as well as technical. As the engineering team grew and the codebase became more complex, maintaining a 
> consistent deployment process across all teams and services proved challenging. Continuous deployment 
> demanded significant investment in automation, as manual processes could not scale with the speed and 
> volume of deployments. Additionally, Facebook needed comprehensive monitoring and rollback capabilities 
> to quickly identify and mitigate issues in production, given the frequency of code changes. Cultural 
> shifts were also necessary; developers had to adjust to greater autonomy and responsibility for ensuring 
> their code met production standards, which required a high degree of trust and a collaborative environment.

{: .information-title }
> <i class="fa-solid fa-circle-info"></i> Case study: OANDA
> 
> OANDA implemented continuous deployment by adopting a system that allowed for frequent, automated 
> releases of code updates, tailored to the specific requirements of its financial trading platform. 
> Given the mission-critical nature of OANDA’s services, where reliability and precision are paramount, 
> the company had to carefully balance the speed of deployment with rigorous quality controls. OANDA 
> integrated continuous deployment with strong automated testing, comprehensive monitoring, and a strict 
> staging environment where new code was thoroughly vetted before production release. This process enabled 
> OANDA to push small, incremental updates frequently, thereby maintaining agility while minimising 
> disruption to its trading services.
>
> The challenges OANDA encountered in implementing continuous deployment were unique to its industry’s 
> regulatory and operational demands. Unlike other fields, financial software requires absolute accuracy 
> and high fault tolerance, as even minor errors can lead to significant financial losses or regulatory 
> penalties. OANDA had to overcome the challenge of building a robust testing framework that could reliably 
> catch potential issues before they impacted customers. Furthermore, the company needed to maintain trust 
> with stakeholders by proving that rapid deployment would not compromise the platform’s stability or 
> security. Implementing continuous deployment at OANDA required an ongoing commitment to automation, 
> careful monitoring, and cultural adaptation to ensure that both speed and quality could be achieved in 
> a high-stakes environment.

Despite increases in engineering team size and code complexity, continuous deployment did not hinder 
productivity or quality at Facebook. At OANDA, similar practices were observed, with adjustments due to 
the mission-critical nature of financial trading software. Key benefits of continuous deployment include 
improved developer productivity, faster release cycles, and enhanced quality through frequent testing and 
rapid feedback. Challenges noted include the need for strong management support, a robust automated 
testing and monitoring system, and significant cultural adjustments to decentralise decision-making. 
Both Facebook and OANDA observed that continuous deployment requires cohesive, small teams, modular code 
design, and customised internal tools for effective deployment and monitoring.


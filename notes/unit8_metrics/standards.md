---
title: Quality Standards
parent: Metrics
has_children: true
has_toc: false
nav_order: 1
---

# Software Quality Standards

[ISO 25000](https://iso25000.com/index.php/en/iso-25000-standards), also known as the Systems and Software Quality Requirements and Evaluation (SQuaRE) standard, 
provides a comprehensive framework for evaluating and improving the quality of software and systems throughout 
their lifecycle. Designed to support developers, quality assurance teams, and stakeholders, ISO 25000 organises 
quality into measurable characteristics — such as functionality, performance, security, and maintainability — 
that align with both technical standards and end-user needs. This standard enables organisations to set clear 
quality objectives, establish metrics, and conduct systematic assessments, ensuring that their software meets 
consistent and high-quality benchmarks. By adopting ISO 25000, teams can benefit from a standardised approach 
to defining and evaluating software quality, which helps maintain quality assurance rigour and supports informed 
decision-making throughout development and maintenance. The relationships between quality measures defined in
ISO25000 are illustrated in Fig. 1.

![Fig. 1: Relationship between types of quality measures (<a href="https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/19n0mho/cdi_bsi_primary_000000000030280200">ISO 25023</a>](images/iso25023_quality.png){: standalone #fig1 data-title="Relationship between types of quality measures" }

ISO 25000 can provide a structured, standardised approach to defining, measuring, and evaluating software 
quality. By implementing the ISO 25000 framework, teams can ensure that quality objectives are set clearly from 
the outset, aligning software characteristics like functionality, performance, security, and usability with 
stakeholder expectations. These quality characteristics are then broken down into measurable metrics, allowing 
the team to track progress and address any quality shortfalls early in the development process. Regular 
assessments based on these metrics create a feedback loop that supports continuous improvement and transparency, 
helping the team identify and resolve potential issues before they impact the final product. Moreover, 
ISO 25000 encourages consistency in quality practices across team members and projects, reducing variability 
and strengthening collaboration. By fostering a quality-centric culture with shared standards, ISO 25000 helps 
the development team maintain rigorous quality assurance, ensuring the product meets both internal standards 
and external regulatory requirements, ultimately delivering a more reliable, maintainable, and user-friendly 
software solution.


ISO 25000 provides guidelines for software quality but does not have a specific certification scheme. Therefore, 
organisations cannot obtain a formal ISO 25000 certification. However, they can align their processes with 
ISO 25000 standards to enhance software quality. Aligning a company's software development processes with 
ISO 25000 guidelines and obtaining certifications like [ISO 9001](https://youtu.be/O5T4H8K_rwQ?si=P7L6EWWb-rYlTpYH) 
or [ISO 27001](https://youtu.be/jPA6gbsT2IQ?si=lmOQ4EB6Ubkb8Q5A) can demonstrate a commitment to high-quality 
software development practices.

In addition to international standards, several widely recognised frameworks exist for measuring and ensuring 
quality in software development projects. These frameworks - illustrated in the list below - help guide best 
practices, provide process improvements, and establish measurable benchmarks for software quality.

* **CMMI (Capability Maturity Model Integration)**: Developed by the Software Engineering Institute, 
  [CMMI](https://cmmiinstitute.com/) is a process improvement framework that provides structured levels of 
  maturity for an organisation’s development processes. CMMI defines practices for quality management, 
  process optimisation, and risk management across five maturity levels, encouraging continuous improvement. 
  CMMI is particularly useful for larger organisations seeking to standardise practices across projects and 
  teams.

* **Six Sigma**: [Six Sigma](https://www.geeksforgeeks.org/six-sigma-in-software-engineering/) is a 
  data-driven approach aimed at reducing defects and improving quality by identifying and eliminating 
  variability in processes. Though not specific to software, Six Sigma can be adapted for software 
  development by focusing on measurable quality improvements and error reduction. The DMAIC (Define, 
  Measure, Analyse, Improve, Control) methodology within Six Sigma can be used to improve code quality, 
  reduce bugs, and optimise testing practices.

* **ITIL (Information Technology Infrastructure Library)**: [ITIL](https://www.axelos.com/certifications/itil-service-management/what-is-it-service-management) 
  is a framework for IT service management that provides guidance on delivering and managing high-quality IT 
  services, including software products. ITIL is particularly useful for software projects that include service 
  management aspects, as it outlines best practices for ensuring the availability, reliability, and scalability 
  of software systems, especially in operations and post-deployment support.

* **SPICE (Software Process Improvement and Capability Determination)**: Originally built on ISO/IEC 15504
  which has now been superseded by [ISO 33001](https://en.wikipedia.org/wiki/ISO/IEC_33001), SPICE is a 
  framework that assesses the capability of software development processes. SPICE focuses on the maturity and 
  performance of processes across various domains like project management, development, and quality assurance. 
  Organisations use SPICE to benchmark and improve their processes, making it particularly valuable for 
  organisations that want to refine their development workflows and achieve consistent quality.

* **Lean Software Development**: Inspired by lean manufacturing principles, 
  [Lean Software Development](https://www.geeksforgeeks.org/lean-software-development-lsd/) focuses on 
  maximising value by eliminating waste, reducing inefficiencies, and streamlining processes. Lean practices, 
  such as continuous integration, rapid feedback, and iterative improvement, help software teams deliver 
  high-quality software with reduced lead times. Lean’s emphasis on simplicity and responsiveness makes it 
  suitable for projects with rapidly changing requirements.

* **Agile Frameworks**: Frameworks like Scrum, Kanban, and Extreme Programming (XP) fall under Agile 
  methodologies and focus on iterative development, customer collaboration, and flexibility. Agile 
  frameworks are highly effective for ensuring software quality, as they promote regular testing, continuous 
  feedback, and incremental delivery. Quality is maintained through short development cycles, or sprints, 
  where developers test and refine the product, ensuring each release meets the defined quality standards.

* **Automotive SPICE (ASPICE)**: A variation of SPICE, [Automotive SPICE](https://vda-qmc.de/en/automotive-spice/) 
  is tailored specifically for software development in the automotive industry. It is widely used by 
  automotive companies to assess the quality and maturity of software processes, particularly for 
  safety-critical and embedded systems. ASPICE provides a structured approach to assessing quality in highly 
  regulated environments, ensuring compliance with strict automotive standards.

* **TMMi (Test Maturity Model Integration)**: [TMMi](https://www.tmmi.org/) is a framework focused 
  specifically on testing maturity. It provides guidelines for developing high-quality testing processes, 
  with five levels of maturity that organisations can progress through. TMMi is particularly valuable for 
  organisations aiming to improve the reliability of their testing practices, making it ideal for projects 
  that prioritise rigorous testing and defect reduction.

Each of these frameworks provides a unique approach to quality, emphasising different aspects of the 
development lifecycle, such as process maturity (CMMI, SPICE), operational efficiency (Lean, ITIL), 
flexibility (Agile), or testing rigor (TMMi). By selecting and implementing the most appropriate framework, 
organisations can improve quality systematically, ensure robust processes, and adapt to the specific needs 
of their projects and industries.

## Code weaknesses

Building on the CWE database, the [Object Management Group (OMG)](https://www.omg.org/)
has created a standard for automatic identification of code weaknesses based on
measures that can be taken from static code analysis. The standard has been adopted by
the ISO as [ISO 5055](https://www.it-cisq.org/standards/code-quality-standards/). The
standard is used by tools that check code automatically and alert the developer as
they go along. Such tools treat the number of occurrences of weakness patterns as
*metrics* whose value is an indication of code quality. A metric is simply something that
can be measured, and some metrics are more useful than others. For example, a very easy
metric often used in software development projects is the number of lines of  code, or
more often, thousands of lines of code (KLOC). However, Bill Gates once commented that

> Measuring programming progress by lines of code is like measuring aircraft building
> progress by weight
>
> [Stephens, 2022, Ch. 15](https://learning.oreilly.com/library/view/beginning-software-engineering/9781119901709/c15.xhtml)

The metrics that you use in any situation have to be genuinely meaningful.
Stephens provides the following criteria for choosing a good metric (which with some small
reordering abbreviates to MORSE):

> **Simple**: The easier the attribute is to understand, the better.
>
> **Measurable**: For the attribute to be useful, you must measure it.
>
> **Relevant**: If an attribute doesn't lead to a useful indicator, there's no point
> measuring it.
>
> **Objective**: It's easier to get meaningful results from objective data than from
> subjective opinions. The number of bugs is objective. The application's “warmth and
> coziness” is not.
>
> **Easily obtainable**: You don't want to realize the team members’ fears by making them
> spend so much time gathering tracking data that they can't work on the actual project.
> Gathering attribute data should not be a huge burden.
>
> [Stephens, 2022, Ch. 15](https://learning.oreilly.com/library/view/beginning-software-engineering/9781119901709/c15.xhtml)

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Tips for working with quality standards](standards_tips)

## Further reading

* Trends and Findings in Measuring Software Quality Metrics in the Industry
  [Falco & Rabiolo, 2022](https://doi.org/10.1109/ARGENCON55245.2022.9939935)

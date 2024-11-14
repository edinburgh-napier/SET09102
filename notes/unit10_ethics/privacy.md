---
title: Privacy
parent: Ethics
has_children: true
has_toc: false
nav_order: 3
---


# Privacy 

Privacy is a key area of ethical concern in software design. In the UK, the 
[Data Protection Act 2018](https://www.gov.uk/data-protection) (DPA) 
is the legislation that governs the protection of personal data. It is the UK's implementation of the 
General Data Protection Regulation (GDPR). The UK GDPR is the UK's version of the EU GDPR after Brexit. 
It provides a comprehensive legal framework for data privacy and enforcing the rights of 
individuals over their personal information. The Act outlines rules and principles that organisations must 
follow when collecting, storing, and processing personal data, ensuring that data handling is fair, lawful, 
and transparent.

The DPA also establishes roles for data controllers (those who determine the purpose of data processing) 
and data processors (those who process data on behalf of controllers), holding both accountable for ensuring 
data protection compliance. For serious breaches, the Act allows the 
[Information Commissioner’s Office](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/) (ICO) 
to issue significant fines. The DPA 2018 reinforces the UK’s commitment to data privacy and provides a robust 
structure to protect personal information in an increasingly digital world.

{: .information-title }
> <i class="fa-solid fa-circle-info"></i> DPA Principles
>
> The Data Protection Act 2018 (DPA 2018) in the UK has six data protection principles that organisations, 
> businesses, and the government must follow when using personal data: 
> 
> * **Lawfulness, fairness, and transparency**: Personal data must be used in a way that is lawful, fair, 
>   and transparent. 
> 
> * **Purpose limitation**: The purpose for which personal data is collected must be specified, explicit, 
>   and legitimate. 
> 
> * **Data minimisation**: Personal data must be adequate, relevant, and not excessive in relation to the 
>   purpose for which it is processed. 
> 
> * **Accuracy**: Personal data must be accurate and, where necessary, kept up to date. 
> 
> * **Storage limitation**: Personal data must be kept for no longer than is necessary for the purpose 
>   for which it is processed. 
> 
> * **Integrity and confidentiality**: Personal data must be handled in a way that ensures appropriate 
>   security, including protection against unlawful or unauthorised processing, access, loss, destruction, 
>   or damage. 

## Legal responsibilities for software engineers

The DPA has a significant impact on the day-to-day work of software engineers, as it requires them to 
build privacy and data protection into every stage of software development. One of the primary impacts is 
the need for data minimisation, where engineers must ensure that applications collect only the necessary 
personal data for a specific purpose. Engineers must carefully consider the types of data being collected, 
stored, and processed, avoiding any excess data that is not essential to the core functionality of the 
application.

Another critical area influenced by the DPA is data security which requires organisations to obtain 
explicit consent before processing sensitive data. Engineers must incorporate robust 
security measures to protect users' personal information from unauthorised access, breaches, or misuse. 
This includes implementing encryption, access controls, and secure data storage practices. Regular 
security testing, vulnerability assessments, and code reviews are also necessary to identify and address 
potential security risks, as the DPA mandates that organisations protect personal data to minimise the 
risk of exposure.

The DPA also enforces user rights such as the right to access, correct, and delete personal data. 
Software engineers are responsible for designing systems that allow users to exercise these rights easily. 
For instance, engineers might need to implement functionalities that enable users to view or delete their 
information and update inaccuracies in their profiles. Additionally, the Act requires engineers to 
implement mechanisms for users to withdraw consent to data collection, making it possible to stop data 
processing upon request.

Transparency is another key principle, requiring engineers to ensure that users are informed about what 
personal data is collected, why it is collected, and how it will be used. Engineers must design user 
interfaces that clearly communicate privacy policies, consent options, and data usage terms. This might 
involve building notifications, pop-ups, or checkboxes to secure user consent and keep users informed.

Finally, third-party data sharing is regulated by the DPA, meaning engineers must carefully consider the 
data shared with external services, such as analytics platforms or third-party APIs. They must ensure 
that these third parties also comply with DPA standards and restrict data sharing to only necessary, 
secure partners. Managing third-party integrations and monitoring data flows becomes an essential part 
of compliance, as engineers must prevent unnecessary or insecure sharing of personal information.

## Essential DPA Functionalities in Software

Compliance with the DPA requires specific software functionalities, though these are part of a larger 
compliance framework that includes organisational processes and documentation.

### Right to Be Forgotten

The "right to erasure" allows users to request deletion of their personal data, though this right is 
limited in cases like contractual obligations (e.g., outstanding loans). In practice, engineers may 
implement this by marking user data for deletion or anonymising it to remove any identifying information. 
Foreign key dependencies may complicate this process, so strategies like nullification or cascading 
deletion are often used, depending on the application’s data model. Data deletion does not need to be 
immediate; it can be scheduled in batch jobs.

### Restricting Data Processing

Users can also request to restrict the processing of their data without requiring deletion. Engineers 
may use a database flag to mark a profile as restricted, ensuring that restricted users are excluded 
from processing activities such as marketing or analysis. Restrictions should also apply to third-party 
systems, ensuring full compliance across all connected services.

### Data Portability

The DPA 2018 gives users the right to export their personal data in a machine-readable format (e.g., 
JSON, XML, CSV) to facilitate data portability. This may involve setting up background jobs to prepare 
the export and notify users when their data is ready for download. Manual data exports can meet this 
requirement, but automated exports reduce errors and make the process more efficient.

### Consent Management

Under the DPA 2018, clear and specific user consent is required for each type of data processing. 
Checkboxes must not be pre-checked, and users must be able to easily view and manage their consents. 
Engineers should develop consent management interfaces and securely store consent records with timestamps. 
If pre-existing consents do not meet DPA 2018 standards, re-consent may be required via email 
notifications that prompt users to confirm their consent preferences.

### Age Verification

For data subjects under 16, parental consent is required under the DPA 2018. Verification methods are 
not fully standardised, so engineers may use options such as parental email confirmation, micro-charges 
to a credit card, or verification through state-issued electronic identification, depending on regional 
guidelines.

## Legal requirements are the minimum

Beyond legal requirements, software engineers have an ethical responsibility to consider aspects of 
privacy that enhance user trust, protect personal autonomy, and promote transparent interactions with 
technology. One key area is user-centric privacy design, where engineers aim to create features that not 
only comply with regulations but also respect users’ personal boundaries and preferences. This might 
involve designing intuitive privacy settings that allow users to control their data with ease, offering 
flexibility around data sharing, and simplifying complex privacy options so users can make informed 
choices effortlessly.

Engineers should also think about data minimisation in terms of ethical impact — not just collecting 
minimal data for legal compliance, but truly evaluating whether each data point collected is necessary 
or adds meaningful value to the user experience. This mindset encourages a “less is more” approach to 
data, recognising that even non-legally sensitive data, if mishandled, can affect user trust and autonomy. 
By designing applications with a strong commitment to data minimisation, engineers can create systems that 
avoid unnecessary data collection and storage, reducing potential risks even further.

Another critical consideration is protecting users from unintended consequences of data processing. Certain 
user data, if combined with other data sources, can reveal sensitive patterns or behaviours that were not 
intended to be disclosed. For example, location data combined with timestamp information could reveal users’ 
routines or predict where they might be at specific times. Engineers need to think proactively about how 
data could be used or misused in ways that go beyond initial application use cases, ensuring that design 
choices minimise these risks and protect user privacy in practice.

Transparency and ethical clarity in the user interface are also important. While the legal minimum requires 
that users be informed about data practices, engineers can go further by designing interfaces that openly 
explain why data is needed, how it benefits users, and what alternatives they have. This approach fosters 
trust by offering an honest rationale for data collection and use, empowering users with real insight and 
choice rather than only meeting minimum disclosure standards.

Finally, software engineers should consider building privacy-respecting defaults. Instead of requiring 
users to opt out of data sharing or adjust privacy settings themselves, engineers can create applications 
with privacy-focused defaults that align with ethical standards. For example, instead of collecting 
extensive usage data by default, an application could operate in a minimal data mode unless the user 
actively opts in to additional tracking. This approach respects user privacy from the outset and avoids 
placing the burden on users to understand and navigate complex settings to protect their information.

By prioritising these additional privacy considerations, software engineers not only enhance the overall 
user experience but also contribute to a culture of ethical software development, where user privacy is 
treated as a core principle rather than just a legal requirement. This proactive, user-first approach to 
privacy can foster lasting trust and set a high standard for responsible data use in technology.


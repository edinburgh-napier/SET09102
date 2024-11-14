---
title: Security Tips
parent: Security
has_children: false
nav_exclude: true
nav_order: 1
---

# Practical tips for adopting strong security practices

1. Prioritise the CIA Triad

    > Confidentiality, Integrity, and Availability are foundational principles in security. Ensure that 
    > sensitive data is only accessible to authorised users, protect data accuracy, and guarantee 
    > availability of services to legitimate users. For example, encrypt sensitive data to maintain 
    > confidentiality and validate input to protect data integrity.

2. Implement Input Validation

    > Input validation is crucial in preventing common attacks like SQL injection and cross-site 
    > scripting. Always validate and sanitise data from external sources to prevent malicious data from 
    > exploiting vulnerabilities. Avoid the assumption that user input will be benign.

3. Use Secure APIs and Avoid API Abuse

    > When integrating APIs, be aware of the security promises they make. Avoid insecure APIs, and limit 
    > API permissions to what is strictly necessary. Poorly managed APIs can become entry points for attackers.

4. Manage State and Time Dependence Carefully

    > In event-driven or asynchronous systems, sequence of actions can vary, leading to vulnerabilities. 
    > Test systems under different timing conditions to anticipate potential issues and implement state 
    > management where needed.

5. Keep Error Messages Generic

    > Revealing too much information in error messages can provide attackers with insights into system 
    > vulnerabilities. Provide only necessary error information to users and log detailed error 
    > information securely for debugging purposes.

6. Regularly Review Code Quality

    > Poor code quality can introduce security vulnerabilities. Avoid "code smells" by keeping code 
    > readable, consistent, and maintainable. Conduct regular code reviews and use static analysis tools 
    > to detect potential weaknesses.

7. Encapsulate Sensitive Data

    > Implement strict access controls around sensitive data and areas of the system. For example, 
    > restrict access to certain directories in a web application to prevent unauthorised access.

8. Familiarise Yourself with Common Vulnerabilities

    > Stay updated on the Common Weakness Enumeration (CWE) and other resources that list frequent 
    > vulnerabilities. Knowing the top vulnerabilities can help you proactively address these issues in 
    > your code.

9. Conduct Security Testing

    > Regularly test your application with security in mind. Use automated tools for static and dynamic 
    > analysis and conduct penetration testing to identify potential vulnerabilities.

10. Integrate Security into Agile Workflows

    > Make security an ongoing part of your development process by addressing security in each sprint. 
    > This continuous focus helps you identify and resolve security issues as you build.

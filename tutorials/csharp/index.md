---
title: C# practice
parent: Tutorials
nav_order: 1
---

# C# Tutorials

<hr class="splash">

![Dennis Ritchie](../../images/people/dennis_richie.png)

<blockquote class="pretty"><span>
The only way to learn a new programming language is by writing programs in it.
</span></blockquote>
<p class="attribution"><a href="https://en.wikipedia.org/wiki/Dennis_Ritchie">Dennis Ritchie</a></p>
<hr class="splash">

The tutorials in this section are intended to get you started working with C# and in particular
the .NET Multi-platform App UI (MAUI). If you have already worked with C# in the past, you should
take the opportunity to extend your knowledge of the language. Tha might mean, for example, adding
other features into the examples provided here. If you have never worked with C#, this is an
opportunity to add one more language to your skillset.

## Requirements

If you are using your own computer for these exercises, you will need a working configuration.
The exercises assume that you will be using Visual Studio Code (VSCode), although other tools
are available such as [Visual Studio](https://visualstudio.microsoft.com/) and
[Rider](https://www.jetbrains.com/rider/). If you want to use an alternative IDE/editor, you 
need to be prepared to adapt the instructions provided in the tutorials.

You should install [.NET 9](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
for the purposes of this module. The dev-environment tutorial will set up a containerized
development environment with .NET 9 SDK, PostgreSQL, and Android tooling pre-configured.

## Recommended Learning Path

### Core Tutorials (Start Here)

Follow these tutorials in order to build a complete cross-platform MAUI application:

1. **[Development Environment Setup](dev-environment/)** - Set up Docker, PostgreSQL, VS Code with .NET 9, and dev containers

#### MAUI + MVVM + Database Tutorial Series

This comprehensive tutorial series teaches you to build production-quality cross-platform applications:

2. **[Getting Started](maui-mvvm-database/)** - Overview of what you'll build and prerequisites
3. **[Download StarterApp](maui-mvvm-database/part1-download-explore.md)** - Download and explore the PostgreSQL-ready StarterApp architecture
4. **[Simplify the Default Code](maui-mvvm-database/part2-simplify-notes.md)** - Transform authentication app into note-taking app
5. **[Add Repository Pattern](maui-mvvm-database/part3-repository-pattern.md)** - Abstract data access for future API integration
6. **[Advanced Migrations](maui-mvvm-database/part4-advanced-migrations.md)** - Master database schema evolution
7. **[Testing and Verification](maui-mvvm-database/part5-testing-verification.md)** - Complete end-to-end testing

**Estimated completion time**: 6-9 hours total

### StarterApp Resources

These supplementary resources provide deeper understanding of specific concepts from the main tutorial:

8. **[StarterApp Overview](starterapp/starterapp.md)** - Introduction to the StarterApp architecture
9. **[Authentication Deep Dive](starterapp/authentication.md)** - Detailed explanation of authentication implementation
10. **[Navigation Patterns](starterapp/navigation.md)** - Advanced navigation techniques in MAUI

### Advanced Topics

11. **[Unit Testing](unit_test/)** - Writing and running unit tests for MAUI applications with PostgreSQL
12. **[CI/CD Pipeline](cicd/)** - Continuous integration and deployment setup
13. **[Cloudflare Tunnel](tunnel/)** - Exposing local services securely

## Troubleshooting

Having issues? See the **[Troubleshooting Guide](troubleshooting.md)** for common problems and solutions.

## Further resources

* [Learn C# with CSharpFritz](https://dotnet.microsoft.com/en-us/live/csharpfritz)
* [James Montemagno: .NET MAUI](https://montemagno.com/tag/net-maui/)
* [James Montemagno: Video course](https://youtu.be/DuNLR_NJv8U?si=eeDP3j2mBNbHXe-O)

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

You should install [.NET 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
for the purposes of this module. Although .NET 9 is available, there may be some incompatibilities
with other software tools.

## Recommended Learning Path

### Core Tutorials (Start Here)

1. **[Development Environment Setup](dev-environment/)** - Set up Docker, PostgreSQL, VS Code, and dev containers
2. **[Visual Studio Code Configuration](vscode/)** - Configure VS Code for C# development
3. **[MAUI + MVVM + Database](maui-mvvm-database/)** ⭐ **NEW!** - Comprehensive tutorial combining MAUI, MVVM architecture, and PostgreSQL database integration. This is the primary learning path that teaches you to build production-quality cross-platform applications.

### StarterApp Resources

4. **[StarterApp Overview](starterapp/starterapp.md)** - Introduction to the StarterApp architecture
5. **[Authentication Deep Dive](starterapp/authentication.md)** - Detailed explanation of authentication implementation
6. **[Navigation Patterns](starterapp/navigation.md)** - Advanced navigation techniques in MAUI

### Advanced Topics

7. **[Unit Testing](unit_test/)** - Writing and running unit tests for MAUI applications
8. **[CI/CD Pipeline](cicd/)** - Continuous integration and deployment setup
9. **[Cloudflare Tunnel](tunnel/)** - Exposing local services securely

### Legacy Tutorials (Archived)

{: .note }
The following tutorials are maintained for reference but have been superseded by the **MAUI + MVVM + Database** combined tutorial, which teaches these concepts together from the start.

- [MAUI Basics](deprecated/maui/maui.md) - Basic MAUI concepts (now covered in combined tutorial)
- [MVVM Pattern](deprecated/mvvm/mvvm.md) - MVVM architecture (now covered in combined tutorial)
- [Database Integration](deprecated/database/database.md) - SQL Server database integration (now uses PostgreSQL in combined tutorial)
- [Database Migration](deprecated/migration/) - Schema migration strategies (now covered in combined tutorial)
- [StarterApp Quickstart](starterapp/quickstart.md) - Quick setup guide (replaced by combined tutorial Part 1)

## Troubleshooting

Having issues? See the **[Troubleshooting Guide](troubleshooting.md)** for common problems and solutions.

## Further resources

* [Learn C# with CSharpFritz](https://dotnet.microsoft.com/en-us/live/csharpfritz)
* [James Montemagno: .NET MAUI](https://montemagno.com/tag/net-maui/)
* [James Montemagno: Video course](https://youtu.be/DuNLR_NJv8U?si=eeDP3j2mBNbHXe-O)

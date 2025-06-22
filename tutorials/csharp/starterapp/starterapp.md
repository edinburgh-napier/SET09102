---
title: StarterApp
parent: C# practice
grand_parent: Tutorials
nav_order: 9
---

# StarterApp app

The StarterApp provides a starting point for a development project. It includes
basic features such as:

* Database integration and migrations
* Role-based security
* Local authentication
* Example navigation

The current version of the app uses SQL Server for data storage and Entity Framework Core for 
object-relational mapping and migrations.

To fully understand how it works, you should complete all the practice tutorials provided.
However, if you want to jump straight in and work out any problems as you go along, that will 
also work. The code uses structured comments for use with the 
[Doxygen](https://www.doxygen.nl/) documentation generator tool and one of the first things
you should do is generate that documentation for your own reference.

## Compatibility

This app is built using the following tool versions.

| Name                    | Version     | Link                                                                                                                             |
|-------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------|
| .NET                    | 9.0         | [https://dotnet.microsoft.com/en-us/](https://dotnet.microsoft.com/en-us/)                                                       |
| SQL Server Docker image | 2025-latest | [https://mcr.microsoft.com/en-us/artifact/mar/mssql/server/tags](https://mcr.microsoft.com/en-us/artifact/mar/mssql/server/tags) |

## Documentation

1. [Quickstart](quickstart.md)
2. [Authentication](authentication.md)
3. [Navigation](navigation.md)


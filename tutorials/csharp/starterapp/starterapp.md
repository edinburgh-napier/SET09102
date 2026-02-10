---
title: StarterApp
parent: C# practice
grand_parent: Tutorials
nav_order: 10
---

# StarterApp

The StarterApp provides a production-quality starting point for MAUI development projects. It demonstrates best practices for multi-project architecture and includes:

* **Multi-project solution** (UI, Database, Migrations)
* **Database integration** with Entity Framework Core and migrations
* **Role-based security** and authorization
* **Local authentication** with BCrypt password hashing
* **MVVM architecture** using CommunityToolkit.Mvvm
* **Dependency injection** throughout the application
* **Example navigation** with Shell

{: .important }
**PostgreSQL Version Available**: A PostgreSQL-ready version of StarterApp is available in the [SET09102 repository](https://github.com/edinburgh-napier/SET09102/tree/main/code/StarterApp). This version is used in the **[MAUI + MVVM + Database Tutorial](../maui-mvvm-database/)**, which is the recommended learning path.

## Versions

There are two versions of StarterApp:

1. **Original StarterApp** - Uses SQL Server for data storage (available at [original repository](https://github.com/coillarach/StarterApp))
2. **PostgreSQL StarterApp** - Uses PostgreSQL for data storage (available in this repository's `code/StarterApp/` directory)

The tutorials on this site use the **PostgreSQL version** to align with the [dev-environment tutorial](../dev-environment/) setup.

## Learning Path

**New to MAUI?** Start with the comprehensive **[MAUI + MVVM + Database Tutorial](../maui-mvvm-database/)**, which uses StarterApp as the foundation and teaches you to:
- Download and explore the StarterApp architecture
- Refactor it into a note-taking application
- Understand MVVM, services, and repository patterns
- Master database migrations and schema evolution

**Already familiar with MAUI?** Use the supplementary resources below to understand specific aspects of the StarterApp architecture.

## Understanding StarterApp

This documentation provides supplementary material for understanding specific aspects of the StarterApp architecture. These are referenced by the main tutorial but can also be used as standalone references.

## Compatibility

### Original StarterApp (SQL Server)

| Name                                                                                      | Version     |
|-------------------------------------------------------------------------------------------|-------------|
| [.NET](https://dotnet.microsoft.com/en-us/)                                               | 8.0 / 9.0   |
| [SQL Server Docker image](https://mcr.microsoft.com/en-us/artifact/mar/mssql/server/tags) | 2025-latest |

### PostgreSQL StarterApp (Recommended)

| Name                                                     | Version   |
|----------------------------------------------------------|-----------|
| [.NET](https://dotnet.microsoft.com/en-us/)              | 8.0 / 9.0 |
| [PostgreSQL Docker image](https://hub.docker.com/_/postgres) | 16        |


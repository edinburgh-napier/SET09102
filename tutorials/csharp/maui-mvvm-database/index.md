---
title: Getting Started
parent: C# practice
has_children: false
has_toc: false
nav_order: 2
---



# Getting Started with MAUI + MVVM + Database

<hr class="splash">

![Building Blocks](../../../images/icons/building-blocks.png)

<blockquote class="pretty"><span>
The art of programming is the art of organizing complexity.
</span></blockquote>
<p class="attribution">Edsger W. Dijkstra</p>
<hr class="splash">

## Overview

This comprehensive tutorial teaches you to build cross-platform mobile applications using **.NET MAUI** (Multi-platform App UI), the **MVVM** (Model-View-ViewModel) architectural pattern, and **PostgreSQL database** integration. Rather than learning these technologies separately through multiple refactoring cycles, you'll work with a production-quality application from the start and progressively enhance it.

**What makes this tutorial different:**

- **Start with real code**: Download and modify a working multi-project MAUI application
- **Learn by refactoring**: Transform an authentication app into a note-taking app
- **Build for the future**: Implement patterns that support REST API integration
- **Use modern tools**: PostgreSQL in Docker, Entity Framework Core, CommunityToolkit.Mvvm
- **Understand architecture**: Multi-project solutions, dependency injection, repository pattern

## What You'll Build

Starting with the **StarterApp** (a multi-project MAUI application with authentication, roles, and PostgreSQL), you'll transform it into a complete **Note-Taking Application** with:

- Note creation, editing, and deletion (CRUD operations)
- Category organization with color coding
- Database persistence with Entity Framework Core
- MVVM architecture using CommunityToolkit
- Repository pattern for data abstraction (ready for API integration)
- Database migrations for schema evolution

## Prerequisites

Before starting this tutorial, you must have:

1. **Completed** the [dev-environment tutorial](../dev-environment/) - you need Docker and PostgreSQL running
2. **Basic C# knowledge**: classes, methods, properties, async/await
3. **Git basics**: clone, commit, push
4. **Development environment**:
   - Visual Studio Code with Dev Containers extension
   - .NET 8 SDK installed
   - Docker Desktop running
   - PostgreSQL container from dev-environment tutorial

**Time commitment**: 6-9 hours total across five parts

## Learning Objectives

By completing this tutorial, you will be able to:

✅ Understand and work with multi-project MAUI solutions
✅ Implement MVVM pattern using CommunityToolkit.Mvvm
✅ Design and implement database models with Entity Framework Core
✅ Use PostgreSQL with .NET applications via Npgsql
✅ Create and apply database migrations for schema changes
✅ Implement repository pattern for data access abstraction
✅ Use dependency injection throughout an application
✅ Build complete CRUD functionality in MAUI
✅ Navigate between views using Shell navigation
✅ Prepare applications for future REST API integration

## Tutorial Structure

This tutorial is divided into five progressive parts:

### [Part 1: Download and Explore StarterApp](part1-download-explore.md) (60-90 minutes)

Download the PostgreSQL-ready StarterApp and explore its architecture:
- Multi-project solution structure
- Existing MVVM implementation with CommunityToolkit
- Entity Framework Core with PostgreSQL
- Authentication and authorization patterns (before simplifying)
- Apply existing migrations to local database

**Key learning**: Understanding production-quality code organization

### [Part 2: Simplify to Note-Taking App](part2-simplify-notes.md) (120-150 minutes)

Remove authentication complexity and create a new domain model:
- Create Note and Category models
- Update DbContext and generate migrations
- Remove authentication services and ViewModels
- Create NoteViewModel and NotesViewModel
- Build Note views with XAML data binding
- Update Shell navigation for the new app

**Key learning**: Modifying existing architectures for new requirements

### [Part 3: Add Repository Pattern](part3-repository-pattern.md) (60-90 minutes)

Abstract data access for future API integration:
- Design INoteRepository interface
- Implement NoteRepository for local database
- Refactor ViewModels to use repository
- Document future ApiNoteRepository implementation
- Understand dependency injection for swappable implementations

**Key learning**: Preparing for distributed architectures

### [Part 4: Advanced Migrations](part4-advanced-migrations.md) (45-60 minutes)

Master database schema evolution:
- Add new properties to existing models
- Generate and apply migrations
- Seed default data
- Understand migration history
- Best practices for team collaboration

**Key learning**: Managing database changes over time

### [Part 5: Testing and Verification](part5-testing-verification.md) (30 minutes)

Validate your complete application:
- Complete CRUD workflow testing
- Navigation verification
- Data binding checks
- Database persistence validation
- Extension challenges for advanced students

**Key learning**: Systematic testing approaches

## Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| UI Framework | .NET MAUI 9.0 | Cross-platform mobile/desktop UI |
| MVVM Toolkit | CommunityToolkit.Mvvm 8.x | Simplified MVVM implementation |
| Database | PostgreSQL 16 | Relational data storage |
| ORM | Entity Framework Core 9.0 | Object-relational mapping |
| Database Provider | Npgsql.EntityFrameworkCore.PostgreSQL | PostgreSQL EF Core support |
| Dependency Injection | Microsoft.Extensions.DependencyInjection | Service registration and resolution |
| Navigation | MAUI Shell | Declarative routing and navigation |

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│              MAUI Application               │
│  ┌───────────────────────────────────────┐  │
│  │           Views (XAML)                │  │
│  │  - NotesPage, NotePage, AboutPage    │  │
│  └───────────────┬───────────────────────┘  │
│                  │ Data Binding              │
│  ┌───────────────▼───────────────────────┐  │
│  │        ViewModels                     │  │
│  │  - NotesViewModel, NoteViewModel     │  │
│  └───────────────┬───────────────────────┘  │
│                  │ Dependency Injection      │
└──────────────────┼───────────────────────────┘
                   │
┌──────────────────▼───────────────────────────┐
│        StarterApp.Database Library           │
│  ┌───────────────────────────────────────┐  │
│  │      INoteRepository (Interface)      │  │
│  └───────────────┬───────────────────────┘  │
│                  │                           │
│    ┌─────────────┴──────────────┐           │
│    │                            │           │
│  ┌─▼────────────────┐  ┌────────▼────────┐ │
│  │ NoteRepository   │  │ ApiNoteRepo     │ │
│  │ (Local DB)       │  │ (Future)        │ │
│  └─┬────────────────┘  └─────────────────┘ │
│    │                                        │
│  ┌─▼────────────────────────────────────┐  │
│  │        AppDbContext (EF Core)        │  │
│  └─┬────────────────────────────────────┘  │
└────┼───────────────────────────────────────┘
     │ Npgsql Provider
┌────▼────────────────────────────────────────┐
│       PostgreSQL 16 (Docker)                │
│  - Host: localhost                          │
│  - Database: starterapp                     │
└─────────────────────────────────────────────┘
```

## Why This Approach?

**Traditional approach** (separate tutorials):
1. Build basic MAUI app with file storage
2. Refactor to add MVVM
3. Refactor to add database
4. Refactor to use proper patterns
5. Students ask: "Why didn't we just do it right the first time?"

**This tutorial's approach**:
1. Start with production-quality multi-project architecture
2. Learn by reading and understanding existing code
3. Practice refactoring for new requirements (real-world skill!)
4. Understand WHY each pattern exists by seeing it in context
5. Build muscle memory for doing it right from the start

## Getting Help

- **Troubleshooting**: See [C# Troubleshooting Guide](../troubleshooting.md)
- **MVVM Reference**: See [StarterApp MVVM Documentation](../starterapp/authentication.md)
- **Navigation Reference**: See [StarterApp Navigation Guide](../starterapp/navigation.md)
- **PostgreSQL Issues**: Review [dev-environment tutorial](../dev-environment/)

## Next Steps

Ready to start? Proceed to **[Part 1: Download and Explore StarterApp](part1-download-explore.md)** to download the PostgreSQL-ready StarterApp and begin exploring its architecture.

---

**Estimated time**: 6-9 hours total | **Difficulty**: Intermediate | **Prerequisites**: dev-environment tutorial, basic C#

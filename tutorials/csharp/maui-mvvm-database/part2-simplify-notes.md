---
title: Simplify the Default Code
parent: C# practice
has_children: false
has_toc: false
nav_order: 4
---

# Part 2: Simplify to Note-Taking App

## Learning Objectives

By the end of this part, you will:

-  Remove authentication complexity from StarterApp
-  Design new domain models (Note, Category)
-  Configure Entity Framework relationships
-  Create and apply database migrations for schema changes
-  Build ViewModels using CommunityToolkit.Mvvm
-  Create XAML views with data binding
-  Update Shell navigation for the new application
-  **Master the refactoring process for real-world applications**

**Estimated time**: 120-150 minutes

---

## 2.1: Understanding the Transformation

Before diving into code, let's understand what we're doing and why.

### Current State: Authentication App

StarterApp currently has:
- User authentication (login/register)
- User roles and permissions
- Multiple views for user management
- Complex authentication service layer

### Target State: Note-Taking App

We want:
- Simple note creation, editing, deletion
- Category organization with colors
- No authentication barriers
- Clean, focused interface

### Why Simplify First?

{: .note }
**Pedagogical Strategy**: By removing complexity first, you'll better understand how to add complexity later. You're learning to refactor existing code, not just write new code - a critical real-world skill.

**What we'll keep**:
- Multi-project architecture
- MVVM pattern with CommunityToolkit
- Entity Framework Core with PostgreSQL
- Dependency injection
- Shell navigation

**What we'll remove**:
- User, Role, UserRole models
- Authentication service
- Login, Register, Profile views and ViewModels
- Role-based authorization

**What we'll add**:
- Note and Category models
- NoteViewModel (detail page - single note)
- NotesViewModel (list page - all notes)
- NotePage and NotesPage views
- Simple navigation

---

## 2.2: Create New Models

Let's start by creating our new domain models. We'll keep them in the `StarterApp.Database` project to maintain separation of concerns.

### Create Category Model

**Location**: `StarterApp.Database/Models/Category.cs`

Create a new file with this content:

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace StarterApp.Database.Models;

/// <summary>
/// Represents a category for organizing notes
/// </summary>
[Table("categories")]
[PrimaryKey(nameof(Id))]
public class Category
{
    /// <summary>
    /// Primary key
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Category name (e.g., "Work", "Personal", "Study")
    /// </summary>
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Hex color code for visual identification (e.g., "#FF5733")
    /// </summary>
    [Required]
    [MaxLength(7)]
    public string ColorHex { get; set; } = "#808080";  // Default gray

    /// <summary>
    /// Optional description of category purpose
    /// </summary>
    [MaxLength(200)]
    public string? Description { get; set; }

    /// <summary>
    /// Navigation property: All notes in this category
    /// </summary>
    public List<Note> Notes { get; set; } = new List<Note>();
}
```

**Key observations**:
- **`[Table("categories")]`**: Explicitly names the database table (lowercase for PostgreSQL convention)
- **`[PrimaryKey(nameof(Id))]`**: Marks Id as the primary key
- **`[Required]` and `[MaxLength]`**: Data validation and database constraints
- **Navigation property**: `Notes` establishes one-to-many relationship (one category, many notes)
- **Default values**: `ColorHex` defaults to gray if not specified

### Create Note Model

**Location**: `StarterApp.Database/Models/Note.cs`

Create a new file with this content:

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace StarterApp.Database.Models;

/// <summary>
/// Represents a single note with title, content, and categorization
/// </summary>
[Table("notes")]
[PrimaryKey(nameof(Id))]
public class Note
{
    /// <summary>
    /// Primary key
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Note title/subject
    /// </summary>
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Full note content (can be large)
    /// </summary>
    [Required]
    public string Content { get; set; } = string.Empty;

    /// <summary>
    /// Foreign key to Category
    /// </summary>
    public int? CategoryId { get; set; }

    /// <summary>
    /// Navigation property: The category this note belongs to
    /// </summary>
    [ForeignKey(nameof(CategoryId))]
    public Category? Category { get; set; }

    /// <summary>
    /// When the note was created
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// When the note was last modified
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Computed property: Preview of content for list views
    /// </summary>
    [NotMapped]
    public string ContentPreview => Content.Length > 100
        ? Content.Substring(0, 100) + "..."
        : Content;
}
```

**Key observations**:
- **`CategoryId` is nullable**: Notes can exist without a category
- **`[ForeignKey]`**: Explicitly defines the foreign key relationship
- **Timestamps**: `CreatedAt` and `UpdatedAt` track note lifecycle
- **`[NotMapped]`**: `ContentPreview` is computed, not stored in database
- **No `MaxLength` on Content**: Allows unlimited text (becomes `TEXT` column in PostgreSQL)

### Understanding the Relationship

```
┌─────────────────┐
│    Category     │
│─────────────────│
│ Id (PK)         │
│ Name            │
│ ColorHex        │
│ Description     │
└────────┬────────┘
         │ 1
         │
         │ has many
         │
         │ *
┌────────▼────────┐
│      Note       │
│─────────────────│
│ Id (PK)         │
│ Title           │
│ Content         │
│ CategoryId (FK) │ ─┐ nullable
│ CreatedAt       │  │ (note can exist
│ UpdatedAt       │  │  without category)
└─────────────────┘  ◄┘
```

**Relationship type**: One-to-Many (optional)
- One category can have many notes
- One note belongs to zero or one category
- If a note has no category, `CategoryId` is `NULL`

---

## 2.3: Update DbContext

Now we need to tell Entity Framework about our new models and remove the old ones.

### Backup Current DbContext

Before making changes, let's understand what we're replacing:

```bash
# View the current DbContext
cat StarterApp.Database/Data/AppDbContext.cs
```

You'll see:
- `DbSet<User>`, `DbSet<Role>`, `DbSet<UserRole>`
- Relationship configurations in `OnModelCreating`

### Update AppDbContext.cs

**Location**: `StarterApp.Database/Data/AppDbContext.cs`

Replace the DbSets and OnModelCreating method:

```csharp
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StarterApp.Database.Models;

namespace StarterApp.Database.Data;

public class AppDbContext : DbContext
{
    public AppDbContext()
    { }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var a = Assembly.GetExecutingAssembly();
        using var stream = a.GetManifestResourceStream("StarterApp.Database.appsettings.json");

        var config = new ConfigurationBuilder()
            .AddJsonStream(stream)
            .Build();

        optionsBuilder.UseNpgsql(
            config.GetConnectionString("DevelopmentConnection")
        );
    }

    // NEW: Define database tables for note-taking app
    public DbSet<Category> Categories { get; set; }
    public DbSet<Note> Notes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Category entity
        modelBuilder.Entity<Category>(entity =>
        {
            // Unique constraint on category name (can't have duplicate "Work" categories)
            entity.HasIndex(e => e.Name).IsUnique();

            // Ensure proper column types and constraints
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.ColorHex).HasMaxLength(7);
            entity.Property(e => e.Description).HasMaxLength(200);
        });

        // Configure Note entity
        modelBuilder.Entity<Note>(entity =>
        {
            // Index on CategoryId for faster filtering by category
            entity.HasIndex(e => e.CategoryId);

            // Index on CreatedAt for sorting by date
            entity.HasIndex(e => e.CreatedAt);

            // Ensure proper column types
            entity.Property(e => e.Title).HasMaxLength(100);
            entity.Property(e => e.Content).HasColumnType("text");  // PostgreSQL text type

            // Configure one-to-many relationship
            entity.HasOne(n => n.Category)
                  .WithMany(c => c.Notes)
                  .HasForeignKey(n => n.CategoryId)
                  .OnDelete(DeleteBehavior.SetNull);  // When category deleted, set CategoryId to NULL
        });

        // Seed default categories
        SeedData(modelBuilder);
    }

    /// <summary>
    /// Seeds the database with default categories
    /// </summary>
    private void SeedData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Personal", ColorHex = "#4CAF50", Description = "Personal notes and ideas" },
            new Category { Id = 2, Name = "Work", ColorHex = "#2196F3", Description = "Work-related tasks and notes" },
            new Category { Id = 3, Name = "Study", ColorHex = "#FF9800", Description = "Study materials and learning notes" },
            new Category { Id = 4, Name = "Shopping", ColorHex = "#E91E63", Description = "Shopping lists and reminders" }
        );
    }
}
```

**Key changes explained**:

1. **Removed old DbSets**: No more `Users`, `Roles`, `UserRoles`
2. **Added new DbSets**: `Categories` and `Notes`
3. **Unique constraint**: `HasIndex(e => e.Name).IsUnique()` prevents duplicate category names
4. **Performance indexes**:
   - `HasIndex(e => e.CategoryId)` speeds up "show all notes in Work category" queries
   - `HasIndex(e => e.CreatedAt)` speeds up "show newest notes first" sorting
5. **Column types**: `HasColumnType("text")` uses PostgreSQL's TEXT type for unlimited content
6. **Delete behavior**: `OnDelete(DeleteBehavior.SetNull)` means when a category is deleted, notes keep existing but their `CategoryId` becomes NULL
7. **Data seeding**: `HasData()` creates default categories when database is first created

{: .warning }
**Why seed data?** Users expect categories to exist immediately. Without seeding, the first time they open the app, there are no categories to choose from. Seeding provides a better user experience.

---

## 2.4: Create and Apply Migration

Now that we've changed our models and DbContext, we need to update the database schema.

### Delete Old Migrations

The existing migrations are for the authentication app. We're starting fresh:

```bash
# Navigate to Migrations project
cd StarterApp.Migrations

# Delete old migration files
rm -rf Migrations/

# Create Migrations directory again (some tools expect it)
mkdir Migrations
```

{: .note }
**Why delete migrations?** In a real project with production data, you'd create new migrations to evolve the schema. Since we're radically changing the domain model and don't have production data, it's cleaner to start fresh.

### Create InitialCreate Migration

Generate a new migration that creates our note-taking schema:

```bash
# Still in StarterApp.Migrations directory
dotnet ef migrations add InitialCreate --output-dir Migrations
```

**What just happened?**

Entity Framework:
1. Compared your models (`Note`, `Category`) to an empty database
2. Generated C# code to create tables, indexes, foreign keys
3. Saved the migration in `Migrations/YYYYMMDDHHMMSS_InitialCreate.cs`

**Examine the migration file**:

```bash
# View the generated migration
cat Migrations/*_InitialCreate.cs
```

You should see:
- `migrationBuilder.CreateTable("categories", ...)`
- `migrationBuilder.CreateTable("notes", ...)`
- `migrationBuilder.CreateIndex(...)` for indexes
- `migrationBuilder.InsertData(...)` for seed data

### Apply Migration to Database

Execute the migration against PostgreSQL:

```bash
# Apply migration
dotnet ef database update
```

**Output should show**:
```
Applying migration '20260210120000_InitialCreate'.
Done.
```

{: .warning }
**Database will be recreated**: If you had authentication tables from Part 1, they're now gone. That's intentional - we're starting fresh with a new domain model.

### Verify Database Schema

Use VS Code's PostgreSQL extension to verify:

1. **Connect** to your `starterapp` database
2. **Expand** the database in the sidebar
3. **Verify tables exist**:
   - `categories` (with 4 seeded rows)
   - `notes` (empty for now)
   - `__EFMigrationsHistory` (shows InitialCreate was applied)

4. **Verify seed data**:

```sql
-- Run in PostgreSQL query window
SELECT * FROM categories;
```

**Expected output**:
```
id | name      | colorhex | description
---+-----------+----------+---------------------------
1  | Personal  | #4CAF50  | Personal notes and ideas
2  | Work      | #2196F3  | Work-related tasks and notes
3  | Study     | #FF9800  | Study materials and learning notes
4  | Shopping  | #E91E63  | Shopping lists and reminders
```

---

## 2.5: Remove Authentication Services

Now we'll clean up the authentication code we no longer need.

### Delete Authentication Service Files

```bash
# Navigate to main app project
cd ../StarterApp

# Delete authentication services
rm Services/IAuthenticationService.cs
rm Services/AuthenticationService.cs
```

{: .note }
**Keep NavigationService**: We're only deleting authentication-specific services. The `NavigationService` is still useful for navigation management.

### Delete Old ViewModels

Remove ViewModels related to authentication:

```bash
# Still in StarterApp directory
rm ViewModels/LoginViewModel.cs
rm ViewModels/RegisterViewModel.cs
rm ViewModels/ProfileViewModel.cs
rm ViewModels/UserListViewModel.cs
rm ViewModels/UserDetailViewModel.cs
```

**Keep these ViewModels** (we'll modify them or they're still useful):
- `BaseViewModel.cs` - Foundation for all ViewModels
- `MainViewModel.cs` - Can be repurposed
- `AboutViewModel.cs` - Still useful for app info

### Delete Old Views

Remove XAML views related to authentication:

```bash
# Still in StarterApp directory
rm Views/LoginPage.xaml
rm Views/LoginPage.xaml.cs
rm Views/RegisterPage.xaml
rm Views/RegisterPage.xaml.cs
rm Views/UserListPage.xaml
rm Views/UserListPage.xaml.cs
rm Views/UserDetailPage.xaml
rm Views/UserDetailPage.xaml.cs
```

**Keep these Views**:
- `MainPage.xaml` - Can be repurposed as NotesPage
- `AboutPage.xaml` - Still useful

---

## 2.6: Create Note ViewModels

Now we'll create ViewModels for our note-taking functionality. We need two:
- **NotesViewModel**: List of all notes (main page)
- **NoteViewModel**: Single note detail (create/edit page)

### Create NoteViewModel.cs (Detail Page)

This ViewModel manages a single note being created or edited.

**Location**: `StarterApp/ViewModels/NoteViewModel.cs`

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using StarterApp.Database.Data;
using StarterApp.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace StarterApp.ViewModels;

/// <summary>
/// ViewModel for creating or editing a single note
/// </summary>
public partial class NoteViewModel : BaseViewModel
{
    private readonly AppDbContext _context;
    private int? _noteId;  // Null for new note, populated for existing note

    /// <summary>
    /// Note title
    /// </summary>
    [ObservableProperty]
    private string title = string.Empty;

    /// <summary>
    /// Note content
    /// </summary>
    [ObservableProperty]
    private string content = string.Empty;

    /// <summary>
    /// Selected category ID (nullable - note can have no category)
    /// </summary>
    [ObservableProperty]
    private int? selectedCategoryId;

    /// <summary>
    /// All available categories for picker
    /// </summary>
    [ObservableProperty]
    private List<Category> categories = new();

    /// <summary>
    /// Whether we're editing an existing note (vs creating new)
    /// </summary>
    [ObservableProperty]
    private bool isEditMode;

    public NoteViewModel(AppDbContext context)
    {
        _context = context;
        Title = "New Note";
    }

    /// <summary>
    /// Load categories and optionally load an existing note
    /// </summary>
    /// <param name="noteId">If provided, loads existing note for editing</param>
    public async Task InitializeAsync(int? noteId = null)
    {
        try
        {
            IsBusy = true;

            // Load all categories for picker
            Categories = await _context.Categories.OrderBy(c => c.Name).ToListAsync();

            if (noteId.HasValue)
            {
                // Edit mode: Load existing note
                _noteId = noteId.Value;
                IsEditMode = true;
                Title = "Edit Note";

                var note = await _context.Notes.FindAsync(noteId.Value);
                if (note != null)
                {
                    this.title = note.Title;
                    this.content = note.Content;
                    this.selectedCategoryId = note.CategoryId;

                    // Notify UI that properties have changed
                    OnPropertyChanged(nameof(Title));
                    OnPropertyChanged(nameof(Content));
                    OnPropertyChanged(nameof(SelectedCategoryId));
                }
            }
            else
            {
                // Create mode
                IsEditMode = false;
                Title = "New Note";
            }
        }
        catch (Exception ex)
        {
            SetError($"Failed to load: {ex.Message}");
        }
        finally
        {
            IsBusy = false;
        }
    }

    /// <summary>
    /// Save note (create new or update existing)
    /// </summary>
    [RelayCommand]
    private async Task SaveAsync()
    {
        if (string.IsNullOrWhiteSpace(Title))
        {
            SetError("Title is required");
            return;
        }

        if (string.IsNullOrWhiteSpace(Content))
        {
            SetError("Content is required");
            return;
        }

        try
        {
            IsBusy = true;
            ClearError();

            if (IsEditMode && _noteId.HasValue)
            {
                // Update existing note
                var note = await _context.Notes.FindAsync(_noteId.Value);
                if (note != null)
                {
                    note.Title = Title;
                    note.Content = Content;
                    note.CategoryId = SelectedCategoryId;
                    note.UpdatedAt = DateTime.UtcNow;
                }
            }
            else
            {
                // Create new note
                var note = new Note
                {
                    Title = Title,
                    Content = Content,
                    CategoryId = SelectedCategoryId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.Notes.Add(note);
            }

            await _context.SaveChangesAsync();

            // Navigate back to list
            await Shell.Current.GoToAsync("..");
        }
        catch (Exception ex)
        {
            SetError($"Failed to save: {ex.Message}");
        }
        finally
        {
            IsBusy = false;
        }
    }

    /// <summary>
    /// Delete the current note
    /// </summary>
    [RelayCommand]
    private async Task DeleteAsync()
    {
        if (!IsEditMode || !_noteId.HasValue)
            return;

        bool confirm = await Application.Current.MainPage.DisplayAlert(
            "Delete Note",
            "Are you sure you want to delete this note?",
            "Delete",
            "Cancel");

        if (!confirm)
            return;

        try
        {
            IsBusy = true;

            var note = await _context.Notes.FindAsync(_noteId.Value);
            if (note != null)
            {
                _context.Notes.Remove(note);
                await _context.SaveChangesAsync();
            }

            // Navigate back to list
            await Shell.Current.GoToAsync("..");
        }
        catch (Exception ex)
        {
            SetError($"Failed to delete: {ex.Message}");
        }
        finally
        {
            IsBusy = false;
        }
    }

    /// <summary>
    /// Cancel editing and go back
    /// </summary>
    [RelayCommand]
    private async Task CancelAsync()
    {
        await Shell.Current.GoToAsync("..");
    }
}
```

**Key concepts**:

1. **`[ObservableProperty]`**: Generates properties with `INotifyPropertyChanged` support
   - `title` field becomes `Title` property automatically
   - UI updates when properties change

2. **InitializeAsync pattern**: ViewModels often need async initialization
   - Load categories from database
   - If editing, load existing note
   - Can't use async in constructor, so we use separate init method

3. **CRUD operations**: Create, Read, Update, Delete
   - **Create**: `_context.Notes.Add(note)` + `SaveChangesAsync()`
   - **Read**: `_context.Notes.FindAsync(id)`
   - **Update**: Modify existing entity + `SaveChangesAsync()`
   - **Delete**: `_context.Notes.Remove(note)` + `SaveChangesAsync()`

4. **Navigation**: `Shell.Current.GoToAsync("..")` goes back to previous page

### Create NotesViewModel.cs (List Page)

This ViewModel manages the list of all notes with filtering by category.

**Location**: `StarterApp/ViewModels/NotesViewModel.cs`

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using StarterApp.Database.Data;
using StarterApp.Database.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;

namespace StarterApp.ViewModels;

/// <summary>
/// ViewModel for displaying list of all notes
/// </summary>
public partial class NotesViewModel : BaseViewModel
{
    private readonly AppDbContext _context;

    /// <summary>
    /// Observable collection of notes (auto-updates UI when changed)
    /// </summary>
    [ObservableProperty]
    private ObservableCollection<Note> notes = new();

    /// <summary>
    /// All categories for filter picker
    /// </summary>
    [ObservableProperty]
    private List<Category> categories = new();

    /// <summary>
    /// Currently selected category filter (null = show all)
    /// </summary>
    [ObservableProperty]
    private int? selectedCategoryId;

    /// <summary>
    /// Whether we're refreshing the list
    /// </summary>
    [ObservableProperty]
    private bool isRefreshing;

    public NotesViewModel(AppDbContext context)
    {
        _context = context;
        Title = "My Notes";
    }

    /// <summary>
    /// Load categories and notes
    /// </summary>
    public async Task InitializeAsync()
    {
        await LoadCategoriesAsync();
        await LoadNotesAsync();
    }

    /// <summary>
    /// Load all categories
    /// </summary>
    private async Task LoadCategoriesAsync()
    {
        try
        {
            var allCategories = await _context.Categories.OrderBy(c => c.Name).ToListAsync();

            // Add "All" option at the beginning
            Categories = new List<Category>
            {
                new Category { Id = 0, Name = "All Categories" }
            };
            Categories.AddRange(allCategories);
        }
        catch (Exception ex)
        {
            SetError($"Failed to load categories: {ex.Message}");
        }
    }

    /// <summary>
    /// Load notes (filtered by category if selected)
    /// </summary>
    [RelayCommand]
    private async Task LoadNotesAsync()
    {
        try
        {
            IsBusy = true;
            ClearError();

            IQueryable<Note> query = _context.Notes.Include(n => n.Category);

            // Apply category filter if selected
            if (SelectedCategoryId.HasValue && SelectedCategoryId.Value > 0)
            {
                query = query.Where(n => n.CategoryId == SelectedCategoryId.Value);
            }

            // Order by most recent first
            var notesList = await query
                .OrderByDescending(n => n.UpdatedAt)
                .ToListAsync();

            Notes.Clear();
            foreach (var note in notesList)
            {
                Notes.Add(note);
            }
        }
        catch (Exception ex)
        {
            SetError($"Failed to load notes: {ex.Message}");
        }
        finally
        {
            IsBusy = false;
            IsRefreshing = false;
        }
    }

    /// <summary>
    /// Navigate to create new note
    /// </summary>
    [RelayCommand]
    private async Task AddNoteAsync()
    {
        await Shell.Current.GoToAsync("note");
    }

    /// <summary>
    /// Navigate to edit existing note
    /// </summary>
    /// <param name="note">The note to edit</param>
    [RelayCommand]
    private async Task EditNoteAsync(Note note)
    {
        if (note == null) return;
        await Shell.Current.GoToAsync($"note?id={note.Id}");
    }

    /// <summary>
    /// Delete a note with confirmation
    /// </summary>
    [RelayCommand]
    private async Task DeleteNoteAsync(Note note)
    {
        if (note == null) return;

        bool confirm = await Application.Current.MainPage.DisplayAlert(
            "Delete Note",
            $"Are you sure you want to delete '{note.Title}'?",
            "Delete",
            "Cancel");

        if (!confirm) return;

        try
        {
            IsBusy = true;

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            Notes.Remove(note);
        }
        catch (Exception ex)
        {
            SetError($"Failed to delete note: {ex.Message}");
        }
        finally
        {
            IsBusy = false;
        }
    }

    /// <summary>
    /// Refresh the notes list (pull-to-refresh)
    /// </summary>
    [RelayCommand]
    private async Task RefreshAsync()
    {
        IsRefreshing = true;
        await LoadNotesAsync();
    }

    /// <summary>
    /// Called when category filter changes
    /// </summary>
    partial void OnSelectedCategoryIdChanged(int? value)
    {
        // Automatically reload notes when category filter changes
        _ = LoadNotesAsync();
    }
}
```

**Key concepts**:

1. **`ObservableCollection<Note>`**: Special collection that notifies UI when items added/removed
   - Add note: UI automatically shows new item
   - Remove note: UI automatically removes item
   - Unlike `List<Note>`, changes are automatically reflected

2. **LINQ queries with Include**:
   ```csharp
   _context.Notes.Include(n => n.Category)
   ```
   - **Eager loading**: Loads notes AND their categories in one query
   - Without `Include`, accessing `note.Category` would trigger additional database queries

3. **Filtering**:
   ```csharp
   query.Where(n => n.CategoryId == SelectedCategoryId.Value)
   ```
   - Only executed when `SelectedCategoryId` has value and isn't 0 (All)
   - LINQ converts to SQL: `WHERE category_id = 2`

4. **Partial methods**: `OnSelectedCategoryIdChanged` is a partial method from source generator
   - Automatically called when `SelectedCategoryId` changes
   - Perfect for triggering reload when filter changes

5. **Pull-to-refresh**: `IsRefreshing` property bound to `RefreshView` in XAML

---

## 2.7: Create Note Views

Now we'll create the XAML views that use our ViewModels.

### Create NotePage.xaml (Detail Page)

This page creates or edits a single note.

**Location**: `StarterApp/Views/NotePage.xaml`

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage x:Class="StarterApp.Views.NotePage"
             xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             xmlns:vm="clr-namespace:StarterApp.ViewModels"
             Title="{Binding Title}">

    <ContentPage.BindingContext>
        <vm:NoteViewModel />
    </ContentPage.BindingContext>

    <ScrollView>
        <VerticalStackLayout Padding="20" Spacing="15">

            <!-- Error Message -->
            <Border BackgroundColor="{AppThemeBinding Light=#FFEBEE, Dark=#1B0000}"
                    Stroke="{AppThemeBinding Light=#F44336, Dark=#EF5350}"
                    StrokeThickness="1"
                    Padding="15"
                    IsVisible="{Binding HasError}">
                <Border.StrokeShape>
                    <RoundRectangle CornerRadius="8" />
                </Border.StrokeShape>
                <Label Text="{Binding ErrorMessage}"
                       TextColor="{AppThemeBinding Light=#D32F2F, Dark=#EF5350}"
                       FontSize="14" />
            </Border>

            <!-- Title Entry -->
            <Label Text="Title" FontAttributes="Bold" />
            <Border Stroke="{AppThemeBinding Light={StaticResource Gray300}, Dark={StaticResource Gray600}}"
                    StrokeThickness="1"
                    BackgroundColor="{AppThemeBinding Light={StaticResource White}, Dark={StaticResource Gray900}}">
                <Border.StrokeShape>
                    <RoundRectangle CornerRadius="8" />
                </Border.StrokeShape>
                <Entry Text="{Binding Title}"
                       Placeholder="Enter note title"
                       Margin="10" />
            </Border>

            <!-- Category Picker -->
            <Label Text="Category (Optional)" FontAttributes="Bold" />
            <Border Stroke="{AppThemeBinding Light={StaticResource Gray300}, Dark={StaticResource Gray600}}"
                    StrokeThickness="1"
                    BackgroundColor="{AppThemeBinding Light={StaticResource White}, Dark={StaticResource Gray900}}">
                <Border.StrokeShape>
                    <RoundRectangle CornerRadius="8" />
                </Border.StrokeShape>
                <Picker ItemsSource="{Binding Categories}"
                        ItemDisplayBinding="{Binding Name}"
                        SelectedItem="{Binding SelectedCategoryId}"
                        Title="Select category"
                        Margin="10">
                    <Picker.ItemsSource>
                        <x:Array Type="{x:Type x:Int32}">
                            <x:Int32>0</x:Int32>
                        </x:Array>
                    </Picker.ItemsSource>
                </Picker>
            </Border>

            <!-- Content Editor -->
            <Label Text="Content" FontAttributes="Bold" />
            <Border Stroke="{AppThemeBinding Light={StaticResource Gray300}, Dark={StaticResource Gray600}}"
                    StrokeThickness="1"
                    BackgroundColor="{AppThemeBinding Light={StaticResource White}, Dark={StaticResource Gray900}}">
                <Border.StrokeShape>
                    <RoundRectangle CornerRadius="8" />
                </Border.StrokeShape>
                <Editor Text="{Binding Content}"
                        Placeholder="Enter note content"
                        HeightRequest="300"
                        Margin="10"
                        AutoSize="TextChanges" />
            </Border>

            <!-- Action Buttons -->
            <Grid ColumnDefinitions="*,*" ColumnSpacing="10" Margin="0,20,0,0">
                <!-- Save Button -->
                <Button Grid.Column="0"
                        Text="{Binding IsEditMode, Converter={StaticResource BoolToTextConverter}, ConverterParameter='Update|Create'}"
                        Command="{Binding SaveCommand}"
                        BackgroundColor="{AppThemeBinding Light={StaticResource Primary}, Dark={StaticResource PrimaryDark}}"
                        TextColor="White"
                        HeightRequest="50"
                        CornerRadius="8"
                        IsEnabled="{Binding IsNotBusy}" />

                <!-- Cancel Button -->
                <Button Grid.Column="1"
                        Text="Cancel"
                        Command="{Binding CancelCommand}"
                        BackgroundColor="Transparent"
                        TextColor="{AppThemeBinding Light={StaticResource Gray600}, Dark={StaticResource Gray400}}"
                        BorderColor="{AppThemeBinding Light={StaticResource Gray300}, Dark={StaticResource Gray600}}"
                        BorderWidth="1"
                        HeightRequest="50"
                        CornerRadius="8" />
            </Grid>

            <!-- Delete Button (only in edit mode) -->
            <Button Text="Delete Note"
                    Command="{Binding DeleteCommand}"
                    IsVisible="{Binding IsEditMode}"
                    BackgroundColor="{AppThemeBinding Light=#F44336, Dark=#EF5350}"
                    TextColor="White"
                    HeightRequest="50"
                    CornerRadius="8"
                    Margin="0,10,0,0" />

            <!-- Loading Indicator -->
            <ActivityIndicator IsVisible="{Binding IsBusy}"
                              IsRunning="{Binding IsBusy}"
                              Color="{AppThemeBinding Light={StaticResource Primary}, Dark={StaticResource PrimaryDark}}"
                              Margin="0,20,0,0" />

        </VerticalStackLayout>
    </ScrollView>
</ContentPage>
```

**Create code-behind**: `StarterApp/Views/NotePage.xaml.cs`

```csharp
using StarterApp.ViewModels;

namespace StarterApp.Views;

public partial class NotePage : ContentPage
{
    private readonly NoteViewModel _viewModel;

    public NotePage(NoteViewModel viewModel)
    {
        InitializeComponent();
        _viewModel = viewModel;
        BindingContext = _viewModel;
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();

        // Parse query parameter if navigating with ID
        if (BindingContext is NoteViewModel vm)
        {
            var idParam = this.GetQueryParameter("id");
            int? noteId = null;

            if (!string.IsNullOrEmpty(idParam) && int.TryParse(idParam, out int id))
            {
                noteId = id;
            }

            await vm.InitializeAsync(noteId);
        }
    }

    private string GetQueryParameter(string key)
    {
        if (Shell.Current.CurrentState.Location.OriginalString.Contains($"{key}="))
        {
            var query = Shell.Current.CurrentState.Location.OriginalString.Split('?')[1];
            var pairs = query.Split('&');
            foreach (var pair in pairs)
            {
                var parts = pair.Split('=');
                if (parts[0] == key)
                    return parts[1];
            }
        }
        return null;
    }
}
```

**XAML concepts explained**:

1. **Entry vs Editor**:
   - `<Entry>`: Single-line text input (for title)
   - `<Editor>`: Multi-line text input (for content)

2. **Picker for categories**:
   ```xml
   <Picker ItemsSource="{Binding Categories}"
           ItemDisplayBinding="{Binding Name}"
           SelectedItem="{Binding SelectedCategoryId}" />
   ```
   - **ItemsSource**: List of categories from ViewModel
   - **ItemDisplayBinding**: Show the `Name` property
   - **SelectedItem**: Two-way binding to selected category ID

3. **Conditional visibility**:
   ```xml
   <Button IsVisible="{Binding IsEditMode}" />
   ```
   - Delete button only shows when editing existing note
   - Uses boolean property binding

4. **Grid layout for buttons**:
   ```xml
   <Grid ColumnDefinitions="*,*" ColumnSpacing="10">
   ```
   - Two equal columns (`*` means "share space equally")
   - 10 pixels spacing between columns

### Create NotesPage.xaml (List Page)

This page shows all notes with filtering and pull-to-refresh.

**Location**: `StarterApp/Views/NotesPage.xaml`

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage x:Class="StarterApp.Views.NotesPage"
             xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             xmlns:vm="clr-namespace:StarterApp.ViewModels"
             xmlns:models="clr-namespace:StarterApp.Database.Models;assembly=StarterApp.Database"
             Title="{Binding Title}">

    <ContentPage.BindingContext>
        <vm:NotesViewModel />
    </ContentPage.BindingContext>

    <ContentPage.ToolbarItems>
        <!-- Add button in toolbar -->
        <ToolbarItem Text="Add"
                     Command="{Binding AddNoteCommand}"
                     IconImageSource="add_icon.png" />
    </ContentPage.ToolbarItems>

    <Grid RowDefinitions="Auto,*" Padding="0">

        <!-- Category Filter -->
        <Border Grid.Row="0"
                Margin="15,10"
                Stroke="{AppThemeBinding Light={StaticResource Gray300}, Dark={StaticResource Gray600}}"
                StrokeThickness="1"
                BackgroundColor="{AppThemeBinding Light={StaticResource White}, Dark={StaticResource Gray900}}">
            <Border.StrokeShape>
                <RoundRectangle CornerRadius="8" />
            </Border.StrokeShape>
            <Picker ItemsSource="{Binding Categories}"
                    ItemDisplayBinding="{Binding Name}"
                    SelectedItem="{Binding SelectedCategoryId}"
                    Title="Filter by category"
                    Margin="10" />
        </Border>

        <!-- Notes List with Pull-to-Refresh -->
        <RefreshView Grid.Row="1"
                     IsRefreshing="{Binding IsRefreshing}"
                     Command="{Binding RefreshCommand}">

            <CollectionView ItemsSource="{Binding Notes}"
                           SelectionMode="None">

                <!-- Empty state -->
                <CollectionView.EmptyView>
                    <StackLayout Padding="20" VerticalOptions="Center">
                        <Label Text="📝"
                               FontSize="48"
                               HorizontalOptions="Center" />
                        <Label Text="No notes yet"
                               FontSize="20"
                               FontAttributes="Bold"
                               HorizontalOptions="Center"
                               Margin="0,10,0,5" />
                        <Label Text="Tap the + button to create your first note"
                               HorizontalOptions="Center"
                               TextColor="{AppThemeBinding Light={StaticResource Gray600}, Dark={StaticResource Gray400}}" />
                    </StackLayout>
                </CollectionView.EmptyView>

                <!-- Note item template -->
                <CollectionView.ItemTemplate>
                    <DataTemplate x:DataType="models:Note">
                        <SwipeView>
                            <!-- Swipe actions -->
                            <SwipeView.RightItems>
                                <SwipeItems>
                                    <SwipeItem Text="Delete"
                                              BackgroundColor="#F44336"
                                              Command="{Binding Source={RelativeSource AncestorType={x:Type vm:NotesViewModel}}, Path=DeleteNoteCommand}"
                                              CommandParameter="{Binding .}" />
                                </SwipeItems>
                            </SwipeView.RightItems>

                            <!-- Note content -->
                            <Border Margin="15,5"
                                    Padding="15"
                                    Stroke="{AppThemeBinding Light={StaticResource Gray300}, Dark={StaticResource Gray600}}"
                                    StrokeThickness="1"
                                    BackgroundColor="{AppThemeBinding Light={StaticResource White}, Dark={StaticResource Gray900}}">
                                <Border.StrokeShape>
                                    <RoundRectangle CornerRadius="8" />
                                </Border.StrokeShape>

                                <Border.GestureRecognizers>
                                    <TapGestureRecognizer
                                        Command="{Binding Source={RelativeSource AncestorType={x:Type vm:NotesViewModel}}, Path=EditNoteCommand}"
                                        CommandParameter="{Binding .}" />
                                </Border.GestureRecognizers>

                                <Grid RowDefinitions="Auto,Auto,Auto,Auto" RowSpacing="5">

                                    <!-- Category badge -->
                                    <Border Grid.Row="0"
                                            BackgroundColor="{Binding Category.ColorHex}"
                                            Padding="8,4"
                                            HorizontalOptions="Start"
                                            IsVisible="{Binding Category, Converter={StaticResource IsNotNullConverter}}"
                                            Margin="0,0,0,5">
                                        <Border.StrokeShape>
                                            <RoundRectangle CornerRadius="4" />
                                        </Border.StrokeShape>
                                        <Label Text="{Binding Category.Name}"
                                               TextColor="White"
                                               FontSize="12"
                                               FontAttributes="Bold" />
                                    </Border>

                                    <!-- Title -->
                                    <Label Grid.Row="1"
                                           Text="{Binding Title}"
                                           FontSize="18"
                                           FontAttributes="Bold"
                                           LineBreakMode="TailTruncation" />

                                    <!-- Content preview -->
                                    <Label Grid.Row="2"
                                           Text="{Binding ContentPreview}"
                                           FontSize="14"
                                           TextColor="{AppThemeBinding Light={StaticResource Gray600}, Dark={StaticResource Gray400}}"
                                           LineBreakMode="TailTruncation"
                                           MaxLines="2" />

                                    <!-- Updated date -->
                                    <Label Grid.Row="3"
                                           Text="{Binding UpdatedAt, StringFormat='Updated {0:MMM dd, yyyy}'}"
                                           FontSize="12"
                                           TextColor="{AppThemeBinding Light={StaticResource Gray500}, Dark={StaticResource Gray500}}"
                                           Margin="0,5,0,0" />

                                </Grid>
                            </Border>
                        </SwipeView>
                    </DataTemplate>
                </CollectionView.ItemTemplate>

            </CollectionView>

        </RefreshView>

        <!-- Loading Indicator -->
        <ActivityIndicator Grid.Row="1"
                          IsVisible="{Binding IsBusy}"
                          IsRunning="{Binding IsBusy}"
                          Color="{AppThemeBinding Light={StaticResource Primary}, Dark={StaticResource PrimaryDark}}"
                          VerticalOptions="Center"
                          HorizontalOptions="Center" />

    </Grid>
</ContentPage>
```

**Create code-behind**: `StarterApp/Views/NotesPage.xaml.cs`

```csharp
using StarterApp.ViewModels;

namespace StarterApp.Views;

public partial class NotesPage : ContentPage
{
    private readonly NotesViewModel _viewModel;

    public NotesPage(NotesViewModel viewModel)
    {
        InitializeComponent();
        _viewModel = viewModel;
        BindingContext = _viewModel;
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();
        await _viewModel.InitializeAsync();
    }
}
```

**XAML concepts explained**:

1. **CollectionView**: Modern list control
   - Replaces older `ListView`
   - Better performance with large lists
   - `ItemsSource` binds to `ObservableCollection<Note>`

2. **EmptyView**: What shows when list is empty
   - Cleaner than checking collection count
   - Provides helpful message to users

3. **DataTemplate**: Defines how each item looks
   - `x:DataType="models:Note"` enables compiled bindings (faster)
   - Binding properties like `{Binding Title}` access Note properties

4. **SwipeView**: Swipe-to-delete gesture
   - Swipe left reveals delete button
   - Common mobile UX pattern

5. **TapGestureRecognizer**: Tap to navigate
   - When note tapped, executes `EditNoteCommand`
   - Passes the note as `CommandParameter`

6. **RelativeSource binding**: Access parent ViewModel from inside DataTemplate
   ```xml
   Command="{Binding Source={RelativeSource AncestorType={x:Type vm:NotesViewModel}}, Path=EditNoteCommand}"
   ```
   - DataTemplate context is `Note`, not `NotesViewModel`
   - `RelativeSource` climbs visual tree to find `NotesViewModel`
   - Then binds to `EditNoteCommand` on that ViewModel

7. **RefreshView**: Pull-to-refresh functionality
   - Common mobile pattern
   - Triggers `RefreshCommand` when pulled down

---

## 2.8: Update Shell Navigation

Shell provides a URI-based navigation system. We need to update it for our new pages.

### Update AppShell.xaml

**Location**: `StarterApp/AppShell.xaml`

Replace the content:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Shell x:Class="StarterApp.AppShell"
       xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
       xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
       xmlns:views="clr-namespace:StarterApp.Views"
       Shell.FlyoutBehavior="Flyout">

    <!-- Define flyout items (sidebar menu) -->
    <FlyoutItem Title="Notes" Icon="notes_icon.png">
        <ShellContent Title="My Notes"
                      ContentTemplate="{DataTemplate views:NotesPage}"
                      Route="notes" />
    </FlyoutItem>

    <FlyoutItem Title="About" Icon="info_icon.png">
        <ShellContent Title="About"
                      ContentTemplate="{DataTemplate views:AboutPage}"
                      Route="about" />
    </FlyoutItem>

</Shell>
```

**Update code-behind**: `StarterApp/AppShell.xaml.cs`

```csharp
using StarterApp.Views;

namespace StarterApp;

public partial class AppShell : Shell
{
    public AppShell()
    {
        InitializeComponent();

        // Register routes for navigation
        Routing.RegisterRoute("note", typeof(NotePage));
    }
}
```

**Shell concepts**:

1. **FlyoutBehavior="Flyout"**: Enables hamburger menu
   - Shows menu items in sidebar
   - Alternative: `Disabled` (no menu), `Locked` (always visible)

2. **ShellContent**: Defines a navigable page
   - **Route**: URI for navigation (`Shell.Current.GoToAsync("notes")`)
   - **ContentTemplate**: Which page to display

3. **RegisterRoute**: Register pages not in flyout
   - `Routing.RegisterRoute("note", typeof(NotePage))`
   - Allows navigation: `GoToAsync("note")` or `GoToAsync("note?id=5")`

---

## 2.9: Update MauiProgram.cs

Register our new ViewModels and Views in the dependency injection container.

**Location**: `StarterApp/MauiProgram.cs`

Update the service registration section:

```csharp
using Microsoft.Extensions.Logging;
using StarterApp.ViewModels;
using StarterApp.Database.Data;
using StarterApp.Views;
using System.Diagnostics;
using StarterApp.Services;

namespace StarterApp;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
            });

        // Database
        builder.Services.AddDbContext<AppDbContext>();

        // Services
        builder.Services.AddSingleton<INavigationService, NavigationService>();

        // Shell and App
        builder.Services.AddSingleton<AppShell>();
        builder.Services.AddSingleton<App>();

        // ViewModels and Views for Notes
        builder.Services.AddTransient<NotesViewModel>();
        builder.Services.AddTransient<NotesPage>();
        builder.Services.AddTransient<NoteViewModel>();
        builder.Services.AddTransient<NotePage>();

        // About page
        builder.Services.AddTransient<AboutPage>();

#if DEBUG
        builder.Logging.AddDebug();
#endif

        return builder.Build();
    }
}
```

**Changes explained**:

1. **Removed**: All authentication-related registrations
   - `IAuthenticationService`, `AuthenticationService`
   - `LoginViewModel`, `LoginPage`
   - `RegisterViewModel`, `RegisterPage`
   - User management ViewModels and Views

2. **Added**: Note-taking registrations
   - `NotesViewModel`, `NotesPage` (list)
   - `NoteViewModel`, `NotePage` (detail)

3. **Kept**: Infrastructure
   - `AppDbContext` (database access)
   - `INavigationService` (navigation helper)
   - `AppShell`, `App` (application shell)

4. **Transient vs Singleton**:
   - **Transient**: New instance every time (ViewModels, Pages)
     - Each navigation creates fresh ViewModel
     - Prevents stale data
   - **Singleton**: One instance shared (Services, Shell, App)
     - Maintains state across app lifetime
     - Better performance for services

---

## 2.10: Test the Application

Time to see our work in action!

### Build and Run

```bash
# Navigate to main app project
cd StarterApp

# Restore dependencies
dotnet restore

# Build
dotnet build

# Run on Windows
dotnet run

# OR run on Android emulator
dotnet build -t:Run -f net9.0-android
```

### Verification Steps

Test each feature systematically:

#### 1. View Empty State

When app launches, you should see:
- "My Notes" title
- Category filter picker (showing "All Categories")
- Empty state message: "No notes yet"
- "+" button in toolbar

{: .note }
**If you see errors**: Check Output window for exceptions. Common issues: database connection, missing DbContext registration, navigation route not registered.

#### 2. Create First Note

1. **Tap "+" button**
2. **Verify navigation** to "New Note" page
3. **Fill in**:
   - Title: "My First Note"
   - Category: Select "Personal"
   - Content: "This is a test note created in my new MAUI app!"
4. **Tap "Create" button**
5. **Verify**:
   - Navigates back to list
   - Note appears in list
   - Shows "Personal" category badge (green)
   - Shows content preview
   - Shows today's date

#### 3. Test Category Filter

1. **Create more notes** in different categories:
   - "Shopping List" in Shopping category
   - "Project Deadline" in Work category
   - "Study Chapter 5" in Study category

2. **Test filter**:
   - Select "Work" from filter picker
   - Should only show "Project Deadline"
   - Select "All Categories"
   - Should show all notes

#### 4. Test Edit Note

1. **Tap on "My First Note"**
2. **Verify** page shows:
   - Title "Edit Note"
   - Existing title, content, category loaded
   - "Update" button (not "Create")
   - "Delete Note" button visible

3. **Modify**:
   - Change title to "My Updated Note"
   - Add more content
   - Change category

4. **Tap "Update"**
5. **Verify** changes saved in list

#### 5. Test Delete Note

**Option A: From detail page**
1. Open note
2. Scroll to bottom
3. Tap "Delete Note" button
4. Confirm deletion
5. Verify returns to list without note

**Option B: From list (swipe)**
1. Swipe left on note
2. Tap red "Delete" button
3. Verify note removed from list

#### 6. Test Pull-to-Refresh

1. Pull down on notes list
2. Watch spinner appear
3. List refreshes
4. Verify notes still display correctly

#### 7. Verify Database Persistence

1. **Close app completely**
2. **Restart app**
3. **Verify** all notes still exist
   - Data persisted to PostgreSQL
   - Not stored in memory

### Common Issues and Fixes

#### Issue: "DbContext not registered"

**Error**: `Unable to resolve service for type 'AppDbContext'`

**Fix**: Check `MauiProgram.cs` has:
```csharp
builder.Services.AddDbContext<AppDbContext>();
```

#### Issue: "Route not found"

**Error**: `Unable to navigate to: note`

**Fix**: Check `AppShell.xaml.cs` has:
```csharp
Routing.RegisterRoute("note", typeof(NotePage));
```

#### Issue: Categories not showing in picker

**Cause**: ViewModels not calling `InitializeAsync`

**Fix**: Check `NotePage.xaml.cs` and `NotesPage.xaml.cs` call `InitializeAsync` in `OnAppearing`

#### Issue: Changes not saving

**Cause**: Forgot to call `SaveChangesAsync()`

**Fix**: Verify all ViewModel save methods have:
```csharp
await _context.SaveChangesAsync();
```

#### Issue: Swipe-to-delete not working

**Cause**: Platform-specific gesture recognition

**Fix**:
- Android: Ensure swiping left-to-right
- Some emulators don't support gestures well - try real device

---

## 2.11: Understanding What We Built

Let's reflect on the architecture we've created.

### Data Flow Review

**Creating a new note**:
```
User taps "+"
  → NotesViewModel.AddNoteCommand
  → Shell navigates to "note" route
  → NotePage displays
  → NoteViewModel.InitializeAsync() loads categories
  → User fills form
  → User taps "Create"
  → NoteViewModel.SaveCommand
  → Creates new Note entity
  → context.Notes.Add(note)
  → await context.SaveChangesAsync()
  → PostgreSQL INSERT executed
  → Navigates back to NotesPage
  → NotesPage.OnAppearing()
  → NotesViewModel.LoadNotesAsync()
  → SELECT * FROM notes with includes
  → ObservableCollection updated
  → UI automatically refreshes
```

**Editing existing note**:
```
User taps note in list
  → NotesViewModel.EditNoteCommand
  → Shell navigates to "note?id=5"
  → NotePage extracts query parameter
  → NoteViewModel.InitializeAsync(5)
  → context.Notes.FindAsync(5)
  → Loads note from database
  → Populates form fields
  → User modifies content
  → User taps "Update"
  → NoteViewModel.SaveCommand
  → Finds existing note
  → Updates properties
  → await context.SaveChangesAsync()
  → PostgreSQL UPDATE executed
  → Navigates back to list
  → List refreshes with updated data
```

### Architecture Layers

**1. View Layer (XAML)**:
- `NotesPage.xaml`: List of notes
- `NotePage.xaml`: Single note detail
- Pure UI markup, no business logic
- Data binding expressions connect to ViewModel

**2. ViewModel Layer (C#)**:
- `NotesViewModel`: Manages list state, filtering, commands
- `NoteViewModel`: Manages single note editing, validation
- Orchestrates business logic
- Uses services (DbContext) for data access
- Implements `INotifyPropertyChanged` via `ObservableObject`

**3. Data Layer (Database project)**:
- `AppDbContext`: EF Core context
- `Note`, `Category`: Domain models
- Migrations: Schema versioning
- Lives in separate project for reusability

**4. Database (PostgreSQL)**:
- `notes` table
- `categories` table
- Foreign key relationship
- Indexes for performance

### MVVM Pattern Benefits Realized

**Testability**:
```csharp
// Can unit test ViewModels without UI
var mockContext = new Mock<AppDbContext>();
var viewModel = new NoteViewModel(mockContext.Object);
viewModel.Title = "Test";
viewModel.Content = "Test content";
await viewModel.SaveCommand.ExecuteAsync(null);
Assert.IsTrue(mockContext.Verify(x => x.SaveChangesAsync()));
```

**Reusability**:
- ViewModels shared across iOS, Android, Windows
- Views adapt to platform (automatically by MAUI)
- Same business logic everywhere

**Maintainability**:
- Change database? Update AppDbContext only
- Change UI? Update XAML only
- Add feature? Clear location for code

### What Makes This Production-Quality?

1. **Separation of concerns**: View, ViewModel, Model, Data clearly separated
2. **Dependency injection**: Loose coupling, easy testing
3. **Async/await throughout**: Non-blocking UI operations
4. **Error handling**: Try-catch blocks with user-friendly messages
5. **Input validation**: Check required fields before saving
6. **Confirmation dialogs**: "Are you sure?" before deleting
7. **Loading indicators**: `IsBusy` shows user when operations running
8. **Pull-to-refresh**: Common mobile UX pattern
9. **Empty states**: Helpful messages when no data
10. **Database relationships**: Proper foreign keys and navigation properties

---

## Summary and Next Steps

In this part, you:

- Removed authentication complexity from StarterApp
- Designed new domain models (`Note`, `Category`) with proper relationships
- Configured Entity Framework with constraints, indexes, and delete behavior
- Created and applied database migrations, including data seeding
- Built ViewModels using CommunityToolkit.Mvvm source generators
- Created XAML views with data binding, CollectionView, SwipeView
- Updated Shell navigation with routes and flyout menu
- Registered services in dependency injection container
- **Tested complete CRUD functionality end-to-end**

### Teaching Moments Recap

- **Refactoring existing code** is a critical real-world skill
- **Domain model design** starts with understanding relationships (one-to-many, optional foreign keys)
- **Entity Framework conventions** can be overridden with attributes (`[Table]`, `[ForeignKey]`, `[NotMapped]`)
- **Migrations** track schema evolution; delete and recreate when doing major refactoring
- **Data seeding** improves UX by providing default data
- **ObservableCollection** automatically updates UI when items added/removed
- **CommunityToolkit.Mvvm** reduces boilerplate with source generators
- **Shell navigation** provides URI-based navigation with query parameters
- **Dependency injection** makes code testable and maintainable

### What We Didn't Cover (Yet)

- **Repository pattern** for data abstraction (Part 3)
- **Advanced migrations** for schema evolution (Part 4)
- **Unit testing** ViewModels and services (Part 5)
- **REST API integration** (Future tutorial)

### Next Part

Now that you have a working note-taking app with direct database access, you're ready to add an abstraction layer.

**[Part 3: Add Repository Pattern →](part3-repository-pattern.md)**

In Part 3, you'll:
- Design `INoteRepository` interface
- Implement `NoteRepository` for local database
- Refactor ViewModels to use repository instead of DbContext
- Understand why this prepares for REST API integration
- Learn dependency injection for swappable implementations

---

**Estimated time for Part 3**: 60-90 minutes

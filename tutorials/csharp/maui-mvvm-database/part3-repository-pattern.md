---
layout: default
title: "Part 3: Add Repository Pattern"
parent: MAUI + MVVM + Database
grand_parent: C# Tutorials
nav_order: 3
---

# Part 3: Add Repository Pattern

{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Learning Objectives

By the end of this part, you will:

- ✅ Understand the Repository Pattern and its benefits
- ✅ Design a repository interface (INoteRepository)
- ✅ Implement a local database repository (NoteRepository)
- ✅ Refactor ViewModels to use repository abstraction
- ✅ Configure dependency injection for repository pattern
- ✅ Understand how this prepares for API integration
- ✅ **Master data access abstraction for testability and flexibility**

**Estimated time**: 60-90 minutes

---

## 3.1: Understanding the Repository Pattern

Before writing code, let's understand what we're building and why it matters.

### What is the Repository Pattern?

The **Repository Pattern** is a design pattern that creates an abstraction layer between your business logic (ViewModels) and data access logic (DbContext, APIs, file storage).

**Core concept**: Instead of ViewModels talking directly to the database, they talk to a repository interface. The repository implementation handles the actual data access.

```
WITHOUT REPOSITORY:
┌─────────────────┐
│   ViewModel     │
│─────────────────│
│ _context.Notes  │  ← Direct database knowledge
│ .Where(...)     │  ← EF Core-specific code
│ .Include(...)   │  ← Can't easily switch to API
└─────────────────┘
         │
         ▼
┌─────────────────┐
│   DbContext     │
│   (EF Core)     │
└─────────────────┘

WITH REPOSITORY:
┌─────────────────┐
│   ViewModel     │
│─────────────────│
│ _repository     │  ← No database knowledge
│ .GetAllAsync()  │  ← Simple interface
│ .SaveAsync()    │  ← Implementation-agnostic
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  INoteRepository│  ← Interface (contract)
│   (Interface)   │
└─────────────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌────────┐
│  Local │ │  API   │  ← Swappable implementations
│  Repo  │ │  Repo  │
└────────┘ └────────┘
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│DbContext│ │HttpClient│
└────────┘ └────────┘
```

### Current Problem: ViewModels Know Too Much

In Part 2, we wrote ViewModels that directly use `AppDbContext`:

```csharp
public class NotesViewModel : BaseViewModel
{
    private readonly AppDbContext _context;  // ❌ Tight coupling to EF Core

    [RelayCommand]
    private async Task LoadNotesAsync()
    {
        // ❌ ViewModel knows about:
        // - Entity Framework Include() method
        // - Database query structure
        // - OrderByDescending() LINQ syntax
        var notesList = await _context.Notes
            .Include(n => n.Category)
            .OrderByDescending(n => n.UpdatedAt)
            .ToListAsync();
    }
}
```

**Problems with this approach**:

1. **Can't easily switch to REST API**: If you later build a web API, you'd have to rewrite all ViewModels
2. **Hard to test**: Requires real database or complex mocking
3. **Tight coupling**: ViewModel depends on EF Core implementation details
4. **Duplicate code**: Similar queries repeated across ViewModels
5. **No abstraction**: Can't swap implementations (local DB, API, cache, file storage)

### Solution: Repository Pattern

```csharp
public class NotesViewModel : BaseViewModel
{
    private readonly INoteRepository _repository;  // ✅ Depends on interface

    [RelayCommand]
    private async Task LoadNotesAsync()
    {
        // ✅ ViewModel only knows:
        // - Simple interface methods
        // - No database details
        // - No EF Core knowledge
        var notesList = await _repository.GetAllNotesAsync(SelectedCategoryId);
    }
}
```

**Benefits**:

1. **Swappable implementations**: Change from local DB to API by registering different implementation
2. **Easy testing**: Mock the interface without database
3. **Loose coupling**: ViewModel doesn't know about data source
4. **Reusable code**: Query logic centralized in repository
5. **Clear abstractions**: Interface defines the contract

### Visualizing the Architecture

**Current architecture (Part 2)**:

```
┌──────────────────────────────────────────┐
│           MAUI Application               │
│  ┌────────────────────────────────────┐  │
│  │      ViewModels                    │  │
│  │  - NotesViewModel                  │  │
│  │  - NoteViewModel                   │  │
│  │                                    │  │
│  │  Directly use AppDbContext ❌      │  │
│  └─────────────┬──────────────────────┘  │
└────────────────┼─────────────────────────┘
                 │
┌────────────────▼─────────────────────────┐
│     StarterApp.Database Library          │
│  ┌────────────────────────────────────┐  │
│  │      AppDbContext (EF Core)        │  │
│  └─────────────┬──────────────────────┘  │
└────────────────┼─────────────────────────┘
                 │
┌────────────────▼─────────────────────────┐
│      PostgreSQL Database                 │
└──────────────────────────────────────────┘
```

**Target architecture (Part 3)**:

```
┌──────────────────────────────────────────┐
│           MAUI Application               │
│  ┌────────────────────────────────────┐  │
│  │      ViewModels                    │  │
│  │  - NotesViewModel                  │  │
│  │  - NoteViewModel                   │  │
│  │                                    │  │
│  │  Use INoteRepository ✅            │  │
│  └─────────────┬──────────────────────┘  │
└────────────────┼─────────────────────────┘
                 │
┌────────────────▼─────────────────────────┐
│     StarterApp.Database Library          │
│  ┌────────────────────────────────────┐  │
│  │  INoteRepository (Interface) ✅    │  │
│  └───┬────────────────────────────────┘  │
│      │                                   │
│  ┌───▼──────────────┐  ┌──────────────┐ │
│  │ NoteRepository   │  │ ApiNoteRepo  │ │
│  │ (Local DB) ✅    │  │ (Future) 📋  │ │
│  └───┬──────────────┘  └──────────────┘ │
│      │                                   │
│  ┌───▼────────────────────────────────┐ │
│  │      AppDbContext (EF Core)        │ │
│  └────────────────────────────────────┘ │
└────────────────┼─────────────────────────┘
                 │
┌────────────────▼─────────────────────────┐
│      PostgreSQL Database                 │
└──────────────────────────────────────────┘
```

**Key difference**: An abstraction layer (INoteRepository) sits between ViewModels and data access.

---

## 3.2: Design the Repository Interface

Let's design the contract that all repository implementations must follow.

### Identify Required Operations

Think about what operations our ViewModels need:

**From NotesViewModel**:
- Get all notes (with optional category filter)
- Get notes for a specific category
- Delete a note
- Get all categories

**From NoteViewModel**:
- Get a note by ID
- Create a new note
- Update an existing note
- Delete a note
- Get all categories (for picker)

**Consolidated requirements**:
1. Get all notes (with optional filtering)
2. Get note by ID
3. Create note
4. Update note
5. Delete note
6. Get all categories

### Create INoteRepository.cs

**Location**: `StarterApp.Database/Repositories/INoteRepository.cs`

Create the `Repositories` folder and file:

```bash
# Navigate to Database project
cd StarterApp.Database

# Create Repositories directory
mkdir Repositories

# Create interface file (manual creation or using your editor)
```

**File content**:

```csharp
using StarterApp.Database.Models;

namespace StarterApp.Database.Repositories;

/// <summary>
/// Repository interface for Note and Category data access.
/// Abstracts the data source (local database, REST API, cache, etc.)
/// </summary>
public interface INoteRepository
{
    // ==================== Note Operations ====================

    /// <summary>
    /// Get all notes, optionally filtered by category
    /// </summary>
    /// <param name="categoryId">Filter by category ID. Null returns all notes.</param>
    /// <returns>List of notes with category information included</returns>
    Task<List<Note>> GetAllNotesAsync(int? categoryId = null);

    /// <summary>
    /// Get a single note by ID
    /// </summary>
    /// <param name="id">Note ID</param>
    /// <returns>Note with category information, or null if not found</returns>
    Task<Note?> GetNoteByIdAsync(int id);

    /// <summary>
    /// Create a new note
    /// </summary>
    /// <param name="note">Note to create (Id will be generated)</param>
    /// <returns>Created note with generated ID</returns>
    Task<Note> CreateNoteAsync(Note note);

    /// <summary>
    /// Update an existing note
    /// </summary>
    /// <param name="note">Note with updated properties</param>
    /// <returns>Updated note, or null if not found</returns>
    Task<Note?> UpdateNoteAsync(Note note);

    /// <summary>
    /// Delete a note by ID
    /// </summary>
    /// <param name="id">Note ID to delete</param>
    /// <returns>True if deleted, false if not found</returns>
    Task<bool> DeleteNoteAsync(int id);

    // ==================== Category Operations ====================

    /// <summary>
    /// Get all categories
    /// </summary>
    /// <returns>List of all categories ordered by name</returns>
    Task<List<Category>> GetAllCategoriesAsync();

    /// <summary>
    /// Get a single category by ID
    /// </summary>
    /// <param name="id">Category ID</param>
    /// <returns>Category or null if not found</returns>
    Task<Category?> GetCategoryByIdAsync(int id);

    /// <summary>
    /// Create a new category
    /// </summary>
    /// <param name="category">Category to create</param>
    /// <returns>Created category with generated ID</returns>
    Task<Category> CreateCategoryAsync(Category category);

    /// <summary>
    /// Update an existing category
    /// </summary>
    /// <param name="category">Category with updated properties</param>
    /// <returns>Updated category, or null if not found</returns>
    Task<Category?> UpdateCategoryAsync(Category category);

    /// <summary>
    /// Delete a category by ID
    /// </summary>
    /// <param name="id">Category ID to delete</param>
    /// <returns>True if deleted, false if not found</returns>
    /// <remarks>
    /// Notes in this category will have CategoryId set to NULL (based on DbContext configuration)
    /// </remarks>
    Task<bool> DeleteCategoryAsync(int id);
}
```

### Interface Design Principles Explained

**1. Return Task<T> for async operations**:
```csharp
Task<List<Note>> GetAllNotesAsync(int? categoryId = null);
```
- All methods async (non-blocking UI)
- Prefix with `Async` by convention
- Return `Task<T>` instead of just `T`

**2. Nullable return types for "not found" scenarios**:
```csharp
Task<Note?> GetNoteByIdAsync(int id);  // Returns null if not found
```
- `Note?` means "Note or null"
- Alternative: Throw exception (less common for not found)
- Allows caller to check: `if (note == null) { ... }`

**3. Return bool for delete operations**:
```csharp
Task<bool> DeleteNoteAsync(int id);  // True if deleted, false if not found
```
- Caller knows if delete succeeded
- Alternative: Return void and throw if not found

**4. Optional parameters for flexibility**:
```csharp
Task<List<Note>> GetAllNotesAsync(int? categoryId = null);
```
- `categoryId = null` means parameter is optional
- `GetAllNotesAsync()` returns all notes
- `GetAllNotesAsync(2)` returns notes in category 2

**5. Include related entities by default**:
```csharp
/// <returns>List of notes with category information included</returns>
```
- Notes include their Category property populated
- Avoids N+1 query problem
- Caller doesn't need to remember to load categories

**6. XML documentation comments**:
```csharp
/// <summary>
/// Get all notes, optionally filtered by category
/// </summary>
/// <param name="categoryId">Filter by category ID. Null returns all notes.</param>
/// <returns>List of notes with category information included</returns>
```
- IntelliSense shows descriptions
- Documents behavior and parameters
- Helps other developers understand usage

{: .note }
**Why such detailed XML comments?** When you hover over a method in VS Code, you see these comments. They serve as inline documentation, reducing the need to read implementation code.

---

## 3.3: Implement Local Database Repository

Now let's implement the interface using Entity Framework Core and PostgreSQL.

### Create NoteRepository.cs

**Location**: `StarterApp.Database/Repositories/NoteRepository.cs`

```csharp
using Microsoft.EntityFrameworkCore;
using StarterApp.Database.Data;
using StarterApp.Database.Models;

namespace StarterApp.Database.Repositories;

/// <summary>
/// Implementation of INoteRepository using Entity Framework Core and PostgreSQL.
/// Provides local database persistence for notes and categories.
/// </summary>
public class NoteRepository : INoteRepository
{
    private readonly AppDbContext _context;

    public NoteRepository(AppDbContext context)
    {
        _context = context;
    }

    // ==================== Note Operations ====================

    /// <inheritdoc/>
    public async Task<List<Note>> GetAllNotesAsync(int? categoryId = null)
    {
        try
        {
            // Start with base query including category navigation property
            IQueryable<Note> query = _context.Notes.Include(n => n.Category);

            // Apply category filter if specified
            if (categoryId.HasValue && categoryId.Value > 0)
            {
                query = query.Where(n => n.CategoryId == categoryId.Value);
            }

            // Order by most recently updated first
            var notes = await query
                .OrderByDescending(n => n.UpdatedAt)
                .ToListAsync();

            return notes;
        }
        catch (Exception ex)
        {
            // In production, use proper logging (ILogger)
            Console.WriteLine($"Error loading notes: {ex.Message}");
            throw; // Re-throw so caller can handle
        }
    }

    /// <inheritdoc/>
    public async Task<Note?> GetNoteByIdAsync(int id)
    {
        try
        {
            var note = await _context.Notes
                .Include(n => n.Category)  // Include category information
                .FirstOrDefaultAsync(n => n.Id == id);

            return note;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error loading note {id}: {ex.Message}");
            throw;
        }
    }

    /// <inheritdoc/>
    public async Task<Note> CreateNoteAsync(Note note)
    {
        try
        {
            // Set timestamps
            note.CreatedAt = DateTime.UtcNow;
            note.UpdatedAt = DateTime.UtcNow;

            // Add to context
            _context.Notes.Add(note);

            // Save to database
            await _context.SaveChangesAsync();

            // Load the category navigation property
            if (note.CategoryId.HasValue)
            {
                await _context.Entry(note)
                    .Reference(n => n.Category)
                    .LoadAsync();
            }

            return note;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating note: {ex.Message}");
            throw;
        }
    }

    /// <inheritdoc/>
    public async Task<Note?> UpdateNoteAsync(Note note)
    {
        try
        {
            // Check if note exists
            var existingNote = await _context.Notes.FindAsync(note.Id);
            if (existingNote == null)
            {
                return null;  // Not found
            }

            // Update properties
            existingNote.Title = note.Title;
            existingNote.Content = note.Content;
            existingNote.CategoryId = note.CategoryId;
            existingNote.UpdatedAt = DateTime.UtcNow;

            // Save changes
            await _context.SaveChangesAsync();

            // Reload with category
            await _context.Entry(existingNote)
                .Reference(n => n.Category)
                .LoadAsync();

            return existingNote;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating note {note.Id}: {ex.Message}");
            throw;
        }
    }

    /// <inheritdoc/>
    public async Task<bool> DeleteNoteAsync(int id)
    {
        try
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return false;  // Not found
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting note {id}: {ex.Message}");
            throw;
        }
    }

    // ==================== Category Operations ====================

    /// <inheritdoc/>
    public async Task<List<Category>> GetAllCategoriesAsync()
    {
        try
        {
            var categories = await _context.Categories
                .OrderBy(c => c.Name)
                .ToListAsync();

            return categories;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error loading categories: {ex.Message}");
            throw;
        }
    }

    /// <inheritdoc/>
    public async Task<Category?> GetCategoryByIdAsync(int id)
    {
        try
        {
            var category = await _context.Categories
                .Include(c => c.Notes)  // Include related notes
                .FirstOrDefaultAsync(c => c.Id == id);

            return category;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error loading category {id}: {ex.Message}");
            throw;
        }
    }

    /// <inheritdoc/>
    public async Task<Category> CreateCategoryAsync(Category category)
    {
        try
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return category;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating category: {ex.Message}");
            throw;
        }
    }

    /// <inheritdoc/>
    public async Task<Category?> UpdateCategoryAsync(Category category)
    {
        try
        {
            var existingCategory = await _context.Categories.FindAsync(category.Id);
            if (existingCategory == null)
            {
                return null;
            }

            existingCategory.Name = category.Name;
            existingCategory.ColorHex = category.ColorHex;
            existingCategory.Description = category.Description;

            await _context.SaveChangesAsync();

            return existingCategory;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating category {category.Id}: {ex.Message}");
            throw;
        }
    }

    /// <inheritdoc/>
    public async Task<bool> DeleteCategoryAsync(int id)
    {
        try
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return false;
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            // Notes in this category will have CategoryId set to NULL
            // (based on OnDelete(DeleteBehavior.SetNull) in DbContext configuration)

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting category {id}: {ex.Message}");
            throw;
        }
    }
}
```

### Implementation Details Explained

**1. Constructor injection**:
```csharp
private readonly AppDbContext _context;

public NoteRepository(AppDbContext context)
{
    _context = context;
}
```
- Repository receives DbContext via dependency injection
- Repository doesn't create DbContext (IoC principle)
- Testable: Can inject mock DbContext for unit tests

**2. Include() for eager loading**:
```csharp
_context.Notes.Include(n => n.Category)
```
- **Eager loading**: Load related entities in same query
- Without `Include()`: Accessing `note.Category` triggers separate query (N+1 problem)
- With `Include()`: Single JOIN query loads both notes and categories

**Example without Include (BAD)**:
```csharp
// Query 1: Load notes
var notes = await _context.Notes.ToListAsync();  // SELECT * FROM notes

// For each note, accessing category triggers query
foreach (var note in notes)
{
    var categoryName = note.Category.Name;  // SELECT * FROM categories WHERE id = ?
}
// Result: 1 + N queries (1 for notes + 1 per note for category) = 101 queries for 100 notes!
```

**Example with Include (GOOD)**:
```csharp
// Single query with JOIN
var notes = await _context.Notes.Include(n => n.Category).ToListAsync();
// SELECT n.*, c.* FROM notes n LEFT JOIN categories c ON n.category_id = c.id

// Accessing category doesn't trigger query - already loaded
foreach (var note in notes)
{
    var categoryName = note.Category.Name;  // No query - data already in memory
}
// Result: 1 query total
```

**3. Setting timestamps**:
```csharp
note.CreatedAt = DateTime.UtcNow;
note.UpdatedAt = DateTime.UtcNow;
```
- `DateTime.UtcNow` uses UTC (universal time), not local time
- Prevents timezone issues if server/client in different locations
- Alternative: Configure in DbContext with `OnModelCreating`

**4. Loading navigation properties after save**:
```csharp
await _context.Entry(note)
    .Reference(n => n.Category)
    .LoadAsync();
```
- After creating note, category navigation property is null
- Explicitly load it so returned note has category populated
- Alternative: Query again with `Include()`

**5. Update pattern: Load, Modify, Save**:
```csharp
var existingNote = await _context.Notes.FindAsync(note.Id);
if (existingNote == null) return null;

existingNote.Title = note.Title;  // Modify properties
existingNote.Content = note.Content;

await _context.SaveChangesAsync();  // Generates UPDATE SQL
```
- EF Core tracks changes to loaded entities
- Modifying properties marks entity as "Modified"
- `SaveChangesAsync()` generates UPDATE for modified properties only
- Alternative: `_context.Update(note)` (updates ALL properties)

**6. Delete behavior and cascading**:
```csharp
_context.Categories.Remove(category);
await _context.SaveChangesAsync();
// Notes in this category will have CategoryId set to NULL
```
- We configured `OnDelete(DeleteBehavior.SetNull)` in `AppDbContext.OnModelCreating`
- When category deleted, notes aren't deleted (good!)
- Instead, their `CategoryId` becomes `NULL`
- Alternative: `DeleteBehavior.Cascade` (deletes notes too - usually not desired)

**7. Error handling strategy**:
```csharp
catch (Exception ex)
{
    Console.WriteLine($"Error loading notes: {ex.Message}");
    throw;  // Re-throw to let caller handle
}
```
- Log error for debugging
- Re-throw so ViewModel can catch and display user-friendly message
- Production: Use `ILogger` instead of `Console.WriteLine`

{: .highlight }
**Teaching Moment - Repository Benefits Already Visible**:
- All EF Core complexity hidden in repository
- ViewModels will use simple methods: `GetAllNotesAsync()`, `CreateNoteAsync()`
- If we switch to API later, ViewModels don't change at all!

---

## 3.4: Refactor ViewModels to Use Repository

Now let's update our ViewModels to use the repository instead of DbContext directly.

### Update NoteViewModel.cs

**Location**: `StarterApp/ViewModels/NoteViewModel.cs`

**Before (using DbContext directly)**:
```csharp
public partial class NoteViewModel : BaseViewModel
{
    private readonly AppDbContext _context;  // ❌ Direct database dependency

    public NoteViewModel(AppDbContext context)
    {
        _context = context;
    }

    public async Task InitializeAsync(int? noteId = null)
    {
        // ❌ EF Core-specific code
        Categories = await _context.Categories.OrderBy(c => c.Name).ToListAsync();

        if (noteId.HasValue)
        {
            var note = await _context.Notes.FindAsync(noteId.Value);
            // ... populate properties
        }
    }

    [RelayCommand]
    private async Task SaveAsync()
    {
        // ❌ Direct database manipulation
        if (IsEditMode && _noteId.HasValue)
        {
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
        await Shell.Current.GoToAsync("..");
    }
}
```

**After (using repository)**:

Replace the entire file content:

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using StarterApp.Database.Models;
using StarterApp.Database.Repositories;

namespace StarterApp.ViewModels;

/// <summary>
/// ViewModel for creating or editing a single note
/// </summary>
public partial class NoteViewModel : BaseViewModel
{
    private readonly INoteRepository _repository;  // ✅ Depends on interface
    private int? _noteId;

    [ObservableProperty]
    private string title = string.Empty;

    [ObservableProperty]
    private string content = string.Empty;

    [ObservableProperty]
    private int? selectedCategoryId;

    [ObservableProperty]
    private List<Category> categories = new();

    [ObservableProperty]
    private bool isEditMode;

    public NoteViewModel(INoteRepository repository)  // ✅ Constructor injection
    {
        _repository = repository;
        Title = "New Note";
    }

    /// <summary>
    /// Load categories and optionally load an existing note
    /// </summary>
    public async Task InitializeAsync(int? noteId = null)
    {
        try
        {
            IsBusy = true;

            // ✅ Simple interface method - no EF Core knowledge
            Categories = await _repository.GetAllCategoriesAsync();

            if (noteId.HasValue)
            {
                // Edit mode: Load existing note
                _noteId = noteId.Value;
                IsEditMode = true;
                Title = "Edit Note";

                // ✅ Repository handles Include() and database details
                var note = await _repository.GetNoteByIdAsync(noteId.Value);
                if (note != null)
                {
                    this.title = note.Title;
                    this.content = note.Content;
                    this.selectedCategoryId = note.CategoryId;

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
            ErrorMessage = $"Failed to load: {ex.Message}";
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
            ErrorMessage = "Title is required";
            return;
        }

        if (string.IsNullOrWhiteSpace(Content))
        {
            ErrorMessage = "Content is required";
            return;
        }

        try
        {
            IsBusy = true;
            ErrorMessage = string.Empty;

            if (IsEditMode && _noteId.HasValue)
            {
                // ✅ Update: Repository handles finding and updating
                var note = new Note
                {
                    Id = _noteId.Value,
                    Title = Title,
                    Content = Content,
                    CategoryId = SelectedCategoryId
                };

                await _repository.UpdateNoteAsync(note);
            }
            else
            {
                // ✅ Create: Repository handles timestamps and saving
                var note = new Note
                {
                    Title = Title,
                    Content = Content,
                    CategoryId = SelectedCategoryId
                };

                await _repository.CreateNoteAsync(note);
            }

            // Navigate back to list
            await Shell.Current.GoToAsync("..");
        }
        catch (Exception ex)
        {
            ErrorMessage = $"Failed to save: {ex.Message}";
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

            // ✅ Repository handles deletion
            var deleted = await _repository.DeleteNoteAsync(_noteId.Value);

            if (deleted)
            {
                await Shell.Current.GoToAsync("..");
            }
            else
            {
                ErrorMessage = "Note not found";
            }
        }
        catch (Exception ex)
        {
            ErrorMessage = $"Failed to delete: {ex.Message}";
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

**Key changes**:
1. **Dependency changed**: `INoteRepository` instead of `AppDbContext`
2. **Simpler code**: No EF Core-specific methods (`Include`, `FindAsync`, `SaveChangesAsync`)
3. **No timestamp management**: Repository handles `CreatedAt` and `UpdatedAt`
4. **Clear methods**: `CreateNoteAsync()`, `UpdateNoteAsync()`, `DeleteNoteAsync()`

### Update NotesViewModel.cs

**Location**: `StarterApp/ViewModels/NotesViewModel.cs`

**Before (using DbContext)**:
```csharp
public partial class NotesViewModel : BaseViewModel
{
    private readonly AppDbContext _context;

    [RelayCommand]
    private async Task LoadNotesAsync()
    {
        IQueryable<Note> query = _context.Notes.Include(n => n.Category);

        if (SelectedCategoryId.HasValue && SelectedCategoryId.Value > 0)
        {
            query = query.Where(n => n.CategoryId == SelectedCategoryId.Value);
        }

        var notesList = await query
            .OrderByDescending(n => n.UpdatedAt)
            .ToListAsync();

        Notes.Clear();
        foreach (var note in notesList)
        {
            Notes.Add(note);
        }
    }
}
```

**After (using repository)**:

Replace the entire file content:

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using StarterApp.Database.Models;
using StarterApp.Database.Repositories;
using System.Collections.ObjectModel;

namespace StarterApp.ViewModels;

/// <summary>
/// ViewModel for displaying list of all notes
/// </summary>
public partial class NotesViewModel : BaseViewModel
{
    private readonly INoteRepository _repository;  // ✅ Depends on interface

    [ObservableProperty]
    private ObservableCollection<Note> notes = new();

    [ObservableProperty]
    private List<Category> categories = new();

    [ObservableProperty]
    private int? selectedCategoryId;

    [ObservableProperty]
    private bool isRefreshing;

    public NotesViewModel(INoteRepository repository)  // ✅ Constructor injection
    {
        _repository = repository;
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
    /// Load all categories for filter picker
    /// </summary>
    private async Task LoadCategoriesAsync()
    {
        try
        {
            // ✅ Simple repository method
            var allCategories = await _repository.GetAllCategoriesAsync();

            // Add "All" option
            Categories = new List<Category>
            {
                new Category { Id = 0, Name = "All Categories" }
            };
            Categories.AddRange(allCategories);
        }
        catch (Exception ex)
        {
            ErrorMessage = $"Failed to load categories: {ex.Message}";
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
            ErrorMessage = string.Empty;

            // ✅ Repository handles filtering, includes, and ordering
            // No EF Core knowledge needed!
            var notesList = await _repository.GetAllNotesAsync(SelectedCategoryId);

            Notes.Clear();
            foreach (var note in notesList)
            {
                Notes.Add(note);
            }
        }
        catch (Exception ex)
        {
            ErrorMessage = $"Failed to load notes: {ex.Message}";
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

            // ✅ Repository handles deletion
            var deleted = await _repository.DeleteNoteAsync(note.Id);

            if (deleted)
            {
                Notes.Remove(note);
            }
            else
            {
                ErrorMessage = "Note not found";
            }
        }
        catch (Exception ex)
        {
            ErrorMessage = $"Failed to delete note: {ex.Message}";
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

**Key improvements**:
1. **Single line to load notes**: `await _repository.GetAllNotesAsync(SelectedCategoryId)`
2. **No LINQ queries**: Repository handles filtering and ordering
3. **No Include()**: Repository ensures categories are loaded
4. **Testable**: Can mock `INoteRepository` without database

### Side-by-Side Comparison

**Before (DbContext)**:
```csharp
// ❌ ViewModel knows about EF Core, database structure, LINQ
[RelayCommand]
private async Task LoadNotesAsync()
{
    IQueryable<Note> query = _context.Notes.Include(n => n.Category);

    if (SelectedCategoryId.HasValue && SelectedCategoryId.Value > 0)
    {
        query = query.Where(n => n.CategoryId == SelectedCategoryId.Value);
    }

    var notesList = await query
        .OrderByDescending(n => n.UpdatedAt)
        .ToListAsync();

    Notes.Clear();
    foreach (var note in notesList)
    {
        Notes.Add(note);
    }
}
```

**After (Repository)**:
```csharp
// ✅ ViewModel only knows interface method - clean and simple
[RelayCommand]
private async Task LoadNotesAsync()
{
    var notesList = await _repository.GetAllNotesAsync(SelectedCategoryId);

    Notes.Clear();
    foreach (var note in notesList)
    {
        Notes.Add(note);
    }
}
```

**Benefits realized**:
- **Simpler code**: 1 line to load data vs 7 lines
- **No database knowledge**: ViewModel doesn't know about EF Core
- **Easy to test**: Mock `INoteRepository.GetAllNotesAsync()` to return test data
- **Ready for API**: When we build REST API, change repository implementation, ViewModels stay same

---

## 3.5: Register Repository in Dependency Injection

Now we need to register the repository in the DI container so ViewModels can receive it.

### Update MauiProgram.cs

**Location**: `StarterApp/MauiProgram.cs`

Find the service registration section and update it:

```csharp
using Microsoft.Extensions.Logging;
using StarterApp.ViewModels;
using StarterApp.Database.Data;
using StarterApp.Database.Repositories;  // ✅ Add this using
using StarterApp.Views;
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

        // ✅ NEW: Register repository
        builder.Services.AddScoped<INoteRepository, NoteRepository>();

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

### Understanding Service Lifetimes

We registered the repository with `AddScoped`. Let's understand the three lifetime options:

**1. AddSingleton - One Instance for Entire App**

```csharp
builder.Services.AddSingleton<IMyService, MyService>();
```

**Behavior**:
- Created once when first requested
- Reused for every request
- Lives for entire application lifetime
- Destroyed when app closes

**Use cases**:
- Configuration services
- Logger services
- App-wide state management
- Services without mutable state

**Example**: `INavigationService` - one instance manages all navigation

```csharp
// First request - creates instance
var nav1 = serviceProvider.GetService<INavigationService>();  // New instance

// Second request - reuses instance
var nav2 = serviceProvider.GetService<INavigationService>();  // Same instance

// nav1 == nav2 (same object reference)
```

**2. AddTransient - New Instance Every Time**

```csharp
builder.Services.AddTransient<IMyService, MyService>();
```

**Behavior**:
- Created every time it's requested
- Different instance each time
- Destroyed when scope ends
- No shared state

**Use cases**:
- ViewModels (fresh state for each navigation)
- Pages (fresh UI each time)
- Lightweight services without state

**Example**: `NotesViewModel` - each navigation creates fresh ViewModel

```csharp
// First request - creates instance
var vm1 = serviceProvider.GetService<NotesViewModel>();  // New instance

// Second request - creates another instance
var vm2 = serviceProvider.GetService<NotesViewModel>();  // Different instance

// vm1 != vm2 (different objects)
```

**3. AddScoped - One Instance Per Scope (Request)**

```csharp
builder.Services.AddScoped<IMyService, MyService>();
```

**Behavior**:
- Created once per scope (in MAUI, typically per page/request)
- Reused within same scope
- Destroyed when scope ends
- New instance for new scope

**Use cases**:
- Database repositories (share DbContext within request)
- Unit of work pattern
- Request-specific caching

**Example**: `INoteRepository` - shared within page, new for each page

```csharp
// Within same scope (page load)
var repo1 = serviceProvider.GetService<INoteRepository>();  // New instance
var repo2 = serviceProvider.GetService<INoteRepository>();  // Same instance (within scope)

// New scope (different page)
var repo3 = serviceProvider.GetService<INoteRepository>();  // Different instance

// repo1 == repo2 (same scope)
// repo1 != repo3 (different scope)
```

### Why AddScoped for Repository?

We chose `AddScoped` for `INoteRepository` because:

**1. Efficient database connection management**:
```csharp
public class NoteRepository
{
    private readonly AppDbContext _context;  // Shares same DbContext instance within scope
}
```
- DbContext created once per page load
- All repository operations in that page use same context
- Context disposed when page closes
- Avoids creating multiple DbContext instances unnecessarily

**2. Consistency within request**:
```csharp
// In a single ViewModel initialization:
await _repository.CreateNoteAsync(note);   // Uses DbContext instance A
var notes = await _repository.GetAllNotesAsync();  // Uses same DbContext instance A
```
- Changes tracked consistently
- All operations see same data state
- Prevents stale data issues

**3. Not too long-lived (unlike Singleton)**:
- Singleton would keep DbContext alive for entire app (memory leak risk)
- Scoped creates new DbContext for each page (fresh data)

**4. Not too short-lived (unlike Transient)**:
- Transient would create new DbContext for EVERY repository call
- Wasteful: Creating DbContext is expensive
- Scoped reuses within same logical operation (page load)

{: .highlight }
**Rule of Thumb**:
- **Singleton**: No state or app-level state (navigation, logging, configuration)
- **Scoped**: Database access, unit of work (repositories, DbContext)
- **Transient**: Stateful or disposable objects (ViewModels, Pages)

---

## 3.6: Test the Refactored Application

Time to verify everything still works with the repository pattern!

### Build and Run

```bash
# Navigate to main app project
cd StarterApp

# Clean build to ensure everything recompiles
dotnet clean
dotnet build

# Run application
dotnet run
```

{: .warning }
**Expected**: Application should work exactly the same as before. We've refactored the internal architecture without changing behavior (refactoring definition!).

### Verification Checklist

Test systematically to ensure nothing broke:

#### ✅ 1. Application Starts Successfully

- App launches without errors
- NotesPage displays as main page
- Categories load in filter picker
- No console errors

#### ✅ 2. View Notes List

- Pull-to-refresh works
- Notes display with categories
- Category badges show correct colors
- Dates format correctly
- Empty state shows when no notes

#### ✅ 3. Filter by Category

- Change filter picker
- Notes filter correctly
- "All Categories" shows all notes
- Specific categories show only matching notes

#### ✅ 4. Create New Note

- Tap "+" button
- Navigate to NotePage
- Categories load in picker
- Title "New Note" displays
- Fill in title, content, category
- Tap "Create"
- Navigates back to list
- New note appears in list

#### ✅ 5. Edit Existing Note

- Tap note in list
- Navigates to edit page
- Title "Edit Note" displays
- Existing values populate form
- Category picker shows selected category
- Delete button visible
- Modify values
- Tap "Update"
- Changes saved and visible in list

#### ✅ 6. Delete Note

**From detail page**:
- Open note
- Tap "Delete Note"
- Confirm dialog appears
- Tap "Delete"
- Navigates back
- Note removed from list

**From list**:
- Swipe note left
- Tap red Delete button
- Confirm dialog appears
- Note removed

#### ✅ 7. Verify Database Persistence

- Close app completely
- Restart app
- All notes still exist
- Data persisted correctly

### Common Issues and Fixes

#### Issue: "Could not resolve service for type 'INoteRepository'"

**Error message**:
```
System.InvalidOperationException: Unable to resolve service for type
'StarterApp.Database.Repositories.INoteRepository'
```

**Cause**: Repository not registered in DI container

**Fix**: Ensure `MauiProgram.cs` has:
```csharp
builder.Services.AddScoped<INoteRepository, NoteRepository>();
```

**Verify**:
- Check spelling matches exactly
- Confirm `using StarterApp.Database.Repositories;` at top
- Rebuild application

#### Issue: "Categories not loading in picker"

**Cause**: Repository method might not be returning ordered list

**Fix**: Check `NoteRepository.GetAllCategoriesAsync()`:
```csharp
var categories = await _context.Categories
    .OrderBy(c => c.Name)  // ← Ensure this line exists
    .ToListAsync();
```

#### Issue: "Category information not showing on notes"

**Cause**: Repository not using `Include()` to load navigation property

**Fix**: Check `NoteRepository.GetAllNotesAsync()`:
```csharp
IQueryable<Note> query = _context.Notes
    .Include(n => n.Category);  // ← Ensure this line exists
```

#### Issue: "Build errors about missing namespace"

**Error**:
```
The type or namespace name 'Repositories' does not exist in the namespace
'StarterApp.Database'
```

**Cause**: Files not in correct folder or namespace incorrect

**Fix**:
1. Verify folder structure:
   ```
   StarterApp.Database/
   └── Repositories/
       ├── INoteRepository.cs
       └── NoteRepository.cs
   ```

2. Check namespace in both files:
   ```csharp
   namespace StarterApp.Database.Repositories;
   ```

3. Rebuild:
   ```bash
   dotnet clean
   dotnet build
   ```

### Performance Comparison

Let's verify the repository doesn't impact performance negatively:

**Before (Direct DbContext)**:
```
Loading 100 notes:
- Query time: ~50ms
- UI update time: ~100ms
- Total: ~150ms
```

**After (Repository Pattern)**:
```
Loading 100 notes:
- Query time: ~50ms (same - repository uses same query)
- UI update time: ~100ms (same - same data)
- Total: ~150ms (no overhead!)
```

{: .note }
**Why no performance penalty?** The repository is just a thin wrapper around DbContext. It doesn't add processing; it just organizes the code better. The same SQL queries run under the hood.

---

## 3.7: Understanding the Benefits Realized

Let's reflect on what we've accomplished and why it matters.

### Before and After Comparison

**Before - ViewModels with Direct DbContext**:

```csharp
public class NotesViewModel : BaseViewModel
{
    private readonly AppDbContext _context;  // ❌ Tight coupling

    [RelayCommand]
    private async Task LoadNotesAsync()
    {
        // ❌ ViewModel knows about:
        // - Entity Framework
        // - Include() for eager loading
        // - LINQ query syntax
        // - Filtering logic
        // - Sorting logic
        IQueryable<Note> query = _context.Notes.Include(n => n.Category);

        if (SelectedCategoryId.HasValue && SelectedCategoryId.Value > 0)
        {
            query = query.Where(n => n.CategoryId == SelectedCategoryId.Value);
        }

        var notesList = await query
            .OrderByDescending(n => n.UpdatedAt)
            .ToListAsync();

        Notes.Clear();
        foreach (var note in notesList)
        {
            Notes.Add(note);
        }
    }

    [RelayCommand]
    private async Task DeleteNoteAsync(Note note)
    {
        // ❌ Direct database manipulation
        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();
        Notes.Remove(note);
    }
}
```

**After - ViewModels with Repository**:

```csharp
public class NotesViewModel : BaseViewModel
{
    private readonly INoteRepository _repository;  // ✅ Loose coupling to interface

    [RelayCommand]
    private async Task LoadNotesAsync()
    {
        // ✅ ViewModel only knows:
        // - Simple repository interface
        // - No database details
        // - No EF Core specifics
        var notesList = await _repository.GetAllNotesAsync(SelectedCategoryId);

        Notes.Clear();
        foreach (var note in notesList)
        {
            Notes.Add(note);
        }
    }

    [RelayCommand]
    private async Task DeleteNoteAsync(Note note)
    {
        // ✅ Repository handles all database logic
        var deleted = await _repository.DeleteNoteAsync(note.Id);
        if (deleted)
        {
            Notes.Remove(note);
        }
    }
}
```

### Benefit 1: Testability

**Before - Hard to Test**:

```csharp
// ❌ Testing requires real database or complex mocking
[Test]
public async Task LoadNotes_FiltersCorrectly()
{
    // Need to:
    // 1. Set up in-memory database
    // 2. Seed test data
    // 3. Create DbContext
    // 4. Create ViewModel
    // 5. Test

    var options = new DbContextOptionsBuilder<AppDbContext>()
        .UseInMemoryDatabase("TestDb")
        .Options;

    using var context = new AppDbContext(options);

    // Seed data
    context.Categories.Add(new Category { Id = 1, Name = "Work" });
    context.Notes.Add(new Note { Id = 1, Title = "Test", CategoryId = 1 });
    await context.SaveChangesAsync();

    var viewModel = new NotesViewModel(context);
    viewModel.SelectedCategoryId = 1;
    await viewModel.LoadNotesCommand.ExecuteAsync(null);

    Assert.AreEqual(1, viewModel.Notes.Count);
}
```

**After - Easy to Test**:

```csharp
// ✅ Testing with mock repository - no database needed!
[Test]
public async Task LoadNotes_FiltersCorrectly()
{
    // 1. Mock repository
    var mockRepo = new Mock<INoteRepository>();
    mockRepo.Setup(r => r.GetAllNotesAsync(1))
            .ReturnsAsync(new List<Note>
            {
                new Note { Id = 1, Title = "Test", CategoryId = 1 }
            });

    // 2. Create ViewModel with mock
    var viewModel = new NotesViewModel(mockRepo.Object);
    viewModel.SelectedCategoryId = 1;

    // 3. Test
    await viewModel.LoadNotesCommand.ExecuteAsync(null);

    // 4. Verify
    Assert.AreEqual(1, viewModel.Notes.Count);
    mockRepo.Verify(r => r.GetAllNotesAsync(1), Times.Once);
}
```

**Benefits**:
- No database setup required
- Tests run faster (no I/O)
- Tests more reliable (no external dependencies)
- Can test edge cases easily (mock can return any data)

### Benefit 2: Swappable Implementations

**Scenario**: You decide to build a REST API and want the mobile app to sync with it.

**Before - Major Refactoring Required**:
```csharp
// ❌ Must change every ViewModel
public class NotesViewModel : BaseViewModel
{
    // Change from:
    private readonly AppDbContext _context;

    // To:
    private readonly HttpClient _httpClient;

    [RelayCommand]
    private async Task LoadNotesAsync()
    {
        // Rewrite all query logic:
        // From:
        var notes = await _context.Notes.Include(n => n.Category).ToListAsync();

        // To:
        var response = await _httpClient.GetAsync("api/notes");
        var notes = await response.Content.ReadFromJsonAsync<List<Note>>();

        // Risk: Miss some places, introduce bugs
    }
}
```

**After - Just Change Registration**:

```csharp
// ✅ ViewModels stay exactly the same!
// Just create new implementation:

public class ApiNoteRepository : INoteRepository
{
    private readonly HttpClient _httpClient;

    public ApiNoteRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<Note>> GetAllNotesAsync(int? categoryId = null)
    {
        var url = categoryId.HasValue
            ? $"api/notes?categoryId={categoryId}"
            : "api/notes";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var notes = await response.Content.ReadFromJsonAsync<List<Note>>();
        return notes ?? new List<Note>();
    }

    // ... implement other methods
}

// In MauiProgram.cs, just change ONE line:
// From:
builder.Services.AddScoped<INoteRepository, NoteRepository>();

// To:
builder.Services.AddScoped<INoteRepository, ApiNoteRepository>();

// That's it! All ViewModels now use API instead of local database!
```

**Benefits**:
- ViewModels untouched (zero risk of breaking UI)
- Change isolated to repository implementation
- Can switch implementations via configuration
- Can support both (offline mode = local, online mode = API)

### Benefit 3: Configuration-Based Switching

You can even switch implementations based on app configuration:

```csharp
// MauiProgram.cs
public static MauiApp CreateMauiApp()
{
    var builder = MauiApp.CreateBuilder();

    // Read configuration
    var useApi = builder.Configuration.GetValue<bool>("UseApi");

    // Database
    builder.Services.AddDbContext<AppDbContext>();

    // ✅ Register repository based on configuration
    if (useApi)
    {
        builder.Services.AddHttpClient<INoteRepository, ApiNoteRepository>(client =>
        {
            client.BaseAddress = new Uri("https://api.mynotes.com");
        });
    }
    else
    {
        builder.Services.AddScoped<INoteRepository, NoteRepository>();
    }

    // Rest of registration...
}
```

**Enables**:
- Development: Use local database
- Production: Use REST API
- Offline mode: Use local database
- Online mode: Use API
- A/B testing: Different implementations for different users

### Benefit 4: Clear Separation of Concerns

**ViewModel responsibilities** (Before):
- ❌ Presentation logic (IsBusy, ErrorMessage)
- ❌ Database queries (Include, Where, OrderBy)
- ❌ Database operations (Add, Remove, SaveChanges)
- ❌ Timestamp management (CreatedAt, UpdatedAt)
- ❌ Navigation

**ViewModel responsibilities** (After):
- ✅ Presentation logic (IsBusy, ErrorMessage)
- ✅ User interaction (Commands)
- ✅ Navigation

**Repository responsibilities** (After):
- ✅ Database queries (Include, Where, OrderBy)
- ✅ Database operations (Add, Remove, SaveChanges)
- ✅ Timestamp management (CreatedAt, UpdatedAt)
- ✅ Data access abstraction

{: .highlight }
**Single Responsibility Principle**: Each class has one reason to change. ViewModels change when UI requirements change. Repository changes when data access requirements change.

### Benefit 5: Reusability Across Projects

With the repository in a separate library project (`StarterApp.Database`), you can reuse it:

**Scenario**: You build a web admin panel using Blazor.

```csharp
// Blazor project references StarterApp.Database
// Program.cs in Blazor app:

builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddScoped<INoteRepository, NoteRepository>();

// Now Blazor pages can use the same repository!
@inject INoteRepository Repository

@code {
    private List<Note> notes;

    protected override async Task OnInitializedAsync()
    {
        notes = await Repository.GetAllNotesAsync();
    }
}
```

**Benefits**:
- Same data access logic in mobile app and web admin
- One place to fix bugs or add features
- Consistent behavior across platforms
- Less code duplication

---

## 3.8: Preparing for Future API Integration

Let's document how to add API support in the future.

### Create ApiNoteRepository Skeleton

**Location**: `StarterApp.Database/Repositories/ApiNoteRepository.cs`

Create this file as documentation for future development:

```csharp
using StarterApp.Database.Models;
using System.Net.Http.Json;

namespace StarterApp.Database.Repositories;

/// <summary>
/// Future implementation: Repository using REST API for data access.
/// This class is a skeleton showing how to implement API-based data access
/// without changing ViewModels.
/// </summary>
/// <remarks>
/// To enable API mode:
/// 1. Implement all methods in this class
/// 2. Add HttpClient configuration in MauiProgram.cs
/// 3. Change repository registration to use ApiNoteRepository
/// 4. ViewModels remain unchanged!
/// </remarks>
public class ApiNoteRepository : INoteRepository
{
    private readonly HttpClient _httpClient;
    private const string NotesEndpoint = "api/notes";
    private const string CategoriesEndpoint = "api/categories";

    public ApiNoteRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    // ==================== Note Operations ====================

    public async Task<List<Note>> GetAllNotesAsync(int? categoryId = null)
    {
        // TODO: Implement API call
        // Example implementation:
        /*
        var url = categoryId.HasValue
            ? $"{NotesEndpoint}?categoryId={categoryId}"
            : NotesEndpoint;

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var notes = await response.Content.ReadFromJsonAsync<List<Note>>();
        return notes ?? new List<Note>();
        */

        throw new NotImplementedException("API integration pending");
    }

    public async Task<Note?> GetNoteByIdAsync(int id)
    {
        // TODO: Implement
        // Example: GET api/notes/{id}
        /*
        var response = await _httpClient.GetAsync($"{NotesEndpoint}/{id}");

        if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            return null;

        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Note>();
        */

        throw new NotImplementedException("API integration pending");
    }

    public async Task<Note> CreateNoteAsync(Note note)
    {
        // TODO: Implement
        // Example: POST api/notes
        /*
        var response = await _httpClient.PostAsJsonAsync(NotesEndpoint, note);
        response.EnsureSuccessStatusCode();

        var createdNote = await response.Content.ReadFromJsonAsync<Note>();
        return createdNote!;
        */

        throw new NotImplementedException("API integration pending");
    }

    public async Task<Note?> UpdateNoteAsync(Note note)
    {
        // TODO: Implement
        // Example: PUT api/notes/{id}
        /*
        var response = await _httpClient.PutAsJsonAsync($"{NotesEndpoint}/{note.Id}", note);

        if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            return null;

        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Note>();
        */

        throw new NotImplementedException("API integration pending");
    }

    public async Task<bool> DeleteNoteAsync(int id)
    {
        // TODO: Implement
        // Example: DELETE api/notes/{id}
        /*
        var response = await _httpClient.DeleteAsync($"{NotesEndpoint}/{id}");

        if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            return false;

        response.EnsureSuccessStatusCode();
        return true;
        */

        throw new NotImplementedException("API integration pending");
    }

    // ==================== Category Operations ====================

    public async Task<List<Category>> GetAllCategoriesAsync()
    {
        // TODO: Implement
        // Example: GET api/categories
        throw new NotImplementedException("API integration pending");
    }

    public async Task<Category?> GetCategoryByIdAsync(int id)
    {
        // TODO: Implement
        throw new NotImplementedException("API integration pending");
    }

    public async Task<Category> CreateCategoryAsync(Category category)
    {
        // TODO: Implement
        throw new NotImplementedException("API integration pending");
    }

    public async Task<Category?> UpdateCategoryAsync(Category category)
    {
        // TODO: Implement
        throw new NotImplementedException("API integration pending");
    }

    public async Task<bool> DeleteCategoryAsync(int id)
    {
        // TODO: Implement
        throw new NotImplementedException("API integration pending");
    }
}
```

### How to Switch to API (Future)

When you build the REST API, here's the migration path:

**Step 1: Implement ApiNoteRepository**

Complete all `TODO` methods in `ApiNoteRepository.cs` with real HTTP calls.

**Step 2: Configure HttpClient**

In `MauiProgram.cs`:

```csharp
// Add HttpClient with base address
builder.Services.AddHttpClient<INoteRepository, ApiNoteRepository>(client =>
{
    client.BaseAddress = new Uri("https://api.mynotes.com");
    client.DefaultRequestHeaders.Add("Accept", "application/json");
});
```

**Step 3: That's it!**

No changes to ViewModels, Views, or any other code. The DI container injects `ApiNoteRepository` instead of `NoteRepository`.

### Hybrid Approach: Local + API Sync

You can even support both simultaneously:

```csharp
public class HybridNoteRepository : INoteRepository
{
    private readonly NoteRepository _localRepo;
    private readonly ApiNoteRepository _apiRepo;
    private readonly IConnectivity _connectivity;

    public HybridNoteRepository(
        NoteRepository localRepo,
        ApiNoteRepository apiRepo,
        IConnectivity connectivity)
    {
        _localRepo = localRepo;
        _apiRepo = apiRepo;
        _connectivity = connectivity;
    }

    public async Task<List<Note>> GetAllNotesAsync(int? categoryId = null)
    {
        if (_connectivity.NetworkAccess == NetworkAccess.Internet)
        {
            try
            {
                // Try API first
                var notes = await _apiRepo.GetAllNotesAsync(categoryId);

                // Sync to local database for offline access
                await SyncToLocal(notes);

                return notes;
            }
            catch (HttpRequestException)
            {
                // API failed, fall back to local
                return await _localRepo.GetAllNotesAsync(categoryId);
            }
        }
        else
        {
            // No internet, use local
            return await _localRepo.GetAllNotesAsync(categoryId);
        }
    }

    private async Task SyncToLocal(List<Note> notes)
    {
        // Update local database with API data
        // Implementation details...
    }

    // ... implement other methods with similar logic
}
```

**Registration**:
```csharp
builder.Services.AddScoped<NoteRepository>();
builder.Services.AddHttpClient<ApiNoteRepository>(...);
builder.Services.AddScoped<INoteRepository, HybridNoteRepository>();
```

**Result**: App works offline with local database, syncs with API when online!

---

## 3.9: Advanced Repository Patterns

Let's explore some advanced patterns for when your app grows.

### Pattern 1: Generic Repository

If you add more entity types (e.g., Tags, Attachments), you can create a generic repository:

```csharp
public interface IRepository<T> where T : class
{
    Task<List<T>> GetAllAsync();
    Task<T?> GetByIdAsync(int id);
    Task<T> CreateAsync(T entity);
    Task<T?> UpdateAsync(T entity);
    Task<bool> DeleteAsync(int id);
}

public class Repository<T> : IRepository<T> where T : class
{
    private readonly AppDbContext _context;
    private readonly DbSet<T> _dbSet;

    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<List<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<T?> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    // ... implement other methods
}
```

**Usage**:
```csharp
// Register
builder.Services.AddScoped<IRepository<Note>, Repository<Note>>();
builder.Services.AddScoped<IRepository<Category>, Repository<Category>>();

// Use in ViewModel
private readonly IRepository<Note> _noteRepository;
private readonly IRepository<Category> _categoryRepository;
```

**Trade-offs**:
- ✅ Less code duplication
- ✅ Consistent interface across entities
- ❌ Harder to customize per-entity logic
- ❌ Less clear intent (what does repository do?)

### Pattern 2: Unit of Work

Coordinate multiple repository operations in a single transaction:

```csharp
public interface IUnitOfWork : IDisposable
{
    INoteRepository Notes { get; }
    ICategoryRepository Categories { get; }
    Task<int> SaveChangesAsync();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public INoteRepository Notes { get; }
    public ICategoryRepository Categories { get; }

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
        Notes = new NoteRepository(context);
        Categories = new CategoryRepository(context);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
```

**Usage**:
```csharp
public class NotesViewModel : BaseViewModel
{
    private readonly IUnitOfWork _unitOfWork;

    [RelayCommand]
    private async Task CreateNoteWithNewCategoryAsync()
    {
        // Create category
        var category = await _unitOfWork.Categories.CreateAsync(new Category { Name = "New" });

        // Create note with that category
        var note = await _unitOfWork.Notes.CreateAsync(new Note { CategoryId = category.Id });

        // Both operations in same transaction
        await _unitOfWork.SaveChangesAsync();
    }
}
```

**Benefits**:
- Multiple operations in single transaction
- Centralized SaveChanges control
- Easier to rollback on errors

### Pattern 3: Specification Pattern

Encapsulate query logic:

```csharp
public interface ISpecification<T>
{
    Expression<Func<T, bool>> Criteria { get; }
    List<Expression<Func<T, object>>> Includes { get; }
    Expression<Func<T, object>> OrderBy { get; }
    bool OrderByDescending { get; }
}

public class NotesWithCategorySpec : ISpecification<Note>
{
    public NotesWithCategorySpec(int? categoryId)
    {
        if (categoryId.HasValue && categoryId.Value > 0)
        {
            Criteria = n => n.CategoryId == categoryId.Value;
        }
        else
        {
            Criteria = n => true;  // All notes
        }

        Includes.Add(n => n.Category);
        OrderBy = n => n.UpdatedAt;
        OrderByDescending = true;
    }

    public Expression<Func<Note, bool>> Criteria { get; }
    public List<Expression<Func<Note, object>>> Includes { get; } = new();
    public Expression<Func<Note, object>> OrderBy { get; }
    public bool OrderByDescending { get; }
}
```

**Usage**:
```csharp
public async Task<List<Note>> GetAllNotesAsync(int? categoryId = null)
{
    var spec = new NotesWithCategorySpec(categoryId);
    return await _context.Notes
        .ApplySpecification(spec)  // Extension method that applies criteria, includes, ordering
        .ToListAsync();
}
```

**Benefits**:
- Reusable query logic
- Testable (specifications are just objects)
- Complex queries encapsulated

{: .note }
**When to use advanced patterns?** Start simple (like we did). Add complexity only when you need it. Generic repository, unit of work, and specification patterns are overkill for small apps but valuable for large enterprise applications.

---

## Summary and Next Steps

In this part, you:

✅ Understood the Repository Pattern and its benefits
✅ Designed `INoteRepository` interface with complete CRUD operations
✅ Implemented `NoteRepository` using Entity Framework Core
✅ Refactored ViewModels to use repository abstraction instead of DbContext
✅ Configured dependency injection with `AddScoped` lifetime
✅ Created skeleton for future `ApiNoteRepository` implementation
✅ **Mastered data access abstraction for testability and flexibility**

### Teaching Moments Recap

- **Repository Pattern** creates abstraction between business logic and data access
- **Interface-based design** enables swappable implementations (local DB, API, cache)
- **Dependency Injection** makes repositories injectable and testable
- **Scoped lifetime** is ideal for repositories (shares DbContext within request, creates new for each page)
- **Include() for eager loading** prevents N+1 query problem
- **Simple ViewModel code** when using repository vs. direct DbContext
- **Future-proofing** by designing for API integration from the start
- **Single Responsibility Principle**: ViewModels handle presentation, repositories handle data access

### Architecture Evolution

**Part 1** (Starter):
```
ViewModel → Service → DbContext → PostgreSQL
```

**Part 2** (Simplified):
```
ViewModel → DbContext → PostgreSQL
```

**Part 3** (With Repository):
```
ViewModel → INoteRepository → NoteRepository → DbContext → PostgreSQL
```

**Future** (API Integration):
```
ViewModel → INoteRepository → ApiNoteRepository → HttpClient → REST API
```

**Key insight**: ViewModel code stays the same across all these architectures!

### What's Next?

**[Part 4: Advanced Migrations →](part4-advanced-migrations.md)**

In Part 4, you'll:
- Add new properties to existing models
- Generate and apply migrations for schema evolution
- Seed default data in migrations
- Understand migration history and EF Core tracking
- Handle migration conflicts in team environments
- Learn rollback strategies and data migration patterns

---

**Estimated time for Part 4**: 45-60 minutes

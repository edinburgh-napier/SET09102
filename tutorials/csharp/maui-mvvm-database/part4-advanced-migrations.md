---
layout: default
title: "Part 4: Advanced Migrations"
parent: MAUI + MVVM + Database
grand_parent: C# Tutorials
nav_order: 4
---

# Part 4: Advanced Migrations

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

- ✅ Understand database schema evolution and migration tracking
- ✅ Add new properties to existing models
- ✅ Generate and apply migrations for schema changes
- ✅ Seed default data using HasData
- ✅ Review generated SQL and understand migration operations
- ✅ Master migration best practices and naming conventions
- ✅ Handle complex migration scenarios (renames, data types, data migrations)
- ✅ **Understand team collaboration with migrations**

**Estimated time**: 45-60 minutes

---

## 4.1: Understanding Schema Evolution

Before diving into code, let's understand why migrations are essential for production applications.

### What Are Migrations?

**Database migrations** are a way to evolve your database schema over time while preserving existing data.

**Without migrations**:
```
Version 1: Notes table with Title, Content
↓ (Need to add Priority field)
Version 2: Delete database, recreate with Title, Content, Priority
❌ All existing notes LOST!
```

**With migrations**:
```
Version 1: Notes table with Title, Content
↓ (Generate migration for Priority field)
Version 2: ALTER TABLE notes ADD COLUMN priority
✅ Existing notes preserved! Priority defaults to NULL or specified value
```

### How EF Core Tracks Migrations

Entity Framework Core maintains a special table called `__EFMigrationsHistory`:

```sql
SELECT * FROM "__EFMigrationsHistory";
```

**Output**:
```
migration_id                    | product_version
--------------------------------+----------------
20260210120000_InitialCreate   | 9.0.0
20260211150000_AddNotePriority | 9.0.0
```

**What this tracks**:
- Which migrations have been applied to this database
- When they were applied (timestamp in migration ID)
- What EF Core version created them

{: .note }
**Why track migrations?** Different developers and environments (development, staging, production) need to know which schema version they have. The history table ensures everyone stays synchronized.

### Migration Lifecycle

```
1. DESIGN CHANGE
   Developer: "Users want to mark notes as important"
   ↓

2. UPDATE MODEL
   Add `Importance` property to Note.cs
   ↓

3. GENERATE MIGRATION
   dotnet ef migrations add AddNoteImportance
   → Creates C# code describing the change
   → Includes Up() method (apply) and Down() method (revert)
   ↓

4. REVIEW GENERATED CODE
   Check 20260211_AddNoteImportance.cs
   Verify SQL is correct
   ↓

5. APPLY MIGRATION
   dotnet ef database update
   → Executes SQL against database
   → Records migration in __EFMigrationsHistory
   ↓

6. UPDATE APPLICATION CODE
   Use new Importance property in ViewModels/Views
```

### Why Not Just Delete the Database?

**In development** (learning, experimenting):
- ✅ Okay to delete and recreate
- ✅ No real data to preserve
- ✅ Fast iteration

**In production** (real users, real data):
- ❌ NEVER delete the database
- ❌ Would lose all user data
- ✅ MUST use migrations to evolve schema
- ✅ Preserve existing data
- ✅ Provide rollback capability

{: .warning }
**Production Rule**: Never run `dotnet ef database drop` in production. Always use migrations to evolve schema incrementally.

---

## 4.2: Add Note Importance Field

Let's add a new feature: marking notes as Low, Normal, or High importance.

### Create NoteImportance Enum

**Location**: `StarterApp.Database/Models/NoteImportance.cs`

Create a new file:

```csharp
namespace StarterApp.Database.Models;

/// <summary>
/// Importance levels for notes
/// </summary>
public enum NoteImportance
{
    /// <summary>
    /// Low priority note
    /// </summary>
    Low = 0,

    /// <summary>
    /// Normal priority note (default)
    /// </summary>
    Normal = 1,

    /// <summary>
    /// High priority note
    /// </summary>
    High = 2
}
```

**Why an enum?**
- Type-safe: Can't assign invalid values
- Self-documenting: Clear intent
- IntelliSense support: Editor suggests values
- Database storage: Stored as integer (efficient)

### Update Note Model

**Location**: `StarterApp.Database/Models/Note.cs`

Add the new property:

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace StarterApp.Database.Models;

[Table("notes")]
[PrimaryKey(nameof(Id))]
public class Note
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;

    public int? CategoryId { get; set; }

    [ForeignKey(nameof(CategoryId))]
    public Category? Category { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // ✅ NEW: Importance level
    /// <summary>
    /// Importance level of the note
    /// </summary>
    public NoteImportance Importance { get; set; } = NoteImportance.Normal;

    [NotMapped]
    public string ContentPreview => Content.Length > 100
        ? Content.Substring(0, 100) + "..."
        : Content;

    // ✅ NEW: Computed property for display
    /// <summary>
    /// Icon representing importance level
    /// </summary>
    [NotMapped]
    public string ImportanceIcon => Importance switch
    {
        NoteImportance.Low => "⬇️",
        NoteImportance.High => "⬆️",
        _ => ""  // Normal has no icon
    };
}
```

**Key observations**:
- **Default value**: `NoteImportance.Normal` ensures existing notes get sensible default
- **`[NotMapped]`**: `ImportanceIcon` is computed, not stored in database
- **Pattern matching**: Switch expression provides clean icon mapping

---

## 4.3: Generate and Review Migration

Now we'll create a migration to add the new column to the database.

### Generate Migration

Navigate to the Migrations project:

```bash
# Navigate to Migrations project
cd StarterApp.Migrations

# Generate migration
dotnet ef migrations add AddNoteImportance --output-dir Migrations
```

**Output**:
```
Build succeeded.
Build completed in 2.3s
An operation was scaffolded that may result in the loss of data.
Please review the migration for accuracy.
Done. To undo this action, use 'ef migrations remove'
```

{: .note }
**"May result in loss of data"**: This warning appears when adding non-nullable columns. Since we provided a default value (`Normal = 1`), no data will be lost. EF Core is being cautious.

### Examine Generated Migration

Open the generated file: `StarterApp.Migrations/Migrations/YYYYMMDD_AddNoteImportance.cs`

```csharp
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StarterApp.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class AddNoteImportance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "importance",
                table: "notes",
                type: "integer",
                nullable: false,
                defaultValue: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "importance",
                table: "notes");
        }
    }
}
```

**Understanding the code**:

**1. Up() method** - Applying the migration:
```csharp
migrationBuilder.AddColumn<int>(
    name: "importance",          // Column name in database
    table: "notes",              // Table to modify
    type: "integer",             // PostgreSQL data type
    nullable: false,             // NOT NULL constraint
    defaultValue: 1              // Default value (Normal)
);
```

**Generated SQL** (what EF Core executes):
```sql
ALTER TABLE notes
ADD COLUMN importance integer NOT NULL DEFAULT 1;
```

**2. Down() method** - Reverting the migration:
```csharp
migrationBuilder.DropColumn(
    name: "importance",
    table: "notes"
);
```

**Generated SQL**:
```sql
ALTER TABLE notes
DROP COLUMN importance;
```

{: .highlight }
**Key Insight**: Migrations are bidirectional. You can apply (`Up`) or revert (`Down`). This enables rollback if something goes wrong.

### Review Migration in Detail

**Question**: Why `integer` type for an enum?

**Answer**: PostgreSQL doesn't have a native enum type that maps directly to C# enums. EF Core stores enums as integers:
- `Low = 0` → stored as `0`
- `Normal = 1` → stored as `1`
- `High = 2` → stored as `2`

**Question**: What happens to existing notes?

**Answer**: The `defaultValue: 1` ensures all existing notes get `Importance = Normal` (value 1) when the column is added.

**Question**: What if we didn't specify a default?

**Answer**: Migration would fail because PostgreSQL can't add a NOT NULL column without a default when data exists:
```
ERROR: column "importance" contains null values
```

---

## 4.4: Apply Migration

Now let's apply the migration to the database.

### Run Migration

Still in the Migrations project:

```bash
# Apply migration
dotnet ef database update
```

**Output**:
```
Build succeeded.
Applying migration '20260211150000_AddNoteImportance'.
Done.
```

### Verify Schema Change

Use PostgreSQL client to verify:

```sql
-- Check table structure
\d notes

-- Or show columns
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'notes';
```

**Expected output**:
```
column_name | data_type | is_nullable | column_default
------------+-----------+-------------+---------------
id          | integer   | NO          | nextval(...)
title       | varchar   | NO          | NULL
content     | text      | NO          | NULL
category_id | integer   | YES         | NULL
created_at  | timestamp | NO          | NULL
updated_at  | timestamp | NO          | NULL
importance  | integer   | NO          | 1              ← NEW
```

### Verify Existing Data

Check that existing notes have default importance:

```sql
SELECT id, title, importance FROM notes;
```

**Output**:
```
id | title          | importance
---+----------------+-----------
1  | My First Note  | 1          ← Defaulted to Normal
2  | Shopping List  | 1          ← Defaulted to Normal
```

✅ **Success!** Schema evolved without losing data.

---

## 4.5: Update Application to Use Importance

Now let's use the new property in our ViewModels and Views.

### Update NoteViewModel

**Location**: `StarterApp/ViewModels/NoteViewModel.cs`

Add the importance property:

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using StarterApp.Database.Models;
using StarterApp.Database.Repositories;

namespace StarterApp.ViewModels;

public partial class NoteViewModel : BaseViewModel
{
    private readonly INoteRepository _repository;
    private int? _noteId;

    [ObservableProperty]
    private string title = string.Empty;

    [ObservableProperty]
    private string content = string.Empty;

    [ObservableProperty]
    private int? selectedCategoryId;

    // ✅ NEW: Importance property
    [ObservableProperty]
    private NoteImportance importance = NoteImportance.Normal;

    [ObservableProperty]
    private List<Category> categories = new();

    [ObservableProperty]
    private bool isEditMode;

    public NoteViewModel(INoteRepository repository)
    {
        _repository = repository;
        Title = "New Note";
    }

    public async Task InitializeAsync(int? noteId = null)
    {
        try
        {
            IsBusy = true;

            Categories = await _repository.GetAllCategoriesAsync();

            if (noteId.HasValue)
            {
                _noteId = noteId.Value;
                IsEditMode = true;
                Title = "Edit Note";

                var note = await _repository.GetNoteByIdAsync(noteId.Value);
                if (note != null)
                {
                    this.title = note.Title;
                    this.content = note.Content;
                    this.selectedCategoryId = note.CategoryId;
                    this.importance = note.Importance;  // ✅ Load importance

                    OnPropertyChanged(nameof(Title));
                    OnPropertyChanged(nameof(Content));
                    OnPropertyChanged(nameof(SelectedCategoryId));
                    OnPropertyChanged(nameof(Importance));  // ✅ Notify UI
                }
            }
            else
            {
                IsEditMode = false;
                Title = "New Note";
                Importance = NoteImportance.Normal;  // ✅ Default for new notes
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
                var note = new Note
                {
                    Id = _noteId.Value,
                    Title = Title,
                    Content = Content,
                    CategoryId = SelectedCategoryId,
                    Importance = Importance  // ✅ Save importance
                };

                await _repository.UpdateNoteAsync(note);
            }
            else
            {
                var note = new Note
                {
                    Title = Title,
                    Content = Content,
                    CategoryId = SelectedCategoryId,
                    Importance = Importance  // ✅ Save importance
                };

                await _repository.CreateNoteAsync(note);
            }

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

    // ... rest of the class
}
```

### Update NotePage.xaml

**Location**: `StarterApp/Views/NotePage.xaml`

Add importance picker after the category picker:

```xml
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
            Margin="10" />
</Border>

<!-- ✅ NEW: Importance Picker -->
<Label Text="Importance" FontAttributes="Bold" Margin="0,10,0,0" />
<Border Stroke="{AppThemeBinding Light={StaticResource Gray300}, Dark={StaticResource Gray600}}"
        StrokeThickness="1"
        BackgroundColor="{AppThemeBinding Light={StaticResource White}, Dark={StaticResource Gray900}}">
    <Border.StrokeShape>
        <RoundRectangle CornerRadius="8" />
    </Border.StrokeShape>
    <Picker SelectedItem="{Binding Importance}"
            Title="Select importance"
            Margin="10">
        <Picker.ItemsSource>
            <x:Array Type="{x:Type models:NoteImportance}">
                <models:NoteImportance>Low</models:NoteImportance>
                <models:NoteImportance>Normal</models:NoteImportance>
                <models:NoteImportance>High</models:NoteImportance>
            </x:Array>
        </Picker.ItemsSource>
    </Picker>
</Border>
```

**Add namespace for models**:
At the top of NotePage.xaml:
```xml
<ContentPage xmlns:models="clr-namespace:StarterApp.Database.Models;assembly=StarterApp.Database"
             ...>
```

### Update NotesPage.xaml

**Location**: `StarterApp/Views/NotesPage.xaml`

Add importance indicator in the note item template. Find the note Grid and update:

```xml
<Grid RowDefinitions="Auto,Auto,Auto,Auto,Auto" RowSpacing="5">

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

    <!-- ✅ NEW: Importance indicator -->
    <HorizontalStackLayout Grid.Row="1" Spacing="10">
        <Label Text="{Binding ImportanceIcon}"
               FontSize="18"
               VerticalOptions="Center"
               IsVisible="{Binding Importance, Converter={StaticResource IsNotNormalImportanceConverter}}" />
        <Label Text="{Binding Title}"
               FontSize="18"
               FontAttributes="Bold"
               LineBreakMode="TailTruncation"
               VerticalOptions="Center" />
    </HorizontalStackLayout>

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
```

{: .note }
**Icon display**: We show ⬆️ for high importance and ⬇️ for low importance. Normal importance has no icon for cleaner UI.

### Test the Feature

Build and run the application:

```bash
cd ../StarterApp
dotnet build
dotnet run
```

**Test checklist**:
1. ✅ Create new note with High importance
2. ✅ Verify importance saved to database
3. ✅ Edit existing note and change importance
4. ✅ Verify importance icon displays in list
5. ✅ Filter works correctly (importance doesn't affect filtering)

---

## 4.6: Seed Default Categories (Advanced)

We already seeded categories in Part 2, but let's understand how to add more seed data via migrations.

### Understanding Data Seeding

**Two approaches**:

**1. OnModelCreating (Initial seed)** - What we used in Part 2:
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Category>().HasData(
        new Category { Id = 1, Name = "Personal", ColorHex = "#4CAF50" },
        new Category { Id = 2, Name = "Work", ColorHex = "#2196F3" }
    );
}
```
- ✅ Part of initial migration
- ✅ Simple and declarative
- ❌ Hard to modify later (requires new migration)

**2. Data Migration** - For changes after initial seed:
```csharp
// In a migration file
protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.InsertData(
        table: "categories",
        columns: new[] { "id", "name", "colorhex", "description" },
        values: new object[] { 5, "Health", "#4CAF50", "Health and fitness notes" }
    );
}
```
- ✅ Can add/modify data later
- ✅ Version controlled
- ✅ Applied automatically with migrations

### Add New Category via Migration

Let's add a "Health" category:

**Step 1: Generate migration**

```bash
cd StarterApp.Migrations
dotnet ef migrations add SeedHealthCategory
```

**Step 2: Edit generated migration**

Open the generated file and modify it:

```csharp
using Microsoft.EntityFrameworkCore.Migrations;

namespace StarterApp.Migrations.Migrations
{
    public partial class SeedHealthCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "categories",
                columns: new[] { "id", "name", "colorhex", "description" },
                values: new object[] { 5, "Health", "#4CAF50", "Health and fitness notes" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "categories",
                keyColumn: "id",
                keyValue: 5);
        }
    }
}
```

**Step 3: Apply migration**

```bash
dotnet ef database update
```

**Step 4: Verify**

```sql
SELECT * FROM categories;
```

**Output**:
```
id | name      | colorhex | description
---+-----------+----------+---------------------------
1  | Personal  | #4CAF50  | Personal notes and ideas
2  | Work      | #2196F3  | Work-related tasks
3  | Study     | #FF9800  | Study materials
4  | Shopping  | #E91E63  | Shopping lists
5  | Health    | #4CAF50  | Health and fitness notes  ← NEW
```

{: .highlight }
**Best Practice**: Use `HasData()` for initial seed data. Use data migrations for changes after deployment.

---

## 4.7: Migration Best Practices

Let's cover essential best practices for managing migrations in real projects.

### Naming Conventions

**Good names** describe the change clearly:
```bash
✅ dotnet ef migrations add AddNoteImportance
✅ dotnet ef migrations add AddUserEmailIndex
✅ dotnet ef migrations add RenameColumnPriorityToImportance
✅ dotnet ef migrations add SeedDefaultCategories
```

**Bad names** are vague:
```bash
❌ dotnet ef migrations add Update
❌ dotnet ef migrations add Changes
❌ dotnet ef migrations add Fix
❌ dotnet ef migrations add Temp
```

**Naming pattern**:
- Use PascalCase
- Start with verb (Add, Remove, Update, Rename, Seed)
- Describe what changed
- Be specific but concise

### When to Create New Migration vs Reset

**Create new migration when**:
- ✅ Working with team (others have your migrations)
- ✅ Deployed to production
- ✅ Any environment has run your migrations
- ✅ Want history of changes

**Reset and recreate when**:
- ✅ Solo development, early stage
- ✅ No one else has your migrations
- ✅ Haven't deployed yet
- ✅ Database has no real data

**How to reset**:
```bash
# Delete all migrations
rm -rf Migrations/

# Drop database
dotnet ef database drop --force

# Create initial migration
dotnet ef migrations add InitialCreate

# Apply migration
dotnet ef database update
```

{: .warning }
**Never reset in production!** Once migrations are shared or deployed, always add new migrations.

### Understanding __EFMigrationsHistory

This table tracks which migrations have been applied:

```sql
SELECT * FROM "__EFMigrationsHistory" ORDER BY migration_id;
```

**Output**:
```
migration_id                       | product_version
-----------------------------------+----------------
20260210120000_InitialCreate      | 9.0.0
20260211150000_AddNoteImportance  | 9.0.0
20260212100000_SeedHealthCategory | 9.0.0
```

**Key points**:
- Timestamp prefix: `YYYYMMDDHHMMSS` (sortable, unique)
- Migration name: Descriptive part you provided
- Product version: EF Core version that created it

**What EF Core checks**:
1. Reads `__EFMigrationsHistory` from database
2. Compares with migrations in your code
3. Applies only unapplied migrations
4. Records each applied migration in history table

### Team Collaboration with Migrations

**Scenario**: Two developers working on same codebase.

**Developer A** (creates migration first):
```bash
# Makes model change
# Creates migration
git checkout -b feature/add-importance
dotnet ef migrations add AddNoteImportance
git commit -am "Add note importance field"
git push
```

**Developer B** (pulls changes):
```bash
# Pulls A's branch
git pull origin feature/add-importance

# Applies A's migration to local database
cd StarterApp.Migrations
dotnet ef database update

# Now B's database matches A's schema
```

**Conflict scenario**:

Both developers create migrations at the same time:

```
Developer A creates: 20260211140000_AddImportance
Developer B creates: 20260211140500_AddTags
```

**Resolution**:
1. Merge both migrations into codebase
2. Whoever pulls latest applies both migrations:
```bash
dotnet ef database update  # Applies both in order
```

{: .note }
**Migration order matters**: EF Core applies migrations in timestamp order. Two migrations at similar times are fine - they'll apply sequentially.

### Production Migration Strategies

**Strategy 1: Manual Application (Safest)**

1. Generate migration in development:
```bash
dotnet ef migrations add UpdateSchema
```

2. Review generated SQL:
```bash
dotnet ef migrations script --from LastMigration --to UpdateSchema
```

3. Test in staging environment
4. DBA reviews and approves SQL
5. DBA manually applies to production
6. Update `__EFMigrationsHistory` manually

**Strategy 2: Automated (CI/CD)**

```bash
# In deployment pipeline
dotnet ef database update --connection "$PROD_CONNECTION_STRING"
```

**Benefits**:
- ✅ Consistent
- ✅ Fast
- ✅ Version controlled

**Risks**:
- ❌ No manual review
- ❌ Auto-rollback might be needed

**Strategy 3: Generate SQL Scripts**

```bash
# Generate SQL for review
dotnet ef migrations script --output migration.sql

# DBA reviews migration.sql
# DBA applies manually to production
```

{: .highlight }
**Best Practice for Production**: Generate SQL scripts, have DBA review, apply during maintenance window.

### Rollback Scenarios

**Undo last migration** (not yet pushed to others):
```bash
# Remove last migration
dotnet ef migrations remove
```

**Revert to specific migration** (already applied to database):
```bash
# Revert to InitialCreate
dotnet ef database update InitialCreate
```

**What happens**:
1. EF Core finds target migration
2. Executes Down() methods of all migrations after target
3. Updates `__EFMigrationsHistory`

**Example**:
```
Current: InitialCreate → AddImportance → AddTags
Command: dotnet ef database update AddImportance
Result:  InitialCreate → AddImportance
         (AddTags rolled back via Down() method)
```

{: .warning }
**Rollback limitations**: Down() methods may lose data. Example: Dropping column deletes data in that column permanently.

---

## 4.8: Common Migration Scenarios

Let's explore common real-world migration patterns.

### Scenario 1: Renaming a Column

**Problem**: You want to rename `Content` to `Body` for consistency.

**Bad approach** (loses data):
```csharp
// In model, change:
public string Content { get; set; }
// To:
public string Body { get; set; }

// Migration generates:
migrationBuilder.DropColumn("content");
migrationBuilder.AddColumn<string>("body");
// ❌ Content data LOST!
```

**Good approach** (preserves data):

**Step 1: Generate empty migration**
```bash
dotnet ef migrations add RenameContentToBody
```

**Step 2: Edit migration manually**
```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.RenameColumn(
        name: "content",
        table: "notes",
        newName: "body");
}

protected override void Down(MigrationBuilder migrationBuilder)
{
    migrationBuilder.RenameColumn(
        name: "body",
        table: "notes",
        newName: "content");
}
```

**Step 3: Apply migration**
```bash
dotnet ef database update
```

✅ **Result**: Column renamed, data preserved!

### Scenario 2: Changing Data Type

**Problem**: `Title` should be longer than 100 characters.

**In model**:
```csharp
// Change from:
[MaxLength(100)]
public string Title { get; set; }

// To:
[MaxLength(200)]
public string Title { get; set; }
```

**Migration generates**:
```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.AlterColumn<string>(
        name: "title",
        table: "notes",
        type: "character varying(200)",  // Was 100
        maxLength: 200,
        nullable: false,
        oldClrType: typeof(string),
        oldType: "character varying(100)",
        oldMaxLength: 100);
}
```

**Generated SQL**:
```sql
ALTER TABLE notes
ALTER COLUMN title TYPE character varying(200);
```

✅ **Result**: Existing titles stay, longer titles now allowed.

{: .warning }
**Danger**: Changing from `varchar(200)` to `varchar(100)` may **truncate data** if existing values exceed 100 chars!

### Scenario 3: Complex Data Migration

**Problem**: Split `Name` field into `FirstName` and `LastName`.

**Step 1: Add new columns**
```csharp
public string FirstName { get; set; } = string.Empty;
public string LastName { get; set; } = string.Empty;
```

Generate migration:
```bash
dotnet ef migrations add SplitNameField
```

**Step 2: Edit migration to migrate data**
```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    // Add new columns
    migrationBuilder.AddColumn<string>(
        name: "first_name",
        table: "users",
        nullable: true);

    migrationBuilder.AddColumn<string>(
        name: "last_name",
        table: "users",
        nullable: true);

    // Migrate data (PostgreSQL-specific)
    migrationBuilder.Sql(@"
        UPDATE users
        SET
            first_name = SPLIT_PART(name, ' ', 1),
            last_name = SPLIT_PART(name, ' ', 2)
        WHERE name IS NOT NULL;
    ");

    // Drop old column
    migrationBuilder.DropColumn(
        name: "name",
        table: "users");
}
```

**Step 3: Apply**
```bash
dotnet ef database update
```

**Result**:
```
Before: name = "John Doe"
After:  first_name = "John", last_name = "Doe"
```

{: .highlight }
**Key Pattern**: Add new columns → Migrate data with SQL → Drop old column

### Scenario 4: Adding Required Column to Existing Table

**Problem**: Add `Email` to `User` table, but data already exists.

**Challenge**: Can't add NOT NULL column without default to table with data.

**Solution 1: Two-step migration**

**Migration 1: Add nullable column**
```csharp
public string? Email { get; set; }  // Nullable

// Migration generates:
migrationBuilder.AddColumn<string>(
    name: "email",
    table: "users",
    nullable: true);  // Allows NULL temporarily
```

**After deploying**: Have users update their emails via app

**Migration 2: Make required**
```csharp
public string Email { get; set; } = string.Empty;  // Required

// Manual SQL in migration:
migrationBuilder.Sql(@"
    UPDATE users SET email = 'noemail@example.com'
    WHERE email IS NULL;
");

migrationBuilder.AlterColumn<string>(
    name: "email",
    table: "users",
    nullable: false);
```

**Solution 2: Add with default**
```csharp
migrationBuilder.AddColumn<string>(
    name: "email",
    table: "users",
    nullable: false,
    defaultValue: "noemail@example.com");
```

{: .note }
**Production tip**: Prefer two-step approach when users need to provide real data. Use defaults only for non-critical fields.

---

## 4.9: Troubleshooting Migrations

Common issues and solutions.

### Issue 1: "Pending model changes"

**Error**:
```
Unable to create migration. Your model has pending changes that haven't been included in a migration.
```

**Cause**: You ran `dotnet ef database update` without creating migration first.

**Fix**:
```bash
# Create migration for changes
dotnet ef migrations add DescribeYourChange

# Then apply
dotnet ef database update
```

### Issue 2: "Migration already applied"

**Error**:
```
The migration '20260211_AddImportance' has already been applied to the database.
```

**Cause**: Trying to remove/edit a migration that's already in database.

**Fix**: Create new migration to undo changes
```bash
# Don't remove old migration
# Create new one to revert
dotnet ef migrations add RevertImportanceField
```

Edit new migration:
```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.DropColumn("importance", "notes");
}
```

### Issue 3: "Build failed"

**Error**:
```
Build failed. Cannot create migration.
```

**Cause**: Compilation errors in your code.

**Fix**: Fix build errors first
```bash
dotnet build
# Fix errors
# Then retry
dotnet ef migrations add MyMigration
```

### Issue 4: "Connection string not found"

**Error**:
```
No connection string configured for PostgreSQL.
```

**Cause**: `appsettings.json` not found or not embedded.

**Fix**: Check `StarterApp.Database.csproj`:
```xml
<ItemGroup>
  <EmbeddedResource Include="appsettings.json" />
</ItemGroup>
```

Rebuild:
```bash
dotnet clean
dotnet build
```

### Issue 5: "Concurrent migrations"

**Situation**: Two developers created migrations at same time:
```
Developer A: 20260211140000_AddImportance
Developer B: 20260211140001_AddTags
```

**Resolution**:
1. Both migrations are fine - they'll apply in order
2. Merge both branches
3. Run update:
```bash
dotnet ef database update  # Applies both
```

4. Verify history:
```sql
SELECT * FROM "__EFMigrationsHistory";
```

---

## Summary and Next Steps

In this part, you:

✅ Understood database schema evolution and why migrations matter
✅ Added `Importance` property to Note model
✅ Generated migration with `dotnet ef migrations add`
✅ Reviewed generated SQL and understood Up/Down methods
✅ Applied migration and verified schema changes
✅ Updated ViewModels and Views to use new property
✅ Learned data seeding with HasData and data migrations
✅ Mastered migration best practices and naming conventions
✅ Handled common scenarios (renames, type changes, data migrations)
✅ **Understood team collaboration with migrations**

### Teaching Moments Recap

- **Migrations preserve data** unlike deleting and recreating database
- **`__EFMigrationsHistory`** tracks which migrations have been applied
- **Up() and Down()** methods enable bidirectional migrations (apply/revert)
- **Default values** prevent errors when adding NOT NULL columns to existing data
- **Naming conventions** make migration history readable and maintainable
- **Team collaboration** requires coordination on migration order
- **Production migrations** should use SQL scripts reviewed by DBAs
- **Complex scenarios** (renames, data migrations) require manual editing
- **Rollbacks** may lose data - design Down() methods carefully

### Architecture Review

Our complete data flow now includes migrations:

```
Development Cycle:
1. Update Model (Add property)
2. Generate Migration (dotnet ef migrations add)
3. Review Migration (Check Up/Down methods)
4. Apply Migration (dotnet ef database update)
5. Update Application (ViewModels, Views)
6. Test Feature
7. Commit Code + Migration Files

Production Deployment:
1. Pull latest code (includes migrations)
2. Generate SQL script (dotnet ef migrations script)
3. DBA reviews script
4. Apply during maintenance window
5. Verify __EFMigrationsHistory updated
6. Deploy application
```

### What You Can Do Now

After completing this tutorial, you can:
- Add new fields to models confidently
- Generate and review migrations
- Apply schema changes without losing data
- Seed initial data
- Handle complex migration scenarios
- Collaborate with team on database changes
- Plan production migration strategies

### Next Part

**[Part 5: Testing and Verification →](part5-testing-verification.md)**

In Part 5, you'll:
- Test complete CRUD workflow systematically
- Verify navigation between pages
- Validate data binding
- Check database persistence
- Review complete application architecture
- Take on extension challenges for practice
- Reflect on what you've learned

---

**Estimated time for Part 5**: 30 minutes

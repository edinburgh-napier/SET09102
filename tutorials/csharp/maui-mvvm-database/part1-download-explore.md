---
title: Download StarterApp
parent: C# practice
has_children: false
has_toc: false
nav_order: 3
---

# Part 1: Download and Explore StarterApp

## Learning Objectives

By the end of this part, you will:

-  Download and set up the PostgreSQL-ready StarterApp
-  Understand multi-project solution architecture
-  Explore existing MVVM implementation with CommunityToolkit
-  Review Entity Framework Core with PostgreSQL configuration
-  Understand authentication/authorization patterns
-  Apply database migrations to create schema
-  **Master the MVVM pattern and services layer architecture**

**Estimated time**: 60-90 minutes

---

## 1.1: Download StarterApp

The StarterApp is a production-quality MAUI application that demonstrates best practices for mobile development. It has been pre-configured to use PostgreSQL instead of SQL Server, matching the database from your dev-environment tutorial.

{: .note }
This option requires the tutorial to be hosted on GitHub Pages with a direct download link. If not available, use Option B or C.

1. Click **[Download StarterApp ZIP](https://edinburgh-napier.github.io/SET09102/downloads/starterapp.zip)**
2. Extract the ZIP file to your desired location (e.g., `~/Projects/StarterApp`)
3. Skip to Section 1.2

### Verify Download

Confirm you have the following structure:

```
StarterApp/
├── StarterApp/                    # Main MAUI application project
├── StarterApp.Database/           # Data layer (models, DbContext, services)
├── StarterApp.Migrations/         # Console app for EF Core migrations
├── StarterApp.sln                 # Solution file
├── README.md                      # Setup instructions
└── setup/                         # Additional setup files
```

---

## 1.2: Open in Development Environment

### Using VS Code (Recommended)

1. **Open VS Code**
2. **File → Open Folder** → Navigate to your StarterApp directory
3. If prompted "Reopen in Container", **click yes**
   - Wait for the Dev Container to build (first time takes several minutes)
   - Extensions will load automatically
4. If not prompted, press **F1** → **"Dev Containers: Reopen in Container"**

### Verify Development Environment

Once the container loads, verify your setup:

```bash
# Check .NET version
dotnet --version
# Should show: 8.0.x or 9.0.x

# Check PostgreSQL connection (from dev-environment tutorial)
docker ps | grep postgres
# Should show a running PostgreSQL container
```

{: .warning }
**PostgreSQL Required**: Make sure you have completed the [dev-environment tutorial](../dev-environment/) and have a PostgreSQL container running. Without it, the application cannot connect to the database.

---

## 1.3: Explore Project Structure

Open the solution in VS Code and explore the multi-project architecture:

### Solution Organization

```
StarterApp.sln
│
├── StarterApp/                             # PROJECT: MAUI Application (UI Layer)
│   ├── Platforms/                          # Platform-specific code (Android, iOS, Windows)
│   ├── Properties/                         # Launch settings
│   ├── Resources/                          # Images, fonts, styles
│   ├── ViewModels/                         # Presentation logic
│   │   ├── BaseViewModel.cs                # Common ViewModel functionality
│   │   ├── LoginViewModel.cs               # Login page logic
│   │   ├── RegisterViewModel.cs            # Registration logic
│   │   └── ...
│   ├── Views/                              # XAML pages
│   │   ├── LoginPage.xaml                  # Login UI
│   │   ├── AppShell.xaml                   # Navigation structure
│   │   └── ...
│   ├── App.xaml                            # Application resources
│   ├── MauiProgram.cs                      # Dependency Injection setup
│   └── StarterApp.csproj                   # Project file
│
├── StarterApp.Database/                    # PROJECT: Data Layer (Business Logic + Persistence)
│   ├── Data/
│   │   └── AppDbContext.cs                 # EF Core DbContext (PostgreSQL config)
│   ├── Models/                             # Database entities
│   │   ├── User.cs                         # User entity
│   │   ├── Role.cs                         # Role entity
│   │   └── UserRole.cs                     # Many-to-many relationship
│   ├── Services/                           # Business logic
│   │   ├── IAuthenticationService.cs       # Interface
│   │   └── AuthenticationService.cs        # Implementation
│   ├── appsettings.json                    # Database connection string
│   └── StarterApp.Database.csproj          # Project file
│
└── StarterApp.Migrations/                  # PROJECT: Database Migrations
    ├── Program.cs                          # Console app entry point
    ├── Migrations/                         # Migration files (generated)
    └── StarterApp.Migrations.csproj        # Project file
```

### Why Multi-Project?

**Separation of Concerns**:
- **StarterApp**: UI and presentation logic only
- **StarterApp.Database**: All data access and business logic
- **StarterApp.Migrations**: Database schema management

**Benefits**:
- Can reuse `StarterApp.Database` in other projects (Web API, console tools)
- UI changes don't affect database code
- Easier to test business logic independently
- Clear boundaries between layers

---

## 1.4: Review Key Files

Let's examine the most important files to understand how the application is structured.

### MauiProgram.cs - Dependency Injection Setup

**Location**: `StarterApp/MauiProgram.cs`

This file configures the entire application, including dependency injection.

**Open the file** and find the key registration sections:

```csharp
// DbContext registration with PostgreSQL
builder.Services.AddDbContext<AppDbContext>();

// Service registration
builder.Services.AddSingleton<IAuthenticationService, AuthenticationService>();

// ViewModel registration
builder.Services.AddSingleton<LoginViewModel>();
builder.Services.AddTransient<RegisterViewModel>();

// View registration
builder.Services.AddSingleton<LoginPage>();
builder.Services.AddTransient<RegisterPage>();
```

**Key concepts**:
- **`AddSingleton`**: One instance shared across the app (like a global variable, but managed)
- **`AddTransient`**: New instance created every time it's requested
- **`AddDbContext`**: Special registration for Entity Framework DbContext

{: .note }
**Why register everything?** Dependency Injection lets the framework automatically provide dependencies to your classes. When `LoginViewModel` needs `IAuthenticationService`, the DI container provides it automatically.

### AppDbContext.cs - Database Configuration

**Location**: `StarterApp.Database/Data/AppDbContext.cs`

This is the heart of Entity Framework Core integration.

**Open the file** and examine:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    // Load appsettings.json from embedded resource
    var a = Assembly.GetExecutingAssembly();
    using var stream = a.GetManifestResourceStream("StarterApp.Database.appsettings.json");

    var config = new ConfigurationBuilder()
        .AddJsonStream(stream)
        .Build();

    // Configure PostgreSQL connection
    optionsBuilder.UseNpgsql(
        config.GetConnectionString("DevelopmentConnection")
    );
}

// Define database tables
public DbSet<Role> Roles { get; set; }
public DbSet<User> Users { get; set; }
public DbSet<UserRole> UserRoles { get; set; }
```

**Key observations**:
- **`UseNpgsql`**: PostgreSQL provider (vs. `UseSqlServer` for SQL Server)
- **`DbSet<T>`**: Each DbSet becomes a table in the database
- **Connection string** loaded from `appsettings.json`

### Database Models

**Location**: `StarterApp.Database/Models/`

Examine the model files to see how entities are defined:

**User.cs**:
```csharp
public class User
{
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string PasswordHash { get; set; }
    public string PasswordSalt { get; set; }

    // Navigation property (relationship)
    public List<UserRole> UserRoles { get; set; } = new();
}
```

**Data annotations**:
- `[Required]`: Database column cannot be null
- `[EmailAddress]`: Validation attribute
- **Navigation properties**: `UserRoles` defines relationship with `UserRole` table

### BaseViewModel.cs - MVVM Foundation

**Location**: `StarterApp/ViewModels/BaseViewModel.cs`

This base class provides common functionality for all ViewModels:

```csharp
public abstract class BaseViewModel : ObservableObject
{
    [ObservableProperty]
    private bool isBusy;

    [ObservableProperty]
    private string title = string.Empty;

    [ObservableProperty]
    private string errorMessage = string.Empty;
}
```

**Key features from CommunityToolkit.Mvvm**:
- **`ObservableObject`**: Base class that implements `INotifyPropertyChanged`
- **`[ObservableProperty]`**: Attribute that generates full property with change notification

{: .note }
**Source Generators**: The `[ObservableProperty]` attribute uses C# source generators to automatically create a public `IsBusy` property that notifies the UI when changed. You write less boilerplate!

### AuthenticationService.cs - Business Logic Example

**Location**: `StarterApp.Database/Services/AuthenticationService.cs`

This service demonstrates the **service pattern** for business logic:

```csharp
public class AuthenticationService : IAuthenticationService
{
    private readonly AppDbContext _context;

    public AuthenticationService(AppDbContext context)
    {
        _context = context;  // Injected via DI
    }

    public async Task<bool> LoginAsync(string email, string password)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user == null) return false;

        // Verify password using BCrypt
        return BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
    }
}
```

**Pattern observations**:
- **Interface-based**: `IAuthenticationService` defines the contract
- **Dependency Injection**: `AppDbContext` injected in constructor
- **Async/await**: All database operations are asynchronous
- **BCrypt hashing**: Never store plain-text passwords

---

## 1.5: Configure and Run

### Update Connection String

1. **Open** `StarterApp.Database/appsettings.json`
2. **Verify** the connection string matches your PostgreSQL setup:

```json
{
  "ConnectionStrings": {
    "DevelopmentConnection": "Host=localhost;Username=student_user;Password=password123;Database=starterapp"
  }
}
```

{: .warning }
**Credentials**: These match the dev-environment tutorial. If you used different credentials, update them here.

### Create Initial Migration

Navigate to the Migrations project and create the database schema:

```bash
# Navigate to Migrations project
cd StarterApp.Migrations

# Create initial migration (generates schema from models)
dotnet ef migrations add InitialCreate

# Apply migration to database (creates tables)
dotnet ef database update
```

**What just happened?**
1. `migrations add`: Analyzed your models and generated C# code to create the database schema
2. `database update`: Executed that code against PostgreSQL to create tables

### Verify Database Creation

Use VS Code's PostgreSQL extension (from dev-environment tutorial):

1. **Connect** to your PostgreSQL database
2. **Expand** the `starterapp` database
3. **Verify tables** exist:
   - `Users`
   - `Roles`
   - `UserRoles`
   - `__EFMigrationsHistory` (tracks which migrations have been applied)

### Build and Run

```bash
# Navigate to main app project
cd ../StarterApp

# Restore dependencies
dotnet restore

# Build the application
dotnet build

# Run on Windows
dotnet run

# OR run on Android emulator (requires emulator running)
dotnet build -t:Run -f net8.0-android
```

{: .note }
**First run takes time**: MAUI applications compile platform-specific code, so the first build can take 2-5 minutes.

### Test the Application

If you seeded the database with sample users (check migrations), try logging in with the provided credentials. Otherwise, create a new account using the registration page.

---

## 1.6: Understanding MVVM Architecture 

{: .important-title }
> Critical Learning Section
>
> This section provides deep understanding of the MVVM pattern and services layer - foundational concepts for the entire tutorial. Take your time here!

### What is MVVM?

**MVVM (Model-View-ViewModel)** is an architectural pattern that separates concerns in UI applications into three distinct layers:

```
┌─────────────────────────────────────────┐
│              View (XAML)                │
│  - Layout and appearance                │
│  - Data binding expressions             │
│  - No business logic                    │
│  - User interaction triggers            │
└──────────────┬──────────────────────────┘
               │ Bindings (Two-way)
               │ {Binding Property}
               │ {Binding Command}
┌──────────────▼──────────────────────────┐
│           ViewModel                     │
│  - Presentation logic                   │
│  - Properties (data for View)           │
│  - Commands (actions from View)         │
│  - State management (IsBusy, errors)    │
│  - Orchestrates services                │
└──────────────┬──────────────────────────┘
               │ Method calls
               │ Dependency injection
┌──────────────▼──────────────────────────┐
│           Services Layer                │
│  - Business logic                       │
│  - Data access (repositories)           │
│  - External APIs                        │
│  - Authentication                       │
└──────────────┬──────────────────────────┘
               │ EF Core / HTTP
┌──────────────▼──────────────────────────┐
│              Model                      │
│  - Data structures                      │
│  - Domain objects                       │
│  - Database entities                    │
│  - Validation rules                     │
└─────────────────────────────────────────┘
```

### Explore MVVM in StarterApp

Let's trace through a real example from the StarterApp to see MVVM in action.

#### Layer 1: View - LoginPage.xaml

**Location**: `StarterApp/Views/LoginPage.xaml`

**Open the file** and examine the bindings:

```xml
<Entry
    Text="{Binding Email}"
    Placeholder="Email"
    Keyboard="Email" />

<Entry
    Text="{Binding Password}"
    Placeholder="Password"
    IsPassword="True" />

<Button
    Command="{Binding LoginCommand}"
    Text="Login"
    IsEnabled="{Binding IsNotBusy}" />
```

**Key observations**:
- **`{Binding Email}`**: Two-way data binding - changes in UI update ViewModel, changes in ViewModel update UI
- **`{Binding LoginCommand}`**: When button is clicked, execute the command from ViewModel
- **No C# code-behind**: All logic is in the ViewModel, not the View

{: .note }
**What is data binding?** It's a mechanism that automatically synchronizes data between the View and ViewModel. When you type in the Entry, the `Email` property in the ViewModel updates automatically. When the ViewModel changes `IsNotBusy`, the button's enabled state updates automatically.

#### Layer 2: ViewModel - LoginViewModel.cs

**Location**: `StarterApp/ViewModels/LoginViewModel.cs`

**Open the file** and examine the structure:

```csharp
public partial class LoginViewModel : BaseViewModel
{
    private readonly IAuthenticationService _authService;

    public LoginViewModel(IAuthenticationService authService)
    {
        _authService = authService;  // Injected by DI
    }

    // Properties bound to View
    [ObservableProperty]
    private string email = string.Empty;

    [ObservableProperty]
    private string password = string.Empty;

    // Command bound to Button
    [RelayCommand]
    private async Task Login()
    {
        if (string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(Password))
        {
            ErrorMessage = "Please enter email and password";
            return;
        }

        IsBusy = true;
        ErrorMessage = string.Empty;

        try
        {
            var success = await _authService.LoginAsync(Email, Password);

            if (success)
            {
                // Navigate to main page
                await Shell.Current.GoToAsync("///main");
            }
            else
            {
                ErrorMessage = "Invalid credentials";
            }
        }
        catch (Exception ex)
        {
            ErrorMessage = $"Login failed: {ex.Message}";
        }
        finally
        {
            IsBusy = false;
        }
    }
}
```

**Key observations**:
- **`[ObservableProperty]`**: Generates a public property with change notification
  - Code above generates: `public string Email { get => email; set => SetProperty(ref email, value); }`
- **`[RelayCommand]`**: Generates a command that the View can bind to
  - Code above generates: `public IAsyncRelayCommand LoginCommand { get; }`
- **Presentation logic**: Validation, error messages, navigation
- **No database knowledge**: Calls `_authService`, doesn't know about DbContext
- **State management**: `IsBusy` shows loading spinner, `ErrorMessage` shows errors

#### Layer 3: Service - AuthenticationService.cs

**Location**: `StarterApp.Database/Services/AuthenticationService.cs`

We saw this earlier, but let's examine it in context:

```csharp
public class AuthenticationService : IAuthenticationService
{
    private readonly AppDbContext _context;

    public AuthenticationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> LoginAsync(string email, string password)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user == null) return false;

        return BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
    }
}
```

**Key observations**:
- **Business logic**: How to verify credentials (BCrypt verification)
- **Data access**: Uses DbContext to query database
- **No UI knowledge**: Returns a simple `bool`, doesn't know about navigation or error messages
- **Testable**: Can be unit tested by mocking `AppDbContext`

#### Layer 4: Model - User.cs

**Location**: `StarterApp.Database/Models/User.cs`

```csharp
public class User
{
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    public string PasswordHash { get; set; }

    // ... other properties
}
```

**Key observations**:
- **Pure data**: No behavior, just properties
- **Maps to database**: EF Core creates a table from this
- **Validation attributes**: `[Required]`, `[EmailAddress]`

### Tracing a Login Request Through All Layers

Let's follow what happens when a user clicks the Login button:

```
1. USER ACTION
   User types "john@example.com" and "password123"
   User clicks "Login" button
   ↓

2. VIEW (LoginPage.xaml)
   - Button's Command binding triggers LoginCommand
   - Passes control to ViewModel
   ↓

3. VIEWMODEL (LoginViewModel.cs)
   - LoginCommand executes Login() method
   - Sets IsBusy = true (shows loading spinner in UI)
   - Calls _authService.LoginAsync(Email, Password)
   ↓

4. SERVICE (AuthenticationService.cs)
   - Receives email and password
   - Queries database via DbContext
   - Verifies password using BCrypt
   - Returns true or false
   ↓

5. MODEL (User entity)
   - EF Core queries Users table
   - Returns User object (or null)
   ↓

6. BACK TO VIEWMODEL
   - Receives result from service
   - If success: Navigate to main page
   - If failure: Set ErrorMessage = "Invalid credentials"
   - Sets IsBusy = false (hides loading spinner)
   ↓

7. BACK TO VIEW
   - Data binding updates UI automatically
   - ErrorMessage displays in red
   - Loading spinner disappears
```

### Why This Separation? The Value Proposition

#### Problem Without MVVM

Imagine all logic in the code-behind (`LoginPage.xaml.cs`):

```csharp
// ❌ BAD: Everything in code-behind
private async void LoginButton_Clicked(object sender, EventArgs e)
{
    var email = EmailEntry.Text;
    var password = PasswordEntry.Text;

    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    if (user != null && BCrypt.Verify(password, user.PasswordHash))
    {
        await Navigation.PushAsync(new MainPage());
    }
    else
    {
        await DisplayAlert("Error", "Invalid credentials", "OK");
    }
}
```

**Problems**:
- UI code mixed with database code (tight coupling)
- Can't test without creating UI elements
- Can't reuse logic in different views
- Hard to maintain as app grows
- Changes to UI require changing business logic

#### Benefits of MVVM + Services

**Testability**
```csharp
// Easy to unit test ViewModels
var mockAuthService = new Mock<IAuthenticationService>();
mockAuthService.Setup(x => x.LoginAsync("test@test.com", "pass"))
               .ReturnsAsync(true);

var viewModel = new LoginViewModel(mockAuthService.Object);
await viewModel.LoginCommand.ExecuteAsync(null);

Assert.IsTrue(viewModel.IsAuthenticated);
```

**Reusability**
- `AuthenticationService` used by multiple ViewModels
- ViewModels shared across iOS, Android, Windows (same code!)
- Login logic written once, used everywhere

**Maintainability**
- Change database? Update service implementation only
- Change UI? Update XAML only
- Add feature? Clear place for each concern
- Code reviews easier (each layer reviewed separately)

**Flexibility**
- Swap implementations (local DB → API)
- A/B test different UIs with same logic
- Support multiple platforms with shared code

### The Services Layer - Deep Dive

#### What is a Service?

A **service** is a class that encapsulates specific business logic or data access. It implements an interface to enable dependency injection and testing.

**Service characteristics**:
- **Single Responsibility**: Each service does one thing (auth, data access, notifications)
- **Interface-based**: Implements an interface (enables DI and mocking)
- **Stateless** (usually): Doesn't hold user-specific state between calls
- **Injectable**: Registered in DI container, injected into consumers

#### Example: Authentication Service

**Interface (contract)**:

```csharp
public interface IAuthenticationService
{
    Task<bool> LoginAsync(string email, string password);
    Task<bool> RegisterAsync(string email, string password, string firstName, string lastName);
    Task LogoutAsync();
    bool IsAuthenticated { get; }
    User? CurrentUser { get; }
}
```

**Implementation**:

```csharp
public class AuthenticationService : IAuthenticationService
{
    private readonly AppDbContext _context;
    private User? _currentUser;

    public AuthenticationService(AppDbContext context)
    {
        _context = context;  // Dependency injected
    }

    public bool IsAuthenticated => _currentUser != null;
    public User? CurrentUser => _currentUser;

    public async Task<bool> LoginAsync(string email, string password)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user == null) return false;

        if (BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            _currentUser = user;
            return true;
        }

        return false;
    }

    // ... other methods
}
```

**Registration (MauiProgram.cs)**:

```csharp
builder.Services.AddSingleton<IAuthenticationService, AuthenticationService>();
```

**Usage in ViewModel**:

```csharp
public class LoginViewModel : BaseViewModel
{
    private readonly IAuthenticationService _authService;

    public LoginViewModel(IAuthenticationService authService)
    {
        _authService = authService;  // Automatically injected
    }

    [RelayCommand]
    private async Task Login()
    {
        var success = await _authService.LoginAsync(Email, Password);
        // Handle result...
    }
}
```

#### Why Services > Direct Database Access?

**❌ BAD: ViewModel accesses DbContext directly**

```csharp
public class LoginViewModel : BaseViewModel
{
    private readonly AppDbContext _context;

    public LoginViewModel(AppDbContext context)
    {
        _context = context;
    }

    [RelayCommand]
    private async Task Login()
    {
        // ViewModel knows about database structure
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == Email);

        // ViewModel knows about BCrypt
        if (user != null && BCrypt.Net.BCrypt.Verify(Password, user.PasswordHash))
        {
            // Success logic...
        }
    }
}
```

**Problems**:
- ViewModel knows database structure (tight coupling)
- Can't swap to API without changing ViewModel
- Hard to test (requires real database)
- Logic duplicated if multiple ViewModels need auth
- Violates Single Responsibility Principle

**✅ GOOD: ViewModel uses service**

```csharp
public class LoginViewModel : BaseViewModel
{
    private readonly IAuthenticationService _authService;

    public LoginViewModel(IAuthenticationService authService)
    {
        _authService = authService;
    }

    [RelayCommand]
    private async Task Login()
    {
        var success = await _authService.LoginAsync(Email, Password);
        if (success)
        {
            await Shell.Current.GoToAsync("///main");
        }
        else
        {
            ErrorMessage = "Invalid credentials";
        }
    }
}
```

**Benefits**:
- ViewModel doesn't know about database or BCrypt
- Can swap service implementation (API vs local DB)
- Easy to test with mock service
- Login logic centralized and reusable
- Clear separation of concerns

### Key Takeaways

{: .highlight }
**MVVM Architecture**:
- **View**: XAML markup, bindings, no logic
- **ViewModel**: Presentation logic, orchestrates services, manages state
- **Model**: Data structures, domain objects
- **Services**: Business logic, data access, reusable

{: .highlight }
**Why This Matters**:
- **Testability**: Each layer can be unit tested independently
- **Reusability**: Services used by multiple ViewModels, ViewModels shared across platforms
- **Maintainability**: Changes isolated to specific layers
- **Flexibility**: Swap implementations without breaking dependent code

{: .highlight }
**Data Flow**:
1. User interacts with **View** (clicks button, types text)
2. **View** triggers **ViewModel** via bindings (Command, Property)
3. **ViewModel** calls **Service** to perform business logic
4. **Service** accesses data via **DbContext** or **API**
5. **Service** returns result to **ViewModel**
6. **ViewModel** updates properties
7. **View** automatically updates via data binding

---

## Summary and Next Steps

In this part, you:

- Downloaded and set up the PostgreSQL-ready StarterApp
- Explored the multi-project solution architecture
- Reviewed key files: MauiProgram.cs, AppDbContext.cs, models, ViewModels
- Applied database migrations to create schema
- **Mastered the MVVM pattern and services layer**
- Traced a request through all architectural layers

### Teaching Moments Recap

- **Multi-project architecture** separates concerns (UI, data, migrations)
- **CommunityToolkit.Mvvm** reduces MVVM boilerplate with source generators (`[ObservableProperty]`, `[RelayCommand]`)
- **PostgreSQL** uses `Host` in connection string (vs. `Server` for SQL Server)
- **Service abstractions** (`IAuthenticationService`) enable testing and flexibility
- **Migrations** track schema evolution over time
- **MVVM pattern** provides clear separation between UI, logic, and data
- **Services layer** abstracts business logic for reusability and testability
- **Dependency Injection** connects all layers with loose coupling

### Next Part

Now that you understand the existing architecture, you're ready to modify it.

**[Part 2: Simplify to Note-Taking App →](part2-simplify-notes.md)**

In Part 2, you'll:
- Remove authentication complexity
- Create new models: `Note` and `Category`
- Update DbContext and generate migrations
- Create new ViewModels and Views for note-taking
- Understand schema refactoring patterns

---

**Estimated time for Part 2**: 120-150 minutes

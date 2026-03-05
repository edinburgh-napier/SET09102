---
title: Authentication
parent: StarterApp
grand_parent: C# practice
nav_order: 3
mermaid: true
---

# Local Authentication in StarterApp

This document explains how user authentication and role-based security are implemented in 
StarterApp.

---

## 1. Overview

StarterApp uses a **local authentication system** backed by a PostgreSQL database running in a
Docker container. User credentials and roles are stored locally, and authentication is performed
through the `AuthenticationService`.

---

## 2. How Login Works

1. User enters email and password in the **LoginPage**.
2. `LoginViewModel` calls `AuthenticationService.LoginAsync(...)`.
3. The service verifies the credentials and stores the authenticated user and their roles.
4. `AuthenticationStateChanged` event is raised.

### Code Snippet: Login Flow

```csharp
var result = await _authService.LoginAsync(Email, Password);
if (result.IsSuccessful)
{
    // Login succeeded, navigate to user list
    await _navigationService.NavigateToAsync("UserListPage");
}
```

---

## 3. Current User & Roles

After login, the current user and their roles can be accessed from the service:

```csharp
var currentUser = _authService.CurrentUser;
var roles = _authService.CurrentUserRoles;
```

---

## 4. Role-Based UI Logic

Role-based logic is handled in ViewModels to show/hide UI elements or enable/disable actions.

### Example

```csharp
public bool IsAdmin => _authService.CurrentUserRoles.Contains("Admin");
```

You can use `IsAdmin` in XAML bindings to control visibility or interactivity.

---

## 5. Adding New Roles

To create new roles and assign them:

1. Update the database to include new roles in the `ROLE` table.
2. Use a migration to apply the schema.
3. Assign roles to users via the `UserRoles` relationship.

---

## 6. Diagram: Authentication and Role Flow

```mermaid
sequenceDiagram
    participant User
    participant LoginPage
    participant LoginViewModel
    participant AuthenticationService
    participant Database

    User->>LoginPage: Enter credentials
    LoginPage->>LoginViewModel: Call Login()
    LoginViewModel->>AuthenticationService: LoginAsync(username, password)
    AuthenticationService->>Database: Validate user credentials
    Database-->>AuthenticationService: User data or error
    alt Credentials valid
        AuthenticationService->>Database: Get user roles
        Database-->>AuthenticationService: Role list
        AuthenticationService-->>LoginViewModel: Login success
        LoginViewModel->>LoginPage: Navigate to UserListPage
    else Invalid credentials
        AuthenticationService-->>LoginViewModel: Login failed
        LoginViewModel->>LoginPage: Show error message
    end
```

This diagram shows the process from login to role-based UI rendering.

---

## 7. Logout and Session Handling

To log out a user, clear the session state and navigate back to the login screen.

### Logout Method in AuthenticationService

```csharp
public void Logout()
{
    _currentUser = null;
    _currentUserRoles.Clear();
    AuthenticationStateChanged?.Invoke(this, false);
}
```

### Calling Logout from a ViewModel

```csharp
_authService.Logout();
await Shell.Current.GoToAsync("LoginPage");
```

> It's a good practice to clear all user-specific data from memory after logout.

---

## 8. XAML UI Bindings for Role-Based Access

Once you've exposed role-specific properties in your ViewModel (e.g., `IsAdmin`), you can 
use them in your XAML.

### Example: Showing a Button Only for Admins

```xml
<Button Text="Delete User"
        IsVisible="{Binding IsAdmin}" />
```

### Example: Disabling a Control Based on Role

```xml
<Entry Placeholder="Enter data"
       IsEnabled="{Binding IsEditor}" />
```

{: .tip-title }
> <i class="fa-regular fa-lightbulb"></i> Tip
>
> Make sure your ViewModel updates role-bound properties after login/logout using 
> `OnPropertyChanged`.

```csharp
_authService.AuthenticationStateChanged += (s, isLoggedIn) =>
{
    OnPropertyChanged(nameof(IsAdmin));
};
```

This ensures the UI updates when the user logs in or out.


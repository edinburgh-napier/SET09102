---
title: Quickstart
parent: StarterApp
grand_parent: C# practice
nav_order: 1
---

# Quickstart

There are three main stages to getting started with the StarterApp. If you have followed
all previous tutorials (the recommended approach), you may be able to skip some steps.
Please make sure that you are using the required software versions to avoid errors due
to incompatibility.

## 1. Prepare the database

Setting up a local Docker image of SQL Server is covered in the 
[Adding a database](../database/sqlserver.md) tutorial.

## 2. Install the tools

Follow the instructions in the [Getting started with Visual Studio Code](../vscode/index.md) 
tutorial to install

* .NET 9.0
* Visual Studio code
* The Android emulator

{: .note-title }
> <i class="fa-solid fa-triangle-exclamation"></i> Note
> 
> Running the app on Android may not be necessary - check the requirements of your project. If running
> on mobile is not essential, installing the Android emulator may not be necessary.

## 3. Configure the application

1. **Clone the [StarterApp repo](https://github.com/coillarach/StarterApp)**
2. **Open the solution in VSCode**
3. **Configure appsettings.json**
   The `appsettings.json` file contains setting that are specific to the local machine and which may be
   confidential. For both reasons, the file is not included in the source control repo. In our case, the 
   file contains the connection details for the database. Create the file in the `StarterApp.Database`
   project and add the content below. Replace the placeholder values with those appropriate for your
   environment.
   ```bash
   {
     "ConnectionStrings": {
         "DevelopmentConnection": "Server=<IP Address>;Database=<Database name>;User Id=<Username>;Password=<Password>;TrustServerCertificate=True;Encrypt=True;"
     }
   }
   ```
4. **Build solution**
   This step checks that the code is correct. However, the app will not run yet because more work is
   needed on the database.

## 4. Configure the database

1. **Perform initial migration**
   Follow the instructions in the 
   [Database migrations](https://edinburgh-napier.github.io/SET09102/tutorials/csharp/migration/#3-initialise-migrations)
   tutorial. Be sure to make any relevant value substitutions. For example, the command to create the
   initial migration should be 

   ```sh
    dotnet ef migrations add InitialCreate --project StarterApp.Database
    ```
   
   rather than referencing the `Notes.Database` project.

   Ensure that you make the final modification to the `AppDbContext.cs` file as specified in the 
   tutorial. This will ensure that for all subsequent migrations, you can run the migration process 
   from the `StarterApp.Migrations` project directory without having to add the `--project` option.
2. **Populate the database**
   Although Entity Framework should be able to create seed data after creating new tables, the process
   is not reliable across all platforms. Instead, create the data required to run the application by
   executing the following SQL script using your chose database management tool (e.g. DataGrip):

   ```sql
    insert into role (name, description, isdefault) values
    ('Admin', 'Administrator role with full access', 0),
    ('OrdinaryUser', 'Standard user role', 1),
    ('SpecialUser', 'Special user role with additional privileges', 0);
    
    insert into users (firstname, lastname, email, isActive, PasswordSalt, PasswordHash) values
    ('Admin', 'User', 'admin@company.com', 1, '$2a$11$dWb34DM7fBB0TA.8NSSjGO', '$2a$11$dWb34DM7fBB0TA.8NSSjGOrGDp9qrVkUbBQni8jA6y287hyO2Vz6a');
    
    insert into user_role (UserId, RoleId, IsActive) values
    (1,1,1);
   ```
   This will allow you to log into the application using email address `admin@company.com` and 
   password `Admin123!`
3. **Run the app**

## 5. Generate the documentation

1. **Install Doxygen**
   Follow the installation instructions on the [Doxygen website](https://www.doxygen.nl/)
2. **Run Doxygen**
   Follow the [instructions](https://www.doxygen.nl/manual/doxywizard_usage.html) for running the 
   Doxygen wizard.

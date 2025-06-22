---
title: Migrations
parent: StarterApp
grand_parent: C# practice
nav_order: 2
---

12. For subsequent migrations

Move Migrations folder from Database project toe Migrations project
Add the line m => m.MigrationsAssembly("StarterApp.Migrations") to AppDbContext
Run next migration from the Migrations project directory
Use command dotnet ef migrations add <label>
To apply the migration, dotnet ef migrations update

Note that the file appsettings.json is required, but it is not included in the repo because it contains local IP addresses.
Add the appsettings.json to the root folder of the Startapp.Database project. It has the following format:

```
 {
     "ConnectionStrings": {
         "DevelopmentConnection": "Server=<IP Address>;Database=<Database name>;User Id=<Username>;Password=<Password>;TrustServerCertificate=True;Encrypt=True;"
     }
 }
 ```

Replace &lt;IP Address>, &lt;Database name>, &lt;Username> and &lt;Password> with your values.

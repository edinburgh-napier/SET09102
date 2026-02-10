# StarterApp setup


<pre>
MyMauiProject/
├── .devcontainer/
│   ├── Dockerfile           # The MAUI + Android SDK image (from previous steps)
│   └── devcontainer.json    # Configures VS Code to use Docker Compose
├── src/
│   ├── MyMauiApp/           # The actual .NET MAUI project folder
│   │   ├── Platforms/
│   │   ├── MainPage.xaml
│   │   └── MyMauiApp.csproj
│   └── MyMauiApp.sln        # The solution file
├── docker-compose.yml       # Orchestrates the App and Postgres services
└── .gitignore
</pre>


## docker-compose.yml

``` yaml
services:
  app:
    build:
      context: .
      dockerfile: .devcontainer/Dockerfile
    volumes:
      - ..:/workspace:cached
    network_mode: service:db # Shares the network with the DB
    command: sleep infinity

  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: student_user
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: mauidatabase
    ports:
      - "5432:5432"
```

## .devcontainer/devcontainer.json

```json
{
    "name": "MAUI + Postgres Dev",
    "dockerComposeFile": [ "../docker-compose.yml" ],
    "service": "app",
    "workspaceFolder": "/workspace",
    "customizations": {
        "vscode": {
            "extensions": [
                "ms-dotnettools.csdevkit",
                "ms-dotnettools.dotnet-maui",
                "ckolkman.vscode-postgres" // Helpful for viewing data inside VS Code
            ]
        }
    },
    "remoteUser": "root"
}
```

## Student Workflow (Sequence of Operations)

When a student starts their assignment, they should follow this high-level sequence:

1. Open Folder: Open the MyMauiProject folder in VS Code.
2. Initialize Container: Click "Reopen in Container" when prompted. VS Code will now run docker compose up, starting both the development environment and the Postgres database.
3. Restore Dependencies: Once the terminal opens inside the container, run:

    ```bash
    dotnet restore
    ```

4. Connect to Database: In the app code (e.g., MainPage.xaml.cs), students use the following connection logic.

Note: Because we used `network_mode: service:db` in Compose, the app container can find the database using the hostname localhost.

```C#
// Inside the MAUI app
var connString = "Host=localhost;Username=student_user;Password=password123;Database=mauidatabase";
```

5. Run the App: Students select their target (e.g., Android Emulator or Windows Machine) and press F5.

   * Note: If running on a physical Android device, they must use the computer's Local IP address instead of localhost in the connection string.

## Important Tip: Persisting Data

By default, if a student deletes the Docker container, the database data is lost. To help them keep their work, add a Volume to the db service in the docker-compose.yml:

```yaml
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

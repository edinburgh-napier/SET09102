---
title: Development Environment Setup
parent: Tools
has_children: false
has_toc: false
nav_order: 5
---

# Development Environment Setup

This tutorial guides you through setting up a containerised development environment using Docker,
Visual Studio Code, .NET MAUI, and PostgreSQL. By the end, you will have a reproducible development
environment that includes everything needed for mobile app development with database support.

## Architecture Overview

The development environment uses Docker to provide a consistent build environment across all
platforms. The Android emulator runs on your host machine (for performance and GPU access),
while the container handles building and deploying your app.

```
┌─────────────────────────────────────┐
│         Host Machine                │
│  ┌─────────────────────────────┐    │
│  │   Android Emulator (GUI)    │    │
│  │   or Physical Device        │    │
│  └──────────────▲──────────────┘    │
│                 │ ADB connection    │
│  ┌──────────────┴──────────────┐    │
│  │      Docker Container       │    │
│  │  • .NET SDK 9               │    │
│  │  • MAUI workloads           │    │
│  │  • Java JDK                 │    │
│  │  • Android SDK/cmdline-tools│    │
│  │  • PostgreSQL client        │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

## 1. Install Docker Desktop

Docker Desktop provides a graphical interface for managing containers and includes everything
needed to run containerised applications on your computer.

[Windows](){: .btn .btn-blue .tab-control data-tabset="docker" data-seq="1" }
[Mac](){: .btn .tab-control data-tabset="docker" data-seq="2" }
[Linux](){: .btn .tab-control data-tabset="docker" data-seq="3" }

> Download Docker Desktop from the [Docker website](https://www.docker.com/products/docker-desktop/){:target="_blank"}
> and run the installer.
>
> {: .warning-title }
> > <i class="fa-solid fa-triangle-exclamation"></i> Warning
> >
> > Docker Desktop on Windows requires WSL 2 (Windows Subsystem for Linux). If you don't have it
> > installed, the Docker installer will prompt you to enable it. You may need to restart your
> > computer during this process.
>
> After installation, Docker Desktop should start automatically. You can verify it's running by
> looking for the Docker whale icon in your system tray.
>
> ![Fig. 1. Docker Desktop running on Windows](images/docker_desktop_windows.png){: standalone #fig1 data-title="Docker Desktop running on Windows" }
>
{: .tab data-tabset="docker" data-seq="1" }

> Download Docker Desktop from the [Docker website](https://www.docker.com/products/docker-desktop/){:target="_blank"}.
>
> {: .note-title }
> > <i class="fa-solid fa-circle-info"></i> Note
> >
> > Make sure you download the correct version for your Mac:
> > - **Apple Silicon** (M1, M2, M3, M4 chips): Download the "Apple Silicon" version
> > - **Intel**: Download the "Intel chip" version
> >
> > You can check your chip type by clicking the Apple menu and selecting "About This Mac".
>
> Open the downloaded `.dmg` file and drag the Docker icon to your Applications folder.
> Launch Docker from your Applications folder.
>
> ![Fig. 2. Docker Desktop running on Mac](images/docker_desktop_mac.png){: standalone #fig2 data-title="Docker Desktop running on Mac" }
>
{: .tab data-tabset="docker" data-seq="2" }

> On most Linux distributions, you can install Docker Engine using your package manager.
> For Ubuntu/Debian:
>
> ```bash
> sudo apt-get update
> sudo apt-get install docker.io docker-compose-v2
> sudo usermod -aG docker $USER
> ```
>
> Log out and back in for the group change to take effect. Alternatively, you can install
> [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/){:target="_blank"}
> if you prefer a graphical interface.
>
{: .tab data-tabset="docker" data-seq="3" }

Verify Docker is installed correctly by opening a terminal and running:

```bash
docker --version
```

You should see output similar to `Docker version 24.0.0` or higher.

## 2. Install Visual Studio Code and Extensions

Follow the installation instructions for your operating system on the
[VSCode website](https://code.visualstudio.com/download){:target="_blank"}.

Once VSCode is installed, you need to add the following extensions:

| Extension | Extension ID | Purpose |
|-----------|--------------|---------|
| Dev Containers | ms-vscode-remote.remote-containers | Develop inside Docker containers |
| Docker | ms-azuretools.vscode-docker | Manage Docker containers and images |
| Database Client | cweijan.vscode-postgresql-client2 | Connect to and query PostgreSQL databases |
| .NET MAUI | dotnettools.dotnet-maui | .NET MAUI development support |
| AVD Manager | toroxx.vscode-avdmanager | Manage Android Virtual Devices |

To install an extension, open VSCode and press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
to open the Extensions panel. Search for each extension by name and click Install.

![Fig. 3. Required VSCode extensions installed](images/vscode_extensions.png){: standalone #fig3 data-title="Required VSCode extensions installed" }

## 3. Create the Project Structure

Create a new project folder with the required subdirectory for the dev container configuration.

[Windows](){: .btn .btn-blue .tab-control data-tabset="mkdir" data-seq="1" }
[Mac/Linux](){: .btn .tab-control data-tabset="mkdir" data-seq="2" }

> Open a command prompt and run:
>
> ```
> mkdir MauiDevProject
> cd MauiDevProject
> mkdir .devcontainer
> ```
>
{: .tab data-tabset="mkdir" data-seq="1" }

> Open a terminal and run:
>
> ```bash
> mkdir -p MauiDevProject/.devcontainer
> cd MauiDevProject
> ```
>
{: .tab data-tabset="mkdir" data-seq="2" }

Open the `MauiDevProject` folder in VSCode using **File > Open Folder...** or by running
`code .` from the terminal while in the project directory.

Your project structure should look like this:

```
MauiDevProject/
└── .devcontainer/
```

## 4. Create the Dockerfile

The Dockerfile defines the development container with all the tools needed for .NET MAUI
development, including the .NET SDK, MAUI workloads, Java JDK, and Android SDK.

Create a file called `Dockerfile` in the project root directory with the following content:

```dockerfile
FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install .NET SDK 9
RUN wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh \
    && chmod +x dotnet-install.sh \
    && ./dotnet-install.sh --channel 9.0 --install-dir /usr/share/dotnet \
    && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet \
    && rm dotnet-install.sh

# Install MAUI workloads
RUN dotnet workload install maui

# Install Java JDK (required for Android SDK)
RUN apt-get update && apt-get install -y openjdk-17-jdk

# Install Android SDK command-line tools
ENV ANDROID_HOME=/opt/android-sdk
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
RUN mkdir -p ${ANDROID_HOME}/cmdline-tools \
    && wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip \
    && unzip commandlinetools-linux-*.zip -d ${ANDROID_HOME}/cmdline-tools \
    && mv ${ANDROID_HOME}/cmdline-tools/cmdline-tools ${ANDROID_HOME}/cmdline-tools/latest \
    && rm commandlinetools-linux-*.zip

# Accept licenses and install platform tools
RUN yes | ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --licenses \
    && ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-34"

ENV PATH="${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools"
```

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> Note
>
> **Understanding the Dockerfile:**
>
> - **.NET SDK 9** - The latest .NET SDK for building MAUI applications
> - **MAUI workloads** - Required components for cross-platform mobile development
> - **Java JDK 17** - Required by the Android SDK tools
> - **Android SDK** - Command-line tools for building and deploying Android apps
> - **Platform tools** - ADB and other utilities for communicating with Android devices

## 5. Configure Docker Compose

Docker Compose allows you to define and run multi-container applications. We will create a
configuration with two services: an application container for development and a PostgreSQL
database container.

Create a file called `docker-compose.yml` in the project root directory with the following content:

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - .:/workspace:cached
    network_mode: service:db
    command: sleep infinity
    extra_hosts:
      - "host.docker.internal:host-gateway"

  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_password
      POSTGRES_DB: devdb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> Note
>
> **Understanding the configuration:**
>
> - `build` - Builds the container using our custom Dockerfile instead of a base image
> - `network_mode: service:db` - This connects the app container directly to the database
>   container's network. This means you can connect to PostgreSQL using `localhost:5432` from
>   within the app container.
> - `extra_hosts` - Allows the container to connect to services running on the host machine
>   (such as the Android emulator) using the hostname `host.docker.internal`
> - `volumes: postgres_data` - This creates a named volume that persists your database data
>   even when containers are stopped or removed.
> - `command: sleep infinity` - This keeps the app container running so VSCode can connect to it.

![Fig. 4. Docker Compose architecture diagram](images/docker_compose_diagram.png){: standalone #fig4 data-title="Docker Compose architecture diagram" }

## 6. Configure the Dev Container

The dev container configuration tells VSCode how to use the Docker Compose setup for development.

Create a file called `devcontainer.json` inside the `.devcontainer` directory with the following content:

```json
{
    "name": "MAUI Dev Environment",
    "dockerComposeFile": ["../docker-compose.yml"],
    "service": "app",
    "workspaceFolder": "/workspace",
    "customizations": {
        "vscode": {
            "extensions": [
                "cweijan.vscode-postgresql-client2",
                "ms-dotnettools.dotnet-maui",
                "toroxx.vscode-avdmanager"
            ]
        }
    },
    "remoteUser": "root"
}
```

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> Note
>
> **Understanding the configuration:**
>
> - `dockerComposeFile` - Points to your Docker Compose configuration
> - `service` - Specifies which container VSCode should connect to
> - `workspaceFolder` - The folder inside the container where your project files appear
> - `customizations.vscode.extensions` - Extensions to install automatically inside the container,
>   including the PostgreSQL client, .NET MAUI tools, and AVD Manager

Your project structure should now look like this:

```
MauiDevProject/
├── .devcontainer/
│   └── devcontainer.json
├── docker-compose.yml
└── Dockerfile
```

## 7. Create a .gitignore File

Before initialising a git repository, create a `.gitignore` file to exclude sensitive and
unnecessary files from version control.

Create a file called `.gitignore` in the project root directory:

```
# Environment files
.env
.env.local
.env.*.local

# IDE settings
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db

# Docker volumes (if using bind mounts for data)
postgres_data/

# .NET build outputs
[Bb]in/
[Oo]bj/
[Ll]og/
[Ll]ogs/

# User-specific files
*.rsuser
*.suo
*.user
*.userosscache
*.sln.docstates
```

{: .warning-title }
> <i class="fa-solid fa-triangle-exclamation"></i> Warning
>
> Never commit database credentials or `.env` files containing passwords to version control.
> The credentials in this tutorial are for local development only.

## 8. Open the Project in the Container

Now you can open the project inside the development container.

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the command palette.
2. Type "Reopen in Container" and select **Dev Containers: Reopen in Container**.

![Fig. 5. Building the container](images/building_container.png){: standalone #fig5 data-title="Building the container in VSCode" }

{: .warning-title }
> <i class="fa-solid fa-triangle-exclamation"></i> Warning
>
> The first time you do this, Docker will build the custom image and download the required
> components (.NET SDK, MAUI workloads, Java JDK, Android SDK). This may take 10-15 minutes
> depending on your internet connection. Subsequent starts will be much faster as the image
> is cached locally.

Once the container is ready, you will see the project files in the Explorer panel, and the
bottom-left corner of VSCode will show "Dev Container: MAUI Dev Environment".

![Fig. 6. VSCode running inside the container](images/vscode_container_running.png){: standalone #fig6 data-title="VSCode running inside the container" }

### Verify the Development Tools

Open a terminal (`Ctrl+`` ` or `Cmd+`` `) and verify the development tools are installed:

```bash
# Check .NET version
dotnet --version

# Check MAUI workloads
dotnet workload list

# Check Android SDK
sdkmanager --version
```

You should see .NET 9.x, the MAUI workloads listed, and the Android SDK manager version.

![Fig. 7. Terminal inside container showing configuration details](images/vscode_terminal_container.png){: standalone #fig7 data-title="Terminal inside container showing configuration details" }

## 9. Connect to PostgreSQL from VSCode

The Database Client extension allows you to browse and query your database directly from VSCode.

1. Click on the Database icon in the Activity Bar on the left side of VSCode.
2. Click the **+** button to create a new connection and select **PostgreSQL**.
3. Enter the following connection details:

| Parameter | Value |
|-----------|-------|
| Connection Name | MauiDevProject |
| Group | (leave blank) |
| Hostname | localhost |
| Port | 5432 |
| Username | dev_user |
| Password | dev_password |
| Database | devdb |
| Use SSL | No |

![Fig. 8. PostgreSQL connection configuration](images/postgres_connection.png){: standalone #fig8 data-title="PostgreSQL connection configuration" }

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> Note
>
> Because the app container uses `network_mode: service:db`, it shares the network namespace
> with the database container. This means PostgreSQL is accessible at `localhost:5432` from
> within the app container.

Once connected, you can expand the connection in the sidebar to see databases, schemas, and tables.

## 10. Verify the Database Setup

Let's verify the database connection is working by creating a simple table and querying it.

### Create a test table

Expand the `devdb` database in the sidebar until you can see the `public > Query` element. Click on
the`+` icon to create a new query called `create_table`. Enter the following SQL and execute it by
clicking the Run button:

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    enrolled_date DATE DEFAULT CURRENT_DATE
);
```

![Fig. 9. Creating a test table in PostgreSQL](images/postgres_create_table.png){: standalone #fig9 data-title="Creating a test table in PostgreSQL" }

### Insert sample data

Run the following SQL to add some test records:

```sql
INSERT INTO students (name, email) VALUES
    ('Alice Smith', 'alice@example.com'),
    ('Bob Jones', 'bob@example.com'),
    ('Charlie Brown', 'charlie@example.com');
```

### Query the data

Run a SELECT query to verify the data was inserted:

```sql
SELECT * FROM students;
```

![Fig. 10. Query results showing test data](images/postgres_query_result.png){: standalone #fig10 data-title="Query results showing test data" }

You should see three rows returned with the student data you inserted.

### Clean up (optional)

If you want to remove the test table:

```sql
DROP TABLE students;
```

## 11. Android Emulator Setup (Host Machine)

The Android emulator runs on your host machine rather than inside the container. This provides
better performance and access to hardware acceleration. For detailed instructions on setting up
the Android emulator, see the [Getting started with Visual Studio Code](../../csharp/vscode/) tutorial.

The key steps are:
1. Install the Android emulator on your host machine
2. Create an Android Virtual Device (AVD)
3. Connect the container to the host emulator via ADB

## 12. Managing Your Development Environment

### Starting and stopping

**To stop the containers:** Close VSCode or use the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
and select **Dev Containers: Reopen Folder Locally**.

You can also stop containers from the terminal:

```bash
docker compose down
```

**To start the containers again:** Open the project in VSCode and select
**Dev Containers: Reopen in Container** from the command palette.

### Returning to local development

To switch back to developing outside the container, use the command palette and select
**Dev Containers: Reopen Folder Locally**. Your files remain on your local machine and are
always accessible.

### Persistent data

The PostgreSQL data is stored in a Docker volume called `postgres_data`. This means your
database contents persist across container restarts. To completely reset the database, you
would need to remove this volume:

```bash
docker volume rm mauidevproject_postgres_data
```

{: .warning-title }
> <i class="fa-solid fa-triangle-exclamation"></i> Warning
>
> Removing the volume deletes all data in the database. Only do this if you want to start fresh.

### Rebuilding the container

If you need to update the development tools or modify the Dockerfile, rebuild the container:

1. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Select **Dev Containers: Rebuild Container**

This will rebuild the Docker image with any changes you've made to the Dockerfile.

### Troubleshooting

| Problem | Solution |
|---------|----------|
| Docker not running | Start Docker Desktop and wait for it to fully initialise |
| Port 5432 already in use | Stop any local PostgreSQL instance or change the port in docker-compose.yml |
| Container fails to start | Check Docker Desktop logs or run `docker compose logs` from the project directory |
| Cannot connect to database | Verify the containers are running with `docker compose ps` |
| Extensions not loading | Rebuild the container: Command Palette > Dev Containers: Rebuild Container |
| .NET SDK not found | Rebuild the container to ensure the Dockerfile completed successfully |
| ADB cannot connect to emulator | See the ADB troubleshooting section in the MAUI tutorial |

### Useful Docker commands

| Command | Description |
|---------|-------------|
| `docker compose ps` | List running containers for this project |
| `docker compose logs` | View container logs |
| `docker compose logs db` | View only database container logs |
| `docker compose logs app` | View only app container logs |
| `docker compose down` | Stop and remove containers |
| `docker compose down -v` | Stop containers and remove volumes (deletes data) |
| `docker compose build --no-cache` | Rebuild the image from scratch |
| `docker volume ls` | List all Docker volumes |

---
title: Getting Started
parent: StarterApp
grand_parent: C# practice
nav_order: 2
---

# 4. Getting Started

## Step 1: Download and unzip StarterApp

1. Click [Download StarterApp ZIP](https://edinburgh-napier.github.io/SET09102/downloads/starterapp.zip)
2. Extract the ZIP file to your desired location (e.g., `~/Projects/StarterApp` on Mac or Linux; `C:\Projects\StarterApp` on Windows)

The StarterApp provides:

* Docker Compose setup with MAUI app container + PostgreSQL container
* Basic authentication and navigation (already implemented - use this for API auth)
* Entity Framework Core with migrations
* Connection to containerised PostgreSQL 16

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> Apple Silicon Macs
>
> Edit the `docker-compose.yml` file and uncomment the line `platform: linux/amd64` as we did in the setup tutorial.

## Step 2: Configure Database Connection

StarterApp provides an `appsettings.json.template` in the StarterApp.Database for you to configure.
For local development, the app connects to PostgreSQL using:

<pre><code class="language-csharp">"Host=10.0.2.2:5432;Username=app_user;Password=app_password;Database=appdb";
</code></pre>

`10.0.2.2` is the IP address of the Docker host machine.

Once you have updated the connection string, change the name of the file to `appsettings.json` (i.e. remove the `.template`).

Check that the database is accessible using the database option in the left-hand menu in VS Code. You should see a Postgres connection named `AppDB`.

## Step 3: Reset the container environment

In StarterApp, Docker Compose is configured to create the required tables in the database when you first build
the container. However, there may be conflicts with the previous exercise. To prevent this, we will tell Docker
Compose to remove the existing database and recreate it. In a terminal window on the host computer, change into
the project home directory and execute the following command:

```bash
docker compose down -v
```

This will stop and remove all old containers, networks, and volumes and set up new ones for StarterApp. You should
only have to do this once if you are working on your own computer. If you are using one of the lab machines, you
can skip this step if this is a fresh session and you are not coming directly from the setup tutorial.

## Step 4: Open in VS Code Dev Container

1. Open the project folder in VS Code
2. Click "Reopen in Container" when prompted

## Step 5: Rebuild everything

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> Note
>
> The first time they are run, some of these steps take several minutes - please be patient.
> Wait until each task has finished before starting the next.

1. Activate the command palette with SHIFT+CTRL+P or SHIFT+CMD+P and choose `Dev Containers: Rebuild Container Without Cache`.
   This task is finished when you can see `Projects: 3` in the status bar. If it looks as though there is a pending task
   labelled `Android: Analyzing Environment...`, you can ignore it.
2. Use the command palette to start a new terminal window. Then execute the following commands:

   ```
   dotnet clean
   dotnet build -c Debug
   ```

{: .warning-title }
> <i class="fa-solid fa-triangle-exclamation"></i> Monitor the build
>
> Sometimes the build step can get stuck at the `_CompileResources` step. If this step takes longer
> than 10s, open another terminal and execute the following steps:
>
> 1. Find the process number of the build command with `pgrep -a dotnet`. The process number you need
>    is the one at the start of the line that contains `dotnet build`.
> 2. Kill the process with the command `kill -9 XXX` where `XXX` is the process number from the previous step.
> 3. Close the new terminal with the command `exit`.
> 4. Back in the original terminal, run the same command again.

## Step 6: Test the Starter App

Locate the file `com.companyname.starterapp-Signed.apk` in the `bin/Debug/net10.0-android` folder.

Check that the emulator and the ADB server are running on the host computer. Then execute the following commands:

```
adb uninstall com.companyname.starterapp
adb install -r PATH_TO_YOUR_APK_FILE
```

Once installed, launch the app from the emulator.

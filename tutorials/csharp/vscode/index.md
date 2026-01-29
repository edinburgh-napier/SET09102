---
title: Getting started with Visual Studio Code
parent: C# practice
grand_parent: Tutorials
nav_order: 2
---
# Getting started with Visual Studio Code

This tutorial covers setting up the Android emulator on your host machine and creating .NET MAUI
projects inside the containerised development environment.

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> Prerequisites
>
> Before starting this tutorial, complete the [Development Environment Setup](../../tools/dev-environment/)
> tutorial to set up your Docker-based development container with .NET SDK, MAUI workloads, and
> Android SDK tools.

## 1. Set Up Android SDK on Host (for Emulator)

The Android emulator runs on your host machine for better performance and GPU acceleration.
You need to install the Android SDK tools locally to manage the emulator.

### Create environment variables

Environment variables tell the Android tools where to find their components.

[Windows](){: .btn .btn-blue .tab-control data-tabset="env" data-seq="1" }
[Mac](){: .btn .tab-control data-tabset="env" data-seq="2" }

> The following variables are required for the Android emulator.
>
> | Variable         | Description                                                            | Value                          |
> |------------------|------------------------------------------------------------------------|--------------------------------|
> | JAVA_HOME        | Stores the root directory of a Java SDK                                | C:\Users\USERNAME\MAUI\java    |
> | ANDROID_HOME     | Stores the root of an Android SDK                                      | C:\Users\USERNAME\MAUI\android |
> | ANDROID_SDK_HOME | Stores the directory that contains user-specific settings such as ADVs | C:\Users\USERNAME\.android     |
>
> Replace **USERNAME** with your Windows username.
>
> ### Create the directories
>
> ```
> mkdir C:\Users\USERNAME\MAUI
> mkdir C:\Users\USERNAME\MAUI\android
> mkdir C:\Users\USERNAME\MAUI\java
> ```
>
> ### Create the variables
>
> In the Start menu panel, start typing *Environment variables* and choose the option to edit them when it
> appears. You will be taken to the system control panel as shown below where you should click the
> *Environment Variables* button.
>
> ![Fig. 1. Creating environment variables on Windows](images/env_var_win_1.png){: standalone #fig1 .h20 data-title="Creating environment variables on Windows"}
>
> In the next dialog, there are two panels. Click *New...* in the top panel for a new user variable and
> fill in the details.
>
> ![Fig. 2. New variable](images/env_var_win_2.png){: standalone #fig2 data-title="New variable"}
>
> To make the Android SDK command-line tools available from any directory, you also need to update the
> *PATH* environment variable. Specifically, you need to add the directory
> *%ANDROID_HOME%\cmdline-tools\11.0\bin* to the PATH - follow the steps indicated in the image below.
>
> ![Fig. 3. Updating the PATH on Windows](images/env_var_win_3.png){: standalone #fig4 data-title="Updating the PATH on Windows"}
>
> The changes will not be visible in any CMD or PowerShell windows that are currently open.
> You will need to close and re-open them to pick up the new variables.
>
{: .tab data-tabset="env" data-seq="1" }

> The following variables are required for the Android emulator.
>
> | Variable         | Description                                                            | Value                        |
> |------------------|------------------------------------------------------------------------|------------------------------|
> | JAVA_HOME        | Stores the root directory of a Java SDK                                | /Users/USERNAME/MAUI/java    |
> | ANDROID_HOME     | Stores the root of an Android SDK                                      | /Users/USERNAME/MAUI/android |
> | ANDROID_SDK_HOME | Stores the directory that contains user-specific settings such as ADVs | /Users/USERNAME/.android     |
>
> Replace **USERNAME** with your Mac username.
>
> ### Create the directories
>
> ```bash
> mkdir -p ~/MAUI/android ~/MAUI/java
> ```
>
> ### Create the variables
>
> Edit the `.zshrc` file in your home directory and add the following lines at the end:
>
> ```sh
> # Environment variables for Android emulator
> export JAVA_HOME=${HOME}/MAUI/java
> export ANDROID_HOME=${HOME}/MAUI/android
> export ANDROID_SDK_HOME=${HOME}/MAUI
> export PATH=${PATH}:${ANDROID_HOME}/cmdline-tools/11.0/bin
> export PATH=${PATH}:${ANDROID_HOME}/emulator
> export PATH=${PATH}:${ANDROID_HOME}/platform-tools
> ```
>
> The new settings will not affect any currently running terminal windows. Restart your terminal
> or run `source ~/.zshrc` to apply the changes.
>
{: .tab data-tabset="env" data-seq="2" }

### Install Android SDK command-line tools

Download the Android SDK command-line tools from the
[Android developer website](https://developer.android.com/studio#command-tools){:target="_blank"}.

Extract the downloaded archive and copy the `cmdline-tools` folder to your ANDROID_HOME directory,
renaming it to include a version number:

[Windows](){: .btn .btn-blue .tab-control data-tabset="cmdline" data-seq="1" }
[Mac](){: .btn .tab-control data-tabset="cmdline" data-seq="2" }

> ```
> mkdir %ANDROID_HOME%\cmdline-tools\11.0
> :: Copy contents of extracted cmdline-tools folder to %ANDROID_HOME%\cmdline-tools\11.0
> ```
>
{: .tab data-tabset="cmdline" data-seq="1" }

> ```bash
> mkdir -p $ANDROID_HOME/cmdline-tools/11.0
> # Copy contents of extracted cmdline-tools folder to $ANDROID_HOME/cmdline-tools/11.0
> ```
>
{: .tab data-tabset="cmdline" data-seq="2" }

Verify the installation by running:

```
sdkmanager --version
```

## 2. Install Android Emulator

The emulator is a separate component that hosts Android virtual devices.

[<i class="fa-solid fa-circle-info icon"></i>](https://developer.android.com/tools/sdkmanager){:target="_blank"}
<hr class="icon-prefix">

{% highlight shell %}sdkmanager --install emulator {% endhighlight %}

{: .warning-title }
> <i class="fa-solid fa-triangle-exclamation"></i> Warning
>
> If the command above fails with the message *Failed to find package 'emulator'*, you can
> install an emulator manually. [Download the latest version](https://developer.android.com/studio/emulator_archive),
> unzip it and copy the *emulator* directory into the *ANDROID_HOME* directory.
>
> Copy the file *package.xml* from the *setup* directory in your cloned repo into the
> *emulator* directory. Edit the last line of the file so that the revision number
> corresponds to the version of the emulator that you downloaded.

## 3. Install AVD Image

The emulator needs a system image to run. Choose the appropriate image for your platform:

[Windows and Intel Mac](){: .btn .btn-blue .tab-control data-tabset="avd" data-seq="1" }
[Apple Silicon Mac](){: .btn .tab-control data-tabset="avd" data-seq="2" }

> ```
> sdkmanager --install "system-images;android-34;google_apis;x86_64"
> ```
>
{: .tab data-tabset="avd" data-seq="1" }

> ```
> sdkmanager --install "system-images;android-34;google_apis;arm64-v8a"
> ```
>
{: .tab data-tabset="avd" data-seq="2" }

You can see all available images with:

{% highlight shell %}sdkmanager --list {% endhighlight %}

## 4. Configure AVD Manager in VSCode

The AVD Manager extension in VSCode allows you to create and manage Android Virtual Devices.

Activate the AVD Manager panel by clicking the Android icon in the left-hand menu.

You may see prompts to configure the required paths. If not, open the VSCode command palette
(`Ctrl+Shift+P` on Windows or `Cmd+Shift+P` on Mac) and type *AVD* to find the settings.

![Fig. 4. Updating AVD Manager paths](images/avd_update_paths.png){: standalone #fig6 data-title="Updating AVD Manager paths"}

The values you need are:

[Windows](){: .btn .btn-blue .tab-control data-tabset="paths" data-seq="1" }
[Mac](){: .btn .tab-control data-tabset="paths" data-seq="2" }

> | Variable         | Description                                    | Value                                                            |
> |------------------|------------------------------------------------|------------------------------------------------------------------|
> | SDK Manager path | Path to the sdkmanager executable              | C:\Users\USERNAME\MAUI\android\cmdline-tools\11.0\bin\sdkmanager |
> | SDK root path    | Same as the ANDROID\_HOME environment variable | C:\Users\USERNAME\MAUI\android                                   |
> | AVD Manager path | Path to the avdmanager executable              | C:\Users\USERNAME\MAUI\android\cmdline-tools\11.0\bin\avdmanager |
> | Emulator path    | Path to the emulator executable                | C:\Users\USERNAME\MAUI\android\emulator\emulator.exe             |
>
{: .tab data-tabset="paths" data-seq="1" }

> | Variable         | Description                                    | Value                                                          |
> |------------------|------------------------------------------------|----------------------------------------------------------------|
> | SDK Manager path | Path to the sdkmanager executable              | /Users/USERNAME/MAUI/android/cmdline-tools/11.0/bin/sdkmanager |
> | SDK root path    | Same as the ANDROID\_HOME environment variable | /Users/USERNAME/MAUI/android                                   |
> | AVD Manager path | Path to the avdmanager executable              | /Users/USERNAME/MAUI/android/cmdline-tools/11.0/bin/avdmanager |
> | Emulator path    | Path to the emulator executable                | /Users/USERNAME/MAUI/android/emulator/emulator                 |
>
{: .tab data-tabset="paths" data-seq="2" }

Once configured, the AVD Manager will display information about installed SDK components.

![Fig. 5. SDK details](images/sdk_details.png){: standalone #fig7 data-title="SDK details"}

## 5. Create an Android Virtual Device (AVD)

Create an AVD using the Google Pixel 7 Pro device profile:

[Windows and Intel Mac](){: .btn .btn-blue .tab-control data-tabset="avd2" data-seq="1" }
[Apple Silicon Mac](){: .btn .tab-control data-tabset="avd2" data-seq="2" }

> ```
> avdmanager create avd -d 30 --name Pixel_7_Pro -k "system-images;android-34;google_apis;x86_64"
> ```
>
{: .tab data-tabset="avd2" data-seq="1" }

> ```
> avdmanager create avd -d 30 --name Pixel_7_Pro -k "system-images;android-34;google_apis;arm64-v8a"
> ```
>
{: .tab data-tabset="avd2" data-seq="2" }

Click the refresh icon in the *Android Virtual Device* panel to see the newly-created AVD.
Start it by clicking the *Run* icon next to its name.

## 6. Create a New MAUI Project (in Container)

With the development container running, create a new .NET MAUI project.

Open the command palette in VSCode (`Ctrl+Shift+P` in Windows or `Cmd+Shift+P` on Mac)
and select the `.NET: New Project...` option. Enter the values shown below:

| Prompt                 | Response                                                                |
|------------------------|-------------------------------------------------------------------------|
| Project type           | `.NET MAUI App Android, iOS, Mac Catalyst, macOS, MAUI, Tizen, Windows` |
| Project root directory | Create a folder in `/workspace` called `Notes`                          |
| Project name           | `Notes`                                                                 |
| Options confirmation   | Press ENTER to confirm your choices                                     |

VSCode will generate a complete default application for you.

## 7. Build the Project (in Container)

Open a terminal inside the container and build the project:

```bash
cd /workspace/Notes
dotnet build -f net9.0-android
```

Alternatively, right-click the project name in the *Solution Explorer* and select *Build*.

![Fig. 6. Building the project](images/vscode_build.png){: standalone #fig5 .h30 data-title="Building the project"}

If the build succeeds, you're ready to connect to the emulator.

## 8. Connect Container to Host Emulator via ADB

To deploy apps from the container to the emulator running on your host, you need to set up
ADB (Android Debug Bridge) networking.

### Start ADB server on host (one-time per session)

On your **host machine** (outside the container), open a terminal and run:

[Windows](){: .btn .btn-blue .tab-control data-tabset="adb" data-seq="1" }
[Mac/Linux](){: .btn .tab-control data-tabset="adb" data-seq="2" }

> ```
> adb kill-server
> adb -a -P 5037 nodaemon server start
> ```
>
> Leave this terminal window open while developing.
>
{: .tab data-tabset="adb" data-seq="1" }

> ```bash
> adb kill-server
> adb -a -P 5037 nodaemon server start
> ```
>
> Leave this terminal window open while developing.
>
{: .tab data-tabset="adb" data-seq="2" }

### Configure ADB in container

In the **container terminal** inside VSCode, set the ADB server address:

```bash
export ADB_SERVER_SOCKET=tcp:host.docker.internal:5037
```

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> Note
>
> Add this export command to your container's shell profile (e.g., `~/.bashrc`) to make it
> persistent across terminal sessions.

### Verify the connection

With the emulator running on your host, verify the container can see it:

```bash
adb devices
```

You should see your emulator listed, something like:

```
List of devices attached
emulator-5554	device
```

## 9. Run the App on the Emulator

With the ADB connection established:

1. Make sure the Android emulator is running on your host machine
2. In VSCode (inside the container), click the curly brackets in the status bar
3. Select *Debug Target* and choose the emulator from the list

![Fig. 7. Selecting a debug target in VSCode](images/vscode_debug_target.png){: standalone #fig8 data-title="Selecting a debug target in VSCode"}

4. Click the *Run* icon in the control panel on the left
5. Follow the prompts to select the debugger and run configuration

![Fig. 8. Debugging in VSCode](images/vscode_debug.png){: standalone #fig9 data-title="Debugging in VSCode"}

After a few moments, your app should appear on the emulator:

![Fig. 9. Default MAUI app running on the Android emulator](images/default_app.png){: standalone #fig10 data-title="Default MAUI app running on the Android emulator"}

## Troubleshooting

| Problem | Solution |
|---------|----------|
| ADB cannot find devices | Ensure ADB server is running on host with `-a` flag for network access |
| "Connection refused" from container | Check that `host.docker.internal` resolves correctly; restart Docker if needed |
| Emulator not appearing in debug targets | Verify `adb devices` shows the emulator; restart the ADB server |
| Build fails with SDK not found | Rebuild the dev container to ensure Android SDK installed correctly |
| Emulator runs slowly | Enable hardware acceleration (HAXM on Intel, Hypervisor on Apple Silicon) |

## Using a Physical Android Device

Instead of the emulator, you can use a physical Android device:

1. Enable Developer Options on your Android device (tap Build Number 7 times in Settings > About)
2. Enable USB Debugging in Developer Options
3. Connect the device to your computer via USB
4. The device should appear in `adb devices` on the host
5. The container will see it through the ADB server connection

## Next Steps

- Learn about [Git and GitHub](../../tools/github/) for version control
- Explore the MAUI documentation for building your app's UI

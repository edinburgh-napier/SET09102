---
title: Android Studio and Emulator
parent: Tools
has_children: false
has_toc: false
nav_order: 2
---

# Android Studio and Emulator

This tutorial guides you through installing Android Studio and setting up the Android emulator
for testing .NET MAUI applications. Android Studio provides a graphical interface for managing
the Android SDK, emulator, and Android Virtual Devices (AVDs).

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> Alternative Approach
>
> If you prefer a command-line approach without installing Android Studio, see the
> [Development Environment Setup](../dev-environment/) tutorial which covers setting up
> the Android SDK tools manually within a containerised development environment.

## 1. Download and Install Android Studio

Android Studio is the official IDE for Android development and includes all the tools needed
to run the Android emulator.

[Windows](){: .btn .btn-blue .tab-control data-tabset="install" data-seq="1" }
[Mac](){: .btn .tab-control data-tabset="install" data-seq="2" }
[Linux](){: .btn .tab-control data-tabset="install" data-seq="3" }

> 1. Download Android Studio from the [official website](https://developer.android.com/studio){:target="_blank"}
> 2. Run the downloaded `.exe` installer
> 3. Follow the installation wizard, accepting the default options
> 4. Choose "Standard" installation type when prompted
>
> {: .note-title }
> > <i class="fa-solid fa-circle-info"></i> Disk Space
> >
> > Android Studio requires approximately 4GB of disk space for the IDE, plus additional space
> > for the Android SDK and system images (typically 10-15GB total for a complete setup).
>
{: .tab data-tabset="install" data-seq="1" }

> 1. Download Android Studio from the [official website](https://developer.android.com/studio){:target="_blank"}
>
> {: .note-title }
> > <i class="fa-solid fa-circle-info"></i> Mac Chip Type
> >
> > Make sure you download the correct version for your Mac:
> > - **Apple Silicon** (M1, M2, M3, M4 chips): Download the "Mac with Apple chip" version
> > - **Intel**: Download the "Mac with Intel chip" version
> >
> > You can check your chip type by clicking the Apple menu and selecting "About This Mac".
>
> 2. Open the downloaded `.dmg` file
> 3. Drag Android Studio to the Applications folder
> 4. Launch Android Studio from the Applications folder
> 5. If prompted about the app being downloaded from the internet, click "Open"
>
{: .tab data-tabset="install" data-seq="2" }

> 1. Download Android Studio from the [official website](https://developer.android.com/studio){:target="_blank"}
> 2. Extract the downloaded archive:
>
> ```bash
> sudo tar -xzf android-studio-*.tar.gz -C /opt/
> ```
>
> 3. Run Android Studio:
>
> ```bash
> /opt/android-studio/bin/studio.sh
> ```
>
> {: .note-title }
> > <i class="fa-solid fa-circle-info"></i> Desktop Entry
> >
> > To add Android Studio to your application menu, use **Tools > Create Desktop Entry**
> > from within Android Studio after it's running.
>
{: .tab data-tabset="install" data-seq="3" }

![Fig. 1. Android Studio download page](images/android_studio_download.png){: standalone #fig1 data-title="Android Studio download page" }

## 2. First Launch Configuration

When you first launch Android Studio, a setup wizard guides you through the initial configuration.

1. On the welcome screen, click **Next** to begin setup
2. Select **Standard** installation type (recommended)
3. Choose your preferred UI theme (Darcula or Light)
4. Review the SDK components to be installed:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
5. Accept the license agreements
6. Click **Finish** to download and install the components

![Fig. 2. Android Studio setup wizard](images/android_studio_setup_wizard.png){: standalone #fig2 data-title="Android Studio setup wizard" }

{: .warning-title }
> <i class="fa-solid fa-triangle-exclamation"></i> Warning
>
> The initial download may take considerable time depending on your internet connection.
> The SDK components and system images are several gigabytes in size.

## 3. Configure SDK Components

After the initial setup, verify that all required SDK components are installed.

1. Open Android Studio
2. From the welcome screen, click **More Actions** (or use **Tools** menu if a project is open)
3. Select **SDK Manager**

### SDK Platforms Tab

Ensure you have at least one Android platform installed. For MAUI development, **Android 14 (API 34)**
or higher is recommended.

![Fig. 3. SDK Manager showing SDK Platforms](images/sdk_manager.png){: standalone #fig3 data-title="SDK Manager showing SDK Platforms" }

### SDK Tools Tab

Click the **SDK Tools** tab and verify these components are installed:

| Component | Purpose |
|-----------|---------|
| Android SDK Build-Tools | Required for building Android apps |
| Android Emulator | The emulator itself |
| Android SDK Platform-Tools | ADB and other command-line utilities |

Check any missing components and click **Apply** to install them.

### SDK Location

Note the SDK location displayed at the top of the SDK Manager. You may need this path later
for environment variables or IDE configuration.

[Windows](){: .btn .btn-blue .tab-control data-tabset="sdkpath" data-seq="1" }
[Mac](){: .btn .tab-control data-tabset="sdkpath" data-seq="2" }
[Linux](){: .btn .tab-control data-tabset="sdkpath" data-seq="3" }

> Default SDK location:
>
> ```
> C:\Users\USERNAME\AppData\Local\Android\Sdk
> ```
>
{: .tab data-tabset="sdkpath" data-seq="1" }

> Default SDK location:
>
> ```
> /Users/USERNAME/Library/Android/sdk
> ```
>
{: .tab data-tabset="sdkpath" data-seq="2" }

> Default SDK location:
>
> ```
> /home/USERNAME/Android/Sdk
> ```
>
{: .tab data-tabset="sdkpath" data-seq="3" }

## 4. Create an Android Virtual Device (Pixel 9 Pro)

An Android Virtual Device (AVD) is an emulated Android phone that runs on your computer.

1. From the Android Studio welcome screen, click **More Actions**
2. Select **Virtual Device Manager** (or **Device Manager** in newer versions)
3. Click **Create Virtual Device**

![Fig. 4. AVD Manager interface](images/avd_manager.png){: standalone #fig4 data-title="AVD Manager interface" }

### Select Hardware

1. In the **Category** list, select **Phone**
2. From the device list, select **Pixel 9 Pro**
3. Click **Next**

![Fig. 5. Hardware selection - Pixel 9 Pro](images/create_avd_hardware.png){: standalone #fig5 data-title="Hardware selection - Pixel 9 Pro" }

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> Device Choice
>
> The Pixel 9 Pro is a good choice for development as it represents a modern flagship device
> with a large screen. You can create additional AVDs with different screen sizes later to
> test your app's responsiveness.

### Select System Image

Choose a system image that matches your computer's architecture:

[Windows / Intel Mac](){: .btn .btn-blue .tab-control data-tabset="sysimage" data-seq="1" }
[Apple Silicon Mac](){: .btn .tab-control data-tabset="sysimage" data-seq="2" }

> 1. Select the **x86_64** tab (this should be the default)
> 2. Choose a system image with **API 34** or higher
> 3. Look for images labelled with **Google APIs** for broader app compatibility
> 4. If the image shows a download icon, click it to download the image first
> 5. Click **Next**
>
{: .tab data-tabset="sysimage" data-seq="1" }

> 1. Select the **arm64-v8a** tab
> 2. Choose a system image with **API 34** or higher
> 3. Look for images labelled with **Google APIs** for broader app compatibility
> 4. If the image shows a download icon, click it to download the image first
> 5. Click **Next**
>
> {: .note-title }
> > <i class="fa-solid fa-circle-info"></i> Apple Silicon Performance
> >
> > On Apple Silicon Macs, ARM-based system images run natively without emulation,
> > providing significantly better performance than x86 images running through translation.
>
{: .tab data-tabset="sysimage" data-seq="2" }

![Fig. 6. System image selection](images/create_avd_image.png){: standalone #fig6 data-title="System image selection" }

### Configure AVD Settings

1. Give your AVD a name (e.g., "Pixel_9_Pro_API_34")
2. Review the configuration settings:
   - **Startup orientation**: Portrait (default)
   - **Emulated Performance**: Hardware - GLES 2.0 (recommended)
3. Click **Show Advanced Settings** to access additional options if needed
4. Click **Finish** to create the AVD

![Fig. 7. AVD configuration screen](images/avd_configuration.png){: standalone #fig7 data-title="AVD configuration screen" }

Your new AVD should now appear in the Device Manager list.

## 5. Launch and Test the Emulator

1. In the Device Manager, find your newly created AVD
2. Click the **Play** button (triangle icon) to start the emulator

![Fig. 8. Emulator running with Pixel 9 Pro](images/emulator_running.png){: standalone #fig8 data-title="Emulator running with Pixel 9 Pro" }

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> First Boot
>
> The first time you start a new AVD, it may take a few minutes to boot as Android performs
> initial setup. Subsequent starts will be faster, especially if you enable snapshot saving.

### Basic Emulator Controls

| Control | Description |
|---------|-------------|
| Power button (side) | Turn screen on/off |
| Volume buttons (side) | Adjust volume |
| Extended controls (...) | Access additional features like GPS, battery, sensors |
| Rotate | Change orientation between portrait and landscape |
| Screenshot | Capture the current screen |
| Back | Android back navigation |
| Home | Return to home screen |
| Overview | Show recent apps |

## 6. Environment Variables (Optional)

Setting environment variables allows you to use Android SDK tools from the command line,
which is useful for advanced workflows and connecting to a development container.

[Windows](){: .btn .btn-blue .tab-control data-tabset="envvars" data-seq="1" }
[Mac](){: .btn .tab-control data-tabset="envvars" data-seq="2" }
[Linux](){: .btn .tab-control data-tabset="envvars" data-seq="3" }

> ### Set ANDROID_HOME
>
> 1. Open the Start menu and search for "Environment Variables"
> 2. Click "Edit the system environment variables"
> 3. Click the "Environment Variables" button
> 4. Under "User variables", click "New"
> 5. Set:
>    - Variable name: `ANDROID_HOME`
>    - Variable value: `C:\Users\USERNAME\AppData\Local\Android\Sdk`
> 6. Click OK
>
> ### Add to PATH
>
> 1. In the same Environment Variables window, find "Path" under "User variables"
> 2. Click "Edit"
> 3. Click "New" and add: `%ANDROID_HOME%\platform-tools`
> 4. Click "New" again and add: `%ANDROID_HOME%\emulator`
> 5. Click OK to save
>
> Close and reopen any command prompt windows for the changes to take effect.
>
{: .tab data-tabset="envvars" data-seq="1" }

> Add the following lines to your `~/.zshrc` file (or `~/.bash_profile` if using Bash):
>
> ```bash
> export ANDROID_HOME=$HOME/Library/Android/sdk
> export PATH=$PATH:$ANDROID_HOME/platform-tools
> export PATH=$PATH:$ANDROID_HOME/emulator
> ```
>
> Apply the changes:
>
> ```bash
> source ~/.zshrc
> ```
>
{: .tab data-tabset="envvars" data-seq="2" }

> Add the following lines to your `~/.bashrc` file:
>
> ```bash
> export ANDROID_HOME=$HOME/Android/Sdk
> export PATH=$PATH:$ANDROID_HOME/platform-tools
> export PATH=$PATH:$ANDROID_HOME/emulator
> ```
>
> Apply the changes:
>
> ```bash
> source ~/.bashrc
> ```
>
{: .tab data-tabset="envvars" data-seq="3" }

### Verify the Setup

Open a new terminal and run:

```bash
adb --version
```

You should see output showing the ADB version number.

## 7. Connecting to a Development Container

If you're using the containerised development environment from the
[Development Environment Setup](../dev-environment/) tutorial, you'll need to connect
the container to the emulator running on your host machine.

### Start ADB Server on Host

On your host machine (not in the container), start the ADB server in network mode:

[Windows](){: .btn .btn-blue .tab-control data-tabset="adbserver" data-seq="1" }
[Mac/Linux](){: .btn .tab-control data-tabset="adbserver" data-seq="2" }

> Open a Command Prompt or PowerShell window and run:
>
> ```
> adb kill-server
> adb -a -P 5037 nodaemon server start
> ```
>
> Leave this window open while developing.
>
{: .tab data-tabset="adbserver" data-seq="1" }

> Open a terminal and run:
>
> ```bash
> adb kill-server
> adb -a -P 5037 nodaemon server start
> ```
>
> Leave this terminal open while developing.
>
{: .tab data-tabset="adbserver" data-seq="2" }

### Configure ADB in Container

Inside your development container, set the ADB server address:

```bash
export ADB_SERVER_SOCKET=tcp:host.docker.internal:5037
```

Then verify the connection:

```bash
adb devices
```

You should see your emulator listed:

```
List of devices attached
emulator-5554	device
```

For detailed instructions on building and deploying MAUI apps to the emulator from a container,
see the [Getting started with Visual Studio Code](../../csharp/vscode/) tutorial.

## 8. Troubleshooting

| Problem | Possible Cause | Solution |
|---------|----------------|----------|
| Emulator won't start | Hardware acceleration disabled | Enable VT-x/AMD-V in BIOS (Windows/Linux) or ensure Hypervisor is enabled (Mac) |
| Emulator runs very slowly | No hardware acceleration | Install HAXM (Intel) or enable Hyper-V (Windows). On Apple Silicon, use arm64 images |
| "HAXM is not installed" | Missing Intel HAXM | Install HAXM from SDK Manager (SDK Tools tab) or use Hyper-V instead |
| AVD not visible in VSCode | AVD Manager extension not configured | Configure paths in VSCode AVD Manager settings |
| ADB cannot connect | ADB server not running | Start ADB server with `adb start-server` |
| Emulator freezes on boot | Insufficient RAM allocated | Edit AVD settings and reduce RAM or enable hardware acceleration |
| "System UI isn't responding" | Emulator overloaded | Wipe data and cold boot the AVD, or increase allocated resources |
| Black screen after boot | Graphics driver issue | Change emulator graphics setting to "Software" in AVD configuration |

{: .note-title }
> <i class="fa-solid fa-circle-info"></i> Cold Boot
>
> If the emulator behaves unexpectedly, try a cold boot: In Device Manager, click the
> dropdown arrow next to the Play button and select "Cold Boot Now". This restarts the
> emulator without using saved state.

## Next Steps

- [Development Environment Setup](../dev-environment/) - Set up a containerised MAUI development environment
- [Getting started with Visual Studio Code](../../csharp/vscode/) - Build and deploy MAUI apps to the emulator
- [Git and GitHub](../github/) - Version control for your projects

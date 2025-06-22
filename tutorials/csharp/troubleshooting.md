---
title: Troubleshooting
parent: C# practice
has_children: true
has_toc: false
nav_order: 10
---

# How-to guides

<details class="blue-bar">
<summary>
    Rename a project in VS Code
</summary>
<ol>
    <li>Close VS Code.</li>
    <li>Rename the Project Folder:
        <ul>
            <li>Navigate to your solution's root directory in your file explorer.</li>
            <li>Rename the folder that contains your project's<code>.csproj</code> file.</li>
            <li>Example:<code>MyMauiApp</code> to<code>NewMauiApp</code>.</li>
        </ul>
    </li>
    <li>Update the Solution File (<code>.sln</code>) (Text Editor):
        <ul>
            <li>Open your<code>.sln</code> file (e.g.,<code>MySolution.sln</code>) in a text editor (like Notepad++, VS Code itself, etc.).</li>
            <li>Find the line that references your project and update the path to reflect the new folder name and 
            project name. e.g:
                <p>Before:<code>Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "MyMauiApp", "MyMauiApp\MyMauiApp.csproj", "{YOUR-PROJECT-GUID}"</code></p>
                <p>After:<code>Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "NewMauiApp", "NewMauiApp\NewMauiApp.csproj", "{YOUR-PROJECT-GUID}"</code></p>
            </li>
        </ul>
    </li>
    <li>Save and close the<code>.sln</code> file.</li>
    <li>Rename the<code>.csproj</code> file (File System):
        <ul>
            <li>Inside the newly renamed project folder, rename the <code>.csproj</code> file to your new project name.
                <p>Example: <code>MyMauiApp.csproj</code> to <code>NewMauiApp.csproj</code>.</p>
            </li>
        </ul>
    </li>
    <li>Delete <code>bin</code> and<code>obj</code> folders to remove all compiled artifacts and ensure a clean build.</li>
    <li>Open the Project in VS Code</li>
    <li>Perform a Global Find and Replace:
        <p>This is where the bulk of the work happens.</p>
        <ul>
            <li>Use VS Code's global search and replace functionality (<strong>Ctrl+Shift+H</strong> or <strong>Cmd+Shift+H</strong> on macOS).</li>
            <li>Search for the old project name (e.g.,<code>MyMauiApp</code>).</li>
            <li>Replace with the new project name (e.g.,<code>NewMauiApp</code>).</li>
            <li>Important considerations for Find and Replace:
                <ul>
                    <li><strong>Case Sensitivity</strong>: Be mindful of casing. You might need to perform multiple passes (e.g.,<code>MyMauiApp</code> to <code>NewMauiApp</code>, <code>mymauiapp</code> to <code>newmauiapp</code>, <code>MYMUIAPP</code> to <code>NEWMAUIAPP</code>).</li>
                    <li><strong>Word Boundaries</strong>: Be careful not to accidentally replace parts of other words. Use regex for more precise control if needed.</li>
                    <li><strong>Files to Include/Exclude</strong>: Make sure to include all relevant C# (<code>.cs</code>), XAML (<code>.xaml</code>), <code>.csproj</code>, and <code>MauiProgram.cs</code> files.</li>
                    <li><strong>Common Places to Update</strong>:
                        <ul>
                            <li><strong>Namespaces</strong>: namespace <code>OldProjectName.Maui;</code> to namespace <code>NewProjectName.Maui;</code></li>
                            <li><strong>Class references</strong>: E.g., if you have public partial class <code>MainPage : ContentPage { /* ... */ }</code> and your old project name was used in partial class generation.</li>
                            <li><code><strong>MauiProgram.cs</strong></code>: The <code>CreateMauiApp()</code> method might have references to the old project name, especially if you customized it.</li>
                            <li><code><strong>pp.xaml</strong></code> <strong>and</strong> <code><strong>App.xaml.cs</strong></code>: Similarly, check these files for namespace references.</li>
                            <li><code><strong>csproj</strong></code> <strong>file</strong>: Although you renamed it, there might be internal references to the old project name. Double-check <code>RootNamespace</code> and <code>AssemblyName</code> in the <code>.csproj</code> file directly.</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li>Manually Check Specific Files:
        <ul>
            <li><code><strong>MauiProgram.cs</strong></code>: Verify using statements and any configuration that might have explicitly used the old namespace/name.</li>
            <li><code><strong>App.xaml</strong></code> <strong>and</strong> <code>App.xaml.cs</code></strong></code>: Check <code>x:Class</code> and <code>xmlns</code> attributes for old namespace references.</li>
            <li><code><strong>Properties/launchSettings.json</strong></code> (if applicable): While not directly the project name, ensure any paths or configurations are correct.</li>
            <li><strong>Platforms folders</strong>: Check <code>AndroidManifest.xml</code> (Android), <code>Info.plist</code> (iOS/MacCatalyst), <code>Package.appxmanifest</code> (Windows) for display names or package names that might contain the old project name. You'll probably need to update these manually.</li>
        </ul>
    </li>
    <li>Build the Project:
        <ul>
            <li>Open the terminal in VS Code.</li>
            <li>Navigate to your project directory.</li>
            <li>Run:<code>dotnet build</code></li>
        </ul>
    </li>
    <li>Run the Project</li>
</ol>
</details>

# Errors and solutions

<details class="blue-bar">
<summary>
    Android API level missing
</summary>
<p>If you see an error like the following, some Android dependencies are missing.</p>
<div class="callout codeblock">
<pre class="red">/.../Microsoft.Android.Sdk.Darwin/34.0.113/tools/Xamarin.Android.Tooling.targets(100,5): error XA5207: Could not find android.jar for 
API level 34. This means the Android SDK platform for API level 34 is not installed; it was expected to be in
/PATH_TO_SDK/platforms/android-34/android.jar.</pre>
</div>
<p>Install the missing dependencies by executing the following commands in a terminal window. Make sure that you are in the project directory. You also need to use the correct path for your Android SDK. The path you need is shown in the error message.</p>
<div class="callout codeblock">
<pre>export AcceptAndroidSDKLicenses=true
dotnet build -t:InstallAndroidDependencies -f net8.0-android "-p:AndroidSdkDirectory=/PATH_TO_SDK"</pre>
</div>
</details>

<details class="blue-bar">
<summary>
    Android emulator hangs during startup on Windows
</summary>
<p>
The emulator runs an Android image as a virtual machine. This needs to be enabled in the 
<a href="https://www.ninjaone.com/blog/enable-hyper-v-on-windows/" target="_blank">Windows BIOS</a>. 
</p>
</details>

<details class="blue-bar">
<summary>
    Crash on start
</summary>
<p>If your application was previously working but starts to crash on starting up, it may be because some package versions have changed. Try removing all of the object and binary files and recompiling. Right-click on the project in the <strong>Solution Explorer</strong> and click <em>Clean</em></p>
</details>

<details class="blue-bar">
<summary>
    During setup, directories are created with percent signs in their names (e.g. %ANDROID_HOME%)
</summary>
<p>
This happens when you use the Windows PowerShell when running a terminal. Use the basic
CMD command window instead. You can configure your VSCode
<a href="https://code.visualstudio.com/docs/terminal/profiles" target="_blank">profile</a>
 to use CMD by default
</p>
</details>

<details class="blue-bar">
<summary>Exception -532462766</summary>
<p>When trying to start the Android emulator, this exception is reported accompanied by the additional messages below.</p>
<div class="callout codeblock">
<pre>C:\Users\133423866\MAUI>sdkmanager --install "system-images;android-34;google_apis;x86_64"
Warning: Errors during XML parse:
Warning: Additionally, the fallback loader failed to parse the XML.
Warning: Errors during XML parse:
Warning: Additionally, the fallback loader failed to parse the XML.
[=======================================] 100% Computing updates...</pre>
</div>
<p>The reason for this error is unknown, but it can be ignored - it should not affect the emulator.</p>
</details>

<details class="blue-bar">
<summary>
    Missing workloads
</summary>
<p>After certain updates, the .NET workloads associated with a project need to be reinstalled. When this happens, you will see an error like the following:</p>
<div class="callout codeblock">
<pre>  Determining projects to restore...
/.../Microsoft.NET.Sdk/targets/Microsoft.NET.Sdk.ImportWorkloads.targets(38,5): error NETSDK1147: To build this
project, the following workloads must be installed: wasi-experimental [/.../Notes/Notes.csproj::TargetFramework=net8.0-android]
/.../Microsoft.NET.Sdk/targets/Microsoft.NET.Sdk.ImportWorkloads.targets(38,5): error NETSDK1147: To install these workloads, 
run the following command: dotnet workload restore [/.../Notes/Notes.csproj::TargetFramework=net8.0-android]</pre>
</div>
<p>The command shown in the error message may not work if the restoration requires elevated privileges. On Mac or Linux, use the following command at a terminal prompt ensuring that you are in the project directory:</p>
<div class="callout codeblock">
<pre>sudo dotnet workload restore</pre>
</div>
<p>On Windows, start a command shell with administrator privilege, change into the project directory and execute the command:</p>
<div class="callout codeblock">
<pre>dotnet workload restore</pre>
</div>
</details>

<details class="blue-bar">
<summary>Package downgrade detected</summary>
<p>If you see an error like the following, it means that there is a conflict between different NuGet packages and you need to upgrade one or more of them to their latest version.</p>
<div class="callout codeblock">
<pre> Determining projects to restore...
  All projects are up-to-date for restore.
  Determining projects to restore...
/.../Notes/Notes.csproj : error NU1605: Warning As Error: Detected package downgrade: 
Microsoft.EntityFrameworkCore from 8.0.7 to 8.0.6. Reference the package directly from 
the project to select a different version.  [/.../Notes.sln]</pre>
</div>
<p>Look in the <code>Notes.sln</code> file to find the package that the error message refers to. Then, right-click on the project in the <strong>Solution Explorer</strong> and reinstall that package choosing the required version when prompted. This will update the references in the project file.</p>
</details>

<details class="blue-bar">
<summary>Platform simulator not found</summary>
<p>If you see an error like the following when building your code, your project file includes the iOS platform, but you do not have a simulator installed. </p>
<div class="callout codeblock">
<pre class="red">/.../Notes/obj/Debug/net8.0-ios/iossimulator-arm64/actool/cloned-assets/Assets.xcassets : actool error : The operation 
couldn’t be completed. Failed to locate any simulator runtime matching options: { [/.../Notes/Notes.csproj::TargetFramework=net8.0-ios]</pre>
</div>
<p>The simplest solution is to remove the reference to iOS from the project file. Locate the <code>TargetFrameworks</code> entry near the start of the file and remove iOS as a target. The example below shows the line before and after the change.</p>
<div class="callout codeblock">
<pre>&lt;!-- BEFORE -->
&lt;TargetFrameworks>net8.0-android;net8.0-ios;net8.0-maccatalyst</TargetFrameworks>
&lt;!-- AFTER -->
&lt;TargetFrameworks>net8.0-android;net8.0-maccatalyst</TargetFrameworks></pre>
</div>
<p>If you prefer to install a simulator so that you can keep the iOS target, please refer to the <a href="https://learn.microsoft.com/en-us/dotnet/maui/ios/cli?view=net-maui-8.0" target="_blank">Microsoft documentation.</a></p>
</details>

<details class="blue-bar">
<summary>Request nominateProject failure</summary>
<p>When starting VSCode, you may see the error below from time to time. It seems to arise when the host computer is busy and results from a race condition between different startup processes.</p>
<div class="callout codeblock">
<pre>LimitedFunctionality
StreamJsonRpc.RemoteInvocationException: Request nominateProject failed with message: Cannot read properties of undefined (reading 'size')</pre>
</div>
<p>The best solution seems to be to restart your computer to kill any unnecessary processes.</p>
</details>


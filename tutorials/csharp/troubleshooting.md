---
title: Troubleshooting
parent: C# practice
has_children: true
has_toc: false
nav_order: 11
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
    At least one invalid signature was encountered
</summary>

<p>This is a Docker Desktop clock drift issue, not a code problem. When a Mac sleeps and wakes, Docker Desktop's
  internal VM clock can fall out of sync, causing GPG signature validation to fail for apt repositories.</p>

<p>Fix: Restart Docker Desktop</p>
<ol>                                                                                                                 
  <li>Click the Docker icon in the menu bar</li>                                                                     
  <li>Select Restart</li>
  <li>Wait for it to fully restart</li>
  <li>Then retry the build:<br>
  <code>docker build --no-cache --progress=plain -t maui-dev-test "/Users/briandavison/VSCode projects/MauiDevProject"</code></li>
</ol>

<p>The clock resync happens automatically on restart. This is a well-known Docker Desktop on macOS issue — the
lightweight Linux VM Docker uses doesn't always keep its clock in sync after the host sleeps.</p>

<p>If it happens again after future builds, the quick fix is just restarting Docker Desktop. There's nothing wrong
with your Dockerfile.</p>
</details>

<details class="blue-bar">
<summary>
    'No space left on device' when running docker-compose
</summary>

<p>Multiple failed --no-cache builds have filled Docker's virtual disk with abandoned image layers and build      
  cache. You need to reclaim that space.</p>

<p>Run this to purge all unused Docker data (stopped containers, dangling images, build cache):</p>
<p><code>docker system prune -a --volumes</code></p>
<p>Docker will show you how much space will be freed and ask for confirmation. Type y to proceed.</p>
<p>After that completes, retry the build:</p>
<p><code>docker build --no-cache --progress=plain -t maui-dev-test "/Path/To/Project"</code></p>

<p>If you want to see how much disk Docker is currently using before/after:</p>
<p><code>docker system df</code></p>

<p>If the prune isn't enough and you're still tight on space, you can also increase Docker Desktop's virtual disk
  limit:</p>
<ol>
  <li>Open Docker Desktop → Settings → Resources → Virtual disk limit</li>
  <li>Increase it (default is usually 64 GB) and click Apply & Restart</li>
</ol>
</details>

<details class="blue-bar">
<summary>
    No available device
</summary>
<p>Check that the ADB server process is still running on the host operating system.
   Sometimes it is killed during the build process.</p>
</details>


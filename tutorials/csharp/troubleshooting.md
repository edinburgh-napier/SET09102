---
title: Troubleshooting
parent: C# practice
has_children: true
has_toc: false
nav_order: 8
---

<details markdown=1 class="blue-bar">
<summary>
    The Android emulator hangs during startup on Windows
</summary>
<p>
The emulator runs an Android image as a virtual machine. This needs to be enabled in the 
<a href="https://www.ninjaone.com/blog/enable-hyper-v-on-windows/" target="_blank">Windows BIOS</a>. 
</p>
</details>

<details markdown=1 class="blue-bar">
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

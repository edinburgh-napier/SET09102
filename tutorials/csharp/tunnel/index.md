---
title: Using an SSH tunnel
parent: C# practice
has_children: true
has_toc: false
nav_order: 8
---

# Connecting to a shared database over an SSH tunnel

To connect a .NET MAUI application to a database using an SSH tunnel, you'll need to establish an 
SSH connection to the server hosting the database, then configure your MAUI app to connect to the 
database through that tunnel.
    
![Fig. 1. What is an SSH tunnel?](images/ssh_tunnel.gif){: standalone #fig1 data-title="What is an SSH tunnel?" }

You would usually connect to a local database using a connection string like the following:

``` c#
 {
     "ConnectionStrings": {
         "DevelopmentConnection": "Server=IP_ADDRESS;Database=notesdb;User Id=notesapp;Password=N0tesApp$;"
     }
 }
```

The example assumes that we are using the default port of 1433 and the IP address is included
so that we can access an SQL Server instance running inside a Docker container.

Once an SSH tunnel is set up, it effectively redirects traffic on the relevant port to the 
remote host. You may need to use the name of the remote database and the associated user 
credentials, but it will look a lot like a local connection as shown below. 

``` c#
 {
     "ConnectionStrings": {
         "DevelopmentConnection": "Server=IP_ADDRESS;Database=notesdb;User Id=notesapp;Password=N0tesApp$;"
         "RemoteConnection": "Server=localhost,1433;Database=REMOTE_DB_NAME;User Id=REMOTE_USER_NAME;Password=REMOTE_PASSWORD"
     }
 }
```

## Setup

1. Use a tool like PuTTY (on Windows) or the built-in SSH client on MacOS/Linux. 
2. Connect to the SSH server where the database resides.
3. Navigate to the "Connection" > "SSH" > "Tunnels" settings in your SSH client.
4. Enter the source port (e.g., 1433 for SQL Server) and the destination hostname and port 
   (e.g. localhost:1433, soc-app-liv-17.napier.ac.uk:1433). 
5. Click "Add" and then "Open" to establish the tunnel. 
6. Ensure the tunnel is working by attempting to connect to the database using a database client 
  (like Azure Data Studio or DataGrip) through the tunnel's localhost address and port.

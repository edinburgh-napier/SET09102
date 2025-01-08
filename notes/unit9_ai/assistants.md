---
title: Software assistants
parent: AI in Software Engineering
has_children: true
has_toc: false
nav_order: 3
---

# Software assistants

An AI coding assistant, such as GitHub Copilot or Cursor, integrates advanced machine learning 
technologies, specifically large language models (LLMs), to aid software developers in various 
coding tasks. This support ranges from code completion to bug detection and automated 
documentation. 

AI code completion and code generation tools have become essential for boosting productivity and 
improving code quality in software development. 
A [survey](https://codesignal.com/report-developers-and-ai-coding-assistant-trends/)
of more than 1000 developers conducted in Nov/Dec 2023 by CodeSignal produced several interesting 
results:

* 81% of respondents used coding assistants and 49% used them on a daily basis
* The most common use of coding assistants was to learn new technical skills (76% of respondents)
* The most popular tool was ChatGPT (91%) followed by Copilot and Bard
* The respondents' biggest concern was the quality od AI-generated code (55%) followed by security

The first statistic agrees more or less with the 2024 prediction from 
[Gartner](https://www.gartner.com/en/newsroom/press-releases/2024-09-04-gartner-hype-cycle-for-digital-government-services-identifies-six-technologies-to-have-transformational-benefit-within-five-years#:~:text=%E2%80%9CAI%20code%20assistants%2C%20unlike%20their,than%2010%25%20in%20early%202023.)
that 75% of enterprise software engineers will be using AI coding assistants by 2028. As of 2024,
Gartner placed coding assistants almost at the peak of the hype cycle (see Fig. 1) which is 
usually followed by a reality check; however, the current rate of development of coding assistants
and other AI tools remains strong.

![Fig. 1: Hype Cycle for Digital Government Services, 2024 (<a href="https://www.gartner.com/en/newsroom/press-releases/2024-09-04-gartner-hype-cycle-for-digital-government-services-identifies-six-technologies-to-have-transformational-benefit-within-five-years#:~:text=%E2%80%9CAI%20code%20assistants%2C%20unlike%20their,than%2010%25%20in%20early%202023.">Gartner</a>)](https://emt.gartnerweb.com/ngw/globalassets/en/newsroom/images/graphs/dgshc2024.png){: standalone #fig1 data-title="Hype Cycle for Digital Government Services, 2024"}

As part of its routine activities, Gartner regularly assesses the market position of providers in
various fields and summarises their findings in the form of a _Magic Quadrant_ diagram. Fig. 2 
shows the Magic Quadrant for AI coding assistants in June 2024.

![Fig. 2: Magic Quadrant for AI Code Assistants (<a href="https://resources.github.com/artificial-intelligence/gartner-magic-quadrant-for-ai-coding-assistants-2024/">GitHub, 2024</a>)](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2024/08/27/20240822_Gartner_MQ_AI_Code_Assistants_Graph.png){: standalone #fig2 data-title="Magic Quadrant for AI Code Assistants, 2024"}

For a full description of the capabilities of each tool, please refer to the appropriate website.

* [GitHub](https://github.com/features/copilot)
* [GitLab](https://docs.gitlab.com/ee/user/gitlab_duo/)
* [Google Cloud](https://cloud.google.com/products/gemini/code-assist)
* [Alibaba Cloud](https://www.alibabacloud.com/help/en/pai/user-guide/tongyi-lingma)
* [Amazon Web Services](https://aws.amazon.com/q/developer/)
* [Codeium](https://codeium.com/)
* [IBM](https://www.ibm.com/products/watsonx-code-assistant)
* [Tabnine](https://www.tabnine.com/)
* [SourceGraph](https://sourcegraph.com/cody)
* [Tencent Cloud](https://cloud.tencent.com/product/acc)
* [CodiumAI](https://www.qodo.ai/)
* [Refact.ai](https://refact.ai/)

Other similar tools are listed on the [Tool in One](https://toolinone.com/aitool/#coding) website.

## General architecture

AI coding assistants begin their lifecycle through a rigorous data collection and processing 
phase. These systems are trained on extensive datasets composed of publicly available code from 
repositories like GitHub, as well as technical forums and other digital resources that contain 
code snippets and complete programs. This data must first be cleaned and structured, which 
involves normalising coding styles, removing duplicates, and ensuring a diverse representation of 
programming languages and paradigms.

The heart of an AI coding assistant is its training regime, which utilises neural network models 
based on the transformer architecture, known for its effectiveness in understanding and 
generating human-like text. The training process involves both unsupervised learning, where the 
model learns to predict text in code files, and supervised learning, which refines its predictions 
based on specific feedback. This dual approach allows the model to grasp not just the syntax of 
various programming languages, but also the contextual nuances that define functional programming.

Once trained, AI coding assistants are integrated into development environments through plugins 
or extensions for popular Integrated Development Environments (IDEs) like Visual Studio Code or 
JetBrains IntelliJ IDEA. This integration allows the assistants to interact seamlessly with the 
developer's workflow, providing suggestions and corrections in real-time as the developer writes 
code.

In operation, AI coding assistants offer a range of features:

* **Code Completion**: They predict and auto-complete lines of code, accelerating the coding 
  process.

* **Code Suggestions**: Beyond mere completion, they suggest whole blocks of code or functions, 
  intelligently adapting to the project's existing codebase and libraries.

* **Error Detection and Correction**: They identify potential errors and suggest fixes, improving 
  code quality.

* **Automated Documentation**: They generate comments and documentation, aiding maintainability 
  and understandability of the code.

AI coding assistants are designed to adapt to the coding habits and preferences of individual 
developers. Through continuous interaction and feedback from the user, the system fine-tunes its 
suggestions to align more closely with the user’s style and the specific requirements of the 
project at hand.

Given the sensitive nature of code, especially in proprietary applications, AI coding assistants 
are developed with stringent security and privacy measures. This includes ensuring that any code 
used for training is properly anonymised and that all data handled by the assistant in a 
development environment remains confidential. As machine learning technology advances, the 
capabilities of AI coding assistants will expand, leading to even more sophisticated support for 
developers. Emerging improvements include better understanding of complex codebases, more 
accurate predictions of developer intent, and enhanced integration with other tools in the 
software development lifecycle.

## Prompt engineering

Prompt engineering is an important technique for the effective use of AI tools, particularly 
important when interfacing with large language models (LLMs) like those deployed in AI coding 
assistants. This skill involves designing specific inputs or _prompts_ to guide the AI in 
producing the desired outputs. For software developers, this means generating high-quality code 
that closely matches the requirements of their projects.

Effective prompt engineering goes beyond merely issuing commands to an AI. It requires a deep 
understanding of how AI models process and react to human language. A well-crafted prompt can 
significantly enhance the accuracy and relevance of the generated code, ensuring compatibility 
and functionality within the target codebase.

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Techniques in prompt engineering for software development
> 
> * Contextual Detailing:
>
>   It’s essential to provide the AI with comprehensive context. This means detailing not 
>   only the required function but also its purpose within the application, expected inputs 
>   and outputs, and any specific integration considerations. Rich contextual information 
>   can drastically improve the specificity and utility of the AI-generated code.
> 
> * Clarification and Constraints:
> 
>   Define any constraints such as memory usage, processing time, or preferred libraries 
>   clearly within the prompt. This specificity helps focus the AI’s generation process 
>   and ensures adherence to project specifications.
> 
> * Iterative Refinement:
> 
>   Start with a general prompt and refine it based on the AI's outputs. This iterative 
>   approach allows for gradual improvements, fine-tuning the AI’s output to better meet 
>   project needs.
> 
> * Using Examples:
> 
>   Including examples in your prompts can direct the AI towards the desired code style 
>   or logic. For instance, showing how a similar function is implemented can guide the 
>   model to produce analogous solutions.
> 
> * Natural Language Instructions:
> 
>   Employ clear, conversational language to describe tasks. Given that LLMs are trained 
>   on diverse text data, they are adept at parsing and responding to prompts written in 
>   natural language.

A a practical example, consider a developer working in C# who needs to create a function 
to calculate the sum of an array of integers. A simple prompt might be:

> Write a C# function to sum an array.

To improve this prompt for better results, the developer could refine it to:

> Please generate a C# function named 'CalculateSum' that accepts an array of integers 
> and returns the sum. Ensure the function handles possible null inputs gracefully.

This refined prompt provides clear instructions and context, which helps the AI 
understand the task better and consider edge cases like null inputs.

Several challenges and considerations must be kept in mind when designing effective 
prompts. Firstly, handling complexity can be a significant challenge; some sophisticated 
coding tasks may necessitate more advanced prompt engineering techniques or multiple 
iterations of refinement to achieve accurate responses from the AI. Secondly, the 
effectiveness of prompt engineering is intrinsically linked to the quality and breadth 
of the model's training data. If the training data is limited or skewed, the AI may 
struggle to understand and respond appropriately to the prompts. Lastly, security and 
privacy concerns are paramount, especially when integrating AI-generated code into 
projects that handle sensitive or proprietary information. It is essential to ensure 
that the incorporation of such code does not compromise the overall security posture 
of the application.

## Comparison

To get some perspective on the capabilities of current tools, the prompt below was given to 
three examples - ChatGPT (GTP-4o), Claude (3.5 Sonnet) and Cursor to see how the tools would cope:

> Create a .NET MAUI application for a conference attendee app to allow them to see the agenda 
> and interact with speakers and other attendees.

Conference apps of this kind are in widespread use and all offer similar functionality, structure
and presentation. The training data for all three example LLMs can therefore be expected to 
include those example which should allow the tools to make good assumptions and suggestions. 

### ChatGPT

When ChatGPT provides a response, it is delivered in a single panel with descriptive text
and code snippets interleaved. Some work is therefore anticipated to extract the code from the
response so that it can be used as part of a project.

<details>
<summary>Response</summary>


Creating a .NET MAUI application for a conference attendee app involves several steps, 
including setting up the project, designing the user interface, and implementing the necessary 
functionalities such as viewing the agenda, and facilitating interactions among speakers and 
attendees. Below, I'll outline a basic approach to get you started on this project:

#### 1. Set Up Your Development Environment

First, ensure you have the necessary tools:

* **Visual Studio 2022** or later with the **Mobile development with .NET** workload installed.
* **.NET 6** or higher.

#### 2. Create a New .NET MAUI Application

Open Visual Studio and create a new project:

* Select **New Project**.
* Choose **.NET MAUI App** from the project templates.
* Name your project (e.g., `ConferenceApp`).
* Click **Create**.

#### 3. Define the App Structure

Consider the main features of your app. For a conference app, typical features might include:

* **Agenda**: A schedule of events.
* **Speakers**: Details about the speakers.
* **Networking**: A feature for attendees to connect and chat.

For navigation, you can use a `TabbedPage` for the primary sections:

```csharp
public AppShell()
{
    InitializeComponent();
    Routing.RegisterRoute(nameof(AgendaPage), typeof(AgendaPage));
    Routing.RegisterRoute(nameof(SpeakersPage), typeof(SpeakersPage));
    Routing.RegisterRoute(nameof(NetworkingPage), typeof(NetworkingPage));

    Items.Add(new ShellContent { Title = "Agenda", Icon = "agenda.png", ContentTemplate = new DataTemplate(typeof(AgendaPage)) });
    Items.Add(new ShellContent { Title = "Speakers", Icon = "speakers.png", ContentTemplate = new DataTemplate(typeof(SpeakersPage)) });
    Items.Add(new ShellContent { Title = "Networking", Icon = "networking.png", ContentTemplate = new DataTemplate(typeof(NetworkingPage)) });
}
```

#### 4. Implement the Agenda Page

The agenda page can use a `CollectionView` or `ListView` to display the schedule:

```xaml
<!-- AgendaPage.xaml -->
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="ConferenceApp.AgendaPage">
    <CollectionView ItemsSource="{Binding Sessions}">
        <CollectionView.ItemTemplate>
            <DataTemplate>
                <StackLayout Padding="10">
                    <Label Text="{Binding Title}" FontAttributes="Bold"/>
                    <Label Text="{Binding Speaker}" />
                    <Label Text="{Binding Time}" />
                </StackLayout>
            </DataTemplate>
        </CollectionView.ItemTemplate>
    </CollectionView>
</ContentPage>
```

#### 5. Implement the Speakers and Networking Pages

Similarly, create UI and backend logic for other pages using MVVM pattern for clean architecture.

#### 6. Add Networking Features

For real-time chat or Q&A sessions, consider using **SignalR** for real-time communication:

* Integrate a SignalR client in your .NET MAUI application to connect to a backend server.
* Implement a hub on the server to handle connections and messaging.

#### 7. Test the Application

Utilize the Visual Studio emulator or connect a physical device to test the application across 
different platforms like Android and iOS.

#### 8. Publish the Application

Once testing is complete and the application is stable, you can publish it on various app stores 
using the distribution tools provided by Visual Studio.

This outline should help you get started on creating a basic yet functional conference attendee 
app using .NET MAUI. Depending on your specific requirements, you may need to implement additional 
features or adjust the UI/UX.

</details> 

### Claude

One of the major benefits of [Claude](https://claude.ai) is its ability to separate code from 
the textual part of the response by placing it into a separate panel. This makes it simpler to 
extract the code; however, the code is not divided into separate files. Some additional editing
is therefore needed.

<details>
<summary>Response</summary>

#### Text response

Key features:

* Tabbed interface with Agenda, Speakers, and Attendees sections
* Real-time search for attendees
* Chat functionality with speakers and attendees
* HTTP service for data fetching and messaging
* MVVM-ready with ObservableCollections

Add these NuGet packages:

* Microsoft.Maui.Controls
* System.Net.Http.Json

Would you like me to add any specific features or modify the existing ones?

#### Code response

```
// MainPage.xaml
<?xml version="1.0" encoding="utf-8" ?>
<TabbedPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="ConferenceApp.MainPage">
    <ContentPage Title="Agenda">
        <CollectionView x:Name="agendaList">
            <CollectionView.ItemTemplate>
                <DataTemplate>
                    <Grid Padding="10">
                        <Grid.RowDefinitions>
                            <RowDefinition Height="Auto" />
                            <RowDefinition Height="Auto" />
                        </Grid.RowDefinitions>
                        <Label Text="{Binding Time}" FontAttributes="Bold" />
                        <Label Text="{Binding Title}" Grid.Row="1" />
                    </Grid>
                </DataTemplate>
            </CollectionView.ItemTemplate>
        </CollectionView>
    </ContentPage>

    <ContentPage Title="Speakers">
        <CollectionView x:Name="speakersList">
            <CollectionView.ItemTemplate>
                <DataTemplate>
                    <Grid Padding="10">
                        <Grid.ColumnDefinitions>
                            <ColumnDefinition Width="60" />
                            <ColumnDefinition Width="*" />
                        </Grid.ColumnDefinitions>
                        <Image Source="{Binding PhotoUrl}" HeightRequest="50" WidthRequest="50" />
                        <VerticalStackLayout Grid.Column="1">
                            <Label Text="{Binding Name}" FontAttributes="Bold" />
                            <Label Text="{Binding Bio}" />
                            <Button Text="Chat" Clicked="OnChatClicked" />
                        </VerticalStackLayout>
                    </Grid>
                </DataTemplate>
            </CollectionView.ItemTemplate>
        </CollectionView>
    </ContentPage>

    <ContentPage Title="Attendees">
        <StackLayout>
            <SearchBar Placeholder="Search attendees..." TextChanged="OnSearchTextChanged" />
            <CollectionView x:Name="attendeesList">
                <CollectionView.ItemTemplate>
                    <DataTemplate>
                        <Grid Padding="10">
                            <Grid.ColumnDefinitions>
                                <ColumnDefinition Width="60" />
                                <ColumnDefinition Width="*" />
                            </Grid.ColumnDefinitions>
                            <Image Source="{Binding PhotoUrl}" HeightRequest="50" WidthRequest="50" />
                            <VerticalStackLayout Grid.Column="1">
                                <Label Text="{Binding Name}" FontAttributes="Bold" />
                                <Label Text="{Binding Company}" />
                                <Button Text="Connect" Clicked="OnConnectClicked" />
                            </VerticalStackLayout>
                        </Grid>
                    </DataTemplate>
                </CollectionView.ItemTemplate>
            </CollectionView>
        </StackLayout>
    </ContentPage>
</TabbedPage>

// MainPage.xaml.cs
using System.Collections.ObjectModel;

namespace ConferenceApp
{
    public partial class MainPage : TabbedPage
    {
        private ObservableCollection<Session> sessions;
        private ObservableCollection<Speaker> speakers;
        private ObservableCollection<Attendee> attendees;
        private IConferenceService conferenceService;

        public MainPage(IConferenceService service)
        {
            InitializeComponent();
            conferenceService = service;
            LoadData();
        }

        private async void LoadData()
        {
            sessions = new ObservableCollection<Session>(await conferenceService.GetSessions());
            speakers = new ObservableCollection<Speaker>(await conferenceService.GetSpeakers());
            attendees = new ObservableCollection<Attendee>(await conferenceService.GetAttendees());

            agendaList.ItemsSource = sessions;
            speakersList.ItemsSource = speakers;
            attendeesList.ItemsSource = attendees;
        }

        private void OnChatClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var speaker = button.BindingContext as Speaker;
            Navigation.PushAsync(new ChatPage(speaker));
        }

        private void OnConnectClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var attendee = button.BindingContext as Attendee;
            Navigation.PushAsync(new ChatPage(attendee));
        }

        private void OnSearchTextChanged(object sender, TextChangedEventArgs e)
        {
            var searchText = e.NewTextValue.ToLower();
            var filteredAttendees = attendees.Where(a => 
                a.Name.ToLower().Contains(searchText) || 
                a.Company.ToLower().Contains(searchText));
            attendeesList.ItemsSource = filteredAttendees;
        }
    }
}

// Models/Session.cs
public class Session
{
    public string Id { get; set; }
    public string Title { get; set; }
    public DateTime Time { get; set; }
    public string Description { get; set; }
    public string SpeakerId { get; set; }
    public string Location { get; set; }
}

// Models/Speaker.cs
public class Speaker
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Bio { get; set; }
    public string PhotoUrl { get; set; }
    public List<Session> Sessions { get; set; }
}

// Models/Attendee.cs
public class Attendee
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Company { get; set; }
    public string PhotoUrl { get; set; }
}

// Services/IConferenceService.cs
public interface IConferenceService
{
    Task<List<Session>> GetSessions();
    Task<List<Speaker>> GetSpeakers();
    Task<List<Attendee>> GetAttendees();
    Task<bool> SendMessage(string recipientId, string message);
}

// Services/ConferenceService.cs
public class ConferenceService : IConferenceService
{
    private HttpClient client;
    private string baseUrl;

    public ConferenceService(string apiBaseUrl)
    {
        client = new HttpClient();
        baseUrl = apiBaseUrl;
    }

    public async Task<List<Session>> GetSessions()
    {
        var response = await client.GetAsync($"{baseUrl}/sessions");
        return await response.Content.ReadFromJsonAsync<List<Session>>();
    }

    public async Task<List<Speaker>> GetSpeakers()
    {
        var response = await client.GetAsync($"{baseUrl}/speakers");
        return await response.Content.ReadFromJsonAsync<List<Speaker>>();
    }

    public async Task<List<Attendee>> GetAttendees()
    {
        var response = await client.GetAsync($"{baseUrl}/attendees");
        return await response.Content.ReadFromJsonAsync<List<Attendee>>();
    }

    public async Task<bool> SendMessage(string recipientId, string message)
    {
        var content = new { recipientId, message };
        var response = await client.PostAsJsonAsync($"{baseUrl}/messages", content);
        return response.IsSuccessStatusCode;
    }
}
```

</details>


### Cursor

[Cursor](https://www.cursor.com/) is a fork of Visual Studio Code that integrates AI features 
directly into the editor. The big benefit of that strategy is that Cursor not only generates the 
code; it also creates separate files and inserts them into a default directory structure under 
the project root. The contents of each code file is also duplicated in the text response and so 
only the text response is shown below.

<details>
<summary>Response 1</summary>

I'll help you create a .NET MAUI conference attendee app. Let's break this down into key 
features and create the initial structure.

First, let's create the basic models and main pages. We'll start with the core functionality 
and can expand later.

1. First, let's create our models:

```csharp:Models/Session.cs
public class Session
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string SpeakerId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Room { get; set; }
    public string Track { get; set; }
}
```

```csharp:Models/Speaker.cs
public class Speaker
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Bio { get; set; }
    public string PhotoUrl { get; set; }
    public string Company { get; set; }
    public string JobTitle { get; set; }
    public List<string> SessionIds { get; set; } = new();
    public string LinkedInUrl { get; set; }
    public string TwitterHandle { get; set; }
}
```

```csharp:Models/Attendee.cs
public class Attendee
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Company { get; set; }
    public string JobTitle { get; set; }
    public string PhotoUrl { get; set; }
    public List<string> FavoriteSessionIds { get; set; } = new();
    public string LinkedInUrl { get; set; }
    public string TwitterHandle { get; set; }
}
```

2. Let's create the main pages:

```xaml:Views/AgendaPage.xaml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="ConferenceApp.Views.AgendaPage"
             Title="Agenda">
    <CollectionView x:Name="SessionsCollection"
                    ItemsSource="{Binding Sessions}">
        <CollectionView.ItemTemplate>
            <DataTemplate>
                <Grid Padding="10" RowSpacing="5" ColumnSpacing="10">
                    <Grid.RowDefinitions>
                        <RowDefinition Height="Auto"/>
                        <RowDefinition Height="Auto"/>
                    </Grid.RowDefinitions>
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width="Auto"/>
                        <ColumnDefinition Width="*"/>
                    </Grid.ColumnDefinitions>

                    <Label Grid.Row="0" Grid.Column="0"
                           Text="{Binding StartTime, StringFormat='{0:HH:mm}'}"
                           FontAttributes="Bold"/>
                    
                    <Label Grid.Row="0" Grid.Column="1"
                           Text="{Binding Title}"
                           FontAttributes="Bold"/>
                    
                    <Label Grid.Row="1" Grid.Column="1"
                           Text="{Binding Room}"
                           FontSize="Small"
                           TextColor="Gray"/>
                </Grid>
            </DataTemplate>
        </CollectionView.ItemTemplate>
    </CollectionView>
</ContentPage>
```

3. Let's create a basic ViewModel for the agenda:

```csharp:ViewModels/AgendaViewModel.cs
using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;

namespace ConferenceApp.ViewModels;

public partial class AgendaViewModel : ObservableObject
{
    [ObservableProperty]
    private ObservableCollection<Session> sessions;

    public AgendaViewModel()
    {
        Sessions = new ObservableCollection<Session>();
        LoadSessions();
    }

    private async Task LoadSessions()
    {
        // TODO: Replace with actual API call
        var sampleSessions = new List<Session>
        {
            new Session 
            { 
                Id = "1",
                Title = "Keynote: Future of .NET MAUI",
                StartTime = DateTime.Today.AddHours(9),
                EndTime = DateTime.Today.AddHours(10),
                Room = "Main Hall"
            },
            // Add more sample sessions
        };

        Sessions = new ObservableCollection<Session>(sampleSessions);
    }
}
```

4. Update the App.xaml.cs to set up navigation:

```csharp:App.xaml.cs
public partial class App : Application
{
    public App()
    {
        InitializeComponent();

        var navPage = new NavigationPage(new AgendaPage());
        MainPage = new FlyoutPage
        {
            Flyout = new MenuPage(),
            Detail = navPage
        };
    }
}
```

This gives you a basic structure for the conference app. Here's what we've created:

1. Basic models for Sessions, Speakers, and Attendees
2. An Agenda page that displays the conference schedule
3. A ViewModel for handling the agenda data
4. Basic navigation setup

To complete the app, you would need to add:

1. A service layer to handle API communications
2. Speaker and Attendee list pages
3. Detail pages for Sessions and Speakers
4. Authentication for attendees
5. Networking features (chat, messaging)
6. Favorite/bookmark functionality
7. Push notifications for session reminders
8. Offline data storage

Would you like me to implement any of these additional features or expand on any particular 
aspect of the current implementation?

</details>

### Discussion

Despite ChatGPT being the best known LLM and also the most popular tool cited in the CodeSignal
survey, it provides very little actual code in response to the first prompt. On the other hand,
it explicitly addresses the fact that creating an entire application is a complex task and to
do a good job requires a lot of input. Both Claude and Cursor make some basic assumptions about
the requirements for the app which may or may not be accurate, but that allows them to create
some basic code. ChatGPT and Cursor make recommendations for how to proceed from this initial 
step in the form of a staged process. Claude, on the other hand, simply offers to add more 
features or to adapt existing ones.

A logical conclusion from this experiment is that the developer needs to understand and be 
familiar with the process for designing and building a piece of software. Because there are
many examples of conference apps available, the LLMs might be expected to make some good
default assumptions in this case. However, none of them were able to do this very competently
leaving it to the developer to work through the various stages of the design and development 
process as usual. Applying an Agile approach would be a good fit when incorporating generative
AI tools into the development process because it allows for quick experimentation and 
turnaround of prototypes. However, that also implies that the develop needs to know what a good 
Agile approach looks like and how to control it effectively.

Looking at the code produced by Claude and Cursor, neither example could be compiled and run
without further modification. Using Claude directly, some of the essential elements of a .NET MAUI 
app were missing including the _*.sln_ file. The generated code could only be used either by 
adding the missing elements manually, or by importing it into a stub project. Both of these
approaches require technical knowledge of .NET conventions. The code generated by Cursor was more
complete but still required some manual corrections. For example, one of Cursor's suggestions for 
further development is to implement a chat networking feature. Good software development practice
would be to avoid pre-empting that future feature; however, Cursor does exactly that by including 
a reference to a non-existent `ChatPage` class in `MainPage.xaml.cs`. This is a clear violation
of the KISS and YAGNI principles and causes compilation errors. A further limitation of Cursor 
is that the current version is unable to run a .NET MAUI app. This is because running the code
without debugging is not available as an option, and the debugger is proprietary to Microsoft.
The solution is therefore to open the generated code and run/debug it in VSCode.

From the preceding observations, we can conclude that current versions of software assistants
have some major limitations, some of which may be resolved in the near future such as being
able to run .NET code in Cursor. However, a detailed understanding of the software development
process, the specific technology being used and measures of software quality are still
essential for producing high-quality code using generative AI tools.

## Conclusions and recommendations

The practical value of generative AI in accelerating software development cannot be
ignored. A lot of routine software development will be eliminated by simply mining
software repositories such as GitHub. The successful software engineer will need a
good understanding of AI tools and their limitations and will also need to keep pace
with future developments.

For the software engineering student there is a further challenge related to academic
integrity. Many subject areas are worried that students will submit work that has been
generated by AI rather than by the students themselves. For those disciplines that is
a major problem. In software engineering, however, learning to use generative AI
effectively will quickly become essential. The key question is how the student has
used the generated material. It is unlikely that generated code will offer a good
solution to problems of any complexity. The skill will be in the adaptations and
customisations that the student then makes to better fit the solution to the
requirements. This process needs to be as transparent as possible so that the student's
level of skill is clear. The following recommendations should help to do that and to
avoid any accusations of academic misconduct.

1. When AI tools have been used, this must be stated at the outset.
2. The software development process should be clearly described, detailing the
   additional work that has gone into the project on top of the generated code. This
   could be presented with the help of a flow diagram like the one in Fig. 2.
3. The original generated code should be available for inspection and comparison with the
   final version.
4. Provide a justified rationale for the modifications made to the generated code based
   on the requirements of the project and the quality of the final product.
5. If possible, a theoretically justified process should be adopted for the use of
   AI code generation as part of the development methodology. At the time of writing,
   no formalised methods exist, and individual actions will need to be justified on
   their own merits. It will not be long, however, before project methodologies catch
   up with technological developments.

The final word goes to two German researchers, authors of a paper entitled, *How ChatGPT
Will Change Software Engineering Education*:

> It is crucial to acknowledge that although AI-generated code can serve as a valuable
> resource for developers, it cannot replace human expertise and comprehension. The
> developer will still need to understand the problem and the requirements and validate
> the code generated. They will also need to maintain, debug and adapt the code to
> changing requirements. Thus, future engineers will need to prioritise software design
> competencies over manual code writing skills.
>
> As AI-generated code becomes more
> prevalent, software engineers will need to have a deeper understanding of how to
> design and architect a software system. This includes understanding howto properly
> define the problem and requirements, as well as how to validate and test the
> AI-generated code to ensure it meets the needs of the project. Engineers will also
> need to have a good understanding of how AI algorithms like ChatGPT work, in order to
> be able to adjust or fine-tune the generated code as needed.
>
> [Daun & Brings, 2023](https://doi.org/10.1145/3587102.3588815)

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Practical tips on using coding assistants](assistants_tips)

## Further reading

* [OpenAI Codex](https://openai.com/index/openai-codex/)
* The Next Frontier in Software Development: AI-Augmented Software Development Processes [(Ozkaya, 2023)](https://doi.org/10.1109/MS.2023.3278056)
* A Review of ChatGPT Applications in Education, Marketing, Software Engineering, and Healthcare: Benefits, Drawbacks, and Research Directions [(Fraiwan & Khasawneh, 2023)](https://doi.org/10.48550/arXiv.2305.00237)

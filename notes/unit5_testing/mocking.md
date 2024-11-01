---
title: Dependency injection and mocking
parent: Testing
has_children: true
has_toc: false
nav_order: 2
---

# Dependency injection and mocking

Tight coupling occurs when a class or component is heavily dependent on the specific implementation 
of another class, often creating instances of these dependencies directly within its code. While 
this may work for simple applications, tight coupling presents significant drawbacks in larger, more 
complex systems. Some of the main disadvantages of tight coupling include:

* **Reduced Flexibility**: When a class is tightly coupled to a specific dependency, it becomes 
  difficult to swap out that dependency for an alternative implementation. For instance, if a class 
  is tightly coupled to a specific database connection, replacing it with another type of database 
  or a mock version for testing requires modifying the class itself, increasing the potential for 
  errors.
* **Challenging Testing**: Tightly coupled code makes unit testing harder, as it’s difficult to 
  isolate the class being tested. Since the dependent class is embedded, testing the code usually 
  requires setting up the entire dependency as well, which can be time-consuming and may lead to 
  complex, fragile tests.
* **Higher Maintenance Costs**: When classes are tightly coupled, any change in a dependency can 
  force changes in multiple areas of the codebase, leading to a ripple effect that increases 
  maintenance costs and the risk of introducing bugs. This tight interdependency can make the code 
  harder to understand and maintain.
* **Limited Reusability**: Tightly coupled classes are often bound to specific implementations, 
  making them less reusable in other parts of the application or in other projects. If a class 
  depends on a specific instance of a service, it’s difficult to repurpose that class without also 
  including the dependency.

To address these issues, _Dependency Injection_ (DI) is introduced as a design pattern that helps 
decouple classes from their dependencies, improving flexibility, testability, and maintainability. 
With DI, instead of a class creating its own dependencies, those dependencies are provided to the 
class from an external source, typically through constructor parameters or method parameters. By 
externalizing the creation and management of dependencies, DI allows for easy swapping, mocking, or 
replacing of dependencies without modifying the dependent class.

In practice, dependency injection works hand in hand with Inversion of Control (IoC), a principle 
in which the control of object creation and management is delegated to a container or framework. 
For example, in frameworks like ASP.NET Core, the DI container manages dependencies 
[automatically](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-8.0), 
injecting them into classes as needed. This approach not only reduces tight coupling but also 
fosters a modular, testable architecture that is easier to maintain and adapt over time.

![Fig. 1. Tight (left) and loose (right) dependencies](images/dependency.png){: standalone #fig1 data-title="Tight (left) and loose (right) dependencies" }

Fig. 1 illustrates the concept of dependency injection. Instead of creating a local instance
of a dependency, a class makes use of an object such as a database connection that already exists 
in the context. The three main types of dependency injection are:

1. **Constructor injection**: The service is provided as an argument to the client's
   constructor.
2. **Setter injection**: The client defines a setter function that can be used to set
   the value of an internal variable to an instance of the service
3. **Interface injection**: The system context provides a framework for constructing
   service objects as needed and the client only needs a reference to the service's
   interface. This is the most complex variation, but provides some additional benefits
   if the service needs to do additional work such as keeping track of the number of
   clients.

The example below ([Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection)) 
shows how a video game system could decouple gamepad functionality
from the rest of the system to allow for multiple implementations. Constructor injection
is used to provide the appropriate gamepad implementation to the `GamePad` class at
instantiation.

```C#
using System;

namespace VideoGame;

interface IGamepadFunctionality {
    string GetGamepadName();
    GamePadSettings GetCurrentSettings();
    ...
}

class XBoxGamepad : IGamepadFunctionality {...}
class PlaystationJoystick : IGamepadFunctionality {...}
class SteamController : IGamepadFunctionality {...}

class Gamepad {
    IGamepadFunctionality gamepadFunctionality;

    public Gamepad(IGamepadFunctionality gamepadFunctionality) =>
                   this.gamepadFunctionality = gamepadFunctionality;

    public GamePadSettings GetCurrentSettings() {
        GamePadSettings gamePadSettings = new(
            this.gamepadFunctionality.GetVibrationPower();
            ...
        )
        return gamePadSettings;
    }
    ...    
}

class Program {
    static void Main() {
        var steamController = new SteamController();
        var gamepad = new Gamepad(steamController);
        ...
    }
}
```

> **Notes**
>
> **Lines 5-9**: Define the interface implemented by each of the different gamepads
>
> **Line 16**: The `GamePad` class defines an internal member that implements the
> gamepad interface
>
> **Line 18**: The internal member is set when the `GamePad` object is instantiated based
> on the argument to the constructor
>
> **Line 34**: The service is created as a singleton object in the main program

## Mocking

In many situations, the code under test relies on some other system elements,
either internal or external, that are either difficult or impossible to call directly. An
example might be a method that calculates a result based on data from a database or from
an external API. When testing the code, it is important to be able to control the input.
However, it is a major chore to set up the required database records, and impossible to
control the instantaneous output from an API that is under external control.

The solution is to use a mock object in place of the real element. A mock object stands
in for the real one and is configured to behave in an entirely predictable way. Generally
speaking, a mock is created either from a class definition or from an interface definition.
Both provide information about the behaviour that is needed. Mocking a concrete class
rather than an abstract interface has the benefit that the mock will preserve all the
class behaviour other that the part we specifically want to control. However,
[Khorikov (2020)](https://napier.primo.exlibrisgroup.com/permalink/44NAP_INST/13v8mut/alma9923667243102111)
points out that the main reason that this appears to be necessary is a violation of the
single responsibility principle. Ideally, the functionality that needs to be preserved
should be decoupled from the behaviour that needs to be controlled. This would mean
splitting the original class into parts, each with its own interface that can be mocked
independently. Once the functionality has been partitioned, *dependency injection* can
be used to provide the calling method with access to the dependent object.

## Creating mocks

The general pattern for preparing a mock object consists of two steps. The first is to
create the mock, ideally from an interface definition. The second step is to define the
behaviour that is required for the test. Fig. 2 shows a code snippet that illustrates
this with an example using the [moq](https://documentation.help/Moq/) library.
We assume that we are going to test a method `DisplayCurrentGamepadSettings()` but we
do not want to be tied to using a physical gamepad. We therefore need a mock gamepad
object.

```C#
public void DisplayGamepadSettings_updates_ui_correctly()
{
    var mockGamepad = new Mock<IGamepadFunctionality>();

    mockGamepadSettings = new GamePadSettings();
    mockGamepadSettings.vibrationPower = 0.5;
    ...

    mockGamepad
        .Setup(x => x.GetCurrentSEttings())
        .Returns(mockGamepadSettings);

    var gameDisplay = new GameDisplay(mockGamepad.Object);
    gameDisplay.ShowGamepadSettings();
    Assert.Equal(gameDisplay.GamepadPowerField.Text, mockGamepadSettings.vibrationPower.ToString());
}
```

*Fig. 2: A unit test using dependency injection*

> **Notes**
>
> **Line 3**: Create mock object
>
> **Lines 5-7**: Create dummy return value
>
> **Lines 9-11**: Setup mock object behaviour
>
> **Line 13**: Inject dependency into `GameDisplay()`
>
> **Line 15**: Check that the display has been correctly updated



## Further reading

* [Using Moq: A Simple Guide to Mocking for .NET](https://www.codemag.com/Article/2305041/Using-Moq-A-Simple-Guide-to-Mocking-for-.NET)

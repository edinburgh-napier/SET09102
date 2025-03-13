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
externalising the creation and management of dependencies, DI allows for easy swapping, mocking, or 
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
in the context. The four main types of dependency injection are:

1. **Constructor injection**: The service is provided as an argument to the client's
   constructor.
2. **Method injection**: The service is passed as a parameter into the method that requires it.
3. **Setter injection**: The client defines a setter function that can be used to set
   the value of an internal variable to an instance of the service
4. **Interface injection**: The system context provides a framework for constructing
   service objects as needed and the client only needs a reference to the service's
   interface. This is the most complex variation, but provides some additional benefits
   if the service needs to do additional work such as keeping track of the number of
   clients.

The example below ([Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection)) 
shows how a video game system could decouple gamepad functionality
from the rest of the system to allow for multiple implementations. Constructor injection
is used to provide the appropriate gamepad implementation to the `GamePad` class at
instantiation.

``` c#
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

``` c#
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

{: .figcaption
Fig. 2: A unit test using dependency injection

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

## Mocking frameworks

Mocking frameworks are libraries designed to simplify the process of creating and managing mocks 
in unit tests, enabling developers to isolate code from its dependencies. Mocking frameworks 
provide tools to simulate behaviours, set expectations, and verify interactions with dependencies, 
making tests faster, more predictable, and focused on the specific functionality under test.

Mocking frameworks are particularly useful for dependencies that involve external resources like 
databases, file systems, or network services. Using a mocking framework, you can set up mock 
objects to return controlled responses, throw exceptions, or simply verify that methods were 
called correctly. This approach enhances code modularity, reduces coupling, and makes tests 
faster and easier to maintain.

Mocking frameworks generally offer several core features across languages:

* **Mock Object Creation**: The ability to create a mock instance of a dependency (e.g., 
  Mock<IDatabaseService>), allowing you to replace the real object with a controlled simulation.
* **Method Stubbing**: Setting up methods on mocks to return predefined responses or to throw 
  exceptions. For example, you can configure a database mock to return a specific user object when 
  a lookup method is called.
* **Verification of Interactions**: The ability to verify that specific methods were called, how 
  many times they were called, and with what arguments. This feature allows you to confirm that 
  your code interacts with dependencies as expected.
* **Behavioural Control**: Configuring mocks to behave in certain ways based on context. For 
  instance, you might set a mock to throw an exception on the second call but succeed on the 
  first, testing how code handles intermittent failures.
* **Flexible Return Values**: Mocking frameworks often allow return values to be calculated 
  dynamically based on the input arguments, making it easy to create flexible and realistic 
  test scenarios.

## Examples of Mocking Frameworks in Different Languages

Mocking frameworks are widely available in many programming languages, each tailored to the 
conventions of that language. Here’s an overview of commonly used mocking frameworks in C#, Java, 
and Python.

### Moq

[Moq](https://github.com/devlooped/moq) is a popular mocking framework for .NET languages like C#. 
It is known for its intuitive syntax and integration with the .NET unit testing ecosystem, making 
it a preferred choice for developers working with C#.

**Example**

``` c#
using Moq;
using Xunit;

public interface IUserRepository
{
    User GetUserById(int id);
}

public class UserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }

    public string GetUserName(int id)
    {
        var user = _repository.GetUserById(id);
        return user?.Name;
    }
}

public class UserServiceTests
{
    [Fact]
    public void GetUserName_ReturnsCorrectUserName()
    {
        // Arrange
        var mockRepository = new Mock<IUserRepository>();
        mockRepository.Setup(repo => repo.GetUserById(1)).Returns(new User { Id = 1, Name = "Alice" });

        var userService = new UserService(mockRepository.Object);

        // Act
        var result = userService.GetUserName(1);

        // Assert
        Assert.Equal("Alice", result);
        mockRepository.Verify(repo => repo.GetUserById(1), Times.Once);
    }
}
```

In this example, Moq is used to create a mock `IUserRepository` instance and to set up a response 
for `GetUserById`. We verify that the method is called once and that the result is as expected. 
Moq’s fluent API simplifies the setup, verification, and control of the mock behaviour.

### Mockito (Java)

In Java, [Mockito](https://site.mockito.org/) is one of the most widely used mocking frameworks. 
It offers a fluent API, similar to Moq, and integrates well with JUnit, Java’s common unit testing 
framework.

**Example**

```java
import static org.mockito.Mockito.*;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {
    @Test
    void getUserName_ReturnsCorrectUserName() {
        // Arrange
        UserRepository mockRepository = mock(UserRepository.class);
        User user = new User(1, "Alice");
        when(mockRepository.getUserById(1)).thenReturn(user);

        UserService userService = new UserService(mockRepository);

        // Act
        String result = userService.getUserName(1);

        // Assert
        assertEquals("Alice", result);
        verify(mockRepository, times(1)).getUserById(1);
    }
}
```

In this example, Mockito is used to mock the `UserRepository` interface. The when method allows us 
to specify that `getUserById(1)` should return a User object with the name "Alice". The verify 
method checks that `getUserById` was called exactly once. Mockito’s syntax is clean and makes 
setting up expectations and verifications straightforward.

### unittest.mock (Python)

Python’s [unittest.mock](https://docs.python.org/3/library/unittest.mock.html) is a built-in 
library for mocking, making it easily accessible for Python developers. It integrates well with 
Python’s unittest framework.

**Example**

```python
from unittest import TestCase
from unittest.mock import Mock

class UserService:
    def __init__(self, repository):
        self.repository = repository

    def get_user_name(self, user_id):
        user = self.repository.get_user_by_id(user_id)
        return user['name'] if user else None

class TestUserService(TestCase):
    def test_get_user_name(self):
        # Arrange
        mock_repository = Mock()
        mock_repository.get_user_by_id.return_value = {'id': 1, 'name': 'Alice'}
        
        user_service = UserService(mock_repository)
        
        # Act
        result = user_service.get_user_name(1)
        
        # Assert
        self.assertEqual(result, 'Alice')
        mock_repository.get_user_by_id.assert_called_once_with(1)
```

In this example, `unittest.mock` is used to create a mock repository. The `return_value` attribute of 
`get_user_by_id` specifies the return data for this method. `assert_called_once_with` is used to verify 
that `get_user_by_id` was called with the expected argument.

Mocking frameworks are powerful tools that make unit testing more efficient and effective. By 
isolating dependencies, simplifying configuration, and providing verification capabilities, these 
frameworks enable developers to write robust, focused tests that improve code quality and 
reliability. Familiarity with mocking frameworks in your language of choice is an essential 
skill for building a solid testing foundation.

{: .tip-title }
> [<i class="fa-regular fa-lightbulb"></i> Practical tips for mocking](mocking_tips)

## Further reading

* [Using Moq: A Simple Guide to Mocking for .NET](https://www.codemag.com/Article/2305041/Using-Moq-A-Simple-Guide-to-Mocking-for-.NET)
* [Unit Testing: Moq Framework](https://learn.microsoft.com/en-us/shows/visual-studio-toolbox/unit-testing-moq-framework)

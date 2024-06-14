---
author: Vidush H. Namah
title: .NET MAUI MVVM
date: 2016-06-24
draft: false

description: Introduction to the MVVM Pattern in Xamarin covering the project structure, data binding and changes to property values.

series: Development
---
This tutorial requires a basic knowledge of C# and Xamarin. Some practice in UI design using XAML and Xamarin Forms is also recommended.

## MVVM: Model-View-ViewModel
MVVM is a pattern. What's that, you say?

Patterns (and practices) are blessings from our annoyed forefathers who spent too much time facing the same problems over and over. You can think of them as half-baked recipes that you need to throw your own ingredients in to complete.

> Patterns provide you with a "way of coding" to avoid common problems regarding complexity.

For the case of MVVM, it is a pattern that allows for the separation of the user interface of your application from the business logic.

> UI: The code that make pretty screens and buttons   
> Business Logic: The code that makes the buttons actually do something

Without any kind of separation like MVVM, a typical Xamarin application would have a `UI.xaml` file for the GUI and an accompanying `UI.xaml.cs` file holding the logic that will run when a user interacts with the UI.

<Image>

## Structure of the Pattern
With the application of MVVM, the project structure is broken into three areas:
* Models: A class used to represent data
* Views: The GUI of an application
* ViewModel: The business logic that runs when an action is taken

<!-- <Image/> -->

## Let's Code
Fire up Visual Studio and create a new Xamarin Forms (Portable) project to begin with.   
Our goal is to create a simple BMI calculator.

> All the files and codes will be in the portable shared project for this tutorial

### Project Structure
<!-- <Image> -->
Create three new folders as follows:
* /Models
* /Views
* /ViewModels

This directly correlates to the MVVM pattern.

### Model
Create a class in the `/Models` folder.

This **model** represents the data required when calculating a BMI. Depending on your application, such classes sometimes can represent your database models directly.
{{< highlight js >}}
public class Human
{
    public string Name { get; set; }
    public double Weight { get; set; }
    public double Height { get; set; }
    public double BMI { get; set; }

    public Human(string name, double weight, double height)
    {
        Weight = weight;
        Height = height;
        Name = name;
        BMI = weight / (height * height);
    }
}
{{< /highlight >}}

### View
Create a **Content Page** in the `/Views` folder.
{{< highlight xml >}}
<ContentPage xmlns="http://xamarin.com/schemas/2014/forms"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="XDemo.Views.BMIView">
             
  <StackLayout VerticalOptions="Center">
    <!--THIS LABEL SHALL DISPLAY THE CALCULATED BMI LATER-->
    <Label Text="HELLO XAMARIN" XAlign="Center" />
    
    <Entry Placeholder="NAME"/>
    
    <Label Text="WEIGHT (KG)" XAlign="Center" />
    <Entry x:Name="Weight" />
    
    <Label Text="Height (M)" XAlign="Center" />
    <Entry x:Name="Height" />

    <!--NOTICE HOW THE BUTTON HAS NOT BEEN PROGRAMMED!-->
    <Button Text="CALCULATE BMI" />
  </StackLayout>
</ContentPage>
{{< /highlight >}}

### ViewModel
Create a class in the `/ViewModels` folder.

The **view-model** is responsible for populating the **view** with data from the **model**. It also contains the logic behind operations triggered from the **view**. Logically, every input and output field in the **view** would need a corresponding element (variable) in the **view-model**.

{{< highlight js >}}
public class BMIViewModel
{
    //FOR THE WEIGHT ENTRY
    private double _weight;
    public double Weight
    {
        get { return _weight; }
        set { _weight = value; }
    }
    
    //FOR THE HEIGHT ENTRY
    private double _height;
    public double Height
    {
        get { return _height; }
        set { _height = value; }
    }
  
    //FOR THE NAME ENTRY
    private string _name;
    public string Name
    {
        get { return _name; }
        set { _name = value }
    }

    //FOR THE MESSAGE DISPLAY
    private string _message;
    public string Message
    {
        get { return _message; }
        set { _message = value; }
    }

    public BMIViewModel()
    {
        //INITIALIZING UI AND VARIABLES
        Message = "HELLO XAMARIN FROM MVVM!";
    }
}
{{< /highlight >}}

### Bindings
At the moment, the **view** and **view-model** are completely separate files in the project. The **view** and the **elements** in the view need to be informed of the existence of the **view-model** (or vice-versa) to connect the two.

#### Binding Context
First and foremost, we need a **binding context**, which essentially tells the **view** that it needs to link up to its **view-model**. This can be done directly in `xaml` file, or via the `xaml.cs` (code-behind) file.

We will go for `xaml.cs` in this tutorial.

{{< highlight js >}}
public partial class BMIView : ContentPage
{
    public BMIView()
    {
        InitializeComponent();
        this.BindingContext = new BMIViewModel();
    }
}
{{< /highlight >}}

#### Data Binding
The **view** is now bound to the **view-model**, but something is still missing. Similar to the **binding context**, the **view** components (Entry Boxes, Labels etc.) also need to bind themselves to the variables in the **view-model**.

Let's set up the **data-binding** in the **view**.

{{< highlight xml >}}
<!--BINDING FORMAT-->
<!--{Binding VARIABLE_NAME_IN_VIEWMODEL}-->
<Entry Placeholder="NAME" Text="{Binding Name}"/>

<Label Text="Weight (KG)" XAlign="Center"/>
<Entry Placeholder="WEIGHT(KG)" Text="{Binding Weight}"/>

<Label Text="Height (M)" XAlign="Center"/>
<Entry Placeholder="HEIGHT(M)" Text="{Binding Height}"/>
{{< /highlight >}}


#### Command Binding
Take a moment to celebrate - things are moving along nicely.   
The only thing left is the Button, and luckily MVVM allows you to treat Buttons very similarly to other elements like Labels - i.e. using **bindings**. For that, we will make use of the **ICommand Property**.

Simply put, one can set the value of an ICommand Property to be a function - hence, when that property is read, the function is returned.

> Think of ICommands as a way to expose functions as a variable.

This allows us to bind a function to a button, just like the other elements were bound to their counterparts in the **view-model**.

Create an ICommand in the View-Model.
{{< highlight js >}}
public ICommand CalculateBMI
{
    get 
    {
        return new Command(() =>
        {
            //CREATING OUR HUMAN OBJECT TO HOLD THE VALUES
            //NOTE THAT WE CAN MAKE MORE INTENSIVE USES OF THIS MODEL
            //IT'S JUST NOT OUR FOCUS FOR THIS ARTICLE
            Human LabRat = new Human(Name, Weight, Height);

            //UPDATING MESSAGE WITH THE BMI VALUE
            //TOSTRING() CONVERTS THE DOUBLE TO STRING TYPE
            //THE ARG FORMATS THE VALUE TO 2 DECIMAL PLACES
            Message = LabRat.Name + "'S BMI: " + LabRat.BMI.ToString("0.00");

            //RESETTING ALL ENTRY FIELDS
            Name = null;
            Weight = 0;
            Height = 0;
        });
    }
}
{{< /highlight >}}

> Read more on [Lambda Expressions](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/lambda-expressions) if you are unfamiliar with the code syntax above.

Finally, update the view to bind the command to your button.
{{< highlight xml >}}
<Button Text="CALCULATE BMI" Command="{Binding CalculateBMI}"/>
{{< /highlight >}}

#### Property Changes
Looks like everything is in place - the application should run, right?   
Go ahead and try to run it, and click on the button.

> Face that crash and burn like a proper developer.

That's right, clicking on the button does nothing.

Here's the deal.   
Everything was coded and bound, but one problem remains. We cannot expect the application to spend all of its precious resources constantly surveying all the elements and variables in the codebase waiting for a change.

The solution - **INotifyPropertyChanged**.   
This is a means to inform the application when something changes for it to taking necessary steps and refresh the elements on the screen.

Update the **view-model** code as below.
{{< highlight js >}}
public class BMIViewModel : INotifyPropertyChanged 
{
    //THIS ACTS AS A LISTENER WAITING FOR SOMETHING TO CHANGE VALUES
    public event PropertyChangedEventHandler PropertyChanged;
    
    ...
}
{{< /highlight >}}

The **PropertyChanged** variable acts as an agent between the **view** and the **view-model**, keeping track of what values are changing.
* When **PropertyChanged** is null – it implies nothing has changed.
* Setting a value to **PropertyChanged** triggers an update the **view**. 

So, our next step is to ensure that we update the **PropertyChanged** variable when something changes.

Create a method in the **view-model**, designed to update the **PropertyChanged** variable when it is called.
{{< highlight js >}}
public class BMIViewModel : INotifyPropertyChanged
{
    ...

    //THIS FUNCTION TAKES A STRING AS PARAMETER
    //THE STRING WOULD BE THE NAME OF THE VARIABLE THAT CHANGED
    public void OnPropertyChanged(string propertyName)
    {
        //CHECKING IF PROPERTYCHANGED IS NULL - WHICH WOULD MEAN NOTHING CHANGED
        if (PropertyChanged != null)
        {
            //NOPE. SOMETHING CHANGED.
            //TIME TO CALL PROPERTYCHANGED WITH ITS ARGUMENTS
            //ARG1: 'THIS' - MEANS SOMETHING CHANGED IN THIS VIEWMODEL RIGHT HERE.
            //ARG2: IT USES PROPERTYNAME TO FETCH THE ACTUAL PROPERTY THAT CHANGED.
            PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
{{< /highlight >}}

Lastly, update the data variables (the ones that populate the screen) to call our method when a change happens.
{{< highlight js >}}
public class BMIViewModel : INotifyPropertyChanged
{
    ...
    
    //VARIABLE: NAME
    private string _name;
    public string Name
    {
        get { return _name; }
        set
        {
            _name = value;
            
            //NOTICE HOW THE NAME ("NAME") OF THE VARIABLE IS BEING PASSED
            //IT WILL LATER BE PASSED AS ARGUMENT TO PROPERTYCHANGED
            //HELPING IT IDENTIFY THAT THIS VARIABLE (NAME) IS THE ONE THAT CHANGED
            OnPropertyChanged("Name");
        }
    }

    //VARIABLE: DISPLAYS MESSAGE(BMI)
    private string _message;
    public string Message
    {
        get { return _message; }
        set
        {
            _message = value;
            
            //SAME PRINCIPLE AS ABOVE
            //HERE THE NAME OF THE VARIABLE IS "MESSAGE"
            OnPropertyChanged("Message");
        }
    }
}
{{< /highlight >}}

## It's a wrap (or a taco)
Give the application a spin.

This was an introduction to MVVM and how you can easily set it up to decouple your logic from your front-end.
There is more to it, but for now, grab a taco and congratulate yourself for a job well done.


## Credits
Cover Image: Photo by [Nathan Da Silva](https://unsplash.com/@silvawebdesigns?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/FO7kUmBYVi0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  


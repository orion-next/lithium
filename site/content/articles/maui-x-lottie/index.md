---
author: Vidush H. Namah
title: Lottie Animations in .NET MAUI

date: 2024-01-20
draft: false

description: Tutorial on how to use Lottie Animations in a .NET MAUI Project (Topic of MSCC Meetup 2024/01)

series: Development

tags:
    - MSCC Meetup
---
Source Code: https://github.com/vnsnippets/samples/tree/MEETUP-2024-01-MAUI-Lottie

## Animations in .NET MAUI
As part of the Developers' Conference 2023 (MU), I presented how to use .NET MAUI and the Animations feature to create some interesting animated components.

{{< figure src="animation-sample.gif" width="100%" alt="Lottie Animation Sample" class="rounded" >}}

Custom animations are great, especially when dealing with user interactions - but in some situations, it can be interesting to simply have an animated image (think GIF) in the application.

A basic animated image can:
- Spice up the application with no use whatsoever   
  E.g. A smiling avatar on a login or signup page

- Provide some visual context of what you are doing   
  E.g. An animated cart that triggers everytime something is added

- Indicate that something is happening   
  E.g. An animated card reader to show payment was successful

## Lottie Animations
Lottie is an open-source animation file format that allows adding animations on any platform as easily as normal images.   

They are basically JSON files that provide vector images - allowing for scaling without pixelation - and scripting the animation. In a nutshell, it provides the information needed for your application to draw the image in real-time. Your application can then "change" the image based on the script, resulting in an animation.

Since the animation is being created in realtime, it can also be interactive - triggering animations when needed, pausing in the middle and can even be manipulated etc.

## Skia 
Skia is an open-source 2D graphics library that provides common APIs for drawing text, geometric shapes and images on various platforms.

To put it simply, Skia pushes pixels. It is typically used in combination with some sort of canvas, and the application logic would ask Skia to push some pixels somewhere on that canvas - resulting in an image.

## Skia, C# and Lottie
As part of the Mono Project (https://www.mono-project.com/), some great minds decided to create a NuGet package that allows using Skia in C# - SkiaSharp. Let it brew (and adapt to technology growth) and we now have a Skia library that works on .NET MAUI with Lottie support.

So now we can provide a Lottie file to SkiaSharp, which will draw images and animations in your application.

## Let's get cooking
This project is a simple one, aiming to add Lottie animations to a page in a .NET MAUI application.

### Ingredients
| Requirement | Reference | Version |
|-|-|-|
|.NET 7.0+ | https://dotnet.microsoft.com/en-us/download/dotnet/7.0 | 7.0.100 |
|.NET MAUI | https://dotnet.microsoft.com/en-us/apps/maui | - |
| SkiaSharp.Extended.UI.MAUI | https://mono.github.io/SkiaSharp.Extended/index.html | 2.0.0-preview.86 |

### Instructions
> Make sure you installed the `SkiaSharp.Extended.UI.MAUI` NuGet package to your application

Open your `MauiProgram.cs` file and add the `UseSkiaSharp` call as follows. This initializes SkiaSharp into your application and allows the controls/views provided by the library to be used.

```cs
public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.UseSkiaSharp()
            ...
        // Followed by whatever else your application has
    }
}
```

Find your Lottie animation and download the JSON file.   
Store that file in the `./Resources/Raw` folder
> Lottie Files (https://lottiefiles.com/) is a nice starting point, although you need to create an account to get access to the files
```
├── YOUR_CSHARP_PROJECT_FOLDER
│   ...
│   └── Resources
│       ├── AppIcon
│       ├── Fonts
│       ├── Images
│       ├── Raw
│           └── <This is where the Lotties go>
│       ...
...
```

Open the XAML file of your choosing, where you want to add the animation and add following namespace. This allows you to use the controls and views in the SkiaSharp library (by using the SKIA prefix).

`xmlns:skia="clr-namespace:SkiaSharp.Extended.UI.Controls;assembly=SkiaSharp.Extended.UI;assembly=SkiaSharp.Extended.UI"`

Your file should look as follows:
```xml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage 
    xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
    x:Class="MU202401.Pages.MainPage"
    xmlns:SKIA="clr-namespace:SkiaSharp.Extended.UI.Controls;assembly=SkiaSharp.Extended.UI;assembly=SkiaSharp.Extended.UI">
    
    ...
</ContentPage>
```

And finally, add your animation using the `SKLottieView` control from the SkiaSharp library.
```xml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage 
    xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
    x:Class="MU202401.Pages.MainPage"
    xmlns:SKIA="clr-namespace:SkiaSharp.Extended.UI.Controls;assembly=SkiaSharp.Extended.UI;assembly=SkiaSharp.Extended.UI">
    ...
    <SKIA:SKLottieView
        Source="your_lottie_animation.json"
        RepeatCount="-1"
        HeightRequest="250"
        WidthRequest="250" />
    ...
</ContentPage>
```

Some details about the properties I played with:
| Property | Details |
|-|-|
| `RepeatCount` | Specifies how many times will the animation repeat itself. Default value is 0, and any negative number will allow for infinite loop. |
| `HeightRequest` | Specifies the height of your image |
| `WidthRequest` | Specifies the width of your image |

> There are more properties available, and details documentation about the library [can be found here](https://mono.github.io/SkiaSharp.Extended/index.html).

## That's a wrap
You can find my sample application here: https://github.com/vnsnippets/samples/tree/MEETUP-2024-01-MAUI-Lottie

Typically, just a build and run should do it.    
The pages I created are in the `./Pages` folder with:
- A basic example in `MainPage.xaml`
- A more fancy example in `DemoPage.xaml`

Modify the `AppShell.xaml` file to load your desired page.    
No routing or navigation was added to this application - it's a free sample, don't complain 🤬

Happy Coding 👨‍💻
---
author: Vidush H. Namah
title: Sample Markdown Blog Post
date: 2000-01-01
draft: true

description: Sample article showcasing basic Markdown syntax and formatting for HTML elements.

series: Sample

display:
  readingtime: true
  date: true

widgets:
  search: false
---

# This is a Heading-1
## This is a Heading-2
### This is a Heading-3
#### This is a Heading-4
##### This is a Heading-5
###### This is a Heading-6

### Horizontal Rule
---

### Typographic replacements
Mathematical symbols:
&forall; &part; &exist; &empty;	&nabla;	&isin; &notin; &ni;	&ni; &sum;  
Greek Letters:
&Alpha;	&Beta; &Gamma; &Delta; &Epsilon; &Zeta;  
Other symbols:
&copy; &reg; &trade; &#8471; &pm; &euro; &larr; &uarr; &rarr; &darr;	&darr; &clubs; &hearts;	&diams;

References:  
[Currency Code List][html-currency-codes]  
[Arrow Code List][html-arrow-codes]  
[Miscellaneous Code List][html-misc-codes]

### Footnotes

This will contain a reference in the footnotes[^foot-first].  
Click on the tiny number to see it[^foot-second].

Another line can refer to the same footnote[^foot-second].

<!-- Here is how you define the footnotes -->
[^foot-first]: Footnote **can have markup** goodness too  
    and multiple paragraphs.

[^foot-second]: Click on the tiny arrow to go to the main text.

<!-- Links Shortcode -->
[html-currency-codes]: https://www.w3schools.com/charsets/ref_utf_currency.asp
[html-arrow-codes]: https://www.w3schools.com/charsets/ref_utf_arrows.asp
[html-misc-codes]: https://www.w3schools.com/charsets/ref_utf_symbols.asp


Some punctuation: ! ? , -  -- ---

"Double quotes" and 'single quotes'


### Emphasis
**This is bold text**  
__This is bold text__  
*This is italic text*  
_This is italic text_  
~~Strikethrough~~


## Blockquotes
> Quotes can be a single line

> Blockquotes can also be on multiple lines  
> by prefixing every line with a &gt; sign


## Lists

Unordered
+ Create a list by starting a line with `+`, `-`, or `*`
- Using another symbol forces a fresh list to start
- Notice how the items in this list are nicely grouped
  - Sub-lists are made by indenting 2 spaces
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- And you can resume the main list as well

Ordered
1. You can use sequential numbers
2. to create a list of ordered items
3. just like this one
---
1. For those longer list where you don't want to keep track
1. you can just number them all as `1`
1. and that works as well
---
1. If you put a space between
1. any of the items in a list

1. it will space out all the items
1. in that list - like so
---
57. You can also start a list with an offset
1. by setting the right starting value
1. to the first item in the list


## Code
`Inline code` can be used.

```
Code blocks can also be used.
```

```
Code can also be indented
  Because everybody knows that
    A good developer always indents
```

``` js
/*
  * Syntax Highlighting: JavaScript
*/

var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

```csharp
/*
  * Syntax Highlighting: C#
  * Granted, it's not very good 😟
*/

public void Run() {
  Console.WriteLine("Yes, I see sharp.")
}
```

## Tables

Tables with left alignment:
| Option | Description |
| ------ | ----------- |
| Option 1  | Lorem ipsum dolor sit amet, consectetur adipiscing elit |
| Option 2 | Lorem ipsum dolor sit amet, consectetur adipiscing elit |
| Option 3    | Lorem ipsum dolor sit amet, consectetur adipiscing elit |

Tables with right alignment:
| Option | Description |
| ------:| -----------:|
| Option 1  | Lorem ipsum dolor sit amet, consectetur adipiscing elit |
| Option 2 | Lorem ipsum dolor sit amet, consectetur adipiscing elit |
| Option 3    | Lorem ipsum dolor sit amet, consectetur adipiscing elit |

Tables with center alignment:
| Option | Description |
|:------:|:-----------:|
| Option 1  | Lorem ipsum dolor sit amet, consectetur adipiscing elit |
| Option 2 | Lorem ipsum dolor sit amet, consectetur adipiscing elit |
| Option 3    | Lorem ipsum dolor sit amet, consectetur adipiscing elit |


## Links
[This is the link text](https://vnsnippets.github.io/)  
[Hover on me to see a title text](https://vnsnippets.github.io/ "You are hovering!")  
And this is a direct link: https://vnsnippets.github.io/

<!-- This sets a "variable name" to a link -->
<!-- Typically set in the footnotes -->
<!-- Called the footnote style syntax -->
[the-link]: https://vnsnippets.github.io/

<!-- And this is how it is used -->
[This link was set via the footnote style syntax][the-link]


## Images
![this-is-the-alt-text](https://bit.ly/3kPGHfS?w=1000)  

Images also have a footnote style syntax:
<!-- Here is how you define the footnote variable -->
[image-link]: https://bit.ly/40joBTT

<!-- Here is how you use it -->
![this-image-used-footnote-style][image-link]



### Some other syntax

This paragraph is a regular one.  
: But then has an indented section.

This line has *inline markup*

This is another way to write some code:

    Some Code that will all stick together
    as long as the indentation is the same
      Or further indented!
  But less intended breaks the code block

### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)
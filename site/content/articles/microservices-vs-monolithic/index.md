---
author: Vidush H. Namah
title: Microservices vs Monolithic Architecture

date: 2023-08-19
draft: false

description: A summary of my thoughts around microservices and monolithic architectures following the Monthly MSCC Meetup of August 2023.

series: Architecture

tags:
    - microservices
    - architecture
    - mscc meetup
---

This is an opinionated blog post regarding my personal views and how I approach the question of "Should I use a microservice-based or monolithic architecture?"

## Monolithic Architectures
In simple terms, monolithic architecture refers to a style of designing an application as **a single unit**:
- All components are **tightly coupled**
- Application **resources are shared**

> Single tightly coupled unit sharing resources

**Is that true?**   
Typically yes, but nothing in this industry is black and white.   
With the right design approach, you could still have decoupled modules/components and module-specific resources.

## Microservice Architecture
On the other hand, microservice architectures are composed of **small independent serivces** (or solutions) communicating with each other using lightweight protocols:
- Each service can **run on its own**
- Each service (typically) **has its own resources**

> Small independent services running on their own using their own resources

{{< figure src="mono-vs-micro.jpg" width="1200" alt="Monolithic vs Microservice Architecture" class="rounded" >}}

## Technical Representation
In this section, we will attempt to visualize what each architecture might look like for an e-commerce platform.

### Monolithic Platform
The entire application is developed as a single unit, and it is hosted on a single server exposing a REST API.   
The API itself may have multiple endpoints, but any request to any of those endpoints will always come to that same server, and that same application.

{{< figure src="mono-api.png" width="1200" alt="Monolithic Application Example" class="rounded" >}}

This makes monolithic applications easier to develop and deploy in the sense that you only have to worry about a single application and a single set of resources (e.g. servers). In that sense, it would also be easier to manage.

On the downside,
- It is harder to scale individual components or functionalities since the application exists as one and the resources are shared - either you scale the whole thing or you don't.
- Maintenance updates are also more risky since it could impact the entire application, including unrelated features.
- Extension of the application is just as risky for that same reason.

> One could argue that splitting the application into more atomic components (microservices) makes it easier to develop and deploy - **which is not wrong**, but it does come at the cost of designing and managing multiple sets of resources

### Microservices Platform
The application is split up into small services, each developed, hosted and managed separately.
On top of exposing the main application features, you also have to ensure that each service is self-sufficient and can communicate with other services in certain situations.

{{< figure src="micro-api.png" width="1200" alt="Microservice Application Example" class="rounded" >}}

With this distributed approach, it is now:
- Easier to scale individual components focusing on their different needs.
- Easier to maintain, test and extend components separately with lower risk of impacting other components.

On the other hand,
- The complexity of design and development is much higher, and can worsen over time as the application grows.
- Extra effort is required to ensure that the whole set of solutions can work together as a single flow for the customers.
- All around, everything is more challenging - latency needs to be considered, serivce discovery, data consistency issues, race conditions, security, monitoring, debugging and more.
- More tests are required in more variations.
- For companies, more people are needed and sometimes more teams entirely.

> One could argue any of those pros and cons, and they would not be wrong - in the end it's a matter of perspective

## Do you need microservices?
At least start with **NO**.

It is easy to over-architect a solution if you think too much in the beginning. With experience and practice, you can do that quite easily - but to start with, you should think of the simplest and easiest way forward.

Of course, as you proceed, you will encounter challenges and the problems will make themselves known. That is the point at which the need for a microservice-based architecture will reveal itself.   

The best architecture decisions are the ones that do not have to be made - the problem makes it clear on its own.

> Si tou dimunn dn maryaz pou manz tou les sept cari, **met tou dans ene sel bol**.   
>
> Si ena pou manz gros pois, ena pa lai chouchou, ena pas lai kuccha - **plito separe li dan sept bol**

## And it's a cheesy wrap.
That concludes my thoughts on the subject.   

Keep in mind that this can be very nuanced and should not be treated as the ultimate guide. Different situations, different problems and different projects require different perspectives and approaches.   

To put it simply, the true correct answer is **it depends**.

reusable# Common Signup Page

Sign up for Common in three simple steps that confirm where you want to live, who you and whomever you'd like to live with are, and that the data supplied in complete to get started. Please visit https://westbrook.github.io/common-sign-up to test out the experience.

# !! Disclaimer !!

To specifically support the distribution to GitHub pages I manually altered the built assets to support the `/common-sign-up` root path forced onto the experience in that context. This won't occur by default with the current tooling.

## Running

```bash
  git clone https://github.com/Westbrook/common-sign-up.git
  cd common-sign-up
  yarn
  yarn start
```

## Choices

### Web Components

This application is build with the specification that come together to form "web components"; custom elements, shadow DOM, the `<template/>` tag, and ESModules. With the help of the LitElement base class pair those concepts with lit-html for performant rendering and a reactive data management, these decisions do most of the heavy lifting to ensure a straight 100s score on Lighthouse's performance, accessibility, best practices, and SEO tests by delivering a just over 10KB over the wire weight when built for production deployment.

To help structure this decision I chose to work with the tooling supplied by open-wc.org to structure yarn scripting, Rollup build tooling, Karma based unit testing, Storybook powered demos and a number of other decisions that are helpful for the long term management of a code project. However, currently, you will not see an active use of the Storybook demos or Karma unit testing.

### Code structure

In its current state the code is specifically structured to rely on the least amount of hard and fast decisions. Rather than work towards complicated delivery systems for the internal data and its management the least amount of work to get the features supported as requested has been partaken such that the greatest amount of flexibility is available in response to future requirements when these features meet actual users in the field. However, the organization of methods and properties are already pointing to solid refactor points that will likely prove useful for deeper encapsulation and reusability of the features like capturing/validating user data, managing routing, and abstracting DOM structures.

### Design application

In a similar vein, while the design is explicitly customized away from the browser defaults only the smallest amount to conform with the wireframes has been applied so that work in this are can be most immediately taken on. In this was the application of styles are not divvied up into reusable patterns, neither by conventions like BEM, et al, nor by configuration of extended us of Shadow DOM for style encapsulation.

### Validation

A light amount of data validation is being applied (predominately presence, but some shape checking) in the user data on the second page. It wasn't outlined in the spec, so at currently there is only red text announcing a single related validity error per input. Focusing on specific forms of validity would certainly be a good call as these patterns get further componentized for reuse.

### Routing

Without appending stateful data into the routing, which would be nicer long term, simple page based routing has been applied to manage the visible page at any one time. The data could certainly be pushed into the URL or local storage for easy persistence of data, however being able to store to a company data base on page turn, and then has that data location for future interface would probably be best as it affords the most vibrant opportunities for contacting users about incomplete data going forward. To ensure that routing works properly in the deployed context (GitHub pages) a static page for each route is currently being managed, but that responsibility should be off loaded to proper environment settings on the server in an optimal deployment context.

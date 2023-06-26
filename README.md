# LocaLink
## - Connecting people in their Community -

![image](https://github.com/GuyKensdale/Local-Link/assets/124263674/a71e0083-7699-479f-9251-4742bd6abf2a)

----
## App Description
LocaLink is an app for Android and iOS designed to bring local communities together without the need to share personal information such as email or phone numbers. 
Localink aims to be the one-stop shop for online community interaction, avoiding the need for several groups and pages across many different platforms, making all the information about a building or neighbourhood organised and accessible.
Features include user sign-in, community homepages, management announcement pages, group chats, community calendars, marketplaces and dedicated lost-and-found pages, among others.

You can see an App walk-through in [THIS VIDEO](https://youtu.be/wKhwUYicCyw)

----

## Project Setup

To set up this project as a developer, first ensure you are running the latest version of node.js. 

Next, download and open up the repo and run ```npm install``` to obtain all the packages necessary for the app to run. Details on the specific technologies used can be found at the end of this README.

In addition to these packages, LocaLink is designed to be integrated with an existing Firebase database. If you do not already have a database set up, the documentation on how to do so can be found [HERE](https://firebase.google.com/docs/database).

Once you have a database, you will need to create a ```.env``` file inside the project. Populate it with the following information unique to your database:

```API_KEY=```

```AUTH_DOMAIN=```

```PROJECT_ID=```

```STORAGE_BUCKET=```

```MESSAGING_SENDER_ID=```

```APP_ID=```

Once this is done, run ```npm start``` and the app should start. You may test or open this as you would with any mobile app.

Inside the app, the database will be dynamically accessed through the Calendar, Lost & Found, Management Announcements, Marketplace, Recommendations, Find Community and Chat pages. The data these pages draw from can be populated through the Add Event, Lost & Found, Post an Announcement, Marketplace, Recommendations, Create Community and Chat pages.

---

## Tech Stack:

We used the following technologies: React Native, Expo, Expo Go, Firebase, Firestore, TypeScript, npm, and Version Control with Git.

For this project we chose React Native for our frontend, which enabled us to craft a versatile application compatible with both Android and iOS devices. React Native presented us with an array of invaluable libraries and tools, including date selectors and image uploaders, which played a pivotal role in our app's functionality.

To further enrich our expertise and leverage additional capabilities, we incorporated TypeScript  in our project. 

For our backend infrastructure, we opted for Firebase, which streamlined our workflows significantly. By choosing a non-relational database early on, we gained the flexibility to mold our data structure as needed and pave the way for future expansions.

### Other technologies/Libraries used:

React Query (to fetch, cache and update our data)

Expo (to preview and test our App)

Formik (to create the different forms)

Yup (to help with form validation)

React Navigation (to allow navigation between the App's different screens)

React Native Calendar (to add a Calendar feature to the App)

---

## Other Considerations:

This was a group project that was part of a 13-week Software Development Bootcamp with [Northcoders](https://northcoders.com/). We were a team of five people and we came up with the idea, outlined the project, created the first App mockups, built the entire project and presented it at graduation on the 23rd of July, 2023. 

I was responsible for creating the design/visual aspect of LocaLink and helped building features and screens of the App.
The first mockups of the App were created on Figma:
![app initial mockups](mockups.png)

Contributors:

https://github.com/veramferreira

https://github.com/AlinaKhvishchuk

https://github.com/GuyKensdale

https://github.com/JoshuaGoodwill

https://github.com/SarahHume

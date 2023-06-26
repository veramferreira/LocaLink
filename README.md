# LocaLink
## - Connecting people in their Community -

![image](https://github.com/GuyKensdale/Local-Link/assets/124263674/a71e0083-7699-479f-9251-4742bd6abf2a)

## Overview
LocaLink is an app for Android and iOS designed to bring local communities together without the need to share personal information such as email or phone numbers. It aims to be the one-stop shop for online community interaction, organising and providing access to all the information about a building or a neighbourhood.

----
## App Description
LocaLink features user sign-in, community homepages, management announcement pages, group chats, community calendars, marketplaces, dedicated lost-and-found pages, and more.

Check out the App walk-through video [here](https://youtu.be/wKhwUYicCyw).

----

## Project Setup

To set up this project as a developer, first ensure you are running the latest version of node.js. 

1. Download and open the repository.
2. Run the following command to install the necessary packages: `npm install`.
3. Create a `.env` file inside the project and populate it with the following information unique to your Firebase database:


```API_KEY=```

```AUTH_DOMAIN=```

```PROJECT_ID=```

```STORAGE_BUCKET=```

```MESSAGING_SENDER_ID=```

```APP_ID=```

4. If you don't have a Firebase database set up, refer to the documentation [here](https://firebase.google.com/docs/database) for instructions.
5. Run `npm start` to start the app.
6. Test or open the app as you would with any mobile app.


The app dynamically accesses the database through various pages, such as Calendar, Lost & Found, Management Announcements, Marketplace, Recommendations, Find Community, and Chat. The data can be populated through the corresponding pages like Add Event, Lost & Found, Post an Announcement, Marketplace, Recommendations, Create Community, and Chat.


---

## Tech Stack:

LocaLink uses the following technologies and libraries:

- React Native
- Expo
- Firebase
- Firestore
- TypeScript
- npm
- Git (Version Control)

Other technologies and libraries used include:
- React Query (for data fetching, caching, and updates)
- Expo Go (for app preview and testing)
- Formik (for form creation)
- Yup (for form validation)
- React Navigation (for navigation between screens)
- React Native Calendar (for adding a calendar feature)

---

## Other Considerations:

LocaLink was developed as a group project during a 13-week Software Development Bootcamp with [Northcoders](https://northcoders.com/). The team consisted of five contributors who came up with the idea, outlined the project, created mockups, built the entire project, and presented it at graduation on the 23rd of July, 2023.

Here is the wireframe of the project:
![app wireframe](https://github.com/veramferreira/LocaLink/blob/main/assets/localink-wireframe.png?raw=true)

I was responsible for creating the design/visual aspect of LocaLink and helped building features and screens of the App.

The first mockups of the App were created on Figma:

![app initial mockups](https://github.com/veramferreira/LocaLink/blob/main/assets/mockups.png?raw=true)

### Project Contributors:

[Vera Ferreira](https://github.com/veramferreira)

[Alina Khvishchuk](https://github.com/AlinaKhvishchuk)

[Guy Kensdale](https://github.com/GuyKensdale)

[Joshua Goodwill](https://github.com/JoshuaGoodwill)

[Sarah Hume](https://github.com/SarahHume)

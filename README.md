![image](https://github.com/GuyKensdale/Local-Link/assets/124263674/a71e0083-7699-479f-9251-4742bd6abf2a)

LocalLink is an app for Android and iOS designed to bring local communities together. Although primarily aimed at tenants of the same building, it is entirely possible for wider communities to make use of it as well.
Features include user sign-in, community homepages, management announcement pages, group chats, community calendars, marketplaces and dedicated lost-and-found pages, among others.

##

To set up this project as a developer, first ensure you are running the latest version of node.js. 

Next, download and open up the repo and run ```npm install``` to obtain all the packages necessary for the app to run. Details on the specific technologies used can be found at the end of this README.

In addition to these packages, LocalLink is designed to be integrated with an existing Firebase database. If you do not already have a database set up, the documentation on how to do so can be found at: https://firebase.google.com/docs/database

Once you have a database, you will need to create a ```.env``` file inside the project. Populate it with the following information unique to your database:

```API_KEY=```

```AUTH_DOMAIN=```

```PROJECT_ID=```

```STORAGE_BUCKET=```

```MESSAGING_SENDER_ID=```

```APP_ID=```

Once this is done, run ```npm start``` and the app should start. You may test or open this as you would with any mobile app.

Inside the app, the database will be dynamically accessed through the Calendar, Lost & Found, Management Announcements, Marketplace, Recommendations, Find Community and Chat pages. The data these pages draw from can be populated through the Add Event, Lost & Found, Post an Announcement, Marketplace, Recommendations, Create Community and Chat pages.

##

Technologies used:

node.js

React - https://react.dev/

React Native - https://github.com/facebook/react-native#readme

React Query - https://github.com/TanStack/query#readme

Typescript - https://www.typescriptlang.org/

Firebase - https://firebase.google.com/

Expo - https://github.com/expo/expo/tree/main/packages/expo

Babel - https://babel.dev/docs/en/next/babel-core

Formik - https://formik.org

Yup - https://github.com/jquense/yup

##

Contributors:

https://github.com/veramferreira

https://github.com/AlinaKhvishchuk

https://github.com/GuyKensdale

https://github.com/JoshuaGoodwill

https://github.com/SarahHume

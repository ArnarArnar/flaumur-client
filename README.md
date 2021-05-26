# Flaumur.is

Client side of a passion project that lists all Icelandic news in one place.

flaumur.is is still in alpha and for now is focused on mobile use only.

### Client

Is a PWA that uses Next.js as its framework, state management is handled by Redux Toolkit, the UI is implemented with Tailwind and animations/transitions with Headless UI.

### Backend

In a private repo, I use a Node.js backend that pulls RSS feeds from over 50 Icelandic news sites, organizes, and categorizes the news and writes them to a MongoDB Atlas database. All communication to the front-end goes through a MongoDB Realm GraphQL endpoint.

#### Flaumur

An old Icelandic word, _flaumur_ has many meanings. One of its dictionary
definitions is "unstoppable discourse" (óstöðvandi orðræða).
The mission of the web service is to make icelandic news more accessible and hopefully allow people to be more informed about local news, events and politics.

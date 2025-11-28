# Mobile-App-React-Native-Firebase

## Screenshots

> [!NOTE]
> Soon

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Run](#run)
4. [Credits](#credits)
5. [Contributing](#contributing)
6. [License](#license)

## Description

> [!NOTE]
> I deleted the app in Firebase, the API key won’t be useful anymore, so don't try to do messy things 🤿!

A cross-platform application built for iOS, Android, and Web, using Firebase as its backend.
The app focuses on the healthcare sector, providing fast and intuitive access to nearby medical services.

The platform supports two types of users:

- Normal users: people searching for health professionals or facilities
- Professional users: people who can add and manage their establishment.

### Purpose

The primary goal of the app is to help users find the nearest health professional or medical facility based on a specialty or facility name.
After entering their search criteria, the app retrieves matching establishments, sorts them by distance, and displays the most relevant results.

Professional users can register their establishment by providing essential information such as:

- Name of the facility
- Country
- Town
- City
- Neighborhood
- Type (e.g., Hospital, clinic...)
- Telephone
- Specialties (e.g., Ophthalmologist, pharmacist, dentist, etc...)
- Team
- Opening Hours

As far as I’ve understood, the Firebase API key is not that secret, so I left it in the code. It seems the real protection is handled with rules. You can find my Firebase rules in [`firebaseRules.txt`](firebaseRules.txt).

### Technologies used

- **React Native** 0.81.5 – Cross-platform frontend for iOS, Android, and Web
- **Firebase** – 12.5.0 - Backend services, including authentication, database (Firestore), and hosting
- **Expo** – Simplifies development, deployment, and building for mobile platforms
- **Google Geocoding API** – Retrieves coordinates for addresses and locations

  
### Challenges and Future Features

Well, since it was my first dive into mobile apps, I didn’t know which architecture or stack to choose. So, with a little bit of research, I wanted a fast MVP to present to my customer. I had already heard about React Native, and since I had done my portfolio in React, I decided to use it instead of Flutter or C# (if I do a mobile project again, I’ll probably go with C#).

Then I needed to find a database and a backend service. I wanted a fast prototype, so I discovered Firebase, which handles authentication, hosting, and databases.

Challenges were just starting. I discovered the development process with Expo, then testing with development builds, and finally the build part. I mainly built APKs, and on the 42nd attempt, it worked. I also learned about APK signing and the difference between Firebase Web SDK and Mobile SDK. At some point, all my APKs were working fine without crashes. I still debugged with Firebase Crashlytics, which was not the most efficient way. Though I discovered Sentry, I have not set it up yet.

## Installation

You can easily run the app on your computer, you need to decide on which support you want to run:

- iOS → You need to install a simulator via Xcode.
- Android → You probably need a simulator via Android Studio.
- Web → Nothing special is needed; Expo will open a localhost in your browser

## Run

To run the program, Expo will handle most of the setup for you, as long as you have the necessary prerequisites:

The first thing to do is run: 
```bash
npm install
```

### IOS

```bash
npx expo run:ios
```
- It will transform React code into Swift. It can take some time, but in the end, it should open the iOS simulator with the app running inside it.

- You can also build an .ipa, but it seems like you will need a developer account. Maybe you can build locally and bypass this (needs testing). You can try running:

### Android

```bash
npx expo start
```
- As far as I remember, I needed to install Android Studio and configure some settings, which you can find on [Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- I built MANY APKs. You need to create an account in Expo and configure it with your keychain key (you must copy and paste them in Firebase as SHA1 and SHA256 too !). So, just run: 
```bash
eas build -p android --profile production
```

### Web

- Just run and select web. Expo will tell you which localhost to open.
```bash
npx expo start
``` 

## Credits

Thanks to [Fireship](https://www.youtube.com/watch?v=q5J5ho7YUhA&t=1307s), I learned the basics and how scary it is to set up Firebase rules correctly. In the end, I realized that Firebase is really both a backend and a database, lol.

## Contributing

To report issues, please create an issue here: [issue tracker](https://github.com/Vpekdas/Mobile-App-React-Native-Firebase/issues).

If you'd like to contribute, please follow the steps outlined in [CONTRIBUTING.md](CONTRIBUTING.md).

If you have any questions, feel free to ask them on the issue tracker!

## License

This project is licensed under the [MIT License](LICENSE).
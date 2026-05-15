<img src="klikker.png" height="100"/>

## Overview

A lightweight Capacitor-based clicker app for Android. It lets you track
anything you can count: habits, reps, inventory, you name it. Everything stays
on your device, taps trigger haptic feedback, and you can export your counts
via the native share sheet.

## Requirements

- Node.js 18+
- JDK 17+
- Android SDK & Command-line tools (ensure `ANDROID_HOME` is set)

## Setup & Build

1. Install dependencies:

     ```bash
     npm install
     ```

2. Add Android platform:

     ```bash
     npx cap add android
     ```

3. Build native icons and splash screens from the `assets/` folder:

     ```bash
     npx @capacitor/assets generate --android
     ```

4. Sync the web frontend into the native project:

     ```bash
     npx cap sync android
     ```

5. Compile the APK:

 - Open the `android/` directory in Android Studio and build from there, **or**
 - Run `npx cap build android` directly (Capacitor workflow, untested), **or**
 - You can also drop into `android/` and run `./gradlew assembleRelease`
   (standard Gradle workflow, untested).

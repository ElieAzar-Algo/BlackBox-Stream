# Firebase + WebRTC Codelab

This is the GitHub repo for the FirebaseRTC codelab. This will teach you how 
to use Firebase Cloudstore for signalling in a WebRTC video chat application.

See http://webrtc.org for details.

1.Install the Firebase Command Line Interface
The Firebase Command Line Interface (CLI) allows you to serve your web app locally and deploy your web app to Firebase Hosting.

Note: To install the CLI, you need to install npm which typically comes with Node.js.
Install the CLI by running the following npm command: sh npm -g install firebase-tools
Note: Doesn't work? You may need to run the command using sudo instead.
Verify that the CLI has been installed correctly by running the following command: sh firebase --version
Make sure the version of the Firebase CLI is v6.7.1 or later.

Authorize the Firebase CLI by running the following command: sh firebase login
You've set up the web app template to pull your app's configuration for Firebase Hosting from your app's local directory and files. But to do this, you need to associate your app with your Firebase project.

Associate your app with your Firebase project by running the following command: sh firebase use --add

When prompted, select your Project ID, then give your Firebase project an alias.

An alias is useful if you have multiple environments (production, staging, etc). However, for this codelab, let's just use the alias of default.

Follow the remaining instructions in your command line.

2. Run the local server
You're ready to actually start work on our app! Let's run the app locally!

Run the following Firebase CLI command: sh firebase serve --only hosting

Your command line should display the following response: hosting: Local server: http://localhost:5000

We're using the Firebase Hosting emulator to serve our app locally. The web app should now be available from http://localhost:5000.

Open your app at http://localhost:5000.
You should see your copy of FirebaseRTC which has been connected to your Firebase project.

The app has automatically connected to your Firebase project.
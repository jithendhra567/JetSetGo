
# JET SET GO

This is a app where you can search for flight and filter and sorted based on price, depature time, and can filter on airlines

## Screenshots

<table>
  <tr>
   <td>
   <img src="https://firebasestorage.googleapis.com/v0/b/sample-a725e.appspot.com/o/project%2Fsplash.gif?alt=media&token=eb01c665-1e22-4c49-bbe7-12edf53c6925" width="200" height="400" />
   </td>
   <td>
   <img src="https://firebasestorage.googleapis.com/v0/b/sample-a725e.appspot.com/o/project%2FScreenshot_1710792283.png?alt=media&token=a8ec9f24-70d3-4be7-9a4c-56efb564ff79" width="200" height="400" />
   </td>
   <td>
   <img src="https://firebasestorage.googleapis.com/v0/b/sample-a725e.appspot.com/o/project%2FScreenshot_1710792307.png?alt=media&token=5da429e6-94f8-4823-802b-dba4bce0d040" width="200" height="400" />
   </td>
  </tr>
  <tr>
   <td>
   <img src="https://firebasestorage.googleapis.com/v0/b/sample-a725e.appspot.com/o/project%2FScreenshot_1710792297.png?alt=media&token=96e246dc-8b31-461b-812d-d6644fad682d" width="200" height="400" />
   </td>
   <td>
   <img src="https://firebasestorage.googleapis.com/v0/b/sample-a725e.appspot.com/o/project%2FScreenshot_1710792315.png?alt=media&token=2a5ea717-e009-453e-9dab-d865e42032f5" width="200" height="400" />
   </td>
   </tr>
 </table>

libraries I used
   - react navigation
   - react toolkit (for state management & querying apis)
   - reanimated (used for animation)
   - react native datepicket
   - jest

## Testing

To test this application I used jest library
   ### unit test
   - sorting based on price
   - sorting based on price, duration

   ## component testing
   - custom tabs snapshot
   - primary button snapshot


>**Note**:To Run This Application follow below stpes

## Step up Environment

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

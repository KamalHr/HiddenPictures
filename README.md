# Hidden Pictures

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Go to [Firebase](https://console.firebase.google.com), and create a firebase project, go to Web Configuration and copy the configurations into `./src/app/app.module.ts`.

If you have a Facebook app, just grab its ID, and put it in `./src/app/auth.service.ts`

Run `npm install` to install all dependancies then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build & NodeJS backend(if needed)

Run `npm install && ng build && node hidden.js` to build & run the project with a NodeJs server. The build artifacts will be stored in the `dist/` directory. Then navigate to `http://localhost:3000`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

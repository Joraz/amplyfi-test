# Amplyfi Tech Test

### Installation
Once you've cloned the repo, install dependencies with `npm install` or `yarn`, depending on your installed package manager.

You will also require a version of MongoDB installed, and running.

### Running locally
The backend expressjs server expects data in a MongoDB database with a collection named `carData`. You can define the MongoDB connection URL with the environment variable `MONGODB_URI`. Otherwise, it will default to `mongodb://localhost:27017/amplyfi-test`.

To start the app, run the `start` command (`npm start` | `yarn start`). The frontend Angular application will be built, then the server will start on port 9090.

### The application
I have chosen to present some insights into the provided data by grouping datasets by location. The app presents a list of (max) 20 locations to choose from. These are the most-mentioned locations in the data sets.

Selecting a location will show 3 graphs. The data for this is obtained through MongoDB aggregations on the data, grouping matching keywords/sources/people based on the location provided.

The gender graph uses a library to determine whether a person is male or female based on their name. This is, of course, not a foolproof method, and so the data here should be treated accordingly.

### Testing
The Angular application comes with a suite of unit tests. These can be run locally with the command `npm test` or `yarn test`

### Hosting
The app is hosted and available on Heroku. It can be found [here](https://afternoon-badlands-19749.herokuapp.com/)
Readable API Server

This is the project for the final assessment project for Udacity's Redux course.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

Start Developing

# To launch the app:

Install and start the API server
* cd api-server
* npm install
* node server

To run the application, open another terminal and run
* npm install
* npm run start



# Infos about the application
I created different action and reducers file for handling the different components (posts, comments and categories). Additionally there exists a sort action with a corresponding reducer. For the comments and the posts I choose after a long time of experimenting not an array but a hash table. The advantage is an easier way for updating and for searching items. In the mapStateToProps function I transformed the hash table in an array to simple map through the elements.
For styling I used the react semantic ui library.
To enabling a refresh I saved the redux store to the local storage.(see localStorage.js )
For routing I used react-router. The id for the elements I retrieved in the subcomponents using the this.props.match.params property.

// BUILD YOUR SERVER HERE
const User = require('./users/model');
const express = require('express');
const server = express();



server.use( express.json() );


/*******************************************
 * 
 * Returns a specific user from the DB by ID
 * 
 *******************************************/
server.get( '/api/users/:id', ( req, res ) => {
    const { id } = req.params;

    User.findById( id )
        .then( user => {
            if( !user ){
                res.status( 404 ).json( { message: "The user with the specified ID does not exist" } )
            }else{
                res.json( user );
            }
        })
        .catch( err => res.status( 500 ).json( { message: "The user information could not be retrieved" } ) );
})

/*******************************************
 * 
 * Returns ALL users from the DB
 * 
 *******************************************/
server.get( '/api/users', ( req, res ) => {
    User.find()
    .then( users => {
        res.status( 200 ).json( users )
    })
    .catch( err => res.status( 500 ).json( { message: "The users information could not be retrieved" } ) );
})

/*******************************************
 * 
 * Creates a new user from JSON payload, adds user to the DB
 * 
 *******************************************/
server.post( '/api/users', ( req, res ) => {
    const newUser = req.body;

    if( !newUser.name || !newUser.bio ){
        res.status( 400 ).json( { message: 'Please provide name and bio for the user' } );
    }else{
        User.insert( newUser )
            .then( user => {
                res.status( 201 ).json( user );
            })
            .catch( err => res.status( 500 ).json( { message: "There was an error while saving the user to the database" } ) );
    }
})

/*******************************************
 * 
 * Updates a specific user by ID in the DB
 * 
 *******************************************/
server.put( '/api/users/:id', ( req, res ) => {
    const { id } = req.params;
    const updates = req.body

    User.update( id, updates )
        .then( user => {
            if( !updates.name || !updates.bio ){
                res.status( 400 ).json( { message: "Please provide name and bio for the user" } )
            }else{
                if( !user ){
                    res.status( 404 ).json( { message: "The user with the specified ID does not exist" } )
                }else{
                    res.status( 200 ).json( user );
                }
            }
        })
        .catch( err => res.status( 500 ).json( { message: "The user information could not be modified" } ) );
})

/*******************************************
 * 
 * Deletes a user by ID from the DB
 * 
 *******************************************/
server.delete( '/api/users/:id', ( req, res ) => {
    const { id } = req.params;

    User.remove( id )
        .then( user => {
            if( !user ){
                res.status( 404 ).json( { message: "The user with the specified ID does not exist" } );
            }else{
                res.status( 200 ).json( { message: `User Deleted.`, data: user } );
            }
        })
        .catch( err =>  res.status( 500 ).json( { message: "The user could not be removed" } ) );

})

/*******************************************
 * 
 * Return a blank statement if no URL specified. 
 * 
 *******************************************/
server.use( '*', ( req, res ) => {
    res.status( 404 ).json( { message: 'Resource not found.' } );
})

module.exports = server; // EXPORT YOUR SERVER instead of {}

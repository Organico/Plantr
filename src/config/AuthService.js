import { EventEmitter } from 'events';
import Auth0Lock from 'auth0-lock';
import { Redirect, Router } from 'react-router';
import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: window.location.origin + '/',
        responseType: 'token'
      }
    })
    console.dir(Redirect)
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.accessToken);
    // navigate to the home route

   this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
      if (error) {
        console.error('Error loading the Profile', error)
      } else {
        this.setProfile(profile);
      }
    })
  }
  _authorizationError(error){
    // Unexpected authentication error
    console.error('Authentication Error', error)
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  getProfile(){
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }


  setProfile(profile){
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
    this.emit('logged_out', 'bye');
  }
}
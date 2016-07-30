import React from 'react';
import { History } from 'react-router';
// was comment.
// const assign = Object.assign || require('object.assign');

const Organization = React.createClass({

  render() {
    return (
      <div>
      <h2 className="form-page__form-heading">Create Organization</h2>
      <form className="form">
         <div className="form__error-wrapper">
           <p className="form__error form__error--username-taken">Sorry, but this username is already taken.</p>
           <p className="form__error form__error--username-not-registered">This username does not exist.</p>
           <p className="form__error form__error--wrong-password">Wrong password.</p>
           <p className="form__error form__error--field-missing">Please fill out the entire form.</p>
           <p className="form__error form__error--failed">Something went wrong, please try again!</p>
         </div>
         <div className="form__field-wrapper">
           <input className="form__field-input" type="text" id="username" placeholder="Org Name" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
           <label className="form__field-label" htmlFor="username">Organization</label>
         </div>
         <div className="form__field-wrapper">
           <input className="form__field-input" type="text" id="username" placeholder="Admin Name" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
           <label className="form__field-label" htmlFor="username">Admin</label>
         </div>
         <div className="form__field-wrapper">
           <input className="form__field-input" id="password" type="password" placeholder="••••••••••" />
           <label className="form__field-label" htmlFor="password">Password</label>
         </div>
         <div className="form__submit-btn-wrapper">
             <button className="form__submit-btn" type="submit">SUBMIT</button>
         </div>
       </form>
       </div>
    );
  }
});

export default Organization;

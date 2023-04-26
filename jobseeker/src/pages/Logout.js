import React from 'react';
import { doSignOut } from '../firebase/functions';

function Logout() {
    return (
        <button type='button' onClick={doSignOut}>
        Sign Out
      </button>
    );
  }
  
  export default Logout;

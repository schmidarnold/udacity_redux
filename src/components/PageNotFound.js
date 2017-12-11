import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


function PageNotFound() {

    return(
      <div>
        <div> Page not found. Click on the button to return to the main page.</div>
        <Button color='orange' as={Link} to='/'>Home </Button>

      </div>
    )

}
export default PageNotFound;

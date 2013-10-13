Setting up a development environment
------------------------------------

1. Install Node.js:

        $ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
        $ nvm install 0.10.5
        $ nvm use

2. Install dependencies:

        $ sudo npm -g install grunt-cli karma bower
        $ npm install
        $ bower install

To build and view your changes
------------------------------

        $ rake build && rake serve


        [http://localhost:8000/](http://localhost:8000/)




Deployment
----------

        $ rake deploy

This deploys the front-end app to the server. You'll need to enter the SSH
password.
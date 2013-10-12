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

3. Start the build system:

        $ grunt watch


Deployment
----------

        $ rake deploy

This deploys the front-end app to the server. You'll need to enter the SSH
password.
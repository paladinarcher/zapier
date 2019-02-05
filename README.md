# zapier
## How to test zapier to aarc api functionality
1) start an aarc server locally using the fireDrum branch from the aarc repository
* https://github.com/paladinarcher/aarc.git
* If you need help starting the server search for the guide with the following title in slack:
  * "Quick start guide to get AARC backend API running locally"
2) You will need to have a deployKey saved in the ~/.zapierrc file in your home directory. 
* The deploy key can be found in slack in the --fire-drum-tech channel on Feb 5 2019 at 2:00 PM
3) run the command `npm install` in the `example` branch of the P&A zapier repo
* git clone https://github.com/paladinarcher/zapier.git && cd zapier && npm install
4) switch to the example branch
* git checkout example
5) run the command `zapier test`
* the aarc server should return a data object with the name `Developer Level API`

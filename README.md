# Zapier example application

## Setup
Install the Zapier CLI tool. This can be done globally, like this:

```
npm install -g zapier-platform-cli
```

Alternatively, if running on a Linux host, it can be installed locally if it is added as a development dependency:

```
$ npm install --save-dev zapier-platform-cli
```

Note, by default this project has already added zapier-platform-cli to its development dependencies.

If using the local copy of zapier-platform-cli, add the following to the $HOME/.bashrc, 

```
function __zapier_platform_cli {
    node ./node_modules/zapier-platform-cli $@
}
alias zapier="__zapier_platform_cli"
```

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
* the aarc server should return a data object with the name `Zapier API`

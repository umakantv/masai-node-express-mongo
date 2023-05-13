
# Deployment

## Cloud Provider

AWS, GCP, Azure, Hostinger, DigitalOcean, Heroku

24x7 - connected to internet, and accept network traffic from anywhere
It is reachable by its public IP address

http://123.12.12.12:3000/

https://facebook.com
Buy a domain, route the traffic to server IP address using DNS

## 1. Get AWS account
12 months free for a new account for limited usage
https://aws.amazon.com/free

## 2. Get a server
EC2 (Elastic Compute)
Linux (Free), Windows, Macos

* 1 GB Memory (Free), 2 GB Memory, 512 GB Memory
* 1 vCPU (Free), 2 vCPU

For paid:
1 vCPU, 1 GB Memory Linux: Cost 0.0124 USD per hour

2.0834 USD per week = ~190 Rs per week
Investment for a project - attract some employer


## 3. Setting up remote connection to this server
We should be execute commands remotely
To clone our code, install dependencies and softwares that we need

From our terminal, we can control the terminal of the server
That is done using SSH (Secure Shell)

https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui

## 4. Run our nodejs app on this server
Clone our github repository
Install Nodejs, and dependencies

We need .env file for production
We need mongodb cloud server (We are gonna use mongo cloud)

To install node:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install 16

node -v
```

## 5. Access our application
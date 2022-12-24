
# Deployment with AWS EC2

AWS - Cloud Providers
GCP, Azure, Digital Ocean, Heroku, Vercel, etc.

Platforms which provide you services like servers, Databases, API Gateway, DNS.

AWS - Free tier

AWS has multiple options for free tier.
Pay as you go

## EC2

Elastic Compute

Self hosted machines - Linux, Mac or Windows  


Virtual Machine  

SSH - to login in to this virtual machine from our device, and execute the commands  

SSH - Secure Shell Protocol

### Enable SSH client on Windows 10

`https://carleton.ca/scs/2021/enable-openssh-on-windows-10/`

### Install Nodejs on EC2 Machine

`https://dev.to/ganeshmani/how-to-install-nodejs-in-aws-ec2-in-a-proper-way-m4c`

```sh
# Download and install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash 

# Activate nmv
. ~/.nvm/nvm.sh 

# Install specific version of node with nvm
nvm install 16.15.1 

# Verify installation
node -v
```

## Prepare your server

```sh
# Head over to your server folder

# Install dependencies
npm i

# Prepare .env
touch .env # Create an empty file named .env

# List all files
ls -a

# Edit this file
nano .env

# Add all env variables
# Create a new account on MongoDB Atlas
# Host a new mongodb server
# Use the credentials in .env

# Run the server
node index.js
```

### Allow traffic on the port

EC2 -> Security -> Inbound Rules -> Edit -> Add a New Rule  

TCP on port 3066 from any IP address  

### Run nodejs app in the background

```sh
# Install pm2 
npm i pm2 -g

pm2 start index.js --name "Blog App"

pm2 save
```


### Connecting to EC2 from VS Code

* Install extension called `Remote SSH`
* Add configuration in `username/.ssh/config`
* 
```
Host pt-web-07
  HostName 15.206.172.90
  User ubuntu
  IdentityFile /Users/umakant.vashishtha/code/personal/masai/lectures/pt-web/11-PSC/pt-web-7-demo-key-pair.pem
```
Public IP Address: 13.233.109.184

Userful Links:
https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04

Run these commands on your remote machine
1. Install nginx - tool to configure incoming http traffic
```
sudo apt update
sudo apt install nginx
systemctl status nginx
```
2. Clone Code
3. Install NVM - Node Version Manager
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`
`source ~/.bashrc`
4. Install Nodejs on ec2 machine
`nvm install v14.10.0`
5. Run `npm i`
6. Setup `.env`, possibly have remote database host
7. Run node app
8. To access from outside world, we can expose PORT from AWS - security groups
9. What if our ec2 instance restarts for some reason
    We use PM2 to automatically start our node app - `npm i -g pm2`
    Add our node process in pm2 background process `pm2 start index.js -name blog-server`
    At this point our server side config is complete
10. Get Frontend ready
    * Change server url in react app
    * build for production, 
    * push it to github, 
    * pull it on remote ec2 machine
11. We need to do this only once
    Change nginx configuration
    Change root path in `/etc/nginx/sites-available/default` to `<path to your build folder>`
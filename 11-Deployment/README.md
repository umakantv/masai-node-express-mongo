

# Deployment


* Cloud Providers
  * AWS, Google Cloud, Azure, Digital Oceal, Heroku
* Options to host our code
* EC2
* How to launch EC2 instance
* Connect to EC2 machine
* Setup on EC2
* Get the project running on some remote IP

## Connecting to EC2 machine

Enable OpenSSH optional feature on windows
https://www.hawaii.edu/askus/1874#:~:text=The%20%E2%80%9COptional%20features%E2%80%9D%20menu%20lists,choose%20%E2%80%9CAdd%20a%20feature%E2%80%9D.

`ssh -v -i path_to_key_pair_file user@public_IP_Address`
`ssh -v -i /Users/umakant.vashishth/pt-web-05.pem ubuntu@3.109.121.214`

Then we should see this error
`ubuntu@3.109.121.214: Permission denied (publickey).`

Run this command to change the permission on pem file as mentioned [here](https://stackoverflow.com/questions/1454629/aws-ssh-access-permission-denied-publickey-issue)
`chmod 600 ec2-keypair.pem`

Install `Remote - SSH` extention
Add your ec2 host info in .ssh/config file

```
Host pt-web-05
  HostName 3.109.121.214
  User ubuntu
  IdentityFile ~/pt-web-05.pem

```

You should now be able to access EC2 machine through terminal using `ssh pt-web-05`.

## Set up

### Setup nodejs

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
`. ~/.nvm/nvm.sh`

`nvm install node`
`nvm install 16.15.1`

### Running our app on some avaiable port

`npm insatll`
Update `.env`
`node app.js


### Expose the port from security groups for EC2 machine on AWS console


### UI 
You can build you react app, copy your static files into the `static` folder, then all `/` requests will be resolved with client files.

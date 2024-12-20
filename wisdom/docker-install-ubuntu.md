## Docker Installation On Ubuntu
Here are the steps to set up Docker on Ubuntu, including how to automatically mount an attached volume after a reboot using the UUID for mounting:

## Step 1: Install Docker
Update your package index:


`sudo apt-get update`
Install packages to allow apt to use a repository over HTTPS:

`sudo apt-get install apt-transport-https ca-certificates curl software-properties-common`
Add Docker’s official GPG key:


`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - `
Set up the stable repository:


`sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`
Update the package index again:

`sudo apt-get update`
Install the latest version of Docker CE:


`sudo apt-get install docker-ce`

## Step 2: Start and Automate Docker
Start Docker:


`sudo systemctl start docker`
Enable Docker to start on boot:


`sudo systemctl enable docker`

## Step 3: Change Docker Image Installation Directory (Optional)
Stop Docker:


`sudo systemctl stop docker`
Create a new directory for Docker images:


`sudo mkdir /docker` if this doesn't exist or if not mounted follow necessary steps to mount the EBS volume correctly. 


Edit the docker daemon json file located at /etc/docker/daemon.json. This file exists by default but if it doesn’t create it. Your new file should look something like this:

```
{
  "data-root": "/docker"
}
```
If this is not the directory you want, Please change `/docker` accordingly.

Stop docker by:

`sudo systemctl stop docker`
Verify docker has been stopped:

`ps aux | grep -i docker | grep -v grep`
Copy the files to your new docker directory.

`sudo rsync -axPS /var/lib/docker/ /path/to/new/docker-data`
This can take long depending on the amount of data you have.

Bring docker back up

`sudo systemctl start docker`
Verify docker is up and is using the new configured location

`sudo docker info | grep 'Docker Root Dir`

These steps will set up Docker on your Ubuntu system and optionally change the directory where Docker images are stored.

## Step 4: Post-Installation Steps
To create the docker group and add your user:

Create the docker group.
 `sudo groupadd docker`

Add your user to the docker group.
`sudo usermod -aG docker $USER`

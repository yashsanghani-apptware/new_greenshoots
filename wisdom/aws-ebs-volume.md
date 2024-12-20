# Setting up EBS Volume on EC2 Instance
## Step 1: Attach the EBS Volume to Your EC2 Instance
First, you need to attach the EBS volume to your Amazon EC2 instance.

- Log in to the AWS Management Console.
- Navigate to the EC2 Dashboard and select “Volumes” under “Elastic Block Store” in the navigation pane.
- Create a new volume or use an existing one by selecting it and clicking “Actions.”
- Click “Attach Volume.”
- Select the instance to which you want to attach the volume and specify the device name (e.g., /dev/sdf).
- Click “Attach.”

## Step 2: Log In to Your EC2 Instance
Log into your Linux instance using SSH:

`ssh -i /path/to/your-key.pem ec2-user@your-instance-ip`

## Step 3: Verify the Volume is Attached
Once logged in, check that the EBS volume is attached successfully by listing the available disk devices:

`lsblk`
You should see the new device listed (e.g., xvdf if it's an NVMe instance, it might appear as nvme1n1).

## Step 4: Check for Existing File Systems
Before creating a new file system, ensure there isn’t already a file system present on the EBS volume:


`sudo file -s /dev/nvme1n1`
If the output is simply data (e.g., /dev/xvdf: data), then there is no file system, and you can proceed.

## Step 5: Create a File System
Now, create a file system on the EBS volume. You can use ext4 as it is widely supported:

`sudo mkfs -t ext4 /dev/nvme1n1`

## Step 6: Create a Mount Point
Create a directory to serve as the mount point for the new file system:


`sudo mkdir /docker`  We are using `/docker` as an example and also to be used in our next step of Docker installtion

## Step 7: Backup fstab File
Before editing /etc/fstab, create a backup:


`sudo cp /etc/fstab /etc/fstab.orig`

## Step 8: Obtain the UUID of the EBS Volume
Use blkid to find the UUID of the new volume:


`sudo blkid`
Note the UUID for /dev/nvme1n1, for example, `aebf131c-6957-451e-8d34-ec978d9581ae`.

## Step 9: Edit fstab to Auto-mount the Volume

Edit `/etc/fstab` using a text editor:


`sudo vim /etc/fstab`
Add this line to auto-mount using UUID (replace with your UUID and preferences):

`UUID=aebf131c-6957-451e-8d34-ec978d9581ae    /docker   ext4    defaults,nofail   0   2`

## Step 10: Mount the Volume
Mount all entries from fstab:

`sudo mount -a`
This will mount the volume based on the updated fstab entry.

## Step 11: Verify Mounting
Check the mounted file system's availability:


`df -h /docker`

By following these steps, the EBS volume will be properly set up with a new file system and will automatically mount on every reboot, using its UUID for reliable identification. This method ensures that the volume remains accessible even if device names change due to system changes or hardware configurations.







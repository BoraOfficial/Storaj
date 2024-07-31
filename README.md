# Storaj
Swiss based private storage on LAN

---

This is the most private way to store your data.

Why? Well, simply because you own your data! Basically, you are hosting your own Google Drive or Dropbox.<br>

---
# Setup

Storaj is made to be user-friendly. So it's very easy to set it up.<br>
Here are the steps:

## Step 1.) Download Storaj
Downloading Storaj is easy. Click on the green Code button to download.
## Step 2.) Download Python
In order for Storaj to work, you need <a href="https://www.python.org/downloads/">Python</a>.<br>
Download the latest version for the platform of your choice.
## Step 3.) Run Storaj
Storaj needs a server to work, and for that reason, you need to host your own server. You can either use your own computer, buy a <a href="https://www.raspberrypi.com/">Raspberry Pi</a> or use a hosting service. For our purpose, we will use our own computer but it's highly recommended to combine a <a href="https://www.raspberrypi.com/">Raspberry Pi</a> to have a dedicated 24/7 private storage on LAN.

Enough talk, so in order to run Storaj you will need to open up your terminal and type this:
```
python server.py
```
It'll ask you to choose a password. After that, you should be up and running!

---
# Usage 

OK, now you have set up your server, now what? Well, open up the browser of your choice and navigate to ```http://127.0.0.1:5000```. There it is! You should be shown an authentication page, something like such:

![Authentication Page](https://github.com/BoraOfficial/Storaj/blob/bd2a85c44f8585e58f2dd5775cee963e031a0df9/img/Screenshot-Github-Storaj-1.png)

Enter the password you've chosen. You should be shown the dashboard, something like such:
<br>
![Dashboard](https://github.com/BoraOfficial/Storaj/blob/bd2a85c44f8585e58f2dd5775cee963e031a0df9/img/Screenshot-Github-Storaj-2.png)
<br>
The rest is for you to discover. Good luck!

---
# Heads up!

This software is intended to be used only in the LAN. Therefore, the authentication system & other protections are lowered for ease of access. It is highly adviced against to NOT serve this software outside of your network.

---

Copyright © 2023 BoraOfficial. This material is intended solely for personal use.

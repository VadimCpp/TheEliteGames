
Setting up working environment:

1. Add string to the host file: "127.0.0.1 theelitegames.lc"

2. Update virtual hosts and restart apache:

<VirtualHost *:80>
    ServerName theelitegames.lc
	DocumentRoot "~/Sites/theelitegames.lc/dist"
	<Directory "~/Sites/theelitegames.lc/dist">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
	</Directory>
</VirtualHost>

3. Install new gulp project locally:

> npm install --save-dev gulp

4. Install gulp-clean

> npm install --save-dev gulp-clean

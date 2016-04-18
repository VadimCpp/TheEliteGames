
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


5. Go to ./src/js/ folder and clone GoogleClosure:
> git clone https://github.com/google/closure-library


6. Download http://dl.google.com/closure-compiler/compiler-latest.zip and copy compiler.jar
   to closure-library/closure/bin/build/


7. Install gulp-closure-compiler
> npm install --save-dev gulp-closure-compiler


8. Install run-sequence
> npm install --save-dev run-sequence


9. Install gulp-sass
> npm install --save-dev gulp-sass


10. Install del
> npm install --save-dev del


11. Install gulp-cssmin
> npm install --save-dev gulp-cssmin


12. Install imagemin-pngquant
npm install --save-dev imagemin-pngquant


13. Install gulp-imagemin
npm install --save-dev gulp-imagemin

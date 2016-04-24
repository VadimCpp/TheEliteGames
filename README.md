# The Elite Games Website
<a href="http://opensource.org/licenses/MIT"><img src="https://camo.githubusercontent.com/576f25c78e59902f0c6ccfff81f0448ef660e90d/687474703a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d626c75652e737667" alt="License" data-canonical-src="http://img.shields.io/badge/License-MIT-blue.svg" style="max-width:100%;"></a>
<br><br>
![](https://raw.githubusercontent.com/VadimCpp/theelitegames.lc/master/src/img/theEliteGames.jpg)
# Getting Started
To set up working environment open install.txt and follow the instructions.
# Website link:
Official : [theelitegames.net](http://theelitegames.net) <br>
Test : [elitegames.biletvit.ru](http://elitegames.biletvit.ru)
# data.json
[data.json](https://github.com/VadimCpp/TheEliteGames/blob/master/src/data/data.json) file has following format:
<pre>
&ltdata&gt ::= &ltgames&gt &ltstores&gt
&ltgames&gt ::= [ &ltgame&gt ]
&ltgame&gt ::= &ltname&gt &lttype&gt &ltdescription&gt &lticon&gt &ltname&gt (&ltgameplayImage&gt) (&ltyoutube&gt) &ltlinks&gt
&ltlinks&gt ::= [&ltlink&gt]
&ltlink&gt :: &ltstore&gt &lturl&gt
&ltstores&gt ::= [ &ltstore&gt ]
&ltstore&gt ::= &ltname&gt &lticon&gt

[] - 1+ occurence
() - 0 or 1 occurence
</pre>

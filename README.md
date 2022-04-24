# fivestars
星星评分机制<br>
<img src="http://www.wware.org/img/170704_4.jpg?_9ece" width="400px"><br>
普通属性<br>
data-readonly	是否只读	data-readonly：true;为真时，只能看，不能评分<br>
data-path	自定义星星图片时,图片路径，一般为不填即可	data-path:img;自定义时，需要将图片放到根目录下的static下img文件夹中<br>
data-starOn	自定义星星图片名称	data-starOn：1.png ，使用自定义星星分数图片 1.png，一般为不填即可;<br>
data-starOff	自定义星星图片名称	data-starOff：2.png ，使用自定义星星未打分星星图片 2.png，一般为不填即可;<br>
控制属性<br>
data--number	控制星星的总数	data--number：10;共10颗可打分的星<br>
data--score	控制初始打几颗星	data--score：4;给4颗星的分数<br>
输出属性<br>
data-x-score	输出此次打分星数	data-x-score：5;此次打了5星评分<br>

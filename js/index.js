
(function(){
	/*header部分 start*/
	(function(){
		var $header = $("#header"),
			$nav = $("#nav"),
			$mNavLi =$nav.find(".mNav a"),
			$showHide = $nav.find(".showHide"),
			$ulHide = $nav.find(".ulHide"),
        	$hide = $ulHide.find(".hide"),
        	$leftPrat = $nav.find(".leftPart"),
			$changeBtn = $header.find(".changeBtn"),
        	$logo = $header.find(".logo");



        $(window).scroll(function(){
        	if($(document).scrollTop()){
        		$nav.addClass("scroll");
        		$leftPrat.show();
        		$logo.stop().delay(1000).addClass("hide");
        	}else{
        		$nav.removeClass("scroll");
        		$leftPrat.hide();
        		$logo.stop().delay(1000).removeClass("hide");
        	}
        });

		$mNavLi.hover(function(){
			$(this).toggleClass("hover");
		});

		$showHide.hover(function(){
			var i = $(this).index(".showHide");
			$ulHide.stop().slideDown().addClass("show");
			$hide.eq(i).stop().addClass("show");
        	$nav.addClass("hover");
		},function(){
			var i = $(this).index(".showHide");
			$ulHide.stop().slideUp().removeClass("show");
			$hide.eq(i).stop().removeClass("show");
         	$nav.removeClass("hover");
		});

		$hide.hover(function(){
   			$ulHide.stop().addClass("show");
			$(this).stop().addClass("show");
         	$nav.addClass("hover");
		},function(){
			$ulHide.stop().slideUp().removeClass("show");
			$(this).stop().removeClass("show");
         	$nav.removeClass("hover");
		});

		(function(){
			var $roleP1 = $header.find(".roleP1"),
				$roleP2 = $header.find(".roleP2"),
				$role1 = $header.find(".role1"),
				$role2 = $header.find(".role2"),
				$role3 = $header.find(".role3"),
				$role4 = $header.find(".role4"),
				changeSwich = true;

			/*交换位置*/
			function change(){
				if(changeSwich){
					$role3.stop().removeClass("show");
					$role4.stop().removeClass("show");
					$role1.stop().delay(1300).addClass("show");
					$role2.stop().delay(1300).addClass("show");
					changeSwich = false;
				}else{
					$role1.stop().removeClass("show");
					$role2.stop().removeClass("show");
					$role3.stop().delay(1300).addClass("show");
					$role4.stop().delay(1300).addClass("show");
					changeSwich = true;
				}
			}

			change();
			$changeBtn.click(function(){
				change();
			});
			/*出现动画*/
			setTimeout(function(){
				$changeBtn.stop().addClass("show");
			},1000);
			setTimeout(function(){
				$logo.stop().delay(1000).addClass("show");
			},1500);
			// $changeBtn.stop().delay(1000).addClass("show");
        	// $logo.stop().delay(1000).addClass("show");


		})();

		/*青蛙弹窗*/
		(function(){
			var $service = $header.find(".service"),
				$close = $header.find(".close"),
				$bunny = $header.find(".bunny");

			$bunny.click(function(){
				$service.stop().addClass("show");
			});
			$close.click(function(){
				$service.stop().removeClass("show");
			});
		})();
	})();
	/*header部分 end*/

	/*右边slide部分 start*/
	(function () {
	    var $slide = $("#slide"),
	        $download = $slide.find(".download"),
	        $shrink = $download.find(".shrink"),
	        $close = $download.find(".close"),
	        $downloadMain = $download.find(".downloadMain"),
	        $mainLi = $slide.find(".main .mainLi");

	    $shrink.click(function () {
	        $download.addClass("stretch");
	        $(this).hide();
	        $downloadMain.show();
	    });
	    $close.click(function () {
	        $download.removeClass("stretch");
	        $(this).stop().delay(200).queue(function () {
	            $downloadMain.hide();
	            $shrink.show();
	        })
	    });
	    $mainLi.hover(function () {
	        $(this).stop().addClass("pos");
	    },function () {
	        $(this).stop().delay(500).queue(function () {
	            $(this).removeClass("pos");
	        });
	    });
	})();
	/*右边slide部分 end*/

	/*banner部分 start*/
	(function () {

		/*面向对象写法*/
		function Banner1 ($picUl, $picLi, $dotLi){
			this.$picUl = $picUl,
			this.$picLi = $picLi,
			this.$dotLi = $dotLi,
			this.index = 0;
			this.timer = null;
			this.timeOut = null,
			this.length = this.$dotLi.length,
			this.width  = this.$picLi.width();
		}
		Banner1.prototype = {
			exe: function(){
				this.addEvent()
			},
			addEvent: function(){
				var This = this;
				this.$dotLi.mouseenter(function(){
					var $This = $(this);
					clearInterval(This.timeOut);
					This.timeOut = setTimeout(function(){
						This.index =This.$dotLi.index($This);
						$This.addClass("on").siblings().removeClass("on");
						This.$picUl.stop().animate({left: -This.width*This.index},300);
					},200);
				});
			}
		}

		/*继承*/
		function Banner2 ($picUl, $picLi, $dotLi ,$wrap){
			Banner1.call(this, $picUl, $picLi, $dotLi);
			this.$wrap = $wrap;
		}
		function Fn (){}
		Fn.prototype = Banner1.prototype;
		Banner2.prototype = new Fn();
		Banner2.prototype.temp = Banner1.prototype.exe;
		Banner2.prototype.exe = function(){
			this.temp();
			this.autorun();
			this.clearTimer();
		}
		Banner2.prototype.clearTimer = function(){
			var This= this;
			this.$wrap.hover(function(){
				clearInterval(This.timer);
			},function(){This.autorun()});
		}
		Banner2.prototype.autorun = function(){
			var This= this;
			this.timer = setInterval(function(){
				This.index ++;
				This.index %=This.length;
				This.$dotLi.eq(This.index).addClass("on").siblings().removeClass("on");
				This.$picUl.stop().animate({left: -This.width*This.index},300);
			},3000)
		}
		window.Banner1 = Banner1;
		window.Banner2 = Banner2;

		/*var $news = $("#news"),
			$banner = $news.find(".banner"),
			$picUl = $news.find(".pic"),
			$picli = $picUl.find("li"),
			$dotLi = $news.find(".dot li"),
			index = 0;
			timer = null,
			timeOut = null,
			length = $dotLi.length,
			width  = $picli.width();

		$dotLi.mouseenter(function(){
			var $This = $(this);
			clearInterval(timeOut);
			timeOut = setTimeout(function(){
				index =$This.index();
				$This.addClass("on").siblings().removeClass("on");
				$picUl.stop().animate({left: -width*index},300);
			},200);
		});
		$banner.hover(function(){
			clearInterval(timer);
		},autorun);
		autorun();
		function autorun(){
			timer = setInterval(function(){
				index ++;
				index %=length;
				$dotLi.eq(index).addClass("on").siblings().removeClass("on");
				$picUl.stop().animate({left: -width*index},300);
			},2000)
		}*/
	})(); 
	/*banner部分 end*/
	/*news部分 start*/
	// 左边图片banner
	(function () {
		var $news = $("#news"),
			$banner = $news.find(".banner"),
			$picUl = $news.find(".pic"),
			$picLi = $picUl.find("li"),
			$dotLi = $news.find(".dot li");
		var bannPic = new Banner2 ($picUl, $picLi, $dotLi, $banner);
		bannPic.exe();
	})(); 

	// 中间新闻banner
	(function () {
		var $news = $("#news"),
			$newsInform = $news.find(".newsInform"),
			$navLi = $news.find(".nav li"),
			$navList = $news.find(".navList"),
			$navListLi = $news.find(".navList>li"),
			bannWord = new Banner1 ($navList, $navListLi, $navLi);//创建banner实例

		bannWord.exe();
		$navListLi.each(function(index){
			var $ul = $("<ul class='list'></ul>");
			for (var i = 0, length = newsData.length; i < length; i++) {
				if(!index||newsData[i].typeX===(index-1)){
					$ul.append('<li><a href="">'+newsData[i].title+'</a><span>'+newsData[i].time+'</span></li>')
				}
			}
			$(this).append($ul);
		});
	})(); 

	/*news部分 end*/
	/*shishen部分 start*/
    (function () {
    	// ------vue---------------------------------------------------------
    	Vue.component('characterPart1',{
    		template:`
				<li class="mLi shishenList">
                    <div class="shishenTab">
                        <ul>
                            <li class="clickBtn" :class="{on:index===clickIndex}" v-on:click="toLink(index)" v-for="(item, index) in nameList">{{item}}</li>
                            <li class="allBtn"><a href="javascript:void(0)"><img src="img/index/viewAll_btn_18af8fe.png" alt=""></a></li>
                        </ul>
                    </div>
    				<character v-bind="{level:level}" ></character>	
                </li>
    		`,
    		data: function(){
    			return {
    				shishenData,
    				level:"",
    				clickIndex:0,
    				nameList:[
	    				'全部','SSR','SR','R','N'
					]};
    		},
    		methods:{
    			toLink:function(i){
    				this.level= this.nameList[i]=="全部"?"":this.nameList[i];
    				this.clickIndex= i;  //点击后对应的li的class变为on
    			}
    			/*toALL:function(){
    				this.level= "";
    				this.isOn= true;
    			},
    			toSSR:function(){
    				this.level= "SSR";
    				this.isOn= true;
    			},
    			toSR:function(){
    				this.level= "SR";
    				this.isOn= true;
    			},
    			toR:function(){
    				this.level= "R";
    				this.isOn= true;
    			},
    			toN:function(){
    				this.level= "N";
    				this.isOn= true;
    			}*/
    		}
    	})

    	Vue.component('character',{
    		props:['shishenData','level'],
    		data: function(){
    			return { 
    				sData: shishenData.sData,
    				index: 0,
    				length: 1,
    				isLHide: true,
    				isRHide: false,
    				isHide: false
    			}
    		},
    		computed:{
    			filterSdata: function(){
    				if(!this.level){
    					return this.sData.filter(function(item){
							return item;
	    				})
					}
    				if(this.level==="SSR"){
    					return this.sData.filter(function(item){
							return (item.level=="SSR");
	    				})
					}
    				if(this.level==="SR"){
    					return this.sData.filter(function(item){
							return (item.level=="SR");
	    				})
					}
    				if(this.level==="R"){
    					return this.sData.filter(function(item){
							return (item.level=="R");
	    				})
					}
    				if(this.level==="N"){
    					return this.sData.filter(function(item){
							return (item.level=="N");
	    				})
					}
    			}
    		},
    		template: `
				<div class="mainList">
                    <div class="mUl" :class="level">
                        <div class="characterList">
                        	<ul class="top">
								<li class="ssList" v-for="(list,index) in filterSdata" v-if="((!level)||(level==list.level))&&!(index%2)">
	                                 <div class="shishen">
	                                     <img :src="'img/index/'+list.id+'.png'" alt="">
	                                     <p class="cover"><span>{{list.name}}</span></p>
	                                     <i :class="{new:list.isNew}"></i>
	                                 </div>
	                             </li>
                        	</ul>
                            <ul class="bottom">
								<li class="ssList" v-for="(list,index) in filterSdata" v-if="index%2">
	                                 <div class="shishen">
	                                     <img :src="'img/index/'+list.id+'.png'" alt="">
	                                     <p class="cover"><span>{{list.name}}</span></p>
	                                     <i :class="{new:list.isNew}"></i>
	                                 </div>
	                             </li>
                        	</ul>
                        </div>
                        <p class="btn left" :class="{hide:isLHide||isHide}" @click="btnLeft"></p>
                        <p class="btn right" :class="{hide:isRHide||isHide}" @click="btnRight"></p>
                    </div>
                </div>
    		`,
    		updated:function(){
    			this.length =  Math.ceil($("#character .top>li").length / 6);
    			this.isHide= this.length===1?true:false;  //当内容页就一页时，隐藏左右切换箭头按钮
    		},
    		watch:{
    			level:function(curval,oldval){   //监听level，切换选项卡时，重置属性
    				if(curval!==oldval){       
    					this.index= 0;
	    				this.isLHide= true,
	    				this.isRHide= false,
    					$("#character .characterList").css("left","0");
    				}
    				
    			}
    		},
    		methods:{
    			btnRight: function(){
    				var oneWidth = $("#character .mUl").width();
    				this.length =  Math.ceil($("#character .top>li").length / 6);
    				this.index++;
    				if(this.index===this.length-1){
    					this.isRHide=true;
    					this.index = this.length-1;
					}
    				$("#character .characterList").stop().animate({
    					left:-oneWidth*this.index
    				},500);
    				this.isLHide = false;
    			},
    			btnLeft: function(){
    				var oneWidth = $("#character .mUl").width();
    				this.index--;
    				if(this.index===0){
    					this.index=0;
    					this.isLHide=true;
					}
    				$("#character .characterList").stop().animate({
    					left:-oneWidth*this.index
    				},500);
    				this.isRHide = false;
    			}
    		}
    	});

    	Vue.component('characterPart2',{
    		template:`
				<li class="mLi zhujueList">
                    <div class="tab">
                        <ul>
                            <li :class="{active:zhujueIndex===index}" v-for="(item, index) in zhujueData" @click="showZhujue(index)">{{item.name}}<i></i></li>
                        </ul>
                    </div>
                    <div class="pic">
                        <ul>
                            <li v-for="(item, index) in zhujueData" v-show="zhujueIndex===index">
                                <div class="img"><img :src="item.src" alt=""></div>
                                <div class="dec">
                                    <p class="index" :class="'indexX'+index"></p>
                                    <p class="name">{{item.name}}</p>
                                    <p class="info" v-html="item.content"></p>
                                </div>
                                <span class="toDetail"></span>
                            </li>
                        </ul>
                    </div>
                </li>
    		`,
    		data: function(){
    			return {
    				zhujueData: zhujueData.data,
    				zhujueIndex: 0
    			}
    		},
    		methods:{
    			showZhujue: function(i){
    				this.zhujueIndex = i;
    			}
    		}
    	});

    	var chara = new Vue({
    		el: "#character",
    		data:{
    			isTab1:true,
    			isTab2:false
    		},
    		methods:{
    			changeTab: function(i){
    				if(!i){    //点击式神
    					this.isTab1=true;
    					this.isTab2=false;
    				}else{     //点击主角
    					this.isTab2=true;
    					this.isTab1=false;
    				};
    			}
    		}
    	})
    	// ------vue------------------------------------
    })(); 
	/*shishen部分 end*/

	/*攻略部分start*/
	(function(){
		var $strategy = $("#strategy");
		//左边banner
		(function(){
			var $banner = $strategy.find(".leftPart .banner"),
				$picUl = $strategy.find(".leftPart .pic>ul"),
				$picLi = $strategy.find(".leftPart .pic>ul>li"),
				$dotLi = $strategy.find(".leftPart .tab>ul>li"),
				banner3 = new Banner2($picUl, $picLi, $dotLi, $banner);
			banner3.exe();
		})();

		// 右边攻略banner数据导入------vue------------------------------------
		(function(){
			Vue.component('strategyList',{
				template:`
					<div class="show">
						<ul>
	                        <li v-for="(item ,index) in strateData">
	                            <a href="javascript:void(0)">
	                                <i></i>
	                                <p class="mTitle">【<span class="type">{{typeArr2[item.type.charAt(item.type.length-1)]}}</span>】&nbsp;{{item.title}}</p>
	                                <p class="author">作者：<span>{{item.author}}</span></p>
	                            </a>
	                        </li>
	                    </ul>
	                    <ul v-for="(type,n) in typeArr1">
	                        <li v-for="(item ,index) in strateData" v-if="new RegExp(n).test(item.type)">
	                            <a href="javascript:void(0)">
	                                <i></i>
	                                <p class="mTitle">【<span class="type">{{type}}</span>】&nbsp;{{item.title}}</p>
	                                <p class="author">作者：<span>{{item.author}}</span></p>
	                            </a>
	                        </li>
	                    </ul>
	                </div>
				`,
				data: function (){
					return {
						strateData: strateData.data,
						typeArr1 : ["新手" , "式神" , "斗技" , "玩法" ],
						typeArr2 : ["新手" , "式神" , "斗技" , "玩法" , "高阶" , "御魂"]
					}
				}/*,
				computed:{
					das:function(item,n){
						var re=new RegExp(n-1);
						return re.test(item.type);
					}
				}*/
			})
			var strate = new Vue({
				el: "#strategy .rightPart .mContent"
			});
			// -----vue---------------------------------------------------------------
		})();

		// 右边轮播效果
		(function(){
			var $wordUl = $strategy.find(".rightPart .show"),
				$wordLi = $strategy.find(".rightPart .show>ul"),
				$dotTabLi = $strategy.find(".rightPart .tab"),
				banner4 = new Banner1($wordUl, $wordLi, $dotTabLi);
			banner4.exe();
		})();
	})();
	/*攻略部分end*/

	/*同人专区 start*/
	(function(){
		// banner数据导入------vue------------------------------------
		Vue.component('fanList',{
			template:`
				<div class="show">
	            	<ul v-for="n in 6">
	            		<li v-for="(item,index) in fanData" v-if="item.type===n-1">
		                    <div class="pic">
		                        <img :src="item.url" alt="">
		                        <span><b></b></span>
		                    </div>
		                    <p class="sTitle">{{item.title}}</p>
		                </li>
	            	</ul>
	            </div>
			`,
			data: function (){
				return {
					fanData: fanData.data,
					typeArr3 : ["新手" , "式神" , "斗技" , "玩法" , "高阶" , "御魂"]
				}
			}
		})
		var fanLi = new Vue({
			el: "#fan .mFan"
		});
		// -----vue---------------------------------------------------------------
		// 轮播效果
		(function(){
			var $fan = $("#fan"),
				$wordUl = $fan.find(".show"),
				$wordLi = $fan.find(".show>ul"),
				$dotTabLi = $fan.find(".tab ul>li"),
				banner5 = new Banner1($wordUl, $wordLi, $dotTabLi);
			banner5.exe();
		})();
	})();
	/*同人专区 end*/

	/*<!-- 活动专区 start -->*/
	(function(){
		var activity = new Vue({
			el:"#activity",
			data:{
				activityData:activityData.data
			}
		});
	})();
	/*<!-- 活动专区 end -->*/
	//返回顶部
	(function(){
	    var $goTop = $(".gotop");
	    $goTop.click(function () {
	        //$(document).scrollTop(0);
	        $("body,html").animate({
	            scrollTop : 0
	        },300);
    });
})();
})();
window.onload = function () {
    $(document).scrollTop(0);
};

(function(){
	var $wrap = $("#wrap"),
		$swp1 = $("#logo"),
		$swp = $wrap.find(".swp"),
		$video = $("#video-pop"),
		$videoBtn = $wrap.find(".videoBtn img"),
		$close = $(".close"),
		$newInfo=$("#newInfo"),
		$personPop=$("#person-pop"),
		$game = $("#game");

	/*首屏滑动显示*/
	(function(){
		$swp.eq(1).animate({
			opacity:1,
			top:70
		},1000);

		$swp.eq(3).animate({
			opacity:1,
			top:615
		},1000);

		setTimeout(function(){
			$swp.eq(0).animate({
				opacity:1,
				left:0
			},1500);

			$swp.eq(2).animate({
				opacity:1,
				right:0
			},1500);
		},1000);
	})();

	/*视频弹窗*/
	(function(){
		$videoBtn.click(function(){
			$video.show();
			$(document.body).addClass("noScroll");
		});

		$close.click(function(){
			$personPop.find(".person-info-bg li").hide();
			$personPop.find(".person-info-box li").hide();
			$personPop.hide();
			$video.hide();
			$(document.body).removeClass("noScroll");
		});
	})();	

	/*新版本情报弹窗*/
	(function(){
		var $perBox=$personPop.find(".person-info-box li");

		$perBox.css("opacity",0);
		// 自定义滚动条
		(function(){
			var viewH = $personPop.find(".viewTxt").height();
			$perBox.each(function(){
				var $barBox = $(this).find(".person-rollbarBox"),
					$bar = $(this).find(".person-rollbar"),
					$txt = $(this).find(".txt"),
					txtH = $txt.height(),
					barH = viewH*viewH/txtH,
					topMin = 0,
					topMax = viewH-barH;
				$bar.height(barH);

				// 点击滚动条拖动
				$bar.mousedown(function(e){
					var sTop = $(this).position().top,
						sY = e.clientY,
						$This = $(this);

					$(document).mousemove(function(e){
						var cY = e.clientY,
							cTop = sTop+cY-sY;
						cTop = Math.min(cTop, topMax);
						cTop = Math.max(topMin, cTop);
						$This.css("top", cTop);
						$txt.css("top", -cTop*txtH/viewH);
					}).mouseup(function(){
						$(this).off('mousemove').off('mouseup');
					});
					return false;
				});

				//滚轮滚动
				$(this).mousewheel(function (e,d){
					var cTop = $bar.position().top;
					if(d<0){
						cTop+=10;//滚动条下移
					}
					if(d>0){
						cTop-= 10; //滚动条上移
					}
					cTop = Math.min(cTop, topMax);
					cTop = Math.max(topMin, cTop);
					$bar.css("top", cTop);
					$txt.css("top", -cTop*txtH/viewH);
					return false;
				});

				//点击滚动条动画
				$barBox.click(function(e){
					if(e.target === this){
						var y = e.clientY- ($(this).offset().top- $(document).scrollTop()),
							cTop = $bar.position().top;
						cTop = y<cTop?cTop-100:cTop+100;
						cTop = Math.min(cTop, topMax);
						cTop = Math.max(topMin, cTop);
						$bar.stop().animate({"top": cTop},500);
						$txt.stop().animate({"top": -cTop*txtH/viewH},500);

					}
				});
			});
		})();
		
		$personPop.hide().css("opacity",1);; //加载完自定义滚动条后再隐藏人物弹窗
		$perBox.hide().css("opacity",1);

		// 点击人物弹窗
		$newInfo.find(".newInfo-list li").click(function(){
			var xx = $(this).index();

			$personPop.show();
			$perBox.eq(xx).show();
			$(document.body).addClass("noScroll");

			$close.click(function(){
				$perBox.eq(xx).hide();
				$personPop.hide();
				$video.hide();
				$(document.body).removeClass("noScroll");
			});

			//按钮切换
			$personPop.find(".l-btn").click(function (){
				$perBox.eq(xx).hide();
				xx-- ; 
				xx=xx<0?5:xx;
				$perBox.eq(xx).show();
			});
			$personPop.find(".r-btn").click(function (){
				$perBox.eq(xx).hide();
				xx++ ; 
				xx=xx>5?0:xx;
				$perBox.eq(xx).show();
			});

		});
	})();
	
	/*游戏特色*/
	(function(){
		var $picLi = $game.find(".pic ul li"),
			index = 0,
			length = $picLi.length;

		// 点击图片
		$picLi.click(function(){
			if($(this).index()!==index){
				index = $(this).index();
				var lIndex = index-1,
				    rIndex = index+1;
				if(lIndex<0)lIndex = length-1;
				if(rIndex>=length)rIndex = 0;
				$picLi.removeClass("left mid right");
				$picLi.eq(lIndex).addClass("left");
				$picLi.eq(index).addClass("mid");
				$picLi.eq(rIndex).addClass("right");
			}
		});

		// 点击左按钮
		$game.find(".l-btn").click(function(){
			index--;
			if(index<0)index = length-1;
			var lIndex = index-1,
			    rIndex = index+1;
			if(lIndex<0)lIndex = length-1;
			if(rIndex>=length)rIndex = 0;
			$picLi.removeClass("left mid right");
			$picLi.eq(lIndex).addClass("left");
			$picLi.eq(index).addClass("mid");
			$picLi.eq(rIndex).addClass("right");
		});

		// 点击右按钮
		$game.find(".r-btn").click(function(){
			index++;
			if(index>=length)index = 0;
			var lIndex = index-1,
			    rIndex = index+1;
			if(lIndex<0)lIndex = length-1;
			if(rIndex>=length)rIndex = 0;
			$picLi.removeClass("left mid right");
			$picLi.eq(lIndex).addClass("left");
			$picLi.eq(index).addClass("mid");
			$picLi.eq(rIndex).addClass("right");
		});


	})();
	
	/*新版本情报和游戏特色延迟显示*/
	(function(){
		var $title = $(".title"),
			$newInfoList = $newInfo.find(".newInfo-list li"),
			$gameBox = $game.find(".game-box"),
			$footer = $("#footer"),
			objArr = [];

		init($title, $newInfoList, $gameBox, $footer);
		function init(){
			for (var i = 0, length = arguments.length ; i < length; i++) {
				arguments[i].each(function(){
					this.showTop = $(this).offset().top;
					objArr.push(this);
				});
			}
		}
		
		$(window).scroll(function(){
			var height = $(document).scrollTop()+$(window).height(),
				length = objArr.length;
				
			for (var i =length-1; i >=0; i--) {
				var obj = objArr[i];
				if(height>=obj.showTop){
					(function(){
						var $This = $(obj);
						setTimeout(function(){   //setTimeout的定义域为window，需要构成闭包
							$This.removeClass("hide");
						},($This.index()%3)*200);
						objArr.slice(i,1);   //每次滚动，把已经显示了的元素移出
					})();
					
				}
			}
			
		});
	})();

	/*下部信息*/
	(function(){    //分享更多 
		var $more = $(".more"),
			$moreBox = $more.find(".more-box");
		$more.hover(function(){
			$moreBox.show();
		},function(){
			setTimeout(function(){
				$moreBox.hide();
			},1000);
		})
	})();
})();
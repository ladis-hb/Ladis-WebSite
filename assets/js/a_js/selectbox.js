//select自制控件
var selectbox = {
	//初始化自定义selectbox
	domeThis: null,
	
	init: function(o, index, date, switchs) {
		var $o = $(o);
		selectbox.domeThis = $o;
			_name = $o.attr('name'),
			_selectValue = $o.find('.opts > a.selected').attr('val')? $o.find('.opts > a.selected').attr('val'):$o.find('.opts > a:first').attr('val'),
			_selectHtml = $o.find('.opts > a.selected').html()? $o.find('.opts > a.selected').html():$o.find('.opts > a:first').html();
			
		$o.addClass('chang');
		$o.append($('<div class="chang_icon arrow" />')).append($('<input id="'+ _name+'" type="hidden" name="' + _name + '" value="' + _selectValue + '">'));
		//$('<div class="thisBox"><div class="selected">' + _selectHtml + '</div></div>').insertBefore($o.children(':first'));
		
		$o.children('.opts').show();	
		$o.children('.opts').hide();
		
		$o.off('click').on('click', selectbox.toggle);
		$o.off('click', '.opts > a').on('click', '.opts > a', {index:index,date:date,switchs:switchs}, selectbox.select);
		$o.find('.opts').off('mouseenter mouseleave').on('mouseenter', selectbox.mouseenter).on('mouseleave', selectbox.mouseleave);
		$(document).off('click', selectbox.hide).on('click', selectbox.hide);

	},
	toggle: function(e) {
		e.stopPropagation();
		var $o = $(this);
		var $opts = $o.children('.opts');
		
		$o.find('a.selected').removeClass('none');
		selectbox.hide(null, $('.chang').not($o));
		$o.toggleClass('chang_active');

		$opts.css({
			'width': "100%",
			'position':'absolute',
			"z-index" : "10",
		
		}).toggle($o.hasClass('chang_active'));

	},
	hide: function(e, objs) {
		var $o = objs ? objs : $('.chang');
		$o.removeClass('chang_active').children('.opts').hide().find('a.selected').removeClass('none');	
	},
	select: function(e) {
		e.stopPropagation();
		var $o = $(this).parents('.chang:first');
		$o.trigger('click');
		$o.find('a.selected').removeClass('selected');
		$(this).addClass('selected');
		$o.find('div.selected').html($(this).html());
		$o.find('input').val($(this).attr('val'));
		//为第一个select
		if(e.data.index == 0){
			selectbox.getAjax($o, $(this).attr('val'),e.data.date,e.data.switchs);
		}
		//依次选择
		if($o.attr('name')== "provinceC"){
			var myprovinceC =  $('input[name=provinceC]').val();
			if(myprovinceC != "所在省份"){
				$(".selectBox[name='cityC']").removeClass("noClick");
	            $(".selectBox[name='product']").addClass("noClick");
			}else{
				$(".selectBox[name='cityC']").addClass("noClick");
			}
		}else if($o.attr('name')== "cityC"){
			var mycityC = $('input[name=cityC]').val();
			if(mycityC !="所在城市"){
				$(".selectBox[name='product']").removeClass("noClick");
				$(".ZeZhao").hide();
			}
			else{
				$(".selectBox[name='product']").addClass("noClick");
				$(".ZeZhao").show();
			}
		}else if($o.attr('name')== "province"){
			var myprovince =  $('input[name=province]').val();
			if(myprovince != "所在省份"){
				$(".selectBox[name='city']").removeClass("noClick");
			}else{
				$(".selectBox[name='city']").addClass("noClick");
			}

		}
	},
	mouseenter: function(e){
		e.stopPropagation();
		var $o = $(this);
		$o.find('a.selected').addClass('none');
	},
	mouseleave: function(e){
		e.stopPropagation();
		var $o = $(this);
		$o.find('a.selected').removeClass('none');
	},
	getAjax: function (obj, val,date,switchs) {
		if(switchs == 'city'){
			var thisHTml = '';
			//塞选城市
			$.each(date,function  (i) {
				if(date[i].id == val){
					$.each(date[i].children,function  (j) {
						thisHTml += '<a href="javascript:void(0)" val="'+ date[i].children[j].id +'">'+ date[i].children[j].name +'</a>';
					})
					return false;
				}
			})
			
			obj.next().find(".opts").html(thisHTml);
			obj.next().find(".selected").html("所在城市");
			obj.next().find("input[name ^='city']").val(0);
		}
		if(switchs == 'city_2'){
			var thisHTml = '';
			//塞选城市
			$.each(date,function  (i) {
				if(date[i].id == val){
					$.each(date[i].children,function  (j) {
						thisHTml += '<a href="javascript:void(0)" val="'+ date[i].children[j].id +'">'+ date[i].children[j].name +'</a>';
					})
					return false;
				}
			})
			
			obj.next().next().find(".opts").html(thisHTml);
			//obj.next().next().find(".selected").html("请选择城市");
			obj.next().next().find("input[name ^='city']").val(0);
		}
		if(switchs == 'products'){
			var thisHTml = '';
			
			//塞选产品
			$.each(date,function  (i) {
				if(date[i].id == val){
					$.each(date[i].children,function  (j) {
						if(typeof(tmpKey) == 'string' && tmpKey == 'haocai')
						{
						    if(date[i].children[j].name != 'Epson EMP-30' && date[i].children[j].name != 'Epson EMP-3500' && date[i].children[j].name != 'Epson EH-TW470C' && date[i].children[j].name != 'EPSON ELPIU01' && date[i].children[j].name != 'Epson CB-G7905U' && date[i].children[j].name != 'Epson CB-G7805' && date[i].children[j].name != 'Epson CB-L1100U' && date[i].children[j].name != 'Epson CB-L1200U' && date[i].children[j].name != 'Epson CB-L1300U' && date[i].children[j].name != 'Epson CB-L1505U' && date[i].children[j].name != 'Epson CH-LS10000' && date[i].children[j].name != 'Epson CH-TW495')
						        thisHTml += '<a href="javascript:void(0)" val="'+ date[i].children[j].id +'">'+ date[i].children[j].name +'</a>';
						}
					    else
						    thisHTml += '<a href="javascript:void(0)" val="'+ date[i].children[j].id +'">'+ date[i].children[j].name +'</a>';
					})
					return false;
				}
			})
			selectbox.domeThis.find(".opts").html(thisHTml);
			selectbox.domeThis.find(".selected").html("请选择产品型号");
			selectbox.domeThis.removeClass("noClick"); // 没选择产品类型情况
			$(".ZeZhao").hide();
			$("#keyword").removeAttr("disabled").css("background","#FFF").val("请输入具体型号并在下拉菜单中选择相应产品");
			$("#txtKey").removeAttr("disabled").css("background","#FFF").val("请输入具体型号并在下拉菜单中选择相应产品");
			selectbox.domeThis.find("input[name='productModel']").val(0);

		}

	}
};




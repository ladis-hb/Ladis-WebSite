(function  ($) {
	var defaults = {
		    thisVal: "",
	}
	var settings = {};

	function inputBox (options) {
		var parent = this;
		
		settings = $.extend(settings , defaults , options);
		
		parent.objOption = settings.thisVal;

		parent.on("focus",function  () {
			if($.trim(parent.val()) == parent.objOption){
				parent.val("");
			}
		})
		parent.on("blur",function  () {
			if($.trim(parent.val()) == ""){
				parent.attr("value",(parent.objOption));
			}else{
				parent.attr("value",parent.attr("value"));
			}
		})
	}

	$.fn.extend({
		inputBox: inputBox,
	})
})(jQuery);

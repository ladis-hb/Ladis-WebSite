var checkForm = {
	seleflag : false,
	txtflag : false,
	btnObj : null,
	init: function  (obj,str) {
		checkForm.seleflag = false,
		checkForm.txtflag = false,
		checkForm.btnObj = null,
		checkForm.btnObj = obj.parents(".selectInit");
		checkForm.checkSelect();
		checkForm.checkTxt();
		
		if(checkForm.seleflag == true || checkForm.txtflag == true){
			return true;
		}else{
			alert(str);
			return false;
		}
	},
	checkSelect: function  () {
		checkForm.btnObj.find(".selectBox").each(function(){
			var thisSeleVal = $(this).find("input[type='hidden']").val();
			if(thisSeleVal == 0){
				checkForm.seleflag = false;
				return;
			}
			checkForm.seleflag = true;
		})	
	},
	checkTxt: function  () {
		if(checkForm.btnObj.find(".txt").length > 0){
			var thisTxtVal = $.trim(checkForm.btnObj.find(".txt").val());
			if(thisTxtVal !== "" && thisTxtVal !=="您还可以输入产品型号"){
				checkForm.txtflag = true;
			}else{
				checkForm.txtflag = false;
			}
			
		}
	}
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
    }

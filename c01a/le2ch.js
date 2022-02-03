//var ga_ch_tab0=["啊",...
//var ga_ch_tab1=["０"...
/*
function le2chSwitchSpecialChar(iv){
	var rtv=iv;
	
	//switch ･(chinese ctr dot) and ｀,｀ is not used:
	if(iv==0xFF40) rtv=0xFF65;
	if(iv==0xFF65) rtv=0xFF40;
	
	return rtv;
}
*/
function le2chSolveQ2(ia_rangeLeft,ia_rangeRight,iv_char,iv_code,iv_c,iv_opt){
	var rtv;
	var lv=iv_code;
	
	if(iv_opt==0){
		var lv_zid=findInArray(ga_ch_tab0,iv_char);
		if(lv_zid==-1){return lv;}
		var lv_zidOut=solveQ2(0,ga_ch_tab0.length-1,lv_zid,iv_c);
		var lv_charOut=ga_ch_tab0[lv_zidOut];
		rtv=le2CharToCode(lv_charOut);
	}else if(iv_opt==1){
		var lv_zid=findInArray(ga_ch_tab01,iv_char);
		if(lv_zid==-1){return lv;}
		var lv_zidOut=solveQ2(0,ga_ch_tab01.length-1,lv_zid,iv_c);
		var lv_charOut=ga_ch_tab01[lv_zidOut];
		rtv=le2CharToCode(lv_charOut);
	}else{
		rtv=solveQ2(ia_rangeLeft,ia_rangeRight,lv,iv_c);
	}
	
	
	return rtv;
}

function le2chList(iv_opt){
	var rtv="";
	var i;
	var la_range;
	
	if(iv_opt==0){
		la_range=ga_ch_tab0
		for(i=0;i<ga_ch_tab0.length;i++){
			rtv=rtv+ga_ch_tab0[i];
		}
	}else if(iv_opt==1){
		la_range=ga_ch_tab01
		for(i=0;i<ga_ch_tab01.length;i++){
			rtv=rtv+ga_ch_tab01[i];
		}
	}else if(iv_opt==2){
		la_range=CT_RANGE[2];
		for(i=la_range[0];i<la_range[1];i++){
			rtv=rtv+le2CodeToChar(i);
		}
		la_range=CT_RANGE[3];
		for(i=la_range[0];i<la_range[1];i++){
			rtv=rtv+le2CodeToChar(i);
		}
		la_range=CT_RANGE[4];
		for(i=la_range[0];i<la_range[1];i++){
			rtv=rtv+le2CodeToChar(i);
		}
	}
	
	
	return rtv;
}



//----------------------------
//private:
var ga_ascii_tab0=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function le2asciiSwitchSpecialChar(iv){
	var rtv=iv;
	
	//switch (space) and "`", "`" is not used:
	if(iv==0x20) rtv=0x60;
	if(iv==0x60) rtv=0x20;
	
	return rtv;
}

function le2asciiSolveQ2(ia_rangeLeft,ia_rangeRight,iv_char,iv_code,iv_c,iv_opt){
	var rtv;
	var lv=iv_code;
	
	if(iv_opt==0){
		var lv_zid=findInArray(ga_ascii_tab0,iv_char);
		if(lv_zid==-1){return lv;}
		var lv_zidOut=solveQ2(0,ga_ascii_tab0.length-1,lv_zid,iv_c);
		var lv_charOut=ga_ascii_tab0[lv_zidOut];
		rtv=le2CharToCode(lv_charOut);
		
	}else if(iv_opt==1){		
		rtv=solveQ2(ia_rangeLeft,ia_rangeRight,lv,iv_c);
	}
	
	
	return rtv;
}

function le2asciiList(iv_opt){
	var rtv="";
	var i;
	
	if(iv_opt==0){
		for(i=0;i<ga_ascii_tab0.length;i++){
			rtv=rtv+ga_ascii_tab0[i];
		}
	}else if(iv_opt==1){
		var la_range=CT_RANGE[1]
		for(i=la_range[0];i<la_range[1];i++){
			//skip not used char:
			if(i!=0x20 && i!=0x60);
				rtv=rtv+le2CodeToChar(i);
		}
	}
	
	
	return rtv;
}


/*

ver		update
C01		initial
C01A	add "supportCharList"
		using require.js


*/
//-----------------------------
　require([
	'./c01a/ut', 
	'./c01a/math', 
	'./c01a/le2ascii', 
	'./c01a/le2ch_tab', 
	'./c01a/le2ch', 
	'./c01a/le2devprint'
]);
//const
var C_INIT_NOISE = "le2.js"
var CT_RANGE = [
		new Array(-2,-1),			// [0] (undefined)
		new Array(0x21,0x7E),		// [1] ASCII
		new Array(0x4E00,0x9FCB),	// [2] CJK
											//var C_RANGE_SUR=new Array(0xD800,0xDFFF);	//D800~DFFF
												//for High/Low Surrogates chars, should consider two bytes,
												//maybe enhance this later
		new Array(0xFF01,0xFF64),	// [3] HFF (2byte symbol, number, letter)
		new Array(0x3000,0x303F)	// [4] CSP (2byte chinese symbol)
	];

//-----------------------------
//public
function le2calStrC01(iv_key,iv_str,iv_optascii,iv_optch,iv_sp){
	var rtv="";
	var lv_p_key=0; //pointer of iv_key;
	var lv_char;
	var lv_code;
	var lv_codeOut;
	var lv_charOut;
	
	//gen key-to-use:
	var lv_noise=le2genNoise(iv_key);
	var lv_c;
	
	//get str length
	var lv_len=iv_str.length;
	
	//main loop:
	for(i=0;i<lv_len+iv_sp;i++){
		//pick and regenerate key
		lv_c=le2genKey(le2GetCodeAt(iv_key,lv_p_key),lv_noise,i);
		//adjust pointer
		lv_p_key++;
		if(lv_p_key>=iv_key.length) lv_p_key=0;
		
		
		if(i>=iv_sp){	//only when >= user inputted Start Pos
			//get char& char code
			lv_char=le2GetCharAt(iv_str,i-iv_sp);
			lv_code=le2GetCodeAt(iv_str,i-iv_sp);
			
			//calculate
			lv_codeOut=le2cal(lv_char,lv_code,lv_c,iv_optascii,iv_optch);
			
			//decode code to char
			lv_charOut=le2CodeToChar(lv_codeOut);
			
			rtv=rtv+lv_charOut;
			
		}
		
	}
		
	return rtv;
}

function le2suppCharList(iv_optascii,iv_optch){
	var rtv;
	
	lv_ascii=le2asciiList(iv_optascii);
	lv_ch=le2chList(iv_optch);
	
	rtv=lv_ascii+lv_ch;
	
	return rtv;
}
//-----------------------------
//private

function le2switchSpecialChar(iv){
	var rtv;
	
	//for ascii:
	rtv=le2asciiSwitchSpecialChar(iv);
	
	//for chinese:
	
	
	return rtv;
}

function le2locateRange(iv_code){
	var rtv=CT_RANGE[0];	//default value is set to undefined
	var la;
	for(var i=0;i<CT_RANGE.length;i++){
		la=CT_RANGE[i];
		if( iv_code>=la[0] && iv_code<=la[1] ){
			rtv=la;
		}
	}
	
	return rtv;
}

function le2cal(iv_char,iv_code,iv_c,iv_optascii,iv_optch){
	var rtv;
	var la_range;
	var lv_not_in_range=false;
	var lv=iv_code;

	//preprocess, switch special char if needed:
	lv=le2switchSpecialChar(lv);
	
	//locate range
	la_range=le2locateRange(lv);
	
	if(la_range==CT_RANGE[0]) lv_not_in_range=true;
	
	if(lv_not_in_range) rtv=lv;
	else {
		if(la_range==CT_RANGE[1]){ //ascii
			rtv=le2asciiSolveQ2(la_range[0],la_range[1],iv_char,lv,iv_c,iv_optascii);
		}else if( la_range==CT_RANGE[2] ||
				  la_range==CT_RANGE[3] || 
				  la_range==CT_RANGE[4] 
				 ){	//chinese
			rtv=le2chSolveQ2(la_range[0],la_range[1],iv_char,lv,iv_c,iv_optch);	
		}// code not in CT_RANGE is already marked "lv_not_in_range" 
		 // and don't need to be considered
		
	}
	
	//preprocess back, switch back special char:
	rtv=le2switchSpecialChar(rtv);
		
	return rtv;
}

function le2GetCharAt(iv_str,iv_p){
	return iv_str.charAt(iv_p);
}
function le2GetCodeAt(iv_str,iv_p){
	return le2CharToCode(iv_str.charAt(iv_p));
}

function le2CharToCode(iv_char){
	return iv_char.charCodeAt(0);	
}


function le2CodeToChar(iv){
	var u='%u'+utDecToHex(iv)
	return unescape(u);	
}

//-----------------------------
// func. that calculates the key:


function le2genNoise(iv){
	var lv;
	var rtv=0;
	
	/*
	//get the lower byte of the unicode value of 
	//each char in the string and xor them all with counter
	for(var i=0;i<iv.length;i++){
		lv=utLowByte(le2GetCodeAt(iv,i));
		fPrintDebugL("le2genNoise lv: "+lv);
		rtv=(rtv+i)^(lv*(i+1)); //xor
		fPrintDebugL("le2genNoise rtv: "+rtv);
	}*/
	
	rtv=BKDRHash(C_INIT_NOISE+iv);//https://segmentfault.com/a/1190000013132249
	
	fPrintDebugL("le2genNoise rtv: "+rtv);
	return rtv;
}

function le2genKey(iv_keyCode,iv_noise,iv_counter){
	var rtv=iv_keyCode;
	
	rtv=rtv^iv_noise;
	//fPrintDebugL("le2genKey rtv+iv_noise: "+rtv);
	
	rtv=rtv+iv_counter;
	//fPrintDebugL("le2genKey rtv+iv_counter: "+rtv);
	
	return rtv;
}
//-----------------------------
//ut
function utDecToHex(iv){
	var rtv=iv.toString(16).toUpperCase();
	if(rtv.length==1) rtv='0'+rtv;
	if(rtv.length==2) rtv='00'+rtv;
	return rtv;
}

/*function utLowByte(iv){
	var rtv;
	if(iv>256) rtv=iv%256;
	else rtv=iv;
	return rtv;
}*/

function BKDRHash(iv){
	/*pre definition, simulate long type*/
	//long = 4294967296
	var var_max = 32767; // = 0xFFFF / 2

	
	var seed = 131;
	var hash = 0;
	
	var hxs;
	
	for(var i=0;i<iv.length;i++){
		hxc=hash*seed;
		hxc=overflow(hxc,var_max);
		
		hash=hxc+iv.charCodeAt(i);
		hash=overflow(hash,var_max);
	}
	return hash;
}

function overflow(iv,max){
	var lv=iv;
	while(lv>max){
		lv=lv-max;
	}
	return lv;
}
//-----------------------------

//test



function decToHex(iv){return iv.toString(16);}





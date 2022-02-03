

//var C_COLOR_CAT_CJK_SYB="#00CCFF";

/*
var CT_RANGE = [
		new Array(-2,-1),			//(undefined)
		new Array(0x21,0x7E),		//ASCII
		new Array(0x4E00,0x9FCB),	//CJK
											//var C_RANGE_SUR=new Array(0xD800,0xDFFF);	//D800~DFFF
												//for High/Low Surrogates chars, should consider two bytes,
												//maybe enhance this later
		new Array(0xFF01,0xFF64),	//HFF
		new Array(0x3000,0x303F)	//CSP
A1E	];
*/

var CT_COLOR = [
		"gray",		//(undefined)
		"blue",	//ASCII
		"green",	//CJK
											//var C_RANGE_SUR=new Array(0xD800,0xDFFF);	//D800~DFFF
												//for High/Low Surrogates chars, should consider two bytes,
												//maybe enhance this later
		"red",		//HFF
		"orange"	//CSP
	];
//-----------------------------
//public
function le2devprint(iv_str){
	
	var lv_len;
	var lv_charCode;
	var i;
	
	lv_len=iv_str.length;
	fPrintDebugL(lv_len);
	
	for(i=0;i<lv_len;i++){
				
		lv_charCode=le2GetCharCodeAt(iv_str,i);
		
		le2devPrintCharCode(lv_charCode);
		le2devPrintChar(lv_charCode);
		fPrintDebug('\t');
	}
	fPrintDebugL('');
	
}

function le2devprintCJKfilter(iv_str){
	
	var la_range;
	var lv_len;
	var lv_charCode;
	var i;
	
	lv_len=iv_str.length;
	fPrintDebugL(lv_len);
	
	for(i=0;i<lv_len;i++){
				
		lv_charCode=le2GetCharCodeAt(iv_str,i);
		
		
		//locate range
		la_range=le2LocateRange(lv_charCode);
		if( la_range==CT_RANGE[2] ||
				  la_range==CT_RANGE[3] || 
				  la_range==CT_RANGE[4] 
			){					 
				le2devPrintCharCode(lv_charCode);
				le2devPrintChar(lv_charCode);
				
				fPrintDebug('\t');
				fPrintDebugL('');				
			}
			
	}
	
}
//-----------------------------
//private


function le2devPrintCharCode(iv_charCode){
	var lv;
	var lv_color;
	
	lv=iv_charCode;
	lv_color=CT_COLOR[le2devLocateRangeIndex(lv)];
	
	fPrintDebug('<font color="'+lv_color+'">'+utDecToHex(lv)+'</font> ');
}


function le2devLocateRangeIndex(iv_charCode){
	var rtv=0;
	var la;
	for(var i=0;i<CT_RANGE.length;i++){
		la=CT_RANGE[i];
		if( iv_charCode>=la[0] && iv_charCode<=la[1] ){
			rtv=i;
		}
	}
	
	return rtv;
}


function le2devPrintChar(iv_code){
	fPrintDebug(le2decodeCode(iv_code));	
}




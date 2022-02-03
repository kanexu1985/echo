function findInArray(ia,iv_target){
	var rtv=-1;
	for(var i=0;i<ia.length;i++){
		if(ia[i]==iv_target) rtv=i;
	}
	return rtv;
}
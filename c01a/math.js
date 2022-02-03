
function solveQ2(iv_m,iv_n,iv_a,iv_c){
	var rtv;
	
	var a,c,d,m,n,p,q;
	m=iv_m;
	n=iv_n;
	a=iv_a;
	c=iv_c;
	
	//validate first
	if(
		(m>n) ||
		(a<m) ||
		(a>n)
	){
		return -1;
	}
	if( (m%2) == (n%2) ){
		return -2;
	} 
	
	//a, check c:
	if( (c%2)==0 ) 
		c=c*2+1;
	
	//b, calculate q:
	p=a;
	if( (p%2)==0 ) q=p-c;
	else q=p+c;
	
	//c, check d
	d=n-m;
	if( (d%2)!=0 ) d++;
	
	//d, check within [m,n]
	if (q>n){
		while(q>n){
			q=q-d;
		}
	}
	if (q<m){
		while(q<m){
			q=q+d;
		}
	}
	
	rtv=q;
	
	return rtv;
}
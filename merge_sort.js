function Merge()
{
	c_delay = 0;
	merge_partition(0,array_size-1);

}

function merge_partition(start,end)
{
	if(start<end)
	{
		var mid = Math.floor((start+end)/2);
		div_update(divs[mid],div_sizes[mid],"yellow");
		merge_partition(start,mid);
		merge_partition(mid+1,end);
		merge_sort(start,mid,end);
	}
}

function merge_sort(start,mid,end)
{

	/*var left =  mid-start+1;
	var right = end-mid;
	var left_arr = [];
	var right_arr = [];
	var i=0;
	var j=0;
	for(i=0;i<left;i++)
	{
		left_arr[i] = div_sizes[start+i];
	}
	left_arr[i] = 999;
	for(j=0;j<right;j++)
	{
		right_arr[j] = div_sizes[mid+j+1];
	}
	right_arr[j] = 999;
	for(i=0;i<left+1;i++)
	{
		console.log(left_arr[i]);
	}
	console.log("end left");
	for(i=0;i<right+1;i++){
		console.log(right_arr[i]);
	}
	console.log("end right");
	i=0;
	j=0;
	for(var k=start;k<=end;k++)
	{
		if(left_arr[i]<right_arr[j])
		{
			div_sizes[k] = left_arr[i];
			i++;
		}else{
			div_sizes[k] = right_arr[j];
			j++;
		}
		k++;
	}
	for(var k=start;k<=end;k++)
	{
		div_update(divs[k],div_sizes[k],"black");
	}*/
	var p = start,q = mid+1;

	var temp_arr = [],k=0;

	for(var i=start;i<=end;i++)
	{
		if(p>mid)
		{
			temp_arr[k++] = div_sizes[q++];
			div_update(divs[q-1],div_sizes[q-1],"red");
		}
		else if(q>end)
		{
			temp_arr[k++] = div_sizes[p++];
			div_update(divs[p-1],div_sizes[p-1],"red");
		}
		else if(div_sizes[p]<div_sizes[q])
		{
			temp_arr[k++] = div_sizes[p++];
			div_update(divs[p-1],div_sizes[p-1],"red");
		}
		else{
			temp_arr[k++] = div_sizes[q++];
			div_update(divs[q-1],div_sizes[q-1],"red");
		}
		
	}
	for(var t = 0;t<k;t++)
		{
			div_sizes[start++] = temp_arr[t];
			div_update(divs[start-1],div_sizes[start-1],"black");
		}
}
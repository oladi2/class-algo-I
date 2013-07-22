#!/usr/bin/env node
/*jshint smarttabs: true */

var fs = require('fs');

var d = 0;

function process_File(fileName) {
    var fileArray = fs.readFileSync(fileName).toString().split("\n");

    if (fileArray[fileArray.length-1] === '') {
	fileArray.pop();
    }

    var intArr=fileArray.map(function(item) { return parseInt(item, 10); });

    return intArr;
}

function quicksort(A,n) {

//console.log("qs1 n:" + n);
//console.log(A.toString());

    if (n == 1 || n == 0) {
	return {
	    arr: A,
	    count: 0
	};
    }

    // To implement the use of the last element of the pivot but
    // without altering the partition function from qs1.js we swap
    // the first and last element prior to feeding it to partition.
    var tmp2 = A[0];
    A[0] = A[A.length-1];
    A[A.length-1] = tmp2;

    var pivotedArray = partition(A, 0, n-1);
//console.log("qs2");
    var leftArr = pivotedArray.left;
//console.log("qs3");
    var rightArr = pivotedArray.right;
//console.log("qs4");
    var pivotValue = pivotedArray.pivotValue;
//console.log("qs5");
    var pivotIndex = pivotedArray.pivotIndex;
//console.log("qs6");
//console.log("leftArr size = " + leftArr.length);
//console.log("rightArr size = " + rightArr.length);

//console.log(leftArr.toString());
//console.log(rightArr.toString());
    var leftSorted=quicksort(leftArr, leftArr.length);
//console.log("qs7");
    var rightSorted=quicksort(rightArr, rightArr.length);
//console.log("qs8");

    var combinedArray = leftSorted.arr;
    combinedArray.push(pivotValue);
    combinedArray.push.apply(combinedArray, rightSorted.arr);

    var c = A.length-1 + leftSorted.count + rightSorted.count;
    d = d + leftArr.length-1 + rightArr.length-1;

    return {
	arr: combinedArray,
	count: c
    };
}


function partition(A, l, r) {
    var p = A[l];
    var i = l+1;
    var tmp = 0;



//console.log("p: "+p);
//console.log("Initially i: "+i);
//console.log("Initially l: "+l);
//console.log("Initially r: "+r);
    for (var j=l+1; j<=r; j++) {
//console.log("A[j]: "+A[j]);
	if (A[j] < p) {
	    tmp = A[i];
	    A[i] = A[j];
	    A[j] = tmp;
	    i++;
//console.log("i: "+i);
	}
    }
    tmp = A[l];
    A[l] = A[i-1];
    A[i-1] = tmp;

//console.log(l);
//console.log(i-1);
    return {
	left:   A.slice(l, i-1),
	right:  A.slice(i),
	pivotValue: A[i-1],
	pivotIndex: i-1
    };
}


// Main execution starts here
//console.log("Execution Started ...");
// Mark start time
var start = new Date().getTime();
var inputArray = process_File('QuickSort.txt');
console.log("Size of input array:  " + inputArray.length);

var c = 0;
var sorted = quicksort(inputArray, inputArray.length);
console.log("The number of comparisons was: " + sorted.count);
//console.log("The number of comparisons was: " + d);
//console.log(sorted.arr.toString());
console.log("End of Program");
var end = new Date().getTime();
var time_elapsed = end-start;

console.log("Execution Time:  " + time_elapsed + " ms");

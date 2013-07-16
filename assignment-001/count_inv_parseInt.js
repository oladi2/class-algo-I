#!/usr/bin/env node
/*jshint smarttabs: true */

var fs = require('fs');

function process_File(fileName) {
    var fileArray = fs.readFileSync(fileName).toString().split("\n");

    if (fileArray[fileArray.length-1] === '') {
	fileArray.pop();
    }

    return fileArray;
}

function sort_and_count(inputArray) {
    var aLength=inputArray.length;
    if (aLength == 1) {
	return {
	    arr: inputArray,
	    count: 0
	};
    }
    else {
	var x = sort_and_count(inputArray.slice(0, Math.round(aLength/2)));
	var y = sort_and_count(inputArray.slice(Math.round(aLength/2)));
	var z = merge_and_count_split_inv(x, y);

	return {
	    arr: z.arr,
	    count: x.count + y.count + z.count
	};
    }
}

function merge_and_count_split_inv(x, y) {
    var i = 0;
    var j = 0;
    var num_inv = 0;
    var c = new Array(); // merged array of x and y

    while (i < x.arr.length && j < y.arr.length) {

	if (parseInt(y.arr[j], 10) < parseInt(x.arr[i],10)) {
	    c = c.concat(parseInt(y.arr[j], 10));
	    num_inv = num_inv + (x.arr.length - i);
	    j++;
	} else {
	    c = c.concat(parseInt(x.arr[i], 10));
	    i++;
	}
    }

    if (i == x.arr.length) {
	c = c.concat(y.arr.slice(j));
    } else if (j == y.arr.length) {
	c = c.concat(x.arr.slice(i));
    }

    return {
	arr: c,
	count: num_inv
    };
}

// Main execution starts here
console.log("Execution Started ...");
// Mark start time
var start = new Date().getTime();
var inputArray = process_File('IntegerArray.txt');
console.log("Size of input array:  " + inputArray.length);

var total_inv = sort_and_count(inputArray).count;
console.log("The number of inversions is: " + total_inv);
console.log("End of Program");
var end = new Date().getTime();
var time_elapsed = end-start;
console.log("Execution Time:  " + time_elapsed + " ms");

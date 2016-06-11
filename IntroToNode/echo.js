function echo(str, num) {
  for(i = num; i > 0; i--) {
        console.log(str);
    }
}

function average(arr) {
    var sum = 0;
    for(i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    console.log(sum / arr.length);
}

average([90, 98, 89, 100, 100, 86, 94]);
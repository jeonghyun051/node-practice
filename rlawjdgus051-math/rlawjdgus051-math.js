exports.sum = function(){   // 옛날 방식
    let sum = 0;
    Array.from(arguments).forEach(e => {
        sum += e;
    });
    return sum;
}

exports.max = function(){   // 옛날 방식
    let max = Number.MIN_SAFE_INTEGER;
    Array.from(arguments).forEach(e => {
        max = e > max ? e : max;
    });
    return max;
}

exports.min = function(){   // 옛날 방식
    let min = Number.MAX_SAFE_INTEGER;
    Array.from(arguments).forEach(e => {
        min = e < min ? e : min;
    });
    return min;
}
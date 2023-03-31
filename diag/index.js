function countSymbol (str, symbol) {
    const result = str.split('').filter(el=>el === symbol).length;
    console.log(result);
    return result;
}

countSymbol('Hello', 'o'); // 1 
countSymbol('Hello', 'l'); // 2 
countSymbol('Hello', 'H'); // 1 
countSymbol('Hello', 'h'); // 0 
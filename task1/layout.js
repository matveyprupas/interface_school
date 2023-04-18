module.exports = function layout(blocks) {
    let result = [];
    const bottomBlocks = getBottomBlocks(blocks).sort((a,b) => a.position - b.position);

    switch (blocks.length) {
        case 0: 
            break;
        case 1: 
            result.push({
                "blockId": blocks[0].id,
                "position": 1, 
                "isRotated": false
            });
            break;
        case 2: 
            result = bottomBlocks.map((block, index, array) => {
                if(index === array.length - 1) {
                    return {...block, isRotated: !block.isRotated};
                }
                return block;
            });
            break;
        case 3:
            result = bottomBlocks.map((block, index, array) => {
                if(index === array.length - 1) {
                    return {...block, isRotated: !block.isRotated, position: blocks.length};
                }
                return block;
            });
            console.log(result);

            const bottomBlocksId = bottomBlocks.map(blockRes => blockRes.blockId);
            const middleBlock = blocks.filter(block => !bottomBlocksId.includes(block.id))[0];
            const reverseMiddleBlock = getReverseMiddleBlock(middleBlock);
            const bottomBlock = blocks.filter(block => block.id === bottomBlocks[0].blockId)[0];
            console.log(middleBlock);
            console.log(reverseMiddleBlock);

            bottomBlock.form.forEach((blockRow, rowIndex, arr) => {
                // console.log('----------------rowIndex------------------', rowIndex, arr);

                // debugger
                if(!blockRow.includes(0)) {
                    return;
                }
                const resultMiddle = blockRow.filter((num, index) => num === middleBlock.form[rowIndex][index]);
                const resultReverse = blockRow.filter((num, index) => num === reverseMiddleBlock.form[rowIndex][index]);
                console.log('----------------rowIndex------------------', rowIndex, arr);

                console.log(resultMiddle, blockRow);
                console.log(resultReverse, blockRow);

                // if(!resultMiddle.length && !resultReverse.length) {
                    
                // }
                if(resultMiddle.length === blockRow.length) {
                    console.log('resultMiddle.length === blockRow.length');

                    result.push({
                        "blockId": middleBlock.id,
                        "position": 2, 
                        "isRotated": false
                    });
                    return;
                }

                if(resultReverse.length === blockRow.length) {
                    console.log('resultReverse.length === blockRow.length');

                    result.push({
                        "blockId": reverseMiddleBlock.id,
                        "position": 2, 
                        "isRotated": true
                    });
                    return;
                }
                if(!resultMiddle.length) {
                    console.log('resultMiddle.length === 0');

                    result.push({
                        "blockId": middleBlock.id,
                        "position": 2, 
                        "isRotated": true
                    });
                    return;
                }

                if(!resultReverse.length) {
                    console.log('resultReverse.length === 0');

                    result.push({
                        "blockId": reverseMiddleBlock.id,
                        "position": 2, 
                        "isRotated": false
                    });
                    return;
                }

            });
            result.sort((a,b) => a.position - b.position);
            break;             
    }
    
    // console.log(bottomBlocks);
    console.log(result);
    return result;
}

function getBottomBlocks (blocks) {
    return blocks.reduce((acc, block) => {
        if(!block.form[0].filter(el => el === 0).length) {
            acc.push({
                "blockId": block.id,
                "position": blocks.length, 
                "isRotated": true
            });
        }
        if(!block.form[block.form.length - 1].filter(el => el === 0).length) {
            acc.push({
                "blockId": block.id,
                "position": 1,
                "isRotated": false
            });
        } 
        return acc;   
    }, []);
}

function getReverseMiddleBlock(block) {
    const reversedBlockForm = [...block.form].reverse().map(row => {
        const newRow = [...row]
        return newRow.reverse();
    });
    return {...block, form: reversedBlockForm};
}

module.exports = function layout(blocks) {
    console.log(blocks);
    const result = [];
    const topBlocks = [];
    blocks.forEach(block => {
        if(!block.form[0].filter(el => el === 0).length) {
            topBlocks.push({
                "blockId": block.id,
                "isRotated": false
            });
        }
        if(!block.form[block.form.length - 1].filter(el => el === 0).length) {
            topBlocks.push({
                "blockId": block.id,
                "isRotated": true
            });
        }    });
    console.log(topBlocks);
}

const blocks = [{
    "id": 738,
    "form": [
      [1, 0],
      [1, 1]
    ]
  },
  {
    "id": 841,
    "form": [
      [1, 1],
      [0, 1]
    ]
}];

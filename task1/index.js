const layout = require('./layout');

const blocks = [{
  "id": 738,
  "form": [
    [1, 0],
    [1, 1]
  ]
},{
    "id": 841,
    "form": [
      [1, 1],
      [0, 1]
    ]
}];

const result = [
  {
    "blockId": 738,
    "position": 1,
    "isRotated": false
  },
  {
    "blockId": 841,
    "position": 2,
    "isRotated": false
  }
];


const blocks2 = [{
  "id": 443,
  "form": [
    [1, 0, 1],
    [1, 1, 1]
  ]
},
{
  "id": 327,
  "form": [
    [0, 1, 0],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 0],
    [0, 1, 0]
  ]
},
{
  "id": 891,
  "form": [
    [0, 0, 1],
    [1, 0, 1],
    [1, 1, 1]
  ]
}];

const result2 = [
{
  "blockId": 443,
  "position": 1,
  "isRotated": false
},
{
  "blockId": 327,
  "position": 2,
  "isRotated": true
},
{
  "blockId": 891,
  "position": 3,
  "isRotated": true
}
];


const blocks3 = [{
  "id": 4892,
  "form": [
    [0, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ]
},
{
  "id": 1839,
  "form": [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 0, 0]
  ]
},
{
  "id": 8183,
  "form": [
    [0, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 0],
    [0, 1, 0]
  ]
}];

const result3 = [
{
  "blockId": 4892,
  "position": 1,
  "isRotated": false
},
{
  "blockId": 8183,
  "position": 2,
  "isRotated": false
},
{
  "blockId": 1839,
  "position": 3,
  "isRotated": false
}
];


const blocks4 = [{
  "id": 1,
  "form": [
    [1, 0, 1],
    [1, 1, 1],
    [1, 1, 1]
  ]
},
{
  "id": 2,
  "form": [
    [0, 0, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ]
},
{
  "id": 3,
  "form": [
    [0, 1, 1],
    [1, 1, 1],
    [0, 1, 0]
  ]
}];

const result4 = [
{
  "blockId": 1,
  "position": 1,
  "isRotated": false
},
{
  "blockId": 3,
  "position": 2,
  "isRotated": false
},
{
  "blockId": 2,
  "position": 3,
  "isRotated": true
}
];

// layout(blocks);
// layout(blocks2);
layout(blocks3);
// layout(blocks4);


console.log( '------------------------- END --------------------------')
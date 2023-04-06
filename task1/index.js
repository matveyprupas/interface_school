const layout = require('./layout');

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

layout(blocks);
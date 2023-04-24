  const data = [
    {
        "id": "A",
        "priority": 1,
        "render": async () => {
            return ([
                {
                  "id": "A.1",
                  "priority": 2,
                  "render": async () => {
                      return ([
                        {
                          "id": "A.1.1",
                          "priority": 2,
                          "render": async () => {
                              return (null);
                          }
                        }
                      ]);
                  }
                }
              ]);
        }
    },
    {
        "id": "B",
        "priority": 2,
        "render": async () => {
            return ([
                {
                  "id": "B.1",
                  "priority": 3,
                  "render": async () => {
                      return (null);
                  }
                },
                {
                  "id": "B.2",
                  "priority": 3,
                  "render": async () => {
                      return (null);
                  }
                },
                {
                  "id": "B.3",
                  "priority": 3,
                  "render": async () => {
                      return (null);
                  }
                },
                {
                  "id": "B.4",
                  "priority": 1,
                  "render": async () => {
                      return (null);
                  }
                },
                {
                  "id": "B.5",
                  "priority": 1,
                  "render": async () => {
                      return (null);
                  }
                },
                {
                  "id": "B.6",
                  "priority": 1,
                  "render": async () => {
                      return (null);
                  }
                }
              ]);
        }
      }
  ]



const renderAsync = require('./index');


(async () => {
    const result = await renderAsync(data, 5);
    console.log('result in test.js: ', result[0].children);
})()


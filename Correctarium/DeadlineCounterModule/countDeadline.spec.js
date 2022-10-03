import {deadlineCounter} from './countDeadlineFunction.js';

const RU_UA_SPEED = 1333;
const EN_SPEED = 333;

describe('Min deadline tests',
    () =>{
        const testCases = 
        [
            {
                requestObject:{language:"ua",mimetype:"doc",count:1},
                requestDate: new Date('October 3, 2022 10:00:00'),
                expectedDeadlineDate: '03/10/2022/11:00',
                expectedhours: 1,
            },
            {
                requestObject:{language:"ua",mimetype:"docx",count:1},
                requestDate: new Date('October 3, 2022 10:00:00'),
                expectedDeadlineDate: '03/10/2022/11:00',
                expectedhours: 1,
            },
            {
                requestObject:{language:"ua",mimetype:"rtf",count:1},
                requestDate: new Date('October 3, 2022 10:00:00'),
                expectedDeadlineDate: '03/10/2022/11:00',
                expectedhours: 1,
            },
            {
                requestObject:{language:"ru",mimetype:"doc",count:1},
                requestDate: new Date('October 3, 2022 10:00:00'),
                expectedDeadlineDate: '03/10/2022/11:00',
                expectedhours: 1,
            },
            {
                requestObject:{language:"ru",mimetype:"docx",count:1},
                requestDate: new Date('October 3, 2022 10:00:00'),
                expectedDeadlineDate: '03/10/2022/11:00',
                expectedhours: 1,
            },
            {
                requestObject:{language:"ru",mimetype:"rtf",count:1},
                requestDate: new Date('October 3, 2022 10:00:00'),
                expectedDeadlineDate: '03/10/2022/11:00',
                expectedhours: 1,
            },
            {
                requestObject:{language:"en",mimetype:"doc",count:1},
                requestDate: new Date('October 3, 2022 10:00:00'),
                expectedDeadlineDate: '03/10/2022/11:00',
                expectedhours: 1,
            },
            {
                requestObject:{language:"en",mimetype:"docx",count:1},
                requestDate: new Date('October 3, 2022 10:00:00'),
                expectedDeadlineDate: '03/10/2022/11:00',
                expectedhours: 1,
            },
            {
                requestObject:{language:"en",mimetype:"rtf",count:1},
                requestDate: new Date('October 3, 2022 10:00:00'),
                expectedDeadlineDate:'03/10/2022/11:00',
                expectedhours: 1,
            }
        ];
        testCases.forEach(testCase =>
        {
            it(`Request date ${testCase.requestDate.toDateString()}.
                Language: ${testCase.requestObject.language} Mimetype: ${testCase.requestDate.mimetype}
                Should return ${testCase.expectedDeadlineDate}`,
                ()=>
                {
                    //Arrange & Act
                    var result = deadlineCounter(testCase.requestObject,testCase.requestDate);
                    //Assert
                    expect(result.stringDeadline).toBe(testCase.expectedDeadlineDate);
                    expect(result.time).toBe(testCase.expectedhours);
                });
        });
    });

describe('Requests outside buisness hours tests',() =>{
    const testCases = 
    [
        {
            requestObject:{language:"ua",mimetype:"doc",count:1},
            requestDate: new Date('October 3, 2022 06:00:00'),
            expectedDeadlineDate: '03/10/2022/11:00',
            expectedhours: 1,
        },
        {
            requestObject:{language:"ua",mimetype:"doc",count:1},
            requestDate: new Date('October 3, 2022 19:00:00'),
            expectedDeadlineDate: '04/10/2022/11:00',
            expectedhours: 1,
        }
    ];
    testCases.forEach(testCase =>
        {
            it(`Request date ${testCase.requestDate.toDateString()}.
                Language: ${testCase.requestObject.language} Mimetype: ${testCase.requestDate.mimetype}
                Should return ${testCase.expectedDeadlineDate}`,
                ()=>
                {
                    //Arrange & Act
                    var result = deadlineCounter(testCase.requestObject,testCase.requestDate);
                    //Assert
                    expect(result.stringDeadline).toBe(testCase.expectedDeadlineDate);
                    expect(result.time).toBe(testCase.expectedhours);
                });
        });
});

describe('Requests on weekends test',() =>{
    const testCases = 
    [
        {
            requestObject:{language:"ua",mimetype:"doc",count:1},
            requestDate: new Date('October 8, 2022 10:00:00'),
            expectedDeadlineDate: '10/10/2022/11:00',
            expectedhours: 1,
        },
        {
            requestObject:{language:"ua",mimetype:"doc",count:1},
            requestDate: new Date('October 9, 2022 10:00:00'),
            expectedDeadlineDate: '10/10/2022/11:00',
            expectedhours: 1,
        }
    ];
    testCases.forEach(testCase =>
        {
            it(`Request date ${testCase.requestDate.toDateString()}.
                Language: ${testCase.requestObject.language} Mimetype: ${testCase.requestDate.mimetype}
                Should return ${testCase.expectedDeadlineDate}`,
                ()=>
                {
                    //Arrange & Act
                    var result = deadlineCounter(testCase.requestObject,testCase.requestDate);
                    //Assert
                    expect(result.stringDeadline).toBe(testCase.expectedDeadlineDate);
                    expect(result.time).toBe(testCase.expectedhours);
                });
        });
});

describe('Is hours correct for |doc|docx|rtf| mimetype RU and UA',() =>{
    const testCases = 
    [
        {
            requestObject:{language:"ua",mimetype:"doc",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        },
        {
            requestObject:{language:"ua",mimetype:"docx",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        },
        {
            requestObject:{language:"ua",mimetype:"rtf",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        },
        {
            requestObject:{language:"ru",mimetype:"doc",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        },
        {
            requestObject:{language:"ru",mimetype:"docx",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        },
        {
            requestObject:{language:"ru",mimetype:"rtf",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        },
    ];
    testCases.forEach(testCase =>
        {
            it(`Request date ${testCase.requestDate.toDateString()}.
                Language: ${testCase.requestObject.language} Mimetype: ${testCase.requestDate.mimetype}
                Should return ${testCase.expectedhours}`,
                ()=>
                {
                    //Arange
                    var expectedValue = (testCase.requestObject.count / RU_UA_SPEED) + 0.5;
                    //Act
                    var result = deadlineCounter(testCase.requestObject,testCase.requestDate);
                    //Assert
                    expect(result.time).toBe(expectedValue);
                });
        });
});

describe('Is hours correct for other mimetype RU and UA',() =>{
    const testCases = 
    [
        {
            requestObject:{language:"ua",mimetype:"other",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        },
        {
            requestObject:{language:"ua",mimetype:"other",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        },
       
    ];
    testCases.forEach(testCase =>
        {
            it(`Request date ${testCase.requestDate.toDateString()}.
                Language: ${testCase.requestObject.language} Mimetype: ${testCase.requestDate.mimetype}
                Should return ${testCase.expectedhours}`,
                ()=>
                {
                    //Arange
                    var expectedValue = ((testCase.requestObject.count / RU_UA_SPEED) + 0.5) * 1.2;
                    //Act
                    var result = deadlineCounter(testCase.requestObject,testCase.requestDate);
                    //Assert
                    expect(result.time).toBe(expectedValue);
                });
        });
});

describe('Is hours correct for |doc|docx|rtf| mimetype EN',() =>{
    const testCases = 
    [
        {
            requestObject:{language:"en",mimetype:"doc",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        },
        {
            requestObject:{language:"en",mimetype:"docx",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        },
        {
            requestObject:{language:"en",mimetype:"rtf",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        }
    ];
    testCases.forEach(testCase =>
        {
            it(`Request date ${testCase.requestDate.toDateString()}.
                Language: ${testCase.requestObject.language} Mimetype: ${testCase.requestDate.mimetype}
                Should return ${testCase.expectedhours}`,
                ()=>
                {
                    //Arange
                    var expectedValue = (testCase.requestObject.count / EN_SPEED) + 0.5;
                    //Act
                    var result = deadlineCounter(testCase.requestObject,testCase.requestDate);
                    //Assert
                    expect(result.time).toBe(expectedValue);
                });
        });
});


describe('Is hours correct for other mimetype EN',() =>{
    const testCases = 
    [
        {
            requestObject:{language:"en",mimetype:"other",count:5000},
            requestDate: new Date('October 8, 2022 10:00:00'),
        }
    ];
    testCases.forEach(testCase =>
        {
            it(`Request date ${testCase.requestDate.toDateString()}.
                Language: ${testCase.requestObject.language} Mimetype: ${testCase.requestDate.mimetype}
                Should return ${testCase.expectedhours}`,
                ()=>
                {
                    //Arange
                    var expectedValue = ((testCase.requestObject.count / EN_SPEED) + 0.5) * 1.2;
                    //Act
                    var result = deadlineCounter(testCase.requestObject,testCase.requestDate);
                    //Assert
                    expect(result.time).toBe(expectedValue);
                });
        });
});


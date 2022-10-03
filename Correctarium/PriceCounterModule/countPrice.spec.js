import {countPrice} from './countPriceFunction.js';

describe('Min price tests for |doc|docx|rtf| mimetype',
    () =>{
        const testCases = 
        [
            {
                requestObject:{language:"ua",mimetype:"doc",count:10},
                expectedValue: 50
            },
            {
                requestObject:{language:"ua",mimetype:"docx",count:10},
                expectedValue: 50
            },
            {
                requestObject:{language:"ua",mimetype:"rtf",count:10},
                expectedValue: 50
            },
            {
                requestObject:{language:"ru",mimetype:"doc",count:10},
                expectedValue: 50
            },
            {
                requestObject:{language:"ru",mimetype:"docx",count:10},
                expectedValue: 50
            },
            {
                requestObject:{language:"ru",mimetype:"rtf",count:10},
                expectedValue: 50
            },
            {
                requestObject:{language:"en",mimetype:"doc",count:10},
                expectedValue: 120
            },
            {
                requestObject:{language:"en",mimetype:"docx",count:10},
                expectedValue: 120
            },
            {
                requestObject:{language:"en",mimetype:"rtf",count:10},
                expectedValue: 120
            },
        ];
        testCases.forEach(testCase =>
        {
            it(`Request object: language: ${testCase.requestObject.language} with type: ${testCase.requestObject.mimetype} should return ${testCase.expectedValue}`,
                ()=>
                {
                    //Arrange & Act
                    var result = countPrice(testCase.requestObject);
                    //Assert
                    expect(result).toBe(testCase.expectedValue);
                });
        });
    });

    describe('Min price tests for other mimetype',()=>{
        const testCases = 
        [
            {
                requestObject:{language:"ua",mimetype:"other",count:10},
                expectedValue: 60
            },
            {
                requestObject:{language:"ru",mimetype:"other",count:10},
                expectedValue: 60
            },
            {
                requestObject:{language:"en",mimetype:"other",count:10},
                expectedValue: 144
            },
        ];
        testCases.forEach(testCase=>
        {
            it(`Request object: language: ${testCase.requestObject.language} with type: ${testCase.requestObject.mimetype} should return ${testCase.expectedValue}`,
                ()=>{
                    //Arrange & Act
                    const result = countPrice(testCase.requestObject);
                    //Assert
                    expect(result).toBe(testCase.expectedValue);
                })
        });
    });
    
    describe('Price for 10_000 signs',()=>{
        const testCases = 
        [
            {
                requestObject:{language:"ua",mimetype:"doc",count:10000},
                expectedValue: 500
            },
            {
                requestObject:{language:"ua",mimetype:"docx",count:10000},
                expectedValue: 500
            },
            {
                requestObject:{language:"ua",mimetype:"rtf",count:10000},
                expectedValue: 500
            },
            {
                requestObject:{language:"ua",mimetype:"other",count:10000},
                expectedValue: 600
            },
            {
                requestObject:{language:"ru",mimetype:"doc",count:10000},
                expectedValue: 500
            },
            {
                requestObject:{language:"ru",mimetype:"docx",count:10000},
                expectedValue: 500
            },
            {
                requestObject:{language:"ru",mimetype:"rtf",count:10000},
                expectedValue: 500
            },
            {
                requestObject:{language:"ru",mimetype:"other",count:10000},
                expectedValue: 600
            },
            {
                requestObject:{language:"en",mimetype:"doc",count:10000},
                expectedValue: 1200
            },
            {
                requestObject:{language:"en",mimetype:"docx",count:10000},
                expectedValue: 1200
            },
            {
                requestObject:{language:"en",mimetype:"rtf",count:10000},
                expectedValue: 1200
            },
            {
                requestObject:{language:"en",mimetype:"other",count:10000},
                expectedValue: 1440
            },
        ];
        testCases.forEach(testCase=>
            {
                it(`Request object: language: ${testCase.requestObject.language} with type: ${testCase.requestObject.mimetype} should return ${testCase.expectedValue}`,
                    ()=>{
                        //Arrange & Act
                        var result = countPrice(testCase.requestObject);
                        //Assert
                        expect(result).toBe(testCase.expectedValue);
                    })
            });
    })
    



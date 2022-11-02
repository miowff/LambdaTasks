import {declareCutomMethods} from './ArrayExtentionMethods';
class Person
{
    id:number;
    name:string;
    code:number;
    constructor(id:number,name:string,code:number)
    {
        this.id = id;
        this.name = name;
        this.code = code;
    }
}
declareCutomMethods();
const persons:Person[]=[new Person(1,"Person1",100),
new Person(2,"Person2",200),new Person(3,"Person3",300),new Person(3,"Person4",400)];

const stringsArray = ["string","someString","string1","string2"];
const numbersArray = [1,2,3,4,5,6,7,8,9,10];
const charsArray = ['a','b','c','d','e','f','j'];
const emptyArray:string[] = [];
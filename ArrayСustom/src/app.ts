import './ArrayExtentionMethods';

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

const persons:Person[]=[new Person(1,"Person1",100),
new Person(2,"Person2",500),new Person(3,"Person3",300),new Person(4,"Person4",300)];

const stringsArray = ["string","someString","string1","string2"];
const numbersArray = [1,2,3,4,5,6,7,8,9,10];
const arrayOfArrays = [[1,2,3],[[4,5,[6,7]]],[8,9]];
const emptyArray:string[] = [];
const cahrs =['a','b','c']

//Any
console.log("Array.any() " + numbersArray.any());
console.log("Array.any() " + emptyArray.any());
console.log("Array.any(predicate) " + persons.any(item=>item.code == 300));
//All
console.log("Array.all(predicate) " + numbersArray.all(item=>item>0));
//FindLast
console.log("Array.findLast(predicate) " + numbersArray.findLast(item=>item % 2== 0));
//Chunked
console.log(numbersArray.chunked(3));
//Avedrage
console.log("Array.average() "+numbersArray.average());
//Filter indexed
console.log("Filter indexed: ");
console.log(numbersArray.filterIndexed(index=>index % 2 != 0))
//FilterNot
console.log("Filter not: ");
console.log(persons.filterNot(item=>item.id == 1));
//MaxBy & MinBy
console.log("Max by:");
console.log(persons.maxBy(item=>item.code));
console.log("Min by:")
console.log(stringsArray.minBy(item=>item.length));
//Fold
console.log("Fold:")
console.log(numbersArray.fold(100,item => item));
console.log(stringsArray.fold("Strings: ",item=>` ${item}`));
//AssociateBy
console.log("AssociateBy:");
console.log(persons.associateBy(item=>item.code));
//GroupBy
console.log("groupBy:");
console.log(persons.groupBy(item=>item.code));
//Count
console.log("Count: ");
console.log(persons.count(item=>item.code==300));
//Flatten
console.log("Flatten:")
console.log(arrayOfArrays.flatten());
//DistinctBy
console.log("DistinctBy:");
console.log(persons.distinctBy(item=>item.code));
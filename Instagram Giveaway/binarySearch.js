export function binarySearch(array,item)
{
    var startIndex = 0;
    var lastIndex = array.length;
    var middleIndex;
    var isFound = false;
    while(!isFound && startIndex <= lastIndex)
    {
        middleIndex = Math.floor((startIndex + lastIndex) / 2);
        if(array[middleIndex] === item)
        {
            isFound = true;
            return array[middleIndex];
        }
        if(item < array[middleIndex])
        {
            lastIndex =  middleIndex - 1;
        }
        else
        {
            startIndex = middleIndex + 1;
        }
    }
    return false;
}
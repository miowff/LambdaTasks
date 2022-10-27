export function quickSort(array)
{
    if(array.length<=1)
    {
        return array;
    }
    var referenceIndex = Math.floor(array.length/2);
    var referenceElement = array[referenceIndex];
    var less = [];
    var greater = [];
    for(var i = 0; i < array.length; i++)
    {
        if(i === referenceIndex)
        {
            continue;
        }
        if(array[i] < referenceElement)
        {
            less.push(array[i]);
        }
        else
        {
            greater.push(array[i])
        }
    }
    return quickSort(less).concat(referenceElement, quickSort(greater));
}
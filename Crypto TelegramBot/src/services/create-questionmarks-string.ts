// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createQuestionmarksString(values:any[]):string
{
    let result = '?';
    for(let i=1;i<values.length;i++)
    {
        result+=',?';
    }
    return result;
}
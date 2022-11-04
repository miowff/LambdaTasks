export function generateShortString(stringSize:number)
{
    const chars = ['a','b','d','e','h','k','m','n','p','s',
    'w','x','z','A','B','D','E','F','G','H','K','M','N','P','Q','R','S','T','W','X','Z',
    '1','2','3','4','5','6','7','8','9'];
    let string = '';
    for(let i =0;i<stringSize;i++)
    {
        const position = Math.floor(Math.random() * chars.length);
        string+=chars[position];
    }
    return string;
}
export function ipToInt(ip)
{
    var intIp = 0;
    var splitedIp = ip.split(".");
    for(var i = 0; i < splitedIp.length;i++)
    {
        intIp += Math.pow(256,3 - i) * parseInt(splitedIp[i]); 
    }
    return intIp;
}
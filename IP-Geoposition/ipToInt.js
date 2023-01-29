export function ipToInt(ip) {
  let intIp = 0;
  let splitedIp = ip.split(".");
  for (var i = 0; i < splitedIp.length; i++) {
    intIp += Math.pow(256, 3 - i) * parseInt(splitedIp[i]);
  }
  return intIp;
}

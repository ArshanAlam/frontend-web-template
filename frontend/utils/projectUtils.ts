export function getExternalIpAddress(): string {
  const networkInterface = require("os").networkInterfaces();
  return Object.values(networkInterface)
    .flat()
    .filter((v) => !v.internal)
    .filter((v) => v.family === 'IPv4')
    .map((v) => v.address)
    .shift();
}

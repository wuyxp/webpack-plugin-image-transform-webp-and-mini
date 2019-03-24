const GREEN = '\x1b[32m%s\x1b[0m';
const RED = '\x1b[31m%s\x1b[0m';

export const successLog = (message: string) => {
  console.log(GREEN, message)
}
export const errorLog = (message: string) => {
  console.log(RED, message)
}
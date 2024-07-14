export default () => {
  const bullConnectionString = process.env.BULL_REDIS;
  return bullConnectionString.match(
    /(?<username>\w+):(?<password>\w+)@(?<host>[\w-.]+):(?<port>\w+)/,
  )?.groups;
};

import {Redis} from 'ioredis';

const client = new Redis({
  host: 'redis', 
  port: 6379
});

export default client;


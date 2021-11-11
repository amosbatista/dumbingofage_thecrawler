import got from 'got';

const navigateTo = async (url: string) => {
  const RETRY_LIMIT = 5;
  const TIMEOUT = 30000;
  
  const { body }  = await got(url, {
    timeout: {
      request: TIMEOUT
    },
    retry: {
      limit: RETRY_LIMIT
    }
  });
  
  return body;
};

export default navigateTo;
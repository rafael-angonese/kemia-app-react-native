/* Examples
  const obj = { foo: 'bar', baz: 'tor' };
  const query = { page: 1, per_page: 20 };

  toQueryString(obj)    => ?foo=bar&baz=tor
  toQueryString(query)  => ?page=1&per_page=20
*/

const toQueryString = (object) => {
    let query = '?';
    if (typeof object === 'object') {
      // query += Object.keys(object)
      //   .map((key) => `${key}=${object[key].toString()}`)
      //   .join('&');
      query += Object.entries(object).map(([key, val]) => `${key}=${val}`).join('&');
    }

    return query;
  };

  export default toQueryString;

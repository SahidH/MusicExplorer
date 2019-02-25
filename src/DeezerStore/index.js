const DeezerStore = ({ hasChanged, hasError }) => {
  const store = {};

  const generateKey = ({ type, id }) => {
    return `${type}:${id}`;
  };

  const onChange = () => hasChanged({ store });
  const onError = ({ error, type, id }) => hasError({ error, type, id });

  const generateModel = data => {
    const { id, type } = data;
    store[generateKey({ id, type })] = new Proxy(data, {
      get: (obj, prop) => {
        if (obj[prop]) {
          return obj[prop];
        }
        if (!obj[prop] || !obj[prop].loading) {
          fetch(`/${obj.type}/${obj.id}/${prop}/`)
            .then(response => response.json())
            .then(({ data, total }) => {
              obj[prop] = data.map(generateModel);
              setTimeout(onChange);
              return obj[prop];
            })
            .catch(error => {
              obj[prop].loading = false;
              obj[prop].error = error;
              setTimeout(onError);
            });
        }
        const buffer = [];
        buffer.loading = true;
        obj[prop] = buffer;

        return obj[prop];
      }
    });

    return store[generateKey({ id, type })];
  };

  const search = ({ connection, q }) =>
    fetch(`/search/${connection}/?q=${q}`)
      .then(response => response.json())
      .then(response => {
        const { data, total, next } = response;
        return { result: data.map(generateModel), q };
      });

  return {
    search,
    store
  };
};

export default DeezerStore;

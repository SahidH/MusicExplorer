const DeezerStore = ({ hasChanged, hasError }) => {
  const store = {};

  const generateKey = ({ type, id }) => {
    return `${type}:${id}`;
  };

  const onChange = () => hasChanged({ store });
  const onError = ({ error, type, id }) => hasError({ error, type, id });

  const generateModel = data => {
    const { id, type } = data;
    //proxy object to execute operations when accessing properties
    store[generateKey({ id, type })] = new Proxy(data, {
      get: (obj, prop) => {
        //if property is defined just return it
        if (obj[prop]) {
          return obj[prop];
        }
        if (!obj[prop] || !obj[prop].loading) {
          //try to get the property requested from the api, it is implicit that will be a collection
          fetch(`/${obj.type}/${obj.id}/${prop}/`)
            .then(response => response.json())
            .then(({ data, total }) => {
              //generate same proxy model for the just received data and pass the references
              obj[prop] = data.map(generateModel);
              //required to execute another render loop and allow shallow comparison
              setTimeout(onChange);
              return obj[prop];
            })
            .catch(error => {
              obj[prop].loading = false;
              obj[prop].error = error;
              setTimeout(onError);
            });
        }
        //dummy class to allow the property to behave as Array
        const buffer = [];
        buffer.loading = true;
        obj[prop] = buffer;
        //return the data of the property
        return obj[prop];
      }
    });

    return store[generateKey({ id, type })];
  };

  const search = ({ connection, q }) =>
    fetch(`/search/${connection}/?q=${q}`)
      .then(response => response.json())
      .then(response => {
        const { data } = response;
        return { result: data.map(generateModel), q };
      });

  return {
    search,
    store
  };
};

export default DeezerStore;

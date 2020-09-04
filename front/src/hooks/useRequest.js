import { useState, useEffect } from "react";

export default (apiUrl, defaultValue, options = {}, deps = []) => {
  const [data, setData] = useState(defaultValue);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(apiUrl, options).then((e) => e.json());
      setData(result);
    };

    fetchData();
  }, [apiUrl, ...deps]);

  return {
    data,
  };
};

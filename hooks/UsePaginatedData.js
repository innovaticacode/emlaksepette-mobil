import { useState, useEffect } from "react";
import axios from "axios";
import { getValueFor } from "../components/methods/user";
import { apiUrl } from "../components/methods/apiRequest";

/**
 * UsePaginatedData Hook: Pagination veri çekme işlemleri için kullanılır.
 * @param {string} endpoint - API'nin son noktası (örneğin, "/products").
 * @param {number} limit - Bir seferde alınacak veri sayısı (varsayılan 10).
 * @returns {object} - Veriler, yükleme durumu, hata ve kontrol işlevleri.
 */

const UsePaginatedData = (endpoint, limit = 10) => {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hooksLoading, setHooksLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const retrievedUser = await getValueFor("user");
      if (retrievedUser) {
        setUser(retrievedUser);
      }
    })();
  }, [endpoint]);

  const fetchData = async () => {
    setHooksLoading(true);
    setError(null);
    console.debug(
      `Fetching data for ${endpoint}, skip: ${skip}, limit: ${limit}`
    );

    try {
      const headers = user?.access_token
        ? { Authorization: `Bearer ${user.access_token}` }
        : {};

      const response = await axios.get(`${apiUrl}${endpoint}`, {
        headers,
        params: {
          take: limit,
          skip: skip * limit,
        },
      });

      if (response.data && Array.isArray(response.data)) {
        console.debug("Data received:", response.data);
        setData((prevData) =>
          skip === 0 ? response.data : [...prevData, ...response.data]
        );
      } else {
        setError("Unexpected data structure");
        console.error("Unexpected data structure");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err.message);
    } finally {
      setHooksLoading(false);
      console.debug("Fetching complete");
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, skip]);

  const loadMore = () => {
    console.debug("Loading more data... current skip:", skip);
    setSkip((prevSkip) => prevSkip + limit);
    console.debug("New skip value:", skip + limit);
  };

  return {
    data,
    hooksLoading,
    error,
    loadMore,
    setSkip,
  };
};

export default UsePaginatedData;

import { useState, useEffect } from "react";
import axios from "axios";
import { getValueFor } from "../components/methods/user";
import { apiUrl } from "../components/methods/apiRequest";

/**
 * UsePaginatedData Hook: Pagination veri çekme işlemleri için kullanılır.
 * @param {string} endpoint - API'nin son noktası (örneğin, "real-estates").
 * @param {number} take - Bir seferde alınacak veri sayısı (varsayılan 10).
 * @param {Array} apiData - API'ye gönderilecek ek parametreler (örneğin, [{ key: "step1_slug", value: "konut" }]).
 * @returns {object} - Veriler, yükleme durumu, hata ve kontrol işlevleri.
 */

const UsePaginatedData = (endpoint, take = 10, apiData = []) => {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hooksLoading, setHooksLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const retrievedUser = await getValueFor("user");
        if (retrievedUser) {
          setUser(retrievedUser);
        }
      } catch (error) {
        console.error("Error getting user from async storage", error);
      }
    })();
  }, [endpoint]);

  const fetchData = async () => {
    if (isLastPage) {
      return null;
    }
    setHooksLoading(true);
    setError(null);

    const jsonData = JSON.stringify(
      apiData.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {})
    );

    console.debug("additionalParams", jsonData);

    try {
      const headers = user?.access_token
        ? { Authorization: `Bearer ${user.access_token}` }
        : {};
      const response = await axios.get(`${apiUrl}${endpoint}`, {
        headers,
        params: {
          take: take,
          skip: skip,
          data: jsonData,
        },
      });
      if (response.data && Array.isArray(response.data)) {
        setData((prevData) =>
          skip === 0 ? response.data : [...prevData, ...response.data]
        );
        if (response.data.length < take) {
          setIsLastPage(true);
        }
      } else {
        setError("Unexpected data structure");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setHooksLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, skip]);

  const loadMore = () => {
    if (!isLastPage) {
      setSkip((prevSkip) => prevSkip + take);
    }
  };

  return { data, hooksLoading, error, loadMore, setSkip };
};

export default UsePaginatedData;

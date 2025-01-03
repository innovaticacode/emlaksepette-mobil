import { useState, useEffect } from "react";
import axios from "axios";
import { getValueFor } from "../components/methods/user";
import { apiUrl } from "../components/methods/apiRequest";
import { LogToSentry } from "../utils";

/**
 * UsePaginatedData Hook: Pagination veri çekme işlemleri için kullanılır.
 * @param {string} endpoint - API'nin son noktası (örneğin, "real-estates").
 * @param {number} take - Bir seferde alınacak veri sayısı (varsayılan 10).
 * @param {Array} apiData - API'ye gönderilecek ek parametreler (örneğin, [{ key: "step1_slug", value: "konut" }]).
 * @returns {object} - Veriler, yükleme durumu, hata ve kontrol işlevleri.
 */
const UsePaginatedData = (endpoint, take = 10, apiData = []) => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [hooksLoading, setHooksLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const retrievedUser = await getValueFor("user");
        if (retrievedUser) {
          setUser(retrievedUser);
        }
      } catch (error) {
        LogToSentry(error, {
          section: "user-fetch",
          feature: "retrieve-user",
        });
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
      const { housings, total_count } = response.data.data;
      if (housings) {
        setData((prevData) =>
          skip === 0 ? housings : [...prevData, ...housings]
        );
        setTotalCount(total_count || 0);
        if (housings.length < take) {
          setIsLastPage(true);
        }
      } else {
        const errorMessage = "Unexpected data structure";
        setError(errorMessage);
        LogToSentry(new Error(errorMessage), {
          section: "data-fetch",
          feature: "pagination",
          endpoint,
        });
      }
    } catch (err) {
      setError(err.message);
      LogToSentry(err, {
        section: "data-fetch--paginated-hooks",
        feature: "pagination",
        endpoint,
        user,
        apiData,
      });
    } finally {
      setHooksLoading(false);
    }
  };

  useEffect(() => {
    if (skip >= 0) fetchData();
  }, [skip]);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const loadMore = () => {
    if (!isLastPage) {
      setSkip((prevSkip) => prevSkip + take);
    }
  };

  return { data, totalCount, hooksLoading, error, loadMore, setSkip };
};

export default UsePaginatedData;

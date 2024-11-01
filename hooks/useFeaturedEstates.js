import { useState } from "react";
import { useDispatch } from "react-redux";
import { getEstates } from "../store/slices/Estates/EstatesSlice";

export const useFeaturedEstates = () => {
  const dispatch = useDispatch();

  const [featuredEstates, setFeaturedEstates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeaturedEstates = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    try {
      const { payload } = await dispatch(getEstates({ reset, page }));
      const newEstates = payload?.estates;
      if (reset) {
        setFeaturedEstates(newEstates);
        setPage(2);
        setHasMore(true);
      } else {
        if (newEstates?.length > 0) {
          setFeaturedEstates((prevEstates) => {
            const newUniqueEstates = newEstates.filter((estate) =>
              prevEstates
                ? !prevEstates.some(
                    (prevEstate) => prevEstate?.id === estate.id
                  )
                : true
            );
            return prevEstates
              ? [...prevEstates, ...newUniqueEstates]
              : newUniqueEstates;
          });
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Return the state and the fetch function
  return {
    featuredEstates,
    loading,
    hasMore,
    refreshing,
    fetchFeaturedEstates,
    setRefreshing,
  };
};

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import SearchItem from "../../components/SearchItem";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiUrl, frontEndUriBase } from "../../components/methods/apiRequest";

// Utility functions for AsyncStorage
const saveSearchHistory = async (history) => {
  try {
    await AsyncStorage.setItem("searchHistory", JSON.stringify(history));
  } catch (error) {
    console.error("Error saving search history:", error);
  }
};

const getStoredSearchHistory = async () => {
  try {
    const history = await AsyncStorage.getItem("searchHistory");
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error fetching search history:", error);
    return [];
  }
};

const { width } = Dimensions.get("window");

export default function SearchPage({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({
    housings: [],
    projects: [],
    merchants: [],
  });
  const [showMore, setShowMore] = useState({
    housings: false,
    projects: false,
    merchants: false,
  });
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch initial search history from local storage
  useEffect(() => {
    const fetchSearchHistory = async () => {
      const storedHistory = await getStoredSearchHistory();
      setSearchHistory(storedHistory);
    };
    fetchSearchHistory();
  }, []);

  // Handle search functionality
  const handleSearch = useCallback(
    async (term) => {
      if (!term.trim()) return;

      setLoading(true);

      try {
        const { data } = await axios.get(apiUrl + "get-search-list", {
          params: { searchTerm: term },
          headers: { "Content-Type": "application/json" },
        });
        setResults(data);

        if (term && !searchHistory.includes(term)) {
          const updatedHistory = [term, ...searchHistory];
          setSearchHistory(updatedHistory);
          await saveSearchHistory(updatedHistory);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    },
    [searchHistory]
  );

  const handleSearchTerm = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleClearAllHistory = useCallback(() => {
    setSearchHistory([]);
    saveSearchHistory([]);
  }, []);

  const toggleShowMore = (type) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [type]: !prevShowMore[type],
    }));
  };

  const renderItems = (items, type) => {
    if (!items.length) return null;

    const photoBaseUrl = {
      "Emlak İlanları": frontEndUriBase + "housing_images/",
      "Proje İlanları": frontEndUriBase,
      Üyeler: `${frontEndUriBase}storage/profile_images`,
    }[type];

    const modifyPhotoUrl = (photo) => {
      if (!photo) return photoBaseUrl + "indir.png";
      return type === "Proje İlanları" || type === "Üyeler"
        ? `${photoBaseUrl}${photo.replace("public/", "storage/")}`
        : `${photoBaseUrl}${photo}`;
    };

    const displayedItems = showMore[type] ? items : items.slice(0, 5);
    const showMoreText = showMore[type]
      ? "Daha Az Göster"
      : "Daha Fazla Göster";

    return (
      <View style={styles.resultSection}>
        <Text style={styles.groupTitle}>
          {type} ({items.length} sonuç)
        </Text>
        {displayedItems.map((item) => (
          <SearchItem
            key={item.id}
            photo={modifyPhotoUrl(item.photo)}
            name={item.name}
            onPress={() => {
              const routes = {
                "Emlak İlanları": "AllRealtorAdverts", // Emlak İlanları için yönlendirme
                "Proje İlanları": "Details", // Proje İlanları için yönlendirme
                Üyeler: "Profile", // Üyeler için yönlendirme
              };

              const params = {
                "Emlak İlanları": { houseId: item.id }, // Emlak İlanları için parametre
                "Proje İlanları": { ProjectId: item.id }, // Proje İlanları için parametre
                Üyeler: { id: item.id }, // Üyeler için parametre
              };

              // Eğer 'Proje İlanları' seçilmişse ve detaylar Drawer içinde
              if (type === "Proje İlanları") {
                navigation.navigate("Drawer", {
                  screen: "Details", // Details ekranı
                  params: params[type], // Detayları geçir
                });
              } else {
                // Diğer yönlendirmeler için
                navigation.navigate(routes[type], params[type]);
              }
            }}
          />
        ))}
        {items.length > 5 && (
          <TouchableOpacity onPress={() => toggleShowMore(type)}>
            <Text style={styles.showMoreText}>{showMoreText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search1" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Emlak, Proje veya Mağaza ara"
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={() => handleSearch(searchTerm)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {!searchTerm && searchHistory.length > 0 && (
          <View style={styles.historySection}>
            <View style={styles.historyFlex}>
              <Text style={styles.historyTitle}>Geçmiş Aramalar</Text>
              <TouchableOpacity onPress={handleClearAllHistory}>
                <Text style={styles.clearAllText}>Tümünü Temizle</Text>
              </TouchableOpacity>
            </View>
            {searchHistory.map((term, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSearchTerm(term)}
              >
                <View style={styles.historyItem}>
                  <Text style={styles.historyText}>{term}</Text>
                  <Icon name="right" size={16} color="#E70A12" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {loading ? (
          <Text style={styles.loadingText}>Aranıyor...</Text>
        ) : !results.housings.length &&
          !results.projects.length &&
          !results.merchants.length &&
          searchTerm ? (
          <Text style={styles.noResultsText}>Sonuç bulunamadı</Text>
        ) : (
          <>
            {renderItems(results.housings, "Emlak İlanları")}
            {renderItems(results.projects, "Proje İlanları")}
            {renderItems(results.merchants, "Üyeler")}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ebebeb",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 5,
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 0,
    color: "#333",
    fontSize: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  resultSection: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#e6e6e6",
    borderWidth: 1,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
    paddingVertical: 10,
    marginLeft: 8,
  },
  showMoreText: {
    textAlign: "left",
    fontWeight: "600",
    color: "#E70A12",
    fontSize: 12,
    padding: 10,
  },
  noResultsText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontSize: 16,
  },
  loadingText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontSize: 16,
  },
  historySection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#e6e6e6",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
  historyFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  clearAllText: {
    color: "#E70A12",
    fontWeight: "600",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  historyText: {
    fontSize: 14,
    color: "#333",
  },
});

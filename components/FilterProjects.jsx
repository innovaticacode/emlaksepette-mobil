import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SortModal from "./SortModal";

// tamamlanmadı ihtiyaç olursa filter için kullanılabilir
const FilterProjects = () => {
  const [cityItems, setCityItems] = useState();
  const [state, setState] = useState({
    loading: true,
    isDrawerOpen: false,
    isHidden: false,
    selectedCity: "",
    selectedProjectStatus: "",
    selectedCounty: "",
    selectedNeighborhood: "",
    modalVisible: false,
    sortModalVisible: false,
    neighborhoodTitle: "",
    neighborhoodSlug: "",
    neighborhoods: [],
    countySlug: "",
    countyTitle: "",
    citySlug: "",
    cityTitle: "",
    cityID: null,
    neighborhoodID: null,
    searchStatus: "Yükleniyor...",
    countyID: null,
    filters: [],
    slugItem: null,
    nslug: "",
    checkTitle: "",
    menu: [],
    opt: "",
    housingTypeSlug: "",
    housingTypeParentSlug: "",
    optName: "",
    housingTypeName: "",
    housingTypeSlugName: "",
    slugName: "",
    housingTypeParent: "",
    housingType: "",
    projects: [],
    secondhandHousings: [],
    housingStatuses: [],
    cities: [],
    titleParam: "",
    counties: [],
    optionalParam: null,
    typeParam: "",
    term: "",
    openFilterIndex: null,
    selectedCheckboxes: {},
    selectedRadio: {},
    textInputs: {},
    selectedListingDate: null,
    projectStatuses: [
      { value: 2, label: "Tamamlanan Projeler" },
      { value: 3, label: "Devam Eden Projeler" },
      { value: 5, label: "Topraktan Projeler" },
    ],
    listingDates: [
      { value: 24, label: "Son 24 Saat" },
      { value: 3, label: "Son 3 Gün" },
      { value: 7, label: "Son 7 Gün" },
      { value: 15, label: "Son 15 Gün" },
      { value: 30, label: "Son 30 Gün" },
      { value: 45, label: "Son 45 Gün" },
      { value: 60, label: "Son 60 Gün" },
      { value: 75, label: "Son 75 Gün" },
      { value: 90, label: "Son 90 Gün" },
    ],
  });
  const [selectedSortOption, setSelectedSortOption] = useState("sort");

  const handleSortChange = (value) => {
    console.debug("value:==========>>>> ", value);
    setSelectedSortOption(value);
    setState((prevState) => ({
      ...prevState,
      searchStatus: "Sıralanıyor...",
    }));
    fetchFilteredProjects(buildApiUrl(params), {
      ...filterData, // Son filtreleme verilerini kullan
      sortValue: value,
    });
  };

  //   console.debug("state-----------:", state);

  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: "50%",
            backgroundColor: "#EA2B2E",
            padding: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            setState((prevState) => ({ ...prevState, modalVisible: true }))
          }
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            Filtrele
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setState((prevState) => ({ ...prevState, sortModalVisible: true }))
          }
          style={{
            width: "50%",
            backgroundColor: "#EA2B2E",
            padding: 12,
            justifyContent: "center",
            alignItems: "center",
            borderLeftColor: "white",
            borderLeftWidth: 1,
          }}
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            Sırala
          </Text>
        </TouchableOpacity>
      </View>
      <SortModal
        isVisible={state.sortModalVisible}
        onClose={() =>
          setState((prevState) => ({ ...prevState, sortModalVisible: false }))
        }
        onSortChange={handleSortChange}
        type="project"
        selectedSortOption={selectedSortOption}
      />
    </React.Fragment>
  );
};

export default FilterProjects;

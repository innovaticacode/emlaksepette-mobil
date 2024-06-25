import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Box } from "@react-native-material/core";
import { LinearProgress } from "react-native-elements";
import TypeListScreen from "../../../components/TypeListScreen";

export default function Emlak() {
  const navigation = useNavigation();
  const route = useRoute();
  const baseUrl = "https://mobil.emlaksepette.com/react/";
  const { name } = route.params;
  const [step, setStep] = useState(1);
  const [loadingModal, setLoadingModal] = useState(false);
  const [loading, setLoading] = useState(0);
  const [housingTypes, setHousingTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [projectData, setProjectData] = useState({});
  const [selectedHousingType, setSelectedHousingType] = useState({});
  const [haveBlocks, setHaveBlocks] = useState(false);
  const [slug, setSlug] = useState("");

  const [blocks, setBlocks] = useState([
    {
      name: "housing",
      roomCount: 1,
      rooms: [{}],
    },
  ]);

  const [roomCount, setRoomCount] = useState(1);
  const [allErrors, setAllErrors] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [anotherBlockErrors, setAnotherBlockErrors] = useState(0);
  const [user, setUser] = useState({});
  const setProjectDataFunc = (key, value) => {
    setProjectData({
      ...projectData,
      [key]: value,
    });
  };
  const nextStep = (stepOrder) => {
    setStep(stepOrder);
  };

  useEffect(() => {
    axios.get(baseUrl + "get_current_user").then((res) => {
      setUser(res.data.user);
    });
  }, []);

  function getCoords(elem) {
    // crossbrowser version
    if (elem && elem.getBoundingClientRect()) {
      var box = elem.getBoundingClientRect();

      var body = document.body;
      var docEl = document.documentElement;

      var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      var scrollLeft =
        window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

      var clientTop = docEl.clientTop || body.clientTop || 0;
      var clientLeft = docEl.clientLeft || body.clientLeft || 0;

      var top = box.top + scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;

      return { top: Math.round(top), left: Math.round(left) };
    }
  }


  const createProject = () => {
    var formDataHousing = JSON.parse(
      selectedHousingType?.housing_type?.form_json
    );
    var tempErrors = [];
    var anotherBlockErrorsTemp = [];
    if (!projectData.project_title) {
      tempErrors.push("project_title");
      var element = document.getElementById("project_title");
      window.scrollTo({
        top:
          getCoords(element).top -
          document.getElementById("navbarDefault").offsetHeight -
          30,
        behavior: "smooth", // Yumuşak kaydırma efekti için
      });
    } else {
      if (!projectData.description) {
        var elementDesc = document.getElementById("description");
        window.scrollTo({
          top:
            getCoords(elementDesc).top -
            document.getElementById("navbarDefault").offsetHeight -
            30,
          behavior: "smooth", // Yumuşak kaydırma efekti için
        });
      } else {
        if (blocks.length < 1) {
          if (haveBlocks) {
            anotherBlockErrorsTemp.push("Lütfen bloklarınızı oluşturun");
            anotherBlockErrorsTemp.push(
              "Bloklarınızı oluşturmak için yukarıdaki bloklar yazısının yanındaki + işaretine tıklayın"
            );
          } else {
            anotherBlockErrorsTemp.push(
              "Lütfen aşağıdan konut sayısınız giriniz ve ardından ilan formunu oluştur butonuna tıklayınız"
            );
          }
          var elementCity = document.getElementById("housing-forms");
          window.scrollTo({
            top:
              getCoords(elementCity).top -
              document.getElementById("navbarDefault").offsetHeight -
              30,
            behavior: "smooth", // Yumuşak kaydırma efekti için
          });
        } else {
          var boolCheck = false;
          formDataHousing.forEach((formDataHousing, order) => {
            if (slug == "satilik") {
              if (!formDataHousing.className.includes("project-disabled")) {
                if (
                  !formDataHousing?.className
                    ?.split(" ")
                    .includes("disabled-housing") &&
                  !formDataHousing?.className
                    ?.split(" ")
                    .includes("cover-image-by-housing-type")
                ) {
                  if (formDataHousing.required) {
                    if (blocks.length < 1) {
                      tempErrors.push(formDataHousing.name.replace("[]", ""));
                    } else {
                      if (
                        !blocks[selectedBlock].rooms[selectedRoom][
                          formDataHousing.name
                        ]
                      ) {
                        if (!boolCheck) {
                          console.log(formDataHousing.name);
                          var elementDesc = document.getElementById(
                            formDataHousing.name.replace("[]", "")
                          );
                          if (elementDesc) {
                            window.scrollTo({
                              top:
                                getCoords(elementDesc).top -
                                document.getElementById("navbarDefault")
                                  .offsetHeight -
                                30,
                              behavior: "smooth", // Yumuşak kaydırma efekti için
                            });
                          }

                          boolCheck = true;
                        }
                      }
                    }
                  }
                }
              }
            }
          });
          if (!boolCheck) {
            blocks.forEach((block, blockIndex) => {
              for (var i = 0; i < block.roomCount; i++) {
                if (!blocks[blockIndex].rooms[i]) {
                  if (haveBlocks) {
                    anotherBlockErrorsTemp.push(
                      blocks[blockIndex].name +
                        " bloğunun " +
                        (i + 1) +
                        " nolu konutunun verilerini doldurunuz"
                    );
                  } else {
                    anotherBlockErrorsTemp.push(
                      i + 1 + " nolu konutunun verilerini doldurunuz"
                    );
                  }
                }
              }
            });
            if (anotherBlockErrorsTemp.length > 0) {
              var elementCity = document.getElementById("housing-forms");
              window.scrollTo({
                top:
                  getCoords(elementCity).top -
                  document.getElementById("navbarDefault").offsetHeight -
                  30,
                behavior: "smooth", // Yumuşak kaydırma efekti için
              });
            } else {
              if (!projectData.city_id) {
                var elementCity = document.getElementById("city_id");
                window.scrollTo({
                  top:
                    getCoords(elementCity).top -
                    document.getElementById("navbarDefault").offsetHeight -
                    30,
                  behavior: "smooth", // Yumuşak kaydırma efekti için
                });
              } else {
                if (!projectData.county_id) {
                  var element = document.getElementById("county_id");
                  window.scrollTo({
                    top:
                      getCoords(element).top -
                      document.getElementById("navbarDefault").offsetHeight -
                      30,
                    behavior: "smooth", // Yumuşak kaydırma efekti için
                  });
                } else {
                  if (!projectData.neighbourhood_id) {
                    var element = document.getElementById("neighbourhood_id");
                    window.scrollTo({
                      top:
                        getCoords(element).top -
                        document.getElementById("navbarDefault").offsetHeight -
                        30,
                      behavior: "smooth", // Yumuşak kaydırma efekti için
                    });
                  } else {
                    if (
                      !projectData.coordinates ||
                      projectData.coordinates == "undefined-undefined"
                    ) {
                      var element = document.getElementById("map");
                      window.scrollTo({
                        top:
                          getCoords(element).top -
                          document.getElementById("navbarDefault")
                            .offsetHeight -
                          40,
                        behavior: "smooth", // Yumuşak kaydırma efekti için
                      });
                    } else {
                      if (!projectData.cover_image) {
                        var element = document.getElementById("cover_image");
                        window.scrollTo({
                          top:
                            getCoords(element).top -
                            document.getElementById("navbarDefault")
                              .offsetHeight -
                            40,
                          behavior: "smooth", // Yumuşak kaydırma efekti için
                        });
                      } else {
                        if (!projectData.gallery) {
                          var element = document.getElementById("gallery");
                          window.scrollTo({
                            top:
                              getCoords(element).top -
                              document.getElementById("navbarDefault")
                                .offsetHeight -
                              40,
                            behavior: "smooth", // Yumuşak kaydırma efekti için
                          });
                        } else {
                          if (slug == "gunluk-kiralik") {
                            if (!projectData.rules_confirm) {
                              var element =
                                document.getElementById("finish-tick-id");
                              window.scrollTo({
                                top:
                                  getCoords(element).top -
                                  document.getElementById("navbarDefault")
                                    .offsetHeight -
                                  40,
                                behavior: "smooth", // Yumuşak kaydırma efekti için
                              });
                            }
                          } else {
                            if (!projectData.document) {
                              var element = document.getElementById("document");
                              window.scrollTo({
                                top:
                                  getCoords(element).top -
                                  document.getElementById("navbarDefault")
                                    .offsetHeight -
                                  40,
                                behavior: "smooth", // Yumuşak kaydırma efekti için
                              });
                            } else {
                              if (user.type == "1") {
                                if (!projectData.rules_confirm) {
                                  var element =
                                    document.getElementById("finish-tick-id");
                                  window.scrollTo({
                                    top:
                                      getCoords(element).top -
                                      document.getElementById("navbarDefault")
                                        .offsetHeight -
                                      40,
                                    behavior: "smooth", // Yumuşak kaydırma efekti için
                                  });
                                }
                              } else {
                                if (!projectData.authority_certificate) {
                                  var element = document.getElementById(
                                    "authority_certificate"
                                  );
                                  window.scrollTo({
                                    top:
                                      getCoords(element).top -
                                      document.getElementById("navbarDefault")
                                        .offsetHeight -
                                      40,
                                    behavior: "smooth", // Yumuşak kaydırma efekti için
                                  });
                                } else {
                                  if (!projectData.rules_confirm) {
                                    var element =
                                      document.getElementById("finish-tick-id");
                                    window.scrollTo({
                                      top:
                                        getCoords(element).top -
                                        document.getElementById("navbarDefault")
                                          .offsetHeight -
                                        40,
                                      behavior: "smooth", // Yumuşak kaydırma efekti için
                                    });
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    if (blocks.length > 0) {
      formDataHousing.forEach((formDataHousing) => {
        if (slug == "satilik") {
          if (!formDataHousing.className.includes("project-disabled")) {
            if (
              !formDataHousing?.className
                ?.split(" ")
                .includes("disabled-housing") &&
              !formDataHousing?.className
                ?.split(" ")
                .includes("cover-image-by-housing-type")
            ) {
              if (formDataHousing.required) {
                if (blocks.length < 1) {
                  console.log(formDataHousing);
                  tempErrors.push(formDataHousing.name.replace("[]", ""));
                } else {
                  if (
                    !blocks[selectedBlock].rooms[selectedRoom][
                      formDataHousing.name
                    ]
                  ) {
                    tempErrors.push(formDataHousing.name.replace("[]", ""));
                  }
                }
              }
            }
          }
        }
      });
    }

    setAnotherBlockErrors(anotherBlockErrorsTemp);

    if (!projectData.description) {
      tempErrors.push("description");
    }

    if (!projectData.city_id) {
      tempErrors.push("city_id");
    }

    if (!projectData.county_id) {
      tempErrors.push("county_id");
    }

    if (!projectData.neighbourhood_id) {
      tempErrors.push("neighbourhood_id");
    }

    if (
      !projectData.coordinates ||
      projectData.coordinates == "undefined-undefined"
    ) {
      tempErrors.push("coordinates");
    }

    if (!projectData.cover_image) {
      tempErrors.push("cover_image");
    }

    if (!projectData.gallery) {
      tempErrors.push("gallery");
    }

    if (slug != "gunluk-kiralik") {
      if (!projectData.document) {
        tempErrors.push("document");
      }

      if (user.type != "1") {
        if (!projectData.authority_certificate) {
          tempErrors.push("authority_certificate");
        }
      }
    }

    if (!projectData.rules_confirm) {
      tempErrors.push("rules_confirm");
    }

    console.log(tempErrors);
    setAllErrors(tempErrors);

    if (tempErrors.length == 0 && anotherBlockErrorsTemp.length == 0) {
      setLoadingModal(true);
      const formData = new FormData();

      Object.keys(projectData).forEach((key) => {
        if (!key.includes("_imagex") && !key.includes("_imagesx")) {
          if (Array.isArray(projectData[key])) {
            projectData[key].forEach((data, index) => {
              formData.append(`projectData[${key}][${index}]`, data);
            });
          } else {
            formData.append(`projectData[${key}]`, projectData[key]);
          }
        }
      });

      blocks.forEach((block, blockIndex) => {
        formData.append(`blocks[${blockIndex}][name]`, block.name);
        formData.append(`blocks[${blockIndex}][roomCount]`, block.roomCount);
      });

      var housingTemp = 1;

      blocks.forEach((block, blockIndex) => {
        block.rooms.forEach((room, roomIndex) => {
          Object.keys(room).forEach((key) => {
            if (key == "payDecs") {
              room.payDecs.forEach((payDec, payDecIndex) => {
                formData.append(
                  `room[payDecs][${payDecIndex}][price]`,
                  payDec.price
                );
                formData.append(
                  `room[payDecs][${payDecIndex}][date]`,
                  payDec.date
                );
              });
            } else {
              if (!key.includes("imagex")) {
                formData.append(`room[${key.replace("[]", "")}]`, room[key]);
              }
            }
          });

          housingTemp++;
        });
      });

      formData.append("haveBlocks", haveBlocks);
      formData.append("totalRoomCount", totalRoomCount());
      selectedTypes.forEach((data, index) => {
        formData.append(`selectedTypes[${index}]`, data);
      });
      let requestPromises = [];
      axios
        .post(baseUrl + "create_housing", formData, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data;`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status) {
            setStep(3);
            setLoadingModal(false);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const totalRoomCount = () => {
    var roomCount = 0;
    blocks.map((block) => {
      roomCount += parseInt(block.roomCount);
    });

    return roomCount;
  };
  return (
    <View style={styles.container}>
         <TypeListScreen
        setSlug={setSlug}
        step={step}
        setSelectedHousingType={setSelectedHousingType}
        selectedHousingType={selectedHousingType}
        housingTypes={housingTypes}
        setHousingTypes={setHousingTypes}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        nextStep={nextStep}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

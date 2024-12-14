import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { style } from "./DepositStatusCard.styles";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";

const DepositStatusCard = ({
  approveModal,
  setApproveModal,
  rejectModal,
  setRejectModal,
  icon,
  title,
  content,
  cardColor,
  showButton = false,
  date,
  iconColor = "#FFF",
  iconBgColor,
  titleColor,
}) => {
  return (
    <>
      <View
        style={[
          style.greenCardBody,
          {
            backgroundColor: cardColor,
          },
        ]}
      >
        <View style={style.iconContainer}>
          <View
            style={[style.iconWrapperGreen, { backgroundColor: iconBgColor }]}
          >
            <Icon3 name={icon} color={iconColor} size={30} />
          </View>
        </View>
        <View style={style.textArea}>
          <Text
            style={[
              style.largeBoldtext,
              { textAlign: "center", color: titleColor },
            ]}
          >
            {title}
          </Text>
          <Text style={[style.boldText, { textAlign: "center" }]}>
            {content}
          </Text>
          {showButton && (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={style.okeyBtn}
                onPress={() => setApproveModal(!approveModal)}
              >
                <Text
                  style={[
                    style.boldText,
                    { textAlign: "center", color: "#FFF" },
                  ]}
                >
                  Onayla
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={style.rejectBtn}
                onPress={() => setRejectModal(!rejectModal)}
              >
                <Text
                  style={[
                    style.boldText,
                    { textAlign: "center", color: "#FFF" },
                  ]}
                >
                  İptal Et
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Text
            style={[
              style.boldText,
              { textAlign: "center", color: "#606060", fontSize: 12 },
            ]}
          >
            {date}
          </Text>
        </View>
      </View>
    </>
  );
};

export default DepositStatusCard;

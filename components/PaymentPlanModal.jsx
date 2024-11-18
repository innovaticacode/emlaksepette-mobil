import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Ionicons";
import IconGraph from 'react-native-vector-icons/SimpleLineIcons'
import { addDotEveryThreeDigits } from "./methods/merhod";
import SettingsItem from "./SettingsItem";
import PaymentItem from "./PaymentItem";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
export default function PaymentPlanModal({
  visible,
  onClose,
  title,
  content,
  data,
  RoomOrder,
}) {

  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentItems, setPaymentItems] = useState([]);
  const formatPrice = (price) => addDotEveryThreeDigits(Math.round(price));

  useEffect(() => {
    setPaymentItems([]);
    setTotalPrice(0);
    if (data && RoomOrder !== null) {
      let total = 0;
      const items = [];

      for (
        let _index = 0;
        _index <
        data["pay-dec-count" + RoomOrder];
        _index++
      ) {
        const priceString = addDotEveryThreeDigits(
          data["share_sale[]"] !== "[]"
            ? (data[
              `pay_desc_price${RoomOrder}` + _index
            ] /
              data[
              "number_of_shares[]"
              ]).toFixed(0)
            : data[
            `pay_desc_price${RoomOrder}` + _index
            ]
        );

        const price = parseInt(priceString.replace(/\./g, ""), 10);
        const roundedPrice = Math.round(price);
        total += roundedPrice;

        const date = new Date(
          data[
          "pay_desc_date" + RoomOrder + _index
          ]
        );

        const padZero = (num) => (num < 10 ? `0${num}` : num);

        const formattedDate = `${padZero(date.getDate())}.${padZero(
          date.getMonth() + 1
        )}.${date.getFullYear()}`;

        items.push(
          <View key={_index}>
            <PaymentItem
              header={`${_index + 1} . Ara Ödeme`}
              price={formatPrice(price)}
              date={formattedDate}
              dFlex="column"
            />
          </View>
        );
      }


      setTotalPrice(total);

      setPaymentItems(items);
    }
  }, [data, RoomOrder]);

  const [MonthlyPriceWithoutShare, setMonthlyPriceWithoutShare] = useState(null)
  const [MonthlyPriceWithShare, setMonthlyPriceWithShare] = useState(null)
  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      style={{ margin: 0 }}
      onBackdropPress={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.ModalHeader}>
            <View style={{ width: "70%" }}>
              <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
                {title} Projesinde {RoomOrder} No'lu İlan Ödeme Detayı
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={onClose}>
                <Icon name="closecircle" size={25} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ gap: 6 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingTop: 5, paddingLeft: 12, paddingRight: 12 }}>
              <View style={styles.Icon}>
                <Icon2 name="logo-whatsapp" color={'white'} size={20} />
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#40C351', fontWeight: '600' }}>Ödeme Planı'nı paylaş</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.headerGrey}>
              <Text style={{ color: "#212529", fontSize: 13, fontWeight: "700", textAlign: 'center' }}>
                {title} Projesinde {RoomOrder} No'lu İlan Ödeme Detayı
              </Text>
            </View>
            <View style={styles.ongorulenView}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <IconGraph name="graph" color={'#008001'} size={22} />
                <Text style={{ color: '#28A745', fontSize: 13, fontWeight: '600' }}>Öngörülen Yıllık Kazanç: %{data['projected_earnings[]']}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <IconGraph name="graph" color={'#008001'} size={22} />
                <Text style={{ color: '#28A745', fontSize: 13, fontWeight: '600' }}>Öngörülen Kira Getirisi: {data['ong_kira[]']}TL</Text>
              </View>
            </View>
            <View style={[styles.headerGrey, { padding: 2 }]}>

            </View>
            <View>
              <SettingsItem info={'Peşin:'}
                fontWeight={700}
                numbers={
                  data["share_sale[]"] != "[]" &&
                    data["number_of_shares[]"] ?
                    addDotEveryThreeDigits(
                      (
                        parseInt(
                          data["price[]"].replace('.', '')
                        ) /


                        parseInt(
                          data["number_of_shares[]"].replace('.', '')
                        )

                      ).toFixed(0)
                    ) :
                    (
                      addDotEveryThreeDigits(
                        data["price[]"]) + ''
                    )
                } />
              {data && RoomOrder !== null && data['payment-plan[]'] &&
                JSON.parse(
                  data["payment-plan[]"]
                ) &&
                JSON.parse(
                  data["payment-plan[]"]
                ).includes("taksitli") && (
                  <>
                    <SettingsItem
                      fontWeight={700}
                      info={
                        data["installments[]"] +
                        " " +
                        "Ay Taksitli Fiyat"
                      }
                      numbers={
                        data["share_sale[]"] !== "[]" &&
                          data["number_of_shares[]"]
                          ? addDotEveryThreeDigits(
                            Math.round(
                              data["installments-price[]"] /
                              data["number_of_shares[]"]
                            )
                          ) + "₺"
                          : addDotEveryThreeDigits(
                            Math.round(
                              data["installments-price[]"]
                            )
                          ) + "₺"
                      }
                    />
                    <SettingsItem
                      fontWeight={700}
                      info="Peşinat"
                      numbers={
                        data["share_sale[]"] != "[]" &&
                          data["number_of_shares[]"]
                          ? addDotEveryThreeDigits(
                            Math.round(
                              data["advance[]"] /
                              data["number_of_shares[]"]
                            )
                          ) + "₺"
                          : addDotEveryThreeDigits(
                            Math.round(
                              data["advance[]"]
                            )
                          ) + "₺"
                      }
                    />
                    <SettingsItem
                      fontWeight={700}
                      info="Aylık Ödenecek Tutar"
                      numbers={
                        data["share_sale[]"] != "[]" &&
                          data["number_of_shares[]"]
                          ? addDotEveryThreeDigits(
                            (data["installments-price[]"] /
                              data["number_of_shares[]"] -
                              (parseInt(
                                data["advance[]"]
                              ) /
                                parseInt(
                                  data["number_of_shares[]"]
                                ) +
                                parseInt(totalPrice))) /
                            parseInt(
                              data["installments[]"]
                            )
                          ) + "₺"
                          : addDotEveryThreeDigits(
                            (
                              (parseInt(
                                data["installments-price[]"]
                              ) -
                                (parseInt(
                                  data["advance[]"]
                                ) +
                                  parseInt(totalPrice))) /
                              parseInt(
                                data["installments[]"]
                              )
                            ).toFixed(0)
                          ) + "₺"
                      }
                    />
                    <View style={styles.headerGrey}>
                      <Text style={{ color: "#212529", fontSize: 13, fontWeight: "700", textAlign: 'center' }}>Ara Ödemeler</Text>
                    </View>
                    <View style={{ height: 200 }}>
                      <ScrollView bounces={false}>
                        {paymentItems && paymentItems}
                      </ScrollView>

                    </View>

                  </>
                )


              }
            </View>


          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "95%",

    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  ModalHeader: {
    width: "100%",
    padding: 10,
    backgroundColor: "#EA2C2E",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  Icon: {
    backgroundColor: '#40C351',
    padding: 4,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerGrey: {
    width: '100%',
    backgroundColor: '#EEEEEE',
    padding: 8
  },
  ongorulenView: {
    paddingTop: 10,
    gap: 5,
    paddingLeft: 15,
    paddingRight: 15
  }

});

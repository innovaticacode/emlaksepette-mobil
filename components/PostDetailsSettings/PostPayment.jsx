import { View, Text, StyleSheet } from "react-native";
import React,{useState,useEffect} from "react";
import PaymentItem from "../PaymentItem";
import { addDotEveryThreeDigits } from "../methods/merhod";
import { Platform } from "react-native";

export default function PostPayment({ data, HomeId }) {
  var months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const [paymentItems, setPaymentItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const formatPrice2= (price) => addDotEveryThreeDigits(Math.round(price));

  useEffect(() => {
    setPaymentItems([]);
    setTotalPrice(0);
    if (data && data.projectHousingsList && HomeId !== null) {
      let total = 0;
      const items = [];

      for (
        let _index = 0;
        _index <
        data.projectHousingsList[HomeId][
          "pay-dec-count" + HomeId
        ];
        _index++
      ) {
        const priceString = addDotEveryThreeDigits(
          data.projectHousingsList[HomeId][
            `pay_desc_price${HomeId}` + _index
          ]
        );

        const price = parseInt(priceString.replace(/\./g, ""), 10);
        total += price;

        const date = new Date(
          data.projectHousingsList[HomeId][
            "pay_desc_date" + HomeId+ _index
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
              price={formatPrice2(price)}
              date={formattedDate}
              dFlex="column"
            />
          </View>
        );
      }
      

      setTotalPrice(total);

      setPaymentItems(items);
    }
  }, [data, HomeId]);
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  console.log(data.projectCartOrders[HomeId]?.status)
  return (
    <View style={{ padding: 8 }}>
      <View style={styles.container}>
        <View style={styles.PaymentPlan}>
          {data?.projectHousingsList[HomeId]["off_sale[]"] != "[]" || data.projectCartOrders[HomeId]?.status ==1 ? (
            <>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "grey",
                  fontWeight: "bold",
                }}
              >
                Bu ürün için ödeme detay bilgisi gösterilemiyor!
              </Text>
            </>
          ) : (
            <>
            {
                    data?.projectHousingsList[HomeId]["price[]"] &&
                    <PaymentItem
                header="Peşin Fiyat:"
                price={addDotEveryThreeDigits(
                  data?.projectHousingsList[HomeId]["price[]"]
                )}
                align="center"
                style={{fontSize: 11}}
                top="7"
              />
            }
              {
                  data?.projectHousingsList[HomeId]["installments-price[]"] &&
                  <PaymentItem
                  header={`${data?.projectHousingsList[HomeId]["installments[]"]} Ay Taksitli Fiyat: `}
                  price={addDotEveryThreeDigits(
                    data?.projectHousingsList[HomeId]["installments-price[]"]
                  )}
                  align="center"
                  top="7"
                />
              }
           {
               data?.projectHousingsList[HomeId]["advance[]"] &&
               <PaymentItem
               header="Peşinat:"
               price={addDotEveryThreeDigits(
                 data?.projectHousingsList[HomeId]["advance[]"]
               )}
               align="center"
               top="7"
             />
           }
            {
              data.projectHousingsList[HomeId]['installments-price[]'] &&  data.projectHousingsList[HomeId]['advance[]'] && data.projectHousingsList[HomeId]['installments[]']   &&
              <PaymentItem
              header="Aylık Ödenecek Miktar: "
              price={
                formatAmount( ( parseInt( data.projectHousingsList[HomeId]['installments-price[]'] ) -  ( parseInt( data.projectHousingsList[HomeId]['advance[]']) + parseInt(totalPrice))) / parseInt(data.projectHousingsList[HomeId]['installments[]'] ) ) 
              }
            />
              }
            
             
              {paymentItems && paymentItems}
            </>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",

    top: -20,
    backgroundColor: "#FFFFFF",

    marginVertical: 10,
    height: "auto",
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  PaymentPlan: {
    width: "100%",

    gap: 3,
    padding: 8,
  },
  Info: {
    bottom: 35,
  },
});

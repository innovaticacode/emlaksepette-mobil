import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import RealtorAdvertTab from "./RealtorAdvertTab";
import ProjectAdvertTab from "./ProjectAdvertTab";
import DailyRentTab from "./DailyRentTab";
import { apiRequestGetWithBearer } from "../../../components/methods/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { setdataSummary } from "../../../store/slices/Summary/Summary";
import userData, { getValueFor } from "../../../components/methods/user";

export default function AdvertsPanelTab() {
  const [tab, settab] = useState(0);
const [user, setuser] = useState({})

  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const SummaryRedux = useSelector((state) => state.summary.dataSummary);
  const GetSummary = async () => {
    try {
      setloading(true);
      const res = await apiRequestGetWithBearer("institutional/summary");

      // Redux dispatch işlemleri
      dispatch(
        setdataSummary({
          dataSummary: res.data,
        })
      );
    } catch (err) {
      alert(err); // Hata durumunu alert ile gösteriyoruz
    } finally {
      setloading(false); // İstek bittiğinde loading'i kapatıyoruz
    }
  };
  useEffect(() => {
    GetSummary();
    getValueFor('user',setuser)
  }, [tab]);
console.log(user)
  return (
    <View style={{ flex: 1 }}>
       
            
               <View
               style={{
                 flexDirection:"row",
                   justifyContent:(user.corporate_type=='Emlak Ofisi' || user.corporate_type=='Turizm Amaçlı Kiralama')? 'flex-start': 'space-around',
       
                 backgroundColor: "#fff",
                
               }}
             >
            
               <TouchableOpacity
                 onPress={() => {
                   settab(0);
                 }}
                 style={{
              
                   padding: 12,
                   borderBottomWidth: tab == 0 ? 1 : 0,
                   borderBottomColor: "#EA2C2E",
                 }}
               >
                 <Text
                   style={{
                     color: tab == 0 ? "#EA2C2E" : "#404040",
                     fontWeight: "500",
                     textAlign:'center'
                   }}
                 >
                   Emlak İlanlarım
                 </Text>
               </TouchableOpacity>
                     {
                       user.corporate_type=='İnşaat Ofisi' &&
                       <TouchableOpacity
                       onPress={() => {
                         settab(1);
                       }}
                       style={{
                  
                         padding: 12,
                         borderBottomWidth: tab == 1 ? 1 : 0,
                         borderBottomColor: "#EA2C2E",
                       }}
                     >
                       <Text style={{ color: tab == 1 ? "#EA2C2E" : "#404040",textAlign:'center' }}>
                         Proje İlanlarım
                       </Text>
                     </TouchableOpacity>
        }
       {/* 
                <TouchableOpacity
                 onPress={() => {
                   settab(2);
                 }}
                 style={{
              
                   padding: 12,
                   borderBottomWidth: tab == 2 ? 1 : 0,
                   borderBottomColor: "#EA2C2E",
                 }}
               >
                 <Text style={{ color: tab == 2 ? "#EA2C2E" : "#404040" }}>
                   Günlük Kiralık
                 </Text>
               </TouchableOpacity>  */}
             

            
        </View>
   

      {tab == 0 && <RealtorAdvertTab />}
      {tab == 1 && <ProjectAdvertTab />}
      {tab == 2 && <DailyRentTab />}
    </View>
  );
}

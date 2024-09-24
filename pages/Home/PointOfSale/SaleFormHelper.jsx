export const SaleForms = [
{ key: "point", label: "Faaliyet Alanı Seçiniz", placeholder:"Seçiniz",tab: [2], type: "select" },
{ key: "salePoint", label: "Hangi inşaat ofisinin satış noktası olmak istiyorsunuz?", placeholder:"Seçiniz",tab: [2], type: "input" },
{ key: "firmName", label: "Firma Adı:", placeholder:"Firma adınızı girin",tab: [2], type: "input" },
{ key: "competentName", label: "Yetkili Adı:", placeholder:"Yetkili adınız girin",tab: [2], type: "input" },
{ key: "email", label: "E-posta:", placeholder:"E-posta adresinizi girin",tab: [2], type: "input", keyboardType: "email-address"	
},
{ key: "tel", label: "Telefon:", placeholder:"Telefon numaranızı girin",tab: [2], type: "input", keyboardType: "number-pad" },
{ key: "taxOffice", label: "Vergi Dairesi:", placeholder:"Vergi dairesini girin",tab: [2], type: "input" },
{ key: "taxNumber", label: "Vergi Numarası:", placeholder:"Vergi numaranızı girin", maxlength:10, tab: [2], type: "input" },
{ key: "workerNumber", label: "Çalışan Sayısı:", placeholder:"Çalışan sayısını girin",tab: [2], type: "input" , keyboardType: "number-pad"},

{ key: "city_id", label: "İl:", placeholder:"Seçiniz..",tab: [2], type: "select", data:'cities' },
{ key: "county_id", label: "İlçe:", placeholder:"Seçiniz..",tab: [2], type: "select", data: 'counties'},
{ key: "message", label: "Mesaj:", placeholder:"Mesajını yazın",tab: [2], type: "input" },

];




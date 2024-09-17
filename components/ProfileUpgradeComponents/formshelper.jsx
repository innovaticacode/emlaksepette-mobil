export const Forms = [
  { key: "name", label: "Mağaza Adı", tab: [2], type: "input" },
  {
    key: "mobile_phone",
    label: "Mevcut Telefon Numarası",
    tab: [1],
    type: "input",
    disabled:true
  },
  {
    key: "new_phone_number",
    label: "Yeni Telefon Numarası",
    tab: [1],
    type: "input",
    placeholder:'5********',
    maxlength:15,
    
  },
  { key: "name", label: "Hesap Sahibi Adı Soyadı", tab: [0], type: "input" },
  { key: "store_name", label: "Ticari Unvan", tab: [2], type: "input" },
  { key: "username", label: "Yetkili İsim Soyisim", tab: [2], type: "input" },
  {
    key: "authority_licence",
    label: "Yetki Belgesi No",
    tab: [2],
    isShow: "Emlak Ofisi",
    type: "input",
    maxlength:7
  },
  { key: "iban", label: "İban Numarası", tab: [2,0], type: "input" },
  { key: "website", label: "Web Sitesi", tab: [2], type: "input" },
  { key: "phone", label: "Sabit Telefon", tab: [2], type: "input" , maxlength:9,showArea:true},
  { key: "year", label: "Kaç Yıldır Sektördesiniz", tab: 2, type: "input" },
  { key: "city_id", label: "İl", tab: [2], type: "select" ,data:'cities'},
  { key: "county_id", label: "İlçe", tab: [2], type: "select" ,data:'counties'},
  { key: "neighborhood_id", label: "Mahalle", tab: [2], type: "select",data:'neighborhoods' },
  { key: "taxOfficeCity", label: "Vergi Dairesi İli", tab: [2], type: "select" },
  { key: "taxOffice", label: "Vergi Dairesi", tab: [2], type: "select" },
  { key: "taxNumber", label: "Vergi No", tab: [2], type: "input",maxlength:10 },
];

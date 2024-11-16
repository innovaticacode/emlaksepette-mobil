export const Forms = [
   { key: "name", label: "Mağaza Adı", tab: [4], type: "input" },
  {
    key: "mobile_phone",
    label: "Mevcut Telefon Numarası",
    tab: [2],
    type: "input",
    disabled: true,
  },
  {
    key: "new_phone_number",
    label: "Yeni Telefon Numarası",
    tab: [2],
    type: "input",
    placeholder: "5********",
    maxlength: 15,
  },
  {
    key: "change_reason",
    label: "Değiştirme Sebebi",
    tab: [2],
    type: "input",
    maxlength: 50,
    multinine: true,
  },
  { key: "username", label: "Ad Soyad", tab: [0], type: "input" },
  { key: "store_name", label: "Ticari Unvan", tab: [5], type: "input" },
  // { key: "username", label: "Yetkili İsim Soyisim", tab: [2], type: "input" },
  
  { key: "iban", label: "Iban Numarası", tab: [0], type: "input" },
  { key: "idNumber", label: "TC Kimlik Numarası", tab: [0], type: "input",maxlength:11 },
  { key: "bday", label: "Doğum Tarihi", tab: [0], type: "input" },
  {
    key: "email",
    label: "Mevcut E-Posta",
    tab: [1],
    type: "input",
    disabled: true,
  },
  { key: "new_email", label: "Yeni E-Posta", tab:[1], type: "input" },
  // { key: "about", label: "Hakkında", tab:[4], type: "input", multinine:true },
  { key: "website", label: "Web Sitesi", tab: [4], type: "input" },
  { key: "password", label: "Mevcut Şifre", tab:[3], type: "input" },
  { key: "new_password", label: "Yeni Şifre", tab:[3], type: "input" },
  { key: "new_password_again", label: "Yeni Şifre Tekrar", tab:[3], type: "input" },

  { key: "year", label: "Kaç Yıldır Sektördesiniz", tab: 2, type: "input" },


 
  {
    key: "taxNumber",
    label: "Vergi Kimlik Numarası",
    tab: [5],
    type: "input",
    maxlength: 10,
    disabled:true
  },
  {
    key: "authority_licence",
    label: "Yetki Belgesi No",
    tab: [5],
    isShow: "Emlak Ofisi",
    type: "input",
    maxlength: 7,
  },
  {
    key: "phone",
    label: "Sabit Telefon",
    tab: [5],
    type: "input",
    maxlength: 9,
    showArea: true,
  },
  { key: "city_id", label: "İl", tab: [5], type: "select", data: "cities",header:'Mağaza Adresi' },
  {
    key: "county_id",
    label: "İlçe",
    tab: [5],
    type: "select",
    data: "counties",
    header:'Mağaza Adresi'
  },
  {
    key: "neighborhood_id",
    label: "Mahalle",
    tab: [5],
    type: "select",
    data: "neighborhoods",
    header:'Mağaza Adresi'
  },
  {
    key: "neighborhood_id",
    label: "Açık Adres",
    tab: [5],
    type: "input",
    multinine: true,
    header:'Mağaza Adresi'
  },
];

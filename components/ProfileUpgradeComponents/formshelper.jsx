export const Forms = [
  {
    key: "username",
    label: "Yetkili İsim Soyisim",
    label2: "Adı Soyadı",
    tab: [0],
    type: "input",
    isType: ["1", "2"],
  },
  {
    key: "iban",
    label: "IBAN Numarası",
    label2: "IBAN Numarası",
    tab: [0],
    type: "input",
    isType: ["1"],
  },
  {
    key: "idNumber",
    label: "TC Kimlik Numarası",
    label2: "TC Kimlik Numarası",
    tab: [0],
    type: "input",
    maxlength: 11,
    isType: ["1"],
  },
  {
    key: "name",
    label: "Mağaza Adı",
    tab: [0],
    type: "input",
    isType: ["2"],
  },
  {
    key: "website",
    label: "Web Sitesi (Opsiyonel)",
    tab: [0],
    type: "input",
    isType: ["2"],
  },
  {
    key: "year",
    label: "Sektöre Giriş Tarihi",
    label2: "Doğum Tarihi",
    tab: [0],
    type: "input",
    isType: ["1", "2"],
  },

  {
    key: "email",
    label: "Mevcut E-Posta",
    label2: "Mevcut E-Posta",
    tab: [1],
    type: "input",
    disabled: true,
  },
  {
    key: "new_email",
    label: "Yeni E-Posta",
    label2: "Yeni E-Posta",
    tab: [1],
    type: "input",
  },

  {
    key: "mobile_phone",
    label: "Mevcut Telefon Numarası",
    label2: "Mevcut Telefon Numarası",
    tab: [2],
    type: "input",
    disabled: true,
  },
  {
    key: "new_mobile_phone",
    label: "Yeni Telefon Numarası",
    label2: "Yeni Telefon Numarası",
    tab: [2],
    type: "input",
    placeholder: "5********",
    maxlength: 15,
  },
  {
    key: "change_reason",
    label: "Değiştirme Sebebi",
    label2: "Değiştirme Sebebi",
    tab: [2],
    type: "input",
    maxlength: 50,
    multinine: true,
  },
  { key: "year", label: "Kaç Yıldır Sektördesiniz", tab: 2, type: "input" },

  { key: "password", label: "Mevcut Şifre", tab: [3], type: "input" },
  { key: "new_password", label: "Yeni Şifre", tab: [3], type: "input" },
  {
    key: "new_password_again",
    label: "Yeni Şifre Tekrar",
    tab: [3],
    type: "input",
  },
  // { key: "about", label: "Hakkında", tab:[4], type: "input", multinine:true },

  { key: "name", label: "Mağaza Adı", tab: [4], type: "input" },
  { key: "website", label: "Web Sitesi", tab: [4], type: "input" },

  { key: "store_name", label: "Ticari Unvan", tab: [5], type: "input" },
  {
    key: "corporate_type",
    label: "Faliyet Alanı",
    tab: [5],
    type: "select",
    header: "Mağaza Adresi",
    data: "corporate_types",
  },
  {
    key: "tax_city",
    label: "Vergi Dairesi İli",
    tab: [5],
    type: "select",
    header: "Mağaza Adresi",
    data: "cities",
  },
  {
    key: "",
    label: "Vergi Dairesi",
    tab: [5],
    type: "select",
    header: "Mağaza Adresi",
  },

  {
    key: "taxNumber",
    label: "Vergi Kimlik Numarası",
    tab: [5],
    type: "input",
    maxlength: 10,
    disabled: true,
  },
  {
    key: "phone",
    label: "Sabit Telefon",
    tab: [5],
    type: "input",
    maxlength: 9,
    showArea: true,
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
    key: "city_id",
    label: "İl",
    tab: [5],
    type: "select",
    data: "cities",
    header: "Mağaza Adresi",
  },
  {
    key: "county_id",
    label: "İlçe",
    tab: [5],
    type: "select",
    data: "counties",
    header: "Mağaza Adresi",
  },
  {
    key: "neighborhood_id",
    label: "Mahalle",
    tab: [5],
    type: "select",
    data: "neighborhoods",
    header: "Mağaza Adresi",
  },
  {
    key: "neighborhood_id",
    label: "Açık Adres",
    tab: [5],
    type: "input",
    multinine: true,
    header: "Mağaza Adresi",
  },
];

export const SaleForms = [
  {
    key: "corporateType",
    label: "Satış noktası olmak istediğiniz firmanın faaliyet alanını seçiniz.",
    placeholder: "Seçiniz",
    tab: [2],
    type: "select",
  },
  {
    key: "salePoint",
    label: "Satış noktası olmak istediğiniz firmayı seçiniz.",
    placeholder: "Seçiniz",
    tab: [2],
    type: "input",
  },
  {
    key: "workerNumber",
    label: "Çalışan Sayısı:",
    placeholder: "Çalışan sayısını giriniz",
    tab: [2],
    type: "input",
    keyboardType: "number-pad",
  },

  {
    key: "city_id",
    label: "Şehir:",
    placeholder: "Seçiniz..",
    tab: [2],
    type: "select",
    data: "cities",
  },
  {
    key: "county_id",
    label: "İlçe:",
    placeholder: "Seçiniz..",
    tab: [2],
    type: "select",
    data: "counties",
  },
  {
    key: "message",
    label: "Mesaj:",
    placeholder: "Mesajınızı yazın",
    tab: [2],
    type: "input",
  },
];

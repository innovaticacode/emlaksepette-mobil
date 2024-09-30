export const SaleForms = [
  {
    key: "corporateType",
    label: "Faaliyet Alanı Seçiniz",
    placeholder: "Seçiniz",
    tab: [2],
    type: "select",
  },
  {
    key: "salePoint",
    label: "Hangi inşaat ofisinin satış noktası olmak istiyorsunuz?",
    placeholder: "Seçiniz",
    tab: [2],
    type: "input",
  },
  {
    key: "workerNumber",
    label: "Çalışan Sayısı",
    placeholder: "Çalışan sayısını giriniz",
    tab: [2],
    type: "input",
    keyboardType: "number-pad",
  },

  {
    key: "city_id",
    label: "İl",
    placeholder: "Seçiniz..",
    tab: [2],
    type: "select",
    data: "cities",
  },
  {
    key: "county_id",
    label: "İlçe",
    placeholder: "Seçiniz..",
    tab: [2],
    type: "select",
    data: "counties",
  },
  {
    key: "message",
    label: "Mesaj",
    placeholder: "Mesajını yazın",
    tab: [2],
    type: "input",
  },
];

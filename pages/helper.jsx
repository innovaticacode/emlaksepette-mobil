export const documentView = [
  {
    text: "Vergi Levhası",
    state: "record_document",
    isShow: "All",
    approve: "record_document_approve",
    document: "record_document",
    url: "record_documents",
  },
  {
    text: "İmza Sirküsü",
    state: "tax_document",
    isShow: "All",
    approve: "tax_document_approve",
    document: "tax_document",
    url: "tax_documents",
  },
  {
    text: "Taşınmaz Yetki Belgesi",
    state: "identity_document",
    isShow: "Emlak Ofisi",
    approve: "identity_document_approve",
    document: "identity_document",
    url: "identity_documents",
  },

  {
    text: "Müteahhitlik Belgesi (opsiyonel)",
    state: "identity_document",
    isShow: "İnşaat Ofisi",
    approve: "company_document_approve",
    document: "identity_document",
    url: "identity_documents",
  },
  {
    text: "Acenta Belgesi",
    state: "identity_document",
    isShow: "Turizm Amaçlı Kiralama",
    approve: "identity_document_approve",
    document: "identity_document",
    url: "identity_documents",
  },
  {
    text: "İmzalı Onay Belgesi",
    state: "approve_website",
    isShow: "All",
    approve: "approve_website_approve",
    document: "approve_website",
    url: "approve_websites",
  },
];

export const leftButtonsForPost = [
  {
    title: "İlanı Gör",
    offsale: 4,
    OnlySee: [
      "Emlak Ofisi",
      "İnşaat Ofisi",
      "Banka",
      "Turizm Amaçlı Kiralama",
      "Üretici",
    ],
    type: [1, 2],
    isShowClient: 1,
    BackgroundColor: "#000000",
    key: "ShowAdvert",
  },
  {
    title: "İlanı Gör",
    offsale: 2,
    OnlySee: ["İnşaat Ofisi", "Banka", "Turizm Amaçlı Kiralama", "Üretici"],
    type: [1, 2],
    isShowClient: 1,
    BackgroundColor: "#000000",
    key: "ShowAdvert",
  },
  {
    title: "Sepete Ekle",
    offsale: 2,
    OnlySee: ["Emlak Ofisi"],
    type: [1, 2],
    isShowClient: 0,
    key: "AddBasket",
    BackgroundColor: "#EA2B2E",
  },
  {
    title: "Sepete Ekle",
    offsale: 5,
    OnlySee: [
      "Emlak Ofisi",
      "İnşaat Ofisi",
      "Banka",
      "Turizm Amaçlı Kiralama",
      "Üretici",
    ],
    type: [1, 2],
    isShowClient: 1,
    BackgroundColor: "#EA2B2E",
    key: "AddBasket",
  },
  {
    title: "Satışa Kapalı",
    offsale: 1,
    OnlySee: [
      "Emlak Ofisi",
      "İnşaat Ofisi",
      "Banka",
      "Turizm Amaçlı Kiralama",
      "Üretici",
    ],
    type: [1, 2],
    isShowClient: 1,
    BackgroundColor: "#000000",
  },
];

export const rightButtonsForPost = [
  {
    title: "Teklif Ver",
    offsale: 4,
    OnlySee: [
      "Emlak Ofisi",
      "İnşaat Ofisi",
      "Banka",
      "Turizm Amaçlı Kiralama",
      "Üretici",
    ],
    type: [1, 2],
    isShowClient: 1,
    BackgroundColor: "#FFFFFF",
    key: "GiveOffer",
  },
  {
    title: "Bilgi Al",
    offsale: 2,
    OnlySee: ["İnşaat Ofisi", "Banka", "Turizm Amaçlı Kiralama", "Üretici"],
    isShowClient: 1,
    type: [1, 2],
    BackgroundColor: "#FFFFFF",
    key: "request",
  },
  {
    title: "Ödeme Detayı",
    offsale: 2,
    OnlySee: ["Emlak Ofisi"],
    type: [1, 2],
    isShowClient: 0,
    BackgroundColor: "#FFFFFF",
    key: "PaymentModal",
  },
  {
    title: "Ödeme Detayı",
    offsale: 5,
    OnlySee: [
      "Emlak Ofisi",
      "İnşaat Ofisi",
      "Banka",
      "Turizm Amaçlı Kiralama",
      "Üretici",
    ],
    type: [1, 2],
    isShowClient: 1,
    BackgroundColor: "#FFFFFF",
    key: "PaymentModal",
  },
  {
    title: "Başvur",
    offsale: 1,
    OnlySee: [
      "Emlak Ofisi",
      "İnşaat Ofisi",
      "Banka",
      "Turizm Amaçlı Kiralama",
      "Üretici",
    ],
    type: [1, 2],
    isShowClient: 1,
    BackgroundColor: "#FFFFFF",
    key: "GiveOffer",
  },
];

export const BookmarkStatus = [
  {
    offsale: [2, 5],
    OnlySee: ["Emlak Ofisi"],
    isShowClient: 1,
    offsalePersonal: [5],
  },
];
export const PriceStatus = [
  {
    offsale: 2,
    OnlySee: ["Emlak Ofisi"],

    isShowClient: 0,
    sold: 1,
  },
  {
    offsale: 5,
    OnlySee: [
      "Emlak Ofisi",
      "İnşaat Ofisi",
      "Banka",
      "Turizm Amaçlı Kiralama",
      "Üretici",
    ],

    isShowClient: 1,
    sold: 1,
  },
];

export const areaData = [
  { label: "İstanbul Avrupa (212)", value: 212 },
  { label: "İstanbul Anadolu (216)", value: 216 },
  { label: "Adana (322)", value: 322 },
  { label: "Adıyaman (416)", value: 416 },
  { label: "Afyon (272)", value: 272 },
  { label: "Ağrı (472)", value: 472 },
  { label: "Aksaray (382)", value: 382 },
  { label: "Amasya (358)", value: 358 },
  { label: "Ankara (312)", value: 312 },
  { label: "Antalya (242)", value: 242 },
  { label: "Ardahan (478)", value: 478 },
  { label: "Artvin (466)", value: 466 },
  { label: "Aydın (256)", value: 256 },
  { label: "Balıkesir (266)", value: 266 },
  { label: "Bartın (378)", value: 378 },
  { label: "Batman (488)", value: 488 },
  { label: "Bayburt (458)", value: 458 },
  { label: "Bilecik (228)", value: 228 },
  { label: "Bingöl (426)", value: 426 },
  { label: "Bitlis (434)", value: 434 },
  { label: "Bolu (374)", value: 374 },
  { label: "Burdur (248)", value: 248 },
  { label: "Bursa (224)", value: 224 },
  { label: "Çanakkale (286)", value: 286 },
  { label: "Çankırı (376)", value: 376 },
  { label: "Çorum (364)", value: 364 },
  { label: "Denizli (258)", value: 258 },
  { label: "Diyarbakır (412)", value: 412 },
  { label: "Düzce (380)", value: 380 },
  { label: "Edirne (284)", value: 284 },
  { label: "Elazığ (424)", value: 424 },
  { label: "Erzincan (446)", value: 446 },
  { label: "Erzurum (442)", value: 442 },
  { label: "Eskişehir (222)", value: 222 },
  { label: "Gaziantep (342)", value: 342 },
  { label: "Giresun (454)", value: 454 },
  { label: "Gümüşhane (456)", value: 456 },
  { label: "Hakkari (438)", value: 438 },
  { label: "Hatay (326)", value: 326 },
  { label: "Iğdır (476)", value: 476 },
  { label: "Isparta (246)", value: 246 },
  { label: "İçel (Mersin) (324)", value: 324 },

  { label: "İzmir (232)", value: 232 },
  { label: "Kahramanmaraş (344)", value: 344 },
  { label: "Karabük (370)", value: 370 },
  { label: "Karaman (338)", value: 338 },
  { label: "Kars (474)", value: 474 },
  { label: "Kastamonu (366)", value: 366 },
  { label: "Kayseri (352)", value: 352 },
  { label: "Kırıkkale (318)", value: 318 },
  { label: "Kırklareli (288)", value: 288 },
  { label: "Kırşehir (386)", value: 386 },
  { label: "Kilis (348)", value: 348 },
  { label: "Kocaeli (262)", value: 262 },
  { label: "Konya (332)", value: 332 },
  { label: "Kütahya (274)", value: 274 },
  { label: "Malatya (422)", value: 422 },
  { label: "Manisa (236)", value: 236 },
  { label: "Mardin (482)", value: 482 },
  { label: "Muğla (252)", value: 252 },
  { label: "Muş (436)", value: 436 },
  { label: "Nevşehir (384)", value: 384 },
  { label: "Niğde (388)", value: 388 },
  { label: "Ordu (452)", value: 452 },
  { label: "Osmaniye (328)", value: 328 },
  { label: "Rize (464)", value: 464 },
  { label: "Sakarya (264)", value: 264 },
  { label: "Samsun (362)", value: 362 },
  { label: "Siirt (484)", value: 484 },
  { label: "Sinop (368)", value: 368 },
  { label: "Sivas (346)", value: 346 },
  { label: "Şanlıurfa (414)", value: 414 },
  { label: "Şırnak (486)", value: 486 },
  { label: "Tekirdağ (282)", value: 282 },
  { label: "Tokat (356)", value: 356 },
  { label: "Trabzon (462)", value: 462 },
  { label: "Tunceli (428)", value: 428 },
  { label: "Uşak (276)", value: 276 },
  { label: "Van (432)", value: 432 },
  { label: "Yalova (226)", value: 226 },
  { label: "Yozgat (354)", value: 354 },
  { label: "Zonguldak (372)", value: 372 },
];
export const workTimesItems = [
  {
    label: "Çalışma günleri bilgisi yok",
    text: "Çalışma günleri gösterme",
  },
  {
    label: "Sürekli açık",
    text: "İşletmen her gün 24 saat açık",
  },
  {
    label: "Belirli günler açık",
    text: "Belirli çalışma günlerini girin",
  },
];
export const workDays = [
  {
    label: "Çalışma saatleri bilgisi yok",
    text: "Çalışma saatleri gösterme",
  },
  {
    label: "Hafta İçi açık",
    text: "İşletmen hafta içi günlerinde",
  },
  {
    label: "Belirli saatlerde açık",
    text: "Belirli çalışma saatlerini girin",
  },
];

export const Days = [
  {
    day: "Pazartesi",
    dayShort: "Pzt",
  },
  {
    day: "Salı",
    dayShort: "Sal",
  },
  {
    day: "Çarşamba",
    dayShort: "Çar",
  },
  {
    day: "Perşembe",
    dayShort: "Per",
  },
  {
    day: "Cuma",
    dayShort: "Cum",
  },
  {
    day: "Cumartesi",
    dayShort: "Cmt",
  },
  {
    day: "Pazar",
    dayShort: "Paz",
  },
];

//Mağaza Profili Tabler

export const FranchiseTab = [
  {
    text: "Biz Kimiz",
  },
  {
    text: "İlanlarımız",
  },
  {
    text: "Ofislerimiz",
  },
  {
    text: "Danışmanlarımız",
  },
  {
    text: "Yönetim Ekibi",
  },
  {
    text: "Birincilikler",
  },
];
export const RealEstateOfficeTab = [
  {
    text: "Emlak İlanlarımız",
    tab: 0,
  },
  {
    text: "Hakkımızda",
    tab: 1,
  },
  {
    text: "İletişim Bilgilerimiz",
    tab: 2,
  },
  {
    text: "Değerlendirmelirimiz",
    tab: 3,
  },
  {
    text: "Ekibimiz",
    tab: 3,
  },
];
export const BuilderOffice = [
  {
    text: "Proje İlanlarımız",
  },
  {
    text: "Emlak İlanlarımız",
  },
  {
    text: "Hakkımızda",
  },
  {
    text: "Satış Noktalarımız",
  },
  {
    text: "İletişim Bilgilerimiz",
  },
  {
    text: "Değerlendirmelerimiz",
  },
  {
    text: "Ekibimiz",
  },
];
export const Uretici = [
  {
    text: "İlanlarımız",
  },
  {
    text: "Hakkımızda",
  },

  {
    text: "İletişim Bilgilerimiz",
  },
  {
    text: "Değerlendirmelerimiz",
  },
  {
    text: "Ekibimiz",
  },
];
export const TourismAcent = [
  {
    text: "Günlük Kiralık İlanlarım",
    tab: 0,
  },
  {
    text: "Hakkımızda",
    tab: 1,
  },
  {
    text: "İletişim Bilgilerimiz",
    tab: 2,
  },
  {
    text: "Değerlendirmelirimiz",
    tab: 3,
  },
  {
    text: "Ekibimiz",
    tab: 3,
  },
];

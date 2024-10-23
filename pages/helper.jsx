
export const documentView=[
    {
        text:'Vergi Levhası',
        state:'sicil_belgesi',
        isShow:'All',
        approve:'record_document_approve',
        document:'record_document',
        url:'record_documents'
    },
    {
        text:'İmza Sirküsü',
        state:'vergi_levhası',
        isShow:'All',
        approve:'tax_document_approve',
        document:'tax_document',
        url:'tax_documents'
    },
    {
        text:'Taşınmaz Yetki Belgesi',
        state:'kimlik_belgesi',
        isShow:'Emlak Ofisi',
        approve:'identity_document_approve',
        document:'identity_document',
        url:'identity_documents'
    },
 
    {
        text:'Müteahhitlik Belgesi (opsiyonel)',
        state:'insaat_belgesi',
        isShow:'İnşaat Ofisi',
        approve:'company_document_approve',
        document:'company_document',
        url:'company_documents'
    },
    {
        text:'Acenta Belgesi',
        state:'kimlik_belgesi',
        isShow:'Turizm Amaçlı Kiralama',
        approve:'identity_document_approve',
        document:'identity_document',
        url:'identity_documents'
    },
    {
        text:'İmzalı Onay Belgesi',
        state:'apporove_website',
        isShow:'All',
        approve:'approve_website_approve',
        document:'approve_website',
        url:'approve_websites'
    },

]



export const leftButtonsForPost=[
    {
        title:'İlanı Gör',
        offsale:4,
        OnlySee:['Emlak Ofisi','İnşaat Ofisi','Banka','Turizm Amaçlı Kiralama','Üretici'],
        type:[1,2],
        isShowClient : 1,
        BackgroundColor:'#264ABB',
        key:'ShowAdvert'
    },
    {
        title:'İlanı Gör',
        offsale:2,
        OnlySee:['İnşaat Ofisi','Banka','Turizm Amaçlı Kiralama','Üretici'],
        type:[1,2],
        isShowClient : 1,
          BackgroundColor:'#264ABB',
           key:'ShowAdvert'
    },
    {
        title:'Sepete Ekle',
        offsale:2,
        OnlySee:['Emlak Ofisi'],
        type:[1,2],
        isShowClient : 0,
        key:'AddBasket',
          BackgroundColor:'#264ABB'
    },
    {
        title:'Sepete Ekle',
        offsale:5,
        OnlySee:['Emlak Ofisi','İnşaat Ofisi','Banka','Turizm Amaçlı Kiralama','Üretici'],
        type:[1,2],
        isShowClient : 1,
         BackgroundColor:'#264ABB',
         key:'AddBasket'
    },
    {
        title:'Satışa Kapalı',
        offsale:1,
        OnlySee:['Emlak Ofisi','İnşaat Ofisi','Banka','Turizm Amaçlı Kiralama','Üretici'],
        type:[1,2],
        isShowClient : 1,
        BackgroundColor:'#EA2C2E'
    }
    
]

export const rightButtonsForPost = [
    {
        title:'Teklif Ver',
        offsale:4,
        OnlySee:['Emlak Ofisi','İnşaat Ofisi','Banka','Turizm Amaçlı Kiralama','Üretici'],
        type:[1,2],
        isShowClient : 1,
        BackgroundColor:'#000000',
        key:'GiveOffer'
    },
    {
        title:'Bilgi Al',
        offsale:2,
        OnlySee:['İnşaat Ofisi','Banka','Turizm Amaçlı Kiralama','Üretici'],
        isShowClient : 1,
        type:[1,2],
        BackgroundColor:'#000000',
        key:'request'
    },
    {
        title:'Ödeme Detayı',
        offsale:2,
        OnlySee:['Emlak Ofisi'],
        type:[1,2],
        isShowClient : 0,
        BackgroundColor:'#000000',
        key:'PaymentModal'
    },
    {
        title:'Ödeme Detayı',
        offsale:5,
        OnlySee:['Emlak Ofisi','İnşaat Ofisi','Banka','Turizm Amaçlı Kiralama','Üretici'],
        type:[1,2],
        isShowClient : 1,
        BackgroundColor:'#000000',
        key:'PaymentModal'
    },
    {
        title:'Başvur',
        offsale:1,
        OnlySee:['Emlak Ofisi','İnşaat Ofisi','Banka','Turizm Amaçlı Kiralama','Üretici'],
        type:[1,2],
        isShowClient : 1,
        BackgroundColor:'#000000',
         key:'GiveOffer'
    }
]

export const BookmarkStatus = [
    {
        offsale:[2,5],
        OnlySee:['Emlak Ofisi'],
        isShowClient : 1,
        offsalePersonal:[5],
    }
]
export const PriceStatus = [
    {
        offsale:2,
        OnlySee:['Emlak Ofisi'],
        
        isShowClient : 0,
        sold:1
    },
    {
        offsale:5,
        OnlySee:['Emlak Ofisi','İnşaat Ofisi','Banka','Turizm Amaçlı Kiralama','Üretici'],
       
        isShowClient : 1,
        sold:1
    },
]
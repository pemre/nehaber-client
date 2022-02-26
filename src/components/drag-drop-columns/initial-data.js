const initialData = {
  items: {
    'fr-audio-rfi': {
      id: 'fr-audio-rfi',
      text: 'Journal en français facile',
      type: 'audio',
      imageUrl: 'https://i.imgur.com/gZEhhET.png',
      // url: '',
      showColumns: false,
      showLimit: false,
    },
    'fr-rss-audio-rfi': {
      id: 'fr-rss-audio-rfi',
      text: 'Journal en français facile',
      type: 'rss-audio',
      imageUrl: 'https://i.imgur.com/gZEhhET.png',
      url: 'https://nehaber.herokuapp.com/fr-rss-audio-rfi',
    },
    'nl-rss-audio-npo': {
      id: 'nl-rss-audio-npo',
      text: 'Podcast: De Dag',
      type: 'rss-audio',
      imageUrl: 'https://i.imgur.com/tlPoRsC.png',
      url: 'https://nehaber.herokuapp.com/nl-rss-audio-npo',
    },
    'tr-images-gazeteler': {
      id: 'tr-images-gazeteler',
      text: 'Gazeteler',
      type: 'image-swiper', // 'images'
      imageUrl: 'https://i.imgur.com/o0GEvTe.png',
      url: 'https://nehaber.herokuapp.com/tr-images-gazeteler',
    },
    'tr-finance': {
      id: 'tr-finance',
      text: 'Piyasa',
      type: 'finance',
      imageUrl: 'https://i.imgur.com/5AquV6U.png',
      url: 'https://nehaber.herokuapp.com/tr-finance',
    },
    'tr-rss-bbc-turkce': {
      id: 'tr-rss-bbc-turkce',
      text: 'BBC Türkçe',
      type: 'rss',
      imageUrl: 'https://i.imgur.com/Bbk1Pyf.png',
      url: 'https://nehaber.herokuapp.com/tr-rss-bbc-turkce',
    },
    'tr-rss-deutsche-welle': {
      id: 'tr-rss-deutsche-welle',
      text: 'Deutsche Welle',
      type: 'rss',
      imageUrl: 'https://i.imgur.com/vZx62ri.png',
      url: 'https://nehaber.herokuapp.com/tr-rss-deutsche-welle',
    },
    'tr-rss-webtekno': {
      id: 'tr-rss-webtekno',
      text: 'Webtekno',
      type: 'rss',
      imageUrl: 'https://i.imgur.com/6o8I7kn.png',
      url: 'https://nehaber.herokuapp.com/tr-rss-webtekno',
    },
    'tr-social-eksi-sozluk': {
      id: 'tr-social-eksi-sozluk',
      text: 'Ekşi Sözlük',
      type: 'eksi',
      imageUrl: 'https://i.imgur.com/zOeZ1Yl.png',
      url: 'https://nehaber.herokuapp.com/tr-social-eksi-sozluk',
    },
    'tr-swiper-cumhuriyet': {
      id: 'tr-swiper-cumhuriyet',
      text: 'Cumhuriyet',
      type: 'image-swiper',
      imageUrl: 'https://i.imgur.com/bb2LiXD.png',
      url: 'https://nehaber.herokuapp.com/tr-swiper-cumhuriyet',
    },
    'tr-swiper-odatv': {
      id: 'tr-swiper-odatv',
      text: 'OdaTv',
      type: 'image-swiper',
      imageUrl: 'https://i.imgur.com/Q0Z0wch.png',
      url: 'https://nehaber.herokuapp.com/tr-swiper-odatv',
    },
    'tr-swiper-sozcu': {
      id: 'tr-swiper-sozcu',
      text: 'Sözcü',
      type: 'image-swiper',
      imageUrl: 'https://i.imgur.com/ZQHLLEc.png',
      url: 'https://nehaber.herokuapp.com/tr-swiper-sozcu',
    },
  },
  columns: {
    enabled: {
      id: 'enabled',
      title: 'Enabled',
      itemIds: [],
    },
    disabled: {
      id: 'disabled',
      title: 'Disabled',
      itemIds: [
        'fr-audio-rfi',
        'fr-rss-audio-rfi',
        'nl-rss-audio-npo',
        'tr-finance',
        'tr-images-gazeteler',
        'tr-rss-bbc-turkce',
        'tr-rss-deutsche-welle',
        'tr-rss-webtekno',
        'tr-social-eksi-sozluk',
        'tr-swiper-cumhuriyet',
        'tr-swiper-odatv',
        'tr-swiper-sozcu',
      ],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['enabled', 'disabled'],
};

export default initialData;

export const RULES = [
  // ═══ SILENT LETTERS ═══
  {
    sec: 'silent',
    tag: 'Немые буквы',
    color: '#2d6a4f',
    name: 'Silent K — «kn»',
    hint: 'k перед n не произносится',
    explanation: `Когда слово начинается на «kn», буква K всегда молчит. Произносим только N.
Происходит это из старого германского языка — раньше K произносилась, но со временем её перестали говорить, а написание сохранилось.`,
    examples: [
      { en: "<mark class='silent'>k</mark>nife", tr: '/naɪf/', note: 'нож' },
      {
        en: "<mark class='silent'>k</mark>night",
        tr: '/naɪt/',
        note: 'рыцарь',
      },
      { en: "<mark class='silent'>k</mark>now", tr: '/noʊ/', note: 'знать' },
      { en: "<mark class='silent'>k</mark>nee", tr: '/ni/', note: 'колено' },
      { en: "<mark class='silent'>k</mark>nock", tr: '/nɑk/', note: 'стучать' },
      { en: "<mark class='silent'>k</mark>nit", tr: '/nɪt/', note: 'вязать' },
    ],
    tip: 'Правило без исключений: kn в начале → K всегда молчит.',
  },

  {
    sec: 'silent',
    tag: 'Немые буквы',
    color: '#2d6a4f',
    name: 'Silent W — «wr»',
    hint: 'w перед r не произносится',
    explanation: `Когда слово начинается на «wr», буква W не произносится. Слышим только R.`,
    examples: [
      { en: "<mark class='silent'>w</mark>rite", tr: '/raɪt/', note: 'писать' },
      {
        en: "<mark class='silent'>w</mark>rong",
        tr: '/rɔŋ/',
        note: 'неправильный',
      },
      {
        en: "<mark class='silent'>w</mark>rist",
        tr: '/rɪst/',
        note: 'запястье',
      },
      {
        en: "<mark class='silent'>w</mark>rap",
        tr: '/ræp/',
        note: 'заворачивать',
      },
      {
        en: "<mark class='silent'>w</mark>reck",
        tr: '/rɛk/',
        note: 'крушение',
      },
    ],
    tip: 'wr → только R. Не «врайт», а «райт».',
  },

  {
    sec: 'silent',
    tag: 'Немые буквы',
    color: '#2d6a4f',
    name: 'Silent G/GH — «gn», «gh»',
    hint: 'g и gh часто молчат',
    explanation: `«gn» в начале или конце — G молчит. «gh» в середине или конце слова чаще всего тоже молчит (или читается как F).`,
    examples: [
      { en: "<mark class='silent'>g</mark>naw", tr: '/nɔ/', note: 'грызть' },
      { en: "si<mark class='silent'>g</mark>n", tr: '/saɪn/', note: 'знак' },
      { en: "ni<mark class='silent'>gh</mark>t", tr: '/naɪt/', note: 'ночь' },
      {
        en: "li<mark class='silent'>gh</mark>t",
        tr: '/laɪt/',
        note: 'свет/лёгкий',
      },
      { en: "hi<mark class='silent'>gh</mark>", tr: '/haɪ/', note: 'высокий' },
      {
        en: "enou<mark class='silent'>gh</mark>",
        tr: '/ɪˈnəf/',
        note: 'достаточно',
      },
      { en: "thou<mark class='silent'>gh</mark>", tr: '/ðoʊ/', note: 'хотя' },
      { en: 'rou<mark>gh</mark>', tr: '/rəf/', note: 'грубый (gh=F!)' },
    ],
    tip: `«gh» чаще всего молчит. НО: rough, tough, enough → gh читается как «ф»!`,
    exceptions:
      'rough /rʌf/, tough /tʌf/, cough /kɒf/, laugh /lɑːf/ — здесь gh = «ф»',
  },

  {
    sec: 'silent',
    tag: 'Немые буквы',
    color: '#2d6a4f',
    name: 'Silent B — «mb», «bt»',
    hint: 'b в конце слова после m не произносится',
    explanation: `В комбинации «mb» в конце слова B молчит. Также в «bt» (debt, doubt) B не произносится.`,
    examples: [
      { en: "lam<mark class='silent'>b</mark>", tr: '/læm/', note: 'ягнёнок' },
      {
        en: "clim<mark class='silent'>b</mark>",
        tr: '/klaɪm/',
        note: 'взбираться',
      },
      {
        en: "com<mark class='silent'>b</mark>",
        tr: '/koʊm/',
        note: 'расчёска',
      },
      {
        en: "thum<mark class='silent'>b</mark>",
        tr: '/θəm/',
        note: 'большой палец',
      },
      { en: "de<mark class='silent'>b</mark>t", tr: '/dɛt/', note: 'долг' },
      {
        en: "dou<mark class='silent'>b</mark>t",
        tr: '/daʊt/',
        note: 'сомнение',
      },
    ],
    tip: 'bomb, comb, lamb, thumb, climb — B в конце всегда молчит.',
  },

  {
    sec: 'silent',
    tag: 'Немые буквы',
    color: '#2d6a4f',
    name: 'Silent H',
    hint: 'h молчит в начале и в некоторых комбинациях',
    explanation: `H молчит в словах французского происхождения и в комбинациях «wh», «rh». В «wh» в британском английском часто слышится просто «в».`,
    examples: [
      { en: "<mark class='silent'>h</mark>our", tr: '/aʊər/', note: 'час' },
      {
        en: "<mark class='silent'>h</mark>onour",
        tr: '/ˈɑnər/',
        note: 'честь',
      },
      { en: "<mark class='silent'>wh</mark>at", tr: '/wət/', note: 'что' },
      { en: "<mark class='silent'>wh</mark>en", tr: '/wɪn/', note: 'когда' },
      {
        en: "<mark class='silent'>rh</mark>ythm",
        tr: '/ˈrɪðəm/',
        note: 'ритм',
      },
      {
        en: "ve<mark class='silent'>h</mark>icle",
        tr: '/ˈviɪkəl/',
        note: 'транспорт',
      },
    ],
    tip: 'hour, honour, heir — H всегда молчит (артикль «an», не «a»: an hour).',
  },

  {
    sec: 'silent',
    tag: 'Немые буквы',
    color: '#2d6a4f',
    name: 'Silent L',
    hint: 'l молчит в -alf, -alk, -alm, -ould',
    explanation: `В некоторых сочетаниях L не произносится: «alk», «alf», «alm», «ould».`,
    examples: [
      { en: "wa<mark class='silent'>l</mark>k", tr: '/wɔk/', note: 'ходить' },
      { en: "ta<mark class='silent'>l</mark>k", tr: '/tɔk/', note: 'говорить' },
      { en: "ha<mark class='silent'>l</mark>f", tr: '/hæf/', note: 'половина' },
      {
        en: "ca<mark class='silent'>l</mark>m",
        tr: '/kɑm/',
        note: 'спокойный',
      },
      { en: "pa<mark class='silent'>l</mark>m", tr: '/pɑm/', note: 'ладонь' },
      { en: "cou<mark class='silent'>l</mark>d", tr: '/kʊd/', note: 'мог бы' },
      {
        en: "wou<mark class='silent'>l</mark>d",
        tr: '/wʊd/',
        note: 'хотел бы',
      },
      {
        en: "shou<mark class='silent'>l</mark>d",
        tr: '/ʃʊd/',
        note: 'следует',
      },
    ],
    tip: 'could, would, should — L всегда молчит. «Куд», «вуд», «шуд».',
  },

  {
    sec: 'silent',
    tag: 'Немые буквы',
    color: '#2d6a4f',
    name: 'Silent E в конце',
    hint: 'финальная E меняет гласную, сама не читается',
    explanation: `Финальная немая «e» не произносится сама, но МЕНЯЕТ звук предыдущей гласной — делает её долгой (говорящей своё имя).`,
    examples: [
      {
        en: "ma<mark class='silent'>d</mark> → ma<mark>de</mark>",
        tr: '/mæd/ → /meɪd/',
        note: 'безумный → сделал',
      },
      { en: 'bi<mark>te</mark>', tr: '/baɪt/', note: 'кусать (i = «ай»)' },
      { en: 'ho<mark>pe</mark>', tr: '/hoʊp/', note: 'надежда (o = «оу»)' },
      { en: 'tu<mark>ne</mark>', tr: '/tun/', note: 'мелодия (u = «ью»)' },
      { en: 'rid<mark>e</mark>', tr: '/raɪd/', note: 'ехать' },
      { en: 'cu<mark>te</mark>', tr: '/kjut/', note: 'милый' },
    ],
    tip: `Правило «magic e»: согласная + e → предыдущая гласная читается как в алфавите.\nа→эй, i→ай, o→оу, u→ью`,
  },

  // ═══ VOWEL COMBINATIONS ═══
  {
    sec: 'vowels',
    tag: 'Гласные',
    color: '#1d4e8f',
    name: 'EA — три разных звука',
    hint: 'ea читается по-разному в разных словах',
    explanation: `Буквосочетание «ea» — одно из самых коварных в английском. Оно может читаться тремя разными способами, и нет 100% правила — нужно запоминать.`,
    examples: [
      {
        en: "<mark class='blue'>ea</mark>t",
        tr: '/it/',
        note: 'есть (еду) — /iː/',
      },
      {
        en: "t<mark class='blue'>ea</mark>ch",
        tr: '/tiʧ/',
        note: 'учить — /iː/',
      },
      { en: "s<mark class='blue'>ea</mark>", tr: '/si/', note: 'море — /iː/' },
      {
        en: "br<mark class='blue'>ea</mark>d",
        tr: '/brɛd/',
        note: 'хлеб — /e/',
      },
      {
        en: "h<mark class='blue'>ea</mark>d",
        tr: '/hɛd/',
        note: 'голова — /e/',
      },
      {
        en: "d<mark class='blue'>ea</mark>d",
        tr: '/dɛd/',
        note: 'мёртвый — /e/',
      },
      {
        en: "gr<mark class='blue'>ea</mark>t",
        tr: '/greɪt/',
        note: 'великий — /eɪ/',
      },
      {
        en: "st<mark class='blue'>ea</mark>k",
        tr: '/steɪk/',
        note: 'стейк — /eɪ/',
      },
    ],
    tip: `ea = «и» (чаще всего): eat, sea, teach\nea = «э» (перед d/th/lth): bread, head, health\nea = «эй» (редко): great, steak, break`,
    exceptions: 'great, steak, break, yea — ea читается «эй»',
  },

  {
    sec: 'vowels',
    tag: 'Гласные',
    color: '#1d4e8f',
    name: 'OO — длинный и короткий звук',
    hint: 'oo = «у» длинное или «у» короткое',
    explanation: `«oo» чаще всего читается как долгое «уу». Но в ряде слов — короткое «у». Правила нет — только запоминание.`,
    examples: [
      { en: "f<mark class='blue'>oo</mark>d", tr: '/fud/', note: 'еда — /uː/' },
      {
        en: "sch<mark class='blue'>oo</mark>l",
        tr: '/skul/',
        note: 'школа — /uː/',
      },
      {
        en: "m<mark class='blue'>oo</mark>n",
        tr: '/mun/',
        note: 'луна — /uː/',
      },
      {
        en: "b<mark class='blue'>oo</mark>k",
        tr: '/bʊk/',
        note: 'книга — /ʊ/',
      },
      {
        en: "l<mark class='blue'>oo</mark>k",
        tr: '/lʊk/',
        note: 'смотреть — /ʊ/',
      },
      {
        en: "g<mark class='blue'>oo</mark>d",
        tr: '/gʊd/',
        note: 'хороший — /ʊ/',
      },
      {
        en: "bl<mark class='blue'>oo</mark>d",
        tr: '/bləd/',
        note: 'кровь — /ʌ/ (!)',
      },
      {
        en: "fl<mark class='blue'>oo</mark>r",
        tr: '/flɔr/',
        note: 'пол — /ɔː/ (!)',
      },
    ],
    tip: `oo = «уу» (длинное): food, school, moon\noo = «у» (короткое): book, look, good\nblood, flood → «а» — исключение!`,
    exceptions: 'blood /blʌd/, flood /flʌd/ — читается как «а»!',
  },

  {
    sec: 'vowels',
    tag: 'Гласные',
    color: '#1d4e8f',
    name: 'OU / OW — звуки «ау» и «оу»',
    hint: 'ou и ow дают разные звуки',
    explanation: `«ou» и «ow» могут давать звук «ау» (как в «ay»), «оу» или даже «uu». Зависит от слова.`,
    examples: [
      {
        en: "h<mark class='blue'>ou</mark>se",
        tr: '/haʊs/',
        note: 'дом — /aʊ/',
      },
      {
        en: "m<mark class='blue'>ou</mark>th",
        tr: '/maʊθ/',
        note: 'рот — /aʊ/',
      },
      { en: "sh<mark class='blue'>ow</mark>", tr: '/ʃoʊ/', note: 'шоу — /əʊ/' },
      {
        en: "kn<mark class='blue'>ow</mark>",
        tr: '/noʊ/',
        note: 'знать — /əʊ/',
      },
      {
        en: "c<mark class='blue'>ow</mark>",
        tr: '/kaʊ/',
        note: 'корова — /aʊ/',
      },
      {
        en: "s<mark class='blue'>ou</mark>p",
        tr: '/sup/',
        note: 'суп — /uː/ (!)',
      },
      { en: "y<mark class='blue'>ou</mark>", tr: '/ju/', note: 'ты/вы — /uː/' },
      {
        en: "th<mark class='blue'>ou</mark>gh",
        tr: '/ðoʊ/',
        note: 'хотя — /əʊ/',
      },
    ],
    tip: 'ow перед согласной чаще «оу», перед -n/-l чаще «ау» (own→оун — исключение). soup, you → «у».',
  },

  {
    sec: 'vowels',
    tag: 'Гласные',
    color: '#1d4e8f',
    name: 'IE / EI — «и» или «эй»?',
    hint: 'знаменитое правило i before e',
    explanation: `Классическое правило: «i before e except after c» — пишем ie, кроме случаев после c, где пишем ei. Но исключений масса!`,
    examples: [
      {
        en: "bel<mark class='blue'>ie</mark>ve",
        tr: '/bɪˈliv/',
        note: 'верить — ie = «и»',
      },
      {
        en: "ach<mark class='blue'>ie</mark>ve",
        tr: '/əˈʧiv/',
        note: 'достичь — ie = «и»',
      },
      {
        en: "r<mark class='blue'>ei</mark>gn",
        tr: '/reɪn/',
        note: 'царствовать — ei = «эй»',
      },
      {
        en: "rec<mark class='blue'>ei</mark>ve",
        tr: '/rɪˈsiv/',
        note: 'получать — ei после c',
      },
      {
        en: "c<mark class='blue'>ei</mark>ling",
        tr: '/ˈsilɪŋ/',
        note: 'потолок — ei после c',
      },
      {
        en: "w<mark class='blue'>ei</mark>rd",
        tr: '/wɪrd/',
        note: 'странный — исключение!',
      },
      { en: "th<mark class='blue'>ei</mark>r", tr: '/ðɛr/', note: 'их — /eə/' },
      {
        en: "fr<mark class='blue'>ie</mark>nd",
        tr: '/frɛnd/',
        note: 'друг — ie = «э»! (!)',
      },
    ],
    tip: `i before e: believe, achieve, piece\nexcept after c: receive, ceiling, deceive\nИсключения: weird, their, friend (ie=«э»!)`,
    exceptions:
      'weird, seize, either, neither, foreign, height — нарушают правило',
  },

  {
    sec: 'vowels',
    tag: 'Гласные',
    color: '#1d4e8f',
    name: 'OA — звук «оу»',
    hint: 'oa всегда читается как «оу»',
    explanation: `Буквосочетание «oa» почти всегда читается как долгое «оу». Одно из надёжных правил.`,
    examples: [
      { en: "b<mark class='blue'>oa</mark>t", tr: '/boʊt/', note: 'лодка' },
      { en: "c<mark class='blue'>oa</mark>t", tr: '/koʊt/', note: 'пальто' },
      { en: "r<mark class='blue'>oa</mark>d", tr: '/roʊd/', note: 'дорога' },
      { en: "s<mark class='blue'>oa</mark>p", tr: '/soʊp/', note: 'мыло' },
      { en: "t<mark class='blue'>oa</mark>st", tr: '/toʊst/', note: 'тост' },
      { en: "thr<mark class='blue'>oa</mark>t", tr: '/θroʊt/', note: 'горло' },
    ],
    tip: 'oa = «оу» — правило надёжное. Запомни: boat, coat, road, soap.',
  },

  {
    sec: 'vowels',
    tag: 'Гласные',
    color: '#1d4e8f',
    name: 'AI / AY — звук «эй»',
    hint: 'ai и ay = «эй»',
    explanation: `«ai» в середине слова и «ay» в конце слова всегда дают звук «эй».`,
    examples: [
      { en: "tr<mark class='blue'>ai</mark>n", tr: '/treɪn/', note: 'поезд' },
      { en: "r<mark class='blue'>ai</mark>n", tr: '/reɪn/', note: 'дождь' },
      { en: "s<mark class='blue'>ay</mark>", tr: '/seɪ/', note: 'говорить' },
      { en: "d<mark class='blue'>ay</mark>", tr: '/deɪ/', note: 'день' },
      { en: "pl<mark class='blue'>ay</mark>", tr: '/pleɪ/', note: 'играть' },
      { en: "w<mark class='blue'>ai</mark>t", tr: '/weɪt/', note: 'ждать' },
    ],
    tip: 'ai = ay = «эй». Правило без исключений для базовых слов.',
  },

  {
    sec: 'vowels',
    tag: 'Гласные',
    color: '#1d4e8f',
    name: 'ER / IR / UR — звук «ё»',
    hint: 'все три читаются одинаково',
    explanation: `Буквосочетания «er», «ir», «ur» все дают один и тот же звук /ɜː/ — похожий на русское «ё» без начального «й». Это один из самых частых звуков в английском!`,
    examples: [
      { en: "h<mark class='blue'>er</mark>", tr: '/hər/', note: 'её' },
      { en: "t<mark class='blue'>ur</mark>n", tr: '/tərn/', note: 'поворот' },
      { en: "b<mark class='blue'>ir</mark>d", tr: '/bərd/', note: 'птица' },
      { en: "w<mark class='blue'>or</mark>d", tr: '/wərd/', note: 'слово' },
      { en: "l<mark class='blue'>ear</mark>n", tr: '/lərn/', note: 'учить' },
      { en: "h<mark class='blue'>ear</mark>d", tr: '/hərd/', note: 'слышал' },
    ],
    tip: 'er=ir=ur=or(before d/k/m)=ear — все дают «ё». Очень важный звук!',
  },

  // ═══ CONSONANTS ═══
  {
    sec: 'consonants',
    tag: 'Согласные',
    color: '#7b2d8b',
    name: 'TH — два разных звука',
    hint: 'th = «θ» (глухое) или «ð» (звонкое)',
    explanation: `«th» — буквосочетание, которого нет в русском. Произносится двумя способами:\n1. Глухое /θ/ — кончик языка между зубами, воздух без голоса (как «с» кончиком языка)\n2. Звонкое /ð/ — то же, но с голосом (как «з» кончиком языка)`,
    examples: [
      {
        en: "<mark class='purple'>th</mark>ink",
        tr: '/θɪŋk/',
        note: 'думать — глухое',
      },
      {
        en: "<mark class='purple'>th</mark>ree",
        tr: '/θri/',
        note: 'три — глухое',
      },
      {
        en: "brea<mark class='purple'>th</mark>e",
        tr: '/brið/',
        note: 'дышать — звонкое',
      },
      {
        en: "<mark class='purple'>th</mark>is",
        tr: '/ðɪs/',
        note: 'это — звонкое',
      },
      {
        en: "<mark class='purple'>th</mark>e",
        tr: '/ðə/',
        note: 'артикль — звонкое',
      },
      {
        en: "wi<mark class='purple'>th</mark>",
        tr: '/wɪð/',
        note: 'с (предлог) — звонкое',
      },
      {
        en: "<mark class='purple'>th</mark>rough",
        tr: '/θru/',
        note: 'через — глухое',
      },
      {
        en: "<mark class='purple'>th</mark>ough",
        tr: '/ðoʊ/',
        note: 'хотя — звонкое',
      },
    ],
    tip: `Глухое θ: think, three, thank, tooth, bath\nЗвонкое ð: the, this, that, them, with, breathe\nМестоимения и артикли → всегда звонкое ð.`,
  },

  {
    sec: 'consonants',
    tag: 'Согласные',
    color: '#7b2d8b',
    name: 'CH — три варианта',
    hint: 'ch = «ч», «к», или «ш»',
    explanation: `«ch» обычно читается «ч», но в словах греческого происхождения — «к», а в словах французского происхождения — «ш».`,
    examples: [
      {
        en: "<mark class='purple'>ch</mark>air",
        tr: '/ʧɛr/',
        note: 'стул — «ч»',
      },
      {
        en: "<mark class='purple'>ch</mark>urch",
        tr: '/ʧərʧ/',
        note: 'церковь — «ч»',
      },
      {
        en: "s<mark class='purple'>ch</mark>ool",
        tr: '/skul/',
        note: 'школа — «к»',
      },
      {
        en: "<mark class='purple'>ch</mark>emist",
        tr: '/ˈkɛmɪst/',
        note: 'химик — «к»',
      },
      {
        en: "<mark class='purple'>ch</mark>aracter",
        tr: '/ˈkɛrɪktər/',
        note: 'персонаж — «к»',
      },
      {
        en: "ma<mark class='purple'>ch</mark>ine",
        tr: '/məˈʃin/',
        note: 'машина — «ш»',
      },
      {
        en: "<mark class='purple'>ch</mark>ef",
        tr: '/ʃɛf/',
        note: 'шеф-повар — «ш»',
      },
    ],
    tip: `ch = «ч» (чаще всего)\nch = «к» в словах: school, echo, chaos, chemistry\nch = «ш» в словах: machine, chef, champagne`,
  },

  {
    sec: 'consonants',
    tag: 'Согласные',
    color: '#7b2d8b',
    name: 'G — твёрдое и мягкое',
    hint: 'g перед e/i/y читается «дж»',
    explanation: `«g» читается как «г», но перед e, i, y может читаться как «дж». Это называется «мягкое g». Правило НЕ абсолютное — много исключений.`,
    examples: [
      {
        en: "<mark class='purple'>g</mark>ame",
        tr: '/geɪm/',
        note: 'игра — твёрдое',
      },
      {
        en: "<mark class='purple'>g</mark>et",
        tr: '/gɪt/',
        note: 'получать — твёрдое (исключение!)',
      },
      {
        en: "<mark class='purple'>g</mark>irl",
        tr: '/gərl/',
        note: 'девочка — твёрдое (исключение!)',
      },
      {
        en: "<mark class='purple'>g</mark>entle",
        tr: '/ˈʤɛnəl/',
        note: 'мягкий — мягкое',
      },
      {
        en: "<mark class='purple'>g</mark>enerate",
        tr: '/ˈʤɛnərˌeɪt/',
        note: 'генерировать — мягкое',
      },
      {
        en: "ima<mark class='purple'>g</mark>ine",
        tr: '/ˌɪˈmæʤən/',
        note: 'представлять — мягкое',
      },
      {
        en: "<mark class='purple'>g</mark>ym",
        tr: '/ʤɪm/',
        note: 'зал — мягкое',
      },
    ],
    tip: `g + e/i/y → обычно «дж»: gym, gentle, imagine\nНО исключения: get, give, girl, begin — «г»!`,
    exceptions: 'get, give, girl, begin, gift, tiger — g остаётся твёрдым',
  },

  {
    sec: 'consonants',
    tag: 'Согласные',
    color: '#7b2d8b',
    name: 'C — «к» или «с»?',
    hint: 'c перед e/i/y читается «с»',
    explanation: `«c» читается как «к» почти везде, кроме случаев перед e, i, y — тогда «с».`,
    examples: [
      {
        en: "<mark class='purple'>c</mark>ar",
        tr: '/kɑr/',
        note: 'машина — «к»',
      },
      {
        en: "<mark class='purple'>c</mark>old",
        tr: '/koʊld/',
        note: 'холод — «к»',
      },
      {
        en: "<mark class='purple'>c</mark>ity",
        tr: '/ˈsɪti/',
        note: 'город — «с»',
      },
      {
        en: "<mark class='purple'>c</mark>enter",
        tr: '/ˈsɛnər/',
        note: 'центр — «с»',
      },
      {
        en: "<mark class='purple'>c</mark>ycle",
        tr: '/ˈsaɪkəl/',
        note: 'цикл — «с»',
      },
      {
        en: "fa<mark class='purple'>c</mark>e",
        tr: '/feɪs/',
        note: 'лицо — «с»',
      },
      {
        en: "<mark class='purple'>c</mark>ertain",
        tr: '/ˈsərtən/',
        note: 'уверенный — «с»',
      },
    ],
    tip: 'c + e/i/y → «с»: city, center, cycle, face\nc + a/o/u/согл → «к»: car, cold, cup, class',
  },

  {
    sec: 'consonants',
    tag: 'Согласные',
    color: '#7b2d8b',
    name: 'QU — всегда «кв»',
    hint: 'qu читается «кв», q без u не бывает',
    explanation: `В английском Q всегда идёт с U, и читается «кв». Исключение — слова из французского, где qu = «к».`,
    examples: [
      {
        en: "<mark class='purple'>qu</mark>een",
        tr: '/kwin/',
        note: 'королева',
      },
      {
        en: "<mark class='purple'>qu</mark>ick",
        tr: '/kwɪk/',
        note: 'быстрый',
      },
      {
        en: "<mark class='purple'>qu</mark>iet",
        tr: '/kwaɪət/',
        note: 'тихий',
      },
      {
        en: "<mark class='purple'>qu</mark>estion",
        tr: '/kˈwɛʃən/',
        note: 'вопрос',
      },
      {
        en: "<mark class='purple'>qu</mark>eue",
        tr: '/kju/',
        note: 'очередь — «к» (!)',
      },
      {
        en: "uni<mark class='purple'>qu</mark>e",
        tr: '/juˈnik/',
        note: 'уникальный — «к» (!)',
      },
    ],
    tip: `qu = «кв»: queen, quick, quiet\nНО в словах французского происхождения: unique, queue → «к»`,
  },

  {
    sec: 'consonants',
    tag: 'Согласные',
    color: '#7b2d8b',
    name: 'PH — звук «ф»',
    hint: 'ph = «ф» в словах греческого происхождения',
    explanation: `«ph» читается как «ф» — это наследство греческого алфавита, где буква «фи» φ передавалась через ph.`,
    examples: [
      {
        en: "<mark class='purple'>ph</mark>one",
        tr: '/foʊn/',
        note: 'телефон',
      },
      {
        en: "<mark class='purple'>ph</mark>oto",
        tr: '/ˈfoʊˌtoʊ/',
        note: 'фото',
      },
      {
        en: "al<mark class='purple'>ph</mark>abet",
        tr: '/ˈælfəˌbɛt/',
        note: 'алфавит',
      },
      {
        en: "em<mark class='purple'>ph</mark>asize",
        tr: '/ˈɛmfəˌsaɪz/',
        note: 'подчёркивать',
      },
      {
        en: "ele<mark class='purple'>ph</mark>ant",
        tr: '/ˈɛləfənt/',
        note: 'слон',
      },
      {
        en: "tri<mark class='purple'>umph</mark>",
        tr: '/traɪəmf/',
        note: 'победа',
      },
    ],
    tip: 'ph = «ф» всегда. Правило без исключений.',
  },

  // ═══ WORD ENDINGS ═══
  {
    sec: 'endings',
    tag: 'Окончания',
    color: '#b5451b',
    name: 'Окончание -ED: три произношения',
    hint: '-ed читается «т», «д» или «ид»',
    explanation: `Прошедшее время глаголов (-ed) читается по-разному в зависимости от последнего звука основы глагола:
1. /t/ — после глухих согласных (p,k,s,f,sh,ch,x)
2. /d/ — после гласных и звонких согласных
3. /ɪd/ — только после t и d`,
    examples: [
      { en: 'talk<mark>ed</mark>', tr: '/tɔkt/', note: 'говорил — «т»' },
      { en: 'work<mark>ed</mark>', tr: '/wərkt/', note: 'работал — «т»' },
      { en: 'wash<mark>ed</mark>', tr: '/wɑʃt/', note: 'мыл — «т»' },
      { en: 'play<mark>ed</mark>', tr: '/pleɪd/', note: 'играл — «д»' },
      { en: 'call<mark>ed</mark>', tr: '/kɔld/', note: 'звонил — «д»' },
      { en: 'lov<mark>ed</mark>', tr: '/ləvd/', note: 'любил — «д»' },
      { en: 'want<mark>ed</mark>', tr: '/ˈwɔntɪd/', note: 'хотел — «ид»' },
      { en: 'need<mark>ed</mark>', tr: '/ˈnidɪd/', note: 'нуждался — «ид»' },
    ],
    tip: `Глухие → «т»: talked, worked, washed, stopped\nЗвонкие → «д»: played, called, loved, moved\nПосле t/d → «ид»: wanted, needed, waited, added`,
  },

  {
    sec: 'endings',
    tag: 'Окончания',
    color: '#b5451b',
    name: 'Окончание -S/-ES: три произношения',
    hint: '-s читается «с», «з» или «из»',
    explanation: `Окончание множественного числа и 3-го лица глагола «-s» читается по-разному.`,
    examples: [
      { en: 'cat<mark>s</mark>', tr: '/kæts/', note: 'кошки — «с»' },
      { en: 'book<mark>s</mark>', tr: '/bʊks/', note: 'книги — «с»' },
      { en: 'dog<mark>s</mark>', tr: '/dɔgz/', note: 'собаки — «з»' },
      { en: 'name<mark>s</mark>', tr: '/neɪmz/', note: 'имена — «з»' },
      { en: 'class<mark>es</mark>', tr: '/ˈklæsɪz/', note: 'классы — «из»' },
      { en: 'watch<mark>es</mark>', tr: '/ˈwɑʧɪz/', note: 'часы — «из»' },
      {
        en: 'he play<mark>s</mark>',
        tr: '/hi pleɪz/',
        note: 'он играет — «з»',
      },
    ],
    tip: `«с» после глухих (p,t,k,f): cats, books\n«з» после гласных и звонких: dogs, names\n«из» после s,z,sh,ch,x: classes, watches, buzzes`,
  },

  {
    sec: 'endings',
    tag: 'Окончания',
    color: '#b5451b',
    name: 'Окончание -TION / -SION',
    hint: '-tion = «шэн», -sion = «жэн» или «шэн»',
    explanation: `Суффикс «-tion» всегда читается «шэн». Суффикс «-sion» — «жэн» после гласных и «шэн» после согласных.`,
    examples: [
      { en: 'na<mark>tion</mark>', tr: '/ˈneɪʃən/', note: 'нация' },
      { en: 'ques<mark>tion</mark>', tr: '/kˈwɛʃən/', note: 'вопрос (!)' },
      { en: 'ac<mark>tion</mark>', tr: '/ˈækʃən/', note: 'действие' },
      {
        en: 'deci<mark>sion</mark>',
        tr: '/dɪˈsɪʒən/',
        note: 'решение — «жэн»',
      },
      { en: 'vi<mark>sion</mark>', tr: '/ˈvɪʒən/', note: 'зрение — «жэн»' },
      {
        en: 'ten<mark>sion</mark>',
        tr: '/ˈtɛnʃən/',
        note: 'напряжение — «шэн»',
      },
    ],
    tip: `-tion → «шэн»: nation, action (почти всегда)\n-sion → «жэн» после гласной: vision, decision\n-sion → «шэн» после согласной: tension, mansion`,
  },

  {
    sec: 'endings',
    tag: 'Окончания',
    color: '#b5451b',
    name: 'Окончание -TURE',
    hint: '-ture читается «чэ»',
    explanation: `Суффикс «-ture» читается «чэ», не «тюре» и не «тур».`,
    examples: [
      { en: 'na<mark>ture</mark>', tr: '/ˈneɪʧər/', note: 'природа' },
      { en: 'pic<mark>ture</mark>', tr: '/ˈpɪkʧər/', note: 'картина/фото' },
      { en: 'fu<mark>ture</mark>', tr: '/fˈjuʧər/', note: 'будущее' },
      { en: 'fea<mark>ture</mark>', tr: '/ˈfiʧər/', note: 'особенность' },
      { en: 'cul<mark>ture</mark>', tr: '/ˈkəlʧər/', note: 'культура' },
      { en: 'lec<mark>ture</mark>', tr: '/ˈlɛkʧər/', note: 'лекция' },
    ],
    tip: '-ture = «чэ» всегда: nature, picture, future, culture.',
  },

  {
    sec: 'endings',
    tag: 'Окончания',
    color: '#b5451b',
    name: 'Окончание -OUGH: 6 вариантов!',
    hint: '-ough читается по-разному в каждом слове',
    explanation: `«ough» — самое сложное буквосочетание. Одно написание, шесть разных звуков. Только запоминание!`,
    examples: [
      { en: 'thr<mark>ough</mark>', tr: '/θru/', note: 'через — «уу»' },
      { en: 'th<mark>ough</mark>', tr: '/ðoʊ/', note: 'хотя — «оу»' },
      {
        en: 'thr<mark>ough</mark>out',
        tr: '/θruaʊt/',
        note: 'по всему — «уу»',
      },
      { en: 'r<mark>ough</mark>', tr: '/rəf/', note: 'грубый — «аф»' },
      { en: 't<mark>ough</mark>', tr: '/təf/', note: 'жёсткий — «аф»' },
      { en: 'c<mark>ough</mark>', tr: '/kɔf/', note: 'кашель — «оф»' },
      { en: 'thr<mark>ough</mark>', tr: '/θru/', note: 'через — «уу»' },
      { en: 'b<mark>ough</mark>', tr: '/baʊ/', note: 'ветвь — «ау»' },
      { en: 'b<mark>ough</mark>t', tr: '/bɔt/', note: 'купил — «от»' },
      { en: 'd<mark>ough</mark>', tr: '/doʊ/', note: 'тесто — «оу»' },
    ],
    tip: `Эти нужно просто выучить:\nthrough «θруу», though «доу», rough «раф»\ncough «коф», bought «бот», bough «бау»`,
  },

  // ═══ STRESS ═══
  {
    sec: 'stress',
    tag: 'Ударение',
    color: '#7a6000',
    name: 'Ударение в двусложных: существительные vs глаголы',
    hint: 'REcord (сущ.) vs reCORD (глагол)',
    explanation: `Многие двусложные слова пишутся одинаково, но ударение меняется в зависимости от части речи:
- Существительное / прилагательное → ударение на ПЕРВЫЙ слог
- Глагол → ударение на ВТОРОЙ слог`,
    examples: [
      {
        en: '<mark>RE</mark>cord (сущ.)',
        tr: '/ˈrɛkərd/',
        note: 'запись, рекорд',
      },
      {
        en: 're<mark>CORD</mark> (глаг.)',
        tr: '/ˈrɛkərd/',
        note: 'записывать',
      },
      {
        en: '<mark>PRE</mark>sent (сущ.)',
        tr: '/ˈprɛzənt/',
        note: 'подарок / настоящее',
      },
      {
        en: 'pre<mark>SENT</mark> (глаг.)',
        tr: '/ˈprɛzənt/',
        note: 'представлять',
      },
      { en: '<mark>OB</mark>ject (сущ.)', tr: '/ˈɑbʤɛkt/', note: 'предмет' },
      { en: 'ob<mark>JECT</mark> (глаг.)', tr: '/ˈɑbʤɛkt/', note: 'возражать' },
      {
        en: '<mark>IN</mark>crease (сущ.)',
        tr: '/ˌɪnˈkris/',
        note: 'рост, увеличение',
      },
      {
        en: 'in<mark>CREASE</mark> (глаг.)',
        tr: '/ˌɪnˈkris/',
        note: 'увеличивать',
      },
    ],
    tip: `Существительное → 1-й слог: REcord, PREsent, OBject\nГлагол → 2-й слог: reCORD, preSENT, obJECT`,
  },

  {
    sec: 'stress',
    tag: 'Ударение',
    color: '#7a6000',
    name: 'Суффиксы, которые тянут ударение',
    hint: '-tion, -ic, -ity меняют ударение',
    explanation: `Некоторые суффиксы притягивают ударение на предыдущий слог. Знание этого упрощает произношение длинных слов.`,
    examples: [
      {
        en: 'e<mark>CO</mark>nomy → eco<mark>NO</mark>mic',
        tr: '/ɪˈkɑnəmi/ → /ˌɛkəˈnɑmɪk/',
        note: '-ic тянет ударение',
      },
      {
        en: 'pho<mark>TO</mark>graph → pho<mark>TO</mark>graphy',
        tr: '/ˈfoʊtəˌgræf/ → /fəˈtɑgrəfi/',
        note: '-phy',
      },
      {
        en: '<mark>NA</mark>tion → na<mark>TIO</mark>nal',
        tr: '/ˈneɪʃən/ → /ˈnæʃənəl/',
        note: '-al не меняет',
      },
      {
        en: 'pro<mark>DUCE</mark> → <mark>PRO</mark>duct',
        tr: '/ˈproʊdus/ → /ˈprɑdəkt/',
        note: 'суффикс меняет',
      },
      {
        en: 'e<mark>LEC</mark>tric → elec<mark>TRI</mark>city',
        tr: '/ɪˈlɛktrɪk/ → /ɪˌlɛkˈtrɪsəti/',
        note: '-ity',
      },
    ],
    tip: `-tion: ударение на слог ПЕРЕД -tion: naTION, inforMATION\n-ic: ударение на слог ПЕРЕД -ic: econOMic, draMATic\n-ity: ударение на слог ПЕРЕД -ity: electriCIty`,
  },

  {
    sec: 'stress',
    tag: 'Ударение',
    color: '#7a6000',
    name: 'Schwa /ə/ — самый частый звук',
    hint: 'безударные гласные превращаются в «э»',
    explanation: `Schwa /ə/ — нейтральный гласный звук, «э» без напряжения. В безударных слогах почти любая гласная превращается в schwa. Это делает английский ритмичным.`,
    examples: [
      { en: '<mark>a</mark>bout', tr: '/əˈbaʊt/', note: 'а → «э»' },
      { en: 'syst<mark>e</mark>m', tr: '/ˈsɪstəm/', note: 'e → «э»' },
      { en: 'lem<mark>o</mark>n', tr: '/ˈlɛmən/', note: 'o → «э»' },
      { en: 'circus', tr: '/ˈsərkəs/', note: 'u → «э»' },
      { en: 'famil<mark>y</mark>', tr: '/ˈfæməli/', note: 'i → «э»' },
      { en: 'the', tr: '/ðə/', note: 'артикль = «э»' },
    ],
    tip: `/ə/ — самый частый звук в английском. Безударный слог → почти всегда «э».\n«The» = «δэ», не «δи». «A» = «э», не «эй» (в предложении).`,
  },

  // ═══ SPELLING ═══
  {
    sec: 'spelling',
    tag: 'Правописание',
    color: '#1a5a5a',
    name: 'Удвоение согласной при добавлении суффикса',
    hint: 'run → running, sit → sitting',
    explanation: `Если слово заканчивается на: согласная + гласная + согласная (CVC), И ударение на последний слог — согласная удваивается перед суффиксом -ing, -ed, -er.`,
    examples: [
      {
        en: 'run → run<mark>n</mark>ing',
        tr: '/rən/ → /ˈrənɪŋ/',
        note: 'бегать',
      },
      {
        en: 'sit → sit<mark>t</mark>ing',
        tr: '/sɪt/ → /ˈsɪtɪŋ/',
        note: 'сидеть',
      },
      {
        en: 'stop → stop<mark>p</mark>ed',
        tr: '/stɑp/ → /stɑpt/',
        note: 'остановился',
      },
      {
        en: 'big → big<mark>g</mark>er',
        tr: '/bɪg/ → /ˈbɪgər/',
        note: 'больше',
      },
      {
        en: 'swim → swim<mark>m</mark>ing',
        tr: '/swɪm/ → /sˈwɪmɪŋ/',
        note: 'плавать',
      },
      {
        en: 'open → open<mark>ing</mark>',
        tr: '/ˈoʊpən/ → /ˈoʊpənɪŋ/',
        note: 'открывать — НЕ удваивается (2 слога)',
      },
    ],
    tip: `Правило CVC + ударение = удвоение:\nrun→running, sit→sitting, stop→stopped\nДва слога с ударением на 1-й → НЕ удвоение: listen→listening`,
  },

  {
    sec: 'spelling',
    tag: 'Правописание',
    color: '#1a5a5a',
    name: 'Dropping the final -E',
    hint: 'make → making, не makeing',
    explanation: `Перед суффиксами -ing, -ed, -er, -able финальная немая «e» убирается. Но перед -ness, -ly, -ful она остаётся.`,
    examples: [
      {
        en: 'make → mak<mark>ing</mark>',
        tr: '/meɪk/ → /ˈmeɪkɪŋ/',
        note: 'делать',
      },
      { en: 'love → lov<mark>ed</mark>', tr: '/ləv/ → /ləvd/', note: 'любил' },
      {
        en: 'come → com<mark>ing</mark>',
        tr: '/kəm/ → /ˈkəmɪŋ/',
        note: 'приходить',
      },
      {
        en: 'write → writ<mark>er</mark>',
        tr: '/raɪt/ → /ˈraɪtər/',
        note: 'писатель',
      },
      {
        en: 'hope → hop<mark>eful</mark>',
        tr: '/hoʊp/ → /ˈhoʊpfəl/',
        note: 'e остаётся перед -ful',
      },
      {
        en: 'care → care<mark>less</mark>',
        tr: '/kɛr/ → /ˈkɛrlɛs/',
        note: 'e остаётся перед -less',
      },
    ],
    tip: `-e убирается перед: -ing, -ed, -er, -able\nmake→making, love→loved, write→writer\n-e ОСТАЁТСЯ перед: -ful, -less, -ness, -ly`,
  },

  {
    sec: 'spelling',
    tag: 'Правописание',
    color: '#1a5a5a',
    name: 'Y → I при изменении формы',
    hint: 'happy → happier, не happyer',
    explanation: `Если слово заканчивается на согласная + Y, Y меняется на I перед большинством суффиксов (но НЕ перед -ing).`,
    examples: [
      {
        en: 'happy → happ<mark>i</mark>er',
        tr: '/ˈhæpi/ → /ˈhæpiər/',
        note: 'счастливее',
      },
      {
        en: 'study → stud<mark>i</mark>ed',
        tr: '/ˈstədi/ → /ˈstədid/',
        note: 'изучал',
      },
      {
        en: 'carry → carr<mark>i</mark>es',
        tr: '/ˈkɛri/ → /ˈkɛriz/',
        note: 'несёт',
      },
      {
        en: 'easy → eas<mark>i</mark>ly',
        tr: '/ˈizi/ → /ˈizəli/',
        note: 'легко',
      },
      {
        en: 'study → study<mark>ing</mark>',
        tr: '/ˈstədi/ → /ˈstədiɪŋ/',
        note: 'y остаётся перед -ing!',
      },
      {
        en: 'play → play<mark>ed</mark>',
        tr: '/pleɪ/ → /pleɪd/',
        note: 'y после гласной → не меняется',
      },
    ],
    tip: `Согл+y → i (перед суффиксами): happy→happier, study→studied\nНО: перед -ing y остаётся: studying, carrying\nГласная+y → y остаётся: played, enjoyed`,
  },

  {
    sec: 'spelling',
    tag: 'Правописание',
    color: '#1a5a5a',
    name: 'Американский vs Британский — разница',
    hint: '-or vs -our, -ize vs -ise',
    explanation: `Американский и британский английский имеют разное написание многих слов. Оба варианта правильны — важно выбрать один стиль и придерживаться его.`,
    examples: [
      { en: 'color / colour', tr: '/ˈkələr ˈkələr/', note: 'цвет — US / UK' },
      {
        en: 'center / centre',
        tr: '/ˈsɛnər ˈsɛntər/',
        note: 'центр — US / UK',
      },
      {
        en: 'organize / organise',
        tr: '/ˈɔrgəˌnaɪz organise*/',
        note: 'US / UK',
      },
      {
        en: 'program / programme',
        tr: '/ˈproʊˌgræm ˈproʊˌgræm/',
        note: 'US / UK',
      },
      { en: 'analyze / analyse', tr: '/ˈænəˌlaɪz analyse*/', note: 'US / UK' },
      {
        en: 'traveling / travelling',
        tr: '/ˈtrævəlɪŋ ˈtrævəlɪŋ/',
        note: 'US (1 l) / UK (2 l)',
      },
    ],
    tip: `US: color, center, organize, program\nUK: colour, centre, organise, programme\nЧаще в курсах используется UK, в приложениях — US.`,
  },

  // ═══ GRAMMAR ═══
  {
    sec: 'grammar',
    tag: 'Грамматика',
    color: '#5a1a5a',
    name: 'Артикли A / AN / THE — главное правило',
    hint: 'A vs AN зависит от ЗВУКА, не буквы',
    explanation: `«A» или «AN» зависит от первого ЗВУКА следующего слова, а не буквы! Если слово начинается с гласного ЗВУКА — AN. Если с согласного — A.`,
    examples: [
      {
        en: 'a <mark>u</mark>niversity',
        tr: '/ə ˌjunəˈvərsəti/',
        note: 'u звучит «ю» = согласный!',
      },
      {
        en: 'an <mark>h</mark>our',
        tr: '/ən aʊər/',
        note: 'h молчит, звук = «а»',
      },
      {
        en: 'an <mark>u</mark>mbrella',
        tr: '/ən ˈəmˌbrɛlə/',
        note: 'u звучит «а»',
      },
      {
        en: 'a <mark>e</mark>uropean',
        tr: '/ə ˌjʊrəˈpiən/',
        note: 'E звучит «ю»',
      },
      {
        en: 'an <mark>M</mark>P',
        tr: '/ən mp*/',
        note: 'M звучит «эм» — гласная!',
      },
      {
        en: 'a <mark>o</mark>ne-way street',
        tr: '/ə ˈwənˈweɪ strit/',
        note: 'O звучит «в»',
      },
    ],
    tip: `A/AN → смотри на ЗВУК:\nan + гласный звук: an hour, an umbrella, an MP\na + согласный звук: a university, a European`,
  },

  {
    sec: 'grammar',
    tag: 'Грамматика',
    color: '#5a1a5a',
    name: 'Do / Does / Did — вспомогательные',
    hint: 'в вопросе и отрицании нужен вспомогательный глагол',
    explanation: `В Present Simple и Past Simple для вопросов и отрицаний используются DO/DOES/DID. Главный глагол при этом стоит в базовой форме (infinitive).`,
    examples: [
      { en: 'She work<mark>s</mark>.', tr: '/ʃi wərks./', note: 'утверждение' },
      {
        en: 'Does she <mark>work</mark>?',
        tr: '/dɪz ʃi wərk/',
        note: 'вопрос — does+инф',
      },
      {
        en: "She doesn't <mark>work</mark>.",
        tr: '/ʃi ˈdəzənt wərk./',
        note: "отриц — doesn't+инф",
      },
      { en: 'He went.', tr: '/hi wɛnt./', note: 'утверждение' },
      {
        en: 'Did he <mark>go</mark>?',
        tr: '/dɪd hi goʊ/',
        note: 'вопрос — did+инф (не went!)',
      },
      {
        en: "He didn't <mark>go</mark>.",
        tr: '/hi ˈdɪdənt goʊ./',
        note: "отриц — didn't+инф",
      },
    ],
    tip: `Present Simple: do/does + infinitive\nShe DOES NOT work. NOT: she does not works.\nPast Simple: did + infinitive\nDID he GO? NOT: did he went?`,
  },

  {
    sec: 'grammar',
    tag: 'Грамматика',
    color: '#5a1a5a',
    name: 'Неправильные глаголы — группы',
    hint: 'go→went, not go→goed',
    explanation: `Около 200 самых частых глаголов в английском — неправильные. Их прошедшее время надо запомнить. Они делятся на группы по паттернам.`,
    examples: [
      {
        en: 'go → <mark>went</mark>',
        tr: '/goʊ/ → /wɛnt/',
        note: 'уникальный',
      },
      { en: 'run → <mark>ran</mark>', tr: '/rən/ → /ræn/', note: 'i→a' },
      { en: 'sit → <mark>sat</mark>', tr: '/sɪt/ → /sæt/', note: 'i→a' },
      { en: 'sing → <mark>sang</mark>', tr: '/sɪŋ/ → /sæŋ/', note: 'i→a' },
      { en: 'feel → <mark>felt</mark>', tr: '/fil/ → /fɛlt/', note: 'ee→e+t' },
      {
        en: 'sleep → <mark>slept</mark>',
        tr: '/slip/ → /slɛpt/',
        note: 'ee→e+t',
      },
      {
        en: 'cut → <mark>cut</mark>',
        tr: '/kət/ → /kət/',
        note: 'не меняется',
      },
      {
        en: 'put → <mark>put</mark>',
        tr: '/pʊt/ → /pʊt/',
        note: 'не меняется',
      },
    ],
    tip: `Группа i→a: sit/sat, sing/sang, swim/swam, run/ran\nГруппа ee→ept: sleep/slept, feel/felt, keep/kept\nОдинаковые: cut/cut, put/put, set/set, hit/hit`,
  },

  {
    sec: 'grammar',
    tag: 'Грамматика',
    color: '#5a1a5a',
    name: 'Present Perfect vs Past Simple',
    hint: 'have done vs did — главная путаница',
    explanation: `Present Perfect (have + V3) — действие в прошлом, но связанное с настоящим или без конкретного времени.
Past Simple — конкретное время в прошлом.`,
    examples: [
      {
        en: 'I <mark>have seen</mark> this film.',
        tr: '/aɪ hæv sin ðɪs fɪlm./',
        note: 'когда — неважно',
      },
      {
        en: 'I <mark>saw</mark> it yesterday.',
        tr: '/aɪ sɔ ɪt ˈjɛstərˌdeɪ./',
        note: 'конкретное время',
      },
      {
        en: '<mark>Have</mark> you ever been to London?',
        tr: '/hæv ju ˈɛvər bɪn tɪ ˈləndən/',
        note: 'в жизни вообще',
      },
      {
        en: '<mark>Did</mark> you go to London last year?',
        tr: '/dɪd ju goʊ tɪ ˈləndən læst jɪr/',
        note: 'конкретное время',
      },
    ],
    tip: `already, yet, ever, never, just → Present Perfect\nyesterday, last year, in 2020, ago → Past Simple\n"When?" можно спросить → Past Simple`,
  },

  {
    sec: 'grammar',
    tag: 'Грамматика',
    color: '#5a1a5a',
    name: 'Исчисляемые и неисчисляемые существительные',
    hint: 'much/many, little/few — зависит от типа',
    explanation: `Исчисляемые (можно посчитать): a book, two books → many, few
Неисчисляемые (нельзя посчитать): water, money, advice → much, little`,
    examples: [
      {
        en: '<mark>many</mark> books',
        tr: '/ˈmɛni bʊks/',
        note: 'исчисляемое',
      },
      {
        en: '<mark>much</mark> water',
        tr: '/məʧ ˈwɔtər/',
        note: 'неисчисляемое',
      },
      {
        en: '<mark>few</mark> friends',
        tr: '/fju frɛndz/',
        note: 'исчисляемое',
      },
      {
        en: '<mark>little</mark> time',
        tr: '/ˈlɪtəl taɪm/',
        note: 'неисчисляемое',
      },
      {
        en: 'some <mark>advice</mark>',
        tr: '/səm ədˈvaɪs/',
        note: 'advice = неисчисляемое!',
      },
      {
        en: 'some <mark>information</mark>',
        tr: '/səm ˌɪnˌfɔrˈmeɪʃən/',
        note: 'information = неисчисл.!',
      },
    ],
    tip: `Advice, information, furniture, luggage, news → всегда неисчисляемые!\nНе говорят: «an advice», «informations» — это ошибки.`,
  },

  // ═══ CONFUSING ═══
  {
    sec: 'confusing',
    tag: 'Путаница',
    color: '#3a3a8b',
    name: 'READ — одно слово, два произношения',
    hint: 'read /riːd/ vs read /red/',
    explanation: `Глагол «read» в настоящем времени и в прошедшем пишется одинаково, но произносится по-разному.`,
    examples: [
      {
        en: 'I <mark>read</mark> every day.',
        tr: '/aɪ rɛd ˈɛvəri deɪ./',
        note: 'Present: «рид»',
      },
      {
        en: 'I <mark>read</mark> it yesterday.',
        tr: '/aɪ rɛd ɪt ˈjɛstərˌdeɪ./',
        note: 'Past: «рэд»',
      },
      {
        en: 'Please <mark>read</mark> this.',
        tr: '/pliz rɛd ðɪs./',
        note: 'Imperative: «рид»',
      },
    ],
    tip: `read (наст.) = /riːd/ «рид»\nread (прош.) = /red/ «рэд»\nТакже: lead /liːd/ vs led /led/; встречается похожая ситуация.`,
  },

  {
    sec: 'confusing',
    tag: 'Путаница',
    color: '#3a3a8b',
    name: 'LIVE — глагол и прилагательное',
    hint: 'live /lɪv/ vs live /laɪv/',
    explanation: `«Live» как глагол (жить) и как прилагательное (живой/в прямом эфире) произносится по-разному.`,
    examples: [
      {
        en: 'I <mark>live</mark> in Moscow.',
        tr: '/aɪ lɪv ɪn ˈmɔˌskaʊ./',
        note: 'глагол: жить',
      },
      {
        en: 'A <mark>live</mark> concert.',
        tr: '/ə lɪv ˈkɑnsərt./',
        note: 'прил.: живой/прямой',
      },
      {
        en: '<mark>Live</mark> TV.',
        tr: '/lɪv ˌtɛləˈvɪʒən./',
        note: 'прямой эфир',
      },
    ],
    tip: `live (глагол) = /lɪv/ «лив» — жить\nlive (прил./нар.) = /laɪv/ «лайв» — живой, вживую`,
  },

  {
    sec: 'confusing',
    tag: 'Путаница',
    color: '#3a3a8b',
    name: 'HEAR vs LISTEN / SEE vs WATCH / LOOK',
    hint: 'пассивное vs активное восприятие',
    explanation: `В русском «слышать» и «слушать» — разные слова. В английском тоже, но их часто путают.`,
    examples: [
      {
        en: 'I <mark>hear</mark> music.',
        tr: '/aɪ hir mˈjuzɪk./',
        note: 'случайно, без усилий',
      },
      {
        en: 'I <mark>listen to</mark> music.',
        tr: '/aɪ ˈlɪsən tɪ mˈjuzɪk./',
        note: 'намеренно, с вниманием',
      },
      {
        en: 'I <mark>see</mark> a bird.',
        tr: '/aɪ si ə bərd./',
        note: 'случайно, просто вижу',
      },
      {
        en: 'I <mark>watch</mark> TV.',
        tr: '/aɪ wɔʧ ˌtɛləˈvɪʒən./',
        note: 'намеренно, внимательно',
      },
      {
        en: '<mark>Look at</mark> this!',
        tr: '/lʊk æt ðɪs/',
        note: 'направить взгляд',
      },
    ],
    tip: `hear/see = пассивно, само происходит\nlisten/watch/look = активно, намеренно\nlook = направить взгляд, watch = следить за движением`,
  },

  {
    sec: 'confusing',
    tag: 'Путаница',
    color: '#3a3a8b',
    name: 'MAKE vs DO — частая ошибка',
    hint: 'make a mistake, do homework — нельзя поменять',
    explanation: `MAKE — создавать, производить, готовить (результат — что-то новое).
DO — выполнять деятельность, задание (процесс).`,
    examples: [
      {
        en: '<mark>make</mark> a mistake',
        tr: '/meɪk ə mɪˈsteɪk/',
        note: 'создать ошибку',
      },
      { en: '<mark>make</mark> a decision', tr: '/meɪk ə dɪˈsɪʒən/', note: '' },
      { en: '<mark>make</mark> coffee', tr: '/meɪk ˈkɔfi/', note: '' },
      {
        en: '<mark>do</mark> homework',
        tr: '/du ˈhoʊmˌwərk/',
        note: 'выполнять',
      },
      { en: '<mark>do</mark> exercise', tr: '/du ˈɛksərˌsaɪz/', note: '' },
      { en: '<mark>do</mark> a favour', tr: '/du ə ˈfeɪvər/', note: '' },
    ],
    tip: `MAKE: make a mistake/decision/coffee/plan/noise\nDO: do homework/exercise/research/business/damage\nЗаучи пары — правила нет, только память!`,
  },

  {
    sec: 'confusing',
    tag: 'Путаница',
    color: '#3a3a8b',
    name: 'SAY vs TELL',
    hint: 'say something / tell someone something',
    explanation: `SAY — что-то говорить (акцент на слова).
TELL — говорить КОМУ-ТО (всегда есть слушатель).`,
    examples: [
      {
        en: 'She <mark>said</mark> hello.',
        tr: '/ʃi sɛd hɛˈloʊ./',
        note: 'say = слова',
      },
      {
        en: 'She <mark>said</mark> that she was tired.',
        tr: '/ʃi sɛd ðət ʃi wɑz taɪərd./',
        note: 'say that...',
      },
      {
        en: 'He <mark>told</mark> me a secret.',
        tr: '/hi toʊld mi ə ˈsikrɪt./',
        note: 'tell + кто',
      },
      {
        en: '<mark>Tell</mark> me the truth.',
        tr: '/tɛl mi ðə truθ./',
        note: 'tell + кто',
      },
      {
        en: '<mark>Tell</mark> me your name.',
        tr: '/tɛl mi jʊr neɪm./',
        note: 'не say me!',
      },
    ],
    tip: `say + слова: say hello, say sorry, say that\ntell + человек: tell me, tell him, tell someone\nНЕ говорят: «tell that», «say me» — частые ошибки!`,
  },

  {
    sec: 'confusing',
    tag: 'Путаница',
    color: '#3a3a8b',
    name: 'BORROW vs LEND',
    hint: 'borrow = взять взаймы, lend = дать взаймы',
    explanation: `BORROW — взять что-то у кого-то (ты получаешь).
LEND — дать что-то кому-то (ты отдаёшь).`,
    examples: [
      {
        en: 'Can I <mark>borrow</mark> your pen?',
        tr: '/kən aɪ ˈbɑˌroʊ jʊr pɛn/',
        note: 'я беру у тебя',
      },
      {
        en: 'Can you <mark>lend</mark> me your pen?',
        tr: '/kən ju lɛnd mi jʊr pɛn/',
        note: 'ты даёшь мне',
      },
      {
        en: 'I <mark>borrowed</mark> a book from the library.',
        tr: '/aɪ ˈbɑˌroʊd ə bʊk frəm ðə ˈlaɪbrɛˌri./',
        note: '',
      },
      {
        en: 'He <mark>lent</mark> me money.',
        tr: '/hi lɛnt mi ˈməni./',
        note: '',
      },
    ],
    tip: `borrow = взять (я получаю): borrow FROM\nlend = дать (я отдаю): lend TO someone\nПодсказка: borrow = «занять», lend = «одолжить»`,
  },

  {
    sec: 'confusing',
    tag: 'Путаница',
    color: '#3a3a8b',
    name: "ITS vs IT'S",
    hint: 'его (притяжательное) vs это есть (сокращение)',
    explanation: `ITS (без апострофа) — притяжательное местоимение (его/её для предметов).
IT'S (с апострофом) — сокращение «it is» или «it has».`,
    examples: [
      {
        en: 'The cat licked <mark>its</mark> paw.',
        tr: '/ðə kæt lɪkt ɪts pɔ./',
        note: 'its = его/её',
      },
      {
        en: "<mark>It's</mark> cold today.",
        tr: '/ɪts koʊld təˈdeɪ./',
        note: "it's = it is",
      },
      {
        en: "<mark>It's</mark> been a long day.",
        tr: '/ɪts bɪn ə lɔŋ deɪ./',
        note: "it's = it has",
      },
      {
        en: 'The company lost <mark>its</mark> customers.',
        tr: '/ðə ˈkəmpəˌni lɔst ɪts ˈkəstəmərz./',
        note: 'its = принадлежность',
      },
    ],
    tip: `Если можно заменить на «it is/has» → it's (с апострофом)\nЕсли это «его/её» → its (без апострофа)\nТест: «It is cold» — значит it's. «The dog its tail» → нет, its.`,
  },

  {
    sec: 'confusing',
    tag: 'Путаница',
    color: '#3a3a8b',
    name: "THERE / THEIR / THEY'RE — три «ðэр»",
    hint: 'одинаково звучат, по-разному пишутся',
    explanation: `Все три слова произносятся одинаково — /ðeə/. Но пишутся и значат разное.`,
    examples: [
      {
        en: '<mark>There</mark> is a problem.',
        tr: '/ðɛr ɪz ə ˈprɑbləm./',
        note: 'место / существование',
      },
      {
        en: 'Put it over <mark>there</mark>.',
        tr: '/pʊt ɪt ˈoʊvər ðɛr./',
        note: 'там',
      },
      {
        en: '<mark>Their</mark> English is perfect.',
        tr: '/ðɛr ˈɪŋlɪʃ ɪz ˈpərˌfɪkt./',
        note: 'их (притяжательное)',
      },
      {
        en: "<mark>They're</mark> coming tomorrow.",
        tr: '/ðɛr ˈkəmɪŋ təˈmɑˌroʊ./',
        note: 'they are',
      },
    ],
    tip: `there = место/существование: there is, over there\ntheir = их: their house, their English\nthey're = they are: they're happy`,
  },

  {
    sec: 'confusing',
    tag: 'Путаница',
    color: '#3a3a8b',
    name: 'Числительные HUNDRED / THOUSAND',
    hint: 'не говорят «hundreds» в точных числах',
    explanation: `В точных числах hundred/thousand/million НЕ получают -s и не требуют «of».`,
    examples: [
      {
        en: 'two <mark>hundred</mark> people',
        tr: '/tu ˈhənərd ˈpipəl/',
        note: 'не hundreds!',
      },
      {
        en: 'five <mark>thousand</mark> dollars',
        tr: '/faɪv ˈθaʊzənd ˈdɔlərz/',
        note: 'не thousands!',
      },
      {
        en: '<mark>hundreds</mark> of people',
        tr: '/ˈhənərdz əv ˈpipəl/',
        note: 'неточное число + of',
      },
      {
        en: '<mark>thousands</mark> of words',
        tr: '/ˈθaʊzənz əv wərdz/',
        note: 'неточное + of',
      },
    ],
    tip: `Точное: two hundred, five thousand (без s, без of)\nПриблизительное: hundreds of, thousands of (с s и of)`,
  },
];

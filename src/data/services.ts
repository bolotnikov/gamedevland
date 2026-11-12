export type ServiceSlug = 'html5-game-development' | 'playable-ads' | 'game-porting' | 'tech-lead';
export type ServiceGraphic = 'games' | 'playable' | 'port' | 'lead';

export interface ServiceDelivery {
 steps: { title: string; text: string }[];
 result: string;
 note: string;
}

export interface ServiceShowcase {
 title: string;
 landscape: string;
 landscapeWidth: number;
 landscapeHeight: number;
 landscapeAlt: string;
 portrait: string;
 portraitWidth: number;
 portraitHeight: number;
 portraitAlt: string;
 caption: string;
}

export interface ServicePage {
 showcase?: ServiceShowcase;
 slug: ServiceSlug;
 graphic: ServiceGraphic;
 group: 'development' | 'porting' | 'lead';
 number: string;
 label: string;
 title: string;
 accent: string;
 description: string;
 summary: string;
 action: string;
 tags: string[];
 scopeTitle: string;
 scope: { title: string; text: string }[];
 delivery?: ServiceDelivery;
 faq: { question: string; answer: string }[];
 contact: string;
 related: ServiceSlug[];
}

export const serviceOverview = {
 "title": "Разработка и портирование игр — GameDev.Land",
 "description": "Разработка HTML5 игр и playable ads. Портирование игр в браузер, адаптация под игровые площадки и рекламные сети.",
 "header": "Разработка и портирование HTML5 игр",
 "intro": "Разработка игр и интерактивной рекламы. Перенос готовых проектов в браузер, сборка и адаптация под нужные площадки.",
 "strip": "Сборка под площадки",
 "porting": "Портирование в браузер",
 "portingDescription": "Воссоздание игр с Unity или Flash/SWF с нуля на PixiJS или Three.js для браузера."
};

export const serviceOverviewShowcase: ServiceShowcase = {
 "title": "Hole Islands",
 "landscape": "/assets/games/hole-islands/screens/land/level-5.webp",
 "landscapeWidth": 1280,
 "landscapeHeight": 720,
 "landscapeAlt": "Вишня, питахайя и кольца ананаса в Hole Islands на широком экране",
 "portrait": "/assets/games/rings/screens/port/level-025.webp",
 "portraitWidth": 527,
 "portraitHeight": 908,
 "portraitAlt": "Пространственная конструкция из колец на 25-м уровне Rings 3D",
 "caption": "Собственные игры: Hole Islands и Rings 3D · в разработке"
};

export const servicePages: readonly ServicePage[] = [
 {
  "slug": "html5-game-development",
  "graphic": "games",
  "group": "development",
  "number": "01",
  "label": "HTML5 games",
  "title": "From an idea —",
  "accent": "to a browser game",
  "description": "I develop HTML5 games from scratch: mechanics, UI and adaptation for desktop and mobile. From the first prototype to the final build.",
  "summary": "A new browser game based on an idea, reference or existing brief.",
  "action": "Discuss a game",
  "tags": [
   "Разработка с нуля",
   "Компьютеры и телефоны",
   "Сборки под площадки"
  ],
  "scopeTitle": "What the game needs to launch",
  "scope": [
   {
    "title": "Game mechanics",
    "text": "Prototype, rules, levels and progression. Test the core interaction first, then add content."
   },
   {
    "title": "Graphics and UI",
    "text": "Asset integration, animation and sound. Mouse and touch controls, with layouts for different screens."
   },
   {
    "title": "Ready for delivery",
    "text": "Optimization, testing and builds. Source code and setup instructions are handed over within the agreed scope."
   }
  ],
  "delivery": {
   "steps": [
    {
     "title": "Задача",
     "text": "Согласуем механику, материалы и площадки."
    },
    {
     "title": "Прототип",
     "text": "Проверяем игровой процесс в браузере."
    },
    {
     "title": "Разработка",
     "text": "Добавляем контент, интерфейс и звук."
    },
    {
     "title": "Сборки",
     "text": "Подключаем SDK и тестируем на площадках."
    }
   ],
   "result": "HTML5 игра с исходниками и сборками для выбранных площадок.",
   "note": "Графику, количество уровней и платформенные интеграции согласуем до начала разработки."
  },
  "faq": [
   {
    "question": "Can we start with just an idea?",
    "answer": "Yes. We can discuss the main player action, choose references and define a small prototype to test the mechanics."
   },
   {
    "question": "Можно сразу подготовить игру для нескольких площадок?",
    "answer": "Да. Выбираем площадки, подключаем SDK и готовим отдельные сборки с учётом их требований."
   }
  ],
  "contact": "A short game description, references and available materials. Include the expected timeline and budget if known.",
  "related": [
   "game-porting",
   "playable-ads"
  ],
  "showcase": {
   "title": "Hole Islands",
   "landscape": "/assets/games/hole-islands/screens/land/level-5.webp",
   "landscapeWidth": 1280,
   "landscapeHeight": 720,
   "landscapeAlt": "Вишня, питахайя и кольца ананаса в Hole Islands на широком экране",
   "portrait": "/assets/games/hole-islands/screens/port/level-5.webp",
   "portraitWidth": 720,
   "portraitHeight": 1280,
   "portraitAlt": "Hole Islands на вертикальном экране",
   "caption": "Hole Islands — собственный проект в разработке"
  }
 },
 {
  "slug": "playable-ads",
  "graphic": "playable",
  "group": "development",
  "number": "02",
  "label": "Playable ads",
  "title": "Ads",
  "accent": "people can play",
  "description": "I develop playable ads based on a game or a separate scenario. From a short interaction to builds for the agreed ad networks.",
  "summary": "Interactive ads: scenario, mechanics and builds for ad networks.",
  "action": "Discuss a playable",
  "tags": [
   "Scenario and mechanics",
   "Creative variants",
   "Build preparation"
  ],
  "scopeTitle": "One mechanic, a clear interaction",
  "scope": [
   {
    "title": "Scenario",
    "text": "Choose a short gameplay sequence. Plan the opening, guidance and transition to the end card."
   },
   {
    "title": "Implementation",
    "text": "Build the mechanics, integrate graphics and animation, and adapt the layout to different screens."
   },
   {
    "title": "Delivery",
    "text": "Optimize loading and file size. Integrate ad network interfaces and test the final builds."
   }
  ],
  "delivery": {
   "steps": [
    {
     "title": "Brief",
     "text": "Game, scenario, assets and networks."
    },
    {
     "title": "Mechanics",
     "text": "A working interaction prototype."
    },
    {
     "title": "Creative",
     "text": "Visuals, guidance and agreed variants."
    },
    {
     "title": "Builds",
     "text": "Optimization and technical testing."
    }
   ],
   "result": "A playable ad with the agreed scenario and builds for the selected ad networks.",
   "note": "The proposal specifies the number of variants, network requirements and source code handoff."
  },
  "faq": [
   {
    "question": "Do we need a finished game?",
    "answer": "An existing game, video, reference or separate ad concept can be the starting point. We need to agree on the mechanics and available materials."
   },
   {
    "question": "Can you create several variants?",
    "answer": "Yes. We agree in advance on what changes: mechanics, visual theme, tutorial or end card."
   }
  ],
  "contact": "A game link or video, scenario or reference, available assets, target ad networks and number of variants.",
  "related": [
   "html5-game-development",
   "tech-lead"
  ],
  "showcase": {
   "title": "Idle Submarine",
   "landscape": "/assets/games/idle-submarine/cover.webp",
   "landscapeWidth": 1536,
   "landscapeHeight": 1024,
   "portrait": "/assets/games/idle-submarine/screens/port/gameplay.webp",
   "portraitWidth": 390,
   "portraitHeight": 844,
   "landscapeAlt": "Landscape version of Idle Submarine",
   "portraitAlt": "Portrait gameplay in Idle Submarine",
   "caption": "Idle Submarine — an original project in development"
  }
 },
 {
  "slug": "game-porting",
  "graphic": "port",
  "group": "porting",
  "number": "03",
  "label": "Портирование игр в браузер",
  "title": "Готовая игра —",
  "accent": "теперь в браузере",
  "description": "Воссоздам игру с нуля на PixiJS или Three.js по исходникам Unity или Flash/SWF. Адаптирую управление, интерфейс и загрузку для браузера на компьютерах и телефонах.",
  "summary": "Воссоздание всей игры на PixiJS или Three.js по исходникам Unity или Flash/SWF с адаптацией под веб.",
  "action": "Discuss a port",
  "tags": [
   "Unity · Flash",
   "Адаптация для web",
   "PixiJS · Three.js"
  ],
  "scopeTitle": "От исходного проекта к web-версии",
  "scope": [
   {
    "title": "Оценка проекта",
    "text": "Изучаем исходники Unity или Flash/SWF, механику и ассеты. Определяем объём воссоздания игры на PixiJS или Three.js."
   },
   {
    "title": "Воссоздание и адаптация",
    "text": "Пишем игру с нуля, сохраняем механику и контент оригинала. Адаптируем управление, интерфейс, загрузку и сохранения под веб."
   },
   {
    "title": "Сборки и проверка",
    "text": "Подключаем SDK выбранных площадок. Проверяем игру в браузерах и на целевых устройствах."
   }
  ],
  "delivery": {
   "steps": [
    {
     "title": "Исходники",
     "text": "Проверяем проект и доступные материалы."
    },
    {
     "title": "Прототип",
     "text": "Запускаем основную механику в браузере."
    },
    {
     "title": "Перенос",
     "text": "Воссоздаём всю игру на PixiJS или Three.js и адаптируем под веб."
    },
    {
     "title": "Передача",
     "text": "Тестируем и передаём исходники и сборки."
    }
   ],
   "result": "Исходники новой игры на PixiJS или Three.js и сборки для согласованных площадок.",
   "note": "Объём работ определяем после изучения исходников и игры."
  },
  "faq": [
   {
    "question": "Игра создаётся с нуля?",
    "answer": "Да. Услуга — полное воссоздание игры на PixiJS или Three.js по исходникам Unity или Flash/SWF с адаптацией под веб. Механику и контент сохраняем по оригиналу, код пишем заново."
   },
   {
    "question": "Что делать, если остался только SWF или готовая сборка?",
    "answer": "Начнём с файла и записи игрового процесса. Проверим доступные материалы и оценим воссоздание игры. Готовая сборка не заменяет исходный проект."
   },
   {
    "question": "Можно сохранить графику и игровой процесс?",
    "answer": "Да, если доступны нужные материалы и права на их использование. Изменения управления и интерфейса согласуем отдельно."
   }
  ],
  "contact": "Ссылка на игру или видео, исходная технология и доступные материалы. Укажите целевые устройства и площадки.",
  "related": [
   "html5-game-development",
   "playable-ads"
  ]
 },
 {
  "slug": "tech-lead",
  "graphic": "lead",
  "group": "lead",
  "number": "04",
  "label": "Tech Lead",
  "title": "Team and technology",
  "accent": "A working process",
  "description": "I am open to Tech Lead roles in HTML5 games and playable ads: building teams, architecture and tools, with hands-on development.",
  "summary": "Technical leadership for an HTML5 game or playable ads team.",
  "action": "Discuss a role",
  "tags": [
   "HTML5 and playable ads",
   "Architecture",
   "Team development"
  ],
  "scopeTitle": "Technical decisions and teamwork",
  "scope": [
   {
    "title": "Team",
    "text": "Team building, mentoring and reviews. Clear agreements on quality and ownership."
   },
   {
    "title": "Технология",
    "text": "Game architecture, shared libraries, SDKs and tools. Hands-on work with TypeScript, PixiJS and performance."
   },
   {
    "title": "Process",
    "text": "Prototyping, builds and releases. Collaboration between engineering, creative and marketing teams."
   }
  ],
  "faq": [
   {
    "question": "Have you built a team before?",
    "answer": "At Moon Active, I built and led the HTML5 playable ads department and developed a shared engine and production tools."
   },
   {
    "question": "Where can I see your technical approach?",
    "answer": "The site includes my own games, architecture articles and a GameDevLand SDK course. Links are provided on this page."
   }
  ],
  "contact": "The role description, product, team structure, expected responsibilities and working arrangements.",
  "related": [
   "playable-ads",
   "html5-game-development"
  ]
 }
];

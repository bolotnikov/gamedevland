export type ServiceSlug = 'html5-game-development' | 'playable-ads' | 'unity-to-html5' | 'flash-to-html5' | 'html5-game-publishing' | 'tech-lead';
export type ServiceGraphic = 'games' | 'playable' | 'port' | 'flash' | 'publishing' | 'lead';

export interface ServicePage {
 slug: ServiceSlug;
 graphic: ServiceGraphic;
 group: 'development' | 'publishing' | 'lead';
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
 process: { title: string; text: string }[];
 result: string;
 note: string;
 faq: { question: string; answer: string }[];
 contact: string;
 related: ServiceSlug[];
}

export const servicePages: readonly ServicePage[] = [
 {
  slug: 'html5-game-development', graphic: 'games', group: 'development', number: '01',
  label: "HTML5 games", title: "From an idea —", accent: "to a browser game.",
  description: "I develop HTML5 games from scratch: mechanics, UI and adaptation for desktop and mobile. From the first prototype to the final build.",
  summary: "A new browser game based on an idea, reference or existing brief.", action: "Discuss a game",
  tags: ["Development from scratch", "Desktop and mobile", "Source code"],
  scopeTitle: "What the game needs to launch",
  scope: [
   { title: "Game mechanics", text: "Prototype, rules, levels and progression. Test the core interaction first, then add content." },
   { title: "Graphics and UI", text: "Asset integration, animation and sound. Mouse and touch controls, with layouts for different screens." },
   { title: "Ready for delivery", text: "Optimization, testing and builds. Source code and setup instructions are handed over within the agreed scope." },
  ],
  process: [
   { title: "Scope", text: "Define the mechanics, materials and scope." },
   { title: "Prototype", text: "Test the gameplay in the browser." },
   { title: "Development", text: "Add content, UI and sound." },
   { title: "Handoff", text: "Test the game and prepare builds." },
  ],
  result: "A browser game ready to run, develop further and prepare for publishing.",
  note: "We agree on art preparation, level count and platform integrations before development begins.",
  faq: [
   { question: "Can we start with just an idea?", answer: "Yes. We can discuss the main player action, choose references and define a small prototype to test the mechanics." },
   { question: "Can publishing be included from the start?", answer: "Yes. We can select target platforms and include adaptation, integrations and submission support in the project scope." },
  ],
  contact: "A short game description, references and available materials. Include the expected timeline and budget if known.",
  related: ['html5-game-publishing', 'playable-ads'],
 },
 {
  slug: 'playable-ads', graphic: 'playable', group: 'development', number: '02',
  label: 'Playable ads', title: "Ads", accent: "people can play.",
  description: "I develop playable ads based on a game or a separate scenario. From a short interaction to builds for the agreed ad networks.",
  summary: "Interactive ads: scenario, mechanics and builds for ad networks.", action: "Discuss a playable",
  tags: ["Scenario and mechanics", "Creative variants", "Build preparation"],
  scopeTitle: "One mechanic. A clear interaction.",
  scope: [
   { title: "Scenario", text: "Choose a short gameplay sequence. Plan the opening, guidance and transition to the end card." },
   { title: "Implementation", text: "Build the mechanics, integrate graphics and animation, and adapt the layout to different screens." },
   { title: "Delivery", text: "Optimize loading and file size. Integrate ad network interfaces and test the final builds." },
  ],
  process: [
   { title: "Brief", text: "Game, scenario, assets and networks." },
   { title: "Mechanics", text: "A working interaction prototype." },
   { title: "Creative", text: "Visuals, guidance and agreed variants." },
   { title: "Builds", text: "Optimization and technical testing." },
  ],
  result: "A playable ad with the agreed scenario and builds for the selected ad networks.",
  note: "The proposal specifies the number of variants, network requirements and source code handoff.",
  faq: [
   { question: "Do we need a finished game?", answer: "An existing game, video, reference or separate ad concept can be the starting point. We need to agree on the mechanics and available materials." },
   { question: "Can you create several variants?", answer: "Yes. We agree in advance on what changes: mechanics, visual theme, tutorial or end card." },
  ],
  contact: "A game link or video, scenario or reference, available assets, target ad networks and number of variants.",
  related: ['html5-game-development', 'tech-lead'],
 },
 {
  slug: 'unity-to-html5', graphic: 'port', group: 'publishing', number: '03',
  label: 'Unity → HTML5', title: "The game already exists.", accent: "Bring it to the web.",
  description: "I bring Unity games and projects on other engines to the browser, adapt controls, UI and monetization, and prepare releases for game portals.",
  summary: "A browser version of an existing mobile or desktop game.", action: "Discuss a port",
  tags: ["Unity and other engines", "Web adaptation", "Platform release"],
  scopeTitle: "Porting starts with a game review",
  scope: [
   { title: "Porting approach", text: "Review source code, dependencies and assets. Choose between a web build on the original engine and a rewrite using HTML5 technologies." },
   { title: "Browser version", text: "Adapt controls and UI. Address loading, saved progress and performance on target devices." },
   { title: "Release", text: "Integrate the selected platforms' SDKs, prepare builds and support submissions and technical fixes." },
  ],
  process: [
   { title: "Review", text: "Review the game and estimate the scope." },
   { title: "Validation", text: "Run the core mechanics in the browser." },
   { title: "Porting", text: "Adapt the game and integrate SDKs." },
   { title: "Release", text: "Test and submit to platforms." },
  ],
  result: "A web version of the existing game and builds for the agreed platforms.",
  note: "Porting may require reworking code and content. The approach, cost and scope are defined after a technical review.",
  faq: [
   { question: "Does the game have to be rewritten?", answer: "No. We first assess a web build on the original engine. A rewrite on another stack is considered when it fits the task and agreed scope." },
   { question: "Can you port a game from another engine?", answer: "Yes, the project can be submitted for review. Feasibility depends on the mechanics, source materials and technical dependencies." },
  ],
  contact: "A store link or video, engine name, information about source code and assets, and target platforms.",
  related: ['html5-game-publishing', 'flash-to-html5'],
 },
 {
  slug: 'flash-to-html5', graphic: 'flash', group: 'publishing', number: '04',
  label: 'Flash → HTML5', title: "A familiar game.", accent: "A new launch.",
  description: "I port Flash games to HTML5 while preserving their mechanics and character, adapting mobile controls and preparing a version for game portals.",
  summary: "Bring a legacy Flash game to modern browsers and mobile devices.", action: "Discuss a Flash game",
  tags: ["Preserve the mechanics", "Mobile controls", "New web version"],
  scopeTitle: "Keep the game. Update the technology.",
  scope: [
   { title: "Reviewing the original", text: "Review the playable version, ActionScript and available materials. Agree on what stays and what changes." },
   { title: "Porting to HTML5", text: "Recreate the logic, levels and UI. Transfer the available graphics, animation and sound." },
   { title: "New devices", text: "Adapt keyboard controls for touch and layouts for different screens. Prepare integrations and builds." },
  ],
  process: [
   { title: "Materials", text: "Original game, source files and rights." },
   { title: "Mechanics", text: "Port the core player interaction." },
   { title: "Content", text: "Restore levels, graphics and sound." },
   { title: "Launch", text: "Test browsers and prepare the release." },
  ],
  result: "An HTML5 version of the Flash game with the agreed content, adapted for modern screens.",
  note: "This is a project port, not an automatic SWF conversion. The scope depends on the materials available.",
  faq: [
   { question: "What if only the SWF remains?", answer: "The file and any available game information are enough for a review. We will assess what can be reused and what needs to be recreated." },
   { question: "Can the original style be preserved?", answer: "Yes. After reviewing the materials, we agree on how closely to preserve the graphics, animation and sound. Mobile changes are discussed separately." },
  ],
  contact: "The game title, SWF, FLA or other source files, a video and information about rights to the code and assets.",
  related: ['html5-game-publishing', 'unity-to-html5'],
 },
 {
  slug: 'html5-game-publishing', graphic: 'publishing', group: 'publishing', number: '05',
  label: "HTML5 game publishing", title: "One HTML5 game.", accent: "More platforms.",
  description: "I handle technical preparation and release support: responsive layouts, SDKs, ads, builds and submissions to agreed game portals.",
  summary: "Adaptation, SDK integration and publishing support for an existing HTML5 game.", action: "Submit a game",
  tags: ["Existing HTML5 game", "SDKs and monetization", "Publishing and updates"],
  scopeTitle: "From an existing game to platform submission",
  scope: [
   { title: "Adaptation", text: "I review controls, resizing, loading, pause, sound and saved progress, then fix the agreed technical issues." },
   { title: "Integrations", text: "I integrate SDKs, ad events and rewards, then prepare platform configurations and separate builds." },
   { title: "Publishing", text: "I prepare submission materials, address technical feedback and support the release and agreed updates." },
  ],
  process: [
   { title: "Introduction", text: "Play the game and review its readiness." },
   { title: "Terms", text: "Agree on platforms, scope and payment." },
   { title: "Preparation", text: "Adaptation, SDKs, builds and testing." },
   { title: "Submission", text: "Publishing and addressing feedback." },
  ],
  result: "Prepared game builds and support for release on the selected platforms.",
  note: "We agree on platforms for each game. Acceptance is decided by each platform; approval and revenue are not guaranteed.",
  faq: [
   { question: "Does the game have to use your engine?", answer: "Not necessarily. I review the existing project first. We choose an integration approach for the task; a rewrite is not a condition of working together." },
   { question: "How are payment and rights handled?", answer: "We agree on payment, any revenue share, publishing accounts, rights and support scope before work begins." },
   { question: "What happens after submission?", answer: "I address technical feedback within the agreed scope. For released games, we separately agree on updates and ongoing support." },
  ],
  contact: "A playable link, technology, current releases and target platforms. Exploring the game is enough for an initial review.",
  related: ['unity-to-html5', 'flash-to-html5'],
 },
 {
  slug: 'tech-lead', graphic: 'lead', group: 'lead', number: '06',
  label: 'Tech Lead', title: "Team. Technology.", accent: "A working process.",
  description: "I am open to Tech Lead roles in HTML5 games and playable ads: building teams, architecture and tools, with hands-on development.",
  summary: "Technical leadership for an HTML5 game or playable ads team.", action: "Discuss a role",
  tags: ["HTML5 and playable ads", "Architecture", "Team development"],
  scopeTitle: "Technical decisions and teamwork",
  scope: [
   { title: "Team", text: "Team building, mentoring and reviews. Clear agreements on quality and ownership." },
   { title: "Технология", text: "Game architecture, shared libraries, SDKs and tools. Hands-on work with TypeScript, PixiJS and performance." },
   { title: "Process", text: "Prototyping, builds and releases. Collaboration between engineering, creative and marketing teams." },
  ],
  process: [
   { title: "Introduction", text: "Product, team and current challenge." },
   { title: "Expectations", text: "Responsibilities and goals for the role." },
   { title: "Discussion", text: "Experience, technical challenges and approach." },
   { title: "Arrangements", text: "Working arrangements and next steps." },
  ],
  result: "A technical lead with experience building a department and original development tools.",
  note: "I am interested in roles with responsibility for the team, technical direction and development outcomes.",
  faq: [
   { question: "Have you built a team before?", answer: "At Moon Active, I built and led the HTML5 playable ads department and developed a shared engine and production tools." },
   { question: "Where can I see your technical approach?", answer: "The site includes my own games, architecture articles and a GameDevLand SDK course. Links are provided on this page." },
  ],
  contact: "The role description, product, team structure, expected responsibilities and working arrangements.",
  related: ['playable-ads', 'html5-game-development'],
 },
];

export class PortingOptions {
 static readonly sources = [
  {
   id: 'unity', name: 'Unity', mark: 'C#', format: 'Проект Unity',
   title: 'Воссоздадим Unity-игру с нуля',
   description: 'По исходникам Unity заново напишем всю игру на PixiJS или Three.js. Сохраним механику, уровни и ассеты, адаптируем управление, интерфейс и загрузку под браузер.',
   materials: 'Исходный проект Unity с кодом, сценами и ассетами. Ссылка на игру или запись игрового процесса.',
   focus: ['Механика и уровни из Unity', 'Загрузка, память и производительность', 'Управление и интерфейс'],
   route: 'Воссоздание с нуля', result: 'PixiJS / Three.js',
  },
  {
   id: 'flash', name: 'Flash', mark: 'f', format: 'ActionScript · FLA · SWF',
   title: 'Воссоздадим Flash/SWF-игру с нуля',
   description: 'По исходникам Flash или SWF заново напишем всю игру на PixiJS или Three.js. Сохраним механику и доступные ассеты, адаптируем управление и интерфейс под браузер и сенсорный экран.',
   materials: 'FLA, ActionScript, SWF и исходные ассеты. Если сохранилось не всё, начнём с доступных файлов.',
   focus: ['Логика и уровни из оригинала', 'Графика, анимация и звук', 'Мышь, клавиатура и касания'],
   route: 'Воссоздание с нуля', result: 'PixiJS / Three.js',
  },
 ];
}

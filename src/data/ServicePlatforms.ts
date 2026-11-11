interface ServicePlatform {
 name: string;
 mark: string;
 note: string;
 tone: 'cyan' | 'violet' | 'amber' | 'green';
 url: string;
}

/** Official platform references reviewed on 2026-11-11. */
export class ServicePlatforms {
 static readonly games: readonly ServicePlatform[] = [
  {name: 'Playgama', mark: 'P', note: '', tone: 'violet', url: 'https://wiki.playgama.com/playgama/quick-start'},
  {name: 'Yandex Games', mark: 'Y', note: '', tone: 'amber', url: 'https://yandex.ru/dev/games/doc/ru/sdk'},
  {name: 'GameDistribution', mark: 'GD', note: '', tone: 'cyan', url: 'https://gamedistribution.com/developers/'},
  {name: 'Poki', mark: 'p', note: '', tone: 'cyan', url: 'https://developers.poki.com/guide/sdk-html5'},
  {name: 'GamePix', mark: 'GP', note: '', tone: 'green', url: 'https://partners.gamepix.com/sdk/doc'},
  {name: 'GameMonetize', mark: 'GM', note: '', tone: 'amber', url: 'https://gamemonetize.com/sdk'},
  {name: 'CrazyGames', mark: 'CG', note: '', tone: 'violet', url: 'https://docs.crazygames.com/'},
 ];

 static readonly ads: readonly ServicePlatform[] = [
  {name: 'Unity Ads', mark: 'U', note: '', tone: 'cyan', url: 'https://docs.unity.com/en-us/user-acquisition/creatives/specifications/playable'},
  {name: 'AppLovin', mark: 'A', note: '', tone: 'violet', url: 'https://support.applovin.com/en/growth/promoting-your-apps/welcome-to-applovin/creative-specs-and-guidelines'},
  {name: 'Liftoff', mark: 'L', note: 'Vungle', tone: 'amber', url: 'https://support.vungle.com/hc/en-us/articles/360035348091-Get-Started-With-Liftoff-Creative'},
  {name: 'Mintegral', mark: 'M', note: '', tone: 'green', url: 'https://helpcenter.mintegral.com/en/docs/asset-specs'},
  {name: 'Moloco', mark: 'm', note: '', tone: 'cyan', url: 'https://help.moloco.com/hc/en-us/articles/24124525963799-Playable-and-Interactive-End-Card-IEC-creative-guide'},
  {name: 'Chartboost', mark: 'CB', note: '', tone: 'green', url: 'https://docs.chartboost.com/en/partners/exchange/creative-formats/'},
  {name: 'InMobi', mark: 'i', note: '', tone: 'amber', url: 'https://support.inmobi.com/dsp/in/inmobi-dsp-india/creative-specifications-and-guidelines'},
  {name: 'Meta', mark: '∞', note: 'Facebook · Audience Network', tone: 'cyan', url: 'https://www.facebook.com/audiencenetwork/monetize/ad-formats'},
  {name: 'Google Ads', mark: 'G', note: 'App campaigns', tone: 'green', url: 'https://support.google.com/google-ads/answer/9981650?hl=en'},
  {name: 'TikTok', mark: '♪', note: '', tone: 'violet', url: 'https://ads.tiktok.com/resources/help/article/playable-ads?lang=en-gb'},
  {name: 'TikTok Ad Network', mark: 'T', note: 'Ранее Pangle', tone: 'amber', url: 'https://ads.tiktok.com/resources/help/article/available-ad-formats-for-pangle'},
  {name: 'Snapchat', mark: 'S', note: '', tone: 'amber', url: 'https://www.developers.snap.com/marketing-api/Ads-API/media#upload-media---playable'},
 ];
}

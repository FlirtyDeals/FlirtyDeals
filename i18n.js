// ============================================
// FlirtyDeals.com - i18n.js
// Restores the multi-language feature that data-i18n attributes in the
// markup and assets/data/translations.json already imply, but that the
// Stitch export didn't ship any engine for. English page content is left
// in the HTML as the fallback/default; this file swaps it out at runtime.
// ============================================

(function () {
  'use strict';

  const LANG_KEY = 'flirtydeals_lang';
  const DEFAULT_LANG = 'en';
  const TRANSLATIONS_URLS = [
    '/translations.json',
    'translations.json',
    '/assets/data/translations.json',
    'assets/data/translations.json'
  ];

  // Human-readable labels for the language switcher. Keys must match the
  // top-level keys in translations.json.
  const LANGUAGE_FLAGS = {
    en: '🇬🇧', zh: '🇨🇳', hi: '🇮🇳', es: '🇪🇸', ar: '🇸🇦',
    bn: '🇧🇩', pt: '🇵🇹', ru: '🇷🇺', id: '🇮🇩', ur: '🇵🇰',
    ja: '🇯🇵', pa: '🇮🇳', fr: '🇫🇷', de: '🇩🇪'
  };

  const LANGUAGE_LABELS = {
    en: 'English',
    zh: '中文',
    hi: 'हिन्दी',
    es: 'Español',
    ar: 'العربية',
    bn: 'বাংলা',
    pt: 'Português',
    ru: 'Русский',
    id: 'Bahasa Indonesia',
    ur: 'اردو',
    ja: '日本語',
    pa: 'ਪੰਜਾਬੀ',
    fr: 'Français',
    de: 'Deutsch'
  };

  // Self-contained fallback: the language switcher works even when the JSON file is not fetchable.
  const BUILTIN_TRANSLATIONS = {
      "en": {
          "meta": {
              "title": "Cheap Porn Deals for $1 & Free Porn Discounts | FlirtyDeals.com",
              "description": "Cheapest Porn Discounts & Best Porn Deals on Sale Now! Get $1 Coupons & Buy Cheap Memberships on Top Porn Sites. Watch Free XXX Videos at FlirtyDeals.com today!",
              "og-title": "Cheap Porn Deals for $1 & Free Porn Discounts | FlirtyDeals.com",
              "og-description": "Cheapest Porn Discounts & Best Porn Deals on Sale Now! Get $1 Coupons & Buy Cheap Memberships on Top Porn Sites. Watch Free XXX Videos at FlirtyDeals.com today!"
          },
          "cookie": {
              "message": "We use cookies to enhance your browsing experience and analyze our traffic.",
              "accept": "✓ Accept",
              "reject": "✗ Reject",
              "customize": "⚙ Customize",
              "preferences-title": "Cookie Preferences",
              "necessary-title": "✅ Necessary Cookies",
              "necessary-description": "These cookies are essential for the website to function properly. They cannot be disabled.",
              "analytics-title": "📊 Analytics Cookies",
              "analytics-description": "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously (Google Analytics).",
              "save-preferences": "Save Preferences",
              "accept-all": "Accept All",
              "settings-btn-label": "Cookie settings"
          },
          "age": {
              "title": "🔞 Age Verification",
              "text": "You must be 18 years or older to view this content. Please confirm your age to continue.",
              "accept": "I am 18+ - Enter",
              "exit": "Exit"
          },
          "nav": {
              "title": "Cheap Porn Deals & Best Discounts",
              "subtitle": "Hot & Sexy HD XXX Videos Available • Free Porn Video Subscriptions",
              "language": "Language",
              "discord": "Discord"
          },
          "filter": {
              "all": "All Deals",
              "premium": "Premium Sites",
              "free": "Free Content",
              "shemale": "Shemale",
              "trending": "Trending"
          },
          "section": {
              "top": "Top Deals",
              "premium": "Premium Porn Sites",
              "free": "Free Porn Content & Trials",
              "shemale": "Shemale Porn Deals & Cheap Transgender Discounts"
          },
          "button": {
              "view-deal": "View Deal",
              "claim-freebie": "Claim Freebie",
              "chat-now": "Chat Now"
          },
          "free-text": "Free",
          "shemale": {
              "reveal": "Click to Reveal<br><small>(Shemale Content)</small>",
              "mature-label": "Mature Content",
              "reveal-hint": "Click to hide/reveal Trans Deals"
          },
          "footer": {
              "information": "Information",
              "terms": "Terms & Conditions",
              "privacy": "Privacy Policy",
              "about": "About Us",
              "blog": "Blog",
              "support": "Support",
              "faq": "FAQ",
              "contact": "Contact Us",
              "sitemap": "Sitemap",
              "compliance": "Compliance",
              "gdpr": "GDPR Compliance",
              "2257": "2257 Compliance",
              "follow": "Follow Us",
              "ai-girlfriend": "Ai Girlfriend",
              "copyright": "© 2026 FlirtyDeals.com - All rights reserved.",
              "tagline": "Your premium portal to the best deals in adult entertainment. Secure, private, and verified.",
              "bluesky": "Bluesky",
              "facebook": "Facebook",
              "discord": "Discord",
              "ai-girlfriend-link": "Ai Girlfriend"
          },
          "badge": {
              "featured": "Top Deal",
              "free": "Free",
              "discount-90": "90% Off",
              "discount-96": "96% Off",
              "discount-97": "97% Off"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "Bang Bros Pornstars fuck in virtual reality porn videos, VR in first person.",
              "bi_group_sex_4816ef53": "Bi Group Sex, Gangbangs, and Orgies with MILFs, Teens, and Euro Babes in HD",
              "bicurious_threesomes_a607bef0": "Bi-Curious Threesomes and Orgies with Straight Guys and Horny Couples in HD",
              "big_budget_porn_939cef9f": "Big Budget Porn, Legendary Titles, Long Movies & High Quality Porn Movies in HD",
              "create_your_own_2567df77": "Create your own AI GF, and generate hot images for your sexual fantasies.",
              "dm_our_ai_97b68dc0": "DM our AI Sexbots, erotic chatting & NSFW roleplay fantasies!",
              "exclusive_porn_video_9f442154": "Exclusive Porn Videos in HD featuring 2500+ pornstars in 10,000+ scenes",
              "free_hd_premium_80c039ef": "Free HD Premium Porn Videos in 4K, 1080p & 720p, No Ads, Top Pornstars",
              "hardcore_homemade_po_e7d69259": "Hardcore Homemade Porn with Deep Throat, Anal, and Tit Fucking in HD",
              "hardcore_lesbian_gla_23e4abb4": "Hardcore Lesbian Glam Porn with Beautiful Women and Erotic Dildo Sex",
              "hardcore_transgender_b0514418": "Hardcore Transgender Sex with Sexy Models and Double Penetrations",
              "hd_porn_videos_911395bc": "HD Porn Videos with Top Pornstars in Lesbian, Milf, and Teen Sex Scenarios",
              "horny_amateurs_and_2afdcfef": "Horny Amateurs and Teens in Hardcore Porn with Big Boobs",
              "horny_college_girls_eff8e389": "Horny College Girls, Drunk Teens, and Slutty Schoolgirls in Wild Sex Videos",
              "hot__sexy_73272450": "Hot & Sexy Teens HD Reality Porn with Naughty Schoolgirls & Perverted Teens",
              "hot_amateur_sex_4a549f25": "Hot Amateur Sex Videos, Live Cams & XXX Niches in a Social Community",
              "hot_women_in_bcbacc08": "Hot Women in Sensual Massage, Lesbian, and Milf Couples Sex Videos",
              "innocent_japanese_gi_976dcc44": "Innocent Japanese Girls Get Fucked in Hardcore Sex Videos with Cute Asians",
              "interactive_porn_wit_bfc2ee56": "Interactive Porn with Your Favorite Stars: Choose Your Own Sex Adventure",
              "mothers_and_daughter_ae77b18c": "Mothers and Daughters in Erotic Sex Videos with Sensual and Hardcore Porn",
              "original_amateur_por_0a634668": "Original Amateur Porn Videos with Hot Sex Scenes",
              "perfect_girls_in_34f46622": "Perfect Girls in HD Sensual Porn Videos with Beautiful Babes and Hot Action",
              "petite_teens_get_3fa66e0f": "Petite Teens Get Caught in Sneaky Pillow Humping Sex with Other Girls",
              "play_free_sex_18a4284e": "Play Free Sex Games, Porn Games & Adult Anime Games Online Now",
              "realtor_sells_house_5cea75ea": "Realtor Sells House For Sex With Client behind her Real Estate Agent Coworker",
              "sensual_lesbian_sex_d6a7d951": "Sensual Lesbian Sex with Pussy Licking, Kissing, and Real Orgasms in HD",
              "sexy_latinas_hot_e042f4bb": "Sexy Latinas, Hot South American Sluts, and Brazilian Girls with Big Boobs",
              "sexy_lesbian_bliss_02fbc3be": "Sexy Lesbian Bliss Teen Girls, Hardcore HD Pussy Licking & Strap On Sex",
              "sexy_milfs_in_c2f5b548": "Sexy Milfs in Hardcore HD Porn Videos with Big Boobs & Massive Cocks",
              "sexy_realtors_fuck_77197cf3": "Sexy Realtors Fuck for the House Sale in Hardcore HD Videos with Blowjobs",
              "taboo_family_affairs_d11e453b": "Taboo Family Affairs in HD Brother Sister Mom Dad Sex Secrets Revealed",
              "take_a_wild_33301cda": "Take a Wild Ride with Fake Taxi, Hot Women, Cops, and Dirty Encounters",
              "tinder_dates_gone_f7c52d3b": "Tinder Dates Gone Wild, Fuck on First Date with Hot Singles & Cute Hookups",
              "trans_women_explorin_e5af20f2": "Trans Women Exploring Sexuality with Men, Women, Threesomes & More",
              "transgender_erotic_t_2d0b1cbe": "Transgender Erotic TS Porn with HD Movies, Cumshots & Hot Anal Sex",
              "true_amateurs_fuck_b161a012": "True Amateurs Fuck in Hot Homemade Porn Videos with Naked Nymphos",
              "uncensored_hentai_in_2f7cc979": "Uncensored Hentai in HD Watch the Best Anime Sex and Weeb 3D Porn",
              "watch_good_girls_108264b4": "Watch Good Girls turn to Sluts, Innocent girls to Whores Transformations",
              "wet_pussy_fucking_2ee62f93": "Wet Pussy Fucking, Squirting, and Intense Orgasms in Close-Up HD Action",
              "women_cheating_on_7b4479fc": "Women Cheating on Husbands with Big Cocks at Parties & Bachelorette Bashes"
          },
          "hero": {
              "eyebrow": "Exclusive",
              "title-line1": "Unlock Premium Access for",
              "title-price": "Only $1.00",
              "subtitle": "Get instant access to top-tier adult content platforms for a fraction of the cost. Limited time offer.",
              "cta": "View Deal"
          }
      },
      "zh": {
          "meta": {
              "title": "1美元色情优惠和免费成人折扣 | FlirtyDeals.com",
              "description": "最便宜的成人折扣和最佳色情优惠！立即获取1美元优惠券，在顶级成人网站购买廉价会员。今天就在FlirtyDeals.com观看免费XXX视频！",
              "og-title": "1美元色情优惠和免费成人折扣 | FlirtyDeals.com",
              "og-description": "最便宜的成人折扣和最佳色情优惠！立即获取1美元优惠券，在顶级成人网站购买廉价会员。今天就在FlirtyDeals.com观看免费XXX视频！"
          },
          "cookie": {
              "message": "我们使用cookie来增强您的浏览体验并分析我们的流量。",
              "accept": "✓ 接受",
              "reject": "✗ 拒绝",
              "customize": "⚙ 自定义",
              "preferences-title": "Cookie偏好设置",
              "necessary-title": "✅ 必需Cookie",
              "necessary-description": "这些cookie对于网站正常运行至关重要，无法禁用。",
              "analytics-title": "📊 分析Cookie",
              "analytics-description": "这些cookie帮助我们了解访问者如何与我们的网站互动，通过匿名收集和报告信息（Google Analytics）。",
              "save-preferences": "保存偏好",
              "accept-all": "全部接受"
          },
          "age": {
              "title": "🔞 年龄验证",
              "text": "您必须年满18岁才能查看此内容。请确认您的年龄以继续。",
              "accept": "我已满18岁 - 进入",
              "exit": "退出"
          },
          "nav": {
              "title": "便宜的色情优惠和最佳折扣",
              "subtitle": "提供热辣性感的高清XXX视频 • 免费色情视频订阅"
          },
          "filter": {
              "all": "所有优惠",
              "premium": "高级网站",
              "free": "免费内容",
              "shemale": "人妖"
          },
          "section": {
              "top": "🔥 热门优惠",
              "premium": "💎 高级色情网站",
              "free": "🎁 免费色情内容和试用",
              "shemale": "🌈 人妖色情优惠和便宜的跨性别折扣"
          },
          "button": {
              "view-deal": "查看优惠",
              "claim-freebie": "领取免费",
              "chat-now": "立即聊天"
          },
          "free-text": "免费",
          "hero": {
              "eyebrow": "独家",
              "title-line1": "解锁高级访问权限",
              "title-price": "仅需 $1.00",
              "subtitle": "以一小部分成本即可获得顶级成人内容平台的即时访问权限。限时优惠。",
              "cta": "查看优惠"
          },
          "shemale": {
              "reveal": "点击显示<br><small>（人妖内容）</small>"
          },
          "footer": {
              "information": "信息",
              "terms": "条款和条件",
              "privacy": "隐私政策",
              "about": "关于我们",
              "blog": "博客",
              "support": "支持",
              "faq": "常见问题",
              "contact": "联系我们",
              "sitemap": "网站地图",
              "compliance": "合规性",
              "gdpr": "GDPR合规",
              "2257": "2257合规",
              "follow": "关注我们",
              "ai-girlfriend": "AI女友",
              "copyright": "© 2026 FlirtyDeals.com - 保留所有权利。"
          },
          "badge": {
              "featured": "热门优惠",
              "free": "免费",
              "discount-90": "90%折扣",
              "discount-96": "96%折扣",
              "discount-97": "97%折扣"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "Bang Bros色情明星在虚拟现实色情视频中做爱，第一人称VR体验",
              "bi_group_sex_4816ef53": "双性恋群交、多人性爱和狂欢派对，熟女、少女和欧洲美女的高清视频",
              "bicurious_threesomes_a607bef0": "双性好奇三人行和狂欢派对，直男和饥渴情侣的高清视频",
              "big_budget_porn_939cef9f": "大制作色情片、传奇作品、长篇电影和高品质成人电影高清视频",
              "create_your_own_2567df77": "创建你自己的AI女友，为你的性幻想生成火辣图片",
              "dm_our_ai_97b68dc0": "与我们的AI性爱机器人聊天，色情对话和NSFW角色扮演幻想！",
              "exclusive_porn_video_9f442154": "独家高清色情视频，收录2500+色情明星，10000+场景",
              "free_hd_premium_80c039ef": "免费高清优质色情视频4K、1080p和720p，无广告，顶级色情明星",
              "hardcore_homemade_po_e7d69259": "重口味自制色情片，深喉、肛交和乳交高清视频",
              "hardcore_lesbian_gla_23e4abb4": "重口味女同性恋魅力色情片，美女和情色假阳具性爱",
              "hardcore_transgender_b0514418": "重口味变性人性爱，性感模特和双重插入",
              "hd_porn_videos_911395bc": "高清色情视频，顶级色情明星出演女同、熟女和少女性爱场景",
              "horny_amateurs_and_2afdcfef": "饥渴业余爱好者和少女的重口味色情片，大胸部",
              "horny_college_girls_eff8e389": "饥渴大学女生、醉酒少女和放荡女学生的疯狂性爱视频",
              "hot__sexy_73272450": "火辣性感少女高清真人秀色情片，淘气女学生和变态少女",
              "hot_amateur_sex_4a549f25": "火辣业余性爱视频、实时摄像头和XXX细分社交社区",
              "hot_women_in_bcbacc08": "火辣女性的感性按摩、女同和熟女夫妻性爱视频",
              "innocent_japanese_gi_976dcc44": "天真的日本女孩在重口味性爱视频中被操，可爱亚洲人",
              "interactive_porn_wit_bfc2ee56": "与你最喜欢的明星互动色情片：选择你自己的性爱冒险",
              "mothers_and_daughter_ae77b18c": "母亲和女儿的情色性爱视频，感性和重口味色情片",
              "original_amateur_por_0a634668": "原创业余色情视频，火辣性爱场景",
              "perfect_girls_in_34f46622": "完美女孩的高清感性色情视频，美女和火辣动作",
              "petite_teens_get_3fa66e0f": "娇小少女被抓到与其他女孩偷偷进行枕头摩擦性爱",
              "play_free_sex_18a4284e": "立即在线玩免费性爱游戏、色情游戏和成人动漫游戏",
              "realtor_sells_house_5cea75ea": "房地产经纪人在同事背后与客户发生性关系来卖房子",
              "sensual_lesbian_sex_d6a7d951": "感性女同性爱，舔阴、接吻和真实高潮高清视频",
              "sexy_latinas_hot_e042f4bb": "性感拉丁女郎、火辣南美荡妇和巴西大胸女孩",
              "sexy_lesbian_bliss_02fbc3be": "性感女同极乐少女，重口味高清舔阴和绑带式性爱",
              "sexy_milfs_in_c2f5b548": "性感熟女的重口味高清色情视频，大胸部和巨大阴茎",
              "sexy_realtors_fuck_77197cf3": "性感房地产经纪人为了房屋销售而做爱，重口味高清口交视频",
              "taboo_family_affairs_d11e453b": "禁忌家庭事务高清兄妹父母性爱秘密揭示",
              "take_a_wild_33301cda": "与假出租车、火辣女性、警察和肮脏遭遇一起狂野驾驶",
              "tinder_dates_gone_f7c52d3b": "Tinder约会失控，第一次约会就做爱，火辣单身者和可爱约会",
              "trans_women_explorin_e5af20f2": "变性女性探索与男性、女性、三人行等的性行为",
              "transgender_erotic_t_2d0b1cbe": "变性人情色TS色情片，高清电影、射精和火辣肛交",
              "true_amateurs_fuck_b161a012": "真正的业余爱好者在火辣自制色情视频中做爱，裸体性感女郎",
              "uncensored_hentai_in_2f7cc979": "无修正变态高清观看最佳动漫性爱和宅男3D色情片",
              "watch_good_girls_108264b4": "观看好女孩变成荡妇，天真女孩变成妓女的转变",
              "wet_pussy_fucking_2ee62f93": "湿润阴部性交、喷水和强烈高潮的高清特写动作",
              "women_cheating_on_7b4479fc": "女性在派对和单身女郎派对上用大鸡巴欺骗丈夫"
          }
      },
      "hi": {
          "meta": {
              "title": "$1 के लिए सस्ते पोर्न डील और मुफ्त छूट | FlirtyDeals.com",
              "description": "सबसे सस्ती पोर्न छूट और सर्वोत्तम डील अभी बिक्री पर! $1 कूपन पाएं और शीर्ष पोर्न साइटों पर सस्ती सदस्यता खरीदें। आज FlirtyDeals.com पर मुफ्त XXX वीडियो देखें!",
              "og-title": "$1 के लिए सस्ते पोर्न डील और मुफ्त छूट | FlirtyDeals.com",
              "og-description": "सबसे सस्ती पोर्न छूट और सर्वोत्तम डील अभी बिक्री पर! $1 कूपन पाएं और शीर्ष पोर्न साइटों पर सस्ती सदस्यता खरीदें। आज FlirtyDeals.com पर मुफ्त XXX वीडियो देखें!"
          },
          "cookie": {
              "message": "हम आपके ब्राउज़िंग अनुभव को बेहतर बनाने और हमारे ट्रैफ़िक का विश्लेषण करने के लिए कुकीज़ का उपयोग करते हैं।",
              "accept": "✓ स्वीकार करें",
              "reject": "✗ अस्वीकार करें",
              "customize": "⚙ अनुकूलित करें",
              "preferences-title": "कुकी प्राथमिकताएँ",
              "necessary-title": "✅ आवश्यक कुकीज़",
              "necessary-description": "ये कुकीज़ वेबसाइट के ठीक से काम करने के लिए आवश्यक हैं। इन्हें अक्षम नहीं किया जा सकता।",
              "analytics-title": "📊 विश्लेषण कुकीज़",
              "analytics-description": "ये कुकीज़ हमें यह समझने में मदद करती हैं कि विज़िटर हमारी वेबसाइट के साथ कैसे इंटरैक्ट करते हैं, जानकारी को गुमनाम रूप से एकत्रित और रिपोर्ट करके (Google Analytics)।",
              "save-preferences": "प्राथमिकताएँ सहेजें",
              "accept-all": "सभी स्वीकार करें"
          },
          "age": {
              "title": "🔞 आयु सत्यापन",
              "text": "इस सामग्री को देखने के लिए आपकी आयु 18 वर्ष या अधिक होनी चाहिए। जारी रखने के लिए कृपया अपनी आयु की पुष्टि करें।",
              "accept": "मैं 18+ हूं - दर्ज करें",
              "exit": "बाहर निकलें"
          },
          "nav": {
              "title": "सस्ते पोर्न डील और सर्वोत्तम छूट",
              "subtitle": "हॉट और सेक्सी एचडी XXX वीडियो उपलब्ध • मुफ्त पोर्न वीडियो सदस्यता"
          },
          "filter": {
              "all": "सभी डील",
              "premium": "प्रीमियम साइट्स",
              "free": "मुफ्त सामग्री",
              "shemale": "शीमेल"
          },
          "section": {
              "top": "🔥 टॉप डील",
              "premium": "💎 प्रीमियम पोर्न साइट्स",
              "free": "🎁 मुफ्त पोर्न सामग्री और ट्रायल",
              "shemale": "🌈 शीमेल पोर्न डील और सस्ती ट्रांसजेंडर छूट"
          },
          "button": {
              "view-deal": "डील देखें",
              "claim-freebie": "मुफ्त प्राप्त करें",
              "chat-now": "अभी चैट करें"
          },
          "free-text": "मुफ्त",
          "hero": {
              "eyebrow": "एक्सक्लूसिव",
              "title-line1": "प्रीमियम एक्सेस अनलॉक करें",
              "title-price": "केवल $1.00",
              "subtitle": "शीर्ष वयस्क सामग्री प्लेटफॉर्म तक तत्काल पहुंच प्राप्त करें। सीमित समय के लिए प्रस्ताव।",
              "cta": "डील देखें"
          },
          "shemale": {
              "reveal": "प्रकट करने के लिए क्लिक करें<br><small>(शीमेल सामग्री)</small>"
          },
          "footer": {
              "information": "जानकारी",
              "terms": "नियम और शर्तें",
              "privacy": "गोपनीयता नीति",
              "about": "हमारे बारे में",
              "blog": "ब्लॉग",
              "support": "सहायता",
              "faq": "अक्सर पूछे जाने वाले प्रश्न",
              "contact": "संपर्क करें",
              "sitemap": "साइटमैप",
              "compliance": "अनुपालन",
              "gdpr": "GDPR अनुपालन",
              "2257": "2257 अनुपालन",
              "follow": "हमें फॉलो करें",
              "ai-girlfriend": "AI गर्लफ्रेंड",
              "copyright": "© 2026 FlirtyDeals.com - सर्वाधिकार सुरक्षित।"
          },
          "badge": {
              "featured": "शीर्ष सौदा",
              "free": "मुफ़्त",
              "discount-90": "90% छूट",
              "discount-96": "96% छूट",
              "discount-97": "97% छूट"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "बैंग ब्रोस पोर्नस्टार्स वर्चुअल रियलिटी पोर्न वीडियो में चुदाई करती हैं, फर्स्ट पर्सन VR",
              "bi_group_sex_4816ef53": "बाइसेक्शुअल ग्रुप सेक्स, गैंगबैंग और ऑर्जी MILFs, टीन्स और यूरो बेब्स के साथ HD में",
              "bicurious_threesomes_a607bef0": "बाइ-क्यूरियस थ्रीसम और ऑर्जी स्ट्रेट गाइज़ और हॉर्नी कपल्स के साथ HD में",
              "big_budget_porn_939cef9f": "बिग बजट पोर्न, लेजेंडरी टाइटल्स, लॉन्ग मूवीज़ और हाई क्वालिटी पोर्न मूवीज़ HD में",
              "create_your_own_2567df77": "अपनी खुद की AI गर्लफ्रेंड बनाएं और अपनी सेक्सुअल फैंटेसी के लिए हॉट इमेज जेनरेट करें",
              "dm_our_ai_97b68dc0": "हमारे AI सेक्सबॉट्स को DM करें, इरोटिक चैटिंग और NSFW रोलप्ले फैंटेसी!",
              "exclusive_porn_video_9f442154": "एक्सक्लूसिव पोर्न वीडियो HD में जिसमें 2500+ पोर्नस्टार्स और 10,000+ सीन्स हैं",
              "free_hd_premium_80c039ef": "फ्री HD प्रीमियम पोर्न वीडियो 4K, 1080p और 720p में, नो ऐड्स, टॉप पोर्नस्टार्स",
              "hardcore_homemade_po_e7d69259": "हार्डकोर होममेड पोर्न डीप थ्रोट, एनल और टिट फकिंग के साथ HD में",
              "hardcore_lesbian_gla_23e4abb4": "हार्डकोर लेस्बियन ग्लैम पोर्न ब्यूटीफुल वूमेन और इरोटिक डिल्डो सेक्स के साथ",
              "hardcore_transgender_b0514418": "हार्डकोर ट्रांसजेंडर सेक्स सेक्सी मॉडल्स और डबल पेनिट्रेशन के साथ",
              "hd_porn_videos_911395bc": "HD पोर्न वीडियो टॉप पोर्नस्टार्स के साथ लेस्बियन, मिल्फ और टीन सेक्स सीनेरियो में",
              "horny_amateurs_and_2afdcfef": "हॉर्नी एमेच्योर्स और टीन्स हार्डकोर पोर्न में बिग बूब्स के साथ",
              "horny_college_girls_eff8e389": "हॉर्नी कॉलेज गर्ल्स, ड्रंक टीन्स और स्लटी स्कूलगर्ल्स वाइल्ड सेक्स वीडियो में",
              "hot__sexy_73272450": "हॉट एंड सेक्सी टीन्स HD रियलिटी पोर्न नॉटी स्कूलगर्ल्स और परवर्टेड टीन्स के साथ",
              "hot_amateur_sex_4a549f25": "हॉट एमेच्योर सेक्स वीडियो, लाइव कैम्स और XXX निचेस सोशल कम्युनिटी में",
              "hot_women_in_bcbacc08": "हॉट वूमेन सेंसुअल मसाज, लेस्बियन और मिल्फ कपल्स सेक्स वीडियो में",
              "innocent_japanese_gi_976dcc44": "इनोसेंट जापानी गर्ल्स हार्डकोर सेक्स वीडियो में क्यूट एशियन्स के साथ चुदती हैं",
              "interactive_porn_wit_bfc2ee56": "इंटरैक्टिव पोर्न आपके फेवरेट स्टार्स के साथ: चूज़ योर ओन सेक्स एडवेंचर",
              "mothers_and_daughter_ae77b18c": "मदर्स और डॉटर्स इरोटिक सेक्स वीडियो में सेंसुअल और हार्डकोर पोर्न के साथ",
              "original_amateur_por_0a634668": "ओरिजिनल एमेच्योर पोर्न वीडियो हॉट सेक्स सीन्स के साथ",
              "perfect_girls_in_34f46622": "परफेक्ट गर्ल्स HD सेंसुअल पोर्न वीडियो में ब्यूटीफुल बेब्स और हॉट एक्शन के साथ",
              "petite_teens_get_3fa66e0f": "पेटाइट टीन्स स्नीकी पिलो हंपिंग सेक्स में दूसरी गर्ल्स के साथ पकड़ी जाती हैं",
              "play_free_sex_18a4284e": "फ्री सेक्स गेम्स, पोर्न गेम्स और एडल्ट एनिमे गेम्स अभी ऑनलाइन खेलें",
              "realtor_sells_house_5cea75ea": "रियाल्टर अपने रियल एस्टेट एजेंट सहकर्मी के पीछे क्लाइंट के साथ सेक्स के लिए घर बेचती है",
              "sensual_lesbian_sex_d6a7d951": "सेंसुअल लेस्बियन सेक्स पुसी लिकिंग, किसिंग और रियल ऑर्गाज़्म्स के साथ HD में",
              "sexy_latinas_hot_e042f4bb": "सेक्सी लैटिनास, हॉट साउथ अमेरिकन स्लट्स और ब्राज़ीलियन गर्ल्स बिग बूब्स के साथ",
              "sexy_lesbian_bliss_02fbc3be": "सेक्सी लेस्बियन ब्लिस टीन गर्ल्स, हार्डकोर HD पुसी लिकिंग और स्ट्रैप ऑन सेक्स",
              "sexy_milfs_in_c2f5b548": "सेक्सी मिल्फ़्स हार्डकोर HD पोर्न वीडियो में बिग बूब्स और मैसिव कॉक्स के साथ",
              "sexy_realtors_fuck_77197cf3": "सेक्सी रियाल्टर्स हाउस सेल के लिए चुदाई करती हैं हार्डकोर HD वीडियो में ब्लोजॉब्स के साथ",
              "taboo_family_affairs_d11e453b": "टैबू फैमिली अफेयर्स HD में ब्रदर सिस्टर मॉम डैड सेक्स सीक्रेट्स रिवील्ड",
              "take_a_wild_33301cda": "फेक टैक्सी, हॉट वूमेन, कॉप्स और डर्टी एनकाउंटर्स के साथ वाइल्ड राइड लें",
              "tinder_dates_gone_f7c52d3b": "टिंडर डेट्स गॉन वाइल्ड, फर्स्ट डेट पर चुदाई हॉट सिंगल्स और क्यूट हुकअप्स के साथ",
              "trans_women_explorin_e5af20f2": "ट्रांस वूमेन मेन, वूमेन, थ्रीसम और मोर के साथ सेक्शुअलिटी एक्सप्लोर करती हैं",
              "transgender_erotic_t_2d0b1cbe": "ट्रांसजेंडर इरोटिक TS पोर्न HD मूवीज़, कमशॉट्स और हॉट एनल सेक्स के साथ",
              "true_amateurs_fuck_b161a012": "ट्रू एमेच्योर्स हॉट होममेड पोर्न वीडियो में नेकेड निम्फोस के साथ चुदाई करते हैं",
              "uncensored_hentai_in_2f7cc979": "अनसेंसर्ड हेंटाई HD में बेस्ट एनिमे सेक्स और वीब 3D पोर्न देखें",
              "watch_good_girls_108264b4": "गुड गर्ल्स को स्लट्स में बदलते, इनोसेंट गर्ल्स को होर्स ट्रांसफॉर्मेशन में देखें",
              "wet_pussy_fucking_2ee62f93": "वेट पुसी फकिंग, स्क्वर्टिंग और इंटेंस ऑर्गाज़्म्स क्लोज़-अप HD एक्शन में",
              "women_cheating_on_7b4479fc": "वूमेन पार्टीज़ और बैचलरेट बैश में बिग कॉक्स के साथ हज़्बैंड्स को धोखा देती हैं"
          }
      },
      "es": {
          "meta": {
              "title": "Ofertas de Porno por $1 y Descuentos Gratis | FlirtyDeals.com",
              "description": "¡Los descuentos de porno más baratos y las mejores ofertas en venta ahora! Obtén cupones de $1 y compra membresías baratas en los mejores sitios porno. ¡Mira videos XXX gratis en FlirtyDeals.com hoy!",
              "og-title": "Ofertas de Porno por $1 y Descuentos Gratis | FlirtyDeals.com",
              "og-description": "¡Los descuentos de porno más baratos y las mejores ofertas en venta ahora! Obtén cupones de $1 y compra membresías baratas en los mejores sitios porno. ¡Mira videos XXX gratis en FlirtyDeals.com hoy!"
          },
          "cookie": {
              "message": "Usamos cookies para mejorar su experiencia de navegación y analizar nuestro tráfico.",
              "accept": "✓ Aceptar",
              "reject": "✗ Rechazar",
              "customize": "⚙ Personalizar",
              "preferences-title": "Preferencias de Cookies",
              "necessary-title": "✅ Cookies Necesarias",
              "necessary-description": "Estas cookies son esenciales para que el sitio web funcione correctamente. No se pueden desactivar.",
              "analytics-title": "📊 Cookies de Análisis",
              "analytics-description": "Estas cookies nos ayudan a comprender cómo los visitantes interactúan con nuestro sitio web al recopilar e informar información de forma anónima (Google Analytics).",
              "save-preferences": "Guardar Preferencias",
              "accept-all": "Aceptar Todo"
          },
          "age": {
              "title": "🔞 Verificación de Edad",
              "text": "Debes tener 18 años o más para ver este contenido. Por favor confirma tu edad para continuar.",
              "accept": "Tengo 18+ - Entrar",
              "exit": "Salir"
          },
          "nav": {
              "title": "Ofertas de Porno Baratas y Mejores Descuentos",
              "subtitle": "Videos XXX HD Calientes y Sexys Disponibles • Suscripciones de Video Porno Gratis"
          },
          "filter": {
              "all": "Todas las Ofertas",
              "premium": "Sitios Premium",
              "free": "Contenido Gratis",
              "shemale": "Shemale"
          },
          "section": {
              "top": "🔥 Mejores Ofertas",
              "premium": "💎 Sitios Porno Premium",
              "free": "🎁 Contenido Porno Gratis y Pruebas",
              "shemale": "🌈 Ofertas de Porno Shemale y Descuentos Trans Baratos"
          },
          "button": {
              "view-deal": "Ver Oferta",
              "claim-freebie": "Reclamar Gratis",
              "chat-now": "Chatear Ahora"
          },
          "free-text": "Gratis",
          "hero": {
              "eyebrow": "Exclusivo",
              "title-line1": "Desbloquea acceso premium",
              "title-price": "Solo $1.00",
              "subtitle": "Obtén acceso instantáneo a las mejores plataformas de contenido para adultos a una fracción del costo. Oferta por tiempo limitado.",
              "cta": "Ver oferta"
          },
          "shemale": {
              "reveal": "Haz clic para Revelar<br><small>(Contenido Shemale)</small>"
          },
          "footer": {
              "information": "Información",
              "terms": "Términos y Condiciones",
              "privacy": "Política de Privacidad",
              "about": "Sobre Nosotros",
              "blog": "Blog",
              "support": "Soporte",
              "faq": "Preguntas Frecuentes",
              "contact": "Contáctanos",
              "sitemap": "Mapa del Sitio",
              "compliance": "Cumplimiento",
              "gdpr": "Cumplimiento GDPR",
              "2257": "Cumplimiento 2257",
              "follow": "Síguenos",
              "ai-girlfriend": "Novia AI",
              "copyright": "© 2026 FlirtyDeals.com - Todos los derechos reservados."
          },
          "badge": {
              "featured": "Oferta Principal",
              "free": "Gratis",
              "discount-90": "90% de descuento",
              "discount-96": "96% de descuento",
              "discount-97": "97% de descuento"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "Las estrellas porno de Bang Bros follan en videos porno de realidad virtual, VR en primera persona",
              "bi_group_sex_4816ef53": "Sexo grupal bisexual, gangbangs y orgías con MILFs, adolescentes y bellezas europeas en HD",
              "bicurious_threesomes_a607bef0": "Tríos y orgías bi-curiosos con chicos hetero y parejas cachondas en HD",
              "big_budget_porn_939cef9f": "Porno de gran presupuesto, títulos legendarios, películas largas y películas porno de alta calidad en HD",
              "create_your_own_2567df77": "Crea tu propia novia AI y genera imágenes calientes para tus fantasías sexuales",
              "dm_our_ai_97b68dc0": "¡Envía DM a nuestros sexbots AI, chateo erótico y fantasías de juego de rol NSFW!",
              "exclusive_porn_video_9f442154": "Videos porno exclusivos en HD con más de 2500 estrellas porno en más de 10,000 escenas",
              "free_hd_premium_80c039ef": "Videos porno premium gratuitos en HD 4K, 1080p y 720p, sin anuncios, estrellas porno top",
              "hardcore_homemade_po_e7d69259": "Porno casero hardcore con garganta profunda, anal y folladas de tetas en HD",
              "hardcore_lesbian_gla_23e4abb4": "Porno lésbico glamuroso hardcore con mujeres hermosas y sexo erótico con consolador",
              "hardcore_transgender_b0514418": "Sexo transgénero hardcore con modelos sexys y dobles penetraciones",
              "hd_porn_videos_911395bc": "Videos porno en HD con estrellas porno top en escenarios de sexo lésbico, MILF y adolescente",
              "horny_amateurs_and_2afdcfef": "Aficionadas cachondas y adolescentes en porno hardcore con tetas grandes",
              "horny_college_girls_eff8e389": "Chicas universitarias cachondas, adolescentes borrachas y colegialas putas en videos de sexo salvaje",
              "hot__sexy_73272450": "Porno de realidad HD de adolescentes calientes y sexys con colegialas traviesas y adolescentes pervertidas",
              "hot_amateur_sex_4a549f25": "Videos de sexo amateur caliente, cámaras en vivo y nichos XXX en una comunidad social",
              "hot_women_in_bcbacc08": "Mujeres calientes en masajes sensuales, videos de sexo lésbico y parejas MILF",
              "innocent_japanese_gi_976dcc44": "Chicas japonesas inocentes folladas en videos de sexo hardcore con asiáticas lindas",
              "interactive_porn_wit_bfc2ee56": "Porno interactivo con tus estrellas favoritas: elige tu propia aventura sexual",
              "mothers_and_daughter_ae77b18c": "Madres e hijas en videos de sexo erótico con porno sensual y hardcore",
              "original_amateur_por_0a634668": "Videos porno amateur originales con escenas de sexo caliente",
              "perfect_girls_in_34f46622": "Chicas perfectas en videos porno sensuales HD con bellezas hermosas y acción caliente",
              "petite_teens_get_3fa66e0f": "Adolescentes pequeñas atrapadas en sexo furtivo frotándose con almohadas con otras chicas",
              "play_free_sex_18a4284e": "Juega juegos de sexo gratis, juegos porno y juegos de anime para adultos en línea ahora",
              "realtor_sells_house_5cea75ea": "Agente inmobiliaria vende casa por sexo con cliente a espaldas de su compañero agente",
              "sensual_lesbian_sex_d6a7d951": "Sexo lésbico sensual con lamidas de coño, besos y orgasmos reales en HD",
              "sexy_latinas_hot_e042f4bb": "Latinas sexys, putas sudamericanas calientes y chicas brasileñas con tetas grandes",
              "sexy_lesbian_bliss_02fbc3be": "Éxtasis lésbico sexy con chicas adolescentes, lamidas de coño HD hardcore y sexo con arnés",
              "sexy_milfs_in_c2f5b548": "MILFs sexys en videos porno hardcore HD con tetas grandes y pollas enormes",
              "sexy_realtors_fuck_77197cf3": "Agentes inmobiliarias sexys follan por la venta de la casa en videos HD hardcore con mamadas",
              "taboo_family_affairs_d11e453b": "Asuntos familiares tabú en HD secretos de sexo entre hermano, hermana, mamá y papá revelados",
              "take_a_wild_33301cda": "Date un paseo salvaje con Fake Taxi, mujeres calientes, policías y encuentros sucios",
              "tinder_dates_gone_f7c52d3b": "Citas de Tinder descontroladas, follar en la primera cita con solteros calientes y encuentros lindos",
              "trans_women_explorin_e5af20f2": "Mujeres trans explorando sexualidad con hombres, mujeres, tríos y más",
              "transgender_erotic_t_2d0b1cbe": "Porno erótico transgénero TS con películas HD, corridas y sexo anal caliente",
              "true_amateurs_fuck_b161a012": "Aficionados verdaderos follan en videos porno caseros calientes con ninfómanas desnudas",
              "uncensored_hentai_in_2f7cc979": "Hentai sin censura en HD mira el mejor sexo anime y porno 3D weeb",
              "watch_good_girls_108264b4": "Mira cómo las chicas buenas se convierten en putas, transformaciones de chicas inocentes a prostitutas",
              "wet_pussy_fucking_2ee62f93": "Folladas de coño mojado, squirting y orgasmos intensos en acción HD de primer plano",
              "women_cheating_on_7b4479fc": "Mujeres engañando a esposos con pollas grandes en fiestas y despedidas de soltera"
          }
      },
      "ar": {
          "meta": {
              "title": "عروض الأفلام الإباحية بدولار واحد وخصومات مجانية | FlirtyDeals.com",
              "description": "أرخص خصومات الأفلام الإباحية وأفضل العروض معروضة للبيع الآن! احصل على قسائم بقيمة دولار واحد واشتري عضويات رخيصة في أفضل المواقع الإباحية. شاهد مقاطع فيديو XXX مجانية على FlirtyDeals.com اليوم!",
              "og-title": "عروض الأفلام الإباحية بدولار واحد وخصومات مجانية | FlirtyDeals.com",
              "og-description": "أرخص خصومات الأفلام الإباحية وأفضل العروض معروضة للبيع الآن! احصل على قسائم بقيمة دولار واحد واشتري عضويات رخيصة في أفضل المواقع الإباحية. شاهد مقاطع فيديو XXX مجانية على FlirtyDeals.com اليوم!"
          },
          "cookie": {
              "message": "نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك وتحليل حركة المرور لدينا.",
              "accept": "✓ قبول",
              "reject": "✗ رفض",
              "customize": "⚙ تخصيص",
              "preferences-title": "تفضيلات ملفات تعريف الارتباط",
              "necessary-title": "✅ ملفات تعريف الارتباط الضرورية",
              "necessary-description": "ملفات تعريف الارتباط هذه ضرورية لكي يعمل الموقع بشكل صحيح. لا يمكن تعطيلها.",
              "analytics-title": "📊 ملفات تعريف ارتباط التحليلات",
              "analytics-description": "تساعدنا ملفات تعريف الارتباط هذه في فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع المعلومات والإبلاغ عنها بشكل مجهول (Google Analytics).",
              "save-preferences": "حفظ التفضيلات",
              "accept-all": "قبول الكل"
          },
          "age": {
              "title": "🔞 التحقق من العمر",
              "text": "يجب أن يكون عمرك 18 عامًا أو أكبر لعرض هذا المحتوى. يرجى تأكيد عمرك للمتابعة.",
              "accept": "أنا 18+ - أدخل",
              "exit": "خروج"
          },
          "nav": {
              "title": "صفقات الأفلام الإباحية الرخيصة وأفضل الخصومات",
              "subtitle": "فيديوهات XXX ساخنة ومثيرة متاحة بجودة عالية • اشتراكات فيديو إباحية مجانية"
          },
          "filter": {
              "all": "جميع العروض",
              "premium": "مواقع مميزة",
              "free": "محتوى مجاني",
              "shemale": "شيميل"
          },
          "section": {
              "top": "🔥 أفضل العروض",
              "premium": "💎 مواقع إباحية مميزة",
              "free": "🎁 محتوى إباحي مجاني وتجارب",
              "shemale": "🌈 صفقات الأفلام الإباحية للشيميل وخصومات المتحولين جنسياً الرخيصة"
          },
          "button": {
              "view-deal": "عرض الصفقة",
              "claim-freebie": "احصل على المجاني",
              "chat-now": "دردش الآن"
          },
          "free-text": "مجاني",
          "hero": {
              "eyebrow": "حصري",
              "title-line1": "فتح الوصول المميز",
              "title-price": "فقط $1.00",
              "subtitle": "احصل على وصول فوري إلى منصات محتوى البالغين الأعلى بجزء من التكلفة. عرض محدود الوقت.",
              "cta": "عرض العروض"
          },
          "shemale": {
              "reveal": "انقر للكشف<br><small>(محتوى شيميل)</small>"
          },
          "footer": {
              "information": "معلومات",
              "terms": "الشروط والأحكام",
              "privacy": "سياسة الخصوصية",
              "about": "من نحن",
              "blog": "مدونة",
              "support": "الدعم",
              "faq": "الأسئلة الشائعة",
              "contact": "اتصل بنا",
              "sitemap": "خريطة الموقع",
              "compliance": "الامتثال",
              "gdpr": "الامتثال لـ GDPR",
              "2257": "الامتثال 2257",
              "follow": "تابعنا",
              "ai-girlfriend": "صديقة الذكاء الاصطناعي",
              "copyright": "© 2026 FlirtyDeals.com - جميع الحقوق محفوظة."
          },
          "badge": {
              "featured": "أفضل عرض",
              "free": "مجاني",
              "discount-90": "خصم 90%",
              "discount-96": "خصم 96%",
              "discount-97": "خصم 97%"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "نجمات Bang Bros الإباحيات يمارسن الجنس في مقاطع فيديو إباحية بالواقع الافتراضي، VR من منظور الشخص الأول",
              "bi_group_sex_4816ef53": "جنس جماعي ثنائي، حفلات جنس جماعي وهياج جنسي مع MILFs والمراهقات والجميلات الأوروبيات بجودة عالية",
              "bicurious_threesomes_a607bef0": "ثلاثيات وهياج جنسي ثنائي الفضول مع رجال مستقيمين وأزواج شهوانيين بجودة عالية",
              "big_budget_porn_939cef9f": "أفلام إباحية بميزانية كبيرة، عناوين أسطورية، أفلام طويلة وأفلام إباحية عالية الجودة بدقة عالية",
              "create_your_own_2567df77": "أنشئ صديقتك الخاصة بالذكاء الاصطناعي، وولد صوراً ساخنة لخيالاتك الجنسية",
              "dm_our_ai_97b68dc0": "أرسل رسالة مباشرة لروبوتات الجنس بالذكاء الاصطناعي، دردشة مثيرة وخيالات لعب أدوار NSFW!",
              "exclusive_porn_video_9f442154": "مقاطع فيديو إباحية حصرية بدقة عالية تضم أكثر من 2500 نجمة إباحية في أكثر من 10,000 مشهد",
              "free_hd_premium_80c039ef": "مقاطع فيديو إباحية مميزة مجانية بدقة عالية 4K و1080p و720p، بدون إعلانات، نجوم إباحية من الدرجة الأولى",
              "hardcore_homemade_po_e7d69259": "أفلام إباحية منزلية صلبة مع الحلق العميق والجنس الشرجي ونيك الثدي بدقة عالية",
              "hardcore_lesbian_gla_23e4abb4": "أفلام إباحية سحاقية ساحرة صلبة مع نساء جميلات وجنس مثير بالأدوات",
              "hardcore_transgender_b0514418": "جنس متحولين جنسياً صلب مع موديلات مثيرات واختراقات مزدوجة",
              "hd_porn_videos_911395bc": "مقاطع فيديو إباحية بدقة عالية مع نجوم إباحية من الدرجة الأولى في سيناريوهات جنس سحاقي وميلف ومراهقات",
              "horny_amateurs_and_2afdcfef": "هواة شهوانيون ومراهقات في أفلام إباحية صلبة مع ثدي كبير",
              "horny_college_girls_eff8e389": "فتيات جامعيات شهوانيات، مراهقات سكرانات وفتيات مدارس عاهرات في مقاطع فيديو جنس جامح",
              "hot__sexy_73272450": "أفلام إباحية واقعية بدقة عالية لمراهقات ساخنات ومثيرات مع فتيات مدارس شقيات ومراهقات منحرفات",
              "hot_amateur_sex_4a549f25": "مقاطع فيديو جنس هواة ساخنة، كاميرات مباشرة ومنافذ XXX في مجتمع اجتماعي",
              "hot_women_in_bcbacc08": "نساء ساخنات في تدليك حسي، ومقاطع فيديو جنس سحاقي وأزواج ميلف",
              "innocent_japanese_gi_976dcc44": "فتيات يابانيات بريئات يمارسن الجنس في مقاطع فيديو جنس صلب مع آسيويات لطيفات",
              "interactive_porn_wit_bfc2ee56": "أفلام إباحية تفاعلية مع نجومك المفضلين: اختر مغامرتك الجنسية الخاصة",
              "mothers_and_daughter_ae77b18c": "أمهات وبنات في مقاطع فيديو جنس مثيرة مع أفلام إباحية حسية وصلبة",
              "original_amateur_por_0a634668": "مقاطع فيديو إباحية هواة أصلية مع مشاهد جنس ساخنة",
              "perfect_girls_in_34f46622": "فتيات مثاليات في مقاطع فيديو إباحية حسية بدقة عالية مع جميلات ومشاهد ساخنة",
              "petite_teens_get_3fa66e0f": "مراهقات صغيرات يتم القبض عليهن في جنس احتكاك الوسائد الخفي مع فتيات أخريات",
              "play_free_sex_18a4284e": "العب ألعاب جنس مجانية، ألعاب إباحية وألعاب أنمي للبالغين على الإنترنت الآن",
              "realtor_sells_house_5cea75ea": "وكيلة عقارات تبيع منزلاً مقابل ممارسة الجنس مع العميل خلف ظهر زميلها وكيل العقارات",
              "sensual_lesbian_sex_d6a7d951": "جنس سحاقي حسي مع لعق الكس والتقبيل ونشوات حقيقية بدقة عالية",
              "sexy_latinas_hot_e042f4bb": "لاتينيات مثيرات، عاهرات أمريكا الجنوبية الساخنات وفتيات برازيليات بثدي كبير",
              "sexy_lesbian_bliss_02fbc3be": "نعيم سحاقي مثير لفتيات مراهقات، لعق كس صلب بدقة عالية وجنس بحزام",
              "sexy_milfs_in_c2f5b548": "ميلفز مثيرات في مقاطع فيديو إباحية صلبة بدقة عالية مع ثدي كبير وأعضاء ذكرية ضخمة",
              "sexy_realtors_fuck_77197cf3": "وكيلات عقارات مثيرات يمارسن الجنس من أجل بيع المنزل في مقاطع فيديو صلبة بدقة عالية مع مص",
              "taboo_family_affairs_d11e453b": "شؤون عائلية محرمة بدقة عالية أسرار جنس الأخ والأخت والأم والأب مكشوفة",
              "take_a_wild_33301cda": "خذ رحلة جامحة مع Fake Taxi، نساء ساخنات، شرطة ولقاءات قذرة",
              "tinder_dates_gone_f7c52d3b": "مواعيد Tinder الجامحة، ممارسة الجنس في الموعد الأول مع عزاب ساخنين ولقاءات لطيفة",
              "trans_women_explorin_e5af20f2": "نساء متحولات جنسياً يستكشفن الجنس مع الرجال والنساء والثلاثيات والمزيد",
              "transgender_erotic_t_2d0b1cbe": "أفلام إباحية مثيرة للمتحولين جنسياً TS مع أفلام بدقة عالية، قذف وجنس شرجي ساخن",
              "true_amateurs_fuck_b161a012": "هواة حقيقيون يمارسون الجنس في مقاطع فيديو إباحية منزلية ساخنة مع حوريات عاريات",
              "uncensored_hentai_in_2f7cc979": "هنتاي غير خاضع للرقابة بدقة عالية شاهد أفضل جنس أنمي وأفلام إباحية ثلاثية الأبعاد",
              "watch_good_girls_108264b4": "شاهد الفتيات الطيبات يتحولن إلى عاهرات، تحولات الفتيات البريئات إلى عاهرات",
              "wet_pussy_fucking_2ee62f93": "نيك كس مبلل، تدفق ونشوات مكثفة في مشاهد مقربة بدقة عالية",
              "women_cheating_on_7b4479fc": "نساء يخدعن الأزواج بأعضاء ذكرية كبيرة في الحفلات وحفلات العزوبية"
          }
      },
      "bn": {
          "meta": {
              "title": "$1 এর জন্য সস্তা পর্ন ডিল এবং ফ্রি ছাড় | FlirtyDeals.com",
              "description": "সবচেয়ে সস্তা পর্ন ডিসকাউন্ট এবং সেরা ডিল এখন বিক্রয়ে! $1 কুপন পান এবং শীর্ষ পর্ন সাইটগুলিতে সস্তা সদস্যতা কিনুন। আজই FlirtyDeals.com এ বিনামূল্যে XXX ভিডিও দেখুন!",
              "og-title": "$1 এর জন্য সস্তা পর্ন ডিল এবং ফ্রি ছাড় | FlirtyDeals.com",
              "og-description": "সবচেয়ে সস্তা পর্ন ডিসকাউন্ট এবং সেরা ডিল এখন বিক্রয়ে! $1 কুপন পান এবং শীর্ষ পর্ন সাইটগুলিতে সস্তা সদস্যতা কিনুন। আজই FlirtyDeals.com এ বিনামূল্যে XXX ভিডিও দেখুন!"
          },
          "cookie": {
              "message": "আমরা আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে এবং আমাদের ট্রাফিক বিশ্লেষণ করতে কুকি ব্যবহার করি।",
              "accept": "✓ গ্রহণ করুন",
              "reject": "✗ প্রত্যাখ্যান করুন",
              "customize": "⚙ কাস্টমাইজ করুন",
              "preferences-title": "কুকি পছন্দসমূহ",
              "necessary-title": "✅ প্রয়োজনীয় কুকি",
              "necessary-description": "এই কুকিগুলি ওয়েবসাইট সঠিকভাবে কাজ করার জন্য অপরিহার্য। এগুলি অক্ষম করা যায় না।",
              "analytics-title": "📊 বিশ্লেষণ কুকি",
              "analytics-description": "এই কুকিগুলি আমাদের বুঝতে সাহায্য করে যে দর্শকরা কীভাবে আমাদের ওয়েবসাইটের সাথে ইন্টারঅ্যাক্ট করেন, তথ্য বেনামে সংগ্রহ এবং রিপোর্ট করার মাধ্যমে (Google Analytics)।",
              "save-preferences": "পছন্দ সংরক্ষণ করুন",
              "accept-all": "সব গ্রহণ করুন"
          },
          "age": {
              "title": "🔞 বয়স যাচাইকরণ",
              "text": "এই বিষয়বস্তু দেখতে আপনার বয়স 18 বছর বা তার বেশি হতে হবে। অব্যাহত রাখতে দয়া করে আপনার বয়স নিশ্চিত করুন।",
              "accept": "আমি 18+ - এন্টার করুন",
              "exit": "প্রস্থান"
          },
          "nav": {
              "title": "সস্তা পর্ন ডিল এবং সেরা ছাড়",
              "subtitle": "হট এবং সেক্সি এইচডি XXX ভিডিও উপলব্ধ • ফ্রি পর্ন ভিডিও সাবস্ক্রিপশন"
          },
          "filter": {
              "all": "সব ডিল",
              "premium": "প্রিমিয়াম সাইট",
              "free": "বিনামূল্যে সামগ্রী",
              "shemale": "শিমেল"
          },
          "section": {
              "top": "🔥 টপ ডিল",
              "premium": "💎 প্রিমিয়াম পর্ন সাইট",
              "free": "🎁 ফ্রি পর্ন কনটেন্ট এবং ট্রায়াল",
              "shemale": "🌈 শিমেল পর্ন ডিল এবং সস্তা ট্রান্সজেন্ডার ছাড়"
          },
          "button": {
              "view-deal": "ডিল দেখুন",
              "claim-freebie": "ফ্রিবি দাবি করুন",
              "chat-now": "এখন চ্যাট করুন"
          },
          "free-text": "বিনামূল্যে",
          "shemale": {
              "reveal": "প্রকাশ করতে ক্লিক করুন<br><small>(শিমেল বিষয়বস্তু)</small>"
          },
          "footer": {
              "information": "তথ্য",
              "terms": "শর্তাবলী",
              "privacy": "গোপনীয়তা নীতি",
              "about": "আমাদের সম্পর্কে",
              "blog": "ব্লগ",
              "support": "সহায়তা",
              "faq": "সাধারণ প্রশ্ন",
              "contact": "যোগাযোগ করুন",
              "sitemap": "সাইটম্যাপ",
              "compliance": "সম্মতি",
              "gdpr": "GDPR সম্মতি",
              "2257": "2257 সম্মতি",
              "follow": "আমাদের অনুসরণ করুন",
              "ai-girlfriend": "AI গার্লফ্রেন্ড",
              "copyright": "© 2026 FlirtyDeals.com - সর্বস্বত্ব সংরক্ষিত।"
          },
          "badge": {
              "featured": "সেরা ডিল",
              "free": "বিনামূল্যে",
              "discount-90": "90% ছাড়",
              "discount-96": "96% ছাড়",
              "discount-97": "97% ছাড়"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "ব্যাং ব্রোস পর্নস্টাররা ভার্চুয়াল রিয়েলিটি পর্ন ভিডিওতে সেক্স করে, প্রথম ব্যক্তিতে VR",
              "bi_group_sex_4816ef53": "বাই গ্রুপ সেক্স, গ্যাংব্যাং এবং অর্গি MILFs, টিনস এবং ইউরো বেবস এর সাথে HD তে",
              "bicurious_threesomes_a607bef0": "বাই-কিউরিয়াস থ্রিসাম এবং অর্গি স্ট্রেট গাইস এবং হর্নি কাপলস এর সাথে HD তে",
              "big_budget_porn_939cef9f": "বিগ বাজেট পর্ন, লিজেন্ডারি টাইটেল, লং মুভিজ এবং হাই কোয়ালিটি পর্ন মুভিজ HD তে",
              "create_your_own_2567df77": "আপনার নিজের AI গার্লফ্রেন্ড তৈরি করুন এবং আপনার যৌন ফ্যান্টাসির জন্য হট ছবি তৈরি করুন",
              "dm_our_ai_97b68dc0": "আমাদের AI সেক্সবটদের DM করুন, ইরোটিক চ্যাটিং এবং NSFW রোলপ্লে ফ্যান্টাসি!",
              "exclusive_porn_video_9f442154": "এক্সক্লুসিভ পর্ন ভিডিও HD তে যাতে ২৫০০+ পর্নস্টার এবং ১০,০০০+ দৃশ্য রয়েছে",
              "free_hd_premium_80c039ef": "ফ্রি HD প্রিমিয়াম পর্ন ভিডিও 4K, 1080p এবং 720p তে, নো অ্যাডস, টপ পর্নস্টারস",
              "hardcore_homemade_po_e7d69259": "হার্ডকোর হোমমেড পর্ন ডিপ থ্রোট, অ্যানাল এবং টিট ফাকিং এর সাথে HD তে",
              "hardcore_lesbian_gla_23e4abb4": "হার্ডকোর লেসবিয়ান গ্ল্যাম পর্ন সুন্দর মহিলা এবং ইরোটিক ডিলডো সেক্স এর সাথে",
              "hardcore_transgender_b0514418": "হার্ডকোর ট্রান্সজেন্ডার সেক্স সেক্সি মডেল এবং ডাবল পেনিট্রেশন এর সাথে",
              "hd_porn_videos_911395bc": "HD পর্ন ভিডিও টপ পর্নস্টারদের সাথে লেসবিয়ান, মিল্ফ এবং টিন সেক্স সিনারিওতে",
              "horny_amateurs_and_2afdcfef": "হর্নি অ্যামেচার এবং টিনস হার্ডকোর পর্নে বিগ বুবস এর সাথে",
              "horny_college_girls_eff8e389": "হর্নি কলেজ গার্লস, ড্রাঙ্ক টিনস এবং স্লাটি স্কুলগার্লস ওয়াইল্ড সেক্স ভিডিওতে",
              "hot__sexy_73272450": "হট এবং সেক্সি টিনস HD রিয়েলিটি পর্ন নটি স্কুলগার্লস এবং পারভার্টেড টিনস এর সাথে",
              "hot_amateur_sex_4a549f25": "হট অ্যামেচার সেক্স ভিডিও, লাইভ ক্যামস এবং XXX নিশেস সোশ্যাল কমিউনিটিতে",
              "hot_women_in_bcbacc08": "হট উইমেন সেনশুয়াল ম্যাসেজ, লেসবিয়ান এবং মিল্ফ কাপলস সেক্স ভিডিওতে",
              "innocent_japanese_gi_976dcc44": "ইনোসেন্ট জাপানিজ গার্লস হার্ডকোর সেক্স ভিডিওতে কিউট এশিয়ানদের সাথে চোদাচুদি করে",
              "interactive_porn_wit_bfc2ee56": "ইন্টারঅ্যাক্টিভ পর্ন আপনার প্রিয় স্টারদের সাথে: আপনার নিজের সেক্স অ্যাডভেঞ্চার চয়ন করুন",
              "mothers_and_daughter_ae77b18c": "মাদার্স এবং ডটারস ইরোটিক সেক্স ভিডিওতে সেনশুয়াল এবং হার্ডকোর পর্ন এর সাথে",
              "original_amateur_por_0a634668": "অরিজিনাল অ্যামেচার পর্ন ভিডিও হট সেক্স সিনস এর সাথে",
              "perfect_girls_in_34f46622": "পারফেক্ট গার্লস HD সেনশুয়াল পর্ন ভিডিওতে বিউটিফুল বেবস এবং হট অ্যাকশন এর সাথে",
              "petite_teens_get_3fa66e0f": "পেটাইট টিনস স্নিকি পিলো হাম্পিং সেক্সে অন্যান্য গার্লসদের সাথে ধরা পড়ে",
              "play_free_sex_18a4284e": "ফ্রি সেক্স গেমস, পর্ন গেমস এবং অ্যাডাল্ট অ্যানিমে গেমস এখনই অনলাইনে খেলুন",
              "realtor_sells_house_5cea75ea": "রিয়েলটর তার রিয়েল এস্টেট এজেন্ট সহকর্মীর পিছনে ক্লায়েন্টের সাথে সেক্সের জন্য বাড়ি বিক্রি করে",
              "sensual_lesbian_sex_d6a7d951": "সেনশুয়াল লেসবিয়ান সেক্স পুসি লিকিং, কিসিং এবং রিয়েল অর্গাজম এর সাথে HD তে",
              "sexy_latinas_hot_e042f4bb": "সেক্সি ল্যাটিনাস, হট সাউথ আমেরিকান স্লাটস এবং ব্রাজিলিয়ান গার্লস বিগ বুবস এর সাথে",
              "sexy_lesbian_bliss_02fbc3be": "সেক্সি লেসবিয়ান ব্লিস টিন গার্লস, হার্ডকোর HD পুসি লিকিং এবং স্ট্র্যাপ অন সেক্স",
              "sexy_milfs_in_c2f5b548": "সেক্সি মিল্ফস হার্ডকোর HD পর্ন ভিডিওতে বিগ বুবস এবং ম্যাসিভ কক্স এর সাথে",
              "sexy_realtors_fuck_77197cf3": "সেক্সি রিয়েলটররা হাউস সেলের জন্য চোদাচুদি করে হার্ডকোর HD ভিডিওতে ব্লোজবস এর সাথে",
              "taboo_family_affairs_d11e453b": "ট্যাবু ফ্যামিলি অ্যাফেয়ার্স HD তে ব্রাদার সিস্টার মম ড্যাড সেক্স সিক্রেটস রিভিল্ড",
              "take_a_wild_33301cda": "ফেক ট্যাক্সি, হট উইমেন, কপস এবং ডার্টি এনকাউন্টারস এর সাথে ওয়াইল্ড রাইড নিন",
              "tinder_dates_gone_f7c52d3b": "টিন্ডার ডেটস গন ওয়াইল্ড, ফার্স্ট ডেটে চোদাচুদি হট সিঙ্গলস এবং কিউট হুকআপস এর সাথে",
              "trans_women_explorin_e5af20f2": "ট্রান্স উইমেন পুরুষ, মহিলা, থ্রিসাম এবং আরও অনেক কিছুর সাথে যৌনতা অন্বেষণ করছে",
              "transgender_erotic_t_2d0b1cbe": "ট্রান্সজেন্ডার ইরোটিক TS পর্ন HD মুভিজ, কামশটস এবং হট অ্যানাল সেক্স এর সাথে",
              "true_amateurs_fuck_b161a012": "ট্রু অ্যামেচাররা হট হোমমেড পর্ন ভিডিওতে নেকেড নিম্ফোদের সাথে চোদাচুদি করে",
              "uncensored_hentai_in_2f7cc979": "আনসেন্সরড হেনটাই HD তে বেস্ট অ্যানিমে সেক্স এবং উইব 3D পর্ন দেখুন",
              "watch_good_girls_108264b4": "গুড গার্লসকে স্লাটসে পরিণত হতে দেখুন, ইনোসেন্ট গার্লস থেকে হোরস ট্রান্সফরমেশন",
              "wet_pussy_fucking_2ee62f93": "ওয়েট পুসি ফাকিং, স্কোয়ার্টিং এবং ইনটেন্স অর্গাজম ক্লোজ-আপ HD অ্যাকশনে",
              "women_cheating_on_7b4479fc": "উইমেন পার্টিজ এবং ব্যাচেলরেট ব্যাশে বিগ কক্স দিয়ে হাজব্যান্ডসকে প্রতারণা করছে"
          },
          "hero": {
              "eyebrow": "একচেটিয়া",
              "title-line1": "প্রিমিয়াম অ্যাক্সেস আনলক করুন",
              "title-price": "মাত্র $1.00",
              "subtitle": "সর্বোচ্চ মানের প্রাপ্তবয়স্ক সামগ্রী প্ল্যাটফর্মে তাত্ক্ষণিক অ্যাক্সেস পান। সীমিত সময়ের অফার।",
              "cta": "অফার দেখুন"
          }
      },
      "pt": {
          "meta": {
              "title": "Ofertas de Pornô por $1 e Descontos Grátis | FlirtyDeals.com",
              "description": "Os descontos de pornô mais baratos e as melhores ofertas à venda agora! Obtenha cupons de $1 e compre assinaturas baratas nos melhores sites pornô. Assista vídeos XXX grátis no FlirtyDeals.com hoje!",
              "og-title": "Ofertas de Pornô por $1 e Descontos Grátis | FlirtyDeals.com",
              "og-description": "Os descontos de pornô mais baratos e as melhores ofertas à venda agora! Obtenha cupons de $1 e compre assinaturas baratas nos melhores sites pornô. Assista vídeos XXX grátis no FlirtyDeals.com hoje!"
          },
          "cookie": {
              "message": "Usamos cookies para melhorar sua experiência de navegação e analisar nosso tráfego.",
              "accept": "✓ Aceitar",
              "reject": "✗ Rejeitar",
              "customize": "⚙ Personalizar",
              "preferences-title": "Preferências de Cookies",
              "necessary-title": "✅ Cookies Necessários",
              "necessary-description": "Esses cookies são essenciais para o funcionamento adequado do site. Eles não podem ser desativados.",
              "analytics-title": "📊 Cookies de Análise",
              "analytics-description": "Esses cookies nos ajudam a entender como os visitantes interagem com nosso site, coletando e relatando informações anonimamente (Google Analytics).",
              "save-preferences": "Salvar Preferências",
              "accept-all": "Aceitar Tudo"
          },
          "age": {
              "title": "🔞 Verificação de Idade",
              "text": "Você deve ter 18 anos ou mais para visualizar este conteúdo. Por favor, confirme sua idade para continuar.",
              "accept": "Tenho 18+ - Entrar",
              "exit": "Sair"
          },
          "nav": {
              "title": "Ofertas de Pornô Baratas e Melhores Descontos",
              "subtitle": "Vídeos XXX HD Quentes e Sexy Disponíveis • Assinaturas de Vídeo Pornô Grátis"
          },
          "filter": {
              "all": "Todas as Ofertas",
              "premium": "Sites Premium",
              "free": "Conteúdo Grátis",
              "shemale": "Shemale"
          },
          "section": {
              "top": "🔥 Melhores Ofertas",
              "premium": "💎 Sites Pornô Premium",
              "free": "🎁 Conteúdo Pornô Grátis e Testes",
              "shemale": "🌈 Ofertas de Pornô Shemale e Descontos Trans Baratos"
          },
          "button": {
              "view-deal": "Ver Oferta",
              "claim-freebie": "Reivindicar Grátis",
              "chat-now": "Conversar Agora"
          },
          "free-text": "Grátis",
          "shemale": {
              "reveal": "Clique para Revelar<br><small>(Conteúdo Shemale)</small>"
          },
          "footer": {
              "information": "Informação",
              "terms": "Termos e Condições",
              "privacy": "Política de Privacidade",
              "about": "Sobre Nós",
              "blog": "Blog",
              "support": "Suporte",
              "faq": "Perguntas Frequentes",
              "contact": "Contate-Nos",
              "sitemap": "Mapa do Site",
              "compliance": "Conformidade",
              "gdpr": "Conformidade GDPR",
              "2257": "Conformidade 2257",
              "follow": "Siga-nos",
              "ai-girlfriend": "Namorada AI",
              "copyright": "© 2026 FlirtyDeals.com - Todos os direitos reservados."
          },
          "badge": {
              "featured": "Melhor Oferta",
              "free": "Grátis",
              "discount-90": "90% de desconto",
              "discount-96": "96% de desconto",
              "discount-97": "97% de desconto"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "Estrelas pornô da Bang Bros fodem em vídeos pornô de realidade virtual, VR em primeira pessoa",
              "bi_group_sex_4816ef53": "Sexo em grupo bissexual, gangbangs e orgias com MILFs, adolescentes e gatas europeias em HD",
              "bicurious_threesomes_a607bef0": "Trios e orgias bi-curiosos com caras hetero e casais safados em HD",
              "big_budget_porn_939cef9f": "Pornô de grande orçamento, títulos lendários, filmes longos e filmes pornô de alta qualidade em HD",
              "create_your_own_2567df77": "Crie sua própria namorada AI e gere imagens quentes para suas fantasias sexuais",
              "dm_our_ai_97b68dc0": "Envie DM para nossos sexbots de IA, conversas eróticas e fantasias de RPG NSFW!",
              "exclusive_porn_video_9f442154": "Vídeos pornô exclusivos em HD com mais de 2500 estrelas pornô em mais de 10.000 cenas",
              "free_hd_premium_80c039ef": "Vídeos pornô premium gratuitos em HD 4K, 1080p e 720p, sem anúncios, estrelas pornô top",
              "hardcore_homemade_po_e7d69259": "Pornô caseiro hardcore com garganta profunda, anal e foda nos peitos em HD",
              "hardcore_lesbian_gla_23e4abb4": "Pornô lésbico glamouroso hardcore com mulheres bonitas e sexo erótico com consolo",
              "hardcore_transgender_b0514418": "Sexo transgênero hardcore com modelos sexy e penetrações duplas",
              "hd_porn_videos_911395bc": "Vídeos pornô em HD com estrelas pornô top em cenários de sexo lésbico, MILF e adolescente",
              "horny_amateurs_and_2afdcfef": "Amadoras safadas e adolescentes em pornô hardcore com peitos grandes",
              "horny_college_girls_eff8e389": "Garotas universitárias safadas, adolescentes bêbadas e colegiais vadias em vídeos de sexo selvagem",
              "hot__sexy_73272450": "Pornô de realidade HD de adolescentes gostosas e sexy com colegiais travessas e adolescentes pervertidas",
              "hot_amateur_sex_4a549f25": "Vídeos de sexo amador quente, câmeras ao vivo e nichos XXX em uma comunidade social",
              "hot_women_in_bcbacc08": "Mulheres gostosas em massagem sensual, vídeos de sexo lésbico e casais MILF",
              "innocent_japanese_gi_976dcc44": "Garotas japonesas inocentes são fodidas em vídeos de sexo hardcore com asiáticas fofas",
              "interactive_porn_wit_bfc2ee56": "Pornô interativo com suas estrelas favoritas: escolha sua própria aventura sexual",
              "mothers_and_daughter_ae77b18c": "Mães e filhas em vídeos de sexo erótico com pornô sensual e hardcore",
              "original_amateur_por_0a634668": "Vídeos pornô amador originais com cenas de sexo quentes",
              "perfect_girls_in_34f46622": "Garotas perfeitas em vídeos pornô sensuais HD com gatas lindas e ação quente",
              "petite_teens_get_3fa66e0f": "Adolescentes pequeninas são pegas em sexo sorrateiro esfregando travesseiros com outras garotas",
              "play_free_sex_18a4284e": "Jogue jogos de sexo grátis, jogos pornô e jogos de anime adulto online agora",
              "realtor_sells_house_5cea75ea": "Corretora vende casa por sexo com cliente pelas costas de seu colega corretor",
              "sensual_lesbian_sex_d6a7d951": "Sexo lésbico sensual com lambida de buceta, beijos e orgasmos reais em HD",
              "sexy_latinas_hot_e042f4bb": "Latinas sexy, vagabundas sul-americanas gostosas e garotas brasileiras com peitos grandes",
              "sexy_lesbian_bliss_02fbc3be": "Êxtase lésbico sexy de garotas adolescentes, lambida de buceta HD hardcore e sexo com cinta",
              "sexy_milfs_in_c2f5b548": "MILFs sexy em vídeos pornô hardcore HD com peitos grandes e paus enormes",
              "sexy_realtors_fuck_77197cf3": "Corretoras sexy fodem pela venda da casa em vídeos HD hardcore com boquetes",
              "taboo_family_affairs_d11e453b": "Assuntos familiares tabu em HD segredos de sexo entre irmão, irmã, mãe e pai revelados",
              "take_a_wild_33301cda": "Faça um passeio selvagem com Fake Taxi, mulheres gostosas, policiais e encontros sujos",
              "tinder_dates_gone_f7c52d3b": "Encontros do Tinder fora de controle, foder no primeiro encontro com solteiros gostosos e encontros fofos",
              "trans_women_explorin_e5af20f2": "Mulheres trans explorando sexualidade com homens, mulheres, trios e mais",
              "transgender_erotic_t_2d0b1cbe": "Pornô erótico transgênero TS com filmes HD, gozadas e sexo anal quente",
              "true_amateurs_fuck_b161a012": "Amadoras verdadeiras fodem em vídeos pornô caseiros quentes com ninfomaníacas nuas",
              "uncensored_hentai_in_2f7cc979": "Hentai sem censura em HD assista o melhor sexo anime e pornô 3D weeb",
              "watch_good_girls_108264b4": "Assista garotas boas se transformarem em vadias, transformações de garotas inocentes em putas",
              "wet_pussy_fucking_2ee62f93": "Foda de buceta molhada, esguicho e orgasmos intensos em ação HD em close-up",
              "women_cheating_on_7b4479fc": "Mulheres traindo maridos com paus grandes em festas e despedidas de solteira"
          },
          "hero": {
              "eyebrow": "Exclusivo",
              "title-line1": "Desbloqueie Acesso Premium",
              "title-price": "Apenas $1.00",
              "subtitle": "Obtenha acesso instantâneo às principais plataformas de conteúdo adulto por uma fração do custo. Oferta por tempo limitado.",
              "cta": "Ver Oferta"
          }
      },
      "ru": {
          "meta": {
              "title": "Дешевые порно предложения за $1 и бесплатные скидки | FlirtyDeals.com",
              "description": "Самые дешевые порно скидки и лучшие предложения в продаже! Получите купоны на $1 и покупайте дешевые подписки на лучших порно сайтах. Смотрите бесплатные XXX видео на FlirtyDeals.com сегодня!",
              "og-title": "Дешевые порно предложения за $1 и бесплатные скидки | FlirtyDeals.com",
              "og-description": "Самые дешевые порно скидки и лучшие предложения в продаже! Получите купоны на $1 и покупайте дешевые подписки на лучших порно сайтах. Смотрите бесплатные XXX видео на FlirtyDeals.com сегодня!"
          },
          "cookie": {
              "message": "Мы используем файлы cookie для улучшения вашего опыта просмотра и анализа нашего трафика.",
              "accept": "✓ Принять",
              "reject": "✗ Отклонить",
              "customize": "⚙ Настроить",
              "preferences-title": "Настройки cookie",
              "necessary-title": "✅ Необходимые cookie",
              "necessary-description": "Эти файлы cookie необходимы для правильной работы сайта. Их нельзя отключить.",
              "analytics-title": "📊 Аналитические cookie",
              "analytics-description": "Эти файлы cookie помогают нам понять, как посетители взаимодействуют с нашим сайтом, собирая и сообщая информацию анонимно (Google Analytics).",
              "save-preferences": "Сохранить настройки",
              "accept-all": "Принять все"
          },
          "age": {
              "title": "🔞 Проверка возраста",
              "text": "Вам должно быть 18 лет или больше, чтобы просматривать этот контент. Пожалуйста, подтвердите свой возраст, чтобы продолжить.",
              "accept": "Мне 18+ - Войти",
              "exit": "Выход"
          },
          "nav": {
              "title": "Дешевые порно предложения и лучшие скидки",
              "subtitle": "Доступны горячие и сексуальные HD XXX видео • Бесплатные подписки на порно видео"
          },
          "filter": {
              "all": "Все предложения",
              "premium": "Премиум сайты",
              "free": "Бесплатный контент",
              "shemale": "Шимейл"
          },
          "section": {
              "top": "🔥 Лучшие предложения",
              "premium": "💎 Премиум порно сайты",
              "free": "🎁 Бесплатный порно контент и пробные версии",
              "shemale": "🌈 Шимейл порно предложения и дешевые трансгендерные скидки"
          },
          "button": {
              "view-deal": "Смотреть предложение",
              "claim-freebie": "Получить бесплатно",
              "chat-now": "Чат сейчас"
          },
          "free-text": "Бесплатно",
          "shemale": {
              "reveal": "Нажмите, чтобы открыть<br><small>(Шимейл контент)</small>"
          },
          "footer": {
              "information": "Информация",
              "terms": "Условия использования",
              "privacy": "Политика конфиденциальности",
              "about": "О нас",
              "blog": "Блог",
              "support": "Поддержка",
              "faq": "FAQ",
              "contact": "Связаться с нами",
              "sitemap": "Карта сайта",
              "compliance": "Соответствие",
              "gdpr": "Соответствие GDPR",
              "2257": "Соответствие 2257",
              "follow": "Следите за нами",
              "ai-girlfriend": "AI подруга",
              "copyright": "© 2026 FlirtyDeals.com - Все права защищены."
          },
          "badge": {
              "featured": "Лучшая сделка",
              "free": "Бесплатно",
              "discount-90": "Скидка 90%",
              "discount-96": "Скидка 96%",
              "discount-97": "Скидка 97%"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "Порнозвезды Bang Bros трахаются в порновидео виртуальной реальности, VR от первого лица",
              "bi_group_sex_4816ef53": "Бисексуальный групповой секс, гангбанги и оргии с мамочками, подростками и европейскими красотками в HD",
              "bicurious_threesomes_a607bef0": "Би-любопытные тройнички и оргии с натуралами и возбужденными парами в HD",
              "big_budget_porn_939cef9f": "Порно с большим бюджетом, легендарные фильмы, длинные фильмы и высококачественные порнофильмы в HD",
              "create_your_own_2567df77": "Создайте свою собственную AI девушку и генерируйте горячие изображения для ваших сексуальных фантазий",
              "dm_our_ai_97b68dc0": "Отправьте DM нашим AI секс-ботам, эротический чат и NSFW ролевые фантазии!",
              "exclusive_porn_video_9f442154": "Эксклюзивные порновидео в HD с участием более 2500 порнозвезд в более чем 10 000 сценах",
              "free_hd_premium_80c039ef": "Бесплатные премиальные порновидео в HD 4K, 1080p и 720p, без рекламы, топовые порнозвезды",
              "hardcore_homemade_po_e7d69259": "Хардкорное домашнее порно с глубокой глоткой, аналом и трахом сисек в HD",
              "hardcore_lesbian_gla_23e4abb4": "Хардкорное гламурное лесби-порно с красивыми женщинами и эротическим сексом с фаллоимитатором",
              "hardcore_transgender_b0514418": "Хардкорный трансгендерный секс с сексуальными моделями и двойными проникновениями",
              "hd_porn_videos_911395bc": "HD порновидео с топовыми порнозвездами в лесбийских, милфовских и подростковых сексуальных сценариях",
              "horny_amateurs_and_2afdcfef": "Возбужденные любительницы и подростки в хардкорном порно с большими сиськами",
              "horny_college_girls_eff8e389": "Возбужденные студентки, пьяные подростки и развратные школьницы в диких порновидео",
              "hot__sexy_73272450": "Горячее и сексуальное HD реалити-порно с подростками, непослушными школьницами и извращенными тинейджерами",
              "hot_amateur_sex_4a549f25": "Горячие любительские секс-видео, живые камеры и XXX ниши в социальном сообществе",
              "hot_women_in_bcbacc08": "Горячие женщины в чувственном массаже, лесбийском сексе и видео с парами милф",
              "innocent_japanese_gi_976dcc44": "Невинные японские девушки трахаются в хардкорных порновидео с милыми азиатками",
              "interactive_porn_wit_bfc2ee56": "Интерактивное порно с вашими любимыми звездами: выберите свое собственное сексуальное приключение",
              "mothers_and_daughter_ae77b18c": "Матери и дочери в эротических порновидео с чувственным и хардкорным порно",
              "original_amateur_por_0a634668": "Оригинальные любительские порновидео с горячими сексуальными сценами",
              "perfect_girls_in_34f46622": "Идеальные девушки в чувственных HD порновидео с красивыми красотками и горячими действиями",
              "petite_teens_get_3fa66e0f": "Миниатюрные подростки попадаются на скрытом сексе с подушками с другими девушками",
              "play_free_sex_18a4284e": "Играйте в бесплатные секс-игры, порно-игры и взрослые аниме-игры онлайн прямо сейчас",
              "realtor_sells_house_5cea75ea": "Риэлтор продает дом за секс с клиентом за спиной своего коллеги агента по недвижимости",
              "sensual_lesbian_sex_d6a7d951": "Чувственный лесбийский секс с лизанием киски, поцелуями и настоящими оргазмами в HD",
              "sexy_latinas_hot_e042f4bb": "Сексуальные латиноамериканки, горячие южноамериканские шлюхи и бразильские девушки с большими сиськами",
              "sexy_lesbian_bliss_02fbc3be": "Сексуальное лесбийское блаженство девушек-подростков, хардкорное HD лизание киски и секс со страпоном",
              "sexy_milfs_in_c2f5b548": "Сексуальные милфы в хардкорных HD порновидео с большими сиськами и огромными членами",
              "sexy_realtors_fuck_77197cf3": "Сексуальные риэлторы трахаются ради продажи дома в хардкорных HD видео с минетами",
              "taboo_family_affairs_d11e453b": "Табу семейные дела в HD раскрытые секреты секса брата, сестры, мамы и папы",
              "take_a_wild_33301cda": "Прокатитесь с удовольствием с Fake Taxi, горячими женщинами, копами и грязными встречами",
              "tinder_dates_gone_f7c52d3b": "Свидания Tinder вышли из-под контроля, трах на первом свидании с горячими одиночками и милыми связями",
              "trans_women_explorin_e5af20f2": "Транс-женщины исследуют сексуальность с мужчинами, женщинами, тройничками и многим другим",
              "transgender_erotic_t_2d0b1cbe": "Трансгендерное эротическое TS порно с HD фильмами, кончанами и горячим анальным сексом",
              "true_amateurs_fuck_b161a012": "Настоящие любители трахаются в горячих домашних порновидео с голыми нимфоманками",
              "uncensored_hentai_in_2f7cc979": "Нецензурное хентай в HD смотрите лучший аниме-секс и weeb 3D порно",
              "watch_good_girls_108264b4": "Смотрите, как хорошие девушки превращаются в шлюх, невинные девушки превращаются в проституток",
              "wet_pussy_fucking_2ee62f93": "Трах мокрой киски, сквирт и интенсивные оргазмы в крупном плане HD",
              "women_cheating_on_7b4479fc": "Женщины изменяют мужьям с большими членами на вечеринках и девичниках"
          },
          "hero": {
              "eyebrow": "Эксклюзивно",
              "title-line1": "Разблокируйте премиум-доступ",
              "title-price": "Всего $1.00",
              "subtitle": "Получите мгновенный доступ к лучшим платформам контента для взрослых по доле стоимости. Ограниченное предложение по времени.",
              "cta": "Просмотреть предложение"
          }
      },
      "id": {
          "meta": {
              "title": "Penawaran Porno Murah $1 & Diskon Gratis | FlirtyDeals.com",
              "description": "Diskon Porno Termurah & Penawaran Terbaik Dijual Sekarang! Dapatkan Kupon $1 & Beli Keanggotaan Murah di Situs Porno Terbaik. Tonton Video XXX Gratis di FlirtyDeals.com hari ini!",
              "og-title": "Penawaran Porno Murah $1 & Diskon Gratis | FlirtyDeals.com",
              "og-description": "Diskon Porno Termurah & Penawaran Terbaik Dijual Sekarang! Dapatkan Kupon $1 & Beli Keanggotaan Murah di Situs Porno Terbaik. Tonton Video XXX Gratis di FlirtyDeals.com hari ini!"
          },
          "cookie": {
              "message": "Kami menggunakan cookie untuk meningkatkan pengalaman browsing Anda dan menganalisis lalu lintas kami.",
              "accept": "✓ Terima",
              "reject": "✗ Tolak",
              "customize": "⚙ Sesuaikan",
              "preferences-title": "Preferensi Cookie",
              "necessary-title": "✅ Cookie yang Diperlukan",
              "necessary-description": "Cookie ini penting agar situs web berfungsi dengan baik. Mereka tidak dapat dinonaktifkan.",
              "analytics-title": "📊 Cookie Analitik",
              "analytics-description": "Cookie ini membantu kami memahami bagaimana pengunjung berinteraksi dengan situs web kami dengan mengumpulkan dan melaporkan informasi secara anonim (Google Analytics).",
              "save-preferences": "Simpan Preferensi",
              "accept-all": "Terima Semua"
          },
          "age": {
              "title": "🔞 Verifikasi Usia",
              "text": "Anda harus berusia 18 tahun atau lebih untuk melihat konten ini. Harap konfirmasi usia Anda untuk melanjutkan.",
              "accept": "Saya 18+ - Masuk",
              "exit": "Keluar"
          },
          "nav": {
              "title": "Penawaran Porno Murah & Diskon Terbaik",
              "subtitle": "Video XXX HD Panas & Seksi Tersedia • Langganan Video Porno Gratis"
          },
          "filter": {
              "all": "Semua Penawaran",
              "premium": "Situs Premium",
              "free": "Konten Gratis",
              "shemale": "Shemale"
          },
          "section": {
              "top": "🔥 Penawaran Teratas",
              "premium": "💎 Situs Porno Premium",
              "free": "🎁 Konten Porno Gratis & Uji Coba",
              "shemale": "🌈 Penawaran Porno Shemale & Diskon Transgender Murah"
          },
          "button": {
              "view-deal": "Lihat Penawaran",
              "claim-freebie": "Klaim Gratis",
              "chat-now": "Obrolan Sekarang"
          },
          "free-text": "Gratis",
          "shemale": {
              "reveal": "Klik untuk Mengungkap<br><small>(Konten Shemale)</small>"
          },
          "footer": {
              "information": "Informasi",
              "terms": "Syarat & Ketentuan",
              "privacy": "Kebijakan Privasi",
              "about": "Tentang Kami",
              "blog": "Blog",
              "support": "Dukungan",
              "faq": "FAQ",
              "contact": "Hubungi Kami",
              "sitemap": "Peta Situs",
              "compliance": "Kepatuhan",
              "gdpr": "Kepatuhan GDPR",
              "2257": "Kepatuhan 2257",
              "follow": "Ikuti Kami",
              "ai-girlfriend": "Pacar AI",
              "copyright": "© 2026 FlirtyDeals.com - Semua hak dilindungi."
          },
          "badge": {
              "featured": "Penawaran Terbaik",
              "free": "Gratis",
              "discount-90": "Diskon 90%",
              "discount-96": "Diskon 96%",
              "discount-97": "Diskon 97%"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "Bintang porno Bang Bros bercinta dalam video porno virtual reality, VR orang pertama",
              "bi_group_sex_4816ef53": "Seks grup biseksual, gangbang dan orgy dengan MILF, remaja, dan cewek Eropa dalam HD",
              "bicurious_threesomes_a607bef0": "Threesome dan orgy bi-curious dengan cowok straight dan pasangan horny dalam HD",
              "big_budget_porn_939cef9f": "Porno berbiaya besar, judul legendaris, film panjang & film porno berkualitas tinggi dalam HD",
              "create_your_own_2567df77": "Buat pacar AI Anda sendiri, dan hasilkan gambar panas untuk fantasi seksual Anda",
              "dm_our_ai_97b68dc0": "DM sexbot AI kami, chatting erotis & fantasi roleplay NSFW!",
              "exclusive_porn_video_9f442154": "Video porno eksklusif dalam HD menampilkan 2500+ bintang porno dalam 10.000+ adegan",
              "free_hd_premium_80c039ef": "Video porno premium gratis HD 4K, 1080p & 720p, tanpa iklan, bintang porno top",
              "hardcore_homemade_po_e7d69259": "Porno buatan sendiri hardcore dengan deep throat, anal, dan ngentot tetek dalam HD",
              "hardcore_lesbian_gla_23e4abb4": "Porno lesbian glamor hardcore dengan wanita cantik dan seks dildo erotis",
              "hardcore_transgender_b0514418": "Seks transgender hardcore dengan model seksi dan penetrasi ganda",
              "hd_porn_videos_911395bc": "Video porno HD dengan bintang porno top dalam skenario seks lesbian, Milf, dan remaja",
              "horny_amateurs_and_2afdcfef": "Amatir horny dan remaja dalam porno hardcore dengan payudara besar",
              "horny_college_girls_eff8e389": "Gadis kuliah horny, remaja mabuk, dan siswi nakal dalam video seks liar",
              "hot__sexy_73272450": "Porno realitas HD remaja panas & seksi dengan siswi nakal & remaja cabul",
              "hot_amateur_sex_4a549f25": "Video seks amatir panas, kamera langsung & niche XXX dalam komunitas sosial",
              "hot_women_in_bcbacc08": "Wanita panas dalam pijat sensual, lesbian, dan video seks pasangan Milf",
              "innocent_japanese_gi_976dcc44": "Gadis Jepang polos dicintai dalam video seks hardcore dengan Asia imut",
              "interactive_porn_wit_bfc2ee56": "Porno interaktif dengan bintang favorit Anda: pilih petualangan seks Anda sendiri",
              "mothers_and_daughter_ae77b18c": "Ibu dan anak perempuan dalam video seks erotis dengan porno sensual dan hardcore",
              "original_amateur_por_0a634668": "Video porno amatir asli dengan adegan seks panas",
              "perfect_girls_in_34f46622": "Gadis sempurna dalam video porno sensual HD dengan cewek cantik dan aksi panas",
              "petite_teens_get_3fa66e0f": "Remaja mungil tertangkap dalam seks menggosok bantal sembunyi-sembunyi dengan gadis lain",
              "play_free_sex_18a4284e": "Mainkan game seks gratis, game porno & game anime dewasa online sekarang",
              "realtor_sells_house_5cea75ea": "Makelar menjual rumah untuk seks dengan klien di belakang rekan agen real estat-nya",
              "sensual_lesbian_sex_d6a7d951": "Seks lesbian sensual dengan jilat memek, ciuman, dan orgasme nyata dalam HD",
              "sexy_latinas_hot_e042f4bb": "Latina seksi, pelacur Amerika Selatan panas, dan gadis Brasil dengan payudara besar",
              "sexy_lesbian_bliss_02fbc3be": "Kebahagiaan lesbian seksi gadis remaja, jilat memek HD hardcore & seks strap on",
              "sexy_milfs_in_c2f5b548": "Milf seksi dalam video porno hardcore HD dengan payudara besar & kontol besar",
              "sexy_realtors_fuck_77197cf3": "Makelar seksi ngentot untuk penjualan rumah dalam video HD hardcore dengan blowjob",
              "taboo_family_affairs_d11e453b": "Urusan keluarga tabu dalam HD rahasia seks kakak adik ibu ayah terungkap",
              "take_a_wild_33301cda": "Naik dengan liar bersama Fake Taxi, wanita panas, polisi, dan pertemuan kotor",
              "tinder_dates_gone_f7c52d3b": "Kencan Tinder menjadi liar, ngentot di kencan pertama dengan jomblo panas & hookup imut",
              "trans_women_explorin_e5af20f2": "Wanita trans menjelajahi seksualitas dengan pria, wanita, threesome & lainnya",
              "transgender_erotic_t_2d0b1cbe": "Porno erotis transgender TS dengan film HD, cumshot & seks anal panas",
              "true_amateurs_fuck_b161a012": "Amatir sejati ngentot dalam video porno buatan sendiri panas dengan nimfo telanjang",
              "uncensored_hentai_in_2f7cc979": "Hentai tanpa sensor dalam HD tonton seks anime terbaik dan porno 3D weeb",
              "watch_good_girls_108264b4": "Tonton gadis baik berubah menjadi pelacur, transformasi gadis polos menjadi pelacur",
              "wet_pussy_fucking_2ee62f93": "Ngentot memek basah, muncrat, dan orgasme intens dalam aksi close-up HD",
              "women_cheating_on_7b4479fc": "Wanita selingkuh dari suami dengan kontol besar di pesta & pesta bujangan"
          },
          "hero": {
              "eyebrow": "Eksklusif",
              "title-line1": "Buka Akses Premium",
              "title-price": "Hanya $1.00",
              "subtitle": "Dapatkan akses instan ke platform konten dewasa terkemuka dengan harga sepersepuluh. Penawaran terbatas waktu.",
              "cta": "Lihat Penawaran"
          }
      },
      "ur": {
          "meta": {
              "title": "$1 میں سستے پورن ڈیلز اور مفت رعایت | FlirtyDeals.com",
              "description": "سب سے سستی پورن چھوٹ اور بہترین ڈیلز اب فروخت پر! $1 کوپن حاصل کریں اور اعلیٰ پورن سائٹس پر سستی رکنیت خریدیں۔ آج FlirtyDeals.com پر مفت XXX ویڈیوز دیکھیں!",
              "og-title": "$1 میں سستے پورن ڈیلز اور مفت رعایت | FlirtyDeals.com",
              "og-description": "سب سے سستی پورن چھوٹ اور بہترین ڈیلز اب فروخت پر! $1 کوپن حاصل کریں اور اعلیٰ پورن سائٹس پر سستی رکنیت خریدیں۔ آج FlirtyDeals.com پر مفت XXX ویڈیوز دیکھیں!"
          },
          "cookie": {
              "message": "ہم آپ کے براؤزنگ تجربے کو بہتر بنانے اور اپنی ٹریفک کا تجزیہ کرنے کے لیے کوکیز استعمال کرتے ہیں۔",
              "accept": "✓ قبول کریں",
              "reject": "✗ مسترد کریں",
              "customize": "⚙ حسب ضرورت بنائیں",
              "preferences-title": "کوکی ترجیحات",
              "necessary-title": "✅ ضروری کوکیز",
              "necessary-description": "یہ کوکیز ویب سائٹ کے صحیح طریقے سے کام کرنے کے لیے ضروری ہیں۔ انہیں غیر فعال نہیں کیا جا سکتا۔",
              "analytics-title": "📊 تجزیاتی کوکیز",
              "analytics-description": "یہ کوکیز ہمیں یہ سمجھنے میں مدد کرتی ہیں کہ زائرین ہماری ویب سائٹ کے ساتھ کیسے تعامل کرتے ہیں، معلومات کو گمنام طور پر جمع اور رپورٹ کر کے (Google Analytics)۔",
              "save-preferences": "ترجیحات محفوظ کریں",
              "accept-all": "سب قبول کریں"
          },
          "age": {
              "title": "🔞 عمر کی تصدیق",
              "text": "اس مواد کو دیکھنے کے لیے آپ کی عمر 18 سال یا اس سے زیادہ ہونی چاہیے۔ جاری رکھنے کے لیے براہ کرم اپنی عمر کی تصدیق کریں۔",
              "accept": "میں 18+ ہوں - درج کریں",
              "exit": "باہر نکلیں"
          },
          "nav": {
              "title": "سستے پورن ڈیلز اور بہترین رعایت",
              "subtitle": "گرم اور سیکسی ایچ ڈی XXX ویڈیوز دستیاب • مفت پورن ویڈیو سبسکرپشنز"
          },
          "filter": {
              "all": "تمام ڈیلز",
              "premium": "پریمیم سائٹس",
              "free": "مفت مواد",
              "shemale": "شیمیل"
          },
          "section": {
              "top": "🔥 ٹاپ ڈیلز",
              "premium": "💎 پریمیم پورن سائٹس",
              "free": "🎁 مفت پورن مواد اور ٹرائلز",
              "shemale": "🌈 شیمیل پورن ڈیلز اور سستی ٹرانسجینڈر رعایت"
          },
          "button": {
              "view-deal": "ڈیل دیکھیں",
              "claim-freebie": "مفت حاصل کریں",
              "chat-now": "ابھی چیٹ کریں"
          },
          "free-text": "مفت",
          "shemale": {
              "reveal": "ظاہر کرنے کے لیے کلک کریں<br><small>(شیمیل مواد)</small>"
          },
          "footer": {
              "information": "معلومات",
              "terms": "شرائط و ضوابط",
              "privacy": "رازداری کی پالیسی",
              "about": "ہمارے بارے میں",
              "blog": "بلاگ",
              "support": "سپورٹ",
              "faq": "عمومی سوالات",
              "contact": "ہم سے رابطہ کریں",
              "sitemap": "سائٹ میپ",
              "compliance": "تعمیل",
              "gdpr": "GDPR تعمیل",
              "2257": "2257 تعمیل",
              "follow": "ہمیں فالو کریں",
              "ai-girlfriend": "AI گرل فرینڈ",
              "copyright": "© 2026 FlirtyDeals.com - تمام حقوق محفوظ ہیں۔"
          },
          "badge": {
              "featured": "بہترین ڈیل",
              "free": "مفت",
              "discount-90": "90% رعایت",
              "discount-96": "96% رعایت",
              "discount-97": "97% رعایت"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "بینگ بروس پورن اسٹارز ورچوئل رئیلٹی پورن ویڈیوز میں چودتی ہیں، فرسٹ پرسن VR",
              "bi_group_sex_4816ef53": "بائی گروپ سیکس، گینگ بینگز اور اورجیز MILFs، ٹینز اور یورو بیبز کے ساتھ HD میں",
              "bicurious_threesomes_a607bef0": "بائی-کیوریئس تھری سمز اور اورجیز سٹریٹ گائز اور ہارنی کپلز کے ساتھ HD میں",
              "big_budget_porn_939cef9f": "بگ بجٹ پورن، لیجنڈری ٹائٹلز، لانگ موویز اور ہائی کوالٹی پورن موویز HD میں",
              "create_your_own_2567df77": "اپنی AI گرل فرینڈ بنائیں اور اپنی جنسی فنتاسیوں کے لیے ہاٹ امیجز بنائیں",
              "dm_our_ai_97b68dc0": "ہمارے AI سیکس بوٹس کو DM کریں، ایروٹک چیٹنگ اور NSFW رول پلے فینٹسیز!",
              "exclusive_porn_video_9f442154": "ایکسکلوسیو پورن ویڈیوز HD میں جس میں 2500+ پورن اسٹارز اور 10,000+ سینز ہیں",
              "free_hd_premium_80c039ef": "فری HD پریمیم پورن ویڈیوز 4K، 1080p اور 720p میں، نو ایڈز، ٹاپ پورن اسٹارز",
              "hardcore_homemade_po_e7d69259": "ہارڈ کور ہوم میڈ پورن ڈیپ تھروٹ، اینل اور ٹٹ فکنگ کے ساتھ HD میں",
              "hardcore_lesbian_gla_23e4abb4": "ہارڈ کور لیزبین گلیم پورن خوبصورت خواتین اور ایروٹک ڈلڈو سیکس کے ساتھ",
              "hardcore_transgender_b0514418": "ہارڈ کور ٹرانس جینڈر سیکس سیکسی ماڈلز اور ڈبل پینیٹریشنز کے ساتھ",
              "hd_porn_videos_911395bc": "HD پورن ویڈیوز ٹاپ پورن اسٹارز کے ساتھ لیزبین، ملف اور ٹین سیکس سینریوز میں",
              "horny_amateurs_and_2afdcfef": "ہارنی ایمیچورز اور ٹینز ہارڈ کور پورن میں بگ بوبس کے ساتھ",
              "horny_college_girls_eff8e389": "ہارنی کالج گرلز، ڈرنک ٹینز اور سلٹی اسکول گرلز وائلڈ سیکس ویڈیوز میں",
              "hot__sexy_73272450": "ہاٹ اینڈ سیکسی ٹینز HD ریئلٹی پورن ناٹی اسکول گرلز اور پرورٹڈ ٹینز کے ساتھ",
              "hot_amateur_sex_4a549f25": "ہاٹ ایمیچور سیکس ویڈیوز، لائیو کیمز اور XXX نچز سوشل کمیونٹی میں",
              "hot_women_in_bcbacc08": "ہاٹ ویمن سینسوئل میساج، لیزبین اور ملف کپلز سیکس ویڈیوز میں",
              "innocent_japanese_gi_976dcc44": "معصوم جاپانی لڑکیاں ہارڈ کور سیکس ویڈیوز میں کیوٹ ایشین کے ساتھ چودی جاتی ہیں",
              "interactive_porn_wit_bfc2ee56": "انٹریکٹو پورن آپ کے پسندیدہ سٹارز کے ساتھ: اپنی سیکس ایڈونچر چنیں",
              "mothers_and_daughter_ae77b18c": "مدرز اینڈ ڈاٹرز ایروٹک سیکس ویڈیوز میں سینسوئل اور ہارڈ کور پورن کے ساتھ",
              "original_amateur_por_0a634668": "اورجنل ایمیچور پورن ویڈیوز ہاٹ سیکس سینز کے ساتھ",
              "perfect_girls_in_34f46622": "پرفیکٹ گرلز HD سینسوئل پورن ویڈیوز میں بیوٹیفل بیبز اور ہاٹ ایکشن کے ساتھ",
              "petite_teens_get_3fa66e0f": "پیٹائٹ ٹینز سنیکی پلو ہمپنگ سیکس میں دوسری گرلز کے ساتھ پکڑی جاتی ہیں",
              "play_free_sex_18a4284e": "فری سیکس گیمز، پورن گیمز اور ایڈلٹ اینیمے گیمز ابھی آن لائن کھیلیں",
              "realtor_sells_house_5cea75ea": "ریئلٹر اپنے ریئل اسٹیٹ ایجنٹ ساتھی کے پیچھے کلائنٹ کے ساتھ سیکس کے لیے گھر بیچتی ہے",
              "sensual_lesbian_sex_d6a7d951": "سینسوئل لیزبین سیکس پسی لکنگ، کسنگ اور ریئل اورگاسمز کے ساتھ HD میں",
              "sexy_latinas_hot_e042f4bb": "سیکسی لاٹیناز، ہاٹ ساؤتھ امریکن سلٹس اور برازیلین گرلز بگ بوبس کے ساتھ",
              "sexy_lesbian_bliss_02fbc3be": "سیکسی لیزبین بلس ٹین گرلز، ہارڈ کور HD پسی لکنگ اور سٹریپ آن سیکس",
              "sexy_milfs_in_c2f5b548": "سیکسی ملفز ہارڈ کور HD پورن ویڈیوز میں بگ بوبس اور میسیو کاکس کے ساتھ",
              "sexy_realtors_fuck_77197cf3": "سیکسی ریئلٹرز ہاؤس سیل کے لیے چودتی ہیں ہارڈ کور HD ویڈیوز میں بلو جابس کے ساتھ",
              "taboo_family_affairs_d11e453b": "ٹیبو فیملی افیئرز HD میں برادر سسٹر مام ڈیڈ سیکس سیکریٹس ریویلڈ",
              "take_a_wild_33301cda": "فیک ٹیکسی، ہاٹ ویمن، کاپس اور ڈرٹی اینکاؤنٹرز کے ساتھ وائلڈ رائیڈ لیں",
              "tinder_dates_gone_f7c52d3b": "ٹنڈر ڈیٹس گان وائلڈ، فرسٹ ڈیٹ پر چودائی ہاٹ سنگلز اور کیوٹ ہک اپس کے ساتھ",
              "trans_women_explorin_e5af20f2": "ٹرانس ویمن مردوں، عورتوں، تھری سمز اور مزید کے ساتھ جنسیت تلاش کر رہی ہیں",
              "transgender_erotic_t_2d0b1cbe": "ٹرانس جینڈر ایروٹک TS پورن HD موویز، کم شاٹس اور ہاٹ اینل سیکس کے ساتھ",
              "true_amateurs_fuck_b161a012": "ٹرو ایمیچورز ہاٹ ہوم میڈ پورن ویڈیوز میں نیکڈ نمفوز کے ساتھ چودتے ہیں",
              "uncensored_hentai_in_2f7cc979": "غیر سنسر شدہ ہینٹائی HD میں بہترین اینیمے سیکس اور ویب 3D پورن دیکھیں",
              "watch_good_girls_108264b4": "گڈ گرلز کو سلٹس میں بدلتے ہوئے دیکھیں، معصوم لڑکیوں سے ہورز ٹرانسفارمیشنز",
              "wet_pussy_fucking_2ee62f93": "ویٹ پسی فکنگ، سکورٹنگ اور انٹینس اورگاسمز کلوز-اپ HD ایکشن میں",
              "women_cheating_on_7b4479fc": "خواتین پارٹیز اور بیچیلریٹ بیشز میں بگ کاکس کے ساتھ شوہروں کو دھوکہ دے رہی ہیں"
          },
          "hero": {
              "eyebrow": "خصوصی",
              "title-line1": "پریمیم رسائی کو کھولیں",
              "title-price": "صرف $1.00",
              "subtitle": "بالغ مواد کے ٹاپ پلیٹ فارمز تک فوری رسائی حاصل کریں۔ محدود وقت کی پیشکش۔",
              "cta": "معاہدہ دیکھیں"
          }
      },
      "ja": {
          "meta": {
              "title": "1ドルの格安ポルノセールと無料割引 | FlirtyDeals.com",
              "description": "最安値のポルノ割引と最高のセール開催中！1ドルクーポンをゲットして、トップポルノサイトで格安メンバーシップを購入。今すぐFlirtyDeals.comで無料XXXビデオを視聴！",
              "og-title": "1ドルの格安ポルノセールと無料割引 | FlirtyDeals.com",
              "og-description": "最安値のポルノ割引と最高のセール開催中！1ドルクーポンをゲットして、トップポルノサイトで格安メンバーシップを購入。今すぐFlirtyDeals.comで無料XXXビデオを視聴！"
          },
          "cookie": {
              "message": "当社は、お客様のブラウジング体験を向上させ、トラフィックを分析するためにクッキーを使用しています。",
              "accept": "✓ 承諾",
              "reject": "✗ 拒否",
              "customize": "⚙ カスタマイズ",
              "preferences-title": "Cookieの設定",
              "necessary-title": "✅ 必須Cookie",
              "necessary-description": "これらのCookieは、ウェブサイトが正常に機能するために不可欠です。無効にすることはできません。",
              "analytics-title": "📊 分析Cookie",
              "analytics-description": "これらのCookieは、訪問者が当社のウェブサイトとどのように対話するかを理解するのに役立ちます。情報を匿名で収集およびレポートします（Google Analytics）。",
              "save-preferences": "設定を保存",
              "accept-all": "すべて承諾"
          },
          "age": {
              "title": "🔞 年齢確認",
              "text": "このコンテンツを表示するには18歳以上である必要があります。続行するには年齢を確認してください。",
              "accept": "私は18歳以上です - 入力",
              "exit": "終了"
          },
          "nav": {
              "title": "格安ポルノセールと最高の割引",
              "subtitle": "ホットでセクシーなHD XXXビデオ利用可能 • 無料ポルノビデオサブスクリプション"
          },
          "filter": {
              "all": "全てのセール",
              "premium": "プレミアムサイト",
              "free": "無料コンテンツ",
              "shemale": "ニューハーフ"
          },
          "section": {
              "top": "🔥 トップセール",
              "premium": "💎 プレミアムポルノサイト",
              "free": "🎁 無料ポルノコンテンツとトライアル",
              "shemale": "🌈 ニューハーフポルノセールと格安トランスジェンダー割引"
          },
          "button": {
              "view-deal": "セールを見る",
              "claim-freebie": "無料を請求",
              "chat-now": "今すぐチャット"
          },
          "free-text": "無料",
          "shemale": {
              "reveal": "クリックして表示<br><small>(ニューハーフコンテンツ)</small>"
          },
          "footer": {
              "information": "情報",
              "terms": "利用規約",
              "privacy": "プライバシーポリシー",
              "about": "私たちについて",
              "blog": "ブログ",
              "support": "サポート",
              "faq": "よくある質問",
              "contact": "お問い合わせ",
              "sitemap": "サイトマップ",
              "compliance": "コンプライアンス",
              "gdpr": "GDPR準拠",
              "2257": "2257準拠",
              "follow": "フォローする",
              "ai-girlfriend": "AI彼女",
              "copyright": "© 2026 FlirtyDeals.com - 全著作権所有。"
          },
          "badge": {
              "featured": "トップディール",
              "free": "無料",
              "discount-90": "90%オフ",
              "discount-96": "96%オフ",
              "discount-97": "97%オフ"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "Bang Brosのポルノスターがバーチャルリアリティポルノ動画でセックス、一人称VR",
              "bi_group_sex_4816ef53": "バイセクシャルグループセックス、ギャングバング、MILF、ティーン、ユーロベイブとのオージーHD動画",
              "bicurious_threesomes_a607bef0": "バイキュリアスな3Pとオージー、ストレート男性とエッチなカップルとのHD動画",
              "big_budget_porn_939cef9f": "大予算ポルノ、伝説的タイトル、長編映画、高品質ポルノ映画HD動画",
              "create_your_own_2567df77": "自分だけのAIガールフレンドを作成し、性的ファンタジーのためのホットな画像を生成",
              "dm_our_ai_97b68dc0": "AIセックスボットにDM、エロティックチャット、NSFWロールプレイファンタジー！",
              "exclusive_porn_video_9f442154": "HD限定ポルノ動画、2500人以上のポルノスター、10,000以上のシーン",
              "free_hd_premium_80c039ef": "無料HDプレミアムポルノ動画4K、1080p、720p、広告なし、トップポルノスター",
              "hardcore_homemade_po_e7d69259": "ハードコア自家製ポルノ、ディープスロート、アナル、おっぱいファックHD動画",
              "hardcore_lesbian_gla_23e4abb4": "ハードコアレズビアングラムポルノ、美しい女性とエロティックディルドセックス",
              "hardcore_transgender_b0514418": "ハードコアトランスジェンダーセックス、セクシーモデルとダブルペネトレーション",
              "hd_porn_videos_911395bc": "HDポルノ動画、トップポルノスター出演のレズビアン、MILF、ティーンセックスシナリオ",
              "horny_amateurs_and_2afdcfef": "エッチな素人とティーンのハードコアポルノ、巨乳",
              "horny_college_girls_eff8e389": "エッチな女子大生、酔っぱらいティーン、淫乱女子高生のワイルドセックス動画",
              "hot__sexy_73272450": "ホット＆セクシーティーンズHDリアリティポルノ、いたずら女子高生と変態ティーン",
              "hot_amateur_sex_4a549f25": "ホットアマチュアセックス動画、ライブカム、ソーシャルコミュニティのXXXニッチ",
              "hot_women_in_bcbacc08": "ホットウーマンの官能マッサージ、レズビアン、MILFカップルセックス動画",
              "innocent_japanese_gi_976dcc44": "無垢な日本人女性がハードコアセックス動画でキュートなアジア人とヤられる",
              "interactive_porn_wit_bfc2ee56": "お気に入りスターとのインタラクティブポルノ：自分だけのセックスアドベンチャーを選択",
              "mothers_and_daughter_ae77b18c": "母と娘のエロティックセックス動画、官能的でハードコアなポルノ",
              "original_amateur_por_0a634668": "オリジナルアマチュアポルノ動画、ホットセックスシーン",
              "perfect_girls_in_34f46622": "完璧な女の子のHD官能ポルノ動画、美しいベイブとホットアクション",
              "petite_teens_get_3fa66e0f": "小柄ティーンが他の女の子とのこっそり枕セックスで捕まる",
              "play_free_sex_18a4284e": "無料セックスゲーム、ポルノゲーム、アダルトアニメゲームを今すぐオンラインでプレイ",
              "realtor_sells_house_5cea75ea": "不動産業者が同僚の不動産エージェントの背後でクライアントとセックスして家を売る",
              "sensual_lesbian_sex_d6a7d951": "官能レズビアンセックス、クンニ、キス、本物のオーガズムHD動画",
              "sexy_latinas_hot_e042f4bb": "セクシーラテン系、ホット南米スラット、巨乳ブラジル人女性",
              "sexy_lesbian_bliss_02fbc3be": "セクシーレズビアンブリスティーンガールズ、ハードコアHDクンニとストラップオンセックス",
              "sexy_milfs_in_c2f5b548": "セクシーMILFのハードコアHDポルノ動画、巨乳と巨根",
              "sexy_realtors_fuck_77197cf3": "セクシー不動産業者が家の売却のためにヤる、フェラ付きハードコアHD動画",
              "taboo_family_affairs_d11e453b": "タブー家族問題HD兄妹父母セックス秘密暴露",
              "take_a_wild_33301cda": "フェイクタクシー、ホットウーマン、警官、汚い出会いとワイルドライド",
              "tinder_dates_gone_f7c52d3b": "Tinderデートが暴走、初デートでヤる、ホットシングルとキュートフックアップ",
              "trans_women_explorin_e5af20f2": "トランスウーマンが男性、女性、3Pなどでセクシュアリティを探求",
              "transgender_erotic_t_2d0b1cbe": "トランスジェンダーエロティックTSポルノ、HD映画、射精、ホットアナルセックス",
              "true_amateurs_fuck_b161a012": "本物の素人がホット自家製ポルノ動画で裸のニンフォとヤる",
              "uncensored_hentai_in_2f7cc979": "無修正ヘンタイHD最高のアニメセックスとオタク3Dポルノを見る",
              "watch_good_girls_108264b4": "良い子がスラットに変わるのを見る、無垢な女の子から娼婦への変身",
              "wet_pussy_fucking_2ee62f93": "濡れたマンコファック、潮吹き、激しいオーガズムクローズアップHDアクション",
              "women_cheating_on_7b4479fc": "女性がパーティーと独身パーティーで巨根で夫を裏切る"
          },
          "hero": {
              "eyebrow": "独占",
              "title-line1": "プレミアムアクセスのロックを解除",
              "title-price": "わずか $1.00",
              "subtitle": "費用の一部でトップティア向けコンテンツプラットフォームへの即座なアクセスを取得します。期間限定オファー。",
              "cta": "取引を表示"
          }
      },
      "pa": {
          "meta": {
              "title": "$1 لئی سستے پورن ڈیل اتے مفت چھوٹ | FlirtyDeals.com",
              "description": "سبھ توں سستی پورن چھوٹ اتے ودھیا ڈیلاں ہن ویکری تے! $1 کوپن پراپت کرو اتے چوٹی دیاں پورن سائیٹاں تے سستی میمبرشپ خریدو۔ اج FlirtyDeals.com تے مفت XXX ویڈیو دیکھو!",
              "og-title": "$1 لئی سستے پورن ڈیل اتے مفت چھوٹ | FlirtyDeals.com",
              "og-description": "سبھ توں سستی پورن چھوٹ اتے ودھیا ڈیلاں ہن ویکری تے! $1 کوپن پراپت کرو اتے چوٹی دیاں پورن سائیٹاں تے سستی میمبرشپ خریدو۔ اج FlirtyDeals.com تے مفت XXX ویڈیو دیکھو!"
          },
          "cookie": {
              "message": "اسیں تہاڈے براؤزنگ انوبھو نوں ودھاؤن اتے ساڈے ٹریفک دا وشلیشن کرن لئی کوکیز دی ورتوں کردے ہاں۔",
              "accept": "✓ سویکار کرو",
              "reject": "✗ اسویکار کرو",
              "customize": "⚙ انکولت کرو",
              "preferences-title": "کوکی ترجیحاں",
              "necessary-title": "✅ ضروری کوکیز",
              "necessary-description": "ایہہ کوکیز ویب سائٹ نوں صحیح ڈھنگ نال کم کرن لئی ضروری ہن۔ اہناں نوں اے یوگ نہیں کیتا جا سکدا۔",
              "analytics-title": "📊 وشلیشن کوکیز",
              "analytics-description": "ایہہ کوکیز سانوں ایہہ سمجھن وچ مدد کردیاں ہن کہ وزٹر ساڈی ویب سائٹ نال کویں انٹریکٹ کردے ہن، جانکاری نوں گمنام روپ وچ اکٹھا اتے رپورٹ کر کے (Google Analytics)۔",
              "save-preferences": "ترجیحاں سنبھالو",
              "accept-all": "سبھ سویکار کرو"
          },
          "age": {
              "title": "🔞 عمر دی پشٹی",
              "text": "اس سمگری نوں دیکھن لئی تہاڈی عمر 18 سال جاں اس توں ودھ ہونی چاہیدی ہے۔ جاری رکھن لئی کرپا کر کے اپنی عمر دی پشٹی کرو۔",
              "accept": "ਮੈਂ 18+ ਹਾਂ - ਦਰਜ ਕਰੋ",
              "exit": "باہر نکلو"
          },
          "nav": {
              "title": "سستے پورن ڈیل اتے ودھیا چھوٹ",
              "subtitle": "گرم اتے سیکسی HD XXX ویڈیو اپلبدھ • مفت پورن ویڈیو سبسکرپشن"
          },
          "filter": {
              "all": "سارے ڈیل",
              "premium": "پریمیم سائٹاں",
              "free": "مفت سمگری",
              "shemale": "شیمیل"
          },
          "section": {
              "top": "🔥 ٹاپ ڈیل",
              "premium": "💎 پریمیم پورن سائٹاں",
              "free": "🎁 مفت پورن سمگری اتے ٹرائل",
              "shemale": "🌈 شیمیل پورن ڈیل اتے سستی ٹرانسجینڈر چھوٹ"
          },
          "button": {
              "view-deal": "ڈیل دیکھو",
              "claim-freebie": "مفت داعوا کرو",
              "chat-now": "ہنے چیٹ کرو"
          },
          "free-text": "مفت",
          "shemale": {
              "reveal": "پرگٹ کرن لئی کلک کرو<br><small>(شیمیل سمگری)</small>"
          },
          "footer": {
              "information": "جانکاری",
              "terms": "شرطاں اتے نیم",
              "privacy": "گوپنییتا نیتی",
              "about": "ساڈے بارے",
              "blog": "بلاگ",
              "support": "سہایتا",
              "faq": "اکثر پچھے جان والے سوال",
              "contact": "ساڈے نال سمپرک کرو",
              "sitemap": "سائٹ میپ",
              "compliance": "پالنا",
              "gdpr": "GDPR پالنا",
              "2257": "2257 پالنا",
              "follow": "ساڈا انسرن کرو",
              "ai-girlfriend": "AI گرل فرینڈ",
              "copyright": "© 2026 FlirtyDeals.com - سارے حق راکھویں ہن۔"
          },
          "badge": {
              "featured": "چوٹی دا سودا",
              "free": "مفت",
              "discount-90": "90% چھوٹ",
              "discount-96": "96% چھوٹ",
              "discount-97": "97% چھوٹ"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "بینگ بروس پورن سٹار ورچوئل ریئلٹی پورن ویڈیوز وچ فک کردے ہن، پہلے وئکتی وچ VR",
              "bi_group_sex_4816ef53": "بائی گرپ سیکس، گینگ بینگ اتے اورجی MILFs، ٹینز اتے یورو بیبز نال HD وچ",
              "bicurious_threesomes_a607bef0": "بائی-کیوریس تھریسم اتے اورجی سٹریٹ گائز اتے ہورنی کپلس نال HD وچ",
              "big_budget_porn_939cef9f": "بگ بجٹ پورن، لیجنڈری ٹائٹلس، لمبیاں موویز اتے ہائی کوالٹی پورن موویز HD وچ",
              "create_your_own_2567df77": "اپنی AI گرل فرینڈ بناؤ اتے اپنیاں جنسی فینٹیسیاں لئی گرم چتر تیار کرو",
              "dm_our_ai_97b68dc0": "ساڈے AI سیکس بوٹس نوں DM کرو، کامک چیٹنگ اتے NSFW رول پلے فینٹیسیاں!",
              "exclusive_porn_video_9f442154": "وشیش پورن ویڈیوز HD وچ جس وچ 2500+ پورن سٹار اتے 10,000+ درش ہن",
              "free_hd_premium_80c039ef": "مفت HD پریمیم پورن ویڈیوز 4K، 1080p اتے 720p وچ، کوئی اشتہار نہیں، سکھر پورن سٹار",
              "hardcore_homemade_po_e7d69259": "ہارڈکور گھریلو پورن ڈیپ تھروٹ، اینل اتے ٹٹ فکنگ نال HD وچ",
              "hardcore_lesbian_gla_23e4abb4": "ہارڈکور لیزبین گلیم پورن سندر عورتاں اتے کامک ڈلڈو سیکس نال",
              "hardcore_transgender_b0514418": "ہارڈکور ٹرانسجینڈر سیکس سیکسی ماڈلاں اتے ڈبل پینٹریشنز نال",
              "hd_porn_videos_911395bc": "HD پورن ویڈیوز سکھر پورن سٹاراں نال لیزبین، ملف اتے ٹین سیکس درشاں وچ",
              "horny_amateurs_and_2afdcfef": "ہورنی شوقین اتے ٹینز ہارڈکور پورن وچ وڈیاں چھاتیاں نال",
              "horny_college_girls_eff8e389": "ہورنی کالج کڑیاں، شرابی ٹینز اتے وبھچاری سکول کڑیاں جنگلی سیکس ویڈیوز وچ",
              "hot__sexy_73272450": "گرم اتے سیکسی ٹینز HD ریئلٹی پورن شرارتی سکول کڑیاں اتے وگڑے ٹینز نال",
              "hot_amateur_sex_4a549f25": "گرم شوقین سیکس ویڈیوز، لائیو کیمز اتے XXX نش سوشل کمیونٹی وچ",
              "hot_women_in_bcbacc08": "گرم عورتاں سنویدنشیل مساج، لیزبین اتے ملف کپلس سیکس ویڈیوز وچ",
              "innocent_japanese_gi_976dcc44": "ماسوم جاپانی کڑیاں ہارڈکور سیکس ویڈیوز وچ پیاریاں ایشیئناں نال فک ہندیاں ہن",
              "interactive_porn_wit_bfc2ee56": "اپنے منپسند سٹاراں نال انٹریکٹو پورن: اپنی خد دی سیکس ایڈوینچر چنو",
              "mothers_and_daughter_ae77b18c": "ماواں اتے دھیاں کامک سیکس ویڈیوز وچ سنویدنشیل اتے ہارڈکور پورن نال",
              "original_amateur_por_0a634668": "مول شوقین پورن ویڈیوز گرم سیکس درشاں نال",
              "perfect_girls_in_34f46622": "سمپورن کڑیاں HD سنویدنشیل پورن ویڈیوز وچ سندر بیبز اتے گرم ایکشن نال",
              "petite_teens_get_3fa66e0f": "چھوٹیاں ٹینز دوجیاں کڑیاں نال گپت تکیے نال رگڑن والے سیکس وچ پھڑیاں جاندیاں ہن",
              "play_free_sex_18a4284e": "مفت سیکس گیماں، پورن گیماں اتے بالغ اینیمے گیماں ہنے آن لائن کھیڈو",
              "realtor_sells_house_5cea75ea": "ریئلٹر اپنے ریئل اسٹیٹ ایجنٹ سہیوگی دے پچھے کلائنٹ نال سیکس لئی گھر ویچدی ہے",
              "sensual_lesbian_sex_d6a7d951": "سنویدنشیل لیزبین سیکس پسی چٹن، چمن اتے اصلی اورگازم نال HD وچ",
              "sexy_latinas_hot_e042f4bb": "سیکسی لیٹیناز، گرم دکھنی امریکی ویشواواں اتے برازیلین کڑیاں وڈیاں چھاتیاں نال",
              "sexy_lesbian_bliss_02fbc3be": "سیکسی لیزبین آنند ٹین کڑیاں، ہارڈکور HD پسی چٹن اتے سٹریپ اون سیکس",
              "sexy_milfs_in_c2f5b548": "سیکسی ملفس ہارڈکور HD پورن ویڈیوز وچ وڈیاں چھاتیاں اتے وشال لنڈاں نال",
              "sexy_realtors_fuck_77197cf3": "سیکسی ریئلٹرس گھر دی وکری لئی فک کردے ہن ہارڈکور HD ویڈیوز وچ بلو جابز نال",
              "taboo_family_affairs_d11e453b": "ورجت پریوارک مامے HD وچ بھرا بھین ماں باپ سیکس راز پرگٹ",
              "take_a_wild_33301cda": "فیک ٹیکسی، گرم عورتاں، پلس اتے گندیاں ملاقاتاں نال جنگلی سواری لؤ",
              "tinder_dates_gone_f7c52d3b": "ٹنڈر ڈیٹس جنگلی ہو گئیاں، پہلی ڈیٹ تے فک گرم سنگلز اتے پیارے ہک اپس نال",
              "trans_women_explorin_e5af20f2": "ٹرانس عورتاں پرشاں، عورتاں، تھریسم اتے ہور نال جنسیت دی کھوج کر رہیاں ہن",
              "transgender_erotic_t_2d0b1cbe": "ٹرانسجینڈر کامک TS پورن HD فلماں، کم شاٹس اتے گرم اینل سیکس نال",
              "true_amateurs_fuck_b161a012": "اصلی شوقین گرم گھریلو پورن ویڈیوز وچ ننگیاں نمفوز نال فک کردے ہن",
              "uncensored_hentai_in_2f7cc979": "بناں سینسر ہینٹائی HD وچ سبھ توں ودھیا اینیمے سیکس اتے ویب 3D پورن دیکھو",
              "watch_good_girls_108264b4": "چنگیاں کڑیاں نوں ویشواواں وچ بدلدے دیکھو، ماسوم کڑیاں توں ویشوا پرورتن",
              "wet_pussy_fucking_2ee62f93": "گلی پسی فکنگ، سکورٹنگ اتے تیبر اورگازم کلوز-اپ HD ایکشن وچ",
              "women_cheating_on_7b4479fc": "عورتاں پارٹیاں اتے بیچلریٹ بیشاں وچ وڈے لنڈاں نال پتیاں نوں دھوکھا دے رہیاں ہن"
          },
          "hero": {
              "eyebrow": "ਖਾਸ",
              "title-line1": "ਪ੍ਰੀਮੀਅਮ ਐਕਸੈਸ ਖੋਲ੍ਹੋ",
              "title-price": "ਸਿਰਫ $1.00",
              "subtitle": "ਬਾਲਗ ਸਮੱਗਰੀ ਪਲੇਟਫਾਰਮਾਂ ਤੋਂ ਤਤਕਾਲ ਪਹੁੰਚ ਪ੍ਰਾਪਤ ਕਰੋ। ਸੀਮਤ ਸਮੇਂ ਦੀ ਪੇਸ਼ਕਸ਼।",
              "cta": "ਡੀਲ ਦੇਖੋ"
          }
      },
      "fr": {
          "meta": {
              "title": "Offres Porno à 1$ et Réductions Gratuites | FlirtyDeals.com",
              "description": "Les remises porno les moins chères et les meilleures offres en vente maintenant! Obtenez des coupons de 1$ et achetez des abonnements bon marché sur les meilleurs sites porno. Regardez des vidéos XXX gratuites sur FlirtyDeals.com aujourd'hui!",
              "og-title": "Offres Porno à 1$ et Réductions Gratuites | FlirtyDeals.com",
              "og-description": "Les remises porno les moins chères et les meilleures offres en vente maintenant! Obtenez des coupons de 1$ et achetez des abonnements bon marché sur les meilleurs sites porno. Regardez des vidéos XXX gratuites sur FlirtyDeals.com aujourd'hui!"
          },
          "cookie": {
              "message": "Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser notre trafic.",
              "accept": "✓ Accepter",
              "reject": "✗ Rejeter",
              "customize": "⚙ Personnaliser",
              "preferences-title": "Préférences des cookies",
              "necessary-title": "✅ Cookies Nécessaires",
              "necessary-description": "Ces cookies sont essentiels au bon fonctionnement du site Web. Ils ne peuvent pas être désactivés.",
              "analytics-title": "📊 Cookies Analytiques",
              "analytics-description": "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site Web en collectant et en rapportant des informations de manière anonyme (Google Analytics).",
              "save-preferences": "Enregistrer les Préférences",
              "accept-all": "Tout Accepter"
          },
          "age": {
              "title": "🔞 Vérification de l'Âge",
              "text": "Vous devez avoir 18 ans ou plus pour voir ce contenu. Veuillez confirmer votre âge pour continuer.",
              "accept": "J'ai 18+ - Entrer",
              "exit": "Sortir"
          },
          "nav": {
              "title": "Offres Porno Pas Chères et Meilleures Réductions",
              "subtitle": "Vidéos XXX HD Chaudes et Sexy Disponibles • Abonnements Vidéo Porno Gratuits"
          },
          "filter": {
              "all": "Toutes les Offres",
              "premium": "Sites Premium",
              "free": "Contenu Gratuit",
              "shemale": "Shemale"
          },
          "section": {
              "top": "🔥 Meilleures Offres",
              "premium": "💎 Sites Porno Premium",
              "free": "🎁 Contenu Porno Gratuit et Essais",
              "shemale": "🌈 Offres Porno Shemale et Réductions Trans Bon Marché"
          },
          "button": {
              "view-deal": "Voir l'Offre",
              "claim-freebie": "Réclamer Gratuit",
              "chat-now": "Discuter Maintenant"
          },
          "free-text": "Gratuit",
          "shemale": {
              "reveal": "Cliquez pour Révéler<br><small>(Contenu Shemale)</small>"
          },
          "footer": {
              "information": "Information",
              "terms": "Termes et Conditions",
              "privacy": "Politique de Confidentialité",
              "about": "À Propos de Nous",
              "blog": "Blog",
              "support": "Support",
              "faq": "FAQ",
              "contact": "Nous Contacter",
              "sitemap": "Plan du Site",
              "compliance": "Conformité",
              "gdpr": "Conformité RGPD",
              "2257": "Conformité 2257",
              "follow": "Suivez-Nous",
              "ai-girlfriend": "Petite Amie IA",
              "copyright": "© 2026 FlirtyDeals.com - Tous droits réservés."
          },
          "badge": {
              "featured": "Meilleure Offre",
              "free": "Gratuit",
              "discount-90": "90% de réduction",
              "discount-96": "96% de réduction",
              "discount-97": "97% de réduction"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "Les stars du porno Bang Bros baisent dans des vidéos porno de réalité virtuelle, VR à la première personne",
              "bi_group_sex_4816ef53": "Sexe de groupe bisexuel, gangbangs et orgies avec des MILFs, ados et beautés européennes en HD",
              "bicurious_threesomes_a607bef0": "Plans à trois et orgies bi-curieux avec des mecs hétéros et des couples excités en HD",
              "big_budget_porn_939cef9f": "Porno à gros budget, titres légendaires, films longs et films porno de haute qualité en HD",
              "create_your_own_2567df77": "Créez votre propre petite amie IA et générez des images chaudes pour vos fantasmes sexuels",
              "dm_our_ai_97b68dc0": "Envoyez un DM à nos sexbots IA, chat érotique et fantasmes de jeu de rôle NSFW !",
              "exclusive_porn_video_9f442154": "Vidéos porno exclusives en HD avec plus de 2500 stars du porno dans plus de 10 000 scènes",
              "free_hd_premium_80c039ef": "Vidéos porno premium gratuites en HD 4K, 1080p et 720p, sans publicités, stars du porno de premier plan",
              "hardcore_homemade_po_e7d69259": "Porno maison hardcore avec gorge profonde, anal et baise de seins en HD",
              "hardcore_lesbian_gla_23e4abb4": "Porno lesbien glamour hardcore avec de belles femmes et du sexe érotique au gode",
              "hardcore_transgender_b0514418": "Sexe transgenre hardcore avec des modèles sexy et des doubles pénétrations",
              "hd_porn_videos_911395bc": "Vidéos porno HD avec les meilleures stars du porno dans des scénarios de sexe lesbien, MILF et ado",
              "horny_amateurs_and_2afdcfef": "Amatrices excitées et ados dans du porno hardcore avec de gros seins",
              "horny_college_girls_eff8e389": "Étudiantes excitées, ados ivres et écolières salopes dans des vidéos de sexe sauvage",
              "hot__sexy_73272450": "Porno de réalité HD d'ados chaudes et sexy avec des écolières coquines et des ados perverses",
              "hot_amateur_sex_4a549f25": "Vidéos de sexe amateur chaud, cams en direct et niches XXX dans une communauté sociale",
              "hot_women_in_bcbacc08": "Femmes chaudes dans des massages sensuels, vidéos de sexe lesbien et couples MILF",
              "innocent_japanese_gi_976dcc44": "Filles japonaises innocentes baisées dans des vidéos de sexe hardcore avec des Asiatiques mignonnes",
              "interactive_porn_wit_bfc2ee56": "Porno interactif avec vos stars préférées : choisissez votre propre aventure sexuelle",
              "mothers_and_daughter_ae77b18c": "Mères et filles dans des vidéos de sexe érotique avec du porno sensuel et hardcore",
              "original_amateur_por_0a634668": "Vidéos porno amateur originales avec des scènes de sexe chaudes",
              "perfect_girls_in_34f46622": "Filles parfaites dans des vidéos porno sensuelles HD avec de belles beautés et de l'action chaude",
              "petite_teens_get_3fa66e0f": "Ados petites prises en flagrant délit de sexe sournois en se frottant sur des oreillers avec d'autres filles",
              "play_free_sex_18a4284e": "Jouez à des jeux de sexe gratuits, jeux porno et jeux d'anime pour adultes en ligne maintenant",
              "realtor_sells_house_5cea75ea": "Agent immobilier vend une maison contre du sexe avec un client dans le dos de son collègue agent",
              "sensual_lesbian_sex_d6a7d951": "Sexe lesbien sensuel avec léchage de chatte, baisers et orgasmes réels en HD",
              "sexy_latinas_hot_e042f4bb": "Latinas sexy, salopes sud-américaines chaudes et filles brésiliennes avec de gros seins",
              "sexy_lesbian_bliss_02fbc3be": "Extase lesbienne sexy de filles ados, léchage de chatte HD hardcore et sexe avec gode-ceinture",
              "sexy_milfs_in_c2f5b548": "MILFs sexy dans des vidéos porno hardcore HD avec de gros seins et des bites massives",
              "sexy_realtors_fuck_77197cf3": "Agents immobiliers sexy baisent pour la vente de la maison dans des vidéos HD hardcore avec des pipes",
              "taboo_family_affairs_d11e453b": "Affaires familiales tabou en HD secrets de sexe entre frère, sœur, maman et papa révélés",
              "take_a_wild_33301cda": "Faites un tour sauvage avec Fake Taxi, femmes chaudes, flics et rencontres sales",
              "tinder_dates_gone_f7c52d3b": "Rendez-vous Tinder qui dégénèrent, baiser au premier rendez-vous avec des célibataires chauds et des coups mignons",
              "trans_women_explorin_e5af20f2": "Femmes trans explorant la sexualité avec des hommes, des femmes, des plans à trois et plus",
              "transgender_erotic_t_2d0b1cbe": "Porno érotique transgenre TS avec des films HD, éjaculations et sexe anal chaud",
              "true_amateurs_fuck_b161a012": "Vrais amateurs baisent dans des vidéos porno maison chaudes avec des nymphomanes nues",
              "uncensored_hentai_in_2f7cc979": "Hentai non censuré en HD regardez le meilleur sexe anime et porno 3D weeb",
              "watch_good_girls_108264b4": "Regardez les bonnes filles se transformer en salopes, transformations de filles innocentes en putes",
              "wet_pussy_fucking_2ee62f93": "Baise de chatte mouillée, squirting et orgasmes intenses en action gros plan HD",
              "women_cheating_on_7b4479fc": "Femmes trompant leurs maris avec de grosses bites lors de fêtes et enterrements de vie de jeune fille"
          },
          "hero": {
              "eyebrow": "Exclusif",
              "title-line1": "Déverrouillez l'accès premium",
              "title-price": "Seulement $1.00",
              "subtitle": "Obtenez un accès instantané aux meilleures plates-formes de contenu pour adultes à une fraction du coût. Offre à durée limitée.",
              "cta": "Voir l'offre"
          }
      },
      "de": {
          "meta": {
              "title": "Günstige Porno-Angebote für 1$ & Kostenlose Rabatte | FlirtyDeals.com",
              "description": "Die günstigsten Porno-Rabatte und besten Angebote jetzt im Verkauf! Erhalten Sie 1$-Gutscheine und kaufen Sie günstige Mitgliedschaften auf Top-Porno-Seiten. Schauen Sie noch heute kostenlose XXX-Videos auf FlirtyDeals.com!",
              "og-title": "Günstige Porno-Angebote für 1$ & Kostenlose Rabatte | FlirtyDeals.com",
              "og-description": "Die günstigsten Porno-Rabatte und besten Angebote jetzt im Verkauf! Erhalten Sie 1$-Gutscheine und kaufen Sie günstige Mitgliedschaften auf Top-Porno-Seiten. Schauen Sie noch heute kostenlose XXX-Videos auf FlirtyDeals.com!"
          },
          "cookie": {
              "message": "Wir verwenden Cookies, um Ihr Surferlebnis zu verbessern und unseren Datenverkehr zu analysieren.",
              "accept": "✓ Akzeptieren",
              "reject": "✗ Ablehnen",
              "customize": "⚙ Anpassen",
              "preferences-title": "Cookie-Einstellungen",
              "necessary-title": "✅ Notwendige Cookies",
              "necessary-description": "Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Sie können nicht deaktiviert werden.",
              "analytics-title": "📊 Analyse-Cookies",
              "analytics-description": "Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und berichten (Google Analytics).",
              "save-preferences": "Einstellungen speichern",
              "accept-all": "Alle akzeptieren"
          },
          "age": {
              "title": "🔞 Altersverifizierung",
              "text": "Sie müssen 18 Jahre oder älter sein, um diesen Inhalt anzuzeigen. Bitte bestätigen Sie Ihr Alter, um fortzufahren.",
              "accept": "Ich bin 18+ - Eingeben",
              "exit": "Beenden"
          },
          "nav": {
              "title": "Günstige Porno-Angebote und Beste Rabatte",
              "subtitle": "Heiße & Sexy HD XXX Videos Verfügbar • Kostenlose Porno-Video-Abonnements"
          },
          "filter": {
              "all": "Alle Angebote",
              "premium": "Premium-Seiten",
              "free": "Kostenloser Inhalt",
              "shemale": "Shemale"
          },
          "section": {
              "top": "🔥 Top-Angebote",
              "premium": "💎 Premium-Porno-Seiten",
              "free": "🎁 Kostenloser Porno-Inhalt & Testversionen",
              "shemale": "🌈 Shemale-Porno-Angebote und Günstige Transgender-Rabatte"
          },
          "button": {
              "view-deal": "Angebot ansehen",
              "claim-freebie": "Gratis beanspruchen",
              "chat-now": "Jetzt chatten"
          },
          "free-text": "Kostenlos",
          "shemale": {
              "reveal": "Klicken Sie zum Anzeigen<br><small>(Shemale-Inhalt)</small>"
          },
          "footer": {
              "information": "Information",
              "terms": "Allgemeine Geschäftsbedingungen",
              "privacy": "Datenschutzrichtlinie",
              "about": "Über Uns",
              "blog": "Blog",
              "support": "Support",
              "faq": "FAQ",
              "contact": "Kontaktiere uns",
              "sitemap": "Sitemap",
              "compliance": "Compliance",
              "gdpr": "DSGVO-Konformität",
              "2257": "2257-Konformität",
              "follow": "Folge uns",
              "ai-girlfriend": "KI-Freundin",
              "copyright": "© 2026 FlirtyDeals.com - Alle Rechte vorbehalten."
          },
          "badge": {
              "featured": "Top-Angebot",
              "free": "Kostenlos",
              "discount-90": "90% Rabatt",
              "discount-96": "96% Rabatt",
              "discount-97": "97% Rabatt"
          },
          "desc": {
              "bang_bros_pornstars_566c9dcf": "Bang Bros Pornostars ficken in Virtual-Reality-Pornovideos, VR in der ersten Person",
              "bi_group_sex_4816ef53": "Bisexueller Gruppensex, Gangbangs und Orgien mit MILFs, Teens und Euro-Babes in HD",
              "bicurious_threesomes_a607bef0": "Bi-neugierige Dreier und Orgien mit hetero Typen und geilen Paaren in HD",
              "big_budget_porn_939cef9f": "Großbudget-Porno, legendäre Titel, lange Filme und hochwertige Pornofilme in HD",
              "create_your_own_2567df77": "Erstelle deine eigene KI-Freundin und generiere heiße Bilder für deine sexuellen Fantasien",
              "dm_our_ai_97b68dc0": "DM unsere KI-Sexbots, erotisches Chatten und NSFW-Rollenspiel-Fantasien!",
              "exclusive_porn_video_9f442154": "Exklusive Pornovideos in HD mit über 2500 Pornostars in über 10.000 Szenen",
              "free_hd_premium_80c039ef": "Kostenlose HD-Premium-Pornovideos in 4K, 1080p und 720p, keine Werbung, Top-Pornostars",
              "hardcore_homemade_po_e7d69259": "Hardcore-Homemade-Porno mit Deep Throat, Anal und Tittenficken in HD",
              "hardcore_lesbian_gla_23e4abb4": "Hardcore-Lesben-Glamour-Porno mit schönen Frauen und erotischem Dildo-Sex",
              "hardcore_transgender_b0514418": "Hardcore-Transgender-Sex mit sexy Models und Doppelpenetrationen",
              "hd_porn_videos_911395bc": "HD-Pornovideos mit Top-Pornostars in Lesben-, Milf- und Teen-Sex-Szenarien",
              "horny_amateurs_and_2afdcfef": "Geile Amateure und Teens in Hardcore-Pornos mit großen Brüsten",
              "horny_college_girls_eff8e389": "Geile College-Mädchen, betrunkene Teens und versaute Schulmädchen in wilden Sexvideos",
              "hot__sexy_73272450": "Heiße und sexy Teens HD-Reality-Porno mit frechen Schulmädchen und perversen Teens",
              "hot_amateur_sex_4a549f25": "Heiße Amateur-Sexvideos, Live-Cams und XXX-Nischen in einer sozialen Community",
              "hot_women_in_bcbacc08": "Heiße Frauen in sinnlicher Massage, Lesben und Milf-Paare Sexvideos",
              "innocent_japanese_gi_976dcc44": "Unschuldige japanische Mädchen werden in Hardcore-Sexvideos mit süßen Asiatinnen gefickt",
              "interactive_porn_wit_bfc2ee56": "Interaktiver Porno mit deinen Lieblingsstars: Wähle dein eigenes Sex-Abenteuer",
              "mothers_and_daughter_ae77b18c": "Mütter und Töchter in erotischen Sexvideos mit sinnlichem und Hardcore-Porno",
              "original_amateur_por_0a634668": "Original-Amateur-Pornovideos mit heißen Sexszenen",
              "perfect_girls_in_34f46622": "Perfekte Mädchen in HD-sinnlichen Pornovideos mit schönen Babes und heißer Action",
              "petite_teens_get_3fa66e0f": "Zierliche Teens werden beim heimlichen Kissen-Humping-Sex mit anderen Mädchen erwischt",
              "play_free_sex_18a4284e": "Spiele kostenlose Sexspiele, Pornospiele und Erwachsenen-Anime-Spiele jetzt online",
              "realtor_sells_house_5cea75ea": "Maklerin verkauft Haus gegen Sex mit Klient hinter dem Rücken ihres Immobilienmakler-Kollegen",
              "sensual_lesbian_sex_d6a7d951": "Sinnlicher Lesbensex mit Pussy-Lecken, Küssen und echten Orgasmen in HD",
              "sexy_latinas_hot_e042f4bb": "Sexy Latinas, heiße südamerikanische Schlampen und brasilianische Mädchen mit großen Brüsten",
              "sexy_lesbian_bliss_02fbc3be": "Sexy Lesben-Glückseligkeit Teen-Mädchen, Hardcore-HD-Pussy-Lecken und Strap-On-Sex",
              "sexy_milfs_in_c2f5b548": "Sexy Milfs in Hardcore-HD-Pornovideos mit großen Brüsten und massiven Schwänzen",
              "sexy_realtors_fuck_77197cf3": "Sexy Maklerinnen ficken für den Hausverkauf in Hardcore-HD-Videos mit Blowjobs",
              "taboo_family_affairs_d11e453b": "Tabu-Familienangelegenheiten in HD Bruder-Schwester-Mama-Papa-Sex-Geheimnisse enthüllt",
              "take_a_wild_33301cda": "Mach eine wilde Fahrt mit Fake Taxi, heißen Frauen, Polizisten und dreckigen Begegnungen",
              "tinder_dates_gone_f7c52d3b": "Tinder-Dates außer Kontrolle, beim ersten Date ficken mit heißen Singles und süßen Hookups",
              "trans_women_explorin_e5af20f2": "Trans-Frauen erkunden Sexualität mit Männern, Frauen, Dreiern und mehr",
              "transgender_erotic_t_2d0b1cbe": "Transgender-erotischer TS-Porno mit HD-Filmen, Cumshots und heißem Analsex",
              "true_amateurs_fuck_b161a012": "Echte Amateure ficken in heißen selbstgemachten Pornovideos mit nackten Nymphomaninnen",
              "uncensored_hentai_in_2f7cc979": "Unzensierte Hentai in HD schaue den besten Anime-Sex und Weeb-3D-Porno",
              "watch_good_girls_108264b4": "Schau zu, wie gute Mädchen zu Schlampen werden, Transformationen unschuldiger Mädchen zu Huren",
              "wet_pussy_fucking_2ee62f93": "Nasse Pussy-Fickerei, Squirting und intensive Orgasmen in Nahaufnahme HD-Action",
              "women_cheating_on_7b4479fc": "Frauen betrügen Ehemänner mit großen Schwänzen auf Partys und Junggesellinnenabschieden"
          },
          "hero": {
              "eyebrow": "Exklusiv",
              "title-line1": "Schalten Sie Premiumzugriff frei",
              "title-price": "Nur $1.00",
              "subtitle": "Erhalten Sie sofortigen Zugriff auf erstklassige Erwachseneninhaltsplattformen zu einem Bruchteil der Kosten. Begrenztes Angebot.",
              "cta": "Angebot anzeigen"
          }
      }
  };
  let translations = null;
  let currentLang = DEFAULT_LANG;

  function getStoredLang() {
    try {
      return localStorage.getItem(LANG_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* ignore */
    }
  }

  function detectInitialLang(available) {
    const stored = getStoredLang();
    if (stored && available.includes(stored)) return stored;

    const nav = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
    if (nav && available.includes(nav)) return nav;

    return DEFAULT_LANG;
  }

  // Resolve "namespace.key" against a language object, e.g. desc.some_key
  function resolveKey(langObj, dottedKey) {
    if (!langObj) return undefined;
    const parts = dottedKey.split('.');
    let node = langObj;
    for (const part of parts) {
      if (node && Object.prototype.hasOwnProperty.call(node, part)) {
        node = node[part];
      } else {
        return undefined;
      }
    }
    return typeof node === 'string' ? node : undefined;
  }

  function t(key, lang) {
    lang = lang || currentLang;
    if (!translations) return null;
    return (
      resolveKey(translations[lang], key) ??
      resolveKey(translations[DEFAULT_LANG], key) ??
      null
    );
  }

  function applyTranslations(lang) {
    if (!translations) return;
    currentLang = translations[lang] ? lang : DEFAULT_LANG;

    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute(
      'dir',
      currentLang === 'ar' || currentLang === 'ur' ? 'rtl' : 'ltr'
    );

    // Plain text/HTML nodes
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = t(key);
      if (value == null) return;

      // A couple of keys intentionally carry inline markup (e.g. the
      // shemale reveal hint's <br><small>), everything else is plain text.
      if (value.includes('<') && value.includes('>')) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    // Meta tag content (title/description/OG tags use data-i18n too, but
    // <title> and <meta content> need special handling since textContent
    // doesn't apply the same way)
    document.querySelectorAll('meta[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = t(key);
      if (value != null) el.setAttribute('content', value);
    });

    // Prices: data-i18n-price holds the raw numeric string; we localize
    // the currency symbol/format per language while keeping the amount.
    document.querySelectorAll('[data-i18n-price]').forEach((el) => {
      const amount = parseFloat(el.getAttribute('data-i18n-price'));
      if (Number.isNaN(amount)) return;
      try {
        el.textContent = new Intl.NumberFormat(currentLang, {
          style: 'currency',
          currency: 'USD'
        }).format(amount);
      } catch (e) {
        el.textContent = '$' + amount.toFixed(2);
      }
    });

    updateLanguageSwitcherUI();
  }

  function updateLanguageSwitcherUI() {
    const currentLabel = document.getElementById('current-lang-label');
    const currentFlag = document.getElementById('current-lang-flag');
    if (currentLabel) currentLabel.textContent = LANGUAGE_LABELS[currentLang] || currentLang.toUpperCase();
    if (currentFlag) currentFlag.textContent = LANGUAGE_FLAGS[currentLang] || '🌐';

    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
  }

  function setupLanguageOptions() {
    const options = document.querySelectorAll('#lang-dropdown .lang-option');
    options.forEach((btn) => {
      if (btn.dataset.i18nBound === '1') return;
      btn.dataset.i18nBound = '1';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const lang = btn.getAttribute('data-lang');
        if (!lang) return;
        if (translations && translations[lang]) {
          setLanguage(lang);
        } else {
          // Only navigate as a last resort when translations could not be loaded.
          window.location.href = lang === DEFAULT_LANG ? '/' : '/' + lang;
          return;
        }
        const dropdown = document.getElementById('lang-dropdown');
        if (dropdown) dropdown.classList.remove('show');
      });
    });
  }

  function setLanguage(lang) {
    if (!translations || !translations[lang]) return;
    currentLang = lang;
    storeLang(lang);
    applyTranslations(lang);
  }

  async function init() {
    setupLanguageOptions();

    // Start immediately with embedded translations so switching is instant.
    translations = BUILTIN_TRANSLATIONS;
    const available = Object.keys(translations);
    const initialLang = detectInitialLang(available);
    applyTranslations(initialLang);

    // Optionally refresh from translations.json when available.
    for (const url of TRANSLATIONS_URLS) {
      try {
        const res = await fetch(url, { cache: 'no-store', credentials: 'same-origin' });
        if (!res.ok) continue;
        const data = await res.json();
        if (!data || typeof data !== 'object' || !data.en) continue;
        translations = data;
        applyTranslations(currentLang);
        break;
      } catch (e) {
        // Embedded translations remain active.
      }
    }

    document.documentElement.classList.remove('i18n-loading');
  }

  // Toggle the language dropdown open/closed
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('lang-toggle-btn');
    const dropdown = document.getElementById('lang-dropdown');
    if (toggleBtn && dropdown) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      });
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== toggleBtn) {
          dropdown.classList.remove('show');
        }
      });
    }
    init();
  });

  // Expose a minimal API in case other scripts need it
  window.FlirtyI18n = { setLanguage, t: (key) => t(key) };
})();

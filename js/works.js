/* ============================================================
   作品数据配置文件
   ------------------------------------------------------------
   想增加或修改作品？只需要编辑下面的数组：
   - 复制一条作品对象，改里面的内容即可
   - 想删掉某条，直接删掉那一行
   - 数量会自动更新，页面排版自动适应
   ============================================================ */

const SITE = {
  /* ---------- 基本信息（面试前记得改成你的真实信息） ---------- */
  name: "MiaWANG",            // 显示在导航、首页和页脚的姓名
  englishName: "Portfolio",    // 首页大标题旁的小英文单词
  role: "资深儿童IP内容策划 · 课程策划 / 故事编写 / 绘本设计 / 视频包装 / 品牌策划",
  tagline: "为0-10岁的孩子，讲好每一个故事",

  /* ---------- 关于我（改成你自己的介绍） ---------- */
  aboutTitle: "你好呀，很高兴认识你",
  aboutParagraphs: [
    "深耕儿童心理：8年0-10岁双语儿童故事创作、研学及课件编排与互动体验设计经验，懂儿童认知节奏与分龄设计。",
    "运用AI工具包括libtv/comfyui/midjourney/chatgpt/codex/即梦等进行人物形象设计、脚本/绘本/动画分镜生成、能精准控制风格、角色场景一致性、适龄表达，提升AIGC内容质量与可控性。",
    "强适应能力：先后经历疫情、双减政策等四次裁员，拥有大厂与国企等多样化工作背景，兼具互联网市场主导思维与国企的大型项目落地执行力。"
  ],
  tags: ["儿童内容策划", "故事创作", "绘本设计", "AI早教动画", "课程设计", "品牌策划"],

  /* ---------- 联系方式（改成你的） ---------- */
  contact: {
    email: "richie0614@163.com",
    wechat: "13670151011"
  }
};

const WORKS = {

  /* ==========================================================
     活动：按 1-4 四个主题分类展示
     照片放在 assets/activities/1/ ～ 4/ 文件夹里（01.jpg 开始，01 是“车”）。
     每组的张数：1 组 3 张、2 组 18 张、3 组 20 张、4 组 6 张。
     想增加照片：把图片按顺序放进对应文件夹，并把下面的数字改成新数量。
     点击照片可以放大查看。
     ========================================================== */
  activities: [
    {
      title: "01",
      photos: Array.from({ length: 3 }, (_, i) => `assets/activities/1/${String(i + 1).padStart(2, "0")}.jpg`)
    },
    {
      title: "02",
      photos: Array.from({ length: 18 }, (_, i) => `assets/activities/2/${String(i + 1).padStart(2, "0")}.jpg`)
    },
    {
      title: "03",
      photos: Array.from({ length: 20 }, (_, i) => `assets/activities/3/${String(i + 1).padStart(2, "0")}.jpg`),
      links: [
        { label: "微信推文 01", url: "https://mp.weixin.qq.com/s/CoRdzSGWf8xEnwvfoJqoJQ" },
        { label: "微信推文 02", url: "https://mp.weixin.qq.com/s/LB47Nq0sJ7mGnsMJSQquug" }
      ]
    },
    {
      title: "04",
      photos: Array.from({ length: 6 }, (_, i) => `assets/activities/4/${String(i + 1).padStart(2, "0")}.jpg`)
    }
  ],

  /* ==========================================================
     每个分类的文字介绍（鼠标移到顶部菜单时，出现在红色气泡里）
     ========================================================== */
  tips: {
    animations: "独立个人启蒙系列动画，即梦、剪映、PS等工具完成资产库搭建并制作完成。",
    activities: "主导策划及执行，包含课程选题、提案、车内规划设计、文案、视频包装、IP设计、摄像、视频包装、汇报等全流程，共四个主题，包括认识红树林卫士、山海连城绿美深圳、保护深圳野生动物及森林探索时光机。",
    books: "根据0-3岁发展规律制作启蒙绘本，运用即梦、AI、PS等工具。",
    videos: "负责分镜、拍摄、剪辑、调色等工作，运用Final cut pro、达芬奇等工具。",
    others: "场景概念手绘设计、原画设计、3D插画设计，运用PS、Nomad等工具。"
  },

  /* ==========================================================
     AI动画：10 个，可增加可修改
     url：填你的 B站 视频链接（例如 https://www.bilibili.com/video/BVxxxxxx）
     thumbnail：可填封面图路径；不填则显示占位封面
     desc：一句话简介（可选，填了会显示在卡片上）
     ========================================================== */
  aiAnimations: [
    { title: "《气球飞走了》", url: "https://www.bilibili.com/video/BV1mjg964E59", thumbnail: "assets/videos/气球飞走了.jpg", desc: "麦麦哒哒哒撞飞了弟弟的气球，这下闯祸啦！一场“气球大救援”正在进行中！" },
    { title: "《麦麦的小镜子》", url: "https://www.bilibili.com/video/BV1UVg96bExS", thumbnail: "assets/videos/麦麦的小镜子.jpg", desc: "麦麦收到大玩偶“点点”，竟把妈妈当成了“模仿范本”。原来最好的教育，就是让孩子在言传身教里，学会温柔对待这个世界。" },
    { title: "《清凉的鸭子》", url: "https://www.bilibili.com/video/BV1m5g96ZEkv", thumbnail: "assets/videos/清凉的鸭子.jpg", desc: "冬冬抢了麦麦最爱的黄色蜡笔！麦麦没有哭闹，而是坚定喊出“请还给我”。求助爸爸、立下规则、一起创作，原来化解冲突的最好办法，不是忍让，而是温柔又坚定的沟通呀～" },
    { title: "《送小蜗牛回家》", url: "https://www.bilibili.com/video/BV1PkgX6DEcy", thumbnail: "assets/videos/送小蜗牛回家.jpg", desc: "暖阳野餐日，邂逅一只流浪小蜗牛，麦麦秒变护送小卫士！走过独木桥、跳过石头路，还鼓起勇气钻进黑漆漆的树洞大冒险，把小蜗牛送回了家。" },
    { title: "《袜子不见了》", url: "https://www.bilibili.com/video/BV1srgX6HEa2", thumbnail: "assets/videos/袜子不见了.jpg", desc: "午睡醒来，妈妈不见了，连最爱的袜子也玩起了“躲猫猫”！麦麦变身小侦探，却被衣柜“吞”没、被玩具绊倒，最后才发现袜子竟藏在自己的裤脚里～" },
    { title: "《光之路》", url: "https://www.bilibili.com/video/BV1vf3i6ZE4E", thumbnail: "assets/videos/光之路.jpg", desc: "灯坏了，黑暗里藏着“小怪兽”？麦麦手握“光剑”勇敢闯关！从最初的犹豫害怕，到挥舞光柱一路披荆斩棘，不仅拿到了心爱的绘本，更点亮了心中的勇气之光。" },
    { title: "《小豆豆变形记》", url: "https://www.bilibili.com/video/BV1iZ3i6bEKY", thumbnail: "assets/videos/小豆豆变形记.jpg", desc: "麦麦的小豆豆在背包里“变绿”了！泥巴味儿引来一场“诚实大考”。刚想溜走，妈妈却笑着揭秘：这是豆子发芽啦！原来，勇敢承认错误，就能结出最甜的果实呀～" },
    { title: "《爱吃蔬菜的小工人》", url: "https://www.bilibili.com/video/BV1PhGP6QEbE", thumbnail: "assets/videos/爱吃蔬菜的小工人.jpg", desc: "肚子里的小工人罢工啦！只吃肉不吃菜的麦麦，肚子气鼓鼓像个小皮球。原来蔬菜是肠道里的“运动健将”，没吃到它们，清洁工们就不干活咯～" },
    { title: "《太阳太阳你去哪里了》", url: "https://www.bilibili.com/video/BV1PhGP6QEv2", thumbnail: "assets/videos/太阳太阳你去哪里了.jpg", desc: "太阳突然“离家出走”？麦麦秒变小侦探，顺着热树叶、喘气小狗和热汗环卫工一路追踪！原来是被乌云“藏”起来啦～" },
    { title: "《为什么一定要睡觉》", url: "https://www.bilibili.com/video/BV1P8GP6pEy8", thumbnail: "assets/videos/为什么一定要睡觉.jpg", desc: "图书、蹦床、蛋糕、城堡……麦麦的一天太充实，根本舍不得闭眼。为了让明天继续火力全开，今晚先乖乖充电吧，晚安麦麦。" }
  ],

  /* ==========================================================
     实拍视频：4 个，可增加可修改
     格式和 AI动画 一样
     ========================================================== */
  liveVideos: [
    { title: "《迎财神记得别吃糖》", url: "https://www.bilibili.com/video/BV1Wm4y1n73T", thumbnail: "assets/videos/迎财神记得别吃糖.jpg", desc: "" },
    { title: "《这不是营销号》", url: "https://www.bilibili.com/video/BV1vM4y1j7P9", thumbnail: "assets/videos/这不是营销号.jpg", desc: "" },
    { title: "《我被影视解说解说了》", url: "https://www.bilibili.com/video/BV18F411X7v7", thumbnail: "assets/videos/我被影视解说解说了.jpg", desc: "" },
    { title: "《真实的作家》", url: "https://www.bilibili.com/video/BV1S54y1P7Fb", thumbnail: "assets/videos/创作瓶颈，不存在的.jpg", desc: "" }
  ],

  /* ==========================================================
     其他：作品不多，视频和图片混放
     图片自动读取 assets/others/img-01.jpg ～ img-25.jpg
     （把下面的 25 改成实际张数即可增删）
     kind："image" 图片（点击放大）/ "video" 视频
    视频两种方式：src 填本地视频文件，url 填外链（如B站）
     ========================================================== */
  others: [
    ...Array.from({ length: 25 }, (_, i) => ({
      title: `其他作品 ${String(i + 1).padStart(2, "0")}`,
      kind: "image",
      src: `assets/others/img-${String(i + 1).padStart(2, "0")}.jpg`,
      desc: ""
    })),
    { title: "其他视频 01", kind: "video", src: "assets/others/video-01.mp4", desc: "" },
    { title: "其他视频 02", kind: "video", src: "assets/others/video-02.mp4", desc: "" }
  ],

  /* ==========================================================
     绘本：6 本，可增加可修改
     tag：绘本的小标签（麦麦日常 / 英文启蒙 / 自我探索）
     cover：可填封面图路径；不填则显示手绘风格占位封面
     pages：内页图片数组（可选）。填了之后，点击卡片会打开
            一本可以真实翻页的书。图片按阅读顺序排列即可，
            封面放在 cover，内页按 1、2、3…命名。
     ========================================================== */
  pictureBooks: [
    {
      title: "麦麦找妈妈",
      tag: "麦麦日常",
      cover: "assets/books/maimai-mom/cover.jpg",
      pages: [
        "assets/books/maimai-mom/1.jpg",
        "assets/books/maimai-mom/2.jpg",
        "assets/books/maimai-mom/3.jpg",
        "assets/books/maimai-mom/4.jpg",
        "assets/books/maimai-mom/5.jpg",
        "assets/books/maimai-mom/6.jpg",
        "assets/books/maimai-mom/7.jpg",
        "assets/books/maimai-mom/8.jpg",
        "assets/books/maimai-mom/9.jpg",
        "assets/books/maimai-mom/10.jpg"
      ],
      desc: ""
    },
    {
      title: "袜子不见了",
      tag: "麦麦日常",
      cover: "assets/books/socks-lost/cover.jpg",
      pages: [
        "assets/books/socks-lost/1.jpg",
        "assets/books/socks-lost/2.jpg",
        "assets/books/socks-lost/3.jpg",
        "assets/books/socks-lost/4.jpg",
        "assets/books/socks-lost/5.jpg",
        "assets/books/socks-lost/6.jpg",
        "assets/books/socks-lost/7.jpg"
      ],
      desc: ""
    },
    {
      title: "是棕色的小熊",
      tag: "麦麦日常",
      cover: "assets/books/brown-bear/cover.jpg",
      pages: [
        "assets/books/brown-bear/1.jpg",
        "assets/books/brown-bear/2.jpg",
        "assets/books/brown-bear/3.jpg",
        "assets/books/brown-bear/4.jpg",
        "assets/books/brown-bear/5.jpg",
        "assets/books/brown-bear/6.jpg",
        "assets/books/brown-bear/7.jpg"
      ],
      desc: ""
    },
    {
      title: "Where is my cat?",
      tag: "英文启蒙",
      cover: "assets/books/where-is-my-cat/cover.jpg",
      pages: [
        "assets/books/where-is-my-cat/1.jpg",
        "assets/books/where-is-my-cat/2.jpg",
        "assets/books/where-is-my-cat/3.jpg",
        "assets/books/where-is-my-cat/4.jpg",
        "assets/books/where-is-my-cat/5.jpg",
        "assets/books/where-is-my-cat/6.jpg",
        "assets/books/where-is-my-cat/7.jpg",
        "assets/books/where-is-my-cat/8.jpg",
        "assets/books/where-is-my-cat/9.jpg",
        "assets/books/where-is-my-cat/10.jpg",
        "assets/books/where-is-my-cat/11.jpg",
        "assets/books/where-is-my-cat/12.jpg",
        "assets/books/where-is-my-cat/13.jpg",
        "assets/books/where-is-my-cat/14.jpg",
        "assets/books/where-is-my-cat/15.jpg"
      ],
      desc: ""
    },
    {
      title: "When Christmas comes, Bobby",
      tag: "英文启蒙",
      cover: "assets/books/bobby-christmas/cover.jpg",
      pages: [
        "assets/books/bobby-christmas/1.jpg",
        "assets/books/bobby-christmas/2.jpg",
        "assets/books/bobby-christmas/3.jpg",
        "assets/books/bobby-christmas/4.jpg",
        "assets/books/bobby-christmas/5.jpg",
        "assets/books/bobby-christmas/6.jpg",
        "assets/books/bobby-christmas/7.jpg",
        "assets/books/bobby-christmas/8.jpg",
        "assets/books/bobby-christmas/9.jpg",
        "assets/books/bobby-christmas/10.jpg",
        "assets/books/bobby-christmas/11.jpg",
        "assets/books/bobby-christmas/12.jpg"
      ],
      desc: ""
    },
    {
      title: "王块块关于块块的思考",
      tag: "自我探索",
      cover: "assets/books/wangkuaikuai/cover.jpg",
      pages: [
        "assets/books/wangkuaikuai/1.jpg",
        "assets/books/wangkuaikuai/2.jpg",
        "assets/books/wangkuaikuai/3.jpg",
        "assets/books/wangkuaikuai/4.jpg",
        "assets/books/wangkuaikuai/5.jpg",
        "assets/books/wangkuaikuai/6.jpg",
        "assets/books/wangkuaikuai/7.jpg",
        "assets/books/wangkuaikuai/8.jpg",
        "assets/books/wangkuaikuai/10.jpg"
      ],
      desc: ""
    }
  ]
};

# 个人作品集网站（MIA-WANG’S PORTFOLIO）

一个用于面试展示的个人作品集网站：顶部是 Banner 图、**MIA-WANG’S PORTFOLIO** Logo 和一行自我介绍，
下方是七个一级菜单：**AI早教动画 / 活动 / 绘本 / 实拍视频 / 其他 / About / Contact**——
点击菜单会**直接切换**成对应分类的内容（不是向下滚动），一次只显示一个分类。
About（关于我）和 Contact（联系）也通过菜单切换查看，放在五个作品分类后面。

五个分类的排版分别是：**AI早教动画**（海报平铺，悬停时海报虚化、简介从下方浮现）、
**活动**（Pinterest 瀑布流，所有照片完整可见、点击放大）、**绘本**（带书脊厚度的小书，
悬停轻微上浮，点击封面进入翻书阅读器）、**实拍视频**（海报平铺，悬停显示观看入口）、
**其他**（无标题的 Pinterest 瀑布流，图片和视频混排）。动画和视频都外链到B站。

页面采用 `js/design-tokens.js` 里的设计语言：纯白背景、黑灰文字层级、高留白、精致小字、自然缓动。想调整配色或字号，改 `css/style.css` 顶部的 CSS 变量即可（和 design-tokens 一一对应）。

## 文件结构

```
portfolio-site/
├── index.html       # 页面结构（一般不用改）
├── css/style.css    # 样式和配色（想调颜色改最上面的变量）
├── js/
│   ├── design-tokens.js # ★ 设计语言规范（配色/字体/间距/动效）
│   ├── works.js     # ★ 所有文字和作品数据都在这里改
│   └── main.js      # 渲染逻辑（一般不用改）
└── assets/          # 放你自己的图片（可以新建这个文件夹）
    ├── design/      # 网站设计素材：banner 裁剪图等
    ├── activities/  # 活动照片
    ├── videos/      # 视频封面
    ├── books/       # 绘本（每本一个文件夹）
    └── others/      # “其他”分类的图片和视频
```

## 第一步：改成你的信息

打开 `js/works.js`，把 `SITE` 里的内容替换成你的真实信息：

- `name` / `englishName`：你的名字
- `role` / `tagline`：你的职位描述和一句话标语
- `aboutTitle` / `aboutParagraphs`：关于我的文字介绍
- `contact`：邮箱、微信

> 编辑建议：用 VS Code 等现代编辑器打开（文件已经是 UTF-8 编码，带 BOM 标记，
> 记事本等老软件也能正常显示中文）。编辑保存时请保持 UTF-8 编码，不要转成 ANSI/GBK。

## 第二步：添加 / 修改作品

所有作品都在 `js/works.js` 的 `WORKS` 里，每个分类是一个数组，**每条作品就是一行对象**。

### 活动（照片，不分活动分组）

活动照片**自动读取** `assets/activities/` 文件夹里的
`1/ 2/ 3/ 4/` 四个子文件夹（每个文件夹第一张 `01.jpg` 是"车"），
页面按 01-04 四个分组展示。想增删照片：把图放进对应子文件夹（从 01.jpg 编号），
并同步修改 `works.js` 里对应组的 `length` 数字。照片用瀑布流平铺，
全部完整可见不重叠，鼠标移上去轻微放大，点击可以放大查看。

### 菜单气泡文字介绍

五个分类各自有一段文字介绍，放在 `js/works.js` 的 `WORKS.tips` 里，
鼠标移到顶部菜单时会显示在红色描边气泡里（About / Contact 不显示气泡）。

### AI早教动画 / 实拍视频（外链B站）

```js
{ title: "《麦麦的小镜子》", url: "https://www.bilibili.com/video/BVxxxxxx", thumbnail: "assets/videos/麦麦的小镜子.jpg", desc: "一句话简介" }
```

把 `url` 换成你的B站视频链接。`thumbnail` 填封面：可以填本地图片路径
（例如 `assets/videos/封面名.jpg`），也可以直接填B站封面链接；不填则显示手绘占位封面。
`desc` 填一句话简介：海报平时只显示画面，鼠标悬停时海报虚化、浮现简介，点击跳转B站。

### 绘本（现在有 6 本）

```js
{
  title: "麦麦找妈妈",
  tag: "原创绘本",
  cover: "assets/books/maimai/cover.jpg",
  pages: [
    "assets/books/maimai/1.jpg",
    "assets/books/maimai/2.jpg",
    ...
  ],
  desc: "一句话简介"
}
```

`cover` 填封面图路径；`tag` 可以改成“合作出版”等标签。

**填了 `pages` 的绘本会自动变成一本可以翻页的书**：点击卡片会弹出阅读器，
封面、内页一页一页地全屏翻动（没有空白对页），支持点书页左右两侧、按钮或 ← → 方向键翻页。

添加一本新绘本的步骤：

1. 在 `assets/books/` 下新建一个文件夹（例如 `assets/books/my-book/`）
2. 把封面命名为 `cover.jpg`，内页按 `1.jpg`、`2.jpg`、`3.jpg`… 命名，按阅读顺序排列
3. 在 `works.js` 的 `pictureBooks` 里添加一条数据，`cover` 和 `pages` 填对应路径

> 图片比例建议用 3:4 竖版（现在的页面就是这样），网站会自动裁切适配。
> 封面和内页图片会自动加载进翻书阅读器，页面会等图片读好再展示，不会闪图。

> 增删作品只需复制或删除对象行，页面会自动适应。

### 其他（图片和视频混放）

```js
{ title: "小作品 01", kind: "image", src: "assets/others/xxx.jpg", desc: "" }
{ title: "小视频 01", kind: "video", url: "https://www.bilibili.com/video/BVxxxx", desc: "" }
```

图片（`kind: "image"`）点击可以放大（不显示文字介绍）；视频（`kind: "video"`）直接内嵌播放。
这个分类不显示任何标题文字，图片和视频像 Pinterest 一样瀑布流排列。
图片**自动读取** `assets/others/img-01.jpg` ～ `img-25.jpg`（改 `works.js` 里的 `length: 25` 即可增删）。

## 本地预览

直接双击 `index.html` 就能看。如果图片或动画没显示，可以用本地服务器打开（在 `portfolio-site` 文件夹里运行）：

```bash
python3 -m http.server 8000
```

然后浏览器打开 `http://localhost:8000`。

## 发布上线

最省事的方式是托管到 **GitHub Pages** 或 **Vercel / Netlify**：把整个 `portfolio-site` 文件夹推上去即可，不需要任何服务器配置。

## 面试前的小提醒

- 把占位文案（“你的名字”“活动标题”等）全部换成真实内容
- B站链接改成可正常打开的视频
- 图片建议用横版（活动/视频约 16:10，绘本封面约 3:4），会自动裁切适配

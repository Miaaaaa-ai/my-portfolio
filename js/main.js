/* ============================================================
   页面渲染脚本：把 works.js 里的数据变成漂亮的卡片
   一般情况下不需要修改这个文件，改作品请在 works.js 里改
   ============================================================ */

(() => {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  /* ---------- 主题色轮换（占位封面用） ---------- */
  const THEMES = ["coral", "pink", "blue", "mint", "yellow", "purple"];
  const themeFor = (i) => THEMES[i % THEMES.length];

  /* ---------- 手绘小图标 ---------- */
  const ICONS = {
    activities: '<svg viewBox="0 0 40 40"><path d="M8 34V10l22 5" fill="none" stroke="#46392f" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="34" r="4.5" fill="#ffd166" stroke="#46392f" stroke-width="2.6"/><circle cx="30" cy="15" r="4.5" fill="#ff9fb8" stroke="#46392f" stroke-width="2.6"/><path d="M30 19l-2 12" stroke="#46392f" stroke-width="3.2" stroke-linecap="round"/></svg>',
    animations: '<svg viewBox="0 0 40 40"><rect x="5" y="8" width="30" height="22" rx="4" fill="#ddf0fa" stroke="#46392f" stroke-width="2.8"/><path d="M11 8L27 19l-16 11z" fill="#ff8a5c" stroke="#46392f" stroke-width="2.8" stroke-linejoin="round"/><path d="M6 30h28" stroke="#46392f" stroke-width="2.8" stroke-linecap="round"/></svg>',
    videos: '<svg viewBox="0 0 40 40"><rect x="4" y="12" width="22" height="16" rx="4" fill="#ffe5ec" stroke="#46392f" stroke-width="2.8"/><path d="M26 17l10-5v16l-10-5z" fill="#a8d8b9" stroke="#46392f" stroke-width="2.8" stroke-linejoin="round"/><circle cx="9" cy="20" r="2" fill="#46392f"/><circle cx="14" cy="20" r="2" fill="#46392f"/><circle cx="19" cy="20" r="2" fill="#46392f"/></svg>',
    books: '<svg viewBox="0 0 40 40"><path d="M6 10c5-2 11-2 14 2v20c-3-4-9-4-14-2z" fill="#ffd166" stroke="#46392f" stroke-width="2.8" stroke-linejoin="round"/><path d="M34 10c-5-2-11-2-14 2v20c3-4 9-4 14-2z" fill="#a8d8b9" stroke="#46392f" stroke-width="2.8" stroke-linejoin="round"/></svg>',
    others: '<svg viewBox="0 0 40 40"><rect x="7" y="7" width="26" height="26" rx="5" fill="none" stroke="#46392f" stroke-width="2.8" stroke-linejoin="round"/><circle cx="16" cy="16" r="4" fill="#ffd166" stroke="#46392f" stroke-width="2.4"/><circle cx="26" cy="24" r="5" fill="#ff9fb8" stroke="#46392f" stroke-width="2.4"/><path d="M12 31l8-9 6 6 4-5" fill="none" stroke="#46392f" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* 蜡笔涂鸦：一圈圈粗糙的圆 + 一小段笔触 */
  const crayonDoodle = (cx, cy, r) => {
    const ring = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const rr = r * (0.72 + 0.28 * Math.abs(Math.sin(i * 2.3)));
      ring.push(`${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`);
    }
    return `
      <path d="M${ring.join(" L")} Z" fill="none" stroke="#46392f" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".75"/>
      <path d="M${(cx - r * 0.32).toFixed(1)} ${(cy + r * 0.28).toFixed(1)} q${(r * 0.3).toFixed(1)} ${(-r * 0.5).toFixed(1)} ${(r * 0.64).toFixed(1)} 0" fill="none" stroke="#46392f" stroke-width="2" stroke-linecap="round" opacity=".5"/>`;
  };

  /* ---------- 工具函数 ---------- */
  const esc = (str = "") =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const groupTitle = (key) =>
    ({ activities: "活动", animations: "AI早教动画", books: "绘本", videos: "实拍视频", others: "其他" }[key]);

  /* ---------- 填充基本信息 ---------- */
  function fillSiteInfo() {
    document.title = `${SITE.name} · 儿童内容创作作品集`;
    $("#heroRole").textContent = SITE.role;
    $("#heroTagline").textContent = SITE.tagline;

    $("#footerName").textContent = SITE.name;
    $("#footerYear").textContent = new Date().getFullYear();
  }

  /* ---------- 占位媒体（没有图片时显示） ---------- */
  function mediaPlaceholder({ kind, i, wrap = "work-media" }) {
    const theme = themeFor(i);
    if (kind === "activity") {
      return `
        <div class="${wrap} ph ph-${theme}">
          <svg viewBox="0 0 80 80" aria-hidden="true">
            <circle cx="40" cy="40" r="28" fill="#ffffff" stroke="#46392f" stroke-width="3"/>
            <circle cx="32" cy="33" r="6" fill="#ffd166" stroke="#46392f" stroke-width="2.4"/>
            <circle cx="48" cy="33" r="6" fill="#ff9fb8" stroke="#46392f" stroke-width="2.4"/>
            <circle cx="40" cy="33" r="6" fill="#a8d8b9" stroke="#46392f" stroke-width="2.4"/>
            <path d="M30 46c4 5 16 5 20 0" fill="none" stroke="#46392f" stroke-width="2.6" stroke-linecap="round"/>
          </svg>
          <span class="ph-text">活动照片占位</span>
        </div>`;
    }
    return `
      <div class="${wrap} ph ph-${theme}">
        <svg class="ph-play" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="17" fill="#ffffff" stroke="#46392f" stroke-width="3"/>
          <path d="M16 12l12 8-12 8z" fill="#ff8a5c" stroke="#46392f" stroke-width="2.6" stroke-linejoin="round"/>
        </svg>
        <span class="ph-text">视频封面占位</span>
      </div>`;
  }

  /* ---------- 活动：按 1-4 分组，每组瀑布流平铺，点击放大 ---------- */
  function activitiesView() {
    return WORKS.activities.map((group) => `
      <div class="activity-group">
        <div class="activity-group-head">
          <h3 class="activity-group-title">${esc(group.title)}</h3>
          ${group.links && group.links.length ? `
          <div class="activity-links">
            ${group.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}
          </div>` : ""}
        </div>
        <div class="activity-grid">
          ${group.photos.map((src, i) => `
            <figure class="activity-photo">
              <img src="${esc(src)}" alt="${esc(`${group.title} 活动照片 ${i + 1}`)}" loading="lazy">
            </figure>`).join("")}
        </div>
      </div>`).join("");
  }

  /* ---------- 其他：图片 / 视频混排 ---------- */
  function otherCard(item, i) {
    if (item.kind === "video") {
      const media = item.src
        ? `<video src="${esc(item.src)}" controls preload="metadata"></video>`
        : `<div class="ph ph-${themeFor(i)}">
            <svg class="ph-play" viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="17" fill="#ffffff" stroke="#46392f" stroke-width="3"/>
              <path d="M16 12l12 8-12 8z" fill="#ff8a5c" stroke="#46392f" stroke-width="2.6" stroke-linejoin="round"/>
            </svg>
            <span class="ph-text">视频占位</span>
          </div>`;
      return `
        <article class="other-card reveal-b">
          ${media}
        </article>`;
    }
    return `
      <figure class="other-card other-photo reveal-c" data-full="${esc(item.src)}">
        <img src="${esc(item.src)}" alt="${esc(item.title)}" loading="lazy">
      </figure>`;
  }

  function othersEmptyHTML() {
    return `
      <div class="others-empty reveal-c">
        <svg viewBox="0 0 120 90" aria-hidden="true">
          ${crayonDoodle(60, 32, 18)}
          <path d="M26 68 Q 45 54 64 68 T 100 68" fill="none" stroke="#ff9fb8" stroke-width="6" stroke-linecap="round"/>
        </svg>
        <p>这里还空着，等新的小作品入驻 ✨</p>
        <span>图片和视频都可以放进来</span>
      </div>`;
  }

  /* ---------- AI早教动画：只有海报，悬停虚化显现简介 ---------- */
  function videoCard(item, i, kind) {
    if (kind === "animation") {
      const media = item.thumbnail
        ? `<img src="${esc(item.thumbnail)}" alt="${esc(item.title)}" loading="lazy">`
        : mediaPlaceholder({ kind: "video", i });
      const intro = item.desc
        ? `<p class="anim-overlay-desc">${esc(item.desc)}</p>`
        : `<p class="anim-overlay-desc">点击前往 B站 观看完整内容</p>`;
      return `
        <a class="anim-card reveal" href="${esc(item.url)}" target="_blank" rel="noopener" aria-label="${esc(item.title)}">
          ${media}
          <span class="anim-overlay">
            ${intro}
            <span class="anim-overlay-link">在 B站 观看 ↗</span>
          </span>
        </a>`;
    }

    /* 实拍视频：海报平铺，悬停显示标题与观看入口 */
    const media = item.thumbnail
      ? `<img src="${esc(item.thumbnail)}" alt="${esc(item.title)}" loading="lazy">`
      : mediaPlaceholder({ kind: "video", i });
    return `
      <a class="video-card reveal-b" href="${esc(item.url)}" target="_blank" rel="noopener">
        <span class="video-card-media">
          ${media}
          <span class="video-card-hover">
            <span class="video-card-play">▶</span>
            <span class="video-card-bili">在 B站 观看 ↗</span>
          </span>
        </span>
        <span class="video-card-title">${esc(item.title)}</span>
      </a>`;
  }

  /* ---------- 绘本：向右倾斜的小书，悬停见厚度并轻微翻页 ---------- */
  const SPARKS = [
    { type: "star", sc: "#F2C14E", sx: -95, sy: -130, sd: "0s" },
    { type: "star", sc: "#C02020", sx: 112, sy: -110, sd: "0.2s" },
    { type: "bar", sc: "#7FB5D6", sx: -145, sy: -28, sd: "0.4s" },
    { type: "bar", sc: "#9CCB8E", sx: 150, sy: -14, sd: "0.1s" },
    { type: "star", sc: "#F2A0B0", sx: -72, sy: 115, sd: "0.3s" },
    { type: "bar", sc: "#F29B5C", sx: 88, sy: 128, sd: "0.5s" }
  ];

  function bookCard(item, i) {
    const theme = themeFor(i);
    const hasFlip = Array.isArray(item.pages) && item.pages.length > 0;
    const cover = item.cover
      ? `<div class="book-cover"><img src="${esc(item.cover)}" alt="${esc(item.title)}" loading="lazy"><span class="book-tag">${esc(item.tag || "绘本")}</span></div>`
      : `
        <div class="book-cover ph-cover ph-${theme}">
          <svg class="cover-doodles" viewBox="0 0 160 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            ${crayonDoodle(44, 48, 24)}
            ${crayonDoodle(112, 92, 15)}
            ${crayonDoodle(58, 134, 20)}
          </svg>
          <span class="book-tag">${esc(item.tag || "绘本")}</span>
          <span class="book-title">${esc(item.title)}</span>
          <span class="cover-hint">封面占位</span>
        </div>`;
    const tilt = i % 2 === 0 ? "7deg" : "-6deg";
    const sparks = SPARKS.map((s, k) => `
      <i class="spark ${s.type}" style="--sc:${s.sc};--sx:${s.sx}px;--sy:${s.sy}px;--sd:${s.sd}"></i>`).join("");
    return `
      <article class="book-card${hasFlip ? " has-flip" : ""}" style="--bk-tilt:${tilt}" ${hasFlip ? `data-book="${i}"` : ""}>
        ${cover}
        ${sparks}
        <div class="book-body">
          <h4>${esc(item.title)}</h4>
          ${item.desc ? `<p>${esc(item.desc)}</p>` : ""}
        </div>
      </article>`;
  }

  /* ---------- 关于 / 联系 视图 ---------- */
  function aboutView() {
    return `
      <div class="text-view about-view">
        <h2 class="text-view-title">About</h2>
        <h3>${esc(SITE.aboutTitle)}</h3>
        ${SITE.aboutParagraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
      </div>`;
  }

  function contactView() {
    const email = SITE.contact.email;
    return `
      <div class="text-view contact-view">
        <h2 class="text-view-title">Contact</h2>
        <ul class="contact-list">
          <li class="contact-item">
            <span class="contact-label">邮箱</span>
            <a class="contact-value" href="mailto:${esc(email)}">${esc(email)}</a>
          </li>
          <li class="contact-item">
            <span class="contact-label">微信</span>
            <span class="contact-value">${esc(SITE.contact.wechat)}</span>
          </li>
        </ul>
      </div>`;
  }

  /* ---------- 视图注册表：一级菜单点击切换，每次只显示一个分类 ---------- */
  const VIEWS = {
    animations: { items: () => WORKS.aiAnimations, build: (it, i) => videoCard(it, i, "animation"), layout: "animations" },
    activities: { render: activitiesView, layout: "activities" },
    books: { items: () => WORKS.pictureBooks, build: bookCard, layout: "books" },
    videos: { items: () => WORKS.liveVideos, build: (it, i) => videoCard(it, i, "video"), layout: "videos" },
    others: { items: () => WORKS.others, build: otherCard, layout: "others" },
    about: { render: aboutView, layout: "about" },
    contact: { render: contactView, layout: "contact" }
  };

  function renderView(key) {
    const root = $("#worksRoot");
    const view = VIEWS[key];
    if (!root || !view) return;
    if (view.render) {
      root.innerHTML = `<section class="works-view view-${view.layout}" id="view-${key}">${view.render()}</section>`;
    } else {
      const items = view.items();
      root.innerHTML = `
        <section class="works-view view-${view.layout}" id="view-${key}">
          ${items.length ? items.map(view.build).join("") : othersEmptyHTML()}
        </section>`;
    }
    initReveal();
  }

  function initViewSwitch() {
    document.querySelectorAll(".site-nav button").forEach((btn) => {
      const tip = WORKS.tips[btn.dataset.view];
      if (tip) btn.dataset.tip = tip;
      btn.addEventListener("click", () => {
        document.querySelectorAll(".site-nav button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderView(btn.dataset.view);
        const worksTop = $("#worksRoot").getBoundingClientRect().top + window.scrollY - 16;
        window.scrollTo({ top: Math.max(0, worksTop), behavior: "smooth" });
      });
    });
  }

  /* ===================== 绘本单页翻书阅读器 ===================== */
  const bookModal = $("#bookModal");
  const bookFrame = $("#bookFrame");
  const bookStage = $("#bookStage");
  const bookTitleEl = $("#bookModalTitle");
  const bookLoadingEl = $("#bookLoading");
  const bookPageNumEl = $("#bookPageNum");

  let reader = null;
  let flipping = false;

  const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const endPageHTML = `
    <div class="cover-end">
      <svg viewBox="0 0 120 120" aria-hidden="true">${crayonDoodle(60, 38, 24)}</svg>
      <span class="cover-end-title">完</span>
      <span class="cover-end-sub">谢谢阅读 ♥</span>
    </div>`;

  function preloadImages(srcs) {
    return Promise.all(
      srcs.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = img.onerror = resolve;
            img.src = src;
          })
      )
    );
  }

  function setPageContent(layer, page) {
    layer.innerHTML = page.img ? `<img src="${esc(page.img)}" alt="" draggable="false">` : page.html;
  }

  function buildReader(book) {
    bookStage.innerHTML = "";
    const layerA = document.createElement("div");
    const layerB = document.createElement("div");
    layerA.className = "reader-page";
    layerB.className = "reader-page";
    bookStage.append(layerB, layerA);

    const pages = [
      { img: book.cover },
      ...(book.pages || []).map((src) => ({ img: src })),
      { html: endPageHTML }
    ];

    setPageContent(layerA, pages[0]);
    layerB.style.display = "none";
    layerA.style.zIndex = "2";
    reader = { pages, idx: 0, layerA, layerB, cur: layerA, timer: null };
    flipping = false;
    updateReaderLabel();
  }

  function afterReaderFlip(el, cb) {
    const done = () => {
      clearTimeout(reader?.timer);
      cb();
    };
    const onEnd = (e) => {
      if (e.propertyName === "transform") {
        el.removeEventListener("transitionend", onEnd);
        done();
      }
    };
    el.addEventListener("transitionend", onEnd);
    reader.timer = setTimeout(done, 1000 + 180);
  }

  function readerNext() {
    const r = reader;
    if (!r || flipping || r.idx >= r.pages.length - 1) return;
    flipping = true;
    const cur = r.cur;
    const other = cur === r.layerA ? r.layerB : r.layerA;
    setPageContent(other, r.pages[r.idx + 1]);
    other.style.display = "";
    other.style.zIndex = "1";
    other.style.transform = "rotateY(0deg)";
    cur.style.zIndex = "3";
    const finish = () => {
      if (!reader) return;
      cur.style.display = "none";
      cur.style.transform = "rotateY(0deg)";
      r.cur = other;
      other.style.zIndex = "2";
      r.idx++;
      flipping = false;
      updateReaderLabel();
    };
    if (reducedMotion()) {
      cur.style.transform = "rotateY(-180deg)";
      finish();
      return;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      cur.style.transform = "rotateY(-180deg)";
    }));
    afterReaderFlip(cur, finish);
  }

  function readerPrev() {
    const r = reader;
    if (!r || flipping || r.idx <= 0) return;
    flipping = true;
    const cur = r.cur;
    const other = cur === r.layerA ? r.layerB : r.layerA;
    setPageContent(other, r.pages[r.idx - 1]);
    other.style.display = "";
    other.style.zIndex = "3";
    other.style.transition = "none";
    other.style.transform = "rotateY(-180deg)";
    void other.offsetWidth; // 强制重排，让起始状态先生效
    other.style.transition = "";
    const finish = () => {
      if (!reader) return;
      cur.style.display = "none";
      r.cur = other;
      other.style.zIndex = "2";
      r.idx--;
      flipping = false;
      updateReaderLabel();
    };
    if (reducedMotion()) {
      other.style.transform = "rotateY(0deg)";
      finish();
      return;
    }
    requestAnimationFrame(() => {
      other.style.transform = "rotateY(0deg)";
    });
    afterReaderFlip(other, finish);
  }

  function updateReaderLabel() {
    const r = reader;
    if (!r) return;
    const { idx, pages } = r;
    const pageCount = pages.length - 2;
    let label;
    if (idx === 0) label = "封面";
    else if (idx === pages.length - 1) label = "完";
    else label = `第 ${idx} 页`;
    bookPageNumEl.textContent = `${label}　共 ${pageCount} 页`;
  }

  function openBook(book) {
    bookModal.classList.add("open");
    bookModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    bookTitleEl.textContent = book.title;
    bookLoadingEl.style.display = "block";
    bookFrame.style.display = "none";
    preloadImages([book.cover, ...(book.pages || [])]).then(() => {
      buildReader(book);
      bookLoadingEl.style.display = "none";
      bookFrame.style.display = "block";
    });
  }

  function closeBook() {
    if (!bookModal.classList.contains("open")) return;
    bookModal.classList.remove("open");
    bookModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (reader?.timer) clearTimeout(reader.timer);
    reader = null;
    flipping = false;
    bookStage.innerHTML = "";
  }

  function initBookModal() {
    $("#bookNext").addEventListener("click", readerNext);
    $("#bookPrev").addEventListener("click", readerPrev);
    document.querySelectorAll("[data-book-close]").forEach((el) => el.addEventListener("click", closeBook));
    bookFrame.addEventListener("click", (e) => {
      const rect = bookStage.getBoundingClientRect();
      if (rect.width === 0) return;
      if (e.clientX - rect.left < rect.width / 2) readerPrev();
      else readerNext();
    });
    document.addEventListener("keydown", (e) => {
      if (!bookModal.classList.contains("open")) return;
      if (e.key === "Escape") closeBook();
      else if (e.key === "ArrowRight") readerNext();
      else if (e.key === "ArrowLeft") readerPrev();
    });
    $("#worksRoot").addEventListener("click", (e) => {
      const card = e.target.closest(".book-card[data-book]");
      if (!card) return;
      const book = WORKS.pictureBooks[Number(card.dataset.book)];
      if (book && Array.isArray(book.pages) && book.pages.length) openBook(book);
    });
  }

  /* ===================== 图片放大灯箱 ===================== */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const lightboxCaption = $("#lightboxCaption");

  function openLightbox(src, caption) {
    if (!src) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeLightbox() {
    if (!lightbox.classList.contains("open")) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lightboxImg.src = "";
  }

  function initLightbox() {
    document.addEventListener("click", (e) => {
      const fig = e.target.closest("[data-full]");
      if (fig) {
        openLightbox(fig.dataset.full, fig.dataset.caption);
        return;
      }
      if (e.target.closest("[data-lightbox-close]")) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }

  /* ---------- 滚动显现动画 ---------- */
  function initReveal() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    $$(".reveal, .reveal-a, .reveal-b, .reveal-c").forEach((el) => io.observe(el));
  }

  /* ---------- 平滑锚点滚动（兼容固定导航） ---------- */
  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        try { history.replaceState(null, "", a.getAttribute("href")); } catch {}
      }
    });
  }

  fillSiteInfo();
  renderView("animations");
  initViewSwitch();
  initSmoothScroll();
  initBookModal();
  initLightbox();

  /* 暴露给测试/调试使用 */
  window.renderWorksView = renderView;
})();

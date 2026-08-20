// design-tokens.js - 个人作品集设计语言配置文件
const DESIGN_TOKENS = {
  // 1. Color System (配色系统：高冷、纯粹、沉浸)
  colors: {
    bgPrimary: "#FFFFFF",        // 纯白背景，突出作品色彩
    textPrimary: "#111111",      // 极深灰/接近纯黑，保持高对比度与典雅感
    textSecondary: "#767676",    // 辅助/次要文字（如分类、日期、版权）
    borderLight: "#EEEEEE",      // 极轻淡的分隔线，绝不抢占视觉焦点
    accent: "#000000",           // 强调色/Hover态
    overlayBg: "rgba(255, 255, 255, 0.95)", // 弹窗/移动端菜单半透明背景
  },

  // 2. Typography & Hierarchy (字体与字号层级：极简现代、高定感)
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
      serif: '"Times New Roman", Times, "Songti SC", serif', // 局部点缀使用，增强艺术感
      mono: '"SF Mono", "Courier New", monospace',             // 可用于数字编号或分类标签
    },
    sizes: {
      heroTitle: "clamp(2rem, 5vw, 4rem)",    // 自适应巨大标题（用于 About 或 Home 核心标语）
      sectionTitle: "1.25rem",               // 20px - 一级菜单 / 章节标题
      navLink: "0.9375rem",                  // 15px - 导航菜单文字（About / Works / Contact）
      bodyText: "0.875rem",                  // 14px - 正文说明，保持精细感
      caption: "0.75rem",                    // 12px - 作品分类/年份/角标
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 600,
    },
    lineHeights: {
      tight: 1.1,
      normal: 1.5,
      relaxed: 1.8,                          // 大段文字使用高行高，增加呼吸感
    },
    letterSpacing: {
      tight: "-0.02em",
      normal: "0",
      wide: "0.05em",                        // 导航与大写英文使用宽字间距
      extraWide: "0.1em",                    // 小号标签居中显示时使用
    }
  },

  // 3. Spacing & Layout (间距与布局：高留白、非对称呼吸感)
  spacing: {
    pagePadding: "clamp(20px, 4vw, 60px)",   // 页面四周外边距
    gridGap: "clamp(16px, 2.5vw, 40px)",    // 瀑布流/网格间距
    sectionMargin: "120px",                  // 大模块之间的纵向巨额留白
    elementGap: "16px",                      // 紧凑元素间距
  },

  // 4. Motion & Transitions (动效与微交互：平滑、非线性、低调)
  motion: {
    duration: {
      fast: "0.2s",
      normal: "0.4s",
      slow: "0.8s",
      page: "1.2s",
    },
    easing: {
      // 关键：苹果/高端网站常用的自然缓动曲线 (Bezier Curve)
      smooth: "cubic-bezier(0.25, 1, 0.5, 1)",
      bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      fade: "cubic-bezier(0.4, 0, 0.2, 1)",
    }
  }
};

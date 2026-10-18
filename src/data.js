export const navItems = [
  { id: 'home', index: '00', label: '首页' },
  { id: 'about', index: '01', label: '经历' },
  { id: 'work', index: '02', label: '项目' },
  { id: 'capabilities', index: '03', label: '能力' },
  { id: 'contact', index: '04', label: '联系' },
]

export function mediaUrl(path) {
  if (!path || /^https?:\/\//.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

export const profileStats = [
  { value: '80%', label: '重点展区周销量提升', note: 'RETAIL IMPACT' },
  { value: '30+', label: '单支广告镜头执行', note: 'ON ONE FILM' },
  { value: '25+', label: '校园新媒体内容', note: 'CONTENT PIECES' },
  { value: '06', label: '活动影像拍摄', note: 'LIVE COVERAGE' },
]

export const experience = [
  {
    period: '2026.06 — 09',
    place: '上海博物馆文化创意有限公司',
    role: '文创 / 商品运营实习生',
    note: 'AIGC 海报 · 快闪陈列 · 用户调研',
  },
  {
    period: '2024.09 — 2026.06',
    place: '数字传媒学院 · 宣传部',
    role: '新媒体内容成员',
    note: '推文视觉 · 活动海报 · 现场影像',
  },
  {
    period: '2023.09 — 2027.06',
    place: '景德镇艺术职业大学',
    role: '数字媒体艺术 · 本科',
    note: '影视后期 · 交互设计 · AIGC 应用',
  },
]

export const projectFilters = [
  { id: 'all', label: '全部作品', en: 'ALL', count: '06' },
  { id: 'aigc', label: 'AIGC 影像', en: 'AIGC', count: '04' },
  { id: 'interactive', label: '实时交互', en: 'INTERACTIVE', count: '01' },
  { id: 'film', label: '情景短片', en: 'FILM', count: '01' },
]

const projectData = [
  {
    id: 'coffee-film',
    index: '01',
    category: 'aigc',
    categoryLabel: 'AIGC 影像',
    title: '从种子到一杯',
    subtitle: 'AIGC COMMERCIAL FILM / EDIT',
    year: '2026',
    size: 'wide',
    image: '/media/projects/aigc-coffee-cover.webp',
    video: '/media/projects/aigc-coffee-preview.webm',
    previewLabel: '6 秒无声预览 · 原片 00:46',
    downloadUrl:
      'https://github.com/lxy539182-code/ai-1-hero-2-3-4-2/releases/download/portfolio-films-v1/coffee-film.mp4',
    downloadDuration: '00:46',
    downloadSize: '37.2 MB',
    downloadName: '李鑫宇_从种子到一杯_完整成片.mp4',
    alt: '烘焙空间内漂浮的咖啡豆与咖啡设备',
    roles: ['AIGC 影像', '分镜生成', '剪辑 / 合成'],
    tools: ['AIGC 分镜', 'LiblibAI', '剪映'],
    excerpt:
      '从咖啡果、烘焙到萃取，以一颗种子的旅程串联完整的咖啡广告叙事。',
    description:
      '围绕“一杯咖啡走过的路”建立叙事线索，将产地、烘焙与萃取的场景通过 AIGC 分镜生成，再用剪辑、字幕与声音把不同镜头组织成完整商业短片。',
    metrics: [
      { value: '00:46', label: '完整成片' },
      { value: '16:9', label: '成片画幅' },
      { value: 'AIGC', label: '影像生成' },
    ],
    gallery: [
      {
        src: '/media/projects/aigc-coffee-still-01.webp',
        label: 'TEXTURE / POUR',
        alt: '咖啡液从摩卡壶流入玻璃杯的特写',
      },
      {
        src: '/media/projects/aigc-coffee-still-02.webp',
        label: 'ORIGIN / COFFEE',
        alt: '咖啡果实与山间种植园画面',
      },
      {
        src: '/media/projects/aigc-coffee-workflow.webp',
        label: 'LIBTV WORKFLOW',
        alt: '咖啡广告的 LiblibAI 生成工作流',
      },
      {
        src: '/media/projects/aigc-coffee-edit.webp',
        label: 'EDIT TIMELINE',
        alt: '咖啡广告在剪映中的时间线',
      },
    ],
  },
  {
    id: 'neon-fight',
    index: '02',
    category: 'aigc',
    categoryLabel: 'AIGC 影像',
    title: '霓虹雨巷',
    subtitle: 'AIGC ACTION FILM / SEQUENCE',
    year: '2026',
    size: 'narrow',
    image: '/media/projects/aigc-fight-cover.webp',
    video: '/media/projects/aigc-fight-preview.webm',
    previewLabel: '6 秒无声预览 · 原片 00:28',
    downloadUrl:
      'https://github.com/lxy539182-code/ai-1-hero-2-3-4-2/releases/download/portfolio-films-v1/neon-fight.mp4',
    downloadDuration: '00:28',
    downloadSize: '24.0 MB',
    downloadName: '李鑫宇_霓虹雨巷_完整成片.mp4',
    alt: '赛博朋克雨夜巷道中的双人战斗',
    roles: ['视觉生成', '动作分镜', '剪辑 / 音效'],
    tools: ['AIGC 分镜', 'LiblibAI', '剪映'],
    excerpt:
      '赛博朋克雨夜中的双人近身战，以镜头衔接和动作节奏组织 28 秒连续冲突。',
    description:
      '围绕角色、雨夜巷道与动作关系设计分镜，用 AIGC 生成连续画面，再通过变速、转场、颗粒和音效强化打击感，让每个镜头都服务于动作方向与情绪推进。',
    metrics: [
      { value: '00:28', label: '完整成片' },
      { value: '16:9', label: '成片画幅' },
      { value: 'AIGC', label: '动作影像' },
    ],
    gallery: [
      {
        src: '/media/projects/aigc-fight-still-01.webp',
        label: 'CHARACTER / CLOSE',
        alt: '赛博朋克女性角色的近景画面',
      },
      {
        src: '/media/projects/aigc-fight-still-02.webp',
        label: 'ACTION / CONTACT',
        alt: '赛博朋克打斗中的近身动作画面',
      },
      {
        src: '/media/projects/aigc-fight-workflow.webp',
        label: 'LIBTV WORKFLOW',
        alt: '赛博朋克打斗的 LiblibAI 生成工作流',
      },
      {
        src: '/media/projects/aigc-fight-edit.webp',
        label: 'EDIT TIMELINE',
        alt: '赛博朋克打斗在剪映中的时间线',
      },
    ],
  },
  {
    id: 'moka-extraction',
    index: '03',
    category: 'aigc',
    categoryLabel: 'AIGC 影像',
    title: '摩卡壶 / 萃取时刻',
    subtitle: 'AIGC PRODUCT FILM / MACRO',
    year: '2026',
    size: 'narrow',
    image: '/media/projects/aigc-moka-cover.webp',
    video: '/media/projects/aigc-moka-preview.webm',
    previewLabel: '6 秒无声预览 · 原片 00:39',
    downloadUrl:
      'https://github.com/lxy539182-code/ai-1-hero-2-3-4-2/releases/download/portfolio-films-v1/moka-extraction.mp4',
    downloadDuration: '00:39',
    downloadSize: '38.4 MB',
    downloadName: '李鑫宇_摩卡壶_萃取时刻_完整成片.mp4',
    alt: '摩卡壶中翻涌的咖啡液与油脂特写',
    roles: ['AIGC 影像', '产品特写', '剪辑 / 调色'],
    tools: ['AIGC 影像', 'LiblibAI', '画布工作流'],
    excerpt:
      '把镜头贴近金属、水流与咖啡油脂，以微距细节放大一只摩卡壶的萃取过程。',
    description:
      '将产品广告集中在材质与水汽细节：注水、组装、咖啡液涌出和油脂气泡通过 AIGC 画面生成，再以近景节奏与声音设计建立产品质感。',
    metrics: [
      { value: '00:39', label: '完整成片' },
      { value: 'MACRO', label: '产品视角' },
      { value: 'AIGC', label: '影像生成' },
    ],
    gallery: [
      {
        src: '/media/projects/aigc-moka-still-01.webp',
        label: 'WATER / DETAIL',
        alt: '水流注入摩卡壶底座的微距画面',
      },
      {
        src: '/media/projects/aigc-moka-still-02.webp',
        label: 'PRODUCT / FORM',
        alt: '摩卡壶组装时的产品特写',
      },
      {
        src: '/media/projects/aigc-moka-workflow.webp',
        label: 'CANVAS WORKFLOW',
        alt: '摩卡壶 AIGC 视频的节点画布工作流',
      },
    ],
  },
  {
    id: 'blank-story',
    index: '04',
    category: 'aigc',
    categoryLabel: 'AIGC 影像',
    title: '空白',
    subtitle: 'AIGC NARRATIVE / STORY FILM',
    year: '2026',
    size: 'wide',
    image: '/media/projects/aigc-blank-cover.webp',
    video: '/media/projects/aigc-blank-preview.webm',
    previewLabel: '7 秒无声预览 · 原片 01:39',
    downloadUrl:
      'https://github.com/lxy539182-code/ai-1-hero-2-3-4-2/releases/download/portfolio-films-v1/blank-story.mp4',
    downloadDuration: '01:39',
    downloadSize: '140.2 MB',
    downloadName: '李鑫宇_空白_完整成片.mp4',
    alt: '冷色办公室中的长桌与独坐人物',
    roles: ['故事概念', 'AIGC 分镜', '剪辑 / 合成'],
    tools: ['AIGC 叙事', '视频节点', '剪映'],
    excerpt:
      '在办公室、走廊与独处空间中展开的 AIGC 故事短片，让“空白”成为叙事本身。',
    description:
      '以日常空间和人物状态为线索，将多个 AI 生成的连续场景组织成带有情绪留白的故事影像。画面之外，声音、节奏与字幕共同补足叙事空白。',
    metrics: [
      { value: '01:39', label: '完整成片' },
      { value: '16:9', label: '成片画幅' },
      { value: 'STORY', label: '生成叙事' },
    ],
    gallery: [
      {
        src: '/media/projects/aigc-blank-still-01.webp',
        label: 'SPACE / SILENCE',
        alt: '暗色空间中的桌面与人物双手',
      },
      {
        src: '/media/projects/aigc-blank-title.webp',
        label: 'TITLE / CALLIGRAPHY',
        alt: '空白二字的书法片名画面',
      },
      {
        src: '/media/projects/aigc-blank-workflow.webp',
        label: 'CANVAS WORKFLOW',
        alt: '空白 AIGC 故事的节点画布工作流',
      },
    ],
  },
  {
    id: 'gesture-particles',
    index: '05',
    category: 'interactive',
    categoryLabel: '实时交互',
    title: '手势粒子场',
    subtitle: 'TOUCHDESIGNER / GESTURE / REAL-TIME',
    year: '2026',
    size: 'wide',
    image: '/media/projects/interaction-control-cover.webp',
    video: '/media/projects/interaction-control-preview.webm',
    previewLabel: '6 秒无声预览 · DEMO 00:39',
    downloadUrl:
      'https://github.com/lxy539182-code/ai-1-hero-2-3-4-2/releases/download/portfolio-films-v1/gesture-particles.mp4',
    downloadDuration: '00:39',
    downloadSize: '7.6 MB',
    downloadName: '李鑫宇_手势粒子场_完整演示.mp4',
    alt: '手势识别信号控制暗色房间中的实时影像',
    roles: ['交互概念', 'TouchDesigner', '实时视觉'],
    tools: ['TouchDesigner', '手势识别', '实时影像'],
    excerpt:
      '用手势驱动影像空间，让身体成为实时画面的控制器。',
    description:
      '基于 TouchDesigner 搭建实时交互场景，将手部动作与粒子、光线和环境画面连接。演示记录了参与者通过手势触发画面变化，并实时反馈到投影空间中的完整过程。',
    metrics: [
      { value: '00:39', label: '交互演示' },
      { value: 'REAL-TIME', label: '运行方式' },
      { value: 'TD', label: '开发工具' },
    ],
    gallery: [
      {
        src: '/media/projects/interaction-control-still-01.webp',
        label: 'SPACE / INPUT',
        alt: '交互作品中的暗色走廊与手势控制画面',
      },
      {
        src: '/media/projects/interaction-control-still-02.webp',
        label: 'HAND / CONTROL',
        alt: '参与者用手势控制笔记本电脑与画面',
      },
    ],
  },
  {
    id: 'yanduo-story',
    index: '06',
    category: 'film',
    categoryLabel: '情景短片',
    title: '烟堕',
    subtitle: 'NARRATIVE FILM / SHOOT / EDIT',
    year: '2026',
    size: 'narrow',
    image: '/media/projects/story-yanduo-cover.webp',
    video: '/media/projects/story-yanduo-preview.webm',
    previewLabel: '7 秒无声预览 · 原片 18:46',
    downloadUrl:
      'https://github.com/lxy539182-code/ai-1-hero-2-3-4-2/releases/download/portfolio-films-v1/yanduo-story.mp4',
    downloadDuration: '18:46',
    downloadSize: '158.0 MB',
    downloadName: '李鑫宇_烟堕_完整成片.mp4',
    alt: '《烟堕》中穿白色外套的人物坐在昏暗空间',
    roles: ['情景拍摄', '镜头执行', '剪辑 / 成片'],
    tools: ['实拍', '低照度摄影', '剪辑 / 调色'],
    excerpt:
      '一部以空间、沉默与人物情绪推进的实拍情景短片。',
    description:
      '围绕出租屋、走廊和人物独处完成情景故事拍摄，以低照度环境、纵深构图和人物近景建立压抑、克制的叙事氛围，并通过剪辑与调色完成成片表达。',
    metrics: [
      { value: '18:46', label: '完整成片' },
      { value: 'LIVE', label: '实拍制作' },
      { value: '16:9', label: '成片画幅' },
    ],
    gallery: [
      {
        src: '/media/projects/story-yanduo-still-01.webp',
        label: 'CHARACTER / ROOM',
        alt: '烟堕中人物在房间内低头看手机的画面',
      },
      {
        src: '/media/projects/story-yanduo-still-02.webp',
        label: 'SPACE / DEPTH',
        alt: '烟堕中人物走过昏暗走廊的画面',
      },
    ],
  },
]

export const projects = projectData.map((project) => ({
  ...project,
  image: mediaUrl(project.image),
  video: mediaUrl(project.video),
  gallery: project.gallery?.map((image) => ({
    ...image,
    src: mediaUrl(image.src),
  })),
}))

export const capabilities = [
  {
    id: 'film',
    index: '01',
    eyebrow: 'FILM & EDIT',
    title: '剪辑与叙事',
    en: 'Motion with intention.',
    description:
      '从脚本、分镜到现场执行，用节奏、声音和镜头关系建立叙事。既能完成从 0 到 1 的短片，也能把长内容拆成真正适合传播的切条。',
    items: ['创意与分镜', '拍摄统筹', '剪辑 / 调色', '声音与字幕'],
  },
  {
    id: 'aigc',
    index: '02',
    eyebrow: 'AIGC ART DIRECTION',
    title: 'AIGC 视觉',
    en: 'Generate, then direct.',
    description:
      '把生成工具放进真实影像流程：从分镜和风格帧开始，测试叙事方向、控制镜头一致性，并把 AIGC 延伸到广告、故事短片与实时交互场景。',
    items: ['AIGC 分镜 / 风格帧', '视频生成与合成', 'TouchDesigner 交互', '工作流与一致性'],
  },
  {
    id: 'brand',
    index: '03',
    eyebrow: 'BRAND & SPACE',
    title: '品牌视觉',
    en: 'One idea, many surfaces.',
    description:
      '从社媒内容到线下陈列，让同一套视觉语言穿过屏幕、货架与空间。关注的不只是画面是否好看，也关注它是否能被理解、被执行、产生反馈。',
    items: ['品牌主视觉', '社媒内容系统', '展陈 / 快闪', '运营视觉优化'],
  },
]

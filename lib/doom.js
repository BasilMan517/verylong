export const questions = [
  {
    id: "desk",
    eyebrow: "Exhibit A",
    title: "如果现在拍一张你的桌面照，最抢镜的会是什么？",
    hint: "档案局相信桌面比体检报告诚实。",
    answers: [
      { label: "半杯冷咖啡和三个未读消息", tags: ["咖啡续命", "工作托管心率"], scores: { stress: 3, sleep: 1 } },
      { label: "外卖袋、纸巾、神秘调料包", tags: ["外卖代谢流"], scores: { metabolic: 3, gut: 1 } },
      { label: "水杯、维生素、健身环", tags: ["自律焦虑混合型"], scores: { control: 2, stress: 1 } },
      { label: "什么都没有，因为我都堆在床上", tags: ["生活系统离线"], scores: { sleep: 2, mood: 2 } },
    ],
  },
  {
    id: "calendar",
    eyebrow: "Exhibit B",
    title: "你的日历最像哪种公共设施？",
    hint: "这里不问职业，只看生活被什么东西占领。",
    answers: [
      { label: "早高峰地铁，密集但大家都假装没事", tags: ["高压排班"], scores: { stress: 3, cardiovascular: 1 } },
      { label: "24 小时便利店，随时有人闯进来", tags: ["边界感缺失"], scores: { stress: 2, sleep: 2 } },
      { label: "废弃停车场，空但也没有恢复", tags: ["低活动漂浮"], scores: { mood: 2, metabolic: 1 } },
      { label: "图书馆，安静、规整、偶尔崩溃", tags: ["自律焦虑混合型"], scores: { control: 2, mood: 1 } },
    ],
  },
  {
    id: "midnight",
    eyebrow: "Exhibit C",
    title: "凌晨 1:17 你还醒着时，通常在干嘛？",
    hint: "无需承认熬夜，档案局只记录夜间活动类型。",
    answers: [
      { label: "改一个本来不该现在改的东西", tags: ["深夜修补人生"], scores: { sleep: 4, stress: 2 } },
      { label: "刷到一个完全不认识的人吵架", tags: ["手机托管大脑"], scores: { sleep: 3, mood: 1 } },
      { label: "刚吃完，正在和胃进行谈判", tags: ["夜宵伏笔"], scores: { metabolic: 2, gut: 2, sleep: 1 } },
      { label: "我已经睡了，梦里也在回消息", tags: ["工作托管心率"], scores: { stress: 3, sleep: 1 } },
    ],
  },
  {
    id: "family",
    eyebrow: "Exhibit D",
    title: "家族群最常转发哪类提醒？",
    hint: "这不是遗传病史调查，这是长辈算法画像。",
    answers: [
      { label: "血压、盐、天气变冷要戴帽子", tags: ["祖传高压线"], scores: { cardiovascular: 3 } },
      { label: "血糖、主食、饭后不能立刻躺", tags: ["血糖过山车"], scores: { metabolic: 3 } },
      { label: "某种食物会致癌，另一种又能抗癌", tags: ["体检报告阴影"], scores: { inflammation: 2, stress: 1 } },
      { label: "他们不转发，只问我什么时候回家", tags: ["情绪债务"], scores: { mood: 2, stress: 1 } },
    ],
  },
  {
    id: "fridge",
    eyebrow: "Exhibit E",
    title: "打开你的冰箱，最像哪个生态系统？",
    hint: "冷藏室是一种人格测试。",
    answers: [
      { label: "饮料展柜，颜色比蔬菜丰富", tags: ["甜饮驱动"], scores: { metabolic: 3 } },
      { label: "健身餐预制区，但有一格放着崩溃甜品", tags: ["自律焦虑混合型"], scores: { control: 2, metabolic: 1 } },
      { label: "荒漠，只有酱料和过期希望", tags: ["外卖代谢流"], scores: { metabolic: 2, gut: 1 } },
      { label: "很正常，但我主要靠公司零食活着", tags: ["工位觅食者"], scores: { metabolic: 1, stress: 2 } },
    ],
  },
  {
    id: "stairs",
    eyebrow: "Exhibit F",
    title: "电梯坏了要爬六层，你的第一反应是？",
    hint: "档案局把这叫作心肺诚实瞬间。",
    answers: [
      { label: "开始计算搬家的可能性", tags: ["低活动漂浮"], scores: { cardiovascular: 2, metabolic: 1 } },
      { label: "嘴上嫌弃，身体还能完成任务", tags: ["尚可挽回"], scores: { cardiovascular: 0 } },
      { label: "当作今日运动，立刻发朋友圈", tags: ["运动偶发型"], scores: { control: 1 } },
      { label: "让外卖小哥也别上来了，大家都放过彼此", tags: ["外卖代谢流"], scores: { metabolic: 2, cardiovascular: 1 } },
    ],
  },
  {
    id: "weekend",
    eyebrow: "Exhibit G",
    title: "周末最像哪种恢复方式？",
    hint: "恢复不是休息几小时，而是系统有没有重启成功。",
    answers: [
      { label: "补觉到错过阳光，再用奶茶开机", tags: ["睡眠债滚息"], scores: { sleep: 3, metabolic: 1 } },
      { label: "安排满了，因为空下来会焦虑", tags: ["自律焦虑混合型"], scores: { stress: 2, mood: 2 } },
      { label: "户外走走，顺便怀疑自己是不是太健康", tags: ["尚可挽回"], scores: { cardiovascular: -1, mood: -1 } },
      { label: "处理工作遗留，再假装这是自由选择", tags: ["边界感缺失"], scores: { stress: 3, sleep: 1 } },
    ],
  },
  {
    id: "bodySignal",
    eyebrow: "Exhibit H",
    title: "身体最近最常用哪种方式给你发通知？",
    hint: "不用填病名，只描述系统提示音。",
    answers: [
      { label: "胃：我不同意这份夜宵协议", tags: ["肠胃随机弹窗"], scores: { gut: 3 } },
      { label: "肩颈：你已经和椅子合并", tags: ["久坐封印"], scores: { cardiovascular: 1, stress: 1 } },
      { label: "心跳：老板消息已送达", tags: ["工作托管心率"], scores: { stress: 3, cardiovascular: 1 } },
      { label: "没有通知，可能是我静音太久", tags: ["身体消息免打扰"], scores: { control: -1 } },
    ],
  },
];

export const seededTwins = [
  {
    alias: "Jamie",
    tags: ["咖啡续命", "工作托管心率", "边界感缺失", "深夜修补人生"],
    public_health_tags: ["熬夜重灾区", "压力型心率漂移"],
    archetype: "高压日历续命者",
  },
  {
    alias: "Momo",
    tags: ["外卖代谢流", "夜宵伏笔", "甜饮驱动", "肠胃随机弹窗"],
    public_health_tags: ["控糖边缘", "胃部弹窗用户"],
    archetype: "外卖代谢综合体",
  },
  {
    alias: "Chen",
    tags: ["祖传高压线", "久坐封印", "高压排班", "低活动漂浮"],
    public_health_tags: ["高血压家族史", "久坐重灾区"],
    archetype: "祖传高压继承人",
  },
  {
    alias: "Rae",
    tags: ["自律焦虑混合型", "体检报告阴影", "情绪债务", "尚可挽回"],
    public_health_tags: ["焦虑型长寿候选人", "年度体检认真户"],
    archetype: "焦虑但硬活型",
  },
];

export function createCaseId() {
  const fragment = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DT-${fragment}`;
}

export function analyzeAnswers(answerIds) {
  const picked = questions.map((question, index) => {
    const answerIndex = answerIds[question.id] ?? 0;
    return question.answers[answerIndex];
  });

  const scores = {
    stress: 0,
    sleep: 0,
    metabolic: 0,
    cardiovascular: 0,
    gut: 0,
    mood: 0,
    inflammation: 0,
    control: 0,
  };
  const tags = [];

  picked.forEach((answer) => {
    answer.tags.forEach((tag) => tags.push(tag));
    Object.entries(answer.scores).forEach(([key, value]) => {
      scores[key] += value;
    });
  });

  const uniqueTags = [...new Set(tags)];
  const totalRisk = Object.values(scores).reduce((sum, value) => sum + Math.max(value, 0), 0);
  const estimatedAge = Math.max(58, Math.min(97, 91 - Math.round(totalRisk * 1.15) + Math.max(scores.control, 0)));
  const leading = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

  const archetype = chooseArchetype(scores, uniqueTags);
  const cause = chooseCause(leading, uniqueTags);
  const publicHealthTags = choosePublicTags(scores, uniqueTags);

  return {
    scores,
    tags: uniqueTags,
    publicHealthTags,
    archetype,
    cause,
    estimatedAge,
    report: buildReport({ scores, tags: uniqueTags, archetype, cause, estimatedAge }),
  };
}

export function findBestTwin(profile, candidates = seededTwins) {
  const target = new Set(profile.tags);
  const ranked = candidates
    .map((candidate) => {
      const candidateTags = new Set(candidate.tags || []);
      const shared = [...target].filter((tag) => candidateTags.has(tag));
      const union = new Set([...target, ...candidateTags]);
      const score = Math.round(58 + (shared.length / Math.max(union.size, 1)) * 40 + Math.min(shared.length, 3) * 3);
      return {
        ...candidate,
        shared,
        score: Math.min(score, 97),
      };
    })
    .sort((a, b) => b.score - a.score);

  const fallback = ranked[0] || seededTwins[0];
  return {
    alias: fallback.alias,
    archetype: fallback.archetype,
    score: fallback.score || 76,
    shared: fallback.shared?.length ? fallback.shared : fallback.tags.slice(0, 3),
    publicHealthTags: fallback.public_health_tags || fallback.publicHealthTags || [],
  };
}

function chooseArchetype(scores, tags) {
  if (scores.metabolic >= 6 && tags.includes("外卖代谢流")) return "外卖代谢综合体";
  if (scores.stress >= 7 && scores.sleep >= 4) return "高压日历续命者";
  if (scores.cardiovascular >= 4 && tags.includes("祖传高压线")) return "祖传高压继承人";
  if (scores.gut >= 4) return "肠胃随机弹窗型";
  if (scores.mood >= 4 && scores.control >= 2) return "焦虑但硬活型";
  if (scores.sleep >= 6) return "睡眠债滚息型";
  return "尚可挽回的碳基生物";
}

function chooseCause(leading, tags) {
  const copy = {
    stress: "心血管系统对消息通知提出集体离职",
    sleep: "多年把睡眠当作可选 DLC 后，系统拒绝续费",
    metabolic: "胰岛在甜饮与夜宵联名活动中宣布破产",
    cardiovascular: "血管在久坐和祖传压力下申请提前退休",
    gut: "胃部与肠道联合发起一场迟到多年的罢工",
    mood: "精神内耗成功把身体拖进长期维护模式",
    inflammation: "体检报告里的小箭头组成了最终乐队",
    control: "自律系统过热，反向点燃焦虑引擎",
  };
  if (tags.includes("尚可挽回")) return "过度健康地怀疑自己是否太健康";
  return copy[leading] || "身体终于拒绝继续参加这场会议";
}

function choosePublicTags(scores, tags) {
  const publicTags = [];
  if (scores.sleep >= 4) publicTags.push("熬夜重灾区");
  if (scores.metabolic >= 4) publicTags.push("代谢风险边缘");
  if (scores.cardiovascular >= 3) publicTags.push("高压/久坐支线");
  if (scores.gut >= 3) publicTags.push("胃部弹窗用户");
  if (scores.stress >= 5) publicTags.push("压力型心率漂移");
  if (tags.includes("祖传高压线")) publicTags.push("高血压家族史");
  if (!publicTags.length) publicTags.push("尚可挽回");
  return [...new Set(publicTags)].slice(0, 4);
}

function buildReport({ scores, tags, archetype, cause, estimatedAge }) {
  const foreshadow = [
    tags.includes("工作托管心率") ? "老板消息已经获得你的心率管理权限" : null,
    tags.includes("夜宵伏笔") ? "胃在凌晨签下了几份不平等条约" : null,
    tags.includes("祖传高压线") ? "家族群的血压提醒不是空穴来风" : null,
    tags.includes("甜饮驱动") ? "冷藏室正在资助一条血糖过山车" : null,
    tags.includes("久坐封印") ? "椅子和肩颈正在申请合并同类项" : null,
  ].filter(Boolean);

  const lastWordsPool = [
    "我真的下周开始运动。",
    "这杯喝完就睡。",
    "这个会开完就不忙了。",
    "我只是看一下手机。",
    "体检报告那个箭头应该问题不大。",
  ];

  const epitaphPool = [
    "他把人生过成了待办事项，最后一项永远是早睡。",
    "她曾多次重启健康计划，均因夜宵更新失败。",
    "此人长期相信年轻可以抵消所有系统警告。",
    "这里躺着一个把压力管理外包给咖啡的人。",
  ];

  const riskTop = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key);

  return {
    lastWords: lastWordsPool[(estimatedAge + archetype.length) % lastWordsPool.length],
    epitaph: epitaphPool[(estimatedAge + cause.length) % epitaphPool.length],
    foreshadow: foreshadow.length
      ? foreshadow.join("；") + "。"
      : "目前没有单点爆炸物，主要问题是你偶尔把正常生活当成限时活动。",
    riskTop,
  };
}

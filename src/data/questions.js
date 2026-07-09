export const m1Questions = [
  {
    prompt: "刷手机时，什么最容易让你停下来?",
    options: [
      { text: "一个我从未想过的新观点", themeTag: "global" },
      { text: "一个真实而打动人的故事", themeTag: "human" },
      { text: "一个关于未来的大胆想法", themeTag: "future" },
      { text: "一个值得更多人关注的问题", themeTag: "impact" },
      { text: "一个正在改变世界的人或项目", themeTag: "action" },
    ],
  },
  {
    prompt: "如果学校突然放假一周，并提供一次特别体验机会，你最想参加哪一个?",
    options: [
      { text: "跟随专家探索一个陌生国家或文化", themeTag: "global" },
      { text: "采访不同背景的人，收集他们的人生故事", themeTag: "human" },
      { text: "参观未来科技实验室", themeTag: "future" },
      { text: "深入了解一个真实社会问题", themeTag: "impact" },
      { text: "加入一个团队，完成一个真实项目", themeTag: "action" },
    ],
  },
  {
    prompt: "如果有机会让很多人听你分享一个主题，你最想讲什么?",
    options: [
      { text: "一个改变我认知的新发现", themeTag: "global" },
      { text: "一个值得被听见的故事", themeTag: "human" },
      { text: "我对未来世界的想象", themeTag: "future" },
      { text: "一个我希望更多人关注的问题", themeTag: "impact" },
      { text: "一个我想推动实现的改变", themeTag: "action" },
    ],
  },
  {
    prompt: "当你发现一个有趣的问题时，你最可能做什么?",
    options: [
      { text: "查资料，想弄清楚它为什么会发生", styleTag: "discoverer" },
      { text: "找人讨论，听听不同人的想法", styleTag: "connector" },
      { text: "想象未来会产生什么影响", styleTag: "visionary" },
      { text: "质疑现状，思考为什么没人解决它", styleTag: "challenger" },
      { text: "想办法做点什么来改善它", styleTag: "builder" },
    ],
  },
  {
    prompt: "朋友们最可能因为什么事情想到你?",
    options: [
      { text: "这个问题问他，他肯定知道不少。", styleTag: "discoverer" },
      { text: "跟他聊天总是很舒服。", styleTag: "connector" },
      { text: "他总有一些别人想不到的点子。", styleTag: "visionary" },
      { text: "他很敢说出自己的真实想法。", styleTag: "challenger" },
      { text: "有事情想做成，找他准没错。", styleTag: "builder" },
    ],
  },
  {
    prompt: "如果你参加一个团队项目，你通常最自然会扮演什么角色?",
    options: [
      { text: "负责研究和寻找信息的人", styleTag: "discoverer" },
      { text: "负责提出新想法的人", styleTag: "visionary" },
      { text: "负责协调沟通的人", styleTag: "connector" },
      { text: "负责提出不同观点的人", styleTag: "challenger" },
      { text: "负责推进执行的人", styleTag: "builder" },
    ],
  },
  {
    prompt: "当你面对一个复杂问题时，你最希望自己能够：",
    options: [
      { text: "看见更大的世界", themeTag: "global" },
      { text: "更理解不同的人", themeTag: "human" },
      { text: "想出新的可能性", themeTag: "future" },
      { text: "推动积极的改变", themeTag: "impact" },
      { text: "把想法变成现实", themeTag: "action" },
    ],
  },
  {
    prompt: "如果十年后的你回头看今天，你最希望自己留下什么?",
    options: [
      { text: "一个让人们更了解世界的新发现", styleTag: "discoverer" },
      { text: "一群因为你而连接在一起的人", styleTag: "connector" },
      { text: "一个启发未来的新想法", styleTag: "visionary" },
      { text: "一个改变大家看法的重要声音", styleTag: "challenger" },
      { text: "一个真正产生影响的项目或成果", styleTag: "builder" },
    ],
  },
];

export const m2Questions = [
  {
    prompt: "Choose the best word: “I am ___ to join the speech club.”",
    dimension: "language",
    correctOptionId: "b",
    options: [
      { id: "a", text: "table" },
      { id: "b", text: "happy" },
      { id: "c", text: "quickly" },
      { id: "d", text: "blue" },
    ],
  },
  {
    prompt: "Which sentence should come next? “I wanted to learn public speaking. ___”",
    dimension: "logic",
    correctOptionId: "c",
    options: [
      { id: "a", text: "The weather was cold." },
      { id: "b", text: "My shoes are new." },
      { id: "c", text: "So I joined a speech club." },
      { id: "d", text: "Apples are sweet." },
    ],
  },
  {
    prompt: "Which sentence directly speaks to the audience?",
    dimension: "communication",
    correctOptionId: "d",
    options: [
      { id: "a", text: "The school has many clubs." },
      { id: "b", text: "Public speaking can be useful." },
      { id: "c", text: "My speech has three parts." },
      { id: "d", text: "Have you ever felt nervous before speaking?" },
    ],
  },
  {
    prompt: "Which opening creates curiosity about the topic?",
    dimension: "impact",
    correctOptionId: "a",
    options: [
      { id: "a", text: "What if one sentence could change how people see you?" },
      { id: "b", text: "I will begin now." },
      { id: "c", text: "This is my speech." },
      { id: "d", text: "I have slides." },
    ],
  },
  {
    prompt: "“The audience listened carefully.” What does audience mean?",
    dimension: "communication",
    correctOptionId: "b",
    options: [
      { id: "a", text: "one speaker" },
      { id: "b", text: "people watching or listening" },
      { id: "c", text: "a desk" },
      { id: "d", text: "a book" },
    ],
  },
  {
    prompt: "Which is the best example to support “Reading helps students learn new words”?",
    dimension: "logic",
    correctOptionId: "c",
    options: [
      { id: "a", text: "Reading is quiet." },
      { id: "b", text: "Some books are heavy." },
      { id: "c", text: "Students often meet new vocabulary in books." },
      { id: "d", text: "Libraries have chairs." },
    ],
  },
  {
    prompt: "Which sentence uses correct grammar?",
    dimension: "language",
    correctOptionId: "d",
    options: [
      { id: "a", text: "She explain her idea clearly." },
      { id: "b", text: "She explaining her idea clearly." },
      { id: "c", text: "She clear explain her idea." },
      { id: "d", text: "She explains her idea clearly." },
    ],
  },
  {
    prompt: "Which reason is strongest? “Students should practice speaking because...”",
    dimension: "impact",
    correctOptionId: "a",
    options: [
      { id: "a", text: "it helps them share ideas clearly." },
      { id: "b", text: "microphones exist." },
      { id: "c", text: "rooms have chairs." },
      { id: "d", text: "it is sometimes loud." },
    ],
  },
  {
    prompt: "Choose the best version: “I think this idea is good because it help people.”",
    dimension: "language",
    correctOptionId: "c",
    options: [
      { id: "a", text: "because it helping people" },
      { id: "b", text: "because help people" },
      { id: "c", text: "because it helps people" },
      { id: "d", text: "because helped people now" },
    ],
  },
  {
    prompt: "Put the speech structure in order.",
    dimension: "logic",
    correctOptionId: "d",
    options: [
      { id: "a", text: "Conclusion → Point → Example" },
      { id: "b", text: "Example → Conclusion → Point" },
      { id: "c", text: "Random idea → End → Start" },
      { id: "d", text: "Point → Example → Conclusion" },
    ],
  },
  {
    prompt: "Which sentence is most appropriate in a formal presentation?",
    dimension: "communication",
    correctOptionId: "a",
    options: [
      { id: "a", text: "I would like to explain why this issue matters." },
      { id: "b", text: "This thing is kinda cool, you know." },
      { id: "c", text: "Whatever, listen up." },
      { id: "d", text: "I guess this is fine." },
    ],
  },
  {
    prompt: "Which call to action is specific and clear?",
    dimension: "impact",
    correctOptionId: "b",
    options: [
      { id: "a", text: "Be better someday." },
      { id: "b", text: "This week, practice one 60-second speech with a friend." },
      { id: "c", text: "Think about things." },
      { id: "d", text: "Maybe try something." },
    ],
  },
  {
    prompt: "Choose the most natural sentence.",
    dimension: "language",
    correctOptionId: "d",
    options: [
      { id: "a", text: "Although difficult topic, she clear explained it." },
      { id: "b", text: "She explained although the topic." },
      { id: "c", text: "Difficult clearly she explained." },
      { id: "d", text: "Although the topic was difficult, she explained it clearly." },
    ],
  },
  {
    prompt: "What is the function of this sentence: “For example, a student might interview a local leader.”",
    dimension: "logic",
    correctOptionId: "a",
    options: [
      { id: "a", text: "Supporting example" },
      { id: "b", text: "Main claim" },
      { id: "c", text: "Closing call" },
      { id: "d", text: "Topic change" },
    ],
  },
  {
    prompt: "Which sentence includes a clear transition?",
    dimension: "communication",
    correctOptionId: "c",
    options: [
      { id: "a", text: "My next thing is there." },
      { id: "b", text: "Ideas are everywhere." },
      { id: "c", text: "First, I will explain the problem." },
      { id: "d", text: "The room is bright." },
    ],
  },
  {
    prompt: "Which ending is most memorable for an audience?",
    dimension: "impact",
    correctOptionId: "b",
    options: [
      { id: "a", text: "That is all." },
      { id: "b", text: "Start with one brave sentence today." },
      { id: "c", text: "I am finished." },
      { id: "d", text: "Goodbye everyone." },
    ],
  },
];

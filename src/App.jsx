import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Circle,
  SlidersHorizontal,
  Star,
} from "lucide-react";

const m1Questions = [
  {
    prompt: "刷手机时，什么最容易让你停下来?",
    options: [
      "一个我从未想过的新观点",
      "一个真实而打动人的故事",
      "一个关于未来的大胆想法",
      "一个值得更多人关注的问题",
      "一个正在改变世界的人或项目",
    ],
  },
  {
    prompt: "如果学校突然放假一周，并提供一次特别体验机会，你最想参加哪一个?",
    options: [
      "跟随专家探索一个陌生国家或文化",
      "采访不同背景的人，收集他们的人生故事",
      "参观未来科技实验室",
      "深入了解一个真实社会问题",
      "加入一个团队，完成一个真实项目",
    ],
  },
  {
    prompt: "如果有机会让很多人听你分享一个主题，你最想讲什么?",
    options: [
      "一个改变我认知的新发现",
      "一个值得被听见的故事",
      "我对未来世界的想象",
      "一个我希望更多人关注的问题",
      "一个我想推动实现的改变",
    ],
  },
  {
    prompt: "当你发现一个有趣的问题时，你最可能做什么?",
    options: [
      "查资料，想弄清楚它为什么会发生",
      "找人讨论，听听不同人的想法",
      "想象未来会产生什么影响",
      "质疑现状，思考为什么没人解决它",
      "想办法做点什么来改善它",
    ],
  },
  {
    prompt: "朋友们最可能因为什么事情想到你?",
    options: [
      "这个问题问他，他肯定知道不少。",
      "跟他聊天总是很舒服。",
      "他总有一些别人想不到的点子。",
      "他很敢说出自己的真实想法。",
      "有事情想做成，找他准没错。",
    ],
  },
  {
    prompt: "如果你参加一个团队项目，你通常最自然会扮演什么角色?",
    options: [
      "负责研究和寻找信息的人",
      "负责提出新想法的人",
      "负责协调沟通的人",
      "负责提出不同观点的人",
      "负责推进执行的人",
    ],
  },
  {
    prompt: "当你面对一个复杂问题时，你最希望自己能够：",
    options: [
      "看见更大的世界",
      "更理解不同的人",
      "想出新的可能性",
      "推动积极的改变",
      "把想法变成现实",
    ],
  },
  {
    prompt: "如果十年后的你回头看今天，你最希望自己留下什么?",
    options: [
      "一个让人们更了解世界的新发现",
      "一群因为你而连接在一起的人",
      "一个启发未来的新想法",
      "一个改变大家看法的重要声音",
      "一个真正产生影响的项目或成果",
    ],
  },
];

const m2Questions = [
  {
    prompt: "Choose the best word: “I am ___ to join the speech club.”",
    options: [
      { text: "table", dimension: "logic", isBest: false },
      { text: "happy", dimension: "communication", isBest: true },
      { text: "quickly", dimension: "language", isBest: false },
      { text: "blue", dimension: "impact", isBest: false },
    ],
  },
  {
    prompt: "Which sentence should come next? “I wanted to learn public speaking. ___”",
    options: [
      { text: "The weather was cold.", dimension: "language", isBest: false },
      { text: "My shoes are new.", dimension: "impact", isBest: false },
      { text: "So I joined a speech club.", dimension: "logic", isBest: true },
      { text: "Apples are sweet.", dimension: "communication", isBest: false },
    ],
  },
  {
    prompt: "You are speaking to younger students. What should you do?",
    options: [
      { text: "Use only difficult words", dimension: "language", isBest: false },
      { text: "Use simple examples", dimension: "communication", isBest: true },
      { text: "Ignore them", dimension: "impact", isBest: false },
      { text: "Speak as fast as possible", dimension: "logic", isBest: false },
    ],
  },
  {
    prompt: "Which opening is more interesting?",
    options: [
      { text: "Today I will talk.", dimension: "logic", isBest: false },
      { text: "My topic is a topic.", dimension: "language", isBest: false },
      { text: "Have you ever felt afraid to speak?", dimension: "impact", isBest: true },
      { text: "Hello.", dimension: "communication", isBest: false },
    ],
  },
  {
    prompt: "“The audience listened carefully.” What does audience mean?",
    options: [
      { text: "one speaker", dimension: "communication", isBest: false },
      { text: "a desk", dimension: "impact", isBest: false },
      { text: "a book", dimension: "logic", isBest: false },
      { text: "people watching or listening", dimension: "language", isBest: true },
    ],
  },
  {
    prompt: "Which is the best example to support “Reading helps students learn new words”?",
    options: [
      { text: "Reading is quiet.", dimension: "impact", isBest: false },
      { text: "Students often meet new vocabulary in books.", dimension: "logic", isBest: true },
      { text: "Some books are heavy.", dimension: "language", isBest: false },
      { text: "Libraries have chairs.", dimension: "communication", isBest: false },
    ],
  },
  {
    prompt: "A teammate is nervous before presenting. What should you say?",
    options: [
      { text: "You will fail.", dimension: "impact", isBest: false },
      { text: "I will leave.", dimension: "logic", isBest: false },
      { text: "Let's practice together.", dimension: "communication", isBest: true },
      { text: "It is not my problem.", dimension: "language", isBest: false },
    ],
  },
  {
    prompt: "Which reason is strongest? “Students should practice speaking because...”",
    options: [
      { text: "microphones exist.", dimension: "impact", isBest: false },
      { text: "rooms have chairs.", dimension: "communication", isBest: false },
      { text: "it is sometimes loud.", dimension: "language", isBest: false },
      { text: "it helps them share ideas clearly.", dimension: "logic", isBest: true },
    ],
  },
  {
    prompt: "Choose the best version: “I think this idea is good because it help people.”",
    options: [
      { text: "because it helping people", dimension: "impact", isBest: false },
      { text: "because it helps people", dimension: "language", isBest: true },
      { text: "because help people", dimension: "logic", isBest: false },
      { text: "because helped people now", dimension: "communication", isBest: false },
    ],
  },
  {
    prompt: "Put the speech structure in order.",
    options: [
      { text: "Conclusion → Point → Example", dimension: "communication", isBest: false },
      { text: "Example → Conclusion → Point", dimension: "impact", isBest: false },
      { text: "Point → Example → Conclusion", dimension: "logic", isBest: true },
      { text: "Random idea → End → Start", dimension: "language", isBest: false },
    ],
  },
  {
    prompt: "Which sentence is most appropriate in a formal presentation?",
    options: [
      { text: "This thing is kinda cool, you know.", dimension: "communication", isBest: false },
      { text: "Whatever, listen up.", dimension: "impact", isBest: false },
      { text: "I would like to explain why this issue matters.", dimension: "language", isBest: true },
      { text: "I guess this is fine.", dimension: "logic", isBest: false },
    ],
  },
  {
    prompt: "Which opening creates curiosity?",
    options: [
      { text: "I will begin now.", dimension: "language", isBest: false },
      { text: "What if one sentence could change how people see you?", dimension: "impact", isBest: true },
      { text: "This is my speech.", dimension: "logic", isBest: false },
      { text: "I have slides.", dimension: "communication", isBest: false },
    ],
  },
  {
    prompt: "Choose the most natural sentence.",
    options: [
      { text: "Although difficult topic, she clear explained it.", dimension: "impact", isBest: false },
      { text: "She explained although the topic.", dimension: "logic", isBest: false },
      { text: "Difficult clearly she explained.", dimension: "communication", isBest: false },
      { text: "Although the topic was difficult, she explained it clearly.", dimension: "language", isBest: true },
    ],
  },
  {
    prompt: "What is the function of this sentence: “For example, a student might interview a local leader.”",
    options: [
      { text: "Main claim", dimension: "impact", isBest: false },
      { text: "Supporting example", dimension: "logic", isBest: true },
      { text: "Closing call", dimension: "communication", isBest: false },
      { text: "Topic change", dimension: "language", isBest: false },
    ],
  },
  {
    prompt: "Someone disagrees with your idea. What is the best response?",
    options: [
      { text: "You are completely wrong.", dimension: "impact", isBest: false },
      { text: "I will not answer.", dimension: "logic", isBest: false },
      { text: "Let's stop talking forever.", dimension: "language", isBest: false },
      { text: "I see your point. Here is why I think differently.", dimension: "communication", isBest: true },
    ],
  },
  {
    prompt: "Which call to action is specific and clear?",
    options: [
      { text: "Be better someday.", dimension: "communication", isBest: false },
      { text: "Think about things.", dimension: "language", isBest: false },
      { text: "This week, practice one 60-second speech with a friend.", dimension: "impact", isBest: true },
      { text: "Maybe try something.", dimension: "logic", isBest: false },
    ],
  },
];

const backgroundOptions = [
  "Mainly school English",
  "International School / Bilingual School",
  "English Training Programs",
  "Native / Near Native",
];

const voiceProfiles = [
  {
    en: "The Insight Builder",
    cn: "洞察建设者",
    superpowerEn: "Deep Curiosity",
    superpowerCn: "深度好奇",
    image: "/personas/insight-builder.png",
    description:
      "You love discovering fresh perspectives and turning questions into understanding.",
    descriptionCn: "你很容易被新的认知点点亮，并乐于把问题追问得更深。",
    strength: "你很擅长从复杂信息里找到值得表达的洞察。",
    growth: "下一步，是让你的观点更快进入重点，并更容易被听众记住。",
  },
  {
    en: "The Storyteller",
    cn: "故事讲述者",
    superpowerEn: "Human Connection",
    superpowerCn: "共情连接",
    image: "/personas/storyteller.png",
    description:
      "You notice people, emotions, and moments that make ideas feel real.",
    descriptionCn: "你能敏锐感受到人、情绪与故事，让表达天然更有温度。",
    strength: "你能够让别人愿意听下去，并自然产生共鸣。",
    growth: "下一步，是让你的故事在线索和节奏上更有层次。",
  },
  {
    en: "The Future Builder",
    cn: "未来建设者",
    superpowerEn: "Future Thinking",
    superpowerCn: "未来思维",
    image: "/personas/future-builder.png",
    description:
      "You are excited by new ideas and love turning possibilities into action.",
    descriptionCn: "你总能看到新的可能性，并乐于把想法变成现实。",
    strength: "你能够把灵感和想象自然延展成值得分享的方向。",
    growth: "下一步，是学习如何让听众更快理解你想带他们去的未来。",
  },
  {
    en: "The Advocate",
    cn: "倡导者",
    superpowerEn: "Purpose Voice",
    superpowerCn: "立场表达",
    image: "/personas/advocate.png",
    description:
      "You are drawn to meaningful issues and willing to speak up when something matters.",
    descriptionCn: "你会被重要议题吸引，并愿意在真正重要的事情上发声。",
    strength: "你有清晰的表达立场，也有推动讨论发生的勇气。",
    growth: "下一步，是把你的观点组织成更完整、更能影响听众的表达。",
  },
  {
    en: "The Catalyst",
    cn: "行动催化者",
    superpowerEn: "Execution Energy",
    superpowerCn: "行动推进",
    image: "/personas/catalyst.png",
    description:
      "You naturally move from idea to execution and want change to actually happen.",
    descriptionCn: "你会自然地把想法推向行动，并希望改变真的发生。",
    strength: "你很擅长把表达和行动联系起来，让想法更有落地感。",
    growth: "下一步，是让你的表达在感染力与说服力上再走一步。",
  },
];

const dimensionFeedback = {
  "Language & Expression": {
    strength: "你能够把想法说得比较清楚，语言表达很自然。",
    growth: "下一步，可以继续训练更精准的词语选择和更有记忆点的表达。",
  },
  "Logic & Structure": {
    strength: "你在组织信息时已经有不错的逻辑感，观点推进比较稳。",
    growth: "下一步，可以继续加强观点之间的衔接，让结构更有层次。",
  },
  "Communication": {
    strength: "你能够比较自然地与听众建立连接，表达很有亲和力。",
    growth: "下一步，可以继续练习在不同场景下调整语气和互动感。",
  },
  "Audience Impact": {
    strength: "你的表达已经开始具备影响他人的潜力，能留下印象。",
    growth: "下一步，可以更主动地设计开头、重点和结尾，增强感染力。",
  },
};

const defaultFormData = {
  name: "Jack",
  age: "8",
  speakingExperience: "One",
  background: backgroundOptions[1],
  testCode: "",
};

function PhoneShell({ children, tone = "white", wideDesktop = false }) {
  return (
    <main className={`phone-shell ${tone} ${wideDesktop ? "wide-desktop" : ""}`}>
      {children}
    </main>
  );
}

function BackButton({ onClick, className = "" }) {
  return (
    <button className={`back-button ${className}`.trim()} onClick={onClick} aria-label="Back">
      <ArrowLeft size={17} />
    </button>
  );
}

function Register({ formData, onChange, onNext }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onNext();
  };

  return (
    <PhoneShell tone="blue">
      <section className="register-page">
        <img className="register-logo" src="/wapi-logo-transparent.png" alt="WAPI" />
        <h1>WAPI Assessment</h1>
        <form className="register-card" onSubmit={handleSubmit}>
          <div className="two-fields">
            <label className="floating-field">
              <span>Your Name</span>
              <input
                value={formData.name}
                onChange={(event) => onChange("name", event.target.value)}
              />
            </label>
            <label className="floating-field">
              <span>Your Age</span>
              <input
                value={formData.age}
                onChange={(event) => onChange("age", event.target.value)}
              />
            </label>
          </div>

          <label className="floating-field wide">
            <span>Your Speaking Experience</span>
            <input
              value={formData.speakingExperience}
              onChange={(event) => onChange("speakingExperience", event.target.value)}
            />
          </label>

          <fieldset className="radio-group">
            <legend>English Learning Background</legend>
            {backgroundOptions.map((item) => (
              <label className="radio-row" key={item}>
                <input
                  type="radio"
                  name="background"
                  checked={formData.background === item}
                  onChange={() => onChange("background", item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>

          <label className="floating-field wide test-code-field">
            <span>Test Code</span>
            <input
              placeholder="Enter test code"
              value={formData.testCode}
              onChange={(event) => onChange("testCode", event.target.value)}
            />
          </label>

          <button className="black-cta" type="submit">Login</button>
        </form>
      </section>
    </PhoneShell>
  );
}

function Intro({ type, onNext, onBack }) {
  const isVoice = type === "voice";
  return (
    <PhoneShell wideDesktop>
      <section className="intro-page">
        <div className="intro-content">
          <div className={`stage-progress ${isVoice ? "voice-stage" : "expression-stage"}`}>
            <span className="stage-segment stage-segment-one" />
            <span className="stage-separator" />
            <span className="stage-segment stage-segment-two" />
          </div>
          <img
            className={isVoice ? "intro-figure voice-figure" : "intro-figure expression-figure"}
            src={isVoice ? "/designer-assets/voice-intro-full.png" : "/designer-assets/expression-intro-full.png"}
            alt=""
          />
          <h1>{isVoice ? "Voice Identity" : "Expression Discovery"}</h1>
          <p>{isVoice ? "发现你的声音" : "表达力探索"}</p>
          <div className="intro-actions">
            <button className="light-button nav-icon-button" onClick={onBack} aria-label="Back">
              <ArrowLeft size={20} />
            </button>
            <button className={`dark-button intro-next-button ${isVoice ? "blue-fill" : "purple-fill"}`} onClick={onNext} aria-label="Next">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </PhoneShell>
  );
}

function Progress({ current, total, tone }) {
  return (
    <div className="progress-bars" aria-label={`Question ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, index) => (
        <span className={index < current ? tone : ""} key={index} />
      ))}
    </div>
  );
}

function ProgressCounter({ current, total }) {
  return (
    <div className="progress-counter" aria-label={`Question ${current} of ${total}`}>
      <span>{current}</span>
      <small>/ {total}</small>
    </div>
  );
}

function TestPage({ type, step, questions, selected, onAnswer, onPrev, onBack, isTransitioning }) {
  const isVoice = type === "voice";
  const currentQuestion = questions[step];
  const visibleOptions = isVoice
    ? currentQuestion.options
    : [...currentQuestion.options, { text: "I don't know", isUnknown: true }];

  return (
    <PhoneShell wideDesktop>
      <section className="test-page">
        <div className="test-content">
          <div className="test-top">
            <header className="test-header">
              <span>{isVoice ? "Voice Identity" : "Expression Discovery"}</span>
            </header>
            {isVoice ? (
              <Progress current={step + 1} total={questions.length} tone="blue" />
            ) : (
              <ProgressCounter current={step + 1} total={questions.length} />
            )}
          </div>

          <h1>{currentQuestion.prompt}</h1>

          <div className="answer-list">
            {visibleOptions.map((item, index) => (
              <button
                className={`answer-row ${selected === index ? "selected" : ""}`}
                onClick={() => onAnswer(index)}
                key={`${step}-${item.text ?? item}`}
                disabled={isTransitioning}
              >
                <Circle size={18} />
                <span>{item.text ?? item}</span>
              </button>
            ))}
          </div>

          <div className="test-actions">
            <button className="light-button solo-button" onClick={step === 0 ? onBack : onPrev}>
              上一题
            </button>
          </div>
        </div>
      </section>
    </PhoneShell>
  );
}

function RatingStars({ value }) {
  return (
    <span className="rating-stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < value ? "#f7df70" : "#f1eff4"}
          color={index < value ? "#f7df70" : "#f1eff4"}
        />
      ))}
    </span>
  );
}

function Result({ profile, learnerName, onBack, onDownloadReport, onShareIdentity, statusMessage }) {
  return (
    <PhoneShell wideDesktop>
      <section className="result-page">
        <div className="result-content">
          <div className="result-top">
            <BackButton onClick={onBack} className="result-back-button" />
            <h1 className="result-title">Result: Voice Identity</h1>
          </div>

          <div className="result-scroll">
            <div className="result-stack">
              <div className="result-card identity-card">
                <img src={profile.image} alt={profile.en} />
                <div>
                  <p className="small-muted">{learnerName}</p>
                  <h2>{profile.cn}</h2>
                  <p className="small-muted super-title">{profile.en}</p>
                  <p className="small-muted super-title">Your Superpower</p>
                  <strong>{profile.superpowerEn}</strong>
                  <span>{profile.superpowerCn}</span>
                </div>
              </div>

              <p className="description-card">
                {profile.description}<br />
                {profile.descriptionCn}
              </p>

              <div className="result-card profile-card">
                <div className="profile-heading">
                  <span className="profile-icon"><SlidersHorizontal size={17} /></span>
                  <div>
                    <h2>Your Expression Profile</h2>
                    <p>表达力画像</p>
                  </div>
                </div>
                <div className="dimension-list">
                  {profile.dimensions.map(([name, cn, value]) => (
                    <div className="dimension-row" key={name}>
                      <span>{name}<small>{cn}</small></span>
                      <RatingStars value={value} />
                    </div>
                  ))}
                </div>
                <div className="result-note">
                  <h3>Your Strength</h3>
                  <p>{profile.strength}</p>
                </div>
                <div className="result-note">
                  <h3>Your Next Growth Opportunity</h3>
                  <p>{profile.growth}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="result-actions">
            <button className="outline-action" onClick={onDownloadReport}>Send My Report</button>
            <button className="black-action" onClick={onShareIdentity}>Share My Identity</button>
          </div>
          {statusMessage ? <p className="result-status">{statusMessage}</p> : null}
        </div>
      </section>
    </PhoneShell>
  );
}

function getDominantIndex(answers, optionCount) {
  const counts = Array(optionCount).fill(0);

  answers.forEach((value) => {
    if (Number.isInteger(value) && value >= 0 && value < optionCount) {
      counts[value] += 1;
    }
  });

  const peak = Math.max(...counts);
  if (peak === 0) return 2;
  return counts.findIndex((count) => count === peak);
}

function buildDynamicDimensions(m2Answers) {
  const dimensionMeta = {
    language: ["Language & Expression", "语言运用力"],
    logic: ["Logic & Structure", "逻辑思维力"],
    communication: ["Communication", "沟通能力"],
    impact: ["Audience Impact", "表达影响力"],
  };
  const dimensionOrder = ["language", "logic", "communication", "impact"];
  const counts = {
    language: 0,
    logic: 0,
    communication: 0,
    impact: 0,
  };
  const weighted = {
    language: 0,
    logic: 0,
    communication: 0,
    impact: 0,
  };
  let knownCount = 0;
  let preferredCount = 0;

  m2Answers.forEach((answerIndex, questionIndex) => {
    const option = m2Questions[questionIndex]?.options?.[answerIndex];
    if (!option || option.isUnknown || !option.dimension) return;

    knownCount += 1;
    counts[option.dimension] += 1;
    weighted[option.dimension] += option.isBest ? 1 : 0.45;
    if (option.isBest) preferredCount += 1;
  });

  const clampScore = (value) => Math.max(2, Math.min(5, value));
  const confidence = knownCount ? preferredCount / knownCount : 0;

  const dimensions = dimensionOrder.map((key) => {
    const exposure = knownCount ? counts[key] / knownCount : 0;
    const quality = counts[key] ? weighted[key] / counts[key] : 0;
    return [
      dimensionMeta[key][0],
      dimensionMeta[key][1],
      clampScore(2 + Math.round(quality * 2 + exposure * 2)),
    ];
  });

  return { dimensions, confidence };
}

function buildResultProfile(m1Answers, m2Answers) {
  const profileIndex = getDominantIndex(m1Answers, voiceProfiles.length);
  const baseProfile = voiceProfiles[profileIndex];
  const { dimensions: dynamicDimensions, confidence } = buildDynamicDimensions(m2Answers);
  const strongestDimension = [...dynamicDimensions].sort((a, b) => b[2] - a[2])[0];
  const growthDimension = [...dynamicDimensions].sort((a, b) => a[2] - b[2])[0];
  const confidenceLine = confidence >= 0.75
    ? "You answered with strong consistency and showed solid confidence across the expression test."
    : "Your answers show clear potential, with room to build more confidence through the expression test.";
  const confidenceLineCn = confidence >= 0.75
    ? "你在表达能力测试中展现出比较稳定的判断和表达自信。"
    : "你已经有不错的表达潜力，接下来更需要通过表达能力测试和练习建立稳定自信。";

  return {
    ...baseProfile,
    description: `${baseProfile.description} ${confidenceLine}`,
    descriptionCn: `${baseProfile.descriptionCn}${confidenceLineCn}`,
    dimensions: dynamicDimensions,
    strength: dimensionFeedback[strongestDimension[0]].strength,
    growth: dimensionFeedback[growthDimension[0]].growth,
  };
}

export function App() {
  const [screen, setScreen] = useState("register");
  const [formData, setFormData] = useState(defaultFormData);
  const [m1Step, setM1Step] = useState(0);
  const [m2Step, setM2Step] = useState(0);
  const [m1Answers, setM1Answers] = useState(() => Array(m1Questions.length).fill(null));
  const [m2Answers, setM2Answers] = useState(() => Array(m2Questions.length).fill(null));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const advanceTimerRef = useRef(null);
  const statusTimerRef = useRef(null);

  const resultProfile = buildResultProfile(m1Answers, m2Answers);
  const learnerName = formData.name.trim() || "WAPI Learner";

  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };

  const clearStatusTimer = () => {
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
      statusTimerRef.current = null;
    }
  };

  const showStatus = (message) => {
    clearStatusTimer();
    setStatusMessage(message);
    statusTimerRef.current = setTimeout(() => {
      setStatusMessage("");
      statusTimerRef.current = null;
    }, 2400);
  };

  useEffect(() => () => {
    clearAdvanceTimer();
    clearStatusTimer();
  }, []);

  const handleFormChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const resetAssessment = () => {
    clearAdvanceTimer();
    setIsTransitioning(false);
    setM1Step(0);
    setM2Step(0);
    setM1Answers(Array(m1Questions.length).fill(null));
    setM2Answers(Array(m2Questions.length).fill(null));
  };

  const goM1Next = () => {
    clearAdvanceTimer();
    setIsTransitioning(false);
    if (m1Step >= m1Questions.length - 1) {
      setScreen("m2Intro");
    } else {
      setM1Step((value) => value + 1);
    }
  };

  const goM2Next = () => {
    clearAdvanceTimer();
    setIsTransitioning(false);
    if (m2Step >= m2Questions.length - 1) {
      setScreen("result");
    } else {
      setM2Step((value) => value + 1);
    }
  };

  const answerM1 = (answerIndex) => {
    if (isTransitioning) return;
    setM1Answers((value) => {
      const next = [...value];
      next[m1Step] = answerIndex;
      return next;
    });
    setIsTransitioning(true);
    clearAdvanceTimer();
    advanceTimerRef.current = setTimeout(() => {
      goM1Next();
    }, 180);
  };

  const answerM2 = (answerIndex) => {
    if (isTransitioning) return;
    setM2Answers((value) => {
      const next = [...value];
      next[m2Step] = answerIndex;
      return next;
    });
    setIsTransitioning(true);
    clearAdvanceTimer();
    advanceTimerRef.current = setTimeout(() => {
      goM2Next();
    }, 180);
  };

  const buildReportText = () => [
    "WAPI Assessment Result",
    "",
    `Learner: ${learnerName}`,
    `Age: ${formData.age || "-"}`,
    `Speaking Experience: ${formData.speakingExperience || "-"}`,
    `English Background: ${formData.background || "-"}`,
    `Test Code: ${formData.testCode || "-"}`,
    "",
    `Voice Identity: ${resultProfile.en} / ${resultProfile.cn}`,
    `Superpower: ${resultProfile.superpowerEn} / ${resultProfile.superpowerCn}`,
    "",
    "Expression Profile",
    ...resultProfile.dimensions.map(([name, cn, value]) => `${name} (${cn}): ${value}/5`),
    "",
    `Strength: ${resultProfile.strength}`,
    `Next Growth Opportunity: ${resultProfile.growth}`,
  ].join("\n");

  const handleDownloadReport = () => {
    const blob = new Blob([buildReportText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wapi-assessment-report.txt";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showStatus("Report downloaded.");
  };

  const handleShareIdentity = async () => {
    const text = [
      `${learnerName} got ${resultProfile.en} on WAPI Assessment.`,
      `Superpower: ${resultProfile.superpowerEn} / ${resultProfile.superpowerCn}`,
      resultProfile.description,
    ].join("\n");

    try {
      if (navigator.share) {
        await navigator.share({
          title: "WAPI Assessment Result",
          text,
        });
        showStatus("Result shared.");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        showStatus("Result copied to clipboard.");
        return;
      }
    } catch {
      showStatus("Sharing was cancelled.");
      return;
    }

    window.location.href = `mailto:?subject=${encodeURIComponent("WAPI Assessment Result")}&body=${encodeURIComponent(text)}`;
    showStatus("Opened your mail app.");
  };

  if (screen === "register") {
    return (
      <Register
        formData={formData}
        onChange={handleFormChange}
        onNext={() => {
          resetAssessment();
          setScreen("m1Intro");
        }}
      />
    );
  }

  if (screen === "m1Intro") {
    return <Intro type="voice" onBack={() => setScreen("register")} onNext={() => setScreen("m1Test")} />;
  }

  if (screen === "m1Test") {
    return (
      <TestPage
        type="voice"
        step={m1Step}
        questions={m1Questions}
        selected={m1Answers[m1Step]}
        onAnswer={answerM1}
        onBack={() => setScreen("m1Intro")}
        onPrev={() => setM1Step((value) => Math.max(0, value - 1))}
        isTransitioning={isTransitioning}
      />
    );
  }

  if (screen === "m2Intro") {
    return <Intro type="expression" onBack={() => setScreen("m1Test")} onNext={() => setScreen("m2Test")} />;
  }

  if (screen === "m2Test") {
    return (
      <TestPage
        type="expression"
        step={m2Step}
        questions={m2Questions}
        selected={m2Answers[m2Step]}
        onAnswer={answerM2}
        onBack={() => setScreen("m2Intro")}
        onPrev={() => setM2Step((value) => Math.max(0, value - 1))}
        isTransitioning={isTransitioning}
      />
    );
  }

  return (
    <Result
      profile={resultProfile}
      learnerName={learnerName}
      onBack={() => setScreen("m2Test")}
      onDownloadReport={handleDownloadReport}
      onShareIdentity={handleShareIdentity}
      statusMessage={statusMessage}
    />
  );
}

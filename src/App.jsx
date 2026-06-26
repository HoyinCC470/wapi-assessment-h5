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
    options: ["happy", "table", "quickly", "blue"],
  },
  {
    prompt: "Which sentence should come next? “I wanted to learn public speaking. ___”",
    options: [
      "So I joined a speech club.",
      "The weather was cold.",
      "My shoes are new.",
      "Apples are sweet.",
    ],
  },
  {
    prompt: "You are speaking to younger students. What should you do?",
    options: [
      "Use simple examples",
      "Use only difficult words",
      "Ignore them",
      "Speak as fast as possible",
    ],
  },
  {
    prompt: "Which opening is more interesting?",
    options: [
      "Have you ever felt afraid to speak?",
      "Today I will talk.",
      "My topic is a topic.",
      "Hello.",
    ],
  },
  {
    prompt: "“The audience listened carefully.” What does audience mean?",
    options: [
      "people watching or listening",
      "one speaker",
      "a desk",
      "a book",
    ],
  },
  {
    prompt: "Which is the best example to support “Reading helps students learn new words”?",
    options: [
      "Students often meet new vocabulary in books.",
      "Reading is quiet.",
      "Some books are heavy.",
      "Libraries have chairs.",
    ],
  },
  {
    prompt: "A teammate is nervous before presenting. What should you say?",
    options: [
      "Let's practice together.",
      "You will fail.",
      "I will leave.",
      "It is not my problem.",
    ],
  },
  {
    prompt: "Which reason is strongest? “Students should practice speaking because...”",
    options: [
      "it helps them share ideas clearly.",
      "microphones exist.",
      "rooms have chairs.",
      "it is sometimes loud.",
    ],
  },
  {
    prompt: "Choose the best version: “I think this idea is good because it help people.”",
    options: [
      "because it helps people",
      "because it helping people",
      "because help people",
      "because helped people now",
    ],
  },
  {
    prompt: "Put the speech structure in order.",
    options: [
      "Point → Example → Conclusion",
      "Conclusion → Point → Example",
      "Example → Conclusion → Point",
      "Random idea → End → Start",
    ],
  },
  {
    prompt: "Which sentence is most appropriate in a formal presentation?",
    options: [
      "I would like to explain why this issue matters.",
      "This thing is kinda cool, you know.",
      "Whatever, listen up.",
      "I guess this is fine.",
    ],
  },
  {
    prompt: "Which opening creates curiosity?",
    options: [
      "What if one sentence could change how people see you?",
      "I will begin now.",
      "This is my speech.",
      "I have slides.",
    ],
  },
  {
    prompt: "Choose the most natural sentence.",
    options: [
      "Although the topic was difficult, she explained it clearly.",
      "Although difficult topic, she clear explained it.",
      "She explained although the topic.",
      "Difficult clearly she explained.",
    ],
  },
  {
    prompt: "What is the function of this sentence: “For example, a student might interview a local leader.”",
    options: [
      "Supporting example",
      "Main claim",
      "Closing call",
      "Topic change",
    ],
  },
  {
    prompt: "Someone disagrees with your idea. What is the best response?",
    options: [
      "I see your point. Here is why I think differently.",
      "You are completely wrong.",
      "I will not answer.",
      "Let's stop talking forever.",
    ],
  },
  {
    prompt: "Which call to action is specific and clear?",
    options: [
      "This week, practice one 60-second speech with a friend.",
      "Be better someday.",
      "Think about things.",
      "Maybe try something.",
    ],
  },
];

const dimensions = [
  ["Language & Expression", "语言运用力", 4],
  ["Logic & Structure", "逻辑思维力", 3],
  ["Communication", "沟通能力", 4],
  ["Audience Impact", "表达影响力", 2],
];

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

function Register({ onNext }) {
  return (
    <PhoneShell tone="blue">
      <section className="register-page">
        <img className="register-logo" src="/wapi-logo-transparent.png" alt="WAPI" />
        <h1>WAPI Assessment</h1>
        <form className="register-card" onSubmit={(event) => { event.preventDefault(); onNext(); }}>
          <div className="two-fields">
            <label className="floating-field">
              <span>Your Name</span>
              <input defaultValue="Jack" />
            </label>
            <label className="floating-field">
              <span>Your Age</span>
              <input defaultValue="8" />
            </label>
          </div>

          <label className="floating-field wide">
            <span>Your Speaking Experience</span>
            <input defaultValue="One" />
          </label>

          <fieldset className="radio-group">
            <legend>English Learning Background</legend>
            {[
              "Mainly school English",
              "International School / Bilingual School",
              "English Training Programs",
              "Native / Near Native",
            ].map((item, index) => (
              <label className="radio-row" key={item}>
                <input type="radio" name="background" defaultChecked={index === 1} />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>

          <label className="floating-field wide test-code-field">
            <span>Test Code</span>
            <input placeholder="Enter test code" />
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

function TestPage({ type, step, questions, selected, onAnswer, onPrev, onBack, isTransitioning }) {
  const isVoice = type === "voice";
  const currentQuestion = questions[step];
  const visibleOptions = isVoice
    ? currentQuestion.options
    : [...currentQuestion.options, "I don't know"];
  return (
    <PhoneShell wideDesktop>
      <section className="test-page">
        <div className="test-content">
          <div className="test-top">
            <header className="test-header">
              <span>{isVoice ? "Voice Identity" : "Expression Discovery"}</span>
            </header>
            <Progress current={step + 1} total={questions.length} tone={isVoice ? "blue" : "purple"} />
          </div>

          <h1>{currentQuestion.prompt}</h1>

          <div className="answer-list">
            {visibleOptions.map((item, index) => (
              <button
                className={`answer-row ${selected === index ? "selected" : ""}`}
                onClick={() => onAnswer(index)}
                key={`${step}-${item}`}
                disabled={isTransitioning}
              >
                <Circle size={18} />
                <span>{item}</span>
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
        <Star key={index} size={16} fill={index < value ? "#f7df70" : "#f1eff4"} color={index < value ? "#f7df70" : "#f1eff4"} />
      ))}
    </span>
  );
}

function Result({ onBack, onDownloadReport, onShareIdentity, statusMessage }) {
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
                <img src="/designer-assets/result-identity.png" alt="" />
                <div>
                  <p className="small-muted">The Future Builder</p>
                  <h2>未来建设者</h2>
                  <p className="small-muted super-title">Your Superpower</p>
                  <strong>Future Thinking</strong>
                  <span>未来思维</span>
                </div>
              </div>

              <p className="description-card">
                You are excited by new ideas and love turning possibilities into action.<br />
                你总能看到新的可能性，并乐于把想法变成现实。
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
                  {dimensions.map(([name, cn, value]) => (
                    <div className="dimension-row" key={name}>
                      <span>{name}<small>{cn}</small></span>
                      <RatingStars value={value} />
                    </div>
                  ))}
                </div>
                <div className="result-note">
                  <h3>Your Strength</h3>
                  <p>你能够清晰自然地表达自己的观点</p>
                </div>
                <div className="result-note">
                  <h3>Your Next Growth Opportunity</h3>
                  <p>你已经有值得表达的想法。下一步，是学习如何影响听众</p>
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

export function App() {
  const [screen, setScreen] = useState("register");
  const [m1Step, setM1Step] = useState(0);
  const [m2Step, setM2Step] = useState(0);
  const [m1Answers, setM1Answers] = useState(() => Array(m1Questions.length).fill(null));
  const [m2Answers, setM2Answers] = useState(() => Array(m2Questions.length).fill(null));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const advanceTimerRef = useRef(null);
  const statusTimerRef = useRef(null);

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
    if (m2Step >= m2Questions.length - 1) setScreen("result");
    else setM2Step((value) => value + 1);
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
    "Voice Identity: The Future Builder / 未来建设者",
    "Superpower: Future Thinking / 未来思维",
    "",
    "Expression Profile",
    ...dimensions.map(([name, cn, value]) => `${name} (${cn}): ${value}/5`),
    "",
    "Strength: 你能够清晰自然地表达自己的观点",
    "Next Growth Opportunity: 你已经有值得表达的想法。下一步，是学习如何影响听众",
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
      "I’m The Future Builder on WAPI Assessment.",
      "Superpower: Future Thinking / 未来思维",
      "You are excited by new ideas and love turning possibilities into action.",
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

  if (screen === "register") return <Register onNext={() => setScreen("m1Intro")} />;
  if (screen === "m1Intro") return <Intro type="voice" onBack={() => setScreen("register")} onNext={() => setScreen("m1Test")} />;
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
  if (screen === "m2Intro") return <Intro type="expression" onBack={() => setScreen("m1Test")} onNext={() => setScreen("m2Test")} />;
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
      onBack={() => setScreen("m2Test")}
      onDownloadReport={handleDownloadReport}
      onShareIdentity={handleShareIdentity}
      statusMessage={statusMessage}
    />
  );
}

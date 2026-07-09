import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Circle,
  Languages,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { m1Questions, m2Questions } from "./data/questions.js";
import {
  getProfileByThemeStyle,
  stylePriority,
  themePriority,
  voiceProfiles,
} from "./data/personas.js";

const speakingExperienceOptions = [
  "None",
  "1-3",
  "4+",
];

const englishEnvironmentOptions = [
  "Regular School English Only",
  "School English + Extra Practice",
  "Bilingual / International Curriculum Exposure",
  "English-Rich Daily Environment",
];

const dimensionMeta = {
  language: ["Language & Expression", "语言运用力"],
  logic: ["Logic & Structure", "逻辑思维力"],
  communication: ["Communication", "沟通能力"],
  impact: ["Audience Impact", "表达影响力"],
};

const dimensionOrder = ["language", "logic", "communication", "impact"];

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
  name: "",
  age: "",
  speakingExperience: "",
  background: "",
  testCode: "",
};

const AUTO_ADVANCE_DELAY_MS = 600;
const STORAGE_KEY = "wapi-assessment-progress";
const STORAGE_VERSION = 1;
const QUESTION_SET_VERSION = "m1-theme-style-23-20260709-m2-20260709-onboard-20260709";
const STORAGE_TTL_MS = 14 * 24 * 60 * 60 * 1000;
const reportThemes = {
  future: { color: "#2477ed", soft: "#edf5ff", shadow: "rgba(36, 119, 237, 0.12)" },
  impact: { color: "#f49700", soft: "#fff5e6", shadow: "rgba(244, 151, 0, 0.13)" },
  action: { color: "#18a56f", soft: "#ebf8f2", shadow: "rgba(24, 165, 111, 0.12)" },
  human: { color: "#e46f9a", soft: "#fff0f6", shadow: "rgba(228, 111, 154, 0.12)" },
  global: { color: "#26a6a1", soft: "#eaf9f8", shadow: "rgba(38, 166, 161, 0.12)" },
};
const validScreens = new Set(["register", "m1Intro", "m1Test", "m2Intro", "m2Test", "result"]);

function createEmptyAnswers(length) {
  return Array(length).fill(null);
}

function loadCanvasImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, "image/png", 0.96);
  });
}

function roundedRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fillRoundedRect(ctx, x, y, width, height, radius, fill) {
  roundedRectPath(ctx, x, y, width, height, radius);
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawCard(ctx, x, y, width, height, radius, fill, shadowColor = "rgba(34, 60, 110, 0.06)") {
  ctx.save();
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 6;
  fillRoundedRect(ctx, x, y, width, height, radius, fill);
  ctx.restore();
}

function drawImageCover(ctx, image, x, y, width, height, radius) {
  const sourceRatio = image.width / image.height;
  const targetRatio = width / height;
  let sx = 0;
  let sy = 0;
  let sw = image.width;
  let sh = image.height;

  if (sourceRatio > targetRatio) {
    sw = image.height * targetRatio;
    sx = (image.width - sw) / 2;
  } else {
    sh = image.width / targetRatio;
    sy = (image.height - sh) / 2;
  }

  ctx.save();
  roundedRectPath(ctx, x, y, width, height, radius);
  ctx.clip();
  ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
  ctx.restore();
}

function wrapText(ctx, text, maxWidth) {
  const value = String(text ?? "");
  const useWords = value.includes(" ");
  const tokens = useWords ? value.split(/\s+/) : Array.from(value);
  const lines = [];
  let line = "";

  tokens.forEach((token) => {
    const separator = useWords && line ? " " : "";
    const next = `${line}${separator}${token}`;
    if (!line || ctx.measureText(next).width <= maxWidth) {
      line = next;
      return;
    }
    lines.push(line);
    line = token;
  });

  if (line) lines.push(line);
  return lines;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = Infinity) {
  const lines = wrapText(ctx, text, maxWidth).slice(0, maxLines);
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
  return lines.length * lineHeight;
}

function drawStarShape(ctx, cx, cy, outerRadius, innerRadius, fill) {
  ctx.beginPath();
  for (let index = 0; index < 10; index += 1) {
    const angle = -Math.PI / 2 + index * (Math.PI / 5);
    const radius = index % 2 === 0 ? outerRadius : innerRadius;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawStars(ctx, x, y, value) {
  for (let index = 0; index < 5; index += 1) {
    drawStarShape(ctx, x + index * 29, y, 12, 6, index < value ? "#f7df70" : "#f1eff4");
  }
}

function drawSliderIcon(ctx, cx, cy, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  [[-14, -8, 14, -8], [-14, 0, 14, 0], [-14, 8, 14, 8]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(cx + x1, cy + y1);
    ctx.lineTo(cx + x2, cy + y2);
    ctx.stroke();
  });
  ctx.fillStyle = color;
  [[-5, -8], [7, 0], [-1, 8]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(cx + x, cy + y, 3.8, 0, Math.PI * 2);
    ctx.fill();
  });
}

async function generateReportImageBlob(profile, descriptionLanguage) {
  const theme = reportThemes[profile.theme] ?? reportThemes.future;
  const [logo, personaImage] = await Promise.all([
    loadCanvasImage("/wapi-logo-wide.png"),
    loadCanvasImage(profile.image),
  ]);
  const scale = 2;
  const width = 750;
  const padding = 34;
  const cardWidth = width - padding * 2;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const description = descriptionLanguage === "cn" ? profile.descriptionCn : profile.description;

  canvas.width = width * scale;
  canvas.height = 1580 * scale;
  ctx.scale(scale, scale);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, 1580);
  ctx.textBaseline = "top";

  let y = 28;
  const logoWidth = 252;
  ctx.drawImage(logo, padding, y, logoWidth, logoWidth / (logo.width / logo.height));
  y += 88;

  drawCard(ctx, padding, y, cardWidth, 356, 28, "#ffffff", theme.shadow);
  fillRoundedRect(ctx, padding, y, cardWidth, 10, 8, theme.color);
  drawImageCover(ctx, personaImage, padding + 24, y + 48, 240, 300, 18);

  const copyX = padding + 300;
  const copyCenter = copyX + 170;
  ctx.textAlign = "center";
  ctx.fillStyle = theme.color;
  ctx.font = "700 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("Your Voice Identity", copyCenter, y + 54);
  ctx.fillStyle = "#19191f";
  ctx.font = "800 38px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
  ctx.fillText(profile.cn, copyCenter, y + 98);
  ctx.fillStyle = "#8581aa";
  ctx.font = "600 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(profile.en, copyCenter, y + 150);

  fillRoundedRect(ctx, copyX + 18, y + 205, 304, 116, 24, theme.soft);
  ctx.fillStyle = theme.color;
  ctx.font = "700 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("Your Superpower", copyCenter, y + 224);
  ctx.fillStyle = "#2f2e37";
  ctx.font = "800 25px -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Segoe UI', sans-serif";
  ctx.fillText(profile.superpowerCn, copyCenter, y + 260);
  ctx.fillStyle = "#686684";
  ctx.font = "600 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  drawWrappedText(ctx, profile.superpowerEn, copyCenter, y + 294, 260, 22, 2);
  y += 388;

  ctx.textAlign = "left";
  ctx.font = "400 25px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif";
  const descriptionHeight = Math.max(112, wrapText(ctx, description, cardWidth - 56).length * 34 + 42);
  fillRoundedRect(ctx, padding, y, cardWidth, descriptionHeight, 22, theme.soft);
  ctx.fillStyle = "#24242c";
  drawWrappedText(ctx, description, padding + 28, y + 22, cardWidth - 56, 34, 5);
  y += descriptionHeight + 30;

  drawCard(ctx, padding, y, cardWidth, 500, 24, "#ffffff", "rgba(34, 60, 110, 0.055)");
  fillRoundedRect(ctx, padding + 24, y + 24, 58, 58, 29, theme.soft);
  drawSliderIcon(ctx, padding + 53, y + 53, theme.color);
  ctx.fillStyle = "#2b2a31";
  ctx.font = "600 38px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("Your Expression Profile", padding + 104, y + 18);
  ctx.fillStyle = theme.color;
  ctx.font = "500 22px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
  ctx.fillText("表达力画像", padding + 104, y + 68);

  let rowY = y + 132;
  profile.dimensions.forEach(([name, , value]) => {
    ctx.fillStyle = "#66636e";
    ctx.font = "500 25px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillText(name, padding + 24, rowY);
    drawStars(ctx, padding + cardWidth - 174, rowY + 15, value);
    rowY += 48;
  });

  const noteX = padding + 24;
  const noteWidth = cardWidth - 48;
  fillRoundedRect(ctx, noteX, rowY + 10, noteWidth, 122, 20, theme.soft);
  ctx.fillStyle = "#383640";
  ctx.font = "600 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("Your Strength", noteX + 24, rowY + 31);
  ctx.font = "400 22px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
  drawWrappedText(ctx, profile.strength, noteX + 24, rowY + 70, noteWidth - 48, 30, 2);

  rowY += 150;
  fillRoundedRect(ctx, noteX, rowY + 10, noteWidth, 138, 20, theme.soft);
  ctx.fillStyle = "#383640";
  ctx.font = "600 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("Your Next Growth Opportunity", noteX + 24, rowY + 31);
  ctx.font = "400 22px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
  drawWrappedText(ctx, profile.growth, noteX + 24, rowY + 70, noteWidth - 48, 30, 3);
  y += 540;

  ctx.textAlign = "center";
  ctx.fillStyle = "#9b99a6";
  ctx.font = "500 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("WAPI Assessment", width / 2, y + 16);

  const finalHeight = y + 64;
  const output = document.createElement("canvas");
  output.width = width * scale;
  output.height = finalHeight * scale;
  output.getContext("2d").drawImage(canvas, 0, 0);
  const blob = await canvasToBlob(output);
  if (!blob) throw new Error("Unable to export report image");
  return blob;
}

function normalizeAnswers(value, length, maxIndex) {
  const source = Array.isArray(value) ? value : [];

  return createEmptyAnswers(length).map((_, index) => {
    const answer = source[index];
    return Number.isInteger(answer) && answer >= 0 && answer <= maxIndex ? answer : null;
  });
}

function clampStep(value, maxStep) {
  return Number.isInteger(value) ? Math.max(0, Math.min(value, maxStep)) : 0;
}

function isValidM1Answer(answerIndex, questionIndex) {
  const option = m1Questions[questionIndex]?.options?.[answerIndex];
  return Number.isInteger(answerIndex) && Boolean(option?.themeTag || option?.styleTag);
}

function hasCompleteM1Answers(answers) {
  return (
    Array.isArray(answers) &&
    answers.length === m1Questions.length &&
    answers.every((answerIndex, questionIndex) => isValidM1Answer(answerIndex, questionIndex))
  );
}

function getSavableFormData(formData) {
  const savableFormData = { ...formData };
  delete savableFormData.testCode;
  return savableFormData;
}

function normalizeFormData(value) {
  const source = value && typeof value === "object" ? value : {};

  return {
    ...defaultFormData,
    ...source,
    speakingExperience: speakingExperienceOptions.includes(source.speakingExperience)
      ? source.speakingExperience
      : "",
    background: englishEnvironmentOptions.includes(source.background) ? source.background : "",
    testCode: "",
  };
}

function readSavedProgress() {
  if (typeof window === "undefined") return null;

  try {
    const rawProgress = window.localStorage.getItem(STORAGE_KEY);
    if (!rawProgress) return null;

    const progress = JSON.parse(rawProgress);
    if (progress?.version !== STORAGE_VERSION) return null;
    if (progress?.questionSetVersion !== QUESTION_SET_VERSION) return null;

    const savedAt = Date.parse(progress.savedAt);
    if (!Number.isFinite(savedAt) || Date.now() - savedAt > STORAGE_TTL_MS) return null;

    const m1Answers = normalizeAnswers(progress.m1Answers, m1Questions.length, 4);
    const m2Answers = normalizeAnswers(progress.m2Answers, m2Questions.length, 4);
    const screen = validScreens.has(progress.screen) ? progress.screen : "register";
    const restoredScreen = screen === "result" && !hasCompleteM1Answers(m1Answers) ? "register" : screen;

    return {
      screen: restoredScreen,
      formData: normalizeFormData(progress.formData),
      m1Step: clampStep(progress.m1Step, m1Questions.length - 1),
      m2Step: clampStep(progress.m2Step, m2Questions.length - 1),
      m1Answers,
      m2Answers,
    };
  } catch {
    return null;
  }
}

function writeSavedProgress(progress) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: STORAGE_VERSION,
      questionSetVersion: QUESTION_SET_VERSION,
      savedAt: new Date().toISOString(),
      ...progress,
      formData: getSavableFormData(progress.formData ?? defaultFormData),
    }));
  } catch {
    // Storage can fail in private mode or when browser quota is full.
  }
}

function useStaggerReveal(revealKey) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    let showFrame = 0;
    const hideFrame = requestAnimationFrame(() => {
      setIsShown(false);
      showFrame = requestAnimationFrame(() => setIsShown(true));
    });

    return () => {
      cancelAnimationFrame(hideFrame);
      cancelAnimationFrame(showFrame);
    };
  }, [revealKey]);

  return `t-stagger ${isShown ? "is-shown" : ""}`.trim();
}

function PhoneShell({ children, tone = "white", wideDesktop = false }) {
  return (
    <main className={`phone-shell ${tone} ${wideDesktop ? "wide-desktop" : ""}`}>
      {children}
    </main>
  );
}

function Register({ formData, onChange, onNext }) {
  const revealClassName = useStaggerReveal("register");
  const [formError, setFormError] = useState("");

  const requiredFields = [
    ["name", "Your Name"],
    ["age", "Your Age"],
    ["speakingExperience", "Your Public Speaking Experience"],
    ["background", "English Learning Environment"],
    ["testCode", "Test Code"],
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const missingField = requiredFields.find(([field]) => !String(formData[field] ?? "").trim());
    if (missingField) {
      setFormError(`Please complete ${missingField[1]} before continuing.`);
      return;
    }

    setFormError("");
    onNext();
  };

  const handleChange = (field, value) => {
    if (formError) setFormError("");
    onChange(field, value);
  };

  return (
    <PhoneShell tone="blue">
      <section className={`register-page screen-reveal ${revealClassName}`}>
        <img className="register-logo t-stagger-line t-stagger-line--1" src="/wapi-logo-transparent.png" alt="WAPI" />
        <h1 className="t-stagger-line t-stagger-line--2">WAPI Assessment</h1>
        <form className="register-card t-stagger-line t-stagger-line--3" onSubmit={handleSubmit}>
          <div className="two-fields">
            <label className="floating-field">
              <span>Your Name</span>
              <input
                value={formData.name}
                onChange={(event) => handleChange("name", event.target.value)}
              />
            </label>
            <label className="floating-field">
              <span>Your Age</span>
              <input
                value={formData.age}
                onChange={(event) => handleChange("age", event.target.value)}
              />
            </label>
          </div>

          <fieldset className="radio-group speaking-group">
            <legend>Your Public Speaking Experience</legend>
            <div className="radio-options speaking-options">
              {speakingExperienceOptions.map((item) => (
                <label className={`radio-row ${formData.speakingExperience === item ? "selected" : ""}`} key={item}>
                  <input
                    type="radio"
                    name="speakingExperience"
                    checked={formData.speakingExperience === item}
                    onChange={() => handleChange("speakingExperience", item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="radio-group">
            <legend>English Learning Environment</legend>
            <p className="radio-group-description">
              Choose the option that best describes your main English learning environment in the past 12 months.
            </p>
            <div className="radio-options">
              {englishEnvironmentOptions.map((item) => (
                <label className={`radio-row ${formData.background === item ? "selected" : ""}`} key={item}>
                  <input
                    type="radio"
                    name="background"
                    checked={formData.background === item}
                    onChange={() => handleChange("background", item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="floating-field wide test-code-field">
            <span>Test Code</span>
            <input
              placeholder="Enter test code"
              value={formData.testCode}
              onChange={(event) => handleChange("testCode", event.target.value)}
            />
          </label>

          {formError ? <p className="form-error" role="alert">{formError}</p> : null}
          <button className="black-cta" type="submit">Login</button>
        </form>
      </section>
    </PhoneShell>
  );
}

function Intro({ type, onNext, onBack }) {
  const isVoice = type === "voice";
  const revealClassName = useStaggerReveal(type);

  return (
    <PhoneShell wideDesktop>
      <section className="intro-page screen-reveal">
        <div className={`intro-content ${revealClassName}`}>
          <div className={`stage-progress ${isVoice ? "voice-stage" : "expression-stage"}`}>
            <span className="stage-segment stage-segment-one" />
            <span className="stage-separator" />
            <span className="stage-segment stage-segment-two" />
          </div>
          <img
            className={`t-stagger-line t-stagger-line--1 ${isVoice ? "intro-figure voice-figure" : "intro-figure expression-figure"}`}
            src={isVoice ? "/designer-assets/voice-intro-full.png" : "/designer-assets/expression-intro-full.png"}
            alt=""
          />
          <h1 className="t-stagger-line t-stagger-line--2">{isVoice ? "Voice Identity" : "Expression Discovery"}</h1>
          <p className="t-stagger-line t-stagger-line--3">{isVoice ? "发现你的声音" : "表达力探索"}</p>
          <div className="intro-actions t-stagger-line t-stagger-line--4">
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
        <span className={index < current ? tone : ""} style={{ "--bar-index": index }} key={index} />
      ))}
    </div>
  );
}

function AnimatedNumber({ value }) {
  return (
    <span className="t-digit-group is-animating" key={value}>
      {String(value).split("").map((char, index, chars) => {
        const stagger =
          index === chars.length - 2 ? 1 : index === chars.length - 1 ? 2 : undefined;
        return (
          <span className="t-digit" data-stagger={stagger} key={`${char}-${index}`}>
            {char}
          </span>
        );
      })}
    </span>
  );
}

function ProgressCounter({ current, total }) {
  return (
    <div className="progress-counter" aria-label={`Question ${current} of ${total}`}>
      <span><AnimatedNumber value={current} /></span>
      <small>/ {total}</small>
    </div>
  );
}

function TestPage({ type, step, questions, selected, onAnswer, onPrev, onNext, onBack, isTransitioning }) {
  const isVoice = type === "voice";
  const currentQuestion = questions[step];
  const isLastQuestion = step >= questions.length - 1;
  const hasSelected = selected !== null && selected !== undefined;
  const revealClassName = useStaggerReveal(`${type}-${step}`);
  const visibleOptions = isVoice
    ? currentQuestion.options
    : [...currentQuestion.options, { id: "unknown", text: "I don't know", isUnknown: true }];
  const nextLabel = isLastQuestion ? (isVoice ? "继续" : "查看结果") : "下一题";

  return (
    <PhoneShell wideDesktop>
      <section className="test-page screen-reveal">
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

          <div className={`question-motion ${revealClassName}`} key={`${type}-${step}`}>
            <h1 className="t-stagger-line t-stagger-line--1">{currentQuestion.prompt}</h1>

            <div className="answer-list">
              {visibleOptions.map((item, index) => (
                <button
                  className={`answer-row t-stagger-line t-stagger-line--${index + 2} ${selected === index ? "selected" : ""}`}
                  onClick={() => onAnswer(index)}
                  key={`${step}-${item.text ?? item}`}
                  disabled={isTransitioning}
                >
                  <span className="answer-icon t-icon-swap" data-state={selected === index ? "b" : "a"} aria-hidden="true">
                    <span className="t-icon" data-icon="a"><Circle size={18} /></span>
                    <span className="t-icon" data-icon="b"><Circle size={18} fill="currentColor" /></span>
                  </span>
                  <span>{item.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="test-actions">
            <button className="light-button" onClick={step === 0 ? onBack : onPrev}>
              上一题
            </button>
            <button className="dark-button" onClick={onNext} disabled={!hasSelected}>
              {nextLabel}
            </button>
          </div>
        </div>
      </section>
    </PhoneShell>
  );
}

function RatingStars({ name, value }) {
  return (
    <span className="rating-stars" role="img" aria-label={`${name}: ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < value ? "#f7df70" : "#f1eff4"}
          color={index < value ? "#f7df70" : "#f1eff4"}
          style={{ "--star-index": index }}
        />
      ))}
    </span>
  );
}

function Result({ profile, onShareReport, onRestart, statusMessage }) {
  const revealClassName = useStaggerReveal(profile.en);
  const [isSharingReport, setIsSharingReport] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState("");
  const [shareFile, setShareFile] = useState(null);
  const [descriptionState, setDescriptionState] = useState({ profileId: profile.id, language: "en" });
  const descriptionLanguage = descriptionState.profileId === profile.id ? descriptionState.language : "en";
  const isDescriptionChinese = descriptionLanguage === "cn";

  const handleShareReport = async () => {
    if (isSharingReport) return;
    setIsSharingReport(true);
    try {
      const report = await onShareReport(descriptionLanguage);
      if (!report) return;
      const { file, url } = report;
      if (shareImageUrl) URL.revokeObjectURL(shareImageUrl);
      setShareFile(file);
      setShareImageUrl(url);
    } finally {
      setIsSharingReport(false);
    }
  };

  const closeSharePreview = () => {
    if (shareImageUrl) URL.revokeObjectURL(shareImageUrl);
    setShareImageUrl("");
    setShareFile(null);
  };

  const systemShareReport = async () => {
    if (!shareFile || !navigator.canShare?.({ files: [shareFile] }) || !navigator.share) return;
    try {
      await navigator.share({
        title: "WAPI Assessment Report",
        files: [shareFile],
      });
    } catch {
      // User cancellation does not need an error state in the image preview.
    }
  };

  useEffect(() => () => {
    if (shareImageUrl) URL.revokeObjectURL(shareImageUrl);
  }, [shareImageUrl]);

  return (
    <PhoneShell wideDesktop>
      <section className="result-page screen-reveal">
        <div className={`result-content ${revealClassName}`}>
          <div className="result-capture">
            <div className="result-top">
              <img className="result-brand-logo" src="/wapi-logo-wide.png" alt="WAPI" />
            </div>

            <div className="result-scroll">
              <div className="result-stack">
                <div className={`result-card identity-card result-reveal-card theme-${profile.theme} t-stagger-line t-stagger-line--1`}>
                  <img src={profile.image} alt={profile.en} />
                  <div className="identity-copy">
                    <p className="identity-eyebrow result-text-reveal">Your Voice Identity</p>
                    <h2 className="result-text-reveal">{profile.cn}</h2>
                    <p className="identity-en result-text-reveal">{profile.en}</p>
                    <div className="superpower-title result-text-reveal">
                      <span>Your Superpower</span>
                      <em>{profile.superpowerCn}</em>
                      <strong>{profile.superpowerEn}</strong>
                    </div>
                  </div>
                </div>

                <div className={`description-card theme-${profile.theme} t-stagger-line t-stagger-line--2`}>
                  <p className="description-text" key={descriptionLanguage}>
                    {isDescriptionChinese ? profile.descriptionCn : profile.description}
                  </p>
                  <button
                    className="translation-toggle"
                    type="button"
                    aria-label={isDescriptionChinese ? "Show English description" : "Show Chinese translation"}
                    title={isDescriptionChinese ? "Show English" : "中文翻译"}
                    onClick={() => setDescriptionState({
                      profileId: profile.id,
                      language: isDescriptionChinese ? "en" : "cn",
                    })}
                  >
                    <Languages size={14} aria-hidden="true" />
                  </button>
                </div>

                <div className={`result-card profile-card theme-${profile.theme} t-stagger-line t-stagger-line--3`}>
                  <div className="profile-heading">
                    <span className="profile-icon"><SlidersHorizontal size={17} /></span>
                    <div>
                      <h2>Your Expression Profile</h2>
                      <p>表达力画像</p>
                    </div>
                  </div>
                  <div className="dimension-list">
                    {profile.dimensions.map(([name, cn, value], index) => (
                      <div className="dimension-row" style={{ "--dimension-index": index }} key={name}>
                        <span>{name}<small>{cn}</small></span>
                        <RatingStars name={name} value={value} />
                      </div>
                    ))}
                  </div>
                  <div className="result-note" style={{ "--note-index": 0 }}>
                    <h3>Your Strength</h3>
                    <p>{profile.strength}</p>
                  </div>
                  <div className="result-note" style={{ "--note-index": 1 }}>
                    <h3>Your Next Growth Opportunity</h3>
                    <p>{profile.growth}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`result-actions theme-${profile.theme} t-stagger-line t-stagger-line--4`}>
            <button className="theme-action-button" onClick={handleShareReport} disabled={isSharingReport}>
              {isSharingReport ? "Preparing..." : "Share My Report"}
            </button>
            <button className="outline-action restart-action" onClick={onRestart}>重新开始</button>
          </div>
          {statusMessage ? <p className="result-status" key={statusMessage}>{statusMessage}</p> : null}
        </div>
        {shareImageUrl ? (
          <div className="share-preview" role="dialog" aria-modal="true" aria-label="Share report image preview">
            <div className="share-preview-panel">
              <img src={shareImageUrl} alt="WAPI Assessment report" />
              <p>长按图片保存，或使用系统分享。</p>
              <div className="share-preview-actions">
                <button className="outline-action" onClick={closeSharePreview}>关闭</button>
                <button
                  className={`theme-action-button theme-${profile.theme}`}
                  onClick={systemShareReport}
                  disabled={!shareFile || !navigator.canShare?.({ files: [shareFile] })}
                >
                  系统分享
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </PhoneShell>
  );
}

function selectTopTag(counts, priority) {
  const peak = Math.max(...Object.values(counts));
  if (peak === 0) return null;
  return priority.find((tag) => counts[tag] === peak) ?? null;
}

function getDominantProfile(answers) {
  const themeCounts = Object.fromEntries(themePriority.map((tag) => [tag, 0]));
  const styleCounts = Object.fromEntries(stylePriority.map((tag) => [tag, 0]));

  answers.forEach((answerIndex, questionIndex) => {
    const option = m1Questions[questionIndex]?.options?.[answerIndex];
    if (option?.themeTag && option.themeTag in themeCounts) {
      themeCounts[option.themeTag] += 1;
    }
    if (option?.styleTag && option.styleTag in styleCounts) {
      styleCounts[option.styleTag] += 1;
    }
  });

  const theme = selectTopTag(themeCounts, themePriority);
  const style = selectTopTag(styleCounts, stylePriority);
  if (!theme || !style) return null;

  return getProfileByThemeStyle(theme, style);
}

function buildDynamicDimensions(m2Answers) {
  const totals = {
    language: 0,
    logic: 0,
    communication: 0,
    impact: 0,
  };
  const correct = {
    language: 0,
    logic: 0,
    communication: 0,
    impact: 0,
  };
  let correctCount = 0;

  m2Questions.forEach((question, questionIndex) => {
    totals[question.dimension] += 1;

    const answerIndex = m2Answers[questionIndex];
    const selectedOption = question.options[answerIndex];
    if (selectedOption?.id === question.correctOptionId) {
      correct[question.dimension] += 1;
      correctCount += 1;
    }
  });

  const scoreFromRatio = (ratio) => {
    if (ratio === 0) return 1;
    if (ratio < 0.4) return 2;
    if (ratio < 0.7) return 3;
    if (ratio < 0.9) return 4;
    return 5;
  };
  const confidence = correctCount / m2Questions.length;

  const details = dimensionOrder.map((key) => {
    const ratio = totals[key] ? correct[key] / totals[key] : 0;
    return {
      key,
      name: dimensionMeta[key][0],
      cn: dimensionMeta[key][1],
      correct: correct[key],
      total: totals[key],
      ratio,
      stars: scoreFromRatio(ratio),
    };
  });

  return {
    details,
    dimensions: details.map((detail) => [detail.name, detail.cn, detail.stars]),
    confidence,
  };
}

const strengthPriority = ["communication", "language", "logic", "impact"];
const growthPriority = ["impact", "logic", "language", "communication"];

function compareStrengthDimensions(a, b) {
  if (b.stars !== a.stars) return b.stars - a.stars;
  if (b.ratio !== a.ratio) return b.ratio - a.ratio;
  return strengthPriority.indexOf(a.key) - strengthPriority.indexOf(b.key);
}

function compareGrowthDimensions(a, b) {
  if (a.stars !== b.stars) return a.stars - b.stars;
  if (a.ratio !== b.ratio) return a.ratio - b.ratio;
  return growthPriority.indexOf(a.key) - growthPriority.indexOf(b.key);
}

function areAllDimensionsTied(details) {
  return details.every((detail) => (
    detail.stars === details[0].stars && detail.ratio === details[0].ratio
  ));
}

function buildResultProfile(m1Answers, m2Answers) {
  const baseProfile = getDominantProfile(m1Answers);
  const profileForResult =
    baseProfile ?? voiceProfiles.find((profile) => profile.id === "future-builder") ?? voiceProfiles[0];
  const { dimensions: dynamicDimensions, details: dimensionDetails, confidence } = buildDynamicDimensions(m2Answers);
  const isFullTie = areAllDimensionsTied(dimensionDetails);
  const strongestDimension = [...dimensionDetails].sort(compareStrengthDimensions)[0];
  const growthDimension = [...dimensionDetails]
    .filter((detail) => detail.key !== strongestDimension.key)
    .sort(compareGrowthDimensions)[0];
  const strengthText = isFullTie
    ? profileForResult.strength
    : dimensionFeedback[strongestDimension.name].strength;
  const growthText = isFullTie
    ? dimensionFeedback[dimensionMeta.impact[0]].growth
    : dimensionFeedback[growthDimension.name].growth;
  const confidenceLine = confidence >= 0.75
    ? "You answered with strong consistency and showed solid confidence across the expression test."
    : "Your answers show clear potential, with room to build more confidence through the expression test.";
  const confidenceLineCn = confidence >= 0.75
    ? "你在表达能力测试中展现出比较稳定的判断和表达自信。"
    : "你已经有不错的表达潜力，接下来更需要通过表达能力测试和练习建立稳定自信。";

  return {
    ...profileForResult,
    description: `${profileForResult.description} ${confidenceLine}`,
    descriptionCn: `${profileForResult.descriptionCn}${confidenceLineCn}`,
    dimensions: dynamicDimensions,
    strength: strengthText,
    growth: growthText,
  };
}

export function App() {
  const [initialProgress] = useState(() => readSavedProgress());
  const [screen, setScreen] = useState(() => initialProgress?.screen ?? "register");
  const [formData, setFormData] = useState(() => initialProgress?.formData ?? defaultFormData);
  const [m1Step, setM1Step] = useState(() => initialProgress?.m1Step ?? 0);
  const [m2Step, setM2Step] = useState(() => initialProgress?.m2Step ?? 0);
  const [m1Answers, setM1Answers] = useState(() => initialProgress?.m1Answers ?? createEmptyAnswers(m1Questions.length));
  const [m2Answers, setM2Answers] = useState(() => initialProgress?.m2Answers ?? createEmptyAnswers(m2Questions.length));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const advanceTimerRef = useRef(null);
  const statusTimerRef = useRef(null);

  const resultProfile = buildResultProfile(m1Answers, m2Answers);

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

  useEffect(() => {
    writeSavedProgress({
      screen,
      formData,
      m1Step,
      m2Step,
      m1Answers,
      m2Answers,
    });
  }, [screen, formData, m1Step, m2Step, m1Answers, m2Answers]);

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
    setM1Answers(createEmptyAnswers(m1Questions.length));
    setM2Answers(createEmptyAnswers(m2Questions.length));
  };

  const restartAssessment = () => {
    clearAdvanceTimer();
    setIsTransitioning(false);
    setStatusMessage("");
    setFormData(defaultFormData);
    setM1Step(0);
    setM2Step(0);
    setM1Answers(createEmptyAnswers(m1Questions.length));
    setM2Answers(createEmptyAnswers(m2Questions.length));
    setScreen("register");
  };

  const goM1Prev = () => {
    clearAdvanceTimer();
    setIsTransitioning(false);
    setM1Step((value) => Math.max(0, value - 1));
  };

  const goM2Prev = () => {
    clearAdvanceTimer();
    setIsTransitioning(false);
    setM2Step((value) => Math.max(0, value - 1));
  };

  const goBackToM1Intro = () => {
    clearAdvanceTimer();
    setIsTransitioning(false);
    setScreen("m1Intro");
  };

  const goBackToM2Intro = () => {
    clearAdvanceTimer();
    setIsTransitioning(false);
    setScreen("m2Intro");
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
      if (!hasCompleteM1Answers(m1Answers)) {
        setScreen("m1Test");
        return;
      }
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
    }, AUTO_ADVANCE_DELAY_MS);
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
    }, AUTO_ADVANCE_DELAY_MS);
  };

  const handleShareReport = async (descriptionLanguage) => {
    try {
      showStatus("正在生成报告图片...");
      await document.fonts?.ready;
      const blob = await generateReportImageBlob(resultProfile, descriptionLanguage);
      const file = new File([blob], "wapi-assessment-report.png", { type: "image/png" });
      const url = URL.createObjectURL(blob);
      showStatus("报告图片已生成。");
      return { file, url };
    } catch (error) {
      if (error?.name === "AbortError") {
        showStatus("分享已取消。");
        return null;
      }
      showStatus("报告图片生成失败，请稍后重试。");
      throw error;
    }
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
        onBack={goBackToM1Intro}
        onPrev={goM1Prev}
        onNext={goM1Next}
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
        onBack={goBackToM2Intro}
        onPrev={goM2Prev}
        onNext={goM2Next}
        isTransitioning={isTransitioning}
      />
    );
  }

  return (
    <Result
      profile={resultProfile}
      onShareReport={handleShareReport}
      onRestart={restartAssessment}
      statusMessage={statusMessage}
    />
  );
}

"use client";

import { useMemo, useState } from "react";
import { questions } from "@/lib/doom";

const loadingLines = [
  "正在扫描你的外卖灵魂残留...",
  "正在查询祖传疾病彩蛋...",
  "正在核对凌晨 1:17 的屏幕亮度...",
  "正在计算你第 839 次说下周健身的可信度...",
  "正在生成不具法律效力的死亡证明...",
];

const rewriteCopy = {
  sleep: "反转线已记录：把睡眠从可选项改成必修后，档案局把你的结局从紧急维护改成了延迟退休。预计多获得 6-9 年用于吐槽年轻人。",
  walk: "反转线已记录：饭后散步让胰岛终于不用独自值夜班。未来版本的你依然嘴硬，但体检报告少了几个愤怒的小箭头。",
  boundary: "反转线已记录：下班后不让老板远程托管心率。你的心血管系统撤回了离职申请，但保留追究历史加班的权利。",
};

export default function Home() {
  const [theme, setTheme] = useState("bureau");
  const [alias, setAlias] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [stage, setStage] = useState("intake");
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [rewrite, setRewrite] = useState("");

  const current = questions[step];
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);
  const selected = current.inputType === "text" ? undefined : answers[current.id];
  const aliasValue = answers["alias"] || alias;
  const chosenTags = useMemo(() => {
    return questions
      .map((question) => question.answers?.[answers[question.id]]?.tags || [])
      .flat()
      .filter((tag, index, list) => list.indexOf(tag) === index)
      .slice(0, 7);
  }, [answers]);

  function chooseAnswer(index) {
    setAnswers((prev) => ({ ...prev, [current.id]: index }));
  }

  function goBack() {
    setStep((value) => Math.max(value - 1, 0));
  }

  async function goNext() {
    if (current.inputType === "text") {
      if (!alias.trim()) return;
      setAnswers((prev) => ({ ...prev, [current.id]: alias.trim() }));
      setStep((value) => value + 1);
      return;
    }
    if (selected === undefined) return;
    if (step < questions.length - 1) {
      setStep((value) => value + 1);
      return;
    }

    setStage("loading");
    setLoadingIndex(0);
    for (let i = 1; i < loadingLines.length; i += 1) {
      await wait(520);
      setLoadingIndex(i);
    }

    const response = await fetch("/api/report", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ alias: answers["alias"] || alias, answers }),
    });
    const data = await response.json();
    setResult(data);
    setStage("result");
  }

  function restart() {
    setAnswers({});
    setAlias("");
    setStep(0);
    setResult(null);
    setRewrite("");
    setStage("intake");
  }

  return (
    <main className={`app-shell theme-${theme}`}>
      <section className="masthead">
        <div className="hero-copy">
          <p className="eyebrow">Department of Questionable Longevity</p>
          <h1>升天档案局</h1>
          <p className="subhead">
            一份不具法律效力的结局报告。我们会通过桌面、冰箱、家族群、凌晨状态这些比体检报告更诚实的证据，告诉你如何升天，何时升天。
          </p>
        </div>
        <div className="masthead-right">
          <div className="theme-switcher">
            {[
              { id: "bureau", label: "档案" },
              { id: "terminal", label: "终端" },
              { id: "claim", label: "理赔" },
            ].map((t) => (
              <button
                key={t.id}
                className={`theme-chip${theme === t.id ? " active" : ""}`}
                onClick={() => setTheme(t.id)}
                type="button"
                title={t.label}
              >
                <span className={`theme-swatch ${t.id}-swatch`} />
                {t.label}
              </button>
            ))}
          </div>
          <div className="status-card" aria-label="当前档案状态">
            <span className="status-dot" />
            <span>Case file open</span>
            <strong>{result?.caseId || "DT-PENDING"}</strong>
          </div>
        </div>
      </section>


      <section className="workspace">
        <aside className="case-sidebar">
          <div className="stamp">UNOFFICIAL</div>
          <label className="alias-field">
            <span>档案代号</span>
            <strong className="alias-display">{aliasValue || "等待报名..."}</strong>
          </label>
          <div className="meter-block">
            <div className="meter-label">
              <span>档案完整度</span>
              <strong>{progress}%</strong>
            </div>
            <div className="meter">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="clue-stack">
            {chosenTags.length ? chosenTags.map((tag) => <span key={tag}>{tag}</span>) : <span>等待第一条生活证据</span>}
          </div>
        </aside>

        {stage === "intake" && (
          <section className="interrogation-card">
            <div className="question-topline">
              <span>{current.eyebrow}</span>
              <span>
                Question {String(step + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
              </span>
            </div>
            <div className="question-body" key={step}>
              <h2>{current.title}</h2>
              <p>{current.hint}</p>
              {current.inputType === "text" ? (
                <div className="text-input-block">
                  <input
                    className="name-input"
                    type="text"
                    value={alias}
                    onChange={(event) => setAlias(event.target.value)}
                    placeholder={current.placeholder}
                    maxLength={24}
                    autoFocus
                  />
                </div>
              ) : (
                <div className="answer-grid">
                  {current.answers.map((answer, index) => (
                    <button
                      className={selected === index ? "answer-option selected" : "answer-option"}
                      key={answer.label}
                      onClick={() => chooseAnswer(index)}
                      type="button"
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      {answer.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="panel-actions">
              <button className="ghost-button" disabled={step === 0} onClick={goBack} type="button">
                上一步
              </button>
              <button className="primary-button" disabled={current.inputType === "text" ? !alias.trim() : selected === undefined} onClick={goNext} type="button">
                {step === questions.length - 1 ? "签发假证明" : "下一份证据"}
              </button>
            </div>
          </section>
        )}

        {stage === "loading" && (
          <section className="loading-card" aria-live="polite">
            <div className="scanner">
              <div className="scanner-line" />
              <span>ARCHIVE SCAN</span>
            </div>
            <h2>判官正在翻你的人生记录</h2>
            <p>{loadingLines[loadingIndex]}</p>
          </section>
        )}

        {stage === "result" && result && (
          <section className="result-stage">
            <div className="death-certificate" id="certificate">
              <span className="cert-watermark">UNOFFICIAL</span>
              <div className="cert-header">
                <div>
                  <p className="eyebrow">Unofficial End-of-Game Certificate</p>
                  <h2>不具法律效力的结局报告</h2>
                </div>
                <CertSeal />
              </div>
              <div className="age-hero">
                <div className="cause-line">
                  <span className="cause-prefix">由于</span>
                  <span className="cause-text">{result.profile.cause}</span>
                </div>
                <div className="age-line">
                  <span className="age-prefix">于</span>
                  <span className="age-number">{result.profile.estimatedAge}</span>
                  <span className="age-unit">岁升天</span>
                </div>
              </div>
              <div className="cert-grid">
                <CertField label="档案编号" value={result.caseId} />
                <CertField label="档案代号" value={result.alias} />
                <CertField label="最后一句话" value={result.profile.report.lastWords} />
                <CertField label="数据保存" value={result.saved ? "已写入病友池" : "本地演示模式"} />
              </div>
              <div className="cert-body">
                <h3>病程伏笔</h3>
                <p>{result.profile.report.foreshadow}</p>
                <h3>墓志铭草稿</h3>
                <p>{result.profile.report.epitaph}</p>
              </div>
              <p className="disclaimer">娱乐模拟与健康教育用途，不构成医学诊断、治疗建议或真实寿命预测。</p>
            </div>

            <div className="result-grid">
              <article className="profile-card">
                <p className="eyebrow">Doom Profile</p>
                <h2>{result.profile.archetype}</h2>
                <p>{result.profile.profileSummary}</p>
                <div className="tag-row">
                  {result.profile.publicHealthTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>

              <article className="twin-card">
                <div className="twin-header">
                  <p className="eyebrow">Doom Twin</p>
                  <span className="match-score-badge">{result.twin.score}% 重合</span>
                </div>
                <h2>最佳升天道友</h2>
                <p className="twin-name">{result.twin.alias}</p>
                <p className="twin-archetype">{result.twin.archetype}</p>
                <p>
                  你们在升天路线上高度重合。TA 公开的健康标签：
                  {result.twin.publicHealthTags.join("、") || "尚未公开支线"}。
                </p>
                <div>
                  <span className="meter-label" style={{ marginBottom: 8 }}>共同作死标签</span>
                  <div className="shared-tags">
                    {result.twin.shared.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            </div>

            <div className="rewrite-card">
              <div>
                <p className="eyebrow">Rewrite the ending</p>
                <h2>重写死法</h2>
                <p>选择一条微小反转线，档案局会给你一个没那么离谱的结局。</p>
              </div>
              <div className="rewrite-actions">
                <button onClick={() => setRewrite(rewriteCopy.sleep)} type="button">
                  睡眠改成必修
                </button>
                <button onClick={() => setRewrite(rewriteCopy.walk)} type="button">
                  饭后散步补丁
                </button>
                <button onClick={() => setRewrite(rewriteCopy.boundary)} type="button">
                  下班心率结界
                </button>
              </div>
              {rewrite && <p className="rewrite-result">{rewrite}</p>}
            </div>

            <div className="panel-actions result-actions">
              <button className="ghost-button" onClick={restart} type="button">
                重新开档
              </button>
              <button className="primary-button" onClick={() => window.print()} type="button">
                打印这份假证明
              </button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function CertSeal() {
  return (
    <svg className="cert-seal" viewBox="0 0 200 200" width="148" height="148">
      <defs>
        <path id="topArc" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" />
        <path id="btmArc" d="M100,100 m75,0 a75,75 0 1,1 -150,0 a75,75 0 1,1 150,0" />
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g transform="rotate(-8, 100, 100)" filter="url(#rough)" opacity="0.85">
        <circle cx="100" cy="100" r="92" fill="none" stroke="var(--accent)" strokeWidth="5" />
        <circle cx="100" cy="100" r="84" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
        <circle cx="100" cy="100" r="56" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
        <polygon points="100,52 106,74 130,74 111,88 117,110 100,96 83,110 89,88 70,74 94,74" fill="var(--accent)" opacity="0.6" />
        <text fill="var(--accent)" fontFamily="'Noto Serif SC',serif" fontSize="13" fontWeight="900" letterSpacing="4" opacity="0.8">
          <textPath href="#topArc" startOffset="25%" textAnchor="middle">VERYLONG</textPath>
        </text>
        <text fill="var(--accent)" fontFamily="'Noto Serif SC',serif" fontSize="11" fontWeight="800" letterSpacing="3" opacity="0.7">
          <textPath href="#btmArc" startOffset="25%" textAnchor="middle">END OF GAME</textPath>
        </text>
        <text x="100" y="136" textAnchor="middle" fill="var(--accent)" fontFamily="'Noto Serif SC',serif" fontSize="20" fontWeight="900" letterSpacing="4" opacity="0.8">结局认证</text>
      </g>
    </svg>
  );
}

function CertField({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

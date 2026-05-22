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
  const selected = answers[current.id];
  const chosenTags = useMemo(() => {
    return questions
      .map((question) => question.answers[answers[question.id]]?.tags || [])
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
      body: JSON.stringify({ alias, answers }),
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
            一份不具法律效力的结局报告。我们不问你觉得自己会怎么死，只研究桌面、冰箱、家族群、凌晨状态这些更诚实的证据。
          </p>
        </div>
        <div className="status-card" aria-label="当前档案状态">
          <span className="status-dot" />
          <span>Case file open</span>
          <strong>{result?.caseId || "DT-PENDING"}</strong>
        </div>
      </section>

      <section className="theme-panel" aria-labelledby="themeTitle">
        <div className="section-heading">
          <p className="eyebrow">Visual direction</p>
          <h2 id="themeTitle">三套可选 UI 风格</h2>
        </div>
        <div className="theme-grid">
          <ThemeOption
            active={theme === "bureau"}
            swatch="bureau"
            title="地府医院 Bureaucracy"
            text="旧档案袋、红章、病历表，像一份不该流出的行政文件。"
            onClick={() => setTheme("bureau")}
          />
          <ThemeOption
            active={theme === "terminal"}
            swatch="terminal"
            title="赛博寿命终端"
            text="黑底荧光、扫描线、终端噪声，像未来诊所的禁用页面。"
            onClick={() => setTheme("terminal")}
          />
          <ThemeOption
            active={theme === "claim"}
            swatch="claim"
            title="荒诞保险理赔"
            text="保单、理赔、风险条款，把人生作死行为做成合同。"
            onClick={() => setTheme("claim")}
          />
        </div>
      </section>

      <section className="workspace">
        <aside className="case-sidebar">
          <div className="stamp">UNOFFICIAL</div>
          <label className="alias-field">
            <span>档案代号</span>
            <input value={alias} onChange={(event) => setAlias(event.target.value)} placeholder="匿名打工人" />
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
            <h2>{current.title}</h2>
            <p>{current.hint}</p>
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
            <div className="panel-actions">
              <button className="ghost-button" disabled={step === 0} onClick={goBack} type="button">
                上一步
              </button>
              <button className="primary-button" disabled={selected === undefined} onClick={goNext} type="button">
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
              <div className="cert-header">
                <div>
                  <p className="eyebrow">Unofficial Death Certificate</p>
                  <h2>不具法律效力的死亡证明</h2>
                </div>
                <div className="cert-seal">VOID</div>
              </div>
              <div className="cert-grid">
                <CertField label="档案编号" value={result.caseId} />
                <CertField label="档案代号" value={result.alias} />
                <CertField label="预计升天年龄" value={`${result.profile.estimatedAge}.4 岁`} />
                <CertField label="主要升天原因" value={result.profile.cause} />
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
                <p>
                  你的档案看起来像一部由生活习惯、家族群提醒和凌晨屏幕亮度共同编剧的长篇连续剧。
                  主线不是疾病预言，而是一个可以被改写的健康喜剧。
                </p>
                <div className="tag-row">
                  {result.profile.publicHealthTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>

              <article className="twin-card">
                <p className="eyebrow">Doom Twin Match</p>
                <h2>{result.twin.alias}</h2>
                <div className="match-score">
                  <span>{result.twin.score}%</span>
                  <small>作死路径相似度</small>
                </div>
                <p>
                  你们都属于「{result.twin.archetype}」附近的宇宙。TA 公开的健康标签显示：
                  {result.twin.publicHealthTags.join("、") || "尚未公开支线"}。
                </p>
                <div className="shared-tags">
                  {result.twin.shared.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
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

function ThemeOption({ active, swatch, title, text, onClick }) {
  return (
    <button className={active ? "theme-option active" : "theme-option"} onClick={onClick} type="button">
      <span className={`theme-swatch ${swatch}-swatch`} />
      <strong>{title}</strong>
      <small>{text}</small>
    </button>
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

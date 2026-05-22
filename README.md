# Doom Twin

一个娱乐向 longevity / health hackathon 项目：用间接问题生成一份“不具法律效力的死亡证明”，并在匿名档案里匹配作死路径相似的 Doom Twin。

## 本地运行

```bash
npm install
npm run dev
```

## Supabase

1. 在 Supabase SQL Editor 执行 `supabase/schema.sql`。
2. 设置环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

## Vercel

把相同环境变量加到 Vercel Project Settings 后部署。

## 医疗边界

所有输出都是娱乐模拟与健康教育，不构成医学诊断、治疗建议或真实寿命预测。

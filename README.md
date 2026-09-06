# 📚 Arya's Reading Log

一个给 Arya（8 岁 / 3 年级）做的**电子图书馆 + 语音闯关**网页应用。
纯静态、离线可用、数据存在浏览器本地（localStorage），不需要账号、不上传任何东西。

---

## 🚀 怎么打开

**方法一（推荐 · 麦克风一定能用）**
双击文件夹里的 **`start.command`**
→ 会自动启动一个小服务器并打开浏览器 `http://localhost:8899`
→ 用完关掉那个黑色终端窗口就行。

**方法二**
直接双击 `index.html`。图书馆、阅读记录全都能用，但有些浏览器在 `file://` 下**不允许开麦克风**，闯关时可能只能用「⌨️ Type it instead」打字作答。

> 第一次点麦克风时浏览器会问「是否允许使用麦克风」——点 **允许 / Allow**。
> 建议用 **Chrome**（语音识别最稳），Edge、Safari 也可以。

---

## 📖 里面有什么

### 1. 首页 — 选年级
- **1–12 年级**，每个年级一个书架，共 **120 本书**
- 显示：读了几本 / 读了多少分钟 / 连续打卡天数 / 讲了几个故事
- **10 个徽章**（第一本书、连读 3 天、闯关达人、小作家…）
- 粉色 "MY GRADE" 标记当前年级；在书架页点 **⭐ Make this my grade** 可以换年级（升年级时用）

### 2. 图书馆 — 真正的电子书架
每个年级 10 本精选书，可按标签筛选、按书名/作者搜索。
点进任意一本书可以看到：简介、页数、大概要读多久、标签。

书单示例：
| 年级 | 代表书目 |
|---|---|
| 1–2 | Frog and Toad、Green Eggs and Ham、Magic Tree House、Nate the Great |
| 3 | **Charlotte's Web**、Ramona、The Chocolate Touch、Despereaux |
| 4 | **Harry Potter and the Sorcerer's Stone**、Matilda、Charlie and the Chocolate Factory、The BFG |
| 5 | Wonder、Holes、**Percy Jackson**、A Wrinkle in Time |
| 6–8 | The Giver、Hatchet、**The Hobbit**、The Outsiders、To Kill a Mockingbird、The Hunger Games |
| 9–12 | Romeo and Juliet、Fahrenheit 451、The Great Gatsby、1984、Pride and Prejudice、Hamlet |

书页里还有：
- 🔊 **Read this to me** — 电脑把书名和简介念给她听
- ⏱️ **阅读计时器** — 边读边计时，停下时自动填好「读了多少分钟」
- ⭐ 打星 + 写读后感（可以 🎤 **用说的**，自动转成文字）

### 3. My Log — 阅读记录
所有读过的书按时间排列，含日期、分钟数、星级、读后感。也可以手动添加不在书架上的书。

### 4. 🎮 Voice Quests — 语音闯关（重点）

**所有题目都要"说"出来，不是点选。** 分 4 个难度段，每段 5 关，共 20 关：

| 段位 | 年级 |
|---|---|
| 🌱 Sprouts | 1–2 |
| 🧭 Explorers | 3–5 ← Arya 在这里 |
| 🗺️ Adventurers | 6–8 |
| 🎓 Scholars | 9–12 |

每段的 5 关：

1. **🗣️ Say It Out Loud** — 大声朗读句子，系统按词命中率打分（≥75% 通过）
2. **🧩 Fill the Blank** — 填空，例如
   > *I want to go to the ___.* → school / playground / library / zoo
   **随便选哪个都算对**，说整句还会额外表扬 🌟
3. **⚡ Grammar Power** — 语法题，只有一个正确答案
   > *She ___ to school every day.* → go / **goes** / going
   答错两次会自动公布答案并解释原因
4. **🔍 Word Detective** — 词汇、反义词、比喻、推理，最后一题是开放式口头回答
5. **✨ Make Up Your Own Story** — **自己编故事**！给一个开头提示 + 关键词提示，说满字数就算过，故事会自动存进 **My Story Book**

闯关机制：
- 通关一关（答对一半以上）才解锁下一关 🔒
- 按正确率给 ⭐⭐⭐
- 💎 宝石奖励：答对 +3、通关 +10、记录一本书 +5、讲一个故事 +15
- 每题都有 🔊 **Read it to me**（把题目念出来）和 ⌨️ **Type it instead**（没有麦克风时的备用方案）

### 5. ✨ My Story Book
她说出来的每一个故事都会被写下来存在这里，可以让电脑 🔊 念回给她听。

---

## 📁 文件结构

```
Arya-Reading-Log/
├── index.html        页面结构
├── styles.css        样式（明亮童趣风 + 手机自适应）
├── app.js            全部逻辑：语音识别/合成、评分、闯关、记录、彩带
├── data/
│   ├── books.js      120 本书的书目数据（按年级 1–12）
│   └── quests.js     20 关题库（4 段 × 5 关）
├── start.command     双击启动（带麦克风权限的本地服务器）
└── README.md
```

## 🛠️ 想加内容？

- **加书**：编辑 `data/books.js`，在对应年级数组里加一条
  `{ id:'g3-xxx', title:'', author:'', emoji:'📗', pages:120, minutes:20, blurb:'', tags:['Funny'] }`
- **加题**：编辑 `data/quests.js`，题型有 `repeat / fill / grammar / vocab / talk / story`
- **改名字**：`app.js` 顶部 `DEFAULT_STATE` 里的 `name: 'Arya'`

## ⚠️ 小提示
- 记录存在**这台电脑的这个浏览器**里。换浏览器或清理浏览数据会清空记录。
- 语音识别用的是浏览器内置的 Web Speech API；Chrome 下会把音频发给浏览器自带的识别服务，本应用本身不保存也不上传任何录音。

# Haddhi (हड्डी)

> Turn your UI into its skeleton.
> Auto-generate skeleton loading states from real components.

---

## ✨ Overview

**Haddhi** is a developer tool that automatically generates **skeleton UIs** by analyzing your actual components.

Instead of manually designing loading states, Haddhi inspects your rendered UI and creates matching skeleton layouts—saving time and ensuring visual consistency.

---

## 🚀 Features

- ⚡ Auto-generate skeleton UI from real components
- 🧠 DOM-based layout detection
- 🎯 Pixel-aligned skeleton placeholders
- 🧩 Works with React (more frameworks coming)
- 🛠 CLI support for generating skeletons
- 💡 No manual skeleton design needed

---

## 📦 Installation

Install the React package in your app:

```bash
npm install @haddhi/react
```

or

```bash
pnpm add @haddhi/react
```

Run the CLI package without installing it globally:

```bash
npx haddhi build --url http://localhost:5173 --component ProjectCard
```

or

```bash
pnpm dlx haddhi build --url http://localhost:5173 --component ProjectCard
```

You can also install the command globally:

```bash
npm install -g haddhi
haddhi build --url http://localhost:5173 --component ProjectCard
```

---

## 🧑‍💻 Usage

### 1. Wrap your component

```tsx
import { Haddhi } from "@haddhi/react";

<Haddhi loading={isLoading}>
  <ProjectCard data={data} />
</Haddhi>;
```

---

### 2. Generate skeletons via CLI

```bash
npx haddhi build --url http://localhost:5173 --component ProjectCard
```

This will:

- Launch your app
- Analyze DOM structure
- Generate skeleton layout files

---

### 3. Use generated skeleton

When `loading=true`, Haddhi will automatically render the generated skeleton.

---

## ⚙️ How It Works

1. You wrap components using `<Haddhi />`
2. Haddhi CLI scans your running app
3. It reads layout using DOM measurements (`getBoundingClientRect`)
4. Generates skeleton structure (JSON or component)
5. During loading, skeleton replaces real UI

---

## 📁 Project Structure (Example)

```
haddhi/
  ├── packages/
  │   ├── core/
  │   ├── react/
  │   └── cli/
  ├── examples/
  │   └── next-app/
  ├── package.json
  └── tsconfig.json
```

---

## 🛣 Roadmap

- [ ] React support (MVP)
- [ ] Next.js integration
- [ ] Vue support
- [ ] Tailwind-based skeleton styling
- [ ] Visual editor for skeleton tweaking
- [ ] Plugin system

---

## 🤝 Contributing

Contributions are welcome!

```bash
git clone https://github.com/your-username/haddhi
cd haddhi
pnpm install
```

---

## 📄 License

MIT License

---

## 👤 Author

**Prince (Bharat)**
Frontend Developer | Nepal 🇳🇵

---

## 💡 Inspiration

Inspired by tools like modern skeleton UI systems and the need to eliminate repetitive loading state design.

---

## ⭐ Support

If you like this project, consider giving it a star ⭐ on GitHub!

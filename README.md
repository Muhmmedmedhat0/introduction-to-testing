# Testing JavaScript

Companion repository for Steve Kinney's **[Introduction to Testing](https://frontendmasters.com/courses/introduction-to-testing/)** course on Frontend Masters.

A progressive, hands-on monorepo that teaches JavaScript testing from the ground up — starting with basic assertions and building up to full-stack component testing, API mocking, and end-to-end browser tests.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Examples Overview](#examples-overview)
- [Testing Concepts Covered](#testing-concepts-covered)
- [Architecture](#architecture)
- [Running Tests](#running-tests)
- [Course Workflow](#course-workflow)

---

## Tech Stack

| Area | Tools |
|---|---|
| **Runtime** | Node.js (ES Modules) |
| **Test Runner** | [Vitest](https://vitest.dev/) v2.1 |
| **Component Testing** | React 18, Svelte 4, Lit — via `@testing-library/react`, `@testing-library/svelte`, `@testing-library/dom` |
| **API Mocking** | [MSW](https://mswjs.io/) (Mock Service Worker) v2.4 |
| **E2E Testing** | [Playwright](https://playwright.dev/) v1.47 |
| **Build / Dev** | [Vite](https://vitejs.dev/) v5.4 |
| **Styling** | Tailwind CSS v3.4 |
| **Formatting** | Prettier v3.3 |
| **Backend** | Express (task-list example only) |

---

## Project Structure

```
introduction-to-testing/
├── packages/
│   ├── css-configuration/          # Shared Tailwind/PostCSS config
│   └── get-error-message/          # Utility: extract error messages safely
│
└── examples/
    ├── scratchpad/                 # Minimal Vitest setup + fake timers
    ├── basic-math/                 # Arithmetic, counter, fibonacci
    ├── strictly-speaking/          # .toEqual vs .toStrictEqual
    ├── guess-the-number/           # CLI game, class testing
    ├── utility-belt/               # Error testing (.toThrow)
    ├── characters/                 # ES6 classes, prototype equality
    ├── logjam/                     # Mocking env vars, console.log, dependency injection
    ├── element-factory/            # DOM, React, Svelte, Lit component testing
    ├── calculator/                 # DOM integration + Playwright (stub)
    ├── accident-counter/           # React + reducer testing
    ├── directory/                  # MSW API mocking, async components
    └── task-list/                  # Full-stack app: Express + React + MSW + Playwright
```

Each example is an independent npm workspace package with its own `package.json`, `vitest.config.js`, and source files. Tests use a `*.test.js` convention alongside the implementation file.

---

## Getting Started

```bash
# Install all workspace dependencies from the root
npm install

# Run tests in a specific example
cd examples/basic-math
npm test
```

---

## Examples Overview

### 1. scratchpad
Minimal setup — a single test file. Covers `vi.useFakeTimers()` and basic assertions.

### 2. basic-math
Tests arithmetic functions (`add`, `subtract`, `multiply`, `divide`), a counter with `setInterval`, and a fibonacci generator. Introduces `describe`/`it` blocks, `.todo()`, `.skip`, and test organization.

### 3. strictly-speaking
Demonstrates the difference between `toEqual` and `toStrictEqual` — especially around class instances and undefined values.

### 4. guess-the-number
Tests a CLI number-guessing game. Covers `toBeInstanceOf`, `toBeTypeOf`, and testing class-based logic.

### 5. utility-belt
Tests a `stringToNumber` conversion function. Focuses on error testing with `.toThrow()`.

### 6. characters
Tests `Person` and `Character` ES6 classes with dice-rolling mechanics. Highlights that `toEqual` does not match the prototype chain (class instances vs plain objects).

### 7. logjam
Teaches mocking: `import.meta.env`, `console.log` spies, and dependency injection patterns for logging and HTTP requests.

### 8. element-factory
Multi-framework component testing:
- Vanilla DOM (`button.js`) with `@testing-library/dom`
- React (`alert-button.jsx`) with `@testing-library/react`
- Svelte (`tabs.svelte`) with `@testing-library/svelte`
- Lit web components (`login-form.js`)
- localStorage mocking (`secret-input`, `local-storage.test.js`)

### 9. calculator
DOM integration testing: renders a calculator via HTML template, simulates clicks with `fireEvent`. Includes a Playwright E2E test stub.

### 10. accident-counter
React counter with `useReducer`. Tests both the pure reducer function and the rendered component using `data-testid` selectors.

### 11. directory
Introduces MSW (Mock Service Worker) for API mocking. Tests an async React component (`User`) that fetches user data, using `waitFor` and `screen.findByText`.

### 12. task-list **(most complex)**
Full-stack task management app:
- **Backend**: Express REST API (in-memory CRUD)
- **Frontend**: React with `useReducer` + action creators + API client
- **Mocks**: MSW handlers (exercise — handlers array is empty)
- **E2E**: Playwright spec for browser-level testing
- **Setup**: `concurrently` runs Vite + Express together

---

## Testing Concepts Covered

| Concept | Where |
|---|---|
| Basic assertions (`toBe`, `toEqual`) | scratchpad, basic-math |
| Test organization (`describe`, `it`, `.todo`, `.skip`) | basic-math, utility-belt |
| Strict equality (`toStrictEqual`) | strictly-speaking |
| Type checking (`toBeInstanceOf`, `toBeTypeOf`) | guess-the-number |
| Error testing (`toThrow`) | utility-belt |
| Class / prototype equality | characters |
| Mocking env vars & console | logjam |
| Dependency injection | logjam |
| Fake timers (`vi.useFakeTimers`) | scratchpad, basic-math (counter) |
| DOM testing (`screen`, `fireEvent`) | element-factory, calculator |
| React component testing | element-factory, accident-counter, directory, task-list |
| Svelte component testing | element-factory |
| Lit / web component testing | element-factory |
| localStorage mocking | element-factory |
| Reducer / pure function testing | accident-counter |
| MSW API mocking | directory, task-list |
| Async testing (`waitFor`, `findBy*`) | directory, task-list |
| E2E testing (Playwright) | calculator, task-list |
| Full-stack testing (API + client + E2E) | task-list |

---

## Architecture

### Monorepo with npm Workspaces
The root `package.json` declares all examples and shared packages as workspaces. Shared utilities (`css-configuration`, `get-error-message`) are consumed via workspace dependency resolution.

### Test Environments
- **`node`** — pure logic tests (basic-math, characters, guess-the-number, etc.)
- **`happy-dom`** — DOM/component tests (element-factory, calculator, directory, task-list)

### MSW Mock Pattern (directory & task-list)
```
src/
└── mocks/
    ├── handlers.js      # MSW request handlers (empty — student exercise)
    ├── server.js         # MSW server setup
    └── tasks.json        # Fixture data
```

### Component Architecture (task-list)
```
Application
├── CreateTask
└── Tasks
    └── Task
        └── DateTime
```
State management via `useReducer` with TypeScript discriminated union actions.

---

## Running Tests

```bash
# Within any example directory:
npm test          # Run vitest in watch mode
npm start         # Open Vitest UI dashboard (if configured)

# E2E tests (calculator, task-list):
npx playwright test

# Full-stack app (task-list):
npm start         # Concurrently runs Vite + Express
```

---

## Course Workflow

This repo is designed as a hands-on course companion. Key patterns you'll encounter:

- **`.todo()` tests** — stubs for you to implement
- **Empty function bodies** — fill in the implementation to make tests pass
- **Empty MSW handlers** — write request interceptors as exercises
- **Intentionally failing tests** — demonstrate gotchas (e.g., class equality)
- **Skipped tests (`.skip`)** — reveal later concepts incrementally

---

## License

This repository is for educational use alongside the Frontend Masters course.

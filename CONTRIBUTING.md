# Contributing to React Native Toast Message (TypeScript)

First off, thank you for considering contributing to this project! It's people like you that make this library better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (React Native version, iOS/Android, device/simulator)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any relevant examples from other libraries**

### Pull Requests

- Fill in the required template
- Follow the TypeScript and React Native style guides
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass
- Update CHANGELOG.md with your changes

## Development Setup

1. Fork and clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/react-native-toast-message-ts.git
cd react-native-toast-message-ts
```

2. Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

3. Install dependencies

```bash
pnpm install
```

4. Run tests

```bash
pnpm test
```

5. Build the library

```bash
pnpm run build
```

## Style Guidelines

### TypeScript Style Guide

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Testing

- Write tests for all new features
- Maintain or improve code coverage
- Follow existing test patterns
- Use descriptive test names

## Project Structure

```
src/
├── __tests__/          # Test files
├── colors.ts           # Color constants and utilities
├── index.ts            # Main export file
├── Toast.tsx           # Main Toast component
├── ToastContainer.tsx  # Container component
├── ToastIcon.tsx       # Icon components
├── ToastManager.ts     # State management
└── types.ts            # TypeScript type definitions
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉

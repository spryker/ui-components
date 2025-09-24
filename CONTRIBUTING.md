# Contribution Guide

Thank you for considering contributing to our project! Your support and involvement are crucial to the success of the project. Please follow the guidelines below to make the process smooth for everyone.

---

## Getting Started

**Understand the Project**

    - Familiarize yourself with the project by reading the [README](https://github.com/spryker/ui-components/blob/master/README.md).
    - Check out the [documentation](https://docs.spryker.com/docs/dg/dev/frontend-development/202410.0/marketplace/marketplace-frontend.html) for details about the library.

---

## Ways to Contribute

1. **Report Issues**

    - Found a bug? Open a new issue [here](https://github.com/spryker/ui-components/issues).
    - Include:
        - A clear and concise description.
        - Steps to reproduce.
        - Screenshots, if applicable.

2. **Improve Documentation**

    - Found a typo or outdated information? Feel free to suggest updates.

3. **Submit Code**

    - Follow the instructions in the **Development Workflow** section below.

4. **Propose Features**
    - Use the [issue tracker](https://github.com/spryker/ui-components/issues) to suggest features or enhancements.

---

## Development Workflow

### 1. Set Up Your Environment

-   Fork the repository and clone it to your local machine.
-   Install dependencies:  
    \`\`\`bash
    npm install
    \`\`\`

### 2. Create a Branch

-   Always work on a new branch.  
    \`\`\`bash
    git checkout -b (feature | bugfix)/your-feature-name
    \`\`\`

### 3. Make Your Changes

-   Ensure your code follows the project's coding standards.
-   **For more details about commit messages and code formatting, please refer to the [README](https://github.com/spryker/ui-components/blob/master/README.md).**
-   Run tests to validate your changes:  
    \`\`\`bash
    npm run affected:test
    \`\`\`

### 4. Commit and Push

-   Commit your changes with a meaningful message(follow [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/#specification)):  
    \`\`\`bash
    git commit -m "fix: meaningful description here"
    \`\`\`
-   Push your branch to your forked repository:  
    \`\`\`bash
    git push origin your-branch-name
    \`\`\`

### 5. Submit a Pull Request (PR)

-   Open a pull request to the main repository.
-   Provide a detailed description of your changes.
-   Link any related issues.

---

## Coding Standards

1. **Formatting**

    - Use the \`.editorconfig\` file for consistency.
    - **For more information about formatting, check the [README](https://github.com/spryker/ui-components/blob/master/README.md).**

2. **Testing**
    - Write unit tests for all new features and bug fixes.
    - Ensure all tests pass before submitting.

---

## Additional Notes

-   Be respectful in your communications.
-   Thank you for contributing—every bit helps!

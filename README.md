# Kidnappings & Missing Persons Uganda

This project aims to document Ugandans who might get arrested, detained, kidnapped, or go missing following the planned #March2Parliament protests on July 23, 2024.

![Kidnappings & Missing Persons Uganda](./src/img/screenshot.png)

Join the Slack Workspace to collaborate with other developers.

[![slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)](https://join.slack.com/t/marchtoparliamentug/shared_invite/zt-2n63veudi-TjcscMIMsO31AqN7rGV7ZQ)

## How to Contribute?

We welcome contributions from everyone. Here's how you can help:

### Reporting Issues

1. **Search Existing Issues**: Before opening a new issue, please check if the issue already exists.
2. **Open a New Issue**: If your issue is new, [open a new issue](https://github.com/wkambale/missingpersons/issues/new/choose) and provide detailed information about the problem.
	- You can choose from different issue templates:
		- [Bug Report](https://github.com/wkambale/missingpersons/issues/new?template=bug_report.md)
		- [Feature Request](https://github.com/wkambale/missingpersons/issues/new?template=feature_request.md)

### Expressing Interest / Assignment of Issues

1. **Browse Open Issues**: Look through the [open issues](https://github.com/wkambale/missingpersons/issues) to find something you would like to work on.
2. **Comment on the Issue**: If you find an issue you'd like to work on, comment on the issue expressing your interest.
3. **Wait for Assignment**: A project maintainer will assign the issue to you if it is available. Once assigned, you can start working on the issue.

### Contributing Code

1. **Fork the Repository**: Click the 'Fork' button at the top right of this page to create a copy of this repository under your GitHub account.

2. **Clone the Forked Repository**:
    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/missingpersons.git
    cd missingpersons
    ```

3. **Create a New Branch**:
    ```bash
    git checkout -b your-feature-branch
    ```

4. **Make Your Changes**:
	- Add the person's image to the `img/` directory.
	- Update the `data.json` file with the required information.

   Example entry in `data.json`:
    ```json
    [
        {
            "id": 1,
            "name": "Missing Person 1",
            "image": "img/image_of_person.jpeg",
            "last_known_location": "Kamwokya",
            "taken_time": "15:46 23-07-2024",
            "holding_location": "Held at Police Station, Prison, Unknown Location",
            "security_organ": "Taken by Police, Army, Intelligence",
            "status": "Missing",
            "twitter": "@handle_of_person",
            "sex": "male"
        }
    ]
    ```

5. **Stage Your Changes**:
    ```bash
    git add .
    ```

6. **Commit Your Changes**:
    ```bash
    git commit -m "Description of your changes"
    ```

7. **Push Your Changes to Your Fork**:
    ```bash
    git push origin your-feature-branch
    ```

8. **Create a Pull Request**:
	- Go to the original repository on GitHub.
	- Click the 'New Pull Request' button.
	- Select your feature branch and create the pull request.
	- Use the [Pull Request Template](https://github.com/wkambale/missingpersons/blob/main/.github/PULL_REQUEST_TEMPLATE.md) to ensure all necessary information is included.

### Reviewing Pull Requests

We use Pull Requests (PRs) for code review. Here's how to review:

1. **Review the Code**: Check for code quality, functionality, and style.
2. **Test the Code**: Test the code locally where possible to check for any breaking changes.
3. **Provide Feedback**: Leave comments on the PR for any changes or improvements needed.
4. **Approve the PR**: If the changes are satisfactory, approve the PR.


## License

This project is licensed under the [MIT License](https://github.com/wkambale/missingpersons/blob/main/LICENSE).
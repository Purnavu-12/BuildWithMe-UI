# Security

V0 accepts code through reviewed GitHub pull requests only. The website does not evaluate arbitrary submissions, require credentials, or call hosted AI providers.

Do not disclose exploitable vulnerabilities or sensitive information in public issues. Use GitHub private vulnerability reporting when enabled on the published repository. If no private reporting route is configured, contact the maintainer privately before sharing details. Maintainers must enable private reporting before public launch.

Report the affected version, reproduction steps, impact, and suggested mitigation without including secrets. Rotate exposed credentials immediately; deleting a file is not sufficient.

CI validates metadata paths, declared imports, provenance, and distribution boundaries. These checks supplement code review; they are not a sandbox for executing hostile code.

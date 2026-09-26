const required = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_REPOSITORY_URL:
    process.env.NEXT_PUBLIC_REPOSITORY_URL || 'https://github.com/Purnavu-12/BuildWithMe-UI',
};

const errors = [];

for (const [name, value] of Object.entries(required)) {
  if (!value) {
    errors.push(`${name} is required for a production build.`);
    continue;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') errors.push(`${name} must use HTTPS.`);
  } catch {
    errors.push(`${name} must be a valid absolute URL.`);
  }
}

if (required.NEXT_PUBLIC_SITE_URL?.includes('localhost')) {
  errors.push('NEXT_PUBLIC_SITE_URL cannot point to localhost in production.');
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log('Production URLs are valid.');

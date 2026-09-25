import fs from 'node:fs/promises';
import path from 'node:path';
import { categories, engines } from '../packages/registry-schema/src/index';
export async function scaffold(root: string, id: string, category = 'buttons', engine = 'css') {
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id))
    throw new Error('Use a lowercase kebab-case ID.');
  if (
    !(categories as readonly string[]).includes(category) ||
    !(engines as readonly string[]).includes(engine)
  )
    throw new Error('Invalid category or engine.');
  const folder = path.join(root, 'registry', category, id);
  await fs.mkdir(folder, { recursive: true });
  try {
    await fs.access(path.join(folder, 'metadata.json'));
    throw new Error('Component already exists. Choose a new ID.');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
  const name = id
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('');
  const title = id
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(' ');
  const metadata = {
    schemaVersion: 1,
    id,
    title,
    description: 'Describe the behavior and when to use this component.',
    category,
    framework: 'react',
    engine,
    tags: [category, engine],
    files: [
      `${category}/${id}/${id}.tsx`,
      `${category}/${id}/${id}.css`,
      'shared/use-animation.ts',
      'shared/base.css',
      'shared/LICENSE',
    ],
    preview: `${category}/${id}/preview.tsx`,
    dependencies: engine === 'css' ? {} : { [engine]: engine === 'motion' ? '13.4.4' : '4.5.0' },
    author: { name: 'BuildWithMe-UI contributors' },
    license: 'MIT',
    origin: 'original',
    adaptations: [],
    usage: `import ${name} from "@/components/buildwithme/${id}/${id}";\n\n<${name} />`,
    accessibility:
      'Document keyboard behavior, reduced motion, focus management, and screen-reader labels before submitting.',
    props: [
      {
        name: 'paused',
        type: 'boolean',
        default: 'false',
        description: 'Pause decorative animation.',
      },
    ],
  };
  await fs.writeFile(path.join(folder, 'metadata.json'), JSON.stringify(metadata, null, 2) + '\n', {
    flag: 'wx',
  });
  await fs.writeFile(
    path.join(folder, `${id}.tsx`),
    `// MIT · BuildWithMe-UI contributors.\n'use client';\nimport {useAnimation,type AnimationProps} from '../../shared/use-animation';\nimport '../../shared/base.css';\nimport './${id}.css';\nexport default function ${name}({paused=false}:AnimationProps){const {ref,active}=useAnimation(paused);return <div ref={ref} className="bw-demo" data-active={active}><button className="bw-button">${title}</button></div>;}\n`,
    { flag: 'wx' },
  );
  await fs.writeFile(
    path.join(folder, `${id}.css`),
    `/* ${title}: scope selectors to bw-${id}. */\n`,
    { flag: 'wx' },
  );
  await fs.writeFile(
    path.join(folder, 'preview.tsx'),
    `'use client';\nexport {default} from './${id}';\n`,
    { flag: 'wx' },
  );
  await fs.writeFile(
    path.join(folder, 'README.md'),
    `# ${title}\n\nExplain usage, accessible behavior, dependencies, and provenance here. Replace scaffold descriptions before opening a PR.\n`,
    { flag: 'wx' },
  );
  return folder;
}
if (process.argv[1]?.replaceAll('\\', '/').endsWith('/new-component.ts')) {
  const [id, category, engine] = process.argv.slice(2);
  if (!id)
    throw new Error(
      'Usage: pnpm component:new <id> [buttons|text|cards|backgrounds|ai] [css|motion|animejs]',
    );
  console.log(
    `Created ${await scaffold(process.cwd(), id, category, engine)}. Complete metadata and documentation, then run pnpm registry:validate and pnpm dev.`,
  );
}

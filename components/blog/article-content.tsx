import * as React from 'react';

type ArticleContentProps = {
  content: string;
};

function inlineContent(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^\)]+\))/g);

  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);

    if (!link) {
      return (
        <React.Fragment key={`${part}-${index}`}>
          {part}
        </React.Fragment>
      );
    }

    return (
      <a
        key={`${link[1]}-${index}`}
        href={link[2]}
        target={
          link[2].startsWith('http') ? '_blank' : undefined
        }
        rel={
          link[2].startsWith('http')
            ? 'noreferrer'
            : undefined
        }
        className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:text-foreground"
      >
        {link[1]}
      </a>
    );
  });
}

export function ArticleContent({
  content,
}: ArticleContentProps) {
  const lines = content.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim() || 'text';
      const codeLines: string[] = [];
      index += 1;

      while (
        index < lines.length &&
        !lines[index].startsWith('```')
      ) {
        codeLines.push(lines[index]);
        index += 1;
      }

      index += 1;
      blocks.push(
        <pre
          key={`code-${index}`}
          className="overflow-x-auto rounded-xl border border-border bg-background/80 p-5 text-sm leading-6 text-foreground"
        >
          <code data-language={language}>
            {codeLines.join('\n')}
          </code>
        </pre>,
      );
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const Heading = `h${heading[1].length}` as
        | 'h1'
        | 'h2'
        | 'h3';
      blocks.push(
        <Heading
          key={`heading-${index}`}
          className="font-display scroll-mt-24 text-foreground"
        >
          {inlineContent(heading[2])}
        </Heading>,
      );
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (
        index < lines.length &&
        /^[-*]\s+/.test(lines[index])
      ) {
        items.push(lines[index].replace(/^[-*]\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ul
          key={`list-${index}`}
          className="list-disc space-y-2 pl-6 text-muted-foreground"
        >
          {items.map((item) => (
            <li key={item}>{inlineContent(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (
        index < lines.length &&
        /^\d+\.\s+/.test(lines[index])
      ) {
        items.push(lines[index].replace(/^\d+\.\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ol
          key={`ordered-${index}`}
          className="list-decimal space-y-2 pl-6 text-muted-foreground"
        >
          {items.map((item) => (
            <li key={item}>{inlineContent(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    if (line.startsWith('> ')) {
      blocks.push(
        <blockquote
          key={`quote-${index}`}
          className="border-l-2 border-primary pl-5 italic text-muted-foreground"
        >
          {inlineContent(line.slice(2))}
        </blockquote>,
      );
      index += 1;
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith('#') &&
      !lines[index].startsWith('```') &&
      !/^[-*]\s+/.test(lines[index]) &&
      !/^\d+\.\s+/.test(lines[index]) &&
      !lines[index].startsWith('> ')
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }

    blocks.push(
      <p
        key={`paragraph-${index}`}
        className="text-lg leading-8 text-muted-foreground"
      >
        {inlineContent(paragraph.join(' '))}
      </p>,
    );
  }

  return <div className="space-y-7">{blocks}</div>;
}

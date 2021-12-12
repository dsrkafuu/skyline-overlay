import './STicker.scss';
import cn from 'classnames';

export type STickerClass = 'oh' | 'h' | 's' | 'cd' | 'c' | 'd' | 'space';

export interface STickerProps {
  pcts: number[]; // numbers from left to right
  classes: STickerClass[];
  space: number; // number of space
  align?: 'left' | 'right';
  className?: string;
}

function STicker({
  pcts,
  classes,
  space = 0,
  align = 'left',
  className,
}: STickerProps) {
  const localPcts = pcts.map((pct) => Math.floor(pct) || 0);
  const localClasses = [...classes];
  if (localPcts.length > 3) {
    localPcts.splice(3, localPcts.length - 3);
  }
  if (localClasses.length > 3) {
    localClasses.splice(3, localClasses.length - 3);
  }
  if (align === 'right') {
    localPcts.unshift(space);
    localClasses.unshift('space');
  } else {
    localPcts.push(space);
    localClasses.push('space');
  }

  return (
    <div className={cn('s-ticker', className)}>
      {localPcts.map((pct, idx) => (
        <span
          className={`s-ticker-${localClasses[idx]}`}
          style={{ flexGrow: pct }}
          key={idx}
        ></span>
      ))}
    </div>
  );
}

export default STicker;

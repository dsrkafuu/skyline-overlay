import './STicker.scss';

interface STickerProps {
  pcts: Array<number | string>; // percentages
  type?: 'dps' | 'healer';
  align?: 'left' | 'right';
}

function parseCSSPct(pct: number | string) {
  if (typeof pct === 'number') {
    const num = Math.floor(Math.abs(pct));
    if (num === 0) {
      return '0';
    } else {
      return `${num}%`;
    }
  } else {
    pct = `${pct}`.trim();
    const num = /^([0-9]+)%$/i.exec(pct);
    if (num && num[1] && Number(num[1]) > 0) {
      return `${pct}`;
    } else {
      return '0';
    }
  }
}

function STicker({ pcts, type = 'dps', align = 'left' }: STickerProps) {
  const cssPcts = pcts.map(parseCSSPct);
  if (cssPcts.length > 3) {
    cssPcts.splice(3, cssPcts.length - 3);
  }

  return (
    <div className={`s-ticker s-ticker-${type} s-ticker-${align}`}>
      {cssPcts.map((pct, idx) => (
        <span
          className={`s-ticker-${(idx + 10).toString(36)}`}
          style={{ width: pct }}
          key={idx}
        ></span>
      ))}
    </div>
  );
}

export default STicker;

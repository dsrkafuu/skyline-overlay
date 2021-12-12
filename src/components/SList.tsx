import './SList.scss';
import cn from 'classnames';

export interface SListRow {
  key: string;
  value: React.ReactNode;
  pct?: boolean;
}

interface SListProps {
  items: SListRow[][];
  className?: string;
}

function SList({ items, className }: SListProps) {
  return (
    <div className={cn('s-list', className)}>
      {items.map((section, idx) => (
        <div className='s-list-section' key={idx}>
          {section.map((row) => (
            <div className='s-list-row' key={row.key}>
              <span>{row.key}</span>
              {row.pct ? (
                <div className='s-list-row-pct'>
                  <span className='g-number'>
                    {((row.value || '0') as string).split('%')[0]}
                  </span>
                  <span className='g-counter'>%</span>
                </div>
              ) : (
                <span>{row.value}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SList;

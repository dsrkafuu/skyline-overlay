import './SList.scss';

export interface SListRow {
  key: string;
  value: React.ReactNode;
  pct?: boolean;
}

interface SListProps {
  items: SListRow[][];
}

function SList({ items }: SListProps) {
  return (
    <div className={'s-list'}>
      {items.map((section, idx) => (
        <div className='s-list-section' key={idx}>
          {section.map((row) => (
            <div className='s-list-row' key={row.key}>
              <span>{row.key}</span>
              {row.pct ? (
                <div className='s-list-row-pct'>
                  <span className='s-number'>
                    {((row.value || '0') as string).split('%')[0]}
                  </span>
                  <span className='s-counter'>%</span>
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

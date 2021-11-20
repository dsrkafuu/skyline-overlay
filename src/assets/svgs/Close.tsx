import * as React from 'react';

function SvgClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='1em'
      height='1em'
      className='icon'
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={32}
        d='M368 368L144 144m224 0L144 368'
      />
    </svg>
  );
}

export default SvgClose;

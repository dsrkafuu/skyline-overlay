import * as React from 'react';

function SvgIChevronUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 512 512'
      className='icon'
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={32}
        d='M112 328l144-144 144 144'
      />
    </svg>
  );
}

export default SvgIChevronUp;

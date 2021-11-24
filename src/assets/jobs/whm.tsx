import * as React from 'react';

function SvgWhm(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='1em'
      height='1em'
      className='ijob'
      {...props}
    >
      <path d='M237 187q14 0 24-10t10-23.5-10-23.5-23.5-10-23.5 10-10 23.5 10 23.5 23 10zm30-123q-6-1-11.5 1t-6.5 5.5 1 7.5 6 6l3 2q47 21 47 69 0 27-18.5 49T242 226q-20 0-36-7-9-3-21-12l-2-2q-9-6-14-1-3 4-1 12t5 12q16 19 53 34h1q13 5 13 13v136q0 13 5.5 25t10.5 12 10-12 5-25V277q0-5 4-12t9-9q17-8 34-29 27-32 27-74 0-34-23-59t-55-30z' />
    </svg>
  );
}

export default SvgWhm;

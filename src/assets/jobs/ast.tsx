import * as React from 'react';

function SvgAst(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='1em'
      height='1em'
      className='ijob'
      {...props}
    >
      <path d='M266 168H142q-9 0-12.5 3t-2.5 17q-2 31 0 87 0 7 4.5 10.5t11 3.5 10.5-4 4-10q1-15 2-45v-1q0-20 5-25 3-4 15-3h1q25 2 49 1 13 0 18.5 5.5T253 234l2 91q0 21-1 27-2 7-8 8.5t-24 1.5l-37-1q-15 0-20-1t-6.5-5.5-.5-17.5v-17q0-1-2-3l-4-4q-63 40-81 109 27-28 48-45l3-3q6-7 9-7.5t.5 11T142 393q7 2 23 2h87q23-1 29.5-7t6.5-29l2-146q0-9-2-23-2-22-22-22zm85 11q-6-7-4-26v-9q0-18-2.5-24t-9-8-24.5-2l-101 1q-17 0-16 16 0 13 14 14l88 3q22 0 21 22v144q0 13 10 14 14 1 18-11 2-8 2-16v-9q1-20 0-30 1-25 6-37 6-14 20-24 10-6 30-17 25-14 38-23-25-5-49.5 1T351 179z' />
    </svg>
  );
}

export default SvgAst;

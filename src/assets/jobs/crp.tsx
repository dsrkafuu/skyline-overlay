import * as React from 'react';

function SvgCrp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='1em'
      height='1em'
      className='ijob'
      {...props}
    >
      <path d='M435 351q-1-8-7-17t-10-5q2 7-3 9t-8-2.5 4-11.5q-39-37-57-57l-16 14q-1 1-2.5 0t2.5-8l2-3L134 64l-57 56 12 25 5-4 9 19 6-5 9 20 5-5 10 19 4-5 9 19 5-6 9 21 6-6 9 20 5-5 9 20 6-6 9 20 6-6 8 21 5-6 9 19 5-4 10 19 5-5 9 19 5-5 9 20 5-5 10 19 5-6 10 20 4-5 10 20 5-5 9 20 30-30 3 2q4 3 9 3t7.5-1.5 2.5-2.5-1-2q-4-4-2-10 4-11 16-4 6 3 7 10.5t-2.5 13T376 400l-14 15q-9 8-9 13 0 9 10 15t23 5v-5q-2-8 1-14 8-18 25-36l8-9q8-8 11-14 5-8 4-19zm-65-19q-9 0-9-9 0-5 2.5-7.5t6.5-2.5 7 2.5 3 6.5q0 10-10 10z' />
    </svg>
  );
}

export default SvgCrp;
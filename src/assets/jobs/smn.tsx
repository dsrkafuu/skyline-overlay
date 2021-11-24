import * as React from 'react';

function SvgSmn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='1em'
      height='1em'
      className='ijob'
      {...props}
    >
      <path d='M397 177q-1-2-2.5-6t-4.5-6-13-2.5-12 13.5q-2 8-1 26v9q-1 8-10 11-5 2-17 3h-1q-4 0-17-6-8-4-27-16-23-13-34-19-21-11-88-65-24-19-29-22l-8-6q-10-7-14.5-8.5T109 87q29 65 46 124 14 48 21 91 4 30 5 55l-1 18-46 1q-12 0-14.5 4t2.5 13q1 4 22 9 24 6 51 7 36 2 66-5 37-8 64-29 61-60 74-122 7-33-1-72zM211 363q-2-52-10-99-10-56-26-90l26 24q30 26 45 31l18 7q31 11 46 17 24 12 28 23l-5 7q-21 33-40 50-34 29-82 30z' />
    </svg>
  );
}

export default SvgSmn;

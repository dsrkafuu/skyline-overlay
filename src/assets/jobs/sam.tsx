import * as React from 'react';

function SvgSam(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='1em'
      height='1em'
      className='ijob'
      {...props}
    >
      <path d='M396 378q-32 38-78 52.5t-93 5.5q-19-3-33-10-27-12-13-26 7 4 54 7 33 3 65-9t57-37q15-16 18-37 3-23-11-43-9-12-23.5-17t-25.5-1q-13 5-15 20l-1-1 6 42q3 13-2 18-4 2-13 2h-63q-9 0-12-2-5-5-3-18l3-17q1-17-2-25t-10-10q-4-2-16-2-22-1-36-8-4-3-13-11-13-12-18-11-8 2-10 30 3 41 25 69 7 5 8 9t0 8v3q-1 5-5 7-8 4-23-12-26-28-36-68t-1.5-80.5T110 135q40-45 98.5-58T321 87q13 5 20.5 12t5 10.5T333 113t-22-4q-36-12-76-3-14 3-33 19-7 6-10 8-8 6-21 11-10 4-15 7l2-1q-4 3-7 6l-6 6q3-3-2 3-9 13-6 27t15 25q28 21 50.5 16.5T231 206q13-50 26-57 14 8 28 67l1 4q1 6 3 9t6 3l14-3q8-2 13-2.5t15 .5q23 2 48 21l1 1q12 14 15-11v1q-2-26-11-58-4-16-4-21 0-9 6-13 7-3 20 19 32 50 27.5 109T396 378zm-127-83q-6-69-12-76-7 7-13 76-1 12 7 12h11q8 0 7-12z' />
    </svg>
  );
}

export default SvgSam;

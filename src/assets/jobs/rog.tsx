import * as React from 'react';

function SvgRog(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='1em'
      height='1em'
      className='ijob'
      {...props}
    >
      <path d='M196 294l-10-6q-13-7-24-12-5-3-15-5.5t-13.5-4.5-8.5-5l-2-2-11 24 4 1q5 1 8.5 2.5t12.5 7 14 7.5q11 5 25 9l11 3zm-79-38l3-7-14-6-9 8q-6 8-8 19v11l14 6 14-31zm249 98q-9-4-30-11-24-8-33.5-13T278 314l-10-7q-16-11-28-18l-26 60 32 9 12 2q18 4 28 7.5t32 15.5q19 11 29 15 21 9 44 12 17 2 32 2l12-1v-1q-7-10-18-21-23-22-51-35zm-141-89l-14 31-5-2q-2-1-4 0l-10 24v1q1 1 2 1l5 3-13 31 10 4 38-88zm79-37l10 6q13 7 24 12 5 3 15 5.5t13.5 4.5 8.5 5l2 2 11-24-4-1q-5-1-8.5-2.5t-12.5-7-14-7.5q-18-7-36-12zm79 38l-3 6 15 7 8-8q7-8 8-19v-11l-14-7zm-184-73q8 4 23 15l10 7 28 18 26-60-32-9-12-2q-18-4-28-7.5T182 139q-19-11-29-15-21-9-44-12-17-3-32-2l-12 1 7 10q10 12 23 23 18 14 39 24 10 4 31 11 23 8 33 14h1zm77 64l13-31 5 2q2 1 4 0l10-24v-1l-2-2-5-2 13-31-10-4-38 88z' />
    </svg>
  );
}

export default SvgRog;

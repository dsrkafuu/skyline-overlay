import * as React from 'react';

function SvgMnk(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='1em'
      height='1em'
      className='ijob'
      {...props}
    >
      <path d='M269 120q19-16 28-38 5-10 5-18h-9q-11 2-22 6-16 6-30 17L98 208q-20 17-29 38-4 11-5 18h9q11-1 22-6 16-6 30-17l72-61zm73 87q13-12 22-26 6-11 9-21l2-9h-9q-11 1-22 6-16 6-30 17L170 295q-13 12-22 26-6 11-9 21l-2 9h9q11-1 22-6 16-6 30-17l72-61zm45 54l-72 61-72 60q-19 16-28 38-5 10-5 18h9q11-1 22-6 16-6 30-17l143-121q14-12 23-26 6-11 9-21l2-9h-9q-11 1-22 6-16 6-30 17z' />
    </svg>
  );
}

export default SvgMnk;
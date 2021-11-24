import * as React from 'react';

function SvgGnb(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='1em'
      height='1em'
      className='ijob'
      {...props}
    >
      <path d='M420 114q-17 24-35 48l-3 6q-7 9-21 24L187 364q24 14 51.5 16t53-8.5 42.5-32 23-48.5q2-12 8.5-16.5t13-4 12.5 6 5 15.5q-7 46-35 77l2 9q4 13 4 19 1 10-4.5 14.5T349 413q-5-2-14-8-12-7-14-5-39 22-84 19t-81-30l-48 34q-7 4-10.5 5t-5.5 0l-3-3q-1-2 0-5.5t5-10.5l35-48 4-6q6-9 21-24l156-155q-25-18-56.5-19.5t-59 13-43.5 41-16 58.5q0 9-4 15.5t-13 7.5-15.5-6-6.5-17q0-51 30.5-91.5T205 123q3 0 6.5-12.5T217 93q5-9 11-10t13 8q4 5 10 16t8 11q44 4 79 31 15-14 19-15l50-34q9-6 14-6 2 0 3 2l1 2q1 2 0 5.5t-5 10.5z' />
    </svg>
  );
}

export default SvgGnb;
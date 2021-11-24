import * as React from 'react';

function SvgBlu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='1em'
      height='1em'
      className='ijob'
      {...props}
    >
      <path d='M444 154q-3 0-17 3-1-17-15-33t-31-18q-10-2-19 3t-13 12 0 11q1 1 8 2t10 3q7 3 9 10 4 10 1 18t-10 10l-50 15-15 6q-13 4-20 6-12 3-26 3t-26-3q-7-2-19-6l-15-6-16-5Q75 153 68 154q-20 2-7 36v2q12 38 31 68 26 42 54 46 21 3 40-3 12-3 31-13 12-7 19-9 10-4 20-5 14 1 37 13-41 76-48 91l-3 7q-4 8-5 12-1 5 1 7 5 3 17-10l2-2q9-10 34-40 33-38 43-48 16 2 32 0 28-4 54-46 19-30 31-68v-1q13-35-7-37zM149 267q-17-2-29-17-10-12-16-29-5-14-4.5-21t29.5 2q25 8 56 21.5t35.5 18T214 253t-30 11.5-35 2.5zm214 0q-16 2-35-2.5T298 253t-6.5-11.5 35.5-18 56-21.5q29-9 29.5-2t-4.5 21q-6 17-16 29-12 15-29 17z' />
    </svg>
  );
}

export default SvgBlu;
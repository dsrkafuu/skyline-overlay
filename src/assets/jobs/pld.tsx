import * as React from 'react';

function SvgPld(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='1em'
      height='1em'
      className='ijob'
      {...props}
    >
      <path d='M388 71q-4 0-16.5 16T355 103h-71q-2 0-10-17l-3-7q-5-9-10-13l-5-2-5 2q-5 4-10 13l-3 7q-8 17-10 17h-71q-4 0-16.5-16T124 71q-7 0-13.5 7T104 96v132q0 49 17 90 16 39 45 67 24 23 59 45 17 11 31 18 13-7 31-18 35-22 59-45 29-28 45-67 17-41 17-90V96q0-11-6.5-18T388 71zM240 393q-5-3-11-6-13-9-25-19-17-15-30-31-16-20-24-48-6-22-6-41V136h96v257zm98-56q-18 23-44 42-13 9-22 14V136h96v112q0 19-6 41-8 28-24 48z' />
    </svg>
  );
}

export default SvgPld;
/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.svg' {
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

import React, { useEffect, useRef } from 'react';

export const Tableau = (props: { url: string }) => {
  const { url } = props;
  const ref = useRef(null);

  function initViz() {
    // @ts-ignore
    const { tableau } = window;
    console.log(tableau);
    console.log(window);
    new tableau.Viz(ref.current, url);
  }

  useEffect(() => {
    initViz();
  }, []);

  return (
    <div ref={ref} style={{ width: '100%', margin: 'auto', padding: '0', height: '2660px' }}></div>
  );
};

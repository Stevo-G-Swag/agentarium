import React, { useRef, useEffect } from 'react';

const Sandbox = ({ code }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.contentDocument.body.innerHTML = code;
    }
  }, [code]);

  return (
    <iframe ref={iframeRef} title="Sandbox" sandbox="allow-scripts" style={{ width: '100%', height: 400 }} />
  );
};

export default Sandbox;

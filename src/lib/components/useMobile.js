import { useState, useEffect } from 'react';

function useMobile(onlyMobile = false) {
  const initialValue = checkDevice();
  const [view, setView] = useState(initialValue);

  function handleWindowSizeChange() {
    setTimeout(() => {
      setView(checkDevice())
    }, 10);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);


  function checkDevice() {
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    userAgent = userAgent.toLowerCase();
    const tablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    let currentOrientation = null;
    if (window.innerWidth <= window.innerHeight) {
      currentOrientation = "portrait";
    } else {
      currentOrientation = "landscape";
    }
    return { mobile, tablet, portrait: currentOrientation === 'portrait', landscape: currentOrientation === 'landscape' };
  }

  return onlyMobile ? view.mobile : view;
}

export default useMobile;
import React, { useEffect } from 'react';

const injectCaptcha = (src: string) => {
  const headTag = window.document.getElementsByTagName('head')[0];
  if (headTag) {
    const scriptTag = window.document.createElement('script');
    scriptTag.src = src;
    headTag.appendChild(scriptTag);
  }
};

const executeCaptcha = (): Promise<string> => {
  const { grecaptcha } = window;
  return new Promise<string>((resolve, reject) => {
    window.onSubmitCaptcha = (token: string | null) => {
      if (token) {
        resolve(token);
      } else {
        reject(new Error('captcha verification failed'));
      }
      grecaptcha.reset();
    };
    grecaptcha.execute();
  });
};

export const useCaptchaV2 = (
  siteKey: string,
): {
  executeCaptcha: () => Promise<string>;
  CaptchaBadge: JSX.Element;
} => {
  useEffect(() => {
    injectCaptcha('https://www.google.com/recaptcha/api.js');
  }, []);
  return {
    executeCaptcha,
    CaptchaBadge: (
      <div
        className="g-recaptcha"
        data-sitekey={siteKey}
        data-size="invisible"
        data-callback="onSubmitCaptcha"
      />
    ),
  };
};

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      key="goatcounter"
      data-goatcounter="https://130.61.161.66/count"
      async
      src="https://130.61.161.66/count.js"
    />,
  ]);
};

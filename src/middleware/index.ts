import {
  handleBodyRequestParsing,
  handleCompression,
  handleCors,
  handleStaticFiles,
  handleUnknowRutes,
} from './Common';

import { handleAuthentication } from './Auth';

export default [
  handleBodyRequestParsing,
  handleStaticFiles,
  handleCompression,
  handleCors,
  handleAuthentication,
  handleUnknowRutes,
];

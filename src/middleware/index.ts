import { handleBodyRequestParsing, handleCompression, handleCors } from './Common';

import { handleAuthentication } from './Auth';

export default [handleBodyRequestParsing, handleCompression, handleCors, handleAuthentication];

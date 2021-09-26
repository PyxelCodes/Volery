

import Utilities from "./utils";
import WebpackModules from "./webpackmodules";

export default Utilities.memoizeObject({
    get React() { return WebpackModules.getByProps('createElement', 'cloneElement') },
    get ReactDOM() { return WebpackModules.getByProps("render", "findDOMNode"); },
})
import { R_RB, R_SB, R_CB } from './code-points.js'
import { FUNCTION_TYPE } from './token-types.js'

/**
 * @type {{ [key: number]: number }} Right Brace Variants of Left Brace Code Points
 */
const RofL = {}

RofL[R_RB] = `(`
RofL[R_SB] = `[`
RofL[R_CB] = `{`
RofL[FUNCTION_TYPE] = `(`

export default RofL

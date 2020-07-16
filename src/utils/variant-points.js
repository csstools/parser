import { L_RB, R_RB, L_SB, R_SB, L_CB, R_CB } from './code-points.js'
import { FUNCTION_TYPE } from './token-types.js'

/**
 * @type {{ [key: number]: number }} Right Brace Variants of Left Brace Code Points
 */
const RofL = {}

RofL[L_RB] = R_RB
RofL[L_SB] = R_SB
RofL[L_CB] = R_CB
RofL[FUNCTION_TYPE] = R_RB

export default RofL

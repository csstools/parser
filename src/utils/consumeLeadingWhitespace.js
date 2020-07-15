import { COMMENT_TYPE, SPACE_TYPE } from './node-types.js'
import tokenToNode from './token-to-node.js'

export default function consumeLeadingWhitespace(tokenizer, array) {
	// consume any skippable nodes following the at-rule name
	while (tokenizer()) {
		switch (tokenizer.type) {
			case COMMENT_TYPE:
			case SPACE_TYPE:
				array.push(tokenToNode.apply(tokenizer, tokenizer))

				continue
		}

		break
	}
}

import CSSComment from '../types/CSSObject/CSSNode/CSSComment.js'
import CSSSpace from '../types/CSSObject/CSSNode/CSSSpace.js'

export default function consumeLeadingWhitespace(tokenizer, array) {
	// consume any skippable nodes following the at-rule name
	while (tokenizer().item) {
		switch (tokenizer.item.constructor) {
			case CSSComment:
			case CSSSpace:
				array.push(tokenizer.item)

				continue
		}

		break
	}
}

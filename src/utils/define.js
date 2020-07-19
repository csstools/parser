const {
	assign,
	create: objectCreate,
	defineProperty: objectDefineProperty,
	defineProperties: objectDefineProperties,
} = Object

export { assign }

export function toDescriptor(bitmask, valueOrGetter, setter) {
	const descriptor = {
		configurable: bitmask & 2,
		enumerable:   bitmask & 1,
	}

	if (bitmask & 4) {
		descriptor.writable = true
	}

	if (bitmask & 8) {
		descriptor.get = valueOrGetter
		descriptor.set = setter
	} else {
		descriptor.value = valueOrGetter
	}

	return descriptor
}

export function toDescriptors(props) {
	const descriptors = {}

	for (const name in props) {
		descriptors[name] = toDescriptor(...props[name])
	}

	return descriptors
}

export function defineProp(object, name, bitmask, valueOrGetter, setter) {
	return objectDefineProperty(object, name, toDescriptor(bitmask, valueOrGetter, setter))
}

export function defineProps(object, props) {
	return objectDefineProperties(object, toDescriptors(props))
}

export function defineSuper(Class, Super) {
	Class.prototype = objectCreate(
		(Class.__proto__ = Super).prototype,
		{
			constructor: toDescriptor(6, Class),
		}
	)
}

export function defineClass(Class, Super, protoProps, staticProps) {
	return objectDefineProperties(
		Class,
		toDescriptors({

			...staticProps,
			prototype: [ 0, objectCreate(
				(Class.__proto__ = Super).prototype,
				toDescriptors({
					constructor: [ 6, Class ],
					...protoProps,
				})
			) ],
		})
	)
}

/*
| bitmask | enumerable | configurable | writable | accessor |
| ------- | ---------- | ------------ | -------- | -------- |
| 0       |            |              |          |          |
| 1       |    YES     |              |          |          |
| 2       |            |     YES      |          |          |
| 3       |    YES     |     YES      |          |          |
| 4       |            |              |   YES    |          |
| 5       |    YES     |              |   YES    |          |
| 6       |            |     YES      |   YES    |          |
| 7       |    YES     |     YES      |   YES    |          |
| 8       |            |              |          |   YES    |
| 9       |    YES     |              |          |   YES    |
| 10      |            |     YES      |          |   YES    |
| 11      |    YES     |     YES      |          |   YES    |
*/

// 2
export function toValueDescriptor(value) {
	return {
		value,
		configurable: true,
	}
}

// 3
export function toEnumerableValueDescriptor(value) {
	return {
		value,
		configurable: true,
		enumerable:   true,
	}
}

// 6
export function toWritableValueDescriptor(value) {
	return {
		value,
		configurable: true,
		writable:     true,
	}
}

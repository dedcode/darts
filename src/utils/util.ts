// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function classNames(...classes: any): string {
  return classes.filter(Boolean).join(' ');
}

// clsx function (conditional className construction)
function toVal(mix) {
  var k,
    y,
    str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += ' ');
          str += k;
        }
      }
    }
  }

  return str;
}

export function clsx(...args: any[]) {
  var i = 0,
    tmp,
    x,
    str = '';
  while (i < args.length) {
    if ((tmp = args[i++])) {
      if ((x = toVal(tmp))) {
        str && (str += ' ');
        str += x;
      }
    }
  }
  return str;
}

/**
 * Simple recursive deep clone of an object.
 * Use to avoid mutating object references when needed.
 */
export function cloneDeep<T>(value: T): T {
  // typeof arrays and objects both evaluation to 'object'
  if (
    typeof value !== 'object' ||
    typeof value === 'undefined' ||
    value === null
  ) {
    // Base case
    // If the input is not an object or is null/undefined, return it as is
    return value;
  }

  if (Array.isArray(value)) {
    // If the input is an array, create a new array and clone each element
    return value.map((item) => cloneDeep(item)) as T;
  }

  // If the input is an object, create a new object and clone each property
  const clonedObj = {} as T;
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clonedObj[key] = cloneDeep(value[key]);
    }
  }
  return clonedObj;
}

import { compile } from 'handlebars';

export default function (data, instance) {
  const { properties, transitions } = instance;
  const template = compile(properties.input);
  const userInput = template(data).toLowerCase();

  const nextWidget = transitions && transitions.find(t => t.conditions && t.conditions.find(c => {
    let match = false;
    switch (c.type) {
      case 'matches_any_of':
        match = new Set(c.value.split(',')).has(userInput);
        break;
      case 'equal_to':
        match = c.value == userInput;
        break;
      case 'not_equal_to':
        match = c.value !== userInput;
        break;
      case 'regex':
        match = userInput.match(c.value);
        break;
    }
    return match;
  }));

  if (nextWidget) {
    return {
      ...data,
      ...nextWidget
    };
  } else {
    return;
  }
};
import { compile } from 'handlebars';

export default function(data, instance) {
  const { transitions } = instance;
  const template = compile(instance.properties.body);
  const body = template(data);

  const nextWidget = transitions.find(i => new Set(Object.keys(i)).has('next'));
  
  return {
    ...data,
    ...nextWidget,
    reply: body
  };
};
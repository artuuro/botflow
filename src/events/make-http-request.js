import { compile } from 'handlebars';
import fetch from 'node-fetch';

export default async function (data, instance, widgetName) {
  let { transitions, properties } = instance;

  let { parameters, body } = properties;

  let internalEvent = 'failed';
  let requestData = {};

  if (parameters) {
    for (let i = 0; i < parameters.length; i++) {
      const template = compile(parameters[i].value);
      parameters[i].value = template(data);
    }
    requestData.parameters = parameters;
  }

  if (body) {
    const template = compile(body);
    body = template(data);
    requestData.body = body;
  }

  const response = await fetch(properties.url, {
    method: properties.method,
    body: requestData,
    headers: {
      'Content-Type': properties.content_type
    }
  });

  const statusCodes = new Set([200, 201]);

  if (statusCodes.has(response.status)) {
    internalEvent = 'success';
    requestData = await response.json();
  }

  const nextWidget = transitions.find(i => i.event == internalEvent);

  let outputData = {
    ...data
  };

  if (requestData) {
    // do nothing
  } else {
    outputData.widgets[widgetName] = {
      parsed: {
        ...requestData
      }
    };
  }

  return {
    ...data,
    ...outputData,
    ...nextWidget
  };
};
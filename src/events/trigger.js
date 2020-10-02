module.exports = function(data, instance, widgetName) {
  const { transitions } = instance;
  
  const nextWidget = transitions.find(i => i.event == data.event);

  return {
    ...data,
    ...nextWidget
  };
};
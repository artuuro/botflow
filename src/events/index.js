export default {
  'trigger': require('./trigger'),
  'split-based-on': require('./split-based-on').default,
  'make-http-request': require('./make-http-request').default,
  'send-message': require('./send-message').default,
  'send-and-wait-for-reply': require('./send-message').default,
};
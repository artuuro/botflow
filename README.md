# BotFlow
JavaScript (nodejs) library that accepts `Twilio Studio` alike JSON configuration files and provides the same functionality on an independent back-end service.

### Features
- Data gathering over a bot-conversation & sending to remotes;
- Sending message to client & awaiting for response to continue the flow;
- Message templating and variable injection using handlebars;
- Action Triggers `split-based-on`, `send-message`, `make-http-request` (see usecases at `/examples/*`);
- Condition triggers `regex`, `equal_to`, `not_equal_to`, `matches_any_of` (see usecases at `/examples/json/*`);
- Populates remote response data into scope;

### How to?
- Install yarn globally with `npm i -g yarn`;
- Ideally you'd like to build it with `yarn build` and import from `/bin`;
  - Run example survey: `yarn test:survey`;
  - Run example appointment: `yarn test:appointment`;

#### Libraries used:
- `node-fetch` https://www.npmjs.com/package/node-fetch
- `node-cache` https://www.npmjs.com/package/node-cache
- `handlebars` https://handlebarsjs.com/


#### TODOs:
- Create npmjs package;
- Write a documentation;
- Improvements and more customization;

Notes: 
- Project is heavily inspired by Twilio Studio and Chatflows as on https://www.twilio.com/console/studio.
- _This is a a hobby project & early version therefore slight changes will/might be applied anytime._
- _You can always make a pull request in case of a good contribution._

Built with ♥ by https://github.com/artuuro
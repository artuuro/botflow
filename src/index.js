import events from '@root/events';
import NodeCache from 'node-cache';

class Flow {
  constructor(parties, flow) {
    this.parties = parties;

    Object.assign(this, flow);

    this.cache = new NodeCache();
    this.canGoNext = new Set([
      'trigger',
      'split-based-on',
      'make-http-request',
    ]);
  }

  getState(name) {
    return this.states.find(i => i.name == name);
  }

  getInitialState(session) {
    const cached = this.cache.get(session);
    if (cached) {
      this.data = {
        ...this.data,
        ...cached.data
      };

      this.data.widgets[cached.fromState] = { inbound: this.data.trigger.message };

      return cached.toState;
    } else {
      return this.initial_state;
    }
  }

  async call(data = {}, state = null) {
    try {
      this.data = {
        widgets: {},
        ...data
      };

      //console.log(this.data)
  
      const stateName = state || this.getInitialState(this.data.trigger.message.From);

      this.currentState = this.getState(stateName);
      
      // Cleanup the cache as we already checked for it:
      this.cache.del(this.data.trigger.message.From);
  
      // Find out the next state:
      this.nextState = await events[this.currentState.type](  
        this.data,
        {
          properties: this.currentState.properties,
          transitions: this.currentState.transitions
        },
        this.currentState.name
      );

      // Update model with new data (if any)
      this.data = {
        ...this.data,
        ...this.nextState
      };
  
      // Do we get the 'next' key ?
      const goNextState = this.nextState && new Set(Object.keys(this.nextState)).has('next');


      if (goNextState && this.canGoNext.has(this.currentState.type)) {
        // Call me again:
        await this.call(this.data, this.nextState.next);
      } else {
        if (this.currentState.type == 'send-and-wait-for-reply') {
          this.cache.set(
            // ID reference:
            this.data.trigger.message.From,
            // Generated data: 
            {
              fromState: this.currentState.name,
              toState: this.data.next,
              data: {
                widgets: this.data.widgets
              }
            },
            // Time the return point will stay in cache (in seconds)
            this.currentState.properties.timeout
          );
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  async query(message, data = {}) {
    try {
      await this.call({
        flow: {
          data: data,
        },
        trigger: {
          message: {
            ...this.parties,
            Body: message,
          }
        },
        event: 'incomingMessage'
      });
      return this.data;
    } catch (e) {
      throw e;
    }
  }

}

export default Flow;
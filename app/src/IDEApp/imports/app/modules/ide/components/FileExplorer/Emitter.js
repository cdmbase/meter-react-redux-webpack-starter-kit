import Emitter from 'events'

let emitter = new Emitter();
window.emitter = emitter;

export default emitter;

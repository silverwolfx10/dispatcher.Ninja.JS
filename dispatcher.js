/**
 * $dispatcher
 * 
 * Um mediador utilizado para escultar eventos e disparar eventos,
 * permitindo que seus modulos sejam fracamente dependentes de outros modulos
 * 
 * @module $dispatcher
 * @author Cleber de Moraes Goncalves <cleber.programmer>
 * @example
 * 
 *        $dispatcher.on('channel', function () {});
 * 
 */
this.Ninja.module('$dispatcher', ['$curry'], function Dispatcher($curry) {
  
  /**
   * 
   */
  var listeners = {};
  
  /**
   * 
   */
  function clone() {
    return Dispatcher($curry);
  }

  /**
   * 
   */
  function compare(callback, context, item) {
    return item.callback == callback && item.context == context;
  }
  
  /**
   * 
   */
  function find(channel) {
    return listeners[channel] || (listeners[channel] = []);
  }
  
  /**
   * 
   */
  function off(channel, callback, context) {
    find(channel).splice(find(channel).indexOf(find(channel).filter(compare.bind(null, callback, context))[0]), 1);
  }
  
  /**
   * 
   */
  function on(channel, callback, context) {
    find(channel).push({ callback: callback, context: context });
  }
  
  /**
   * 
   */
  function trigger(channel, parameters) {
    find(channel).forEach(function (item) {
      item.callback.call(item.context || item.callback, parameters);
    });
  }
  
  /**
   * Revelacao do modulo $dispatcher, encapsulando a visibilidade das funcoes
   * privadas
   */
  return {
    
    /**
     * 
     */
    clone: clone,

    /**
     * 
     */
    on: $curry(on),

    /**
     * 
     */
    off: $curry(off),

    /**
     * 
     */
    trigger: $curry(trigger)

  };
  
});
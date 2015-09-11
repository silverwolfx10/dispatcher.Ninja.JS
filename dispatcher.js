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
this.Ninja.module('$dispatcher', [], function () {
  
  /**
   * 
   */
  var listeners = {};

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
   * Revelacao do modulo $dispatcher, encapsulando a visibilidade das funcoes
   * privadas
   */
  return {

    /**
     * 
     */
    on: function (channel, callback, context) {
      find(channel).push({ callback: callback, context: context });
    },

    /**
     * 
     */
    off: function (channel, callback, context) {
      find(channel).splice(find(channel).indexOf(find(channel).filter(compare.bind(null, callback, context))[0]), 1);
    },

    /**
     * 
     */
    trigger: function (channel, parameters) {
      find(channel).forEach(function (item) {
        item.callback.call(item.context || item.callback, parameters);
      });
    }

  };
  
});